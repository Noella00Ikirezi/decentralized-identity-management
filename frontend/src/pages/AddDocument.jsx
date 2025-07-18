import React, { useState } from "react";
import axios from "axios";
import "../styles/AddDocument.css";

export default function AddDocument() {
  const [form, setForm] = useState({
    title: "",
    docType: "",
    file: null,
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.file) {
      setMessage("❌ Veuillez sélectionner un fichier.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload du fichier vers IPFS
      const formData = new FormData();
      formData.append("file", form.file);

      const ipfsRes = await axios.post("http://localhost:5000/ipfs/upload", formData);
      const { cid } = ipfsRes.data;
      

      // 3. Préparer les métadonnées pour le backend (doit correspondre au contrat)
      const docData = {
        cid,                                // string
        mimeType: form.file.type,          // string
        title: form.title,                 // string
        docType: form.docType              // string
      };

      // 4. Envoyer au backend
      await axios.post("http://localhost:5000/documents", docData);
      setMessage("✅ Document ajouté avec succès !");
      setForm({ title: "", docType: "", file: null });

    } catch (err) {
      console.error("❌ Erreur :", err);
      setMessage("❌ Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-doc-container">
      <form className="add-doc-box" onSubmit={handleSubmit}>
        <h2>Ajouter un document</h2>

        <label>
          Titre du document
          <input
            type="text"
            name="title"
            placeholder="Ex: Passeport"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Type de document
          <input
            type="text"
            name="docType"
            placeholder="Ex: Identité, Santé..."
            value={form.docType}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Pièce jointe
          <input
            type="file"
            name="file"
            accept="*/*"
            onChange={handleChange}
            required
          />
        </label>

        <button className="validate-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Chargement..." : "Valider"}
        </button>

        {message && <p className="upload-message">{message}</p>}
      </form>

      <a href="/dashboard" className="back-btn" title="Retour">
        <span role="img" aria-label="retour">↩️</span>
      </a>
    </div>
  );
}
