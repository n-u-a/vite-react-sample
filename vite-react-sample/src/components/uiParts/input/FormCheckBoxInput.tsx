import { forwardRef } from "react";
import { formErrorMessage } from "../../../styles/FormTv";
import { inputCheckBox, inputCheckBoxLabel } from "../../../styles/InputTv";

interface FormCheckBoxInputProps {
  label: string;
  value: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  name: string;
  error?: string;
}

const FormCheckBoxInput = forwardRef<HTMLInputElement, FormCheckBoxInputProps>(
  ({ label, value, onChange, onBlur, name, error }, ref) => (
    <div className="flex items-center mb-4">
      <input
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type="checkBox"
        id={name}
        checked={value}
        className={inputCheckBox()}
      />
      <label htmlFor={name} className={inputCheckBoxLabel()}>
        {label}
        {error && <span className={formErrorMessage({ isIndivisual: true })}>{error}</span>}
      </label>
    </div>
  )
);

export default FormCheckBoxInput;
