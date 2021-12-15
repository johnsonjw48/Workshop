import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import getTenStudents from '../Outils/query';


const calculTrajet = async () => {
  try {
    // const students = await getAllStudents()
    const students = await getTenStudents()
    students.forEach(async(student) => {
      let adresse = ''
      student.adresse_rue.split(' ').forEach(element => {
        adresse+=element+'+'
      })
      adresse+=student.adresse_cp+'+'   
      student.adresse_ville.split(' ').forEach(element => {
        adresse+=element+'+'
      })
      adresse = adresse.substring(0, adresse.length - 1)

      const result = await fetch(`http://localhost:3000/https://maps.googleapis.com/maps/api/directions/json?origin=${adresse}&destination=Digital+Campus+Paris&mode=transit&key=AIzaSyAxUo5Cc50LAlwFNgOa00DNfCuCBQKDMq4`)
      const data = await result.json()

      // console.log(data)
      if(data.status !== 'ZERO_RESULTS') {
        const steps = data.routes[0].legs[0].steps
        let tab = []

        steps.filter(step => 
        step.travel_mode !== 'WALKING'
        ).forEach(step => {
          let obj = {
            distance : step.distance.value,
            vehicle_type: step.transit_details.line.vehicle.name
          }
          tab.push(obj)
        })
        console.log(tab)
      }

    })

  } catch(e) {
    console.log(e)
  }
}

calculTrajet()



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