import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../service/Service"
import { ClipLoader } from "react-spinners"

function DeletarProduto() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (err) {
            const errorMessage = String(err);
            if (errorMessage.includes('401')) {
                handleLogout();
                
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [navigate, token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function DeletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Produto apagado com sucesso')

        } catch (err) {
            const errorMessage= String(err);
            if (errorMessage.includes('401')) {
                handleLogout();
            }else {
                alert('Erro ao deletar a Produto.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/produtos")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Produto</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a Produto a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-green-700 text-white font-bold text-2xl'>
                    Produto
                </header>
                <div className="p-4">
                    <p className='text-xl h-full'>{produto.titulo}</p>
                    <p>{produto.texto}</p>
                </div>
                <div className="flex">
                    
                    <button 
                        className='text-slate-100 bg-orange-800 hover:bg-red-700 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    
                    <button 
                        className='w-full text-slate-100bg-green-800 hover:bg-green-600  flex items-center justify-center'
                        onClick={DeletarProduto}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto