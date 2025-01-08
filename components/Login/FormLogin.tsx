"use client";

import useFormLogin from "@/hooks/useFormLogin";

const FormLogin = () => {
    const { formData, errors, handleChange, handleSubmit } = useFormLogin();

    return (
        <div className="flex flex-col items-center justify-center min-h-svh lg:w-[40%] w-full">
            <div className="flex flex-col gap-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
                <h1 className="text-3xl font-bold">Sign In</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full px-[10%]">

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} className="grow" placeholder="Example@gmail.com" />
                    </label>
                    <div className="label">
                        {errors.email && <div className="label"><span className="label-text-alt text-error">{errors.email}</span></div>}
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="grow" placeholder="Password" />
                    </label>
                    <div className="label">
                        {errors.password && <div className="label"><span className="label-text-alt text-error">{errors.password}</span></div>}
                    </div>
                    {errors.general && (
                        <div
                            role="alert"
                            className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${errors.general === "success" ? "alert-success" : "alert-error"
                                }`}
                        >
                            <span>{errors.general}</span>
                        </div>
                    )}
                </label>
                <button className="btn btn-primary" type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default FormLogin