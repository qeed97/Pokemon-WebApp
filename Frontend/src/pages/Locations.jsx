import React from 'react';
import { useEffect, useState } from 'react';
import Images from "../helpers/imagesImport.js";

export default function Locations()
{
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

    return (
        <div className="w-full h-full bg-[#031e19] font-silkscreen">
            <h1 className="font-silkscreen text-center text-6xl text-[#fcfaf8]">Locations</h1>
            <div className="text-center text-[#fcfaf8]">Choose a location to find pokemons!</div>
            {locations && <ul className="relative w-full h-full grid grid-cols-[repeat(auto-fill,_320px)] gap-4 justify-center justify-items-center list-none my-8">
                {locations.results.map((location, index) => (
                    <div onClick={() => {/*navigate*/console.log(location.name)}} key={index} className="w-[260px] h-[260px] cursor-pointer transition-all duration-100 ease-in hover:scale-105">
                        <img className="w-[260px] rounded-[5px] border-2 border-[#fcfaf8] hover:border-[#cb2327]" src={Images[Images.findIndex(img => img.replaceAll('_', '-').includes(location.name))]} alt={location.name}/>
                        <p className="relative bottom-[3.5rem] z-100 bg-[#fcfaf8] text-[#031e19] p-4 pl-2 pr-2 rounded-bl-[5px] rounded-br-[5px] border-l-2 border-r-2 border-b-2 border-[#fcfaf8] hover:border-l-2 hover:border-r-2 hover:border-b-2 hover:border-[#cb2327]">{location.name.replaceAll('-', ' ')}</p>
                    </div>
                ))}
            </ul>}
        </div>
    );
}