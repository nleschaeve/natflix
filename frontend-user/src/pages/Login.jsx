import { useState } from 'react';

function LoginForm() {
	// TODO : Créez la variable d'état pour stocker dans un objet le mail et le mot de passe et initialisez-la
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	// TODO : Créez et codez la fonction déclenchée à la modification du mail ou du mot de passe et celle déclenchée à la soumission du formulaire
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input 
				name="email"
				type="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="Email"
			/>
			<input 
				name="password"
				type="password"
				value={formData.password}
				onChange={handleChange}
				placeholder="Mot de passe"
			/>
			<button type="submit">Valider</button>
		</form>
	);
}

export default LoginForm;
