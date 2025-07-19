import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

export default function Home() {

  return (
    <div className="home">
      <div className="h2-container">
        <h2>Daily Quest</h2>
      </div>
      <div className="daily-quest-container">
        <ul>
          {
          /* in the daily quest, one flashcard will be displayed here, those will be displayed
          are the flashcard set that is not yet completed, if all sets are is not complete yet only
          one of the set, this will have a rotation for displaying by adding duration of 24hrs before
          displaying other uncompleted set*/
          }
        </ul>
      </div>

      <div className="daily-word-container">
        <div className="term-container">
          <span></span>
        </div>
      </div>

      <div className="stat-container">
        <div className="info-container">
          <ul>
            <li><p>Avg Score Per Quiz</p></li>
            <li><p>Highest Score</p></li>
            <li><p>Lowest Score</p></li>
            <li><p>Most Missed Topic</p></li>
            <li><p>Total Flashcard Sets</p></li>
            <li><p>Total Quiz Taken</p></li>
          </ul>
        </div>
        <div className="numeric-stat-container">
          <ul>
            <li><span> </span></li>
            <li><span> </span></li>
            <li><span> </span></li>
            <li><span> </span></li>
            <li><span> </span></li>
            <li><span> </span></li>
          </ul>
        </div>
        <div className="radial-progress-bar"></div>
      </div>
    </div>
  );
}
