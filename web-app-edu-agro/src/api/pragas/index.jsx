import axios from 'axios';

export async function fetchPragasData() {
    try {
        const response = await axios.get('https://education-agro.onrender.com/pragas');
        return response.data; // Retorne os dados da API
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return []; // Ou outro valor padrão, se necessário
      }
}