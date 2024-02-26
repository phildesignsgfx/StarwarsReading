import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import FotoGrande from "../../img/fotoGrande.jpg";

const SingleVehicles = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      const { respuestaJson, response } = await actions.useFetch(
        `/vehicles/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setVehicle(respuestaJson.result.properties);
      }
    };
    cargaDatos();
  }, []);

  return (
    <>
      <div
        className="single card mb-3 border-dark-subtle p-3"
        style={{ width: "60rem" }}
      >
        <div className="row g-0">
          <div className="col-md-4 mt-5">
            <img
              src={`https://starwars-visualguide.com/assets/img/vehicles/${params.uid}.jpg`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
              }}
              className="img-fluid rounded-start"
              alt="..."
            />
            <div className="single-table" style={{ width: "50rem" }}></div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="name fs-1" scope="col">
                      {vehicle && vehicle.name ? vehicle.name : "Loading"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-secondary">
                    <th scope="row">Model:</th>
                    <td>{vehicle.model}</td>
                  </tr>
                  <tr>
                    <th scope="row">Length:</th>
                    <td>{vehicle.length}</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Manufacturer:</th>
                    <td colspan="2">{vehicle.manufacturer}</td>
                  </tr>
                  <tr>
                    <th scope="row">Cargo Capacity:</th>
                    <td colspan="2">{vehicle.cargo_capacity}</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row"> Max. Speed:</th>
                    <td colspan="2"> {vehicle.max_atmosphering_speed}</td>
                  </tr>
                  <tr>
                    <th scope="row">Class:</th>
                    <td colspan="2">{vehicle.vehicle_class}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVehicles;
