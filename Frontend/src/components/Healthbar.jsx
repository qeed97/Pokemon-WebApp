import React from 'react';

export default function Healthbar({healt, currentHealt}) {
    return (
        <div className="healthbar-container">
            <div className="hp-bar"></div>
            <span className="healthbar-text">{healt}/{currentHealt === undefined ? healt : currentHealt}</span>
        </div>
    );
};