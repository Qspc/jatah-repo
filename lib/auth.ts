import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import https from "https";
import supabase from "./db";

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
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                username: {
                    label: "username",
                    type: "email",
                    placeholder: "username",
                },
                password: { label: "Password", type: "password" },
                token: { label: "Captcha", type: "text" },
            },
            async authorize(credentials) {
                try {
                    console.log(
                        "LOGIN HIT URL",
                        `${process.env.API_URL}/auth/login`
                    );

                    const { data: user, error } = await supabase
                        .from("user")
                        .select("*")
                        .eq("username", credentials?.username)
                        .eq("password", credentials?.password)
                        .single();

                    //                         {
                    //   code: 'PGRST116',
                    //   details: 'The result contains 0 rows',
                    //   hint: null,
                    //   message: 'JSON object requested, multiple (or no) rows returned'
                    // }
                    // if (error || !user)
                    //     return res
                    //         .status(401)
                    //         .json({ message: "Invalid credentials" });

                    // const isValid = await bcrypt.compare(
                    //     password,
                    //     user.password
                    // );
                    // if (!isValid)
                    //     return res
                    //         .status(401)
                    //         .json({ message: "Invalid credentials" });

                    // console.log(user);
                    // console.log(error);
                    console.log(user, error);

                    if (error) return null;

                    if (user) {
                        return {
                            id: user.id,
                            name: user.nama,
                            username: user.username,
                            // access_token: user.token.access_token,
                            // refresh_token: user.token.refresh_token,
                        };
                    }

                    return null;
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
        async session({ session, token }) {
            const extendedToken = token as {
                access_token?: string;
                refresh_token?: string;
                id: string;
            };
            // if (extendedToken) {
            //     session.isClient = extendedToken.isClient;
            //     session.user.id = extendedToken.id;
            //     session.otpVerified = extendedToken.otpVerified;
            //     session.access_token = extendedToken.access_token;
            //     session.refresh_token = extendedToken.refresh_token;
            // }
            return session;
        },
        async jwt({ token, trigger, user, session }) {
            const extendedToken = token as {
                otpVerified?: boolean;
                name: string;
                id: string;
                access_token?: string;
                refresh_token?: string;
                isClient?: boolean;
            };

            // if (user) {
            //     extendedToken.isClient = user.isClient;
            //     extendedToken.otpVerified = user.otpVerified;
            //     extendedToken.id = user.id;
            //     extendedToken.access_token = user.access_token;
            //     extendedToken.refresh_token = user.refresh_token;
            // }

            // if (trigger === "update" && session?.id) {
            //     extendedToken.id = session.id;
            // }

            // if (trigger === "update" && session?.name) {
            //     extendedToken.name = session.name;
            // }
            // if (trigger === "update" && session?.otpVerified) {
            //     extendedToken.otpVerified = session.otpVerified;
            // }
            // if (trigger === "update" && session?.access_token) {
            //     extendedToken.access_token = session.access_token; // Update access_token
            // }
            // if (trigger === "update" && session?.refresh_token) {
            //     extendedToken.refresh_token = session.refresh_token; // Update access_token
            // }

            return extendedToken;
        },
    },
};
