import axios from 'axios';

const fetchPragasData = async () => {
    try {
        const response = await axios.get('https://education-agro.onrender.com/pragas');
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return [];
      }
};

const deletePraga = async (pragaId) =>  {
  try {
    const response = await axios.delete(`https://education-agro.onrender.com/pragas/${pragaId}`);
    console.log('Registro excluído com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao excluir registro:', error);
  }
};

const updatePraga = async (pragaId, updatedData) => {
  try {
    const response = await axios.put(`https://education-agro.onrender.com/pragas/${pragaId}`, updatedData);
    console.log('Registro atualizado com sucesso:', response.data);

    } catch (error) {
    console.error('Erro ao atualizar registro:', error);
  }
};

export {fetchPragasData, deletePraga, updatePraga};