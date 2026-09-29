import { auth } from "./firebase-config.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================
// DURÉES - MODE TEST
// ==========================================

// Déconnexion après 40 minutes
const DUREE_INACTIVITE = 40 * 60 * 1000;

// Avertissement 2 minutes avant
const DUREE_AVERTISSEMENT = 2 * 60 * 1000;
const DELAI_AVERTISSEMENT = DUREE_INACTIVITE - DUREE_AVERTISSEMENT;

let timerAvertissement;
let timerDeconnexion;


// ==========================================
// CRÉATION DU MESSAGE
// ==========================================

function creerAvertissement() {

    if (document.getElementById("alerteSession")) {
        return;
    }

    const alerte = document.createElement("div");

    alerte.id = "alerteSession";

    alerte.innerHTML = `
        <div class="alerte-session-contenu">

            <strong>Session inactive</strong>

            <p>
                Déconnexion automatique dans
                <span id="compteurSession">120</span>
                seconde(s).
            </p>

            <button id="btnResterConnecte">
                Rester connecté
            </button>

        </div>
    `;

    document.body.appendChild(alerte);


    // Bouton rester connecté
    document
        .getElementById("btnResterConnecte")
        .addEventListener(
            "click",
            function () {

                supprimerAvertissement();
                reinitialiserTimer();
            }
        );
}


// ==========================================
// SUPPRESSION MESSAGE
// ==========================================

function supprimerAvertissement() {

    const alerte =
        document.getElementById("alerteSession");

    if (alerte) {
        alerte.remove();
    }
}


// ==========================================
// COMPTE À REBOURS
// ==========================================

let intervalCompteur;

function lancerAvertissement() {

    creerAvertissement();

    let secondesRestantes = DUREE_AVERTISSEMENT / 1000;

    const compteur =
        document.getElementById("compteurSession");

    if (compteur) {
        compteur.textContent = secondesRestantes;
    }


    clearInterval(intervalCompteur);

    intervalCompteur = setInterval(
        function () {

            secondesRestantes--;

            const compteur =
                document.getElementById(
                    "compteurSession"
                );

            if (compteur) {
                compteur.textContent =
                    secondesRestantes;
            }

            if (secondesRestantes <= 0) {
                clearInterval(intervalCompteur);
            }

        },
        1000
    );
}


// ==========================================
// RÉINITIALISATION DU TIMER
// ==========================================

function reinitialiserTimer() {

    clearTimeout(timerAvertissement);
    clearTimeout(timerDeconnexion);
    clearInterval(intervalCompteur);

    supprimerAvertissement();


    // Message après 20 secondes
    timerAvertissement =
        setTimeout(
            lancerAvertissement,
            DELAI_AVERTISSEMENT
        );


    // Déconnexion après 30 secondes
    timerDeconnexion =
        setTimeout(
            deconnexionAutomatique,
            DUREE_INACTIVITE
        );
}


// ==========================================
// DÉCONNEXION AUTOMATIQUE
// ==========================================

async function deconnexionAutomatique() {

    clearInterval(intervalCompteur);

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

        window.location.href =
            "index.html";
    }
}


// ==========================================
// ACTIVITÉ UTILISATEUR
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
            function (event) {

                // IMPORTANT :
                // Une interaction avec l'alerte
                // est gérée séparément.

                if (
                    event.target.closest &&
                    event.target.closest("#alerteSession")
                ) {
                    return;
                }

                reinitialiserTimer();
            },
            { passive: true }
        );
    }
);


// ==========================================
// DÉMARRAGE
// ==========================================

reinitialiserTimer();