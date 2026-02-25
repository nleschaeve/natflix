import { useState } from 'react';

function MovieDescription({ description }) {
	// TODO : Créez les variables d'état nécessaires et initialisez-les
	const [isExpanded, setIsExpanded] = useState(false);

	// TODO : Créez la fonction qui permet de changer l'état en cliquant sur le bouton
	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div>
			<p className={isExpanded ? '' : 'line-clamp-2'}>{description}</p>
			<button onClick={toggleExpand}>
				{isExpanded ? 'Voir moins' : 'Voir plus'}
			</button>
		</div>
	);
}

export default MovieDescription;
