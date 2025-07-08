import { useState } from "react";//this must imported first
import "./flashcard.css";
import AddFlashcard from "./AddFlashcard";

export default function Flashcard() {
        const [showAddFlashcard, setShowAddFlashcard] = useState(false);
        const openAddFlashcard = () => {
            setShowAddFlashcard(true);
        }
        const closeAddFlashcard = () => {
            setShowAddFlashcard(false);
        }


    return (
        <div className="flashcard-content-container">

            {!showAddFlashcard ? (
                <div className="default-content-container">
                    <div className="flashcard-header">
                        <h2>Your Flashcard Sets</h2>
                        <button onClick={openAddFlashcard}>Add</button>
                    </div>
                    <div className="flashcard-sets-container">
                        <div className="sets-container">  
                        </div>
                        <div className="last-viewed-set-container">

                        </div>
                        <div className="bookmark-sets-container">
                            <div className="bookmark-north">
                                <h2>Bookmark</h2>
                                <button>on-review</button>
                                <button>completed</button>
                                <button>pending</button>
                            </div>
                            <div className="bookmarked-set-lists">
                                <ul>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="add-flashcard-container">
                    <AddFlashcard />
                    <button onClick={closeAddFlashcard}>Close</button>
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
