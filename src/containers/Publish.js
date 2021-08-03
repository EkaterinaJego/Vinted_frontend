import React from "react";
import "../components/publish.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Publish = ({ token }) => {
  console.log("Token :", token);
  const history = useHistory();

  const [artTitle, setArtTitle] = useState("");
  const [artDescription, setArtDescription] = useState("");
  const [artPrice, setArtPrice] = useState("");
  const [artCondition, setArtCondition] = useState("");
  const [artCity, setArtCity] = useState("");
  const [artBrand, setArtBrand] = useState("");
  const [artSize, setArtSize] = useState("");
  const [artColor, setArtColor] = useState("");
  const [file, setFile] = useState({});

  const handleArtTitle = (event) => {
    setArtTitle(event.target.value);
  };
  const handleArtDescription = (event) => {
    setArtDescription(event.target.value);
  };
  const handleArtPrice = (event) => {
    setArtPrice(event.target.value);
  };

  const handleArtCondition = (event) => {
    setArtCondition(event.target.value);
  };

  const handleArtCity = (event) => {
    setArtCity(event.target.value);
  };

  const handleArtBrand = (event) => {
    setArtBrand(event.target.value);
  };

  const handleArtSize = (event) => {
    setArtSize(event.target.value);
  };

  const handleArtColor = (event) => {
    setArtColor(event.target.value);
  };

  const handleArtImg = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitAnnounce = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", artTitle);
      formData.append("description", artDescription);
      formData.append("price", artPrice);
      formData.append("condition", artCondition);
      formData.append("brand", artBrand);
      formData.append("size", artSize);
      formData.append("city", artCity);
      formData.append("color", artColor);
      formData.append("picture", file);
      console.log("file)) = ", file);

      // console.log("artTitle) = ", artTitle);
      // console.log("formData = ", formData);
      // console.log("token = ", token);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response = ", response);
      if (response.status === 200) {
        history.push(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log("ERREUR : ", error);
    }
  };

  return (
    <div className="publish-page">
      <div className="vendsincit">Vends ton article</div>
      <form onSubmit={handleSubmitAnnounce}>
        <div className="uploadimg">
          <input
            type="file"
            // accept=".png, jpeg, jpg, gif"
            placeholder="Ajoute une photo"
            onChange={handleArtImg}
          />
          {file && <img src={file} alt="img" />}
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Titre"
            onChange={handleArtTitle}
            value={artTitle}
            required
          />
          <input
            type="text"
            placeholder="Décris ton article"
            onChange={handleArtDescription}
            value={artDescription}
            required
          />
        </div>

        <div className="articledetails">
          <input
            type="text"
            placeholder="Marque"
            onChange={handleArtBrand}
            value={artBrand}
          />
          <input
            type="number"
            placeholder="Taille"
            onChange={handleArtSize}
            value={artSize}
            required
          />
          <input
            type="text"
            placeholder="Couleur"
            onChange={handleArtColor}
            value={artColor}
            required
          />
          <input
            type="text"
            placeholder="Etat"
            onChange={handleArtCondition}
            value={artCondition}
            required
          />
          <input
            type="text"
            placeholder="Lieu"
            onChange={handleArtCity}
            value={artCity}
            required
          />
        </div>

        <div className="priceart">
          <input
            type="number"
            placeholder="Price"
            onChange={handleArtPrice}
            value={artPrice}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Publish;
