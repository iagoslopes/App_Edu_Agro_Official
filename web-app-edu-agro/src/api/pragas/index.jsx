//Import do axios para o CRUD
import axios from 'axios';

//Método para buscar os registros da api
const fetchPragasData = async () => {
  try {
    const response = await axios.get('https://education-agro.onrender.com/pragas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return [];
  }
};

//Método para deletar os registros da api
const deletePraga = async (pragaId) => {
  try {
    const response = await axios.delete(`https://education-agro.onrender.com/pragas/${pragaId}`);
    console.log('Registro excluído com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao excluir registro:', error);
  }
};

//Método para editar os registros da api
const updatePraga = async (pragaId, updatedData) => {
  try {
    const response = await axios.put(`https://education-agro.onrender.com/pragas/${pragaId}`, updatedData);
    console.log('Registro atualizado com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
  }
};

//Método para criar registros para api
const createPraga = async (newData) => {
  try {
    const response = await axios.post(`https://education-agro.onrender.com/pragas`, newData);
    console.log('Registro de praga criado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao criar registro de praga:', error);
  }
};

//Exportando os métodos
export { fetchPragasData, deletePraga, updatePraga, createPraga };