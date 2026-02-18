function InteractiveCard({ movie }) {
    // Click
    const handleClick = () => {
        console.log('Carte cliquée:', movie.title);
    };

    // Double-click
    const handleDoubleClick = (e) => {
        e.preventDefault();
        console.log('Double-clic!');
    };

    // Mouse enter/leave
    const handleMouseEnter = () => {
        console.log('Souris sur la carte');
    };

    const handleMouseLeave = () => {
        console.log('Souris quitte la carte');
    };

    // Key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Entrée pressée');
        }
    };

    return (
        <div
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyPress={handleKeyPress}
            tabIndex={0}
            className="cursor-pointer p-4"
        >
            <h3>{movie.title}</h3>
        </div>
    );
}