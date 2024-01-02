import { type HTMLInputTypeAttribute } from "react";

type TInputMode = "email" | "search" | "tel" | "text" | "url" | "none" | "numeric" | "decimal" | undefined;

type TAutoComplete = "off" | "on" | "name" | "honorific-prefix" | "give-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "email" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo";

type TInputProps = {
  type: HTMLInputTypeAttribute;
  label: string;
  name: string;
  autoComplete?: TAutoComplete;
  inputMode?: TInputMode;
  className?: string;
  autoFocus?: boolean;
  minLength?: number;
  required: boolean;
}

export default function Input(props: TInputProps) {

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.name.toLowerCase()} className="text-gray-300">{props.label}</label>
      <input id={props.name} {...props} />
    </div>
  )
}
