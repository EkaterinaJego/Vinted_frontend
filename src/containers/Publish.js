import React from "react";
import "../components/publish.css";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  console.log("Token :", `${token}`);

  const [artTitle, setArtTitle] = useState("");
  const [artDescription, setArtDescription] = useState("");
  const [artPrice, setArtPrice] = useState("");
  const [artCondition, setArtCondition] = useState("");
  const [artCity, setArtCity] = useState("");
  const [artBrand, setArtBrand] = useState("");
  const [artSize, setArtSize] = useState("");
  const [artColor, setArtColor] = useState("");
  const [file, setFile] = useState({});
  const [img, setImg] = useState();

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

  const handleSubmitAnnonce = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("files", file);
    formData.append("title", artTitle);
    formData.append("description", artDescription);
    formData.append("price", artPrice);
    formData.append("size", artSize);
    formData.append("city", artCity);
    formData.append("condition", artCondition);
    formData.append("color", artColor);
    formData.append("brand", artBrand);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          Headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImg(response.data);
      // setArtBrand(response.data)
      // setArtCity(response.data)
      // setArtColor(response.data)
      // setArtCondition(response.data)
      // setArtPrice(response.data)
      // setArtSize(response.data)
      // setArtTitle(response.data)
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="publish-page">
      <div className="vendsincit">Vends ton article</div>
      <form onSubmit={handleSubmitAnnonce}>
        <div className="uploadimg">
          <input
            type="file"
            // accept=".png, jpeg, jpg, gif"
            placeholder="Ajoute une photo"
            onChange={handleArtImg}
          />
          {img && <img src={img} alt="img" />}
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Titre"
            onChange={handleArtTitle}
            value={artTitle}
          />
          <input
            type="text"
            placeholder="Décris ton article"
            onChange={handleArtDescription}
            value={artDescription}
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
            type="text"
            placeholder="Taille"
            onChange={handleArtSize}
            value={artSize}
          />
          <input
            type="text"
            placeholder="Couleur"
            onChange={handleArtColor}
            value={artColor}
          />
          <input
            type="text"
            placeholder="Etat"
            onChange={handleArtCondition}
            value={artCondition}
          />
          <input
            type="text"
            placeholder="Lieu"
            onChange={handleArtCity}
            value={artCity}
          />
        </div>

        <div className="priceart">
          <input
            type="number"
            placeholder="Price"
            onChange={handleArtPrice}
            value={artPrice}
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Publish;
