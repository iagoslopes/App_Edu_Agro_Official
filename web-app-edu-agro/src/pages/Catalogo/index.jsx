import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { fetchPlantasData } from '../../api/plantas';
import { fetchTerrenosData } from '../../api/terrenos';
import { fetchPragasData } from '../../api/pragas';
import './style.css';

export const Catalogo = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
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

    //Função para chamar a busca de registros da api caso ainda não tenha buscado todos os registros
    useEffect(() => {
        if (confirDadosChegaram === false) {
            fetchData();
        }
    }, []);

    //Função para puxar os registros da api
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

    //Função para filtrar os registros da api e mostrar somente oq esta no campo de busca
    const filteredPlantas = plantas.filter((planta) =>
        planta.nome.toLowerCase().includes(searchTermPlantas.toLowerCase()) ||
        planta.nome_cientifico.toLowerCase().includes(searchTermPlantas.toLowerCase())
    );

    //Função para filtrar os registros da api e mostrar somente oq esta no campo de busca
    const filteredTerrenos = terrenos.filter((terreno) =>
        terreno.nome.toLowerCase().includes(searchTermTerrenos.toLowerCase()) ||
        terreno.nome_cientifico.toLowerCase().includes(searchTermTerrenos.toLowerCase())
    );

    //Função para filtrar os registros da api e mostrar somente oq esta no campo de busca
    const filteredPragas = pragas.filter((praga) =>
        praga.nome.toLowerCase().includes(searchTermPragas.toLowerCase()) ||
        praga.nome_cientifico.toLowerCase().includes(searchTermPragas.toLowerCase())
    );

    //Função para setar todos os dados necessários para puxar as telas correspondente ao botão selecionado
    const handlePlantasClick = () => {
        setShowRecords(true);
        setActiveButton("plantas");
        setShowSearchPlantas(true);
        setShowSearchTerrenos(false);
        setShowSearchPragas(false);
    };

    //Função para setar todos os dados necessários para puxar as telas correspondente ao botão selecionado
    const handleTerrenosClick = () => {
        setShowRecords(true);
        setActiveButton("terrenos");
        setShowSearchPlantas(false);
        setShowSearchTerrenos(true);
        setShowSearchPragas(false);
    };

    //Função para setar todos os dados necessários para puxar as telas correspondente ao botão selecionado
    const handlePragasClick = () => {
        setShowRecords(true);
        setActiveButton("pragas");
        setShowSearchPlantas(false);
        setShowSearchTerrenos(false);
        setShowSearchPragas(true);
    };

    //Função para guardar as informações do registro selecionado e mostrar as informações no modal
    const handleRecordClick = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    //Função para fechar o modal das informações do registro e setar selectedRecord como null
    const closeModal = () => {
        setSelectedRecord(null);
        setShowModal(false);
    };

    const handleModalClick = (e) => {
        // Verificar se o clique foi fora do conteúdo do modal
        if (e.target.classList.contains('modal')) {
            // Fechar o modal aqui
            closeModal();
        }
    };

    //Função para verificar se tem algum usuário logado, se não enviar para o login
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate('/login');
                return null;
            } else if (currentUser) {
                if (currentUser.emailVerified) {
                } else {
                    navigate('/login');
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <Header />

            <div className="catalogo-container">

                <div className="container-botao">
                    <div className="botao">
                        <button
                            id="btn-plantas"
                            onClick={handlePlantasClick}
                            className={activeButton === "plantas" ? "active-button" : ""}
                        >
                            Plantas
                        </button>
                        <button
                            id="btn-terrenos"
                            onClick={handleTerrenosClick}
                            className={activeButton === "terrenos" ? "active-button" : ""}
                        >
                            Terrenos
                        </button>
                        <button
                            id="btn-pragas"
                            onClick={handlePragasClick}
                            className={activeButton === "pragas" ? "active-button" : ""}
                        >
                            Pragas
                        </button>
                    </div>
                </div>

                <div className="container-registros">

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
                                    <div key={index} className='registros-item' onClick={() => handleRecordClick(planta)}>
                                        <div className='registros'>
                                            <img src={planta.foto} alt={planta.nome} className='foto' />
                                            <div className='informacoes'>
                                                <span className='title'>{planta.nome}</span>
                                                <span className='subtitle'>{planta.nome_cientifico}</span>
                                            </div>
                                            <button className='visualizar'>
                                                Visualizar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : activeButton === "terrenos" ? (
                                // Renderize os registros de terrenos aqui
                                filteredTerrenos.map((terreno, index) => (
                                    <div key={index} className='registros-item' onClick={() => handleRecordClick(terreno)}>
                                        <div className='registros'>
                                            <img src={terreno.foto} alt={terreno.nome} className='foto' />
                                            <div className='informacoes'>
                                                <span className='title'>{terreno.nome}</span>
                                                <span className='subtitle'>{terreno.nome_cientifico}</span>
                                            </div>
                                            <button className='visualizar'>
                                                Visualizar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : activeButton === "pragas" ? (
                                // Renderize os registros de pragas aqui
                                filteredPragas.map((praga, index) => (
                                    <div key={index} className='registros-item' onClick={() => handleRecordClick(praga)}>
                                        <div className='registros'>
                                            <img src={praga.foto} alt={praga.nome} className='foto' />
                                            <div className='informacoes'>
                                                <span className='title'>{praga.nome}</span>
                                                <span className='subtitle'>{praga.nome_cientifico}</span>
                                            </div>
                                            <button className='visualizar'>
                                                Visualizar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : null
                        ) : (
                            // Renderize a mensagem inicial
                            <div className="mensagem-inicial">
                                Clique em um dos botões ao lado para visualizar os registros.
                            </div>
                        )}

                        {showModal && (
                            <div className="modal" onClick={handleModalClick}>
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
                                            <div className="descricao">
                                                <p className='p'>Descrição: </p>
                                                <div className="sub-descricao">
                                                    <textarea
                                                        className='textarea'
                                                        value={selectedRecord.descricao}
                                                        readOnly={true}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            {selectedRecord.cultivo && (
                                                <div>
                                                    <p className='p'>Cultivo: </p>
                                                    <div className='modal-campos'>
                                                        <div className="sub-descricao">
                                                            <textarea
                                                                className='textarea'
                                                                value={selectedRecord.cultivo}
                                                                readOnly={true}
                                                            ></textarea>
                                                        </div>
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

            <Footer />
        </>
    )
};