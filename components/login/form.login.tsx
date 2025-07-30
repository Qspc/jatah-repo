"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { LoginFormProps } from "@/types/login";
import { useState } from "react";
import ErrorMessage from "../layout/error.mesage";
import { toast } from "sonner";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormProps>();
    const [showPassword, setShowPassword] = useState(false);
    const route = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormProps) => {
        try {
            setLoading(true);
            // alert(JSON.stringify(data));
            signIn("credentials", { ...data }).then(async (res) => {
                console.log({ res });
                if (res?.ok) {
                    const session = await getSession();
                    route.push("/landing");
                }
            });
            // toast.success("Selamat datang");
        } catch (error) {
            toast.error("Proses gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex z-50 md:w-1/5 w-2/3 *:w-full flex-col gap-10 pb-40"
        >
            <div className="flex flex-col gap-4 text-white">
                <div className="flex flex-col gap-1">
                    <div className="relative">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="absolute w-4 h-4 text-white -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            {...register("username", {
                                required: "Username belum diisi.",
                            })}
                            type="text"
                            placeholder="USERNAME"
                            className="w-full px-2 py-3 pl-10 text-white border border-white rounded bg-palette"
                        />
                    </div>
                    {errors.username && (
                        <ErrorMessage error={errors.username.message} />
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="relative">
                        <FontAwesomeIcon
                            icon={faLock}
                            className="absolute w-4 h-4 text-white -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            {...register("password", {
                                required: "Password belum diisi.",
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="PASSWORD"
                            className="w-full px-2 py-3 pl-10 text-white border border-white rounded bg-palette"
                        />
                    </div>
                    {errors.password && (
                        <ErrorMessage error={errors.password.message} />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <input
                        width={20}
                        height={20}
                        onChange={() => setShowPassword(!showPassword)}
                        type="checkbox"
                    />{" "}
                    Tampilkan Password
                </div>
            </div>
            <button
                disabled={loading}
                className="px-4 py-2 font-bold text-blue-700 bg-white rounded button-disabled hover:opacity-70"
            >
                LOGIN
            </button>
        </form>
    );
}
