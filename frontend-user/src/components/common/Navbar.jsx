import { useState, useEffect } from 'react';
import SearchBar from '../movies/SearchBar';
import moviesData from '../../../../data/movies.json';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
            isScrolled ? 'bg-black' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <h1 className="text-primary text-3xl font-bold tracking-tight">NETFLIX</h1>

                        {/* Navigation Links */}
                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <a href="#" className="text-white hover:text-primary transition-colors">Accueil</a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-primary transition-colors">Films</a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-primary transition-colors">Mes locations</a>
                            </li>
                        </ul>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        <SearchBar movies={moviesData} onSearch={() => {}} />

                        {/* User Avatar */}
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
                            <span className="text-sm font-bold">U</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;