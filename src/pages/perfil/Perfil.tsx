import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import imagemVerduras from '../../assets/verduras.jpeg'

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === "") {
      alert('Você precisa estar logado')
      navigate("/login")
    }
  }, [usuario.token, navigate])

  if (usuario.token === "") {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fff3d1]">
      
      {/* Área de Conteúdo Centralizada e Expandida */}
      <div className="flex-grow flex flex-col p-4 lg:p-8 justify-center items-center relative overflow-hidden">
        
        {/* 1. Grafismo de Fundo */}
        <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-20 pointer-events-none z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#19401f]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10,80 Q30,50 60,70 T100,40" strokeDasharray="4 4" />
            <path d="M20,90 Q40,60 70,80 T100,60" />
          </svg>
        </div>
        
        {/* 2. Plantinha Flutuante da Seção */}
        <div className="absolute bottom-4 right-4 bg-[#fff3d1] text-[#19401f] p-2 rounded-full shadow-md border border-[#19401f]/10 animate-pulse z-20 text-xs">
          🌱
        </div>

        {/* Card do Perfil */}
        <div className='w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#19401f]/10 overflow-hidden relative z-10'>
          
          {/* Banner Superior do Card */}
          <div className="w-full h-64 lg:h-80 overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              src={imagemVerduras}
              alt="Variedade de verduras e vegetais frescos selecionados para o cardápio FreshFood"
            />
            <div className="absolute inset-0 bg-[#19401f]/10" />
          </div>

          {/* Foto de Perfil Centralizada com Sobreposição */}
          <div className="relative flex justify-center">
            <div className="relative mt-[-112px] z-20">
              <img
                src={usuario.foto && usuario.foto !== "" ? usuario.foto : imagemVerduras} 
                alt={`Foto de perfil de ${usuario.nome}`} 
                className='rounded-full w-56 h-56 object-cover border-8 border-white shadow-xl bg-white' 
              />
              <div className="absolute bottom-2 right-2 bg-[#fff3d1] text-[#19401f] p-3 rounded-full shadow-md border border-[#19401f]/20 animate-pulse">
                🌱
              </div>
            </div>
          </div>

          {/* Detalhes do Usuário */}
          <div className="pt-8 pb-12 px-6 flex flex-col bg-white text-[#19401f] items-center justify-center gap-4">
            
            <div className="text-center flex flex-col gap-1">
              <p className='text-3xl lg:text-4xl font-black tracking-tight'>
                {usuario.nome}
              </p>
              <p className="text-base font-semibold text-[#a04e00] tracking-wider uppercase">
                Membro FreshFood Homologado
              </p>
            </div>

            <div className="w-full max-w-xs h-[1px] bg-[#19401f]/10 my-1" />

            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">E-mail de Acesso</span>
              <p className="text-lg font-bold bg-[#19401f]/5 text-[#19401f] px-6 py-2 rounded-xl border border-[#19401f]/10">
                {usuario.usuario}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Perfil;
