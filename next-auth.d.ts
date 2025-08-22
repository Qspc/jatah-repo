import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        supabaseAccessToken?: string;
    }

    interface User extends DefaultUser {
        supabaseAccessToken?: string;
    }
}
