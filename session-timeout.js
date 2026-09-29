import { auth } from "./firebase-config.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================
// DURÉE AVANT DÉCONNEXION
// ==========================================

// 30 minutes
const DUREE_INACTIVITE = 30 * 1000;

let timerInactivite;


// ==========================================
// RÉINITIALISATION DU TIMER
// ==========================================

function reinitialiserTimer() {

    clearTimeout(timerInactivite);

    timerInactivite = setTimeout(
        deconnexionAutomatique,
        DUREE_INACTIVITE
    );
}


// ==========================================
// DÉCONNEXION AUTOMATIQUE
// ==========================================

async function deconnexionAutomatique() {

    try {

        await signOut(auth);

    } catch (error) {

        console.error(
            "Erreur déconnexion automatique :",
            error
        );

    } finally {

        localStorage.removeItem("utilisateur");
        localStorage.removeItem("fichierActif");

        window.location.href = "index.html";
    }
}


// ==========================================
// ACTIVITÉS UTILISATEUR
// ==========================================

const evenementsActivite = [
    "mousedown",
    "keydown",
    "touchstart",
    "scroll"
];

evenementsActivite.forEach(
    evenement => {

        document.addEventListener(
            evenement,
            reinitialiserTimer,
            { passive: true }
        );
    }
);


// ==========================================
// DÉMARRAGE
// ==========================================

reinitialiserTimer();