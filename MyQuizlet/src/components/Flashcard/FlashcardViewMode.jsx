import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './FlashcardViewMode.css';

export default function FlashcardViewMode({ setId, onBack }) {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState('');
    const animationTimeout = useRef(null);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const rs = await axios.get(`http://localhost:3000/api/flashcards/set/${setId}`);
                setFlashcards(rs.data);
                setCurrentIndex(0);
            } catch (err) {
                console.error("Error fetching Flashcards", err);
                setError("Failed to Load flashcards");
            } finally {
                setLoading(false);
            }
        };
        if (setId) {
            fetchFlashcards();
        }
        return () => {
            if (animationTimeout.current) clearTimeout(animationTimeout.current);
        };
    }, [setId]);

    const navigateCard = (newDirection) => {
        if (animationTimeout.current) clearTimeout(animationTimeout.current);
        
        setDirection(newDirection);
        setIsFlipped(false);
        
        animationTimeout.current = setTimeout(() => {
            setDirection('');
            if (newDirection === 'next') {
                setCurrentIndex(prev => Math.min(prev + 1, flashcards.length - 1));
            } else {
                setCurrentIndex(prev => Math.max(prev - 1, 0));
            }
        }, 300);
    };

    const handlePrev = () => navigateCard('prev');
    const handleNext = () => navigateCard('next');

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="FlashcardItemsContainer">
            {loading ? (
                <span>Loading Flashcards...</span>
            ) : error ? (
                <span className='error-message'>{error}</span>
            ) : flashcards.length === 0 ? (
                <span>No Flashcard Available for this set.</span>
            ) : (
                <div className="carousel-wrapper">

                    
                    <div 
                        className={`card-container ${direction}`}
                        onClick={handleFlip}
                    >
                        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
                            <div className="card-front">
                                <div className="card-content">
                                    <strong>{flashcards[currentIndex].term}</strong>
                                    <div className="hint">Click to flip</div>
                                </div>
                            </div>
                            <div className="card-back">
                                <div className="card-content">
                                    {flashcards[currentIndex].definition}
                                    <div className="hint">Click to flip</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    


                </div>

            )}
                <div className="btn-container">
                    <button>bookmark</button>
                    <button>set timer</button>
                    <button>Shuffle</button>
                    <button 
                        className="carousel-btn" 
                        onClick={handlePrev} 
                        disabled={currentIndex === 0}
                    >
                        &#8592;
                    </button>
                    <button 
                        className="carousel-btn" 
                        onClick={handleNext} 
                        disabled={currentIndex === flashcards.length - 1}
                    >
                        &#8594;
                    </button>
                    <button>take test</button>
                    <button>your thoughts</button>
                    <button>edit</button>
                </div>
        </div>
    );
}