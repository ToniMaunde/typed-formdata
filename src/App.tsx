import { z, type ZodError, ZodObject, } from "zod";

const ZProfileSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.instanceof(File),
  preferences: z.string().array(),
  // preferences: z.string(),
});
type TProfile = z.infer<typeof ZProfileSchema>;

function App() {

  type TRecord = Record<string, string | number | File | Array<string> | Array<number> | Array<File>>;
  function castFormDataMultiValue<T extends TRecord>(formData: FormData, schema: ZodObject<any>): T | ZodError {

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
        const shapeFieldType = schema.shape[key]._def.typeName as TZodShapeDefTypeName;
        if (shapeFieldType === "ZodArray") keyMap.set(key, "multi-value");
        else keyMap.set(key, "single-value");
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

    try {
      // @ts-ignore: still figuring out this line
      return schema.parse(profile);
    } catch (error) {
      return error as ZodError;
    }
  }

  return (
    <>
      <h1>Working on it...</h1>
    </>
  )
}

export default App
