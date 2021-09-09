import React from "react";
import "./publish.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Publish = ({ token, myUrl }) => {
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
    console.log("file = ", file);
    try {
      // console.log("artTitle) = ", artTitle);
      // console.log("formData = ", formData);
      console.log("token = ", token);
      const response = await axios.post(`${myUrl}/offer/publish`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        history.push(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log("ERREUR : ", error);
    }
  };

  return (
    <>
      <div className="publish-page">
        <div className="vendsincit">Vends ton article</div>
        <form onSubmit={handleSubmitAnnounce}>
          <div className="uploadimg">
            <div className="inneruploadimg">
              <input
                type="file"
                accept=".png, .jpeg, .jpg, .gif"
                onChange={handleArtImg}
              />
            </div>
          </div>
          <div className="description">
            <div className="spantextarea">
              <span>Titre</span>
              <textarea
                type="text"
                placeholder="ex.Chemise Sézan verte..."
                onChange={handleArtTitle}
                value={artTitle}
                required
              />
            </div>
            <div className="spantextarealast">
              <span>Descris ton article</span>
              <textarea
                type="text"
                placeholder="ex.Portée quelques fois..."
                onChange={handleArtDescription}
                value={artDescription}
              />
            </div>
          </div>

          <div className="articledetails">
            <div className="spantextarea">
              <span>Marque</span>
              <input
                type="text"
                placeholder="ex.Zara"
                onChange={handleArtBrand}
                value={artBrand}
              />
            </div>
            <div className="spantextarea">
              <span>Taille</span>
              <input
                type="number"
                placeholder="ex.L/40/12"
                onChange={handleArtSize}
                value={artSize}
                required
              />
            </div>
            <div className="spantextarea">
              <span>Couleur</span>
              <input
                type="text"
                placeholder="ex.Fushia"
                onChange={handleArtColor}
                value={artColor}
              />
            </div>

            <div className="spantextarea">
              <span>Etat</span>
              <input
                type="text"
                placeholder="ex.Neuf avec étiquette"
                onChange={handleArtCondition}
                value={artCondition}
              />
            </div>
            <div className="spantextarea">
              <span>Lieu</span>
              <input
                type="text"
                placeholder="ex.Paris"
                onChange={handleArtCity}
                value={artCity}
                required
              />
            </div>
          </div>

          <div className="priceart">
            <div className="spantextarealast">
              <span>Price</span>
              <textarea
                type="number"
                placeholder="0.00 €"
                onChange={handleArtPrice}
                value={artPrice}
                required
              />
            </div>
            <div className="checkboxmain">
              <div className="artcheckbox">
                <input type="checkbox" />
                <span>Je suis intéressé(e) par les échanges</span>
              </div>
            </div>
          </div>
          <div className="addbtn">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Publish;
