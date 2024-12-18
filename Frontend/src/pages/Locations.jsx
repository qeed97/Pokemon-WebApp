import React from 'react';
import { useEffect, useState } from 'react';
import Images from "../helpers/imagesImport.js";
import {useNavigate} from "react-router-dom";

export default function Locations( { setEncId } )
{
    const navigate = useNavigate();
    const locKey = 'https://pokeapi.co/api/v2/location';
    const [locations, setLocations] = useState(null);

    const getLocations = async () =>{
        try
        {
            const res = await fetch(locKey);
            const data = await res.json();
            setLocations(data);
        } catch (e)
        {
            console.log(e);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    const navigateToEncounter = (encId) => {
        setEncId(encId);
        navigate(`/encounter`);
    }

    return (
        <div className="w-full h-full bg-[#031e19] font-silkscreen">
            <h1 className="font-silkscreen text-center text-[3rem] text-[#fcfaf8]">Locations</h1>
            <div className="text-center text-[#fcfaf8]">Choose a location to find pokemons!</div>
            {locations && <ul className="relative w-full h-full grid grid-cols-[repeat(auto-fill,_320px)] gap-4 justify-center justify-items-center list-none mx-auto my-8">
                {locations.results.map((location, index) => (
                    <div onClick={() => {navigateToEncounter(index + 1)}} key={index} className="group w-[260px] h-[260px] cursor-pointer transition-all duration-100 ease-in hover:scale-[1.025] ">
                        <img className="w-[260px] rounded-[5px] border-2 border-[#fcfaf8] group-hover:border-[#cb2327]" src={Images[Images.findIndex(img => img.replaceAll('_', '-').includes(location.name))]} alt={location.name}/>
                        <p className="relative bottom-[3.5rem] z-100 bg-[#fcfaf8] text-[#031e19] p-4 pl-2 pr-2 rounded-bl-[5px] rounded-br-[5px] border-l-2 border-r-2 border-b-2 border-[#fcfaf8] group-hover:border-[#cb2327]">{location.name.replaceAll('-', ' ')}</p>
                    </div>
                ))}
            </ul>}
        </div>
    );
}