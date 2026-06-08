import { db } from "./firebase-config.js";

import {
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


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

    // Si maintenance activée
    if (data.maintenance === true) {

        // Autorise uniquement index.html
        if (
            !window.location.pathname.includes("index.html")
        ) {
            window.history.pushState(null, "", "index.html");
            window.location.href = "index.html";
        }
    }
});