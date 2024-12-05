import { forwardRef } from "react";
import { formErrorMessage } from "../../../styles/FormTv";
import { inputLabel, inputText } from "../../../styles/InputTv";

export interface FormSelectInputOption {
  id: string;
  value: string;
}

interface FormSelectInputProps {
  label: string;
  value: string | undefined | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
  name: string;
  error?: string;
  options: Array<FormSelectInputOption>;
}

const FormSelectInput = forwardRef<HTMLSelectElement, FormSelectInputProps>(
  ({ label, value, onChange, onBlur, name, error, options }, ref) => (
    <div>
      <label htmlFor={name} className={inputLabel()}>
        {label}
        {error && <span className={formErrorMessage({ isIndivisual: true })}>{error}</span>}
      </label>
      <select ref={ref} id={name} className={inputText()} value={value ?? ""} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  )
);

export default FormSelectInput;
