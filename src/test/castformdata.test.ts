import { expect, test } from "vitest";
import { ZProfileSchema, type TProfile } from "../types";
import { castFormData } from "../util";
import { ZodError } from "zod";

test("valid formData is parsed", () => {
  const expectedResult: TProfile = {
    username: "10x Developer",
    email: "10xdev@gmail.com",
    theme: "system",
    password: "gu3ss1hisP@ss",
  };

  const formData = new FormData();
  formData.append("username", "10x Developer");
  formData.append("email", "10xdev@gmail.com");
  formData.append("theme", "system");
  formData.append("password", "gu3ss1hisP@ss");

  const result = castFormData<TProfile>(formData, ZProfileSchema);
  expect(result).toEqual(expectedResult);
});

test("invalid formData is rejected", () => {
  const formData = new FormData();
  formData.append("email", "10xdev@gmail.com");
  formData.append("theme", "system");
  formData.append("password", "gu3ss1hisP@ss");

  const result = castFormData<TProfile>(formData, ZProfileSchema);
  expect(result).toBeInstanceOf(ZodError);
});

test("formData with field that does not meet the criteria is rejected", () => {
  const formData = new FormData();
  formData.append("username", "10x");
  formData.append("email", "10xdev@gmail.com");
  formData.append("theme", "system");
  formData.append("password", "gu3ss1hisP@ss");

  const result = castFormData<TProfile>(formData, ZProfileSchema);
  expect(result).toBeInstanceOf(ZodError);
});
