import { FormInputProps } from "src/types";

export default function FormInput(props: FormInputProps) {
  const { label, ...rest } = props;

  return (
    <div className="form-control w-full">
      <label className="label p-0 px-4">
        <span>
          {label}{" "}
          {props.required && (
            <span className="label-text-alt text-[red]">*</span>
          )}
        </span>
      </label>
      <input {...rest} className="input input-bordered w-full" />
    </div>
  );
}
