import { FormTextareaProps } from "src/types";

export default function FormTextarea(props: FormTextareaProps) {
  const { label, ...rest } = props;
  return (
    <label className="label p-0 form-control w-full items-start">
      <span className="pl-4">{label}</span>
      <textarea
        {...rest}
        className="textarea textarea-bordered min-h-[7em] w-full h-6 text-[1rem]"
      />
    </label>
  );
}
