import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import student from '../Outils/data'



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