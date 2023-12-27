type TRadioInputProps = {
  label: string;
  name: string;
  value: string;
  className?: string;
}

export default function RadioInput(props: TRadioInputProps) {

  return (
    <div className="flex items-center gap-2">
      <input type="radio" id={props.value} {...props} />
      <label className="text-gray-300" htmlFor={props.value}>{props.label}</label>
    </div>
  )
}
