import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { buscar, atualizar, cadastrar } from "../../../service/Service";


interface ProdutoForm extends Omit<Produto, 'nome'> {
    titulo: string;
}

function FormProduto() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [mostrarDropdown, setMostrarDropdown] = useState<boolean>(false);
    
   
    const [produto, setProduto] = useState<ProdutoForm>({
        id: 0,
        titulo: '',
        descricao: '',
        preco: 0,
        foto: '',
        categoria: null,
        usuario: null
    } as ProdutoForm);

    async function buscarProdutoPorId(id: string) {
        await buscar(`/produtos/${id}`, setProduto, {
            headers: { Authorization: token }
        });
    }

    async function buscarCategorias() {
        await buscar('/categorias', setCategorias, {
            headers: { Authorization: token }
        });
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarCategorias();
        if (id !== undefined) {
            buscarProdutoPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setProduto((prev) => ({
            ...prev,
            [name]: name === 'preco' ? (value === '' ? 0 : parseFloat(value)) : value,
        }));
    }

    function handleSelecionarCategoria(cat: Categoria) {
        setProduto((prev) => ({
            ...prev,
            categoria: cat
        }));
        setMostrarDropdown(false);
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (!produto.categoria || produto.categoria.id === 0) {
            alert('Por favor, selecione uma categoria.');
            setIsLoading(false);
            return;
        }

        const descCategoria = produto.categoria.descricao || "Categoria";

        const payloadFinal = {
            id: id !== undefined ? Number(id) : 0,
            titulo: produto.titulo,
            descricao: produto.descricao,
            preco: Number(produto.preco),
            foto: produto.foto,
            data: new Date().toISOString(),
            categoria: {
                id: Number(produto.categoria.id),
                descricao: descCategoria,
                produto: []
            },
            usuario: {
                id: Number(usuario.id),
                nome: usuario.nome || "Usuario",
                usuario: usuario.usuario || "email@email.com.br",
                senha: "senhaBazinga123",
                foto: usuario.foto || "",
                produto: []
            }
        };

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, payloadFinal, setProduto, {
                    headers: { Authorization: token },
                });
                alert('Produto atualizado com sucesso');
                retornar();
            } catch (err) {
                const errorMessage = String(err);
                if (errorMessage.includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o Produto');
                }
            }
        } else {
            try {
                await cadastrar(`/produtos`, payloadFinal, setProduto, {
                    headers: { Authorization: token },
                });
                alert('Produto cadastrado com sucesso');
                retornar();
            } catch (err) {
                const errorMessage = String(err);
                if (errorMessage.includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o Produto');
                }
            }
        }
        setIsLoading(false);
    }

    function extrairTextoCategoria(cat: Partial<Categoria> | null | undefined): string {
        if (!cat) return "";
        return cat.descricao || `Categoria N° ${cat.id || ''}`;
    }

    return (
        <div className="container flex flex-col mx-auto items-center px-4">
            <h1 className="text-4xl font-black text-center my-8 text-[#19401f]">
                {id !== undefined ? 'Editar Produto do Menu' : 'Cadastrar Novo Prato'}
            </h1>

            <form onSubmit={gerarNovoProduto} className="flex flex-col w-full max-w-lg gap-5 bg-white p-8 rounded-3xl shadow-xl border border-[#19401f]/10">
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo" className="font-bold text-[#19401f]">Nome do Prato / Item</label>
                    <input
                        id="titulo"
                        name="titulo"
                        type="text"
                        placeholder="Ex: Salada Mix Vitalis"
                        value={produto.titulo || ''}
                        onChange={atualizarEstado}
                        required
                        className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-white outline-none transition-colors text-[#19401f] font-bold"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="font-bold text-[#19401f]">Ingredientes / Descrição</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        placeholder="Ex: Mix de folhas verdes e tomates cereja..."
                        value={produto.descricao}
                        onChange={atualizarEstado}
                        required
                        rows={3}
                        className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-white outline-none transition-colors text-[#19401f] font-bold resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="preco" className="font-bold text-[#19401f]">Preço (R$)</label>
                        <input
                            id="preco"
                            name="preco"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={produto.preco || ''}
                            onChange={atualizarEstado}
                            required
                            className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-white outline-none transition-colors text-[#19401f] font-bold"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="foto" className="font-bold text-[#19401f]">URL da Imagem</label>
                        <input
                            id="foto"
                            name="foto"
                            type="text"
                            placeholder="https://linkdaimagem.com"
                            value={produto.foto}
                            onChange={atualizarEstado}
                            required
                            className="border-2 border-[#19401f]/20 focus:border-[#a04e00] rounded-xl p-3 bg-white outline-none transition-colors text-[#19401f] font-bold"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 relative">
                    <label className="font-bold text-[#19401f]">Categoria do Item</label>
                    
                    <button
                        type="button"
                        onClick={() => setMostrarDropdown(!mostrarDropdown)}
                        className="border-2 rounded-xl p-3 text-left font-bold flex justify-between items-center transition-colors"
                        style={{ 
                            backgroundColor: '#ffffff', 
                            color: '#19401f', 
                            borderColor: 'rgba(25, 64, 31, 0.2)' 
                        }}
                    >
                        <span style={{ color: '#19401f' }}>
                            {produto.categoria ? extrairTextoCategoria(produto.categoria) : "Selecione uma Categoria"}
                        </span>
                        <svg className={`w-5 h-5 transition-transform ${mostrarDropdown ? 'rotate-180' : ''}`} fill="none" stroke="#19401f" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {mostrarDropdown && (
                        <div 
                            className="absolute left-0 right-0 top-[85px] z-50 max-h-60 overflow-y-auto rounded-xl shadow-2xl border-2"
                            style={{ backgroundColor: '#ffffff', borderColor: 'rgba(25, 64, 31, 0.2)' }}
                        >
                            {categorias.length === 0 ? (
                                <div className="p-3 text-sm text-center" style={{ color: '#94a3b8' }}>Nenhuma categoria cadastrada</div>
                            ) : (
                                categorias.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => handleSelecionarCategoria(cat)}
                                        className="w-full text-left p-3 font-bold transition-colors border-b last:border-none outline-none flex justify-between"
                                        style={{ backgroundColor: '#ffffff', color: '#19401f', borderColor: '#f1f5f9' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff3d1'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                                    >
                                        <span>{extrairTextoCategoria(cat)}</span>
                                        <span className="text-xs text-slate-400 font-normal">ID: {cat.id}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !produto.categoria}
                    className="mt-4 rounded-xl bg-[#a04e00] text-white font-bold w-full py-4 text-lg shadow-md hover:bg-opacity-95 active:scale-[0.99] transition-all disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isLoading ? 'Salvando...' : id !== undefined ? 'Atualizar Cardápio' : 'Adicionar ao Cardápio'}
                </button>
            </form>
        </div>
    );
}

export default FormProduto;