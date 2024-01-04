import { FormInputProps } from "src/types";

export default function FormInput(props: FormInputProps) {
  const { label, ...rest } = props;

  return (
    <label className="label p-0 form-control w-full items-start">
      <span className="pl-4">
        {label}{" "}
        {props.required && <span className="label-text-alt text-[red]">*</span>}
      </span>
      <input {...rest} className="input input-bordered w-full" />
    </label>
  );
}
