const RENTALS_KEY = 'rentals';

function readRentals() {
    try {
        const raw = localStorage.getItem(RENTALS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeRentals(rentals) {
    localStorage.setItem(RENTALS_KEY, JSON.stringify(rentals));
}

export function getRentals() {
    return readRentals();
}

export function addRental(movie) {
    const rentals = readRentals();
    const alreadyRented = rentals.some((item) => item.id === movie.id);

    if (!alreadyRented) {
        writeRentals([...rentals, movie]);
    }
}

export function removeRental(movieId) {
    const rentals = readRentals();
    writeRentals(rentals.filter((item) => item.id !== movieId));
}
