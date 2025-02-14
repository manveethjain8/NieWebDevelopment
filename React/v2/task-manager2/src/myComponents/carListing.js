import MyMenu from './myMenu.js';
import React, { useEffect, useState } from "react";
import MyMenu from './myMenu.js';
import axios from "axios";  
import { useNavigate } from "react-router-dom";

function carListing(props) {
  const [car, setCar]=useState({ID:'',Number:'',Model:'',Type:''});

  const readAllCars=async () => {
      const baseUrl="http://localhost:3001"
      try{
          const response=await axios.get(`${baseUrl}/cars`);
          const queriedCars=response.data;
          setCar(queriedCars);
          alert(response.data.message);
      }catch(error){
          alert('Server error');
      }
  }

  useEffect(()=>{
    readAllCars();
  },[]);
    return (
      <>
        <MyMenu/>
        <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Car Number</th>
              <th scope="col">Car Model</th>
              <th scope="col">Car Type(SUV/Sedan)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>KA-09-H-2024</td>
              <td>Santro</td>
              <td>Hatchback</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>KA-01-O-6661</td>
              <td>Maruthi 69</td>
              <td>SUV</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >KA-02-L-2132</td>
              <td>BMW</td>
              <td>Sedan</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
          </tbody>
        </table>

      </div>
      </>
    );
}

export default carListing;