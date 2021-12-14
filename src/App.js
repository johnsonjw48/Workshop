import './App.css';
import  Eleves from './Component/Eleves'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import student from './Outils/data'



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, addDoc  } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBKSOfmXwsiivLEzldZR9vP0jHY0rG3ejw",
  authDomain: "dashboard-7ee84.firebaseapp.com",
  projectId: "dashboard-7ee84",
  storageBucket: "dashboard-7ee84.appspot.com",
  messagingSenderId: "171050040674",
  appId: "1:171050040674:web:fb4420d0c89d14fbd3803b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();


async function ajoutEleves() {
  
    for (let i = 0; i < student.length; i++) {
      
      try {
        const docRef = await addDoc(collection(db, "Eleves"), {
          adresse_rue: student[i].rue,
          adresse_cp: student[i].code_postal,
          adresse_ville: student[i].ville,
          etat: student[i].etat,
          saison: student[i].saison,
          id_classe: student[i].id_classe

        });
      
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    }

}

// ajoutEleves()

async function getEleve() {
  const querySnapshot = await getDocs(collection(db, "Eleves"));
  console.log(querySnapshot.docs.length)
};

getEleve()



function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/eleve">Eleve</Link>
            </li>
            <li>
              <Link to="/ecole">Ecole</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/eleve">
           <Eleves/>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
