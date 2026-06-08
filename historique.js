import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===============================
// AJOUT HISTORIQUE
// ===============================
export async function ajouterHistorique(
    action,
    fichier = "",
    details = {}
) {

    try {

        let utilisateur =
            localStorage.getItem("utilisateur") || "Inconnu";

        await addDoc(
            collection(db, "historique"),
            {
                utilisateur: utilisateur,

                action: action,

                fichier: fichier,

                page: window.location.pathname,

                navigateur: navigator.userAgent,

                date:
                    new Date().toLocaleString(),

                timestamp:
                    Date.now(),

                ...details
            }
        );

    } catch (error) {

        console.error(
            "Erreur historique :",
            error
        );
    }
}