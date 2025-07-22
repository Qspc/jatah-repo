"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoginFormProps } from "@/types/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormProps>();
    const queryClient = useQueryClient();
    const route = useRouter();

    //   const { mutateAsync } = useMutation<any, Error, IndustriesFormprops>({
    //     mutationFn: async (data) => await createIndustries(data),
    //     onSuccess: () => {
    //     },
    //     onError: (error: any) => {
    //     },
    //   });

    const onSubmit = async () => {
        alert("Login success");
        route.push("/landing");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex md:w-1/5 w-2/3 *:w-full flex-col gap-10 pb-40"
        >
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-white"
                    />
                    <input
                        {...register("username", { required: true })}
                        type="text"
                        placeholder="USERNAME"
                        className="py-3 px-2 w-full bg-transparent border pl-10 text-white border-white rounded"
                    />
                </div>
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faLock}
                        className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-white"
                    />
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="PASSWORD"
                        className="py-3 px-2 w-full bg-transparent border pl-10 text-white border-white rounded"
                    />
                </div>{" "}
            </div>
            <button className="bg-white hover:opacity-70  text-blue-700 font-bold py-2 px-4 rounded">
                LOGIN
            </button>
        </form>
    );
}
