import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ListaProdutos from "../../componentes/produto/listaprodutos/ListaProdutos";
import ModalProdutos from "../../componentes/produto/modalprodutos/ModalProdutos";
import imagemVerduras from '../../assets/verduras.jpeg';
import ModalCategorias from "../../componentes/categoria/modalcategoria/ModalCategorias";
import ListaCategorias from "../../componentes/categoria/listacategorias/ListaCategorias";

function Home() {
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token === "") {
            navigate("/login");
        }
    }, [usuario.token, navigate]);

    if (usuario.token === "") {
        return null; 
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#fff3d1]">
            <div className="flex-grow">
                
                {/* Seção Hero / Banner Principal */}
                <div className="bg-[#fff3d1] flex justify-center py-12 px-4 lg:px-0">
                    <div className='container grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-xl border border-[#19401f]/10 p-8 lg:p-12 items-center gap-8'>
                        
                        <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left justify-center">
                            <h2 className='text-[#19401f] text-4xl lg:text-5xl font-black tracking-tight leading-tight'>
                                FreshFood: Inteligência Nutricional
                            </h2>
                            
                            <p className='text-[#19401f]/80 text-lg font-medium max-w-xl'>
                                Uma plataforma de delivery com recomendações inteligentes para uma vida saudável. Unimos a praticidade da entrega com a inteligência que seu body realmente precisa.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full mt-2">
                                <div className='rounded-xl text-white bg-[#a04e00] hover:bg-opacity-95 shadow-md hover:shadow-lg transition-all font-bold focus:outline-none focus:ring-2 focus:ring-[#19401f] overflow-hidden'>
                                     <ModalProdutos />
                                </div>
                                
                                <div className='overflow-hidden rounded-xl'>
                                     <ModalCategorias />
                                </div>
                            </div>
                        </div>

                        {/* Bloco de Imagens */}
                        <div className="relative flex justify-center items-center w-full min-h-[350px] lg:min-h-[450px]">
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-30 pointer-events-none">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-[#19401f]" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10,80 Q30,50 60,70 T100,40" strokeDasharray="4 4" />
                                    <path d="M20,90 Q40,60 70,80 T100,60" />
                                </svg>
                            </div>

                            <div className="relative w-full max-w-sm lg:max-w-md aspect-square overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 bg-emerald-50
                                rounded-[50%_50%_40%_60%_/_60%_40%_60%_40%] border-4 border-white">
                                <img
                                    src={imagemVerduras}
                                    alt="Variedade de vegetais selecionados FreshFood"
                                    className="w-full h-full object-cover scale-110"
                                />
                            </div>

                            <div className="absolute top-8 left-4 lg:left-12 w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg animate-bounce [animation-duration:6s]">
                                <img
                                    src={imagemVerduras} 
                                    alt="Detalhe nutricional FreshFood"
                                    className="w-full h-full object-cover saturate-150 contrast-115"
                                />
                            </div>

                            <div className="absolute bottom-12 right-6 lg:right-12 bg-[#fff3d1] text-[#19401f] p-3 rounded-full shadow-md border border-[#19401f]/10 animate-pulse">
                                🌱
                            </div>
                        </div>

                    </div>
                </div>
                
                {/* Seção do Cardápio */}
                <div className="bg-white border-b border-[#19401f]/10">
                    <div className="container mx-auto py-6 text-center">
                        <h3 className="text-[#19401f] text-3xl font-black mb-2">Nosso Cardápio Inteligente</h3>
                        <p className="text-[#19401f]/70 font-medium mb-6">Escolha o que comer de forma inteligente, sem complicação.</p>
                    </div>
                    <ListaProdutos />
                </div>

                {/* Seção de Categorias */}
                <div className="bg-white">
                    <div className="container mx-auto py-6 text-center">
                        <h3 className="text-[#19401f] text-3xl font-black mb-2">Categorias Disponíveis</h3>
                        <p className="text-[#19401f]/70 font-medium mb-6">Gerencie e visualize as divisões estruturais do seu menu.</p>
                    </div>
                    <ListaCategorias />
                </div>

            </div>
        </div>
    );
}

export default Home;
