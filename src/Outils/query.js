import db from "./database";
import { collection, query, getDocs, limit } from "firebase/firestore"; 
// import entreprises from "./data"

// async function ajoutClasses() {

//     for (let i = 0; i < classes.length; i++) {

//         const docRef = await addDoc(collection(db, "Classes"), {
//             id_classe: classes[i].id_classe,
//             intitule: "",
//             joursSemaine: []
//         });
//         console.log("Document written with ID: ", docRef.id);
//     }

// }


// async function ajoutEleves() {

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

// async function ajoutEntreprise() {
  
//     for (let i = 0; i < entreprises.length; i++) {
      
//       try {
//         const q = query(collection(db, "Eleves"), where("id_eleve", "==", entreprises[i].identifiant_eleve))
//         const querySnapshot = await getDocs(q);
//          querySnapshot.forEach(async (document) => {
//           const eleveRef = doc(db, "Eleves", document.id);
//           await updateDoc(eleveRef, { 
//             adresse_entreprise_rue: entreprises[i].rue,
//             adresse_entreprise_cp: entreprises[i].code_postal,
//             adresse_entreprise_ville: entreprises[i].ville
//           })   
//         });
//         console.log("Document written with ID: ");
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
      
//     }

// }


const getAllStudents = async () => {

    let tab = []

    const q = query(collection(db, "Eleves"))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        let obj = {
            identifiant_eleve: doc.data().id_eleve,
            adresse_rue: doc.data().adresse_rue,
            adresse_cp: doc.data().adresse_cp,
            adresse_ville: doc.data().adresse_ville
        }
        tab.push(obj)
    })

    return tab

}

const getTenStudents = async () => {

    let tab = []

    const q = query(collection(db, "Eleves"), limit(10))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        let obj = {
            identifiant_eleve: doc.data().id_eleve,
            adresse_rue: doc.data().adresse_rue,
            adresse_cp: doc.data().adresse_cp,
            adresse_ville: doc.data().adresse_ville
        }
        // console.log(obj)
        tab.push(obj)
    })
    return tab

}

export default getTenStudents

