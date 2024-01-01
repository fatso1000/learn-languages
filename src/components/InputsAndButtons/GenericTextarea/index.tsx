export default function GenericTextarea(props: {
  label: string;
  name: string;
  maxLength?: number;
  defaultValue?: string;
  labelStyle?: string;
  textareaStyle?: string;
}) {
  const { label, name, maxLength, defaultValue, labelStyle, textareaStyle } =
    props;
  return (
    <label
      className={
        labelStyle
          ? labelStyle
          : "flex flex-col items-start label font-bold p-0"
      }
    >
      {label}
      <textarea
        name={name}
        defaultValue={defaultValue}
        className={
          textareaStyle
            ? textareaStyle
            : "textarea textarea-primary min-h-[7em] w-full h-6 rounded-[0.5rem] text-[1rem] px-2 py-0 m-0"
        }
        maxLength={maxLength}
      />
    </label>
  );
}
