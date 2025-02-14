import React from 'react';
import Navbar from './navBar.js';

function task(props) {
    return (
        <>
        <Navbar/>
        <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ISBN Code</th>
              <th scope="col">Book Title</th>
              <th scope="col">Author</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>23456786543</td>
              <td>The Wheel of Time</td>
              <td>Robert Jordan</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>98745678656</td>
              <td>The Shadow of the Time</td>
              <td>Carlos Ruiz Zaton</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >98654356787</td>
              <td>Threads of Destiny</td>
              <td>yrsillar</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
          </tbody>
        </table>

      </div>
        </>
        
    );
}

export default task;