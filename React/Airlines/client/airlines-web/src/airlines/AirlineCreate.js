import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AirlineCreate() {
    const [airline, setAirline] = useState({
        airlines: '',
        source: '',
        destination: '',
        duration: '',
        fare: ''
    });
    const navigate = useNavigate();

    const txtBoxOnChange = event => {
        const { id, value } = event.target;  // Destructure id and value from event.target
        const updatableAirline = { ...airline };
    
        // Handle 'fare' input specifically to ensure it's a number
        if (id === "fare") {
            updatableAirline[id] = parseFloat(value) || 0;  // Convert to number (defaults to 0 if NaN)
        } else {
            updatableAirline[id] = value;
        }
    
        setAirline(updatableAirline);   
    };

    const createAirline = async () => {
        const baseUrl = "http://localhost:8080";
    
        // Convert the fare to a number if it's a string
        const updatedAirline = { ...airline };
        updatedAirline.fare = parseFloat(updatedAirline.fare) || 0;  // Convert fare to a number
    
        console.log("Airline object to be sent:", JSON.stringify(updatedAirline, null, 2));
    
        try {
            const response = await axios.post(`${baseUrl}/airlines`, updatedAirline);
            console.log("Server Response:", response);
    
            const createdAirline = response.data.airline;
            setAirline(createdAirline);
            alert(response.data.message);
            navigate('/airlines/list');
        } catch (error) {
            alert('Server Error');
            console.error('Error:', error);
        }
    };
    

    return (
        <>
            <PageHeader />
            <h3><a href="/airlines/list" className="btn btn-light">Go Back</a> Add Airline</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="airlines" className="form-label">Airline Name:</label>
                    <input type="text" className="form-control" id="airlines" 
                        placeholder="Please enter airline name"
                        value={airline.airlines} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="source" className="form-label">Source:</label>
                    <input type="text" className="form-control" id="source" 
                        placeholder="Please enter source city"
                        value={airline.source} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="destination" className="form-label">Destination:</label>
                    <input type="text" className="form-control" id="destination" 
                        placeholder="Please enter destination city"
                        value={airline.destination} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="duration" className="form-label">Duration:</label>
                    <input type="text" className="form-control" id="duration" 
                        placeholder="Please enter duration (e.g., 2h 30m)"
                        value={airline.duration} 
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="fare" className="form-label">Fare:</label>
                    <input type="number" className="form-control" id="fare" 
                        placeholder="Please enter fare amount"
                        value={airline.fare} 
                        onChange={txtBoxOnChange} />
                </div>
                <button className="btn btn-primary" onClick={createAirline}>
                    Create Airline
                </button>
            </div>
        </>
    );
}

export default AirlineCreate;
