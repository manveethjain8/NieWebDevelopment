import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function PizzaView() {
    const [pizza, setPizza] = useState({ id: '', name: '', size: '', crust: '' });
    const params = useParams();

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/pizzas/${params.id}`);
            const queriedPizza = response.data;
            setPizza(queriedPizza);
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

            <h3><a href="/pizzas/list" className="btn btn-light">Go Back</a>View Pizza</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Pizza Name:</label>
                    <div className="form-control" id="name">{pizza.name}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="size" className="form-label">Pizza Size:</label>
                    <div className="form-control" id="size">{pizza.size}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="crust" className="form-label">Crust Type:</label>
                    <div className="form-control" id="crust">{pizza.crust}</div>
                </div>
            </div>
        </>
    );
}

export default PizzaView;
