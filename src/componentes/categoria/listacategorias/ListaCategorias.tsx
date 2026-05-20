import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../service/Service";
import { SyncLoader } from "react-spinners";
import type Categoria from '../../../models/Categoria';
import CardCategorias from "../cardcategorias/CardCategorias";

function ListaCategorias() {
    const navigate = useNavigate();
    
    
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        async function buscarCategorias() {
            setIsLoading(true);
            try {
                
                await buscar('/categorias', setCategorias, {
                    headers: { Authorization: token }
                });
            } catch (error: unknown) {
                if (error instanceof Error && error.toString().includes('401')) {
                    handleLogout();
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (token !== '') {
            buscarCategorias();
        }
    }, [token, handleLogout]);

    return (
        <>
            
            {isLoading && (
                <div className="flex justify-center items-center h-screen bg-[#fff3d1]">
                    <SyncLoader color="#19401f" size={20} />
                </div>
            )}
            
            <div className="flex justify-center w-full my-4 min-h-[70vh]">
                <div className="container flex flex-col mx-4">
                    
                    
                    {(!isLoading && categorias.length === 0) && (
                        <span className="text-2xl text-center my-12 text-[#19401f]/70 font-medium italic">
                            Nenhuma categoria de menu foi encontrada.
                        </span>
                    )}

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categorias.map((cat) => (
                            <CardCategorias key={cat.id} categoria={cat}/>
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default ListaCategorias;