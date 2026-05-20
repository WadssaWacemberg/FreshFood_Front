import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; 
import FormProduto from '../formprodutos/FormProdutos';

function ModalProdutos() {
    return (
        <>
            <Popup
                trigger={
                    <button
                        type="button"
                        className="bg-[#19401f] text-white font-bold px-6 py-3 rounded-xl border border-[#19401f] hover:bg-[#a04e00] hover:text-[#ffffff] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#a04e00] shadow-md"
                        aria-label="Cadastrar novo produto no cardápio"
                    >
                        Novo Produto
                    </button>
                }
                modal
                nested
                contentStyle={{
                    background: '#fff3d1',
                    borderRadius: '1.5rem',
                    padding: '1rem',
                    width: '90%',    
                    maxWidth: '550px',
                    border: '2px solid #19401f' 
                }}
                overlayStyle={{
                    background: 'rgba(25, 64, 31, 0.46)' 
                }}
            >
               
                <div className="w-full max-h-[85vh] overflow-y-auto px-2 py-4 rounded-xl"> 
                    <FormProduto />  
                </div>
            </Popup>
        </>
    );
}

export default ModalProdutos;