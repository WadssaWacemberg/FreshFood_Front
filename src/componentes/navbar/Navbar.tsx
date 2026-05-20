import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../Utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/');
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
           
            <div className='w-full flex justify-center py-4 bg-[#19401f] text-[#fff3d1] shadow-md transition-all'>
                <div className="container flex justify-between items-center text-lg mx-8">
                    
               
                    <Link to='/home' className="text-2xl font-black tracking-wide hover:text-white transition-colors">
                        Vitalis
                    </Link>
                    
                  
                    <p className="font-medium text-[#fff3d1]/90 hidden md:block">
                        Bem-vindo(a) ao Vitalis!,  <span className="font-bold text-white">{usuario.nome}</span>
                    </p>

                    
                    <div className='flex gap-6 font-semibold items-center'>
                        <Link to='/produtos' className='hover:text-white transition-colors'>Produtos</Link>
                        <Link to='/categorias' className='hover:text-white transition-colors'>Categorias</Link>
                        <Link to='/perfil' className='hover:text-white transition-colors'>Perfil</Link>
                        
                        
                        <button 
                            onClick={logout} 
                            className='hover:text-[#a04e00] bg-transparent border-none cursor-pointer font-bold transition-colors focus:outline-none'
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {component}
        </>
    );
}

export default Navbar;