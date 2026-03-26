import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const USER_STORAGE_KEY = "user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO : Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setLoading(true);
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
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now(),
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=e50914&color=fff`,
      };

      setUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    // TODO : Supprimez l’utilisateur enregistré en mémoire
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
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
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
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
