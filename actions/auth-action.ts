"use server";

import { signIn } from "@/auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/loggedin" });
}
