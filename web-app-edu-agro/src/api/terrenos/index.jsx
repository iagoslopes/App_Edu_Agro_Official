//Import do axios para o CRUD
import axios from 'axios';

//Método para buscar os registros da api
const fetchTerrenosData = async () => {
  try {
    const response = await axios.get('https://education-agro.onrender.com/terrenos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return [];
  }
};

//Método para deletar os registros da api
const deleteTerreno = async (terrenoId) => {
  try {
    const response = await axios.delete(`https://education-agro.onrender.com/terrenos/${terrenoId}`);
    console.log('Registro excluído com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao excluir registro:', error);
  }
};

//Método para editar os registros da api
const updateTerreno = async (terrenoId, updatedData) => {
  try {
    const response = await axios.put(`https://education-agro.onrender.com/terrenos/${terrenoId}`, updatedData);
    console.log('Registro atualizado com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
  }
};

//Método para criar registros para api
const createTerreno = async (newData) => {
  try {
    const response = await axios.post(`https://education-agro.onrender.com/terrenos`, newData);
    console.log('Registro de terreno criado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao criar registro de terreno:', error);
  }
};

//Exportando os métodos
export { fetchTerrenosData, deleteTerreno, updateTerreno, createTerreno };