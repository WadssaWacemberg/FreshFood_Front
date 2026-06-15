import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../service/Service";
import { ClipLoader } from "react-spinners";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",   
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate('/login');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);
      
      const usuarioPayload = {
        nome: usuario.nome,
        usuario: usuario.usuario,
        senha: usuario.senha,
        foto: usuario.foto.trim() === "" ? "https://i.imgur.com/ih0ghtQ.png" : usuario.foto
      };

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuarioPayload, setUsuario);
        alert('Usuário cadastrado com sucesso!');
      } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar o usuário! Verifique os dados ou se o e-mail já existe.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.');
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('');
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#fff3d1]">
      
      {/* Seção Principal do Formulário */}
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center font-bold p-4 lg:p-0">
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

      {/* Rodapé Tecnológico com Linhagem Digital */}
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

export default Cadastro;
