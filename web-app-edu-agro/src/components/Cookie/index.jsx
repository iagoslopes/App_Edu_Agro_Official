import React, { useState, useEffect } from 'react';
import './style.css';

export default function Footer() {
	const [showPopup, setShowPopup] = useState(true);

	useEffect(() => {
		const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
		if (hasAcceptedCookies) {
			setShowPopup(false);
			
		}
	}, []);

	const closePopup = () => {
		setShowPopup(false);
		
		localStorage.setItem('cookiesAccepted', 'true');
	};

	return (
		showPopup && (
			<div className="cookie-popup">
				<div className="cookie-content">
					<p>Este site utiliza cookies para garantir a melhor experiência ao usuário.</p>
					<button onClick={closePopup}>Aceitar</button>
				</div>
			</div>
		)
	);
}