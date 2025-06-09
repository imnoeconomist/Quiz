import React, { useEffect } from 'react'; // Adicione useEffect aqui
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import QuizPage from './QuizPage';

function App() {
  useEffect(() => {
    const scriptId = 'tailwind-script';
    if (document.getElementById(scriptId)) {

      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);

    script.onload = () => {
      if (typeof window.tailwind !== 'undefined') {
        // Garante que a configuração só seja definida uma vez.
        if (!window.tailwind.content) { // Checa uma propriedade que seria criada pela config
          window.tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  'pixel': ['"Press Start 2P"', 'cursive'],
                  'sans': ['Inter', 'sans-serif'],
                },
                // Você pode adicionar suas cores personalizadas aqui também se precisar
                // para que classes como text-[#E3E5E7] funcionem de forma mais robusta
                // colors: {
                //   'custom-gray': '#E3E5E7',
                //   'custom-light-gray': '#CCCCCC',
                //   'card-bg': '#231F20',
                //   'card-alt-bg': '#2A2A2A',
                // }
              },
            },
            // Adicione content aqui se você estiver usando classes que precisam ser escaneadas,
            // mas para CDN isso é menos relevante do que com build.
            // content: ["./src/**/*.{js,jsx,ts,tsx}"],
          };
           // Para forçar o Tailwind a reprocessar após configuração dinâmica com CDN,
           // pode ser complexo. Geralmente, a configuração no script onload é suficiente
           // para que as classes definidas no HTML usem essas novas definições de tema.
           // Se as classes exatas como text-[#E3E5E7] não funcionarem, usar
           // cores nomeadas na config (ex: text-custom-gray) é mais seguro com CDN.
        }
      }
    };
    // Cleanup function para remover o script se o componente App for desmontado (raro para App)
    // return () => {
    //   const existingScript = document.getElementById(scriptId);
    //   if (existingScript) {
    //     document.head.removeChild(existingScript);
    //   }
    // };
  }, []); 

  return (
    <>
      {/* Seus estilos globais (do global.css importado em main.jsx) devem estar aplicados */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default App;