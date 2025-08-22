import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import https from "https";
import supabaseAuth from "./db-auth";
import { createClient } from "@supabase/supabase-js";
import { LoginFormProps } from "@/types/login";

interface CustomSession {
    user: {
        id: string;
        email: string;
    };
    expires: string;
}

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/",
        error: "/",
    },
    session: {
        strategy: "jwt",
        maxAge: 300 * 60,
        updateAge: 0,
    },
    jwt: {
        maxAge: 300 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "email",
                },
                password: { label: "Password", type: "password" },
                mode: {
                    label: "Mode",
                    type: "text",
                    placeholder: "signin, signup, or resetpassword",
                },
            },
            async authorize(credentials: any) {
                try {
                    console.log(
                        "LOGIN HIT URL",
                        `${process.env.API_URL}/auth/login`
                    );
                    const { email, password, mode } = credentials;
                    const lowerMode = mode?.toLowerCase();
                    if (!email && !password) {
                        throw new Error(
                            "Password is required for signin or signup"
                        );
                    }
                    const { data, error } =
                        await supabaseAuth?.auth?.signInWithPassword({
                            email,
                            password,
                        });

                    // const user =
                    //     lowerMode === "signup"
                    //         ? await authHandlers.handleSignup(email, password)
                    //         : await authHandlers.handleSignIn(email, password);

                    // console.log(data);
                    if (error) {
                        throw new Error(
                            "Password is required for signin or signup"
                        );
                    }

                    return {
                        id: data.user.id,
                        email: data.user.email ?? email,
                        name: data.user.email ?? email,
                        supabaseAccessToken: data.session.access_token,
                    };
                } catch (error: any) {
                    throw new Error(
                        error.response?.data?.error?.messages[0] ||
                            "Error Server"
                    );
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.email = user.email;
                token.lastUpdated = new Date().toISOString();
                token.supabaseAccessToken = user.supabaseAccessToken;
            }
            return token;
        },
        async session({ session, token }): Promise<CustomSession> {
            session.supabaseAccessToken = token.supabaseAccessToken as string;
            return {
                ...session,
                user: {
                    id: token.userId as string,
                    email: token.email as string,
                },
            };
        },
    },
};

const authHandlers = {
    async handleSignup(email: string, password: string) {
        const { data, error } = await supabaseAuth.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.API_URL}`,
            },
        });

        if (error) {
            console.error("[AUTH] Signup error:", error);
            throw new Error(error.message);
        }

        if (!data.user?.id) {
            throw new Error(
                "Signup successful. Please check your email for confirmation."
            );
        }

        return data.user;
    },

    async handleSignIn(email: string, password: string) {
        const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("[AUTH] Signin error:", error);
            throw new Error(error.message);
        }

        if (!data.user?.id) {
            throw new Error("Invalid credentials");
        }

        return data.user;
    },

    async handleResetPassword(email: string) {
        // We'll implement this in Part 3
    },
};
