import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { emissionCalcul, insertDateTimeEmission, getAllStudents, incrementeTransport} from '../Outils/query';

require('dotenv').config()


const ajoutBDD = async() => {
  // popularTransport()
  // addClasses()
  // addStudents()
  // addIDClasse()
  // addCompanies()
}

ajoutBDD()

const calculTrajet = async () => {
  try {

    const students = await getAllStudents();

    students.forEach(async(student) => {
      let adress = ' ';
      let adresse_entreprise = ' ';

      if(student.adresse_rue === undefined && student.adresse_ville === undefined) {
        student.adresse_rue = ' '
        student.adresse_ville = ' '
      }
      student.adresse_rue.split(' ')
        .forEach(element => adress += element + '+');
      adress += student.adresse_cp + '+';
      student.adresse_ville.split(' ')
        .forEach(element => adress += element + '+');
      adress = adress.substring(0, adress.length - 1);

      if(student.etat === 'alternant') {
        if(student.adresse_entreprise_rue === undefined && student.adresse_entreprise_ville === undefined) {
          student.adresse_entreprise_rue = ' '
          student.adresse_entreprise_ville= ' '
        }
        student.adresse_entreprise_rue.split(' ')
          .forEach(element => adresse_entreprise += element + '+');
          adresse_entreprise += student.adresse_entreprise_cp + '+';
        student.adresse_entreprise_ville.split(' ')
          .forEach(element => adresse_entreprise += element + '+');
          adresse_entreprise = adresse_entreprise.substring(0, adresse_entreprise.length - 1);
      }

      const result = await fetch(`https://digital-dashboard-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${adress}&destination=${student.etat === 'alternant' ? adresse_entreprise : 'Digital+Campus+Paris'}&mode=transit&key=${process.env.REACT_APP_API_KEY}`);
      const data = await result.json();     

      if (data.routes.length !== 0) {
        const steps = data.routes[0].legs[0].steps;
        let arrayData = [];
        
        let totalKm = data.routes[0].legs[0].distance.value / 1000;

        steps.filter(step => step.travel_mode !== 'WALKING')
          .forEach(step => {
            let data = {
              distance : step.distance.value,
              vehicle_type: step.transit_details.line.vehicle.name
            }
            arrayData.push(data);
          }
        )
        
        let tabCO2 = [];
        let tabTransports = [];

        arrayData.forEach( async (data) => {
          let distanceKM = data.distance / 1000;
          let emissionCO2 = await emissionCalcul(distanceKM, data.vehicle_type);
          tabCO2.push(emissionCO2);
          tabTransports.push(data.vehicle_type);
        })
        
        let totalCO2 = 0;
        
        await timeout(1000)
        tabCO2.forEach(emission => {
          totalCO2+=emission
        })

        insertDateTimeEmission(student.identifiant_eleve, totalCO2, totalKm)
        incrementeTransport(tabTransports)

      }
    })
  } catch(e) {
    console.log(e);
  }
}

calculTrajet()


const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Eleves = () => {
  const percentage = 71;
    return (
<div>
     <div class="row d-flex justify-content-center ">
        <div class="card bg-light mb-3 w-25 " >
        <div class="card-header text-primary font-weight-bold">Meilleure classe</div>
        <div class="card-body">
          <h5 class="card-title">Emission par pers.</h5>
          <p class="card-text">0,2t CO2</p>
        </div>
     </div>


        <div class="ml-3 card bg-light mb-3 w-25" >
        <div class="card-header text-primary font-weight-bold">Meilleure promo</div>
        <div class="card-body">
          <h5 class="card-title">Emission par pers.</h5>
          <p class="card-text">0,5t CO2</p>
        </div>
        </div>
    </div>

    <div class= "d-flex justify-content-center">
    <div class="ml-3 mt-5 card bg-light mb-3 w-50" >
        <div class="card-header text-primary font-weight-bold ">Taux de consommation  de l'école</div>
        <div class="card-body d-flex justify-content-center">
     

        <i class="fas fa-home d-inline mt-5"></i>  
       <div class=" w-25 h-50 mt-5 d-inline" >
        <CircularProgressbar value={percentage} text={`${percentage}%`} />;
      </div>
        </div>
        </div>
    </div>
</div>
    


    );
};

export default Eleves;