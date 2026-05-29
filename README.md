<p align="center">
  <a href="https://react.dev/" target="blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="100" alt="React Logo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue" alt="React Version" />
  <img src="https://img.shields.io/badge/TypeScript-Standard-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-purple" alt="Vite" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black" alt="Vercel" />
</p>

# Vitalis Front-End

> **Documentação Técnica: Interface de Usuário (Front-End)**

Esta aplicação é a camada de interface e experiência do usuário (UX) do ecossistema Vitalis. Desenvolvida para alta performance, utilizando o paradigma de componentes e tipagem estática rigorosa.

## 🚀 Status do Sistema
* **Front-end:** [https://vitalis-front-five.vercel.app/home](https://vitalis-front-five.vercel.app)
* **Back-end:** [https://vitalis-api-4oco.onrender.com](https://vitalis-api-4oco.onrender.com)
* **Documentação de API (Swagger):** [https://vitalis-api-4oco.onrender.com/swagger](https://vitalis-api-4oco.onrender.com/swagger)

* 
## 🛠️ Stack Tecnológica
* **Framework:** React com TypeScript
* **Build Tool:** Vite
* **Consumo de API:** Axios
* **Gerenciamento de Estado:** Context API / Hooks
* **Infraestrutura:** Vercel (CI/CD Contínuo)

## 🏗️ Estrutura de Arquitetura
A aplicação segue os princípios de componentização e desacoplamento:
1. **Services:** Camada de integração com a REST API.
2. **Components:** Interface de componentes reutilizáveis.
3. **Pages:** Definição de rotas e layouts de navegação.
4. **Hooks:** Lógica de negócio reutilizável e gerenciamento de estado.

## ⚙️ Configuração e Execução

### Instalação
```bash
npm install
Comandos de Execução
Modo de Desenvolvimento: npm run dev

Build para Produção: npm run build

Preview do Build: npm run preview

📦 Variáveis de Ambiente
Para comunicação com o Back-end, configure a variável no seu ambiente:

VITE_API_URL: URL base da API (ex: https://vitalis-api-4oco.onrender.com)

📄 Licença
Projeto licenciado sob a licença MIT.
