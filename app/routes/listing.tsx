import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const apiUrl = "https://api.harvardartmuseums.org/object";
const token = "206a1f99-f4b3-4102-b26b-7b52a769369b";

export default function Listing() {
  const [artworks, setArtworks] = useState([]);
  const [sortedArtworks, setSortedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState(""); // État pour le tri
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?size=100&apikey=${token}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Data reçue:", data);

        const artworksWithImages = data.records.filter((art) => art.primaryimageurl);

        const shuffled = artworksWithImages.sort(() => 0.5 - Math.random()).slice(0, 25);

        setArtworks(shuffled);
        setSortedArtworks(shuffled);
      } catch (error) {
        console.error("Erreur lors de la récupération des œuvres :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction de tri
  useEffect(() => {
    let sorted = [...artworks];

    if (sortType === "title-asc") {
      sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortType === "title-desc") {
      sorted.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    } else if (sortType === "year-asc") {
      sorted.sort((a, b) => (a.dated || 0) - (b.dated || 0));
    } else if (sortType === "year-desc") {
      sorted.sort((a, b) => (b.dated || 0) - (a.dated || 0));
    }

    setSortedArtworks(sorted);
  }, [sortType, artworks]);

  return (
    <Layout>
      <div>
        <h1>Galerie d'Art</h1>

        {/* Sélecteur de tri */}
        <label>
          Trier par :
          <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="">Aléatoire</option>
            <option value="title-asc">Titre (A → Z)</option>
            <option value="title-desc">Titre (Z → A)</option>
            <option value="year-asc">Année (plus ancienne → récente)</option>
            <option value="year-desc">Année (plus récente → ancienne)</option>
          </select>
        </label>

        {loading ? (
          <p>Chargement des œuvres...</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
            {sortedArtworks.map((art) => (
              <div key={art.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/single/${art.id}`)}>
                <img
                  src={art.primaryimageurl}
                  alt={art.title}
                  width="200"
                  style={{ borderRadius: "10px", transition: "0.3s", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
