import axios from 'axios';

const fetchTerrenosData = async () => {
    try {
        const response = await axios.get('https://education-agro.onrender.com/terrenos');
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return [];
      }
};

const deleteTerreno = async (terrenoId) =>  {
  try {
    const response = await axios.delete(`https://education-agro.onrender.com/terrenos/${terrenoId}`);
    console.log('Registro excluído com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao excluir registro:', error);
  }
};

const updateTerreno = async (terrenoId, updatedData) => {
  try {
    const response = await axios.put(`https://education-agro.onrender.com/terrenos/${terrenoId}`, updatedData);
    console.log('Registro atualizado com sucesso:', response.data);

    } catch (error) {
    console.error('Erro ao atualizar registro:', error);
  }
};

export {fetchTerrenosData, deleteTerreno, updateTerreno};