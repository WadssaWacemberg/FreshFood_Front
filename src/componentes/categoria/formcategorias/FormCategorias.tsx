import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../service/Service";

function FormCategorias() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: '',
        descricao: ''
    });

    async function buscarCategoriaPorId(id: string) {
        await buscar(`/categorias/${id}`, setCategoria, {
            headers: { Authorization: token }
        });
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    // Busca id 
    useEffect(() => {
        if (id !== undefined) {
            buscarCategoriaPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setCategoria(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function retornar() {
        navigate('/categorias');
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            // PUT
            try {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: token },
                });
                alert('Categoria atualizada com sucesso');
                retornar();
            } catch (err) {
                const errorMessage = String(err);
                if (errorMessage.includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar a Categoria');
                }
            }
        } else {
            // POST
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: token },
                });
                alert('Categoria cadastrada com sucesso');
                retornar();
            } catch (err) {
                const errorMessage = String(err);
                if (errorMessage.includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar a Categoria');
                }
            }
        }
        setIsLoading(false);
    }

    return (
        <div className="container flex flex-col mx-auto items-center px-4">
            <h1 className="text-4xl font-black text-center my-8 text-[#19401f]">
                {id !== undefined ? 'Editar Categoria' : 'Cadastrar Nova Categoria'}
            </h1>

            <form onSubmit={gerarNovaCategoria} className="flex flex-col w-full max-w-lg gap-5 bg-white p-8 rounded-3xl shadow-xl border border-[#19401f]/10">
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="font-bold text-[#19401f]">Nome da Categoria</label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Ex: Frutas, Bebidas, Sobremesas..."
                        value={categoria.nome}
                        onChange={atualizarEstado}
                        required
                        className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/20 outline-none transition-colors text-[#19401f] font-medium"
                    />
                </div>

      
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="font-bold text-[#19401f]">Descrição Operacional</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        placeholder="Ex: Itens selecionados da horta para o cardápio..."
                        value={categoria.descricao}
                        onChange={atualizarEstado}
                        required
                        rows={3}
                        className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-[#fff3d1]/20 outline-none transition-colors text-[#19401f] font-medium resize-none"
                    />
                </div>

              
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 rounded-xl bg-[#a04e00] text-white font-bold w-full py-4 text-lg shadow-md hover:bg-opacity-95 active:scale-[0.99] transition-all disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed flex justify-center items-center focus:outline-none focus:ring-4 focus:ring-[#19401f]"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Salvando...
                        </span>
                    ) : id !== undefined ? (
                        'Atualizar Categoria'
                    ) : (
                        'Salvar Categoria'
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormCategorias;