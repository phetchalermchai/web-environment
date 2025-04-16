import InputField from './InputField'

interface UserFormProps {
    userData: {
      firstname: string;
      lastname: string;
      department: string;
      email: string;
      password: string;
      role: string;
    };
    formErrors: { firstname: string; lastname: string; department: string; email: string; password: string; role: string };
    onChange: (field: string, value: string) => void;
  }

const UserForm = ({ userData, formErrors, onChange }: UserFormProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <InputField
                label="ชื่อจริง"
                name="firstname"
                placeholder="ชื่อจริง"
                value=""
                error=""
                onChange={(e) => onChange("firstname", e.target.value)}
            />
            <InputField
                label="นามสกุล"
                name="lastname"
                placeholder="นามสกุล"
                value=""
                error=""
                onChange={(e) => onChange("lastname", e.target.value)}
            />
            <InputField
                label="อีเมล"
                name="email"
                type="email"
                placeholder="อีเมล"
                value=""
                error=""
                onChange={(e) => onChange("email", e.target.value)}
            />
            <InputField
                label="รหัสผ่าน"
                name="password"
                type="password"
                placeholder="รหัสผ่านใหม่"
                value=""
                error=""
                onChange={(e) => onChange("password", e.target.value)}
            />
            <InputField
                label="แผนก"
                name="department"
                placeholder="แผนกของคุณ"
                value=""
                error=""
                onChange={(e) => onChange("department", e.target.value)}
            />
            <label className="form-control">
                <div className="label">
                    <span className="label-text">ระดับผู้ใช้งาน</span>
                </div>
                <select
                    name="role"
                    value={userData.role}
                    onChange={(e) => onChange("role", e.target.value)}
                    className="select select-bordered"
                >
                    <option value="USER">User</option>
                    <option value="SUPERUSER">Superuser</option>
                </select>
                {formErrors.role && (
                    <span className="text-error label-text-alt">{formErrors.role}</span>
                )}
            </label>
        </div>
    )
}

export default UserForm