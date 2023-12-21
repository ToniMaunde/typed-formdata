import { z, type ZodSchema, type ZodError } from "zod";

const ZProfileSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

type TProfile = z.infer<typeof ZProfileSchema>;

function App() {

  function castFormData<T>(formData: FormData, schema: ZodSchema): T | ZodError {
    // Here the as T assertion is fine because Zod will validate whether the assertion is accurate
    const result: T = Object.fromEntries(formData.entries()) as T;

    try {
      return schema.parse(result)
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
