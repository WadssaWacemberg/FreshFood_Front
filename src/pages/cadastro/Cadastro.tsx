import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../service/Service"
import { ClipLoader } from "react-spinners"

function Cadastro() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",   
  })

  useEffect(() => {
    if(usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  function retornar(){
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){
      setIsLoading(true)
      
      const usuarioPayload = {
        nome: usuario.nome,
        usuario: usuario.usuario,
        senha: usuario.senha,
        foto: usuario.foto.trim() === "" ? "https://i.imgur.com/ih0ghtQ.png" : usuario.foto
      }

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuarioPayload, setUsuario)
        alert('Usuário cadastrado com sucesso!')
      } catch (error) {
        console.error(error)
        alert('Erro ao cadastrar o usuário! Verifique os dados ou se o e-mail já existe.')
      } finally {
        setIsLoading(false)
      }
    } else {
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''})
      setConfirmarSenha('')
    }
  }
  
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-[#fff3d1] font-bold p-4 lg:p-0">
        <div className="flex justify-center w-full lg:w-1/2 p-4">
          <img
            src={new URL('../../assets/verduras.jpeg', import.meta.url).href}
            alt="Variedade de verduras e vegetais frescos selecionados para o cardápio"
            className="w-full max-w-md lg:max-w-xl object-cover rounded-3xl shadow-lg border-2 border-[#19401f]/10"
          />
        </div>

        <form 
          className="flex justify-center items-center flex-col w-full lg:w-1/2 max-w-md gap-4 bg-white p-8 rounded-3xl shadow-xl border border-[#19401f]/10" 
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-[#19401f] text-4xl font-black mb-2">Cadastrar</h2>
          
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="nome" className="text-[#19401f]">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/10 outline-none text-[#19401f] font-medium"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="usuario" className="text-[#19401f]">E-mail / Usuário</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="usuario@email.com"
              className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/10 outline-none text-[#19401f] font-medium"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="foto" className="text-[#19401f]">Link da Foto de Perfil</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="https://linkdafoto.com"
              className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/10 outline-none text-[#19401f] font-medium"
              value={usuario.foto}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="senha" className="text-[#19401f]">Senha (Mínimo 8 caracteres)</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/10 outline-none text-[#19401f] font-medium"
              value={usuario.senha}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="confirmarSenha" className="text-[#19401f]">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/10 outline-none text-[#19401f] font-medium"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
              required
            />
          </div>

          <div className="flex justify-around w-full gap-4 mt-2">
            <button 
              type="button"
              className="rounded-xl text-[#a04e00] bg-transparent border-2 border-[#04460f] hover:bg-[#c40505] hover:text-white w-1/2 py-3 transition-all font-bold focus:outline-none focus:ring-2 focus:ring-[#19401f]"
              onClick={retornar}
            >
              Cancelar
            </button>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="rounded-xl text-white bg-[#a04e00] hover:bg-[#04460f] hover:bg-opacity-95 w-1/2 py-3 flex justify-center items-center transition-all font-bold focus:outline-none focus:ring-2 focus:ring-[#19401f]" 
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro;