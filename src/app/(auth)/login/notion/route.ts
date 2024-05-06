import { cookies } from "next/headers";
import { generateState } from "arctic";
import { notion } from "@/lib/auth";
import { env } from "@/env";

export async function GET(): Promise<Response> {
  const state = generateState();
  const url = await notion.createAuthorizationURL(state);

  cookies().set("notion_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
