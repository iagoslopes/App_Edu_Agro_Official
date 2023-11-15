//Import do axios para o CRUD
import axios from 'axios';

//Método para buscar os registros da api
const fetchPlantasData = async () => {
  try {
    const response = await axios.get('https://education-agro.onrender.com/plantas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return [];
  }
};

//Método para deletar os registros da api
const deletePlanta = async (plantaId) => {
  try {
    const response = await axios.delete(`https://education-agro.onrender.com/plantas/${plantaId}`);
    console.log('Registro excluído com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao excluir registro:', error);
  }
};

//Método para editar os registros da api
const updatePlant = async (plantaId, updatedData) => {
  try {
    const response = await axios.put(`https://education-agro.onrender.com/plantas/${plantaId}`, updatedData);
    console.log('Registro atualizado com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
  }
};

//Método para criar registros para api
const createPlant = async (newData) => {
  try {
    const response = await axios.post(`https://education-agro.onrender.com/plantas`, newData);
    console.log('Registro criado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao criar registro:', error);
  }
};

//Exportando os métodos
export { fetchPlantasData, deletePlanta, updatePlant, createPlant };