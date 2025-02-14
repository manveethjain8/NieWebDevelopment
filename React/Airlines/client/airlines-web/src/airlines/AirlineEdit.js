import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function AirlineEdit() {
    const [airline, setAirline] = useState({
        airlines: '',
        source: '',
        destination: '',
        duration: '',
        fare: ''
    });
    const params = useParams();
    const navigate = useNavigate();

    const txtBoxOnChange = event => {
        const updatableAirline = { ...airline };
        updatableAirline[event.target.id] = event.target.value;
        setAirline(updatableAirline);
    };

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/airlines/${params.id}`);
            const queriedAirline = response.data;
            setAirline(queriedAirline);
        } catch (error) {
            alert('Server Error');
        }
    };

    const updateAirline = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.put(`${baseUrl}/airlines/${params.id}`, { ...airline });
            const updatedAirline = response.data.airline;
            setAirline(updatedAirline);
            alert(response.data.message);
            navigate('/airlines/list');
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            
            <h3><a href="/airlines/list" className="btn btn-light">Go Back</a> Edit Airline</h3>
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
                <button className="btn btn-warning"
                    onClick={updateAirline}>Update Airline</button>
            </div>
        </>
    );
}

export default AirlineEdit;
