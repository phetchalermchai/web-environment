interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    error,
    onChange,
    readOnly = false,
    disabled = false,
}) => (
    <div className="form-control">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
            className={`input input-bordered ${error ? "input-error" : ""}`}
        />
        {error && <div className="label"><span className="text-error label-text-alt">{error}</span></div>}
    </div>
);

export default InputField