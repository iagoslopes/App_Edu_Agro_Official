import React, { useState, useEffect } from 'react';
import './style.css';

export default function Footer() {
	const [showPopup, setShowPopup] = useState(true);

	//Armazenar informações de cookies no navegador
	useEffect(() => {
		const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
		if (hasAcceptedCookies) {
			setShowPopup(false);
		}
	}, []);

	//Fechar automáticamente ao usuário fechar os cookies
	const closePopup = () => {
		setShowPopup(false);

		localStorage.setItem('cookiesAccepted', 'true');
	};

	//Mostrar o PopUp do cookies no navegador
	return (
		showPopup && (
			<div className="cookie-popup">
				<div className="cookie-content">
					<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Utilizamos ferramentas e serviços que utilizam cookies.</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Essas ferramentas nos ajudam a oferecer uma melhor experinência
						de navegaçãono site.</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ao clicar no botão "Fechar" ou continuar a visualizar o nosso site,
						você concorda com o uso de cookies em nosso site.</p>
					<button onClick={closePopup}>Fechar</button>
				</div>
			</div>
		)
	);
}