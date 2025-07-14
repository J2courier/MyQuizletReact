import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./flashcard.css";
// import '../index.css';
import AddFlashcard from "./AddFlashcard";
import FlashcardViewMode from "./FlashcardViewMode";

export default function Flashcard() {
  const [showAddFlashcard, setShowAddFlashcard] = useState(false);
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing recently viewed from localStorage", e);
      }
    }
  }, []);

  // Fetch flashcard sets
  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/flashcard-sets");
        setFlashcardSets(response.data);
      } catch (err) {
        console.error("Error fetching flashcard sets", err);
        setError("Failed to load flashcard sets");
      } finally {
        setLoading(false);
      }
    };
    fetchSets();
  }, []);

  const handleCardClick = (setId) => {
    setSelectedSetId((prev) => (prev === setId ? null : setId));
    setShowAddFlashcard(false);

    // Update recently viewed
    setRecentlyViewed((prev) => {
      const updated = [setId, ...prev.filter((id) => id !== setId)];
      const limited = updated.slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(limited));
      return limited;
    });
  };

  const openAddFlashcard = () => {
    setShowAddFlashcard(true);
    setSelectedSetId(null);
  };

  const closeAddFlashcard = () => {
    setShowAddFlashcard(false);
  };

  const refreshFlashcardSets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/flashcard-sets");
      setFlashcardSets(response.data);
    } catch (err) {
      console.error("Error refreshing sets", err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const setContainerRef = useRef(null);
  const [scrollShadow, setScrollShadow] = useState({
    top: false,
    bottom: false,
  });

  useEffect(() => {
    const el = setContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;

      setScrollShadow({
        top: !atTop,
        bottom: !atBottom,
      });
    };

    handleScroll(); // run once on mount
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flashcard-content-container">
      <div className="flashcard-header">
        {!selectedSetId && !showAddFlashcard ? (
          <>
            <h2>Your Flashcard Sets</h2>
            <button onClick={openAddFlashcard}>Add New Set</button>
          </>
        ) : selectedSetId ? (
          <>
            <h2>
              {flashcardSets.find((set) => set.id === selectedSetId)?.title || "Flashcard Set"}
            </h2>
            <button onClick={() => setSelectedSetId(null)}>Back to Sets</button>
          </>
        ) : null}
      </div>

      <div className={`set-list-view ${showAddFlashcard || selectedSetId ? "hidden" : ""}`}>
        {loading ? (
          <p>Loading flashcard sets...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div
              ref={setContainerRef}
              className={`sets-container ${scrollShadow.top ? "has-top-shadow" : ""} ${scrollShadow.bottom ? "has-bottom-shadow" : ""}`}
            >
              {flashcardSets.map((set) => (
                <div
                  key={set.id}
                  className={`set-card ${selectedSetId === set.id ? "selected" : ""}`}
                  onClick={() => handleCardClick(set.id)}
                >
                  <div className="set-title-description">
                    <span><strong>{set.title}</strong></span>
                    <span>{set.description}</span>
                  </div>
                  <div className="set-meta">
                    <span>Created: {formatDate(set.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recently Viewed Section */}
            <div className="last-viewed-set-container">
              <h3>Recently Viewed</h3>
              {recentlyViewed.length === 0 ? (
                <p>No sets viewed yet.</p>
              ) : (
                <div className="recent-sets">
                  {recentlyViewed.map((id) => {
                    const set = flashcardSets.find((s) => s.id === id);
                    if (!set) return null;
                    return (
                      <div
                        key={id}
                        className="recent-set-card"
                        onClick={() => handleCardClick(id)}
                      >
                        <strong>{set.title}</strong>
                        <div className="small-meta">
                          Viewed | Created: {formatDate(set.created_at)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bookmark-sets-container">
              <div className="bookmark-north">
                <h2>Bookmark</h2>
                <div className="status-filters">
                  <button>on-review</button>
                  <button>completed</button>
                  <button>pending</button>
                </div>
              </div>
              <div className="bookmarked-set-lists">{/* implement later */}</div>
            </div>
          </>
        )}
      </div>

      {/* Flashcard View Mode */}
      <div className={`flashcard-view-mode ${selectedSetId && !showAddFlashcard ? "" : "hidden"}`}>
        <FlashcardViewMode setId={selectedSetId} onBack={() => setSelectedSetId(null)} />
      </div>

      {/* Add Flashcard Form */}
      <div className={`add-flashcard-container ${showAddFlashcard ? "" : "hidden"}`}>
        <AddFlashcard onSetCreated={refreshFlashcardSets} closeAddFlashcard={closeAddFlashcard} />
      </div>
    </div>
  );
}
