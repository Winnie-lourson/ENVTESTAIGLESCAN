import { db, auth } from "./firebase-config.js";

import {
    collection,
    addDoc,
    doc,
    getDoc
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

        // ===============================
        // UTILISATEUR FIREBASE
        // ===============================

        const user =
            auth.currentUser;

        if (!user) {

            console.error(
                "Historique impossible : utilisateur non connecté"
            );

            return;
        }


        // ===============================
        // DOCUMENT UTILISATEUR
        // ===============================

        const utilisateurRef =
            doc(
                db,
                "utilisateurs",
                user.uid
            );

        const utilisateurSnap =
            await getDoc(utilisateurRef);


        if (!utilisateurSnap.exists()) {

            console.error(
                "Historique impossible : profil utilisateur introuvable"
            );

            return;
        }


        const profil =
            utilisateurSnap.data();


        // ===============================
        // IDENTITÉ
        // ===============================

        const utilisateur =
            profil.login ||
            profil.nom ||
            "Inconnu";


        // ===============================
        // ENREGISTREMENT
        // ===============================

        await addDoc(
            collection(db, "historique"),
            {
                utilisateur: utilisateur,

                uid: user.uid,

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