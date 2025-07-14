import { useEffect, useState } from "react";
import './loading.css';

export default function Loading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (progress < 100) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2;
                })
            }, 100); 
            return () => clearInterval(interval);
        }
    }, [progress]);

    return (
        <div className="loading-container">
            <div className="text-container">
                <div className="wave-text">
                    {"Loading your experience".split("").map((char, i) => (
                        <span 
                            key={i} 
                            className="char" 
                            style={{ 
                                animationDelay: `${i * 0.05}s`,
                                color: i % 2 === 0 ? '#8ae6ff' : '#d8b5ff'
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="progress-container">
                <div className="progress-track">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progress}%` }}
                    >
                        {/* <div className="progress-glow"></div>
                        <div className="progress-stripes"></div> */}
                        {progress}%
                    </div>
                </div>
            </div>
            
            <div className="loading-dots">
                <div className="dot" style={{ '--delay': '0s' }}></div>
                <div className="dot" style={{ '--delay': '0.2s' }}></div>
                <div className="dot" style={{ '--delay': '0.4s' }}></div>
            </div>
        </div>
    )
}