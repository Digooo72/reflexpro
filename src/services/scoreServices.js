import { db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, limit, where, deleteDoc, doc, updateDoc } from "firebase/firestore";

const SCORES_COLLECTION = "game_sessions";
const AIM_COLLECTION = "aim_sessions";
const FEEDBACK_COLLECTION = "feedback";
const ACHIEVEMENTS_COLLECTION = "achievements";
const PROFILES_COLLECTION = "user_profiles";
// ==========================================
// 1. REAKCIÓ TESZT FÜGGVÉNYEK
// ==========================================

export async function saveScore(playerName, scoreMs) {
    try {
        const docRef = await addDoc(collection(db, SCORES_COLLECTION), {
            name: playerName,
            score: scoreMs,
            played_at: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error("Hiba az eredmény mentésekor: ", error);
        throw error;
    }
}

export async function getTopScores(limitCount = 50) {
    try {
        const q = query(collection(db, SCORES_COLLECTION), orderBy("score", "asc"), limit(limitCount));
        const querySnapshot = await getDocs(q);
        const scores = [];
        querySnapshot.forEach((doc) => {
            scores.push({ id: doc.id, ...doc.data() });
        });
        return scores;
    } catch (error) {
        console.error("Hiba a toplista lekérésekor: ", error);
        return [];
    }
}

export async function getUserScores(playerName) {
    try {
        const q = query(collection(db, SCORES_COLLECTION), where("name", "==", playerName), orderBy("score", "asc"));
        const querySnapshot = await getDocs(q);
        const scores = [];
        querySnapshot.forEach((document) => {
            scores.push({ id: document.id, ...document.data() });
        });
        return scores;
    } catch (error) {
        console.error("Hiba a saját adatok lekérésekor: ", error);
        return [];
    }
}

export async function deleteScore(scoreId) {
    try {
        await deleteDoc(doc(db, SCORES_COLLECTION, scoreId));
    } catch (error) {
        console.error("Hiba a törlés során: ", error);
        throw error;
    }
}

export async function updateScoreNote(scoreId, newNote) {
    try {
        const scoreRef = doc(db, SCORES_COLLECTION, scoreId);
        await updateDoc(scoreRef, { note: newNote });
    } catch (error) {
        console.error("Hiba a módosításkor: ", error);
        throw error;
    }
}


// ==========================================
// 2. CÉLLÖVÖLDE (AIM TRAINER) FÜGGVÉNYEK
// ==========================================

export async function saveAimScore(playerName, scoreMs, accuracyPercentage) {
    try {
        const docRef = await addDoc(collection(db, AIM_COLLECTION), {
            name: playerName,
            score: scoreMs,
            accuracy: accuracyPercentage,
            played_at: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error("Hiba az aim eredmény mentésekor: ", error);
        throw error;
    }
}

export async function getTopAimScores(limitCount = 50) {
    try {
        const q = query(collection(db, AIM_COLLECTION), orderBy("score", "asc"), limit(limitCount));
        const querySnapshot = await getDocs(q);
        const scores = [];
        querySnapshot.forEach((doc) => scores.push({ id: doc.id, ...doc.data() }));
        return scores;
    } catch (error) {
        console.error("Hiba a toplista lekérésekor: ", error);
        return [];
    }
}

export async function getUserAimScores(playerName) {
    try {
        const q = query(collection(db, AIM_COLLECTION), where("name", "==", playerName), orderBy("score", "asc"));
        const querySnapshot = await getDocs(q);
        const scores = [];
        querySnapshot.forEach((document) => {
            scores.push({ id: document.id, ...document.data() });
        });
        return scores;
    } catch (error) {
        console.error("Hiba a saját adatok lekérésekor: ", error);
        return [];
    }
}

export async function deleteAimScore(scoreId) {
    try {
        await deleteDoc(doc(db, AIM_COLLECTION, scoreId));
    } catch (error) {
        console.error("Hiba a törlés során: ", error);
        throw error;
    }
}


// ==========================================
// 3. KÖZÖS (GLOBÁLIS) FÜGGVÉNYEK
// ==========================================

export async function updatePlayerNameInScores(oldName, newName) {
    try {
        // 1. Reakció teszt frissítése
        const qReaction = query(collection(db, SCORES_COLLECTION), where("name", "==", oldName));
        const snapReaction = await getDocs(qReaction);
        for (const document of snapReaction.docs) {
            await updateDoc(doc(db, SCORES_COLLECTION, document.id), { name: newName });
        }

        // 2. Céllövölde frissítése
        const qAim = query(collection(db, AIM_COLLECTION), where("name", "==", oldName));
        const snapAim = await getDocs(qAim);
        for (const document of snapAim.docs) {
            await updateDoc(doc(db, AIM_COLLECTION, document.id), { name: newName });
        }
    } catch (error) {
        console.error("Hiba a név átírásakor a ranglistán: ", error);
        throw error;
    }
}

// ==========================================
// 4. SZERKESZTÉS (UPDATE) - Megjegyzések
// ==========================================

export async function updateAimScoreNote(scoreId, newNote) {
    try {
        const scoreRef = doc(db, AIM_COLLECTION, scoreId);
        await updateDoc(scoreRef, { note: newNote });
    } catch (error) {
        console.error("Hiba az Aim módosításkor: ", error);
        throw error;
    }
}

// ==========================================
// 5. ÚJ ENTITÁSOK (User Profiles, Achievements, Feedback)
// ==========================================

export async function saveFeedback(playerName, message) {
    try {
        await addDoc(collection(db, FEEDBACK_COLLECTION), {
            name: playerName,
            message: message,
            submitted_at: new Date().toISOString()
        });
    } catch (error) {
        console.error("Hiba a visszajelzés mentésekor:", error);
    }
}

export async function saveAchievement(playerName, achievementTitle) {
    try {
        await addDoc(collection(db, ACHIEVEMENTS_COLLECTION), {
            name: playerName,
            title: achievementTitle,
            unlocked_at: new Date().toISOString()
        });
    } catch (error) {
        console.error("Hiba az achievement mentésekor:", error);
    }
}

export async function saveUserProfileData(playerName, bioText) {
    try {
        await addDoc(collection(db, PROFILES_COLLECTION), {
            name: playerName,
            bio: bioText,
            updated_at: new Date().toISOString()
        });
    } catch (error) {
        console.error("Hiba a profil adat mentésekor:", error);
    }
}