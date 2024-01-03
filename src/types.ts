import { z } from "zod";

// This will be your schema
export const ZProfileSchema = z.object({
  username: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
  theme: z.string(),
});
export type TProfile = z.infer<typeof ZProfileSchema>;
