import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-gray-900/80 p-10 text-center shadow-2xl">
                <p className="text-primary text-6xl md:text-7xl font-black mb-4">404</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Page introuvable</h1>
                <p className="text-gray-400 mb-8">Oups ! La page que vous recherchez n'existe pas.</p>

                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
}

export default NotFound;