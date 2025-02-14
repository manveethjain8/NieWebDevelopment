import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function AirlineList() {
    const [airlines, setAirlines] = useState([]);
    const [loading, setLoading] = useState(true);

    const readAllAirlines = async () => {
        setLoading(true);
        try {
            const baseUrl = 'http://localhost:8080';
            const response = await axios.get(`${baseUrl}/airlines`);
            const queriedAirlines = response.data;
            setAirlines(queriedAirlines);
        } catch (error) {
            alert('Server Error');
        } finally {
            setLoading(false);
        }
    };

    const deleteAirline = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm("Are you sure to delete?")) {
            return;
        }
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.delete(`${baseUrl}/airlines/${id}`);
            alert(response.data.message);
            await readAllAirlines();
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readAllAirlines();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PageHeader />
            <div className="container d-flex justify-content-center"><h1>Airlines</h1></div>
            <div className="container">
                <DataTable value={airlines} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID" style={{ width: '10%' }} />
                    <Column field="airlines" header="Airline Name" style={{ width: '20%' }} />
                    <Column field="source" header="Source" style={{ width: '20%' }} />
                    <Column field="destination" header="Destination" style={{ width: '20%' }} />
                    <Column field="duration" header="Duration" style={{ width: '15%' }} />
                    <Column field="fare" header="Fare" style={{ width: '15%' }} />
                    <Column body={(rowData) => (
                        <>
                            <a href={`/airlines/view/${rowData.id}`} className="btn btn-success">View</a>
                            &nbsp;
                            <a href={`/airlines/edit/${rowData.id}`} className="btn btn-warning">Edit</a>
                            &nbsp;
                            <button className="btn btn-danger" onClick={() => deleteAirline(rowData.id)}>Delete</button>
                        </>
                    )} />
                </DataTable>
            </div>
        </>
    );
}

export default AirlineList;
