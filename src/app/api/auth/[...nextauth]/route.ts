import { authService } from "@marketplace/data-access/auth/auth.service";
import NextAuth from "next-auth/next";

const handler = NextAuth(authService.options);

export const GET = handler;

export const POST = handler;
