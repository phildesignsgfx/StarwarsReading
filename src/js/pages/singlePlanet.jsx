import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import FotoGrande from "../../img/fotoGrande.jpg";

const SinglePlanet = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [planet, setPlanet] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/planets/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setPlanet(respuestaJson.result.properties);
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
              src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg";
              }}
              className="img-fluid rounded-start"
              alt="..."
            />
            <div className="single-table" style={{ width: "50rem" }}></div>
          </div>
          <div className="col-md-8 mt-3">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="name fs-1" scope="col">
                      {planet && planet.name ? planet.name : "Loading..."}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-secondary">
                    <th scope="row">Climate:</th>
                    <td>{planet.climate}</td>
                  </tr>
                  <tr>
                    <th scope="row">Diameter:</th>
                    <td>{planet.diameter}</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Gravity:</th>
                    <td colspan="2">{planet.gravity}</td>
                  </tr>
                  <tr>
                    <th scope="row">Orbital Period:</th>
                    <td colspan="2">{planet.orbital_period}</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row"> Population:</th>
                    <td colspan="2">{planet.population}</td>
                  </tr>
                  <tr>
                    <th scope="row">Terrain:</th>
                    <td colspan="2">{planet.terrain}</td>
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

export default SinglePlanet;
