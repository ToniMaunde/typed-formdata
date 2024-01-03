import {ZodError, ZodObject} from "zod";

type TRecord = Record<string, string | number | File | Array<string> | Array<number> | Array<File>>;
export function castFormData<T extends TRecord>(formData: FormData, schema: ZodObject<any>) {

  function dedupeFormDataKeys(formData: FormData) {
    const keySet = new Set<string>();

    formData.forEach((_, key) => {
      keySet.add(key);
    })

    return [...keySet];
  }

  type TZodShapeDefTypeName = "ZodString" | "ZodEffects" | "ZodArray";
  type TKeyType = "multi-value" | "single-value";
  type TMappedFormDataKeys = Map<string, TKeyType>;
  function mapKeys(formData: FormData): TMappedFormDataKeys {
    const keyMap = new Map<string, TKeyType>();
    const uniqueKeys = dedupeFormDataKeys(formData);

    uniqueKeys.forEach(key => {
      const shapeField = schema.shape[key];
      // This line prevents the function from throwing an error when a key in the formData that is not part of the ZodObject.
      if (shapeField !== undefined) {
        const shapeFieldType = shapeField._def.typeName as TZodShapeDefTypeName;
        if (shapeFieldType === "ZodArray") keyMap.set(key, "multi-value");
        else keyMap.set(key, "single-value");
      }
    });

    return keyMap;
  };

  const profile = {} as TRecord;
  const uniqueKeys = mapKeys(formData);

  uniqueKeys.forEach((value, key) => {
    if (value === "single-value") {
      profile[key] = formData.get(key) as string | File;
    } else {
      profile[key] = formData.getAll(key) as Array<string> | Array<File>;
    }
  });

  const result = schema.safeParse(profile)

  return (result.success) ? result.data as T: result.error as ZodError

}

