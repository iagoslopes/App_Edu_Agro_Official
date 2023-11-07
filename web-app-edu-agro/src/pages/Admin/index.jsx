import React, { useState, useEffect } from 'react';
import { auth } from '../../services/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPlantasData, deletePlanta, updatePlant } from '../../api/plantas';
import { fetchTerrenosData, deleteTerreno, updateTerreno } from '../../api/terrenos';
import { fetchPragasData, deletePraga, updatePraga } from '../../api/pragas';
import logo from '../../assets/img_logo.png';
import './style.css';

export const Admin = () => {
  const navigate = useNavigate();
  const [plantas, setPlantas] = useState([]);
  const [terrenos, setTerrenos] = useState([]);
  const [pragas, setPragas] = useState([]);
  const [confirDadosChegaram, setConfirDadosChegaram] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [searchTermPlantas, setSearchTermPlantas] = useState("");
  const [searchTermTerrenos, setSearchTermTerrenos] = useState("");
  const [searchTermPragas, setSearchTermPragas] = useState("");
  const [showSearchPlantas, setShowSearchPlantas] = useState(false);
  const [showSearchTerrenos, setShowSearchTerrenos] = useState(false);
  const [showSearchPragas, setShowSearchPragas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedAction, setSelectedAction] = useState('visualizar');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);

  const handleSaveEditedRecord = async () => {
    if (activeButton === 'plantas' && editedRecord) {
      await updatePlant(editedRecord._id, editedRecord);
      fetchData();
      setShowEditModal(false);
    } else if (activeButton === 'terrenos' && editedRecord) {
      await updateTerreno(editedRecord._id, editedRecord);
      fetchData();
      setShowEditModal(false);
    } else if (activeButton === 'pragas' && editedRecord) {
      await updatePraga(editedRecord._id, editedRecord);
      fetchData();
      setShowEditModal(false);
    } else {

    }
  };

  const handleDeleteConfirmation = async () => {
    if (activeButton === 'plantas' && recordToDelete) {
      await deletePlanta(recordToDelete._id);
      fetchData();
      setShowConfirmationModal(false);
      setRecordToDelete(null);
    } else if (activeButton === 'terrenos' && recordToDelete) {
      await deleteTerreno(recordToDelete._id);
      fetchData();
      setShowConfirmationModal(false);
      setRecordToDelete(null);
    } else if (activeButton === 'pragas' && recordToDelete) {
      await deletePraga(recordToDelete._id);
      fetchData();
      setShowConfirmationModal(false);
      setRecordToDelete(null);
    } else {

    }
  };

  // Função para atualizar a ação selecionada
  const handleActionChange = (action) => {
    setSelectedAction(action);
  };

  const fetchData = async () => {
    try {
      const plantasData = await fetchPlantasData();
      setPlantas(plantasData);

      const terrenosData = await fetchTerrenosData();
      setTerrenos(terrenosData);

      const pragasData = await fetchPragasData();
      setPragas(pragasData);

      setConfirDadosChegaram(true);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    if (confirDadosChegaram === false) {
      fetchData(); // Chame a função assíncrona para buscar os dados
    }
  }, []);

  const filteredPlantas = plantas.filter((planta) =>
    planta.nome.toLowerCase().includes(searchTermPlantas.toLowerCase())
  );

  const filteredTerrenos = terrenos.filter((terreno) =>
    terreno.nome.toLowerCase().includes(searchTermTerrenos.toLowerCase())
  );

  const filteredPragas = pragas.filter((praga) =>
    praga.nome.toLowerCase().includes(searchTermPragas.toLowerCase())
  );

  const handlePlantasClick = () => {
    setShowRecords(true);
    setActiveButton("plantas");
    setShowSearchPlantas(true);
    setShowSearchTerrenos(false);
    setShowSearchPragas(false);
  };

  const handleTerrenosClick = () => {
    setShowRecords(true);
    setActiveButton("terrenos");
    setShowSearchPlantas(false);
    setShowSearchTerrenos(true);
    setShowSearchPragas(false);
  };

  const handlePragasClick = () => {
    setShowRecords(true);
    setActiveButton("pragas");
    setShowSearchPlantas(false);
    setShowSearchTerrenos(false);
    setShowSearchPragas(true);
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);

    if (selectedAction === 'excluir') {
      // Se a ação for "Excluir", mostre o modal de confirmação de exclusão
      setRecordToDelete(record);
      setShowConfirmationModal(true);
    } else if (selectedAction === 'editar') {
      setEditedRecord(record);
      setShowEditModal(true);
    } else {
      // Caso contrário, mostre o modal de visualização
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setShowModal(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        if (currentUser.emailVerified) {
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="admin">
      <div className="nav-admin">
        <div className="nav-admin-logo">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" width={100} className="img" />
            <p>EducationAgro</p>
          </Link>
        </div>
        <div className="nav-admin-container">
          <ul>
            <li>
              <Link
                onClick={handlePlantasClick}
                className={activeButton === "plantas" ? "active-button" : ""}
              >Plantas</Link>
            </li>
            <li>
              <Link
                onClick={handleTerrenosClick}
                className={activeButton === "terrenos" ? "active-button" : ""}
              >Terrenos</Link>
            </li>
            <li>
              <Link
                onClick={handlePragasClick}
                className={activeButton === "pragas" ? "active-button" : ""}
              >Pragas</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-container-control">
          <div className="admin-btn-crud">
            <button onClick={() => handleActionChange('visualizar')} className={selectedAction === 'visualizar' ? 'active-button' : ''}>
              Visualizar
            </button>
            <button onClick={() => handleActionChange('editar')} className={selectedAction === 'editar' ? 'active-button' : ''}>
              Editar
            </button>
            <button onClick={() => handleActionChange('excluir')} className={selectedAction === 'excluir' ? 'active-button' : ''}>
              Excluir
            </button>
          </div>
          <div className="admin-btn-criar">
            <button id='btn-criar'>
              Criar
            </button>
          </div>
        </div>

        <div className="admin-container-registros">
          <div className="search">
            {showSearchPlantas && (
              <input
                type="text"
                placeholder="Pesquisar plantas..."
                value={searchTermPlantas}
                onChange={(e) => setSearchTermPlantas(e.target.value)}
              />
            )}
            {showSearchTerrenos && (
              <input
                type="text"
                placeholder="Pesquisar terrenos..."
                value={searchTermTerrenos}
                onChange={(e) => setSearchTermTerrenos(e.target.value)}
              />
            )}
            {showSearchPragas && (
              <input
                type="text"
                placeholder="Pesquisar pragas..."
                value={searchTermPragas}
                onChange={(e) => setSearchTermPragas(e.target.value)}
              />
            )}
          </div>

          <div className="container-items">
            {showRecords ? (
              activeButton === "plantas" ? (
                // Renderize os registros de plantas aqui
                filteredPlantas.map((planta, index) => (
                  <div key={index} className='registros-item'>
                    <div className='registros'>
                      <img src={planta.foto} alt={planta.nome} className='foto' />
                      <div className='informacoes'>
                        <span className='title'>{planta.nome}</span>
                        <span className='subtitle'>{planta.nome_cientifico}</span>
                      </div>
                      <button onClick={() => handleRecordClick(planta)} className={selectedAction}>
                        {selectedAction === 'visualizar' ? 'Visualizar' : selectedAction === 'editar' ? 'Editar' : 'Excluir'}
                      </button>
                    </div>
                  </div>
                ))
              ) : activeButton === "terrenos" ? (
                // Renderize os registros de terrenos aqui
                filteredTerrenos.map((terreno, index) => (
                  <div key={index} className='registros-item'>
                    <div className='registros'>
                      <img src={terreno.foto} alt={terreno.nome} className='foto' />
                      <div className='informacoes'>
                        <span className='title'>{terreno.nome}</span>
                        <span className='subtitle'>{terreno.nome_cientifico}</span>
                      </div>
                      <button onClick={() => handleRecordClick(terreno)} className={selectedAction}>
                        {selectedAction === 'visualizar' ? 'Visualizar' : selectedAction === 'editar' ? 'Editar' : 'Excluir'}
                      </button>
                    </div>
                  </div>
                ))
              ) : activeButton === "pragas" ? (
                // Renderize os registros de pragas aqui
                filteredPragas.map((praga, index) => (
                  <div key={index} className='registros-item'>
                    <div className='registros'>
                      <img src={praga.foto} alt={praga.nome} className='foto' />
                      <div className='informacoes'>
                        <span className='title'>{praga.nome}</span>
                        <span className='subtitle'>{praga.nome_cientifico}</span>
                      </div>
                      <button onClick={() => handleRecordClick(praga)} className={selectedAction}>
                        {selectedAction === 'visualizar' ? 'Visualizar' : selectedAction === 'editar' ? 'Editar' : 'Excluir'}
                      </button>
                    </div>
                  </div>
                ))
              ) : null
            ) : (
              // Renderize a mensagem inicial
              <div className="mensagem-inicial">
                Clique em um dos botões acima para visualizar os registros.
              </div>
            )}

            {showEditModal && (
              <div className="modal">
                <div className="modal-content">
                  {editedRecord && (
                    <div className="modal-container">
                      <div>
                        <p className='p'>Nome: </p>
                        <div className='modal-campos'>
                          <input
                            type="text"
                            value={editedRecord.nome}
                            onChange={(e) =>
                              setEditedRecord({ ...editedRecord, nome: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <p className='p'>Nome Científico: </p>
                        <div className='modal-campos'>
                          <input
                            type="text"
                            value={editedRecord.nome_cientifico}
                            onChange={(e) =>
                              setEditedRecord({ ...editedRecord, nome_cientifico: e.target.value })
                            }
                          />
                        </div>
                      </div>


                      {editedRecord.tipo && (
                        <div>
                          <p className='p'>Tipo: </p>
                          <div className='modal-campos'>
                            <input
                              type="text"
                              value={editedRecord.tipo}
                              onChange={(e) =>
                                setEditedRecord({ ...editedRecord, tipo: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      )}
                      {editedRecord.terreno && (
                        <div>
                          <p className='p'>Terreno: </p>
                          <div className='modal-campos'>
                            <input
                              type="text"
                              value={editedRecord.terreno}
                              onChange={(e) =>
                                setEditedRecord({ ...editedRecord, terreno: e.target.value })
                              }
                            />
                          </div>
                        </div>

                      )}
                      {editedRecord.praga && (
                        <div>
                          <p className='p'>Praga: </p>
                          <div className='modal-campos'>
                            <input
                              type="text"
                              value={editedRecord.praga}
                              onChange={(e) =>
                                setEditedRecord({ ...editedRecord, praga: e.target.value })
                              }
                            />
                          </div>
                        </div>

                      )}
                      {editedRecord.cultivo && (
                        <div>
                          <p className='p'>Cultivo: </p>
                          <div className='modal-campos'>
                            <input
                              type="text"
                              value={editedRecord.cultivo}
                              onChange={(e) =>
                                setEditedRecord({ ...editedRecord, cultivo: e.target.value })
                              }
                            />
                          </div>
                        </div>

                      )}
                      {editedRecord.caracteristica && (
                        <div>
                          <p className='p'>Característica:</p>
                          <div className='modal-campos'>
                            <input
                              type="text"
                              value={editedRecord.caracteristica}
                              onChange={(e) =>
                                setEditedRecord({ ...editedRecord, caracteristica: e.target.value })
                              }
                            />
                          </div>
                        </div>

                      )}
                      {editedRecord.combate && (
                        <div>
                          <p className='p'>Combate:</p>
                          <div className='modal-campos'>
                            <input
                              type="text"
                              value={editedRecord.combate}
                              onChange={(e) =>
                                setEditedRecord({ ...editedRecord, combate: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      )}
                      <div className="descricao">
                        <p className='p'>Descrição: </p>
                        <div className="sub-descricao">
                          <input
                            type="text"
                            value={editedRecord.descricao}
                            onChange={(e) =>
                              setEditedRecord({ ...editedRecord, descricao: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="modal-buttons">
                        <button onClick={handleSaveEditedRecord}>Salvar</button>
                        <button onClick={() => setShowEditModal(false)}>Cancelar</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {showConfirmationModal && (
              <div className="modal">
                <div className="modal-content">
                  <p className='title-modal'>Confirmação de Exclusão</p>
                  <p>Tem certeza de que deseja excluir o registro?</p>
                  <div className='modal-buttons'>
                    <button onClick={handleDeleteConfirmation}>Sim</button>
                    <button onClick={() => setShowConfirmationModal(false)}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}

            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  {selectedRecord && (
                    <div className='modal-container'>
                      <p className='title-modal'>Detalhes do Registro</p>
                      <div className='modal-imagem'>
                        <div className="imagem">
                          <img src={selectedRecord.foto} alt={selectedRecord.nome} className='foto-modal' />
                        </div>
                      </div>

                      <div>
                        <p className='p'>Nome: </p>
                        <div className='modal-campos'>
                          <span>{selectedRecord.nome}</span>
                        </div>
                      </div>

                      <div>
                        <p className='p'>Nome Científico: </p>
                        <div className='modal-campos'>
                          <span>{selectedRecord.nome_cientifico}</span>
                        </div>
                      </div>

                      {selectedRecord.tipo && (
                        <div>
                          <p className='p'>Tipo: </p>
                          <div className='modal-campos'>
                            <span>{selectedRecord.tipo}</span>
                          </div>
                        </div>
                      )}
                      {selectedRecord.terreno && (
                        <div>
                          <p className='p'>Terreno: </p>
                          <div className='modal-campos'>
                            <span>{selectedRecord.terreno}</span>
                          </div>
                        </div>

                      )}
                      {selectedRecord.praga && (
                        <div>
                          <p className='p'>Praga: </p>
                          <div className='modal-campos'>
                            <span>{selectedRecord.praga}</span>
                          </div>
                        </div>

                      )}
                      {selectedRecord.cultivo && (
                        <div>
                          <p className='p'>Cultivo: </p>
                          <div className='modal-campos'>
                            <span>{selectedRecord.cultivo}</span>
                          </div>
                        </div>

                      )}
                      {selectedRecord.caracteristica && (
                        <div>
                          <p className='p'>Característica:</p>
                          <div className='modal-campos'>
                            <span>{selectedRecord.caracteristica}</span>
                          </div>
                        </div>

                      )}
                      {selectedRecord.combate && (
                        <div>
                          <p className='p'>Combate:</p>
                          <div className='modal-campos'>
                            <span>{selectedRecord.combate}</span>
                          </div>
                        </div>
                      )}
                      <div className="descricao">
                        <p className='p'>Descrição: </p>
                        <div className="sub-descricao">
                          <span>{selectedRecord.descricao}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='modal-close'>
                    <button onClick={closeModal}>Fechar</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
};