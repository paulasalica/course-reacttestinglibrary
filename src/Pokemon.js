import React, { useState } from 'react';
import axios from 'axios';
import CustomInput from './CustomInput';

const pokemonApiUrl = 'https://pokeapi.co/api/v2';

function Pokemon() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [error, setError] = useState(null);

    async function handleFetch(event) {
        let result;
        try {
            result = await axios.get(`${pokemonApiUrl}/pokemon/${pokemonName}`);
            setPokemonAbilities(result.data.abilities);
        } catch (error) {
            setPokemonAbilities([]);
            setError(error);
        }
    }

    function handleChange(event) {
        setPokemonName(event.target.name);
    }

    return (
        <div>
            <CustomInput value={pokemonName} onChange={handleChange}>
                Pokemon name:
            </CustomInput>
            <button type="button" onClick={handleFetch}>
                Fetch Pokemon abilities
            </button>
            {error && <span>Something went wrong...</span>}
            <ul>
                {pokemonAbilities.map(ability => 
                    <li key={ability.ability.name}>
                        <a href={ability.ability.url}>{ability.ability.name}</a>
                    </li>
                )}
            </ul>
    </div>
    );
}

export default Pokemon;