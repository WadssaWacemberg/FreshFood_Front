import { type ChangeEvent, useContext, useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner"; 
import type UsuarioLogin from "../../models/UsuarioLogin";
import imagemVerduras from "../../assets/verduras.jpeg"

function Login() {
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home');
        }
    }, [usuario, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-[#fff3d1] p-4 lg:p-0">
            <div className="relative flex justify-center items-center w-full lg:w-1/2 min-h-[350px] lg:min-h-[450px]">
                        
                {/* 1. Grafismo de Fundo */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-30 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#19401f]" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10,80 Q30,50 60,70 T100,40" strokeDasharray="4 4" />
                        <path d="M20,90 Q40,60 70,80 T100,60" />
                    </svg>
                </div>

                <div className="relative w-full max-w-[280px] lg:max-w-[340px] aspect-square overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 bg-emerald-50
                    rounded-[50%_50%_40%_60%_/_60%_40%_60%_40%] border-4 border-white">
                    <img
                        src={imagemVerduras}
                        alt="Variedade de vegetais selecionados Vitalis"
                        className="w-full h-full object-cover scale-110"
                    />
                </div>

                <div className="absolute top-8 left-4 lg:left-12 w-16 h-16 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg animate-bounce [animation-duration:6s]">
                    <img
                        src={imagemVerduras} 
                        alt="Detalhe nutricional"
                        className="w-full h-full object-cover saturate-150 contrast-115"
                    />
                </div>
                <div className="absolute bottom-12 right-6 lg:right-12 bg-[#fff3d1] text-[#19401f] p-3 rounded-full shadow-md border border-[#19401f]/10 animate-pulse z-20">
                    🌱
                </div>
            </div>

            <div className="flex justify-center items-center w-full lg:w-1/2 p-4">
                <form 
                    className="flex justify-center items-center flex-col w-full max-w-md gap-5 bg-white p-8 rounded-3xl shadow-xl border border-[#19401f]/10" 
                    onSubmit={login}
                >
                    <h2 className="text-[#19401f] text-4xl font-black mb-2">Entrar</h2>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="usuario" className="text-[#19401f]">E-mail / Usuário</label>
                        <input
                            type="email"
                            id="usuario"
                            name="usuario"
                            placeholder="usuario@email.com"
                            className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/10 outline-none text-[#19401f] font-medium transition-colors"
                            value={usuarioLogin.usuario || ''}
                            onChange={atualizarEstado}
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="senha" className="text-[#19401f]">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/10 outline-none text-[#19401f] font-medium transition-colors"
                            value={usuarioLogin.senha || ''}
                            onChange={atualizarEstado}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-xl bg-[#a04e00] text-white font-bold  hover:bg-[#04460f] w-full py-3.5 mt-2 flex justify-center items-center shadow-md hover:bg-opacity-95 transition-all text-lg focus:outline-none focus:ring-4 focus:ring-[#19401f] disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
                        ) : (
                            <span>Acessar Painel</span>
                        )}
                    </button>

                    <hr className="border-[#19401f]/20 w-full my-1" />

                    <p className="text-sm text-[#19401f]/80 font-medium">
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-[#a04e00] hover:underline font-bold focus:outline-none focus:ring-2 focus:ring-[#19401f] rounded px-1">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>

        </div>
    );
}

export default Login;