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
            
            {/* Conteúdo Principal Expandido */}
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

                        {/* Bloco de Imagens e Efeitos Visuais */}
                        <div className="relative flex justify-center items-center w-full min-h-[350px] lg:min-h-[450px]">
                            
                            {/* Grafismo de Fundo */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-30 pointer-events-none">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-[#19401f]" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10,80 Q30,50 60,70 T100,40" strokeDasharray="4 4" />
                                    <path d="M20,90 Q40,60 70,80 T100,60" />
                                </svg>
                            </div>

                            {/* Imagem Principal Recortada */}
                            <div className="relative w-full max-w-sm lg:max-w-md aspect-square overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 bg-emerald-50
                                rounded-[50%_50%_40%_60%_/_60%_40%_60%_40%] border-4 border-white">
                                <img
                                    src={imagemVerduras}
                                    alt="Variedade de vegetais selecionados FreshFood"
                                    className="w-full h-full object-cover scale-110"
                                />
                            </div>

                            {/* Efeito Círculo Flutuando */}
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

            {/* Rodapé  */}
            <footer className="w-full bg-[#19401f] text-white py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold border-t-2 border-[#a04e00]/30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="text-white/80 select-none tracking-wide text-center sm:text-left">
                    &copy; 2026 FreshFood &bull; Desenvolvido por Wadssa Wacemberg
                </div>
                
                <div className="flex items-center gap-5">
                    {/* LinkedIn */}
                    <a 
                        href="https://www.linkedin.com/in/wadssawacemberg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 opacity-85 hover:opacity-100 hover:text-[#fff3d1] transition-all group"
                        title="Acessar LinkedIn"
                    >
                        <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>LinkedIn</span>
                    </a>

                    {/* GitHub */}
                    <a 
                        href="https://github.com/WadssaWacemberg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 opacity-85 hover:opacity-100 hover:text-[#fff3d1] transition-all group"
                        title="Acessar GitHub"
                    >
                        <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                    </a>

                    {/* Email */}
                    <a 
                        href="mailto:wadssa@gmail.com" 
                        className="flex items-center gap-1.5 opacity-85 hover:opacity-100 hover:text-[#fff3d1] transition-all group"
                        title="Enviar E-mail"
                    >
                        <svg className="w-4 h-4 fill-none stroke-current stroke-2 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <span>E-mail</span>
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Home;
