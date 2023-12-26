type TRadioInputProps = {
  label: string;
  name: string;
  value: string;
  className?: string;
}

export default function RadioInput(props: TRadioInputProps) {

  return (
    <div className="flex items-center gap-2">
      <input className={props.className} id={props.value} name={props.name} type="radio" />
      <label className="text-gray-300" htmlFor={props.value}>{props.label}</label>
    </div>
  )
}
