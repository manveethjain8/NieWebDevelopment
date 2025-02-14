import React, { useState } from "react";
import MyMenu from './myMenu.js';
import axios from "axios";  
import { useNavigate } from "react-router-dom";

export default function addCar() {
    const [car, setCar]=useState({ID:'',Number:'',Model:'',Type:''});
    const navigate=useNavigate();
    const textChange = event => {
        const updatedCar = { ...car };
        updatedCar[event.target.id] = event.target.value;
        setCar(updatedCar);
    }


    const createCar=async () => {
        const baseUrl="http://localhost:3001"
        try{
            const response=await axios.post(`${baseUrl}/cars`,{...car})
            const createdCar=response.data.createdCar;
            setCar(createdCar);
            alert(response.data.message);
            navigate("/carListing");
        }catch(error){
            alert('Server error');
        }

    }
    return (
        <>
            <MyMenu/>
            <div className="container">
            <div class="mb-3">
                <label for="carFormControlInput1" class="form-label">Car Number</label>
                <input type="Number" class="form-control" id="carFormControlInput1" placeholder="Enter Car Number"></input>
            </div>
            <div class="mb-3">
                <label for="carFormControlInput1" class="form-label">Car Model</label>
                <input type="text" class="form-control" id="carFormControlInput2" placeholder="Enter Car Model"></input>
            </div>
            <div class="mb-3">
                <label for="carFormControlInput1" class="form-label">Car Type</label>
                <input type="text" class="form-control" id="carFormControlInput3" placeholder="Enter Car Type"></input>
            </div>

        </div>
        </>
    )
}