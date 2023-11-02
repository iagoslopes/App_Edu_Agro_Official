import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
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

    useEffect(() => {
        if (confirDadosChegaram === false) {
            fetchData(); // Chame a função assíncrona para buscar os dados
        }
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate('/login');
                return null;
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
                                    <div key={index} className='plantas-item'>
                                        <Link to="/">
                                            <div className='plantas'>
                                                <img src={planta.foto} alt={planta.nome} className='foto' />
                                                <div className='informacoes'>
                                                    <span className='title'>{planta.nome}</span>
                                                    <span className='subtitle'>{planta.nome_cientifico}</span>
                                                </div>
                                                <div className='visualizar'>
                                                    Visualizar
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : activeButton === "terrenos" ? (
                                // Renderize os registros de terrenos aqui
                                filteredTerrenos.map((terreno, index) => (
                                    <div key={index} className='plantas-item'>
                                        <Link to="/">
                                            <div className='plantas'>
                                                <img src={terreno.foto} alt={terreno.nome} className='foto' />
                                                <div className='informacoes'>
                                                    <span className='title'>{terreno.nome}</span>
                                                    <span className='subtitle'>{terreno.nome_cientifico}</span>
                                                </div>
                                                <div className='visualizar'>
                                                    Visualizar
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : activeButton === "pragas" ? (
                                // Renderize os registros de pragas aqui
                                filteredPragas.map((praga, index) => (
                                    <div key={index} className='plantas-item'>
                                        <Link to="/">
                                            <div className='plantas'>
                                                <img src={praga.foto} alt={praga.nome} className='foto' />
                                                <div className='informacoes'>
                                                    <span className='title'>{praga.nome}</span>
                                                    <span className='subtitle'>{praga.nome_cientifico}</span>
                                                </div>
                                                <div className='visualizar'>
                                                    Visualizar
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : null
                        ) : (
                            // Renderize a mensagem inicial
                            <div className="mensagem-inicial">
                                Clique em um dos botões acima para visualizar os registros.
                            </div>
                        )}
                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
};