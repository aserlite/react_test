const apiUrl = "https://api.harvardartmuseums.org/object";
const token = "206a1f99-f4b3-4102-b26b-7b52a769369b";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function SingleItem() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`${apiUrl}/${id}?apikey=${token}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Œuvre récupérée:", data);
        setArtwork(data);
      } catch (error) {
        console.error("Erreur de récupération :", error);
        setError("Impossible de charger l'œuvre.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  useEffect(() => {
    setFavorite(id);
  }, [id]);

  return (
    <Layout>
      <div>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : artwork ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <button onClick={} value="favorite"></button>
            <h1>{artwork.title || "Titre inconnu"}</h1>
            <img
              src={artwork.primaryimageurl}
              alt={artwork.title}
              width="300"
              style={{ borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
            />
            <p style={{ maxWidth: "600px", margin: "20px auto" }}>
              {artwork.description || "Aucune description disponible."}
            </p>
          </div>
        ) : (
          <p>Œuvre non trouvée.</p>
        )}
      </div>
    </Layout>
  );
}
