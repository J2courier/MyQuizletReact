//needed edit, delete functionality
import { useState } from "react";
import axios from "axios";
import "./AddFlashcard.css";

export default function AddFlashcard() {

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [setId, setSetId] = useState(null);
  const [flashcards, setFlashcards] = useState([{ term: "", definition: "" }]);

  const handleSetChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/flashcard-sets", formData);
      setSetId(res.data.id); // store set id
      alert(`Created set: ${res.data.title}`);
    } catch (error) {
      alert("Failed to create flashcard set");
    }
  };

  const handleFlashcardChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...flashcards];
    updated[index][name] = value;
    setFlashcards(updated);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  const submitFlashcards = async () => {
    try {
      const requests = flashcards.map(fc =>
        axios.post("http://localhost:3000/api/flashcards", {
          set_id: setId, 
          term : fc.term,
          definition: fc.definition,
        })
      );
      await Promise.all(requests);
      alert("Flashcards added successfully!");
      setFlashcards([{ term: "", definition: ""}]); 
    } catch (err) {
      console.error("Submission Error", err);
      alert("Failed to add flashcards");
    }
  };

  return (
    <div className="add-flashcard">
      <h2>Create a Flashcard Set</h2>
      <form onSubmit={handleCreateSet}>
        <input
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleSetChange}
          required
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleSetChange}
          rows="3"
        />
        <button type="submit" disabled={setId !== null}>Create Set</button>
      </form>

      {setId && (
        <>
          <h3>Add Terms & Definitions</h3>
          {flashcards.map((fc, index) => (
            <div key={index} className="flashcard-input">
              <input
                name="term"
                placeholder="Term"
                value={fc.term}
                onChange={(e) => handleFlashcardChange(index, e)}
              />
              <input
                name="definition"
                placeholder="Definition"
                value={fc.definition}
                onChange={(e) => handleFlashcardChange(index, e)}
              />
            </div>
          ))}
          <button onClick={addFlashcard}>+ Add Another Card</button>
          <button onClick={submitFlashcards}>Submit Flashcards</button>
        </>
      )}
    </div>
  );
}
