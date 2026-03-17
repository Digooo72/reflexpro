import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    // Megnézzük, van-e bejelentkezett felhasználó a memóriában
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Ha NINCS bejelentkezve, azonnal átirányítjuk a /login oldalra!
    // A "replace" azért kell, hogy a böngésző "Vissza" gombjával ne tudjon visszalépni a védett oldalra.
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Ha be van jelentkezve, simán betöltjük a kért oldalt (a children-t)
    return children;
}

export default ProtectedRoute;