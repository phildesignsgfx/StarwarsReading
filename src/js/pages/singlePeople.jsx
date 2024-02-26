import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import FotoGrande from "../../img/fotoGrande.jpg";

const SinglePeople = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [people, setPeople] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/people/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setPeople(respuestaJson.result.properties);
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
              src={`https://starwars-visualguide.com/assets/img/characters/${params.uid}.jpg`}
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
          <div className="col-md-8 mt-5">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="name fs-1" scope="col">
                      {people && people.name ? people.name : "Loading..."}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-secondary">
                    <th scope="row">Gender:</th>
                    <td>{people?.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row">Height:</th>
                    <td>{people?.height}</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Mass:</th>
                    <td colspan="2">{people?.mass}</td>
                  </tr>
                  <tr>
                    <th scope="row">Hair Color:</th>
                    <td colspan="2">{people?.hair_color}</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row"> Birth Year:</th>
                    <td colspan="2">{people?.birth_year}</td>
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

export default SinglePeople;
