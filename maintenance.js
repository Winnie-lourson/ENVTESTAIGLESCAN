import { db, auth } from "./firebase-config.js";

import {
    doc,
    onSnapshot,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// SURVEILLANCE MAINTENANCE
// ===============================

const docRef =
    doc(db, "configuration", "systeme");


onSnapshot(docRef, (docSnap) => {

    if (!docSnap.exists()) {
        return;
    }

    const data =
        docSnap.data();

    if (data.maintenance !== true) {
        return;
    }


    // ===============================
    // MAINTENANCE ACTIVE
    // ===============================

    onAuthStateChanged(auth, async (user) => {

        // Aucun utilisateur Firebase connecté
        if (!user) {

            redirigerVersIndex();

            return;
        }


        try {

            // Document utilisateur basé sur UID
            const utilisateurRef =
                doc(
                    db,
                    "utilisateurs",
                    user.uid
                );

            const utilisateurSnap =
                await getDoc(utilisateurRef);


            // Document inexistant
            if (!utilisateurSnap.exists()) {

                redirigerVersIndex();

                return;
            }


            const utilisateur =
                utilisateurSnap.data();


            // ===============================
            // ADMIN
            // ===============================

            if (utilisateur.role === "admin") {

                // L'admin peut rester dans l'application
                return;
            }


            // ===============================
            // UTILISATEUR NORMAL
            // ===============================

            redirigerVersIndex();


        } catch (error) {

            console.error(
                "Erreur vérification maintenance :",
                error
            );

            redirigerVersIndex();
        }
    });

});


// ===============================
// REDIRECTION
// ===============================

function redirigerVersIndex() {

    if (
        !window.location.pathname.includes("index.html")
    ) {

        window.location.href =
            "index.html";
    }
}