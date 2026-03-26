import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    // TODO: Valider le nom
    if (!formData.name) {
      newErrors.name = "Nom requis";
    }

    // TODO: Valider l'email
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    // TODO: Valider le mot de passe
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caracteres";
    }

    // TODO: Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
    );
    if (result.success) {
      setLoading(false);
      navigate("/");
    } else {
      setApiError(result.error || "Erreur d'inscription");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Inscription</h1>
        <p className="text-gray-400 mb-6">Créez votre compte Natflix.</p>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>

        {apiError && <p className="mt-3 text-sm text-red-400">{apiError}</p>}

        <p className="mt-6 text-center text-sm text-gray-400">
          Deja un compte ?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
