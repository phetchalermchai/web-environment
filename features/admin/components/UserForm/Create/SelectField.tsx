interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({
    label,
    name,
    value,
    error,
    onChange,
}: SelectFieldProps) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="select select-bordered"
            >
                <option value="USER">User</option>
                <option value="SUPERUSER">Superuser</option>
            </select>
            {error && <span className="text-error label-text-alt">{error}</span>}
        </div>
    )
}

export default SelectField