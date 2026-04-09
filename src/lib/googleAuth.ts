import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export async function googleLogin() {
  const result = await signInWithPopup(auth, googleProvider);
  // result.user contains user info
  return result.user;
}

export async function googleLogout() {
  await signOut(auth);
}
