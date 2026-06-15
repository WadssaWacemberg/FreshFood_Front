import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../Utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info');
        navigate('/');
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <nav className='w-full flex justify-center py-4 bg-[#19401f] text-[#fff3d1] shadow-md transition-all border-b border-[#a04e00]/20 select-none'>
                <div className="container mx-auto flex justify-between items-center text-lg px-6 md:px-8">
                    
                    {/* Logo unificada da marca */}
                    <Link to='/home' className="text-2xl font-black tracking-wide hover:text-white transition-colors flex items-center gap-1.5">
                        FreshFood <span className="text-sm opacity-90">🌱</span>
                    </Link>
                    
                    {/* Mensagem de boas-vindas customizada */}
                    <p className="font-medium text-[#fff3d1]/90 hidden md:block text-sm lg:text-base">
                        Bem-vindo(a) ao FreshFood, <span className="font-bold text-white">{usuario.nome}</span>
                    </p>

                    {/* Links de navegação e controles */}
                    <div className='flex gap-6 font-semibold items-center text-sm lg:text-base'>
                        <Link to='/produtos' className='hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#a04e00] hover:after:w-full after:transition-all'>Produtos</Link>
                        <Link to='/categorias' className='hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#a04e00] hover:after:w-full after:transition-all'>Categorias</Link>
                        <Link to='/perfil' className='hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#a04e00] hover:after:w-full after:transition-all'>Perfil</Link>
                        
                        <button 
                            onClick={logout} 
                            className='hover:text-[#fff3d1] bg-transparent hover:bg-[#a04e00]/20 px-3 py-1 rounded-xl cursor-pointer font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#a04e00]'
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </nav>
        );
    }

    return component;
}

export default Navbar;
