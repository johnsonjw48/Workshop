import db from "./database";
import { collection, query, getDocs, where, addDoc, doc, updateDoc  } from "firebase/firestore"; 
import { async } from "@firebase/util";
// import classes from "./data"

export async function getAllStudents() {
    let tab = [];
    const q = query(collection(db, "Eleves"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let obj;
        if(doc.data().etat === 'alternant') {
         obj = {
                identifiant_eleve: doc.data().id_eleve,
                adresse_rue: doc.data().adresse_rue,
                adresse_cp: doc.data().adresse_cp,
                adresse_ville: doc.data().adresse_ville,
                adresse_entreprise_rue: doc.data().adresse_entreprise_rue,
                adresse_entreprise_cp: doc.data().adresse_entreprise_cp,
                adresse_entreprise_ville: doc.data().adresse_entreprise_ville,
                etat: doc.data().etat
            }
        }
        else {
            obj = {
                identifiant_eleve: doc.data().id_eleve,
                adresse_rue: doc.data().adresse_rue,
                adresse_cp: doc.data().adresse_cp,
                adresse_ville: doc.data().adresse_ville,
                etat: doc.data().etat
            }
        }
        tab.push(obj)
    })
    return tab;
}

export async function emissionCalcul(distance, transport) {

    let q;

    switch(transport) {
        case 'Train':
            q = query(collection(db, "Transport"), where("intitule", "==", "RER"));
            break;
        case 'Métro':
            q = query(collection(db, "Transport"), where("intitule", "==", "Métro"));
            break;
        case 'Bus':
            q = query(collection(db, "Transport"), where("intitule", "==", "Bus"));
            break;
        case 'Tramway':
            q = query(collection(db, "Transport"), where("intitule", "==", "Tramway"));
            break;
        default:
            q = null;
            break;
    }

    let emissionco2 = 0;

    if(q !== null) {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            emissionco2 = doc.data().gco2eKM * distance
        })
    }

    return emissionco2;
}


export async function insertDateTimeEmission(id_student, emissionCO2, totalKm) {
    
    await addDoc(collection(db, "Date_Eleve"), {
        id_eleve: id_student,
        emissionCO2: emissionCO2,
        nbKm: totalKm,
        dateTime: new Date(2021, 11, 13).getTime()
    });
}

export async function incrementeTransport(tabTransport) {

    tabTransport.forEach(async(transport) => {
        let q = query(collection(db, "Transport"), where("intitule", "==", transport));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(document) => {
            const transportRef = doc(db, "Transport", document.id);
            await updateDoc(transportRef, {
                nbEleve: document.data().nbEleve+1
            });
        })
    })    

}

export async function popularTransport() {
    
    let q = query(collection(db, "Transport"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        for(let index = 1; index <= document.data().nbEleve; index++) {
            addDoc(collection(db, "Popular_Transport"), {
                intitule: document.data().intitule
            });
        }
    })

}

// export async function addIDClasse() {
//     let q = query(collection(db, "Eleves"));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(async(document) => {
//         let q2 = query(collection(db, "Date_Eleve"), where("id_eleve", "==", document.data().id_eleve));
//         const querySnapshot2 = await getDocs(q2);
//         querySnapshot2.forEach(async(document2) => {
//             const eleve = doc(db, "Date_Eleve", document2.id);
//             await updateDoc(eleve, {
//                 id_classe: document.data().id_classe
//             });
//         })
        
//     }) 
// }



// export async function addClasses() {
//     for (let i = 0; i < classes.length; i++) {
//         const docRef = await addDoc(collection(db, "Classes"), {
//             id_classe: classes[i].id_classe,
//             intitule: "",
//             joursSemaine: []
//         });
//         console.log("Document written with ID: ", docRef.id);
//     }
// }


// export async function addStudents() {
//     for (let i = 0; i < students.length; i++) {
//         const docRef = await addDoc(collection(db, "Eleves"), {
//             id_eleve: students[i].id_eleve,
//             adresse_rue: students[i].rue,
//             adresse_cp: students[i].code_postal,
//             adresse_ville: students[i].ville,
//             etat: students[i].etat,
//             saison: students[i].saison,
//             id_classe: students[i].id_classe
//         });
//         console.log("Document written with ID: ", docRef.id);
//     }
// }

// export async function addCompanies() {
//     for (let i = 0; i < entreprises.length; i++) {    
//         try {
//             const q = query(collection(db, "Eleves"), where("id_eleve", "==", entreprises[i].identifiant_eleve));
//             const querySnapshot = await getDocs(q);
            
//             querySnapshot.forEach(async (document) => {
//                 const eleveRef = doc(db, "Eleves", document.id);
//                 await updateDoc(eleveRef, { 
//                     adresse_entreprise_rue: entreprises[i].rue,
//                     adresse_entreprise_cp: entreprises[i].code_postal,
//                     adresse_entreprise_ville: entreprises[i].ville
//                 })   
//             });
//             console.log("Document written with ID: ");
//         } catch (e) {
//             console.error("Error adding document: ", e);
//         }
//     }
// }
