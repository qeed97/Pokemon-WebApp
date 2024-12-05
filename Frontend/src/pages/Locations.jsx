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
        <div className="locations">
            <h1 className="title">Locations</h1>
            <div className="info"></div>
            {locations && <ul>
                {locations.results.map((location, index) => (
                    <div onClick={() => {/*navigate*/console.log(location.name)}} key={index} className='location'>
                        <img src={Images[index]} alt={location.name}/>
                        <p>{location.name.replaceAll('_', ' ')}</p>
                    </div>
                ))}
            </ul>}
        </div>
    );
}