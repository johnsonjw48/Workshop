import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getTenStudents, emissionCalcul} from '../Outils/query';

require('dotenv').config()

const calculTrajet = async () => {
  try {
    // const students = await getAllStudents();

    const students = await getTenStudents();

    students.forEach(async(student) => {
      let adress = '';

      student.adresse_rue.split(' ')
        .forEach(element => adress += element + '+');
      adress += student.adresse_cp + '+';
      student.adresse_ville.split(' ')
        .forEach(element => adress += element + '+');
      adress = adress.substring(0, adress.length - 1);

      const result = await fetch(`https://digital-dashboard-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${adress}&destination=Digital+Campus+Paris&mode=transit&key=${process.env.REACT_APP_API_KEY}`);
      const data = await result.json();

      if (data.status !== 'ZERO_RESULTS') {
        const steps = data.routes[0].legs[0].steps;
        let arrayData = [];

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

        arrayData.forEach( async (data) => {
          let distanceKM = data.distance / 1000;
          let emissionCO2 = await emissionCalcul(distanceKM, data.vehicle_type);
          // console.log(emissionCO2)
          tabCO2.push(emissionCO2);
        })
        
        setTimeout(() => {
          // console.log(tabCO2)
          return tabCO2
        }, 1000);
      }
    })
  } catch(e) {
    console.log(e);
  }
}

const test = async () => {
  let trajet = await calculTrajet()
  setTimeout(() => {
    console.log(trajet)
  }, 1000);
  
}

test()

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