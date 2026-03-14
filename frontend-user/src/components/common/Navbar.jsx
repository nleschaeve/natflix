import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import SearchBar from '../movies/SearchBar';
import CartButton from './CartButton';
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
                        <NavLink to="/" className="text-primary text-3xl font-bold tracking-tight">NETFLIX</NavLink>

                        {/* Navigation Links */}
                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <NavLink to="/" className={({isActive}) => isActive ? 'text-primary font-bold' :'text-gray-300 hover:text-white'}>Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to="/my-rentals" className={({isActive}) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white'}>Mes locations</NavLink>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-primary transition-colors">Films</a>
                            </li>
                        </ul>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        <SearchBar movies={moviesData} onSearch={() => {}} />

                        <CartButton />

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