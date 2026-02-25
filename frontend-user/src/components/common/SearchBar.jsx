import { useState } from 'react';

function SearchBar() {
    // TODO : Créez les variables d'état nécessaires et initialisez-les
    const [searchTerm, setSearchTerm] = useState('');

    // TODO : Créez et codez les fonctions déclenchées à la modification de la zone de texte et à la soumission du formulaire
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Vous cherchez: ${searchTerm}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Rechercher..."
            />
            <p>Vous cherchez: {searchTerm}</p>
            <button type="submit">Rechercher</button>
        </form>
    );
}

export default SearchBar;