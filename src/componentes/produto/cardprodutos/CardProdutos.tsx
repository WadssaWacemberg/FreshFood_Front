import { Link } from 'react-router-dom'
import type Produto from '../../../models/Produto'
import imagemVerduras from  "../../../assets/verduras.jpeg"

interface CardProdutosProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {
    return (
        <div className='border-slate-900 border flex flex-col rounded overflow-hidden justify-between bg-white relative'>
                
            <div>
                <div className="flex w-full bg-green-900 py-3 px-4 items-center gap-4 relative z-20">
                    <img
                        src={produto.usuario?.foto}
                        className='h-10 w-10 rounded-full object-cover border border-white/20'
                        alt={produto.usuario?.nome} 
                    />
                    <h3 className='text-sm lg:text-base font-bold uppercase text-white tracking-wide'>
                        {produto.usuario?.nome}
                    </h3>
                </div>
                <div className="relative flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full min-h-[140px] p-4 gap-4 overflow-hidden bg-[#fff3d1]/20"> 
                    
                    {/* 1. Grafismo de Fundo*/}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-20 pointer-events-none z-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-[#19401f]" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10,80 Q30,50 60,70 T100,40" strokeDasharray="4 4" />
                            <path d="M20,90 Q40,60 70,80 T100,60" />
                        </svg>
                    </div>

                    <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg animate-bounce [animation-duration:6s] z-10 shrink-0">
                        <img
                            src={imagemVerduras} 
                            alt="Detalhe nutricional"
                            className="w-full h-full object-cover saturate-150 contrast-115"
                        />
                    </div>

                    {/* 3. Plantinha */}
                    <div className="absolute bottom-4 right-4 bg-[#fff3d1] text-[#19401f] p-2 rounded-full shadow-md border border-[#19401f]/10 animate-pulse z-20 text-xs">
                        🌱
                    </div>
                </div>
                <div className='p-4 border-t border-slate-100'>
                    <h4 className='text-lg font-bold text-[#19401f] uppercase tracking-tight mb-1'>
                        {produto.titulo}
                    </h4>
                    <p className='text-slate-700 text-sm mb-4 leading-relaxed'>
                        {produto.texto}
                    </p>
                    
                    <div className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
                        <p className="bg-[#19401f]/5 text-[#19401f] px-2.5 py-1 rounded-md w-fit">
                            Categoria: {produto.categoria?.descricao}
                        </p>
                        <p className="pt-1">
                            Data: {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'full',
                                timeStyle: 'medium',
                            }).format(new Date(produto.data))}
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex w-full mt-auto border-t border-slate-900">
                <Link to={`/editarpostagem/${produto.id}`} 
                    className='w-full text-white bg-green-900 hover:bg-green-700 flex items-center justify-center py-3 font-bold transition-colors border-r border-slate-900'>
                    <span>Editar</span>
                </Link>
                <Link to={`/deletarpostagem/${produto.id}`}
                    className='w-full text-white bg-[#a04e00] hover:bg-orange-800 flex items-center justify-center py-3 font-bold transition-colors'>
                    <span>Deletar</span>
                </Link>
            </div>

        </div>
    )
}

export default CardProduto