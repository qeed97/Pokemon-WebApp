import React from 'react';

export default function Healthbar({health, currentHealth}) {
    return (
        <div className="healthbar-container relative w-[400px] h-[30px] bg-[#fcfaf8] rounded-[5px]">
            <div className="hp-bar bg-[#47d447] h-full relative z-[2] rounded-[5px]" style={{width:`${(currentHealth/health)*100}%`}}></div>
            <span className="healthbar-text absolute z-[3] text-[#031e19] left-[45%] top-[5%]">{health}/{currentHealth === undefined ? health : currentHealth}</span>
        </div>
    );
};