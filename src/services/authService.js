import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"; // <-- ÚJ: updateProfile

// Regisztráció (módosítva, most már várja a username-t is)
export async function registerUser(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Hozzáadjuk a felhasználónevet a Google-ös Firebase fiókodhoz!
        await updateProfile(userCredential.user, { displayName: username });
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

// Bejelentkezés
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

// Kijelentkezés
export async function logoutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Hiba kijelentkezéskor:", error);
    }
}

// ÚJ: Név módosítása a Profilban
export async function updateAuthDisplayName(newName) {
    if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newName });
    }
}