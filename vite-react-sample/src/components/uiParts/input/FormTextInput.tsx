import { forwardRef } from "react";
import { formErrorMessage } from "../../../styles/FormTv";
import { inputLabel, inputText } from "../../../styles/InputTv";

interface FormTextInputProps {
  label: string;
  value: string | undefined | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  name: string;
  error?: string;
  placeholder: string;
}

const FormTextInput = forwardRef<HTMLInputElement, FormTextInputProps>(
  ({ label, value, onChange, onBlur, name, error, placeholder }, ref) => (
    <div>
      <label htmlFor={name} className={inputLabel()}>
        {label}
        {error && <span className={formErrorMessage({ isIndivisual: true })}>{error}</span>}
      </label>
      <input
        ref={ref}
        id={name}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        className={inputText()}
        placeholder={placeholder}
      />
    </div>
  )
);

export default FormTextInput;
