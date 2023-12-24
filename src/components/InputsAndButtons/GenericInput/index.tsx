export default function GenericInput(props: {
  label: string;
  name: string;
  inputType: string;
  defaultValue?: string;
  inputStyle?: string;
  labelStyle?: string;
}) {
  const { label, name, inputType, defaultValue, inputStyle, labelStyle } =
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
      <input
        name={name}
        type={inputType}
        defaultValue={defaultValue}
        className={
          inputStyle
            ? inputStyle
            : "input w-full max-w-xs input-primary h-6 rounded-[0.5rem] px-2 py-0"
        }
      />
    </label>
  );
}
