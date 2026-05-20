import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import imagemVerduras from "../../../assets/verduras.jpeg"
interface CardCategoriasProps {
    categoria: Categoria 
}

function CardCategorias({ categoria }: CardCategoriasProps) {
    return (
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

        <div className='flex flex-col rounded-3xl overflow-hidden justify-between bg-white border border-[#19401f]/10 shadow-lg'>
            <div className="py-4 px-6 bg-[#19401f] text-[#fff3d1]">
                <p className='text-xs uppercase tracking-widest font-bold opacity-80'>Categoria</p>
                <h3 className='text-xl font-black mt-1'>{categoria.nome}</h3>
            </div>
            <div className='p-6 flex-grow bg-white'>
                <p className='text-sm text-[#19401f]/90 font-medium leading-relaxed'>
                    {categoria.descricao || 'Sem descrição cadastrada para esta categoria.'}
                </p>
            </div>
            <div className="flex border-t border-[#19401f]/10">
                <Link 
                    to={`/editarcategoria/${categoria.id}`} 
                    className='w-full text-[#19401f] hover:bg-[#fff3d1] flex items-center justify-center py-3 font-bold text-sm transition-colors border-r border-[#19401f]/10'
                >
                    Editar
                </Link>
                <Link 
                    to={`/deletarcategoria/${categoria.id}`} 
                    className='w-full text-white bg-[#a04e00] hover:bg-opacity-95 flex items-center justify-center py-3 font-bold text-sm transition-all'
                >
                    Deletar
                </Link>
            </div>
        </div>
    </div>
    )
}

export default CardCategorias;