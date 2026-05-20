import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './componentes/footer/Footer'
import Navbar from './componentes/navbar/Navbar'
import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import ListaCategorias from './componentes/categoria/listacategorias/ListaCategorias'
import ListaProdutos from './componentes/produto/listaprodutos/ListaProdutos'
import Perfil from './pages/perfil/Perfil'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import DeletarCategorias from './componentes/categoria/deletarcategorias/DeletarCategorias'
import FormCategorias from './componentes/categoria/formcategorias/FormCategorias'
import DeletarProdutos from './componentes/produto/deletarprodutos/DeletarProdutos'
import FormProdutos from './componentes/produto/formprodutos/FormProdutos'

function App() {
	return (
		<>
			<AuthProvider>
				<ToastContainer />
				
				<div className="min-h-screen bg-[#fff3d1] text-[#19401f] font-sans antialiased selection:bg-[#19401f] selection:text-[#fff3d1]">
					<BrowserRouter>
						<Navbar />
						<main className="min-h-[80vh]" id="main-content">
							<Routes>
								<Route path="/" element={<Login />} />
								<Route path="/login" element={<Login />} />
								<Route path="/home"	element={<Home />}/>
								<Route path="/cadastro"	element={<Cadastro />}/>
								<Route path="/categorias" element={<ListaCategorias />} />
								<Route path="/cadastrarcategoria" element={<FormCategorias />} />
								<Route path="/editarcategoria/:id" element={<FormCategorias />} />
								<Route path="/deletarcategoria/:id" element={<DeletarCategorias />} />
								<Route path="/produtos" element={<ListaProdutos />} />
								<Route path="/cadastrarproduto" element={<FormProdutos />} />
								<Route path="/editarproduto/:id" element={<FormProdutos />} />
								<Route path="/deletarproduto/:id" element={<DeletarProdutos/>} />
								<Route path="/perfil" element={<Perfil />} />
							</Routes>
						</main>
						<Footer />
					</BrowserRouter>
				</div>
			</AuthProvider>
		</>
	)
}

export default App;