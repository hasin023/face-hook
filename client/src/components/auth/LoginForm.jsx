import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../common/Field";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/api";

const LoginForm = () => {

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const submitForm = async (formData) => {
        console.log(formData);

        try {
            const response = await api.post('/auth/login', formData);

            if (response.status !== 200) {
                throw new Error("Error! Please try again later");
            }

            const { token, user } = response.data;
            if (token) {
                const authToken = token.token;
                const refreshToken = token.refreshToken;

                // console.log(authToken, refreshToken);
                setAuth({ user, authToken, refreshToken });
                navigate("/");
            }

        } catch (error) {
            console.error(error);
            setError("root.invalid", { type: 'invalid', message: "Invalid email or password" });
        }
    };

    return (
        <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]" onSubmit={handleSubmit(submitForm)}>

            <Field label="Email" error={errors.email}>
                <input {...register("email", { required: "Email is required" })}
                    className={`auth-input ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    name="email"
                    type="email"
                    id="email"
                />
            </Field>

            <Field label="Password" error={errors.password}>
                <input {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                    className={`auth-input ${errors.password ? "border-red-500" : "border-gray-200"}`}
                    name="password"
                    type="password"
                    id="password"
                />
            </Field>

            <p>{errors?.root?.invalid?.message}</p>
            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Login
                </button>
            </Field>

        </form>
    )
}

export default LoginForm;
