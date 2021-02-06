import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

// Components
import OfferCard from "../OfferCard/index";
import Layout from "../../containers/Layout";

// Styled Components
//import { CatalogueWrapper, EmpleosColumn } from './styles';
import "./styles.css";

const Catalogo = () => {
  const [empleos, setEmpleo] = useState([
    {
      _id: "",
      title: "",
      description: "",
      location: "",
      remote: "",
      tipo: "",
      end: "",
      linkedIn: "",
    },
  ]);

  useEffect(() => {
    getAllEmpleos();
  }, []);

  const getAllEmpleos = () => {
    axios.get("http://localhost:5000/empleos/").then((response) => {
      setEmpleo(response.data);
    });
    // setEmpleo([])
    // dispatch(getEmpleos());
  };

  return (
    <Layout>
      <div>
        <h3 className="offertitle">Bolsa de Trabajo</h3>
        <h5>¿Eres empresa? <button className="btn">Publica tu oferta</button></h5>
      </div>
      <div className="catalogueWrapper">
        <div className="empleosColumn">
          {empleos.map((empleo, index) => {
            return <OfferCard empleo={empleo} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Catalogo;
