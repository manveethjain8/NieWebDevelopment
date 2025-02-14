import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function AirlineView() {
    const [airline, setAirline] = useState({ id: '', airlines: '', source: '', destination: '', duration: '', fare: '' });
    const params = useParams();

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

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />

            <h3><a href="/airlines/list" className="btn btn-light">Go Back</a> View Airline</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="airlines" className="form-label">Airline Name:</label>
                    <div className="form-control" id="airlines">{airline.airlines}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="source" className="form-label">Source:</label>
                    <div className="form-control" id="source">{airline.source}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="destination" className="form-label">Destination:</label>
                    <div className="form-control" id="destination">{airline.destination}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="duration" className="form-label">Duration:</label>
                    <div className="form-control" id="duration">{airline.duration}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="fare" className="form-label">Fare:</label>
                    <div className="form-control" id="fare">{airline.fare}</div>
                </div>
            </div>
        </>
    );
}

export default AirlineView;
