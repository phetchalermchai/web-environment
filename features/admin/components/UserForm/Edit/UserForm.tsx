"use client";

interface UserFormProps {
  userData: {
    firstname: string;
    lastname: string;
    department: string;
    email: string;
    role: string;
  };
  formErrors: { firstname: string; lastname: string; department: string; password: string };
  newPassword: string;
  onChange: (field: string, value: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ userData, formErrors, newPassword, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text">ชื่อจริง</span>
        </label>
        <input
          type="text"
          name="firstname"
          className={`input input-bordered ${formErrors.firstname ? "input-error" : ""}`}
          placeholder="ชื่อจริง"
          value={userData.firstname}
          onChange={(e) => onChange("firstname", e.target.value)}
        />
        {formErrors.firstname && (
          <span className="text-error label-text-alt">{formErrors.firstname}</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">นามสกุล</span>
        </label>
        <input
          type="text"
          name="lastname"
          className={`input input-bordered ${formErrors.lastname ? "input-error" : ""}`}
          placeholder="นามสกุล"
          value={userData.lastname}
          onChange={(e) => onChange("lastname", e.target.value)}
        />
        {formErrors.lastname && (
          <span className="text-error label-text-alt">{formErrors.lastname}</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">อีเมล</span>
        </label>
        <input
          type="email"
          name="email"
          className="input input-bordered"
          placeholder="อีเมล"
          value={userData.email}
          disabled
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">รหัสผ่าน</span>
        </label>
        <input
          type="password"
          name="password"
          className={`input input-bordered ${formErrors.password ? "input-error" : ""}`}
          placeholder="รหัสผ่านใหม่"
          value={newPassword}
          onChange={(e) => onChange("password", e.target.value)}
        />
        {formErrors.password && (
          <span className="text-error label-text-alt">{formErrors.password}</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">แผนก</span>
        </label>
        <input
          type="text"
          name="department"
          className={`input input-bordered ${formErrors.department ? "input-error" : ""}`}
          placeholder="แผนกของคุณ"
          value={userData.department}
          onChange={(e) => onChange("department", e.target.value)}
        />
        {formErrors.department && (
          <span className="text-error label-text-alt">{formErrors.department}</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">ระดับผู้ใช้งาน</span>
        </label>
        <input
          type="text"
          name="role"
          className="input input-bordered"
          placeholder="ระดับผู้ใช้งาน"
          value={userData.role}
          disabled
        />
      </div>
    </div>
  );
};

export default UserForm;
