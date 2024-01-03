import { useState, type FormEvent, ChangeEvent } from "react";
import { ZodError } from "zod";
import { castFormData } from "./util";
import { ZProfileSchema, type TProfile } from "./types";
import Input from "./Input";
import RadioInput from "./RadioInput";

const THEME_PREFERENCES = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
  {
    label: "System",
    value: "system",
  },
];

function App() {
  const [result, setResult] = useState<TProfile>();
  const [thereWasAnError, setErrorStatus] = useState(false);
  const [isSubmitting, setSubmissionStatus] = useState(false);
  const [isRequired, setRequired] = useState(true);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { checked } = e.currentTarget;
    setRequired(!checked);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorStatus(false);
    setSubmissionStatus(true);
    const formData = new FormData(e.currentTarget);

    // Artificial timeout
    setTimeout(() => {
      const result = castFormData<TProfile>(formData, ZProfileSchema);
      if (result instanceof ZodError) {
        setErrorStatus(true);
        console.log("Here's your error ", result);
        console.log({result});
      } else {
        setResult(result);
      }
      setSubmissionStatus(false);
    }, 1000);
  }

  return (
    <>
      <main className="text-white max-w-[320px] mx-auto">
        <h1 className="font-mono text-2xl py-8">Create your Profile</h1>
        {
          thereWasAnError &&
          <p className="font-semibold text-red-500 mb-6">Check the console, developer 🥳.
          </p>
        }
        <div className="flex gap-1 mb-6">
          <input type="checkbox" name="makeItFail" id="makeItFail" className="accent-fuchsia-600" onChange={handleChange} />
          <label htmlFor="makeItFail">Get an error</label>
        </div>
        <form className="flex flex-col gap-6 font-sans" onSubmit={handleSubmit}>
          <Input className="rounded-md py-1 px-2 text-gray-900" label="Username" name="username" type="text" inputMode="text" autoComplete="username" autoFocus minLength={6} required={isRequired} />
          <Input className="rounded-md py-1 px-2 text-gray-900" label="Email" name="email" type="email" inputMode="email" autoComplete="email" required />
          <fieldset name="preferences">
            <legend>Theme</legend>
            {
              THEME_PREFERENCES.map(option => (
                <RadioInput key={option.value} className="accent-fuchsia-600 w-4 h-4" label={option.label} name="theme" value={option.value} />
              ))
            }
          </fieldset>
          <input type="hidden" name="extra" value="none" />
          <Input className="rounded-md py-1 px-2 text-gray-900" label="Password" name="password" type="password" inputMode="text" autoComplete="new-password" minLength={6} required />
          <button
            type="submit"
            className={`font-sans font-bold py-2 px-4 text-white rounded-md ${isSubmitting ? "bg-fuchsia-500" : "bg-fuchsia-600"}`}
            disabled={isSubmitting}
          >
            {
              isSubmitting ? "Registering..." : "Register"
            }
          </button>
        </form>
        <div className="mt-6 p-4 rounded-md bg-gray-800 min-h-32">
          <h2 className="text-lg/6 font-bold font-mono mb-2">Result</h2>
          {
            result && (
              <>
                <p>Username: {result.username}</p>
                <p>Email: {result.email}</p>
                <p>Theme: {result.theme}</p>
                <p>Password: {result.password}</p>
              </>
            )
          }
        </div>
      </main>
    </>
  )
}

export default App;
