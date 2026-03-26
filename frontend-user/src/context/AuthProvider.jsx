import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // TODO : Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    // TODO
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // TODO: Sera remplacé plus tard par la vraie API (séance 8 ou 9 , ça dépend ;-))
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: Date.now(),
        email,
        name: email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`,
      };

      // TODO : Enregistrer les données de l'utilisateur dans le localStorage
      setUser(mockUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction d'inscription
  const register = async (name, email, password) => {
    // TODO : inspirez-vous de plus haut
    return { success: false };
  };

  // Fonction de déconnexion
  const logout = () => {
    // TODO : Supprimez l’utilisateur enregistré en mémoire
    setUser(null);
  };

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    // XXXX
    return !!user;
  };

  // Mettre à jour le profil
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }; // ca ne vous rappelle rien ?

    // TODO : Mettre à jour et stocker l’utilisateur
    setUser(updatedUser);
  };

  // On met a disposition les elements pour etre utilises dans les composants
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
