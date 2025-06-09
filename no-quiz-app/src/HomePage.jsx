// src/HomePage.jsx
import React from 'react'; // Removi useState pois não será usado no header simplificado
import { Link } from 'react-router-dom';
import { BarChart2, User, FileText, ArrowRight } from 'lucide-react';

// Estilos para o Header. Normalmente ficariam em um GlobalStyles ou CSS separado.
const HeaderStyles = () => (
  <style jsx global>{`
    .fixed-menu {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #1A1A1A; /* Cor de fundo escura para o menu */
      z-index: 1000; /* Para garantir que fique acima de outros conteúdos */
      padding: 0.75rem 1rem; /* Padding interno */
      box-shadow: 0 2px 10px rgba(0,0,0,0.5); /* Sombra para destacar */
      display: flex;
      justify-content: center; /* Centraliza o container do menu */
      height: 60px; /* Definindo uma altura fixa para o menu */
    }
    .menu-container {
      width: 100%;
      max-width: 800px; /* Mesma largura máxima do conteúdo principal */
      display: flex;
      justify-content: space-between; /* Logo à esquerda, ícones (se houver) à direita */
      align-items: center;
    }
    .menu-logo {
      font-family: 'Press Start 2P', cursive; /* Adicionando a fonte pixel */
      color: #CCCCCC;
      font-size: 1rem;
      text-decoration: none;
    }
    .menu-logo span { /* Para o $ ficar branco como no exemplo anterior */
        color: #FFFFFF;
    }
    .menu-icons { /* Mantido para estrutura, mas estará vazio */
      display: flex;
      gap: 1rem;
    }
    /* Se houver uma importação global de fontes, esta seção pode não ser necessária aqui */
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif; /* Garante que a fonte padrão do corpo é Inter */
    }
    .font-pixel {
      font-family: 'FK Grotesk Mono', sans-serif; /* Usará a versão regular se não especificar weight/style */
  font-weight: normal;
    }
    .font-sans {
      font-family: 'FK Grotesk', sans-serif;
    }
      .font-pixel-bold {
      font-family: 'Press Start 2P', sans-serif;
    }
  `}</style>
);

// Componente AppHeader simplificado (apenas o logo)
const AppHeader = () => {
  return (
    <header className="fixed-menu">
      <div className="menu-container">
        {/* Usando Link do react-router-dom para o logo levar para a home "/" */}
        <Link to="/" className="menu-logo">
          I'M NO ECONOMIST
        </Link>
        <div className="menu-icons">
          {/* Ícones da direita foram removidos conforme solicitado */}
        </div>
      </div>
    </header>
  );
};

// Componente PixelDollarSign (customizado, mantido como está)
const PixelDollarSign = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 10 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0H6V2H8V4H6V6H8V8H6V10H8V12H6V14H4V12H2V10H4V8H2V6H4V4H2V2H4V0ZM4 2V4H2V6H4V8H2V10H4V12H6V10H8V8H6V6H8V4H6V2H4Z"
      fill={color}
    />
  </svg>
);

const HomePage = () => {
  return (
    <> {/* Fragmento para agrupar HeaderStyles, AppHeader e o conteúdo da HomePage */}
      <HeaderStyles />
      <AppHeader />
      {/* Contêiner principal da HomePage: define o tema escuro para seu próprio conteúdo.
          Adicionado paddingTop para não ser sobreposto pelo menu fixo.
      */}
      <div 
        className="min-h-screen w-full bg-black text-[#E3E5E7] font-sans flex flex-col items-center px-4 md:px-0"
        style={{ paddingTop: '92px', paddingBottom: '32px' }} // 60px (altura do menu) + 32px (py-8 original) = 92px
      >
        {/* Contêiner interno para limitar a largura do conteúdo, similar ao #root */}
        <div className="w-full" style={{ maxWidth: '800px' }}>
          {/* Seção Hero */}
          <div className="bg-[#231F20] p-8 rounded-lg shadow-xl w-full text-center mb-12 md:mb-16">
            <PixelDollarSign size={60} color="#E3E5E7" className="mx-auto mb-6" />
            <h2 className="font-pixel-bold text-3xl md:text-5xl text-white mb-6">
              BEM-VINDO AO <br />I'M NO ECONOMIST
            </h2>
            <p className="font-sans text-lg md:text-xl text-[#E3E5E7] mb-8 max-w-2xl mx-auto">
              Desvende seu perfil econômico e receba insights personalizados.
              Navegue pela economia brasileira e global de forma descomplicada.
            </p>
            <Link
              to="/quiz" state={{ fromHomepage: true }}
              className="font-pixel-bold bg-[#CCCCCC] text-black px-8 py-4 rounded-md text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              COMEÇAR O QUIZ <ArrowRight size={20} className="inline ml-2" />
            </Link>
          </div>

          {/* Seção de Features */}
          <div className="w-full text-left">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-[#231F20] p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <BarChart2 size={32} className="mb-3 text-[#CCCCCC]" />
                <h3 className="font-pixel-bold text-l text-white mb-2">Análises Claras</h3>
                <p className="font-sans text-sm text-[#E3E5E7]">Entenda a economia de um jeito novo, sem jargões complicados.</p>
              </div>
              {/* Card 2 */}
              <div className="bg-[#231F20] p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <User size={32} className="mb-3 text-[#CCCCCC]" />
                <h3 className="font-pixel-bold text-l text-white mb-2">Perfil Personalizado</h3>
                <p className="font-sans text-sm text-[#E3E5E7]">Descubra seu arquétipo de investidor através do nosso diagnóstico interativo.</p>
              </div>
              {/* Card 3 */}
              <div className="bg-[#231F20] p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <FileText size={32} className="mb-3 text-[#CCCCCC]" />
                <h3 className="font-pixel-bold text-l text-white mb-2">Conteúdo Relevante</h3>
                <p className="font-sans text-sm text-[#E3E5E7]">Highlights e digests do que realmente importa na economia global e brasileira.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;