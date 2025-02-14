import React from "react";
import Navbar from "./navBar.js";

export default function AddBook() {
    return (
        <>
        <Navbar/>
        <div className="container">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ISBN Code</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter ISBN Code"></input>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Book Title</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Book Title"></input>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Author</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Author Name"></input>
            </div>

        </div>
        </>
        
    )
}