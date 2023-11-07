import axios from 'axios';

const fetchPlantasData = async () => {
    try {
        const response = await axios.get('https://education-agro.onrender.com/plantas');
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return [];
      }
};

const deletePlanta = async (plantaId) =>  {
  try {
    const response = await axios.delete(`https://education-agro.onrender.com/plantas/${plantaId}`);
    console.log('Registro excluído com sucesso:', response.data);

  } catch (error) {
    console.error('Erro ao excluir registro:', error);
  }
};

const updatePlant = async (plantaId, updatedData) => {
  try {
    const response = await axios.put(`https://education-agro.onrender.com/plantas/${plantaId}`, updatedData);
    console.log('Registro atualizado com sucesso:', response.data);

    } catch (error) {
    console.error('Erro ao atualizar registro:', error);
  }
};

const createPlant = async (newData) => {
  try {
    const response = await axios.post(`https://education-agro.onrender.com/plantas`, newData);
    console.log('Registro criado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao criar registro:', error);
  }
};

export {fetchPlantasData, deletePlanta, updatePlant, createPlant};