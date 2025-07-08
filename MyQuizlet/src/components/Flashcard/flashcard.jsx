//add a fetch and display functionality to get and show the flashcard set's title and description

import { useState, useEffect } from "react";//this must imported first
import axios from 'axios';
import "./flashcard.css";
import AddFlashcard from "./AddFlashcard";

export default function Flashcard() {
        const [showAddFlashcard, setShowAddFlashcard] = useState(false);
        const [flashcardSets, setFlashcardSets] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchSets = async () =>{
                try{
                    const response = await axios.get("http://localhost:3000/api/flashcard-sets");
                    setFlashcardSets(response.data);//ask that does it do
                    setLoading(false);
                } catch(err){
                    console.error("Error fetching flashcard sets", err);
                    setError("Failed to load flashcard sets");
                    setLoading(false);
                }
            };
            
            fetchSets();
        }, []);//as well as this

        const openAddFlashcard = () => {
            setShowAddFlashcard(true);
        }

        const closeAddFlashcard = () => {
            setShowAddFlashcard(false);
        }

        const refreshFlashcardSets = async () =>{
            try {
                const response = await axios.get("http://localhost:3000/api/flashcard-sets");
                setFlashcardSets(response.data);
            } catch(err){
                console.error("Error refreshing sets", err);
            }
        }

        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };



     return (
        <div className="flashcard-content-container">
            {!showAddFlashcard ? (
                <div className="default-content-container">
                    <div className="flashcard-header">
                        <h2>Your Flashcard Sets</h2>
                        <button onClick={openAddFlashcard}>Add New Set</button>
                    </div>
                    
                    {loading ? (
                        <p>Loading flashcard sets...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="flashcard-sets-container">
                            <div className="sets-container">
                                    {flashcardSets.map((set) => (
                                        <div key={set.id} className="set-card">
                                            <div className="set-title-description">
                                                <span><strong>{set.title}</strong></span>
                                                <span>{set.description}</span>
                                            </div>
                                            <div className="set-meta">
                                                <span>Created: {formatDate(set.created_at)}</span>
                                                <button>Take A Quiz</button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            
                            <div className="last-viewed-set-container">
                                <h3>Recently Viewed</h3>
                                {/* Will implement later */}
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
                                <div className="bookmarked-set-lists">
                                    {/* Will implement later */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="add-flashcard-container">
                    <AddFlashcard onSetCreated={refreshFlashcardSets} closeAddFlashcard={closeAddFlashcard} />
                </div>
            )}
        </div>
    );
}

//when creating a modal, useState is needed to manage the show and hide functionality
/*
Uses the useState hook to create a  showModal state variable that controls whether the modal is visible
Creates  openModal in default button and  closeModal functions in modal button to update the state
Adds an onClick handler to the "Add" button that calls  openModal
Uses conditional rendering with {yourStateName && (content/elements)} to only show the modal when  showModal is true
Creates a modal with an overlay that covers the entire screen and centers the modal content
Adds a close button that calls  closeModal to hide the modal
*/
