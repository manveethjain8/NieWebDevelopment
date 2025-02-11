import React from "react";
import MyMenu from './myMenu.js';

export default function addCar() {
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