import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, ArrowRight, RefreshCw, ChevronLeft, FileText, Rocket, Mail, CheckSquare, Square, Menu, UserCircle, Star, Settings, LogOut } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom'; // Não mais necessário
import Boletim from './assets/Boletim.png';
import Caos from './assets/Caos.png';
import Causa from './assets/Causa.png';
import Conservador from './assets/Conservador.png';
import Estag from './assets/estag.png';
import Exausto from './assets/Exausto.png';
import Forasteiro from './assets/Forasteiro.png';
import Magnata from './assets/magnata.png';
import PDF from './assets/PDF.png';
import Viuva from './assets/viuva.png';
import Youtube from './assets/Youtube.png';
import PIX from './assets/PIX.png';
import Linkedinicon from './assets/Linkedin.svg';
import Downloadicon from './assets/Download.svg';
import Whatsappicon from './assets/Whatsapp.svg';
import Twittericon from './assets/Twitter.svg';
import { TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';

const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-color: #000000;
      color: #E3E5E7;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      padding-top: 1rem; /* Reduzido para dar espaço ao menu fixo */
      padding-bottom: 2rem;
    }
    #root {
        width: 100%;
        max-width: 1240px; /* Max-width para o conteúdo principal */
        margin: 0 auto; /* Centraliza #root */
        padding-top: 60px; /* Espaço para o menu fixo */
    }
    .font-pixel {
      font-family: 'FK Grotesk Mono', sans-serif; /* Usará a versão regular se não especificar weight/style */
    }
    .font-sans {
      font-family: 'FK Grotesk', sans-serif;
    }
    .font-pixel-bold {
      font-family: 'Press Start 2P', sans-serif;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #1A1A1A; }
    ::-webkit-scrollbar-thumb { background: #888888; border-radius: 0; }
    ::-webkit-scrollbar-thumb:hover { background: #CCCCCC; }

    .fixed-menu {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #1A1A1A;
      z-index: 1000;
      padding: 0.75rem 1rem;
      border-bottom: 2px solid #555555; /* Em vez de sombra */
      display: flex;
      justify-content: center;
    }
    .menu-container {
      width: 100%;
      max-width: 1240px; /* Mesma largura máxima do #root */
      display: flex;
      justify-content: space-between; /* Logo à esquerda, ícones à direita */
      align-items: center;
    }
    .menu-logo {
      font-family: 'Press Start 2P', cursive;
      color: #CCCCCC;
      font-size: 1rem;
      text-decoration: none;
    }
    .pixel-button {
        border: 2px solid #555;
        border-bottom-width: 4px;
        border-right-width: 4px;
    }
    .pixel-button:active {
        border-bottom-width: 2px;
        border-right-width: 2px;
        transform: translateY(2px);
    }
  `}</style>
);

const quizData = {
  archetypes: {
    executor_sem_causa: {
      name: "O Executor Sem Causa",
      avatar: "C:Userseric_DesktopReact\no-quiz-appsrcassetsTEST.png", 
      image: Causa, 
      description: "Você investe antes de comprar, mas não pensa antes de investir. Aloca de forma agressiva, muda muito e se trava na disciplina. Vai continuar girando patrimônio como quem gira garrafa no jogo da verdade. Vai dar entrada num carro, num day trade e num curso de opções tudo no mesmo mês. E vai culpar o mercado.",
      recommendations: [
        { title: "Plano Simples", text: "Um plano simples, repetido todo mês, te faz mais rico que qualquer trade genial que só existe no Twitter. Invista como adulto, e talvez você pare de viver como adolescente em loop." },
        { title: "Newsletter", text: "Comece pela newsletter: iamnoeconomist.substack.com" }
      ],
    },
    curador_videos_youtube: {
      name: "O Curador de Vídeos do YouTube",
      avatar: "C:Userseric_DesktopReact\no-quiz-appsrcassetsTEST.png",
      image: Youtube,
      description: "Sabe bastante, mas não investe. Busca mais conteúdo do que prática. Vai saber explicar o halving do Bitcoin, o risco fiscal e o valuation do Nubank mas vai estar com R$312 na conta e 16 abas abertas.",
      recommendations: [
        { title: "Ação Imediata", text: "Escolha um ativo. Um aporte. Um plano. E começa. O resto você aprende fazendo. Porque o que te separa do cara rico não é informação, é coragem de aplicar." },
        { title: "Dose Semanal", text: "Uma dose por semana: iamnoeconomist.substack.com" }
      ],
    },
    refem_do_pix: {
        name: "O Refém do Pix",
        image: PIX,
        description: "Não consegue guardar dinheiro. Dificuldade de alocação mínima. Vai continuar rico no sábado e quebrado na segunda. E no fim do ano, a culpa vai ser da inflação. Mas foi o açaí de R$42.",
        recommendations: [
          { title: "Organização Básica", text: "Organiza o básico. Automatiza o que dá. E começa a investir antes do Pix te roubar de novo." },
          { title: "Sem Julgamentos", text: "Te ensino sem te julgar (muito): iamnoeconomist.substack.com" }
        ],
      },
      forasteiro_financeiro: {
        name: "O Forasteiro Financeiro",
        image: Forasteiro,
        description: "Menciona dólar, desconfia do Brasil, vê cenário externo com otimismo. Vai seguir dizendo que 'lá fora é mais seguro' enquanto sua reserva ainda tá no Nubank. Dólar é sonho. Mas sua execução é em real e frágil.",
        recommendations: [
          { title: "Comece Agora", text: "Você pode sim dolarizar, se proteger, até sair do Brasil se quiser. Mas comece com o que tem. Aqui. Agora. Antes que o próximo ciclo leve o que sobrou." },
          { title: "Câmbio Mental", text: "Câmbio de mentalidade aqui: iamnoeconomist.substack.com" }
        ],
      },
      entusiasta_exausto: {
        name: "O Entusiasta Exausto",
        image: Exausto,
        description: "Já tentou, parou, recomeça todo ano com esperança e cansaço. Vai desistir na quinta semana de janeiro, e voltar em setembro tentando 'recomeçar com tudo'. Spoiler: o problema não é você. É a ilusão da intensidade.",
        recommendations: [
          { title: "Disciplina vs Motivação", text: "Disciplina chata ganha de motivação instável. Não precisa amar finanças. Precisa só não deixar que elas te ignorem." },
          { title: "Lembrete Semanal", text: "Um email por semana pra te lembrar disso: iamnoeconomist.substack.com" }
        ],
      },
      colecionador_de_pdf: {
        name: "O Colecionador de PDF",
        image: PDF,
        description: "Muita consciência de falta de ação, perfil mais introspectivo, sem execução. Vai ter uma pasta cheia de conteúdo e uma conta vazia de atitude. Seus arquivos sabem mais que você.",
        recommendations: [
          { title: "Execute e Aprenda", text: "Escolha uma tese. Execute por três meses. Aprenda com o erro não com o e-book." },
          { title: "Menos Download", text: "Menos download, mais vida: iamnoeconomist.substack.com" }
        ],
      },
      filho_do_trauma: {
        name: "O Filho do Trauma",
        image: Caos,
        description: "Trauma familiar ou histórico, muito avesso a risco. Vai repetir a mesma pobreza emocional (e financeira) que tentou evitar. Só que travado, anestesiado. Você não gasta, não investe, não vive.",
        recommendations: [
          { title: "Reprograme sua Relação", text: "Você pode reprogramar sua relação com o dinheiro. Não pra ser rico mas pra ser livre. Sua história não é destino. É ponto de partida." },
          { title: "Um Passo por Vez", text: "Um passo por vez: iamnoeconomist.substack.com" }
        ],
      },
      visionario_que_nao_viu_o_boletim: {
        name: "O Visionário Que Não Viu o Boletim",
        image: Boletim,
        description: "Alto idealismo, pouca execução, quer liberdade, mas não tem controle. Vai ter mil ideias e nenhuma reserva. Falar bonito no pitch, mas esquecer de pagar o aluguel. Vai ser 'genial' até o vencimento do cartão.",
        recommendations: [
          { title: "Base Sólida", text: "Comece com uma planilha. Com um boleto pago no dia. E um investimento por mês. Visão sem base é só delírio." },
          { title: "Chão e Contexto", text: "Aqui é chão e contexto: iamnoeconomist.substack.com" }
        ],
      },
      conservador_da_renda_fixa: {
        name: "O conservador da Renda Fixa",
        image: Conservador,
        description: "100% em CDI, avesso a qualquer volatilidade, desconfiança em tudo. Vai confiar no Tesouro Direto como quem confia na Bíblia. Só que nem lê direito. CDI não é plano. É sedativo.",
        recommendations: [
          { title: "Questione Mais", text: "Pergunte mais. Diversifique devagar. Você não precisa virar petista pra ter ações." },
          { title: "Crítica Construtiva", text: "Aqui a gente critica tudo: iamnoeconomist.substack.com" }
        ],
      },
      a_viuva_do_bitcoin: {
        name: "A Viúva do Bitcoin",
        image: Viuva,
        description: "Já investiu e tomou tombo. Está travada pelo passado. Vai seguir presa no trauma do topo. Vai olhar pra carteira e lembrar do ex. E o pior: vai continuar achando que o erro foi amar demais.",
        recommendations: [
          { title: "Método e Terapia", text: "Você pode ter cripto. Mas com método. Com rebalanceamento. Com terapia, se precisar." },
          { title: "Cura Macro", text: "Cura macro em pílulas semanais: iamnoeconomist.substack.com" }
        ],
      },
      socio_da_euforia: {
        name: "O Sócio da Euforia",
        image: Magnata,
        description: "Gosta de hype, entra em tendência, comportamento impulsivo. Vai ser sempre o último a entrar e o primeiro a sair. O mercado é um jogo cruel pra quem só ouve grito.",
        recommendations: [
          { title: "Sobreviva ao Hype", text: "Você pode aproveitar o hype. Mas só se tiver posição antes. O segredo não é prever. É sobreviver." },
          { title: "Aprenda a Jogar", text: "Vem aprender a jogar: iamnoeconomist.substack.com" }
        ],
      },
      estagiario_do_proprio_dinheiro: {
        name: "O Estagiário do Próprio Dinheiro",
        image: Estag,
        description: "Sabe pouco, investe pouco, está começando e perdido. Vai passar a vida trabalhando duro... pra nada. Vai virar o gerente do seu setor e o estagiário da sua conta.",
        recommendations: [
          { title: "Respeite Seu Dinheiro", text: "Você não precisa virar investidor profissional. Só precisa parar de viver no automático. Seu dinheiro merece respeito. E você também." },
          { title: "Cresça Conosco", text: "Bora crescer junto: iamnoeconomist.substack.com" }
        ],
      },
  },
  questions: [
    // ... (Perguntas do quiz mantidas como no original, sem alterações aqui)
    {
      id: 1,
      text: "Qual seu MAIOR objetivo ao investir hoje? ",
      type: 'single',
      options: [
        { id: "a", text: "Ter paz financeira e segurança para o futuro. ", points: { filho_do_trauma: 2, conservador_da_renda_fixa: 2, entusiasta_exausto: 1 } },
        { id: "b", text: "Me aposentar cedo ou alcançar independência financeira o quanto antes. ", points: { visionario_que_nao_viu_o_boletim: 2, executor_sem_causa:1, forasteiro_financeiro: 1 } },
        { id: "c", text: "Construir e aumentar meu patrimônio consistentemente. ", points: { forasteiro_financeiro: 1, executor_sem_causa: 1, visionario_que_nao_viu_o_boletim: 1, curador_videos_youtube:1 } },
        { id: "d", text: "Comprar um imóvel (casa/apartamento) ou sair do aluguel. ", points: { refem_do_pix: 2, estagiario_do_proprio_dinheiro:1, entusiasta_exausto:1 } },
        { id: "e", text: "Ganhar liberdade geográfica, poder viver/trabalhar de onde quiser. ", points: { forasteiro_financeiro: 3, visionario_que_nao_viu_o_boletim: 3, socio_da_euforia:1 } },
      ],
    },
    {
      id: 2,
      text: "Como você descreveria sua estratégia de alocação de ativos? ",
      type: 'single',
      options: [
        { id: "a", text: "Conservadora, priorizando segurança e baixo risco.", points: { conservador_da_renda_fixa: 2, filho_do_trauma: 2 } },
        { id: "b", text: "Equilibrada, buscando um meio-termo entre segurança e potencial de crescimento.", points: { estagiario_do_proprio_dinheiro: 1, entusiasta_exausto: 1 } },
        { id: "c", text: "Agressiva, focada em altos retornos, mesmo que isso signifique mais volatilidade.", points: { executor_sem_causa: 3, socio_da_euforia: 2, visionario_que_nao_viu_o_boletim:1 } },
        { id: "d", text: "Minha alocação muda frequentemente, costumo seguir as oportunidades do momento.", points: { executor_sem_causa: 3, socio_da_euforia: 2 } },
        { id: "e", text: "Não tenho uma estratégia clara de alocação ou não sei bem como definir.", points: { estagiario_do_proprio_dinheiro: 3, refem_do_pix: 1, curador_videos_youtube: 1, colecionador_de_pdf:1 } },
      ],
    },
    {
      id: 3,
      text: "Com qual frequência você revisa seus investimentos? ",
      type: 'single',
      options: [
        { id: "a", text: "Nunca ", points: { estagiario_do_proprio_dinheiro: 2, refem_do_pix: 2, colecionador_de_pdf: 1, filho_do_trauma: 1 } },
        { id: "b", text: "Só quando o mercado entra em pânico ", points: { socio_da_euforia: 2, a_viuva_do_bitcoin: 2, filho_do_trauma: 1 } },
        { id: "c", text: "Uma vez por ano ", points: { conservador_da_renda_fixa: 2, entusiasta_exausto: 1, forasteiro_financeiro: 1 } },
        { id: "d", text: "Uma vez por mês ", points: { executor_sem_causa: 1, curador_videos_youtube: 1, visionario_que_nao_viu_o_boletim: 1 } },
        { id: "e", text: "Toda semana (ou mais) ", points: { executor_sem_causa: 3, socio_da_euforia: 2 } },
      ],
    },
    {
      id: 4,
      text: "Qual o valor aproximado que você tem investido hoje? ",
      type: 'single',
      options: [
        { id: "a", text: "Menos de R$5.000 ", points: { estagiario_do_proprio_dinheiro: 3, refem_do_pix: 3, curador_videos_youtube: 2, entusiasta_exausto: 1 } },
        { id: "b", text: "Entre R$5.000 e R$50.000 ", points: { estagiario_do_proprio_dinheiro: 1, executor_sem_causa: 1, colecionador_de_pdf: 1, entusiasta_exausto: 1 } },
        { id: "c", text: "De R$50.000 a R$200.000 ", points: { executor_sem_causa: 1, forasteiro_financeiro: 1, visionario_que_nao_viu_o_boletim: 1, conservador_da_renda_fixa: 1 } },
        { id: "d", text: "Mais de R$200.000 ", points: { executor_sem_causa: 1, forasteiro_financeiro: 1, visionario_que_nao_viu_o_boletim: 1 } },
      ],
    },
    {
      id: 5,
      text: "Quais eventos econômicos mais te marcaram nos últimos 5 anos? (Selecione até todos que se aplicam)",
      type: 'multiple',
      options: [
        { id: "a", text: "Inflação global e juros disparando pós-pandemia (2021-2023)", points: { filho_do_trauma: 2, conservador_da_renda_fixa: 1, forasteiro_financeiro: 1 } },
        { id: "b", text: "Halving do Bitcoin e volatilidade no mercado cripto (ex: 2024)", points: { socio_da_euforia: 1, a_viuva_do_bitcoin: 1, executor_sem_causa: 1 } },
        { id: "c", text: "Risco fiscal e debates sobre gastos públicos no Brasil (ex: Arcabouço Fiscal)", points: { forasteiro_financeiro: 2, conservador_da_renda_fixa: 2, filho_do_trauma: 1 } },
        { id: "d", text: "Quedas ou altas expressivas da bolsa brasileira (ex: Ibovespa)", points: { a_viuva_do_bitcoin: 2, socio_da_euforia: 1, filho_do_trauma: 1, executor_sem_causa:1 } },
        { id: "e", text: "Decisões de política monetária nos EUA (FED) e seus impactos globais", points: { forasteiro_financeiro: 2, visionario_que_nao_viu_o_boletim: 1, curador_videos_youtube:1 } },
        { id: "f", text: "Ascensão da Inteligência Artificial e seus impactos econômicos", points: { visionario_que_nao_viu_o_boletim: 1, curador_videos_youtube: 1, socio_da_euforia: 1 } },
        { id: "g", text: "Guerras, tensões geopolíticas (ex: Ucrânia, Oriente Médio) e seus efeitos nos mercados", points: { filho_do_trauma: 1, forasteiro_financeiro: 1 } },
        { id: "h", text: "Crises climáticas e seus custos econômicos (ex: secas, enchentes severas)", points: { filho_do_trauma: 1, conservador_da_renda_fixa: 1 } },
      ],
    },
    {
      id: 6,
      text: "Quando você pensa em investir hoje, o que mais te trava? (Selecione até todos que se aplicam)",
      type: 'multiple',
      options: [
        { id: "a", text: "Medo de perder o que juntei ", points: { filho_do_trauma: 3, a_viuva_do_bitcoin: 2, conservador_da_renda_fixa: 1, estagiario_do_proprio_dinheiro: 1 } },
        { id: "b", text: "Falta de confiança no governo / cenário político do Brasil", points: { forasteiro_financeiro: 3, conservador_da_renda_fixa: 2 } },
        { id: "c", text: "Não saber se este é um bom momento / Análise excessiva que paralisa (overthinking)", points: { curador_videos_youtube: 2, colecionador_de_pdf: 2, estagiario_do_proprio_dinheiro: 1, entusiasta_exausto: 1 } },
        { id: "d", text: "Falta de tempo para pesquisar/gerenciar ", points: { executor_sem_causa: 2, visionario_que_nao_viu_o_boletim: 1, estagiario_do_proprio_dinheiro: 1, refem_do_pix:1 } },
        { id: "e", text: "Falta de grana mesmo ", points: { refem_do_pix: 3, estagiario_do_proprio_dinheiro: 2 } },
        { id: "f", text: "Achar que é muito complicado ou que não tenho conhecimento suficiente", points: { estagiario_do_proprio_dinheiro: 2, curador_videos_youtube: 1, colecionador_de_pdf: 1 } },
      ],
    },
    {
      id: 7,
      text: "Complete a frase: 'Investir, pra mim, é...'",
      type: 'single',
      options: [
        { id: "a", text: "...proteger o que tenho. ", points: { filho_do_trauma: 3, conservador_da_renda_fixa: 3 } },
        { id: "b", text: "...crescer com consistência e planejamento. ", points: { forasteiro_financeiro:1, visionario_que_nao_viu_o_boletim:1, executor_sem_causa:1 } },
        { id: "c", text: "...um jogo que nunca entendi direito. ", points: { estagiario_do_proprio_dinheiro: 3, curador_videos_youtube: 2, colecionador_de_pdf: 2 } },
        { id: "d", text: "...uma aposta em mim mesmo e nas minhas ideias. ", points: { executor_sem_causa: 2, socio_da_euforia: 2, visionario_que_nao_viu_o_boletim: 3 } },
        { id: "e", text: "...algo que faço porque todo mundo faz ou por pressão. ", points: { socio_da_euforia: 2, estagiario_do_proprio_dinheiro: 1 } },
      ],
    },
    {
      id: 8,
      text: "Você se sente confortável com perdas temporárias no curto prazo? ",
      type: 'single',
      options: [
        { id: "a", text: "Não, fico muito desconfortável. ", points: { filho_do_trauma: 3, conservador_da_renda_fixa: 3, a_viuva_do_bitcoin: 2 } },
        { id: "b", text: "Só se for pouco e recuperar rápido. ", points: { estagiario_do_proprio_dinheiro: 2, refem_do_pix: 1, entusiasta_exausto: 1 } },
        { id: "c", text: "Depende do ativo e da minha estratégia. ", points: { curador_videos_youtube: 2, forasteiro_financeiro: 1, colecionador_de_pdf:1 } },
        { id: "d", text: "Sim, se fizer sentido no longo prazo e eu entender o risco. ", points: { executor_sem_causa: 2, visionario_que_nao_viu_o_boletim: 2 } },
      ],
    },
      {
      id: 9,
      text: "Como você vê o momento atual da economia brasileira? ",
      type: 'single',
      options: [
        { id: "a", text: "Um caos: juros altos, desconfiança, dólar instável. ", points: { forasteiro_financeiro: 3, filho_do_trauma: 2, conservador_da_renda_fixa: 1 } },
        { id: "b", text: "Em recuperação, mas ainda frágil e incerta. ", points: { entusiasta_exausto: 1, curador_videos_youtube: 1, colecionador_de_pdf: 1 } },
        { id: "c", text: "Normal, o Brasil sempre foi assim, altos e baixos. ", points: { conservador_da_renda_fixa: 2, colecionador_de_pdf: 1, executor_sem_causa:1 } },
        { id: "d", text: "Uma oportunidade disfarçada para quem sabe procurar. ", points: { executor_sem_causa: 2, socio_da_euforia: 2, visionario_que_nao_viu_o_boletim: 1 } },
        { id: "e", text: "Não faço ideia, não acompanho de perto. ", points: { estagiario_do_proprio_dinheiro: 3, refem_do_pix: 2 } },
      ],
    },
    {
      id: 10,
      text: "E o cenário internacional, como você o percebe? ",
      type: 'single',
      options: [
        { id: "a", text: "Crucial, decisões como as do Fed (banco central americano) podem mudar tudo. ", points: { forasteiro_financeiro: 3, curador_videos_youtube: 1, visionario_que_nao_viu_o_boletim: 1 } },
        { id: "b", text: "Preocupante, com desaceleração da China ou outras potências. ", points: { forasteiro_financeiro: 2, curador_videos_youtube: 1, filho_do_trauma: 1 } },
        { id: "c", text: "Mais calmo ultimamente, mas sempre imprevisível. ", points: { filho_do_trauma:1, conservador_da_renda_fixa:1, entusiasta_exausto:1 } },
        { id: "d", text: "Não acompanho muito, foco mais no Brasil. ", points: { estagiario_do_proprio_dinheiro: 3, refem_do_pix: 2, conservador_da_renda_fixa: 2 } },
      ],
    },
    {
      id: 11,
      text: "Em qual faixa de idade você se encontra?",
      type: 'single',
      options: [
        { id: "a", text: "Até 28 anos", points: { estagiario_do_proprio_dinheiro: 1, socio_da_euforia: 1, visionario_que_nao_viu_o_boletim: 1, refem_do_pix:1 } },
        { id: "b", text: "29 a 44 anos", points: { entusiasta_exausto:1, forasteiro_financeiro: 1, curador_videos_youtube:1, executor_sem_causa:1 } },
        { id: "c", text: "45 a 60 anos", points: { forasteiro_financeiro: 2, filho_do_trauma: 1, colecionador_de_pdf: 1, conservador_da_renda_fixa:1 } },
        { id: "d", text: "Mais de 60 anos", points: { filho_do_trauma: 3, conservador_da_renda_fixa: 2 } },
      ],
    },
    {
      id: 12,
      text: "Qual dessas frases sobre experiências passadas ou sentimentos parece mais com você? ",
      type: 'single',
      options: [
        { id: "a", text: "\"Vivi a hiperinflação ou ouvi muitas histórias disso na infância.\" ", points: { filho_do_trauma: 3, conservador_da_renda_fixa: 2 } },
        { id: "b", text: "\"Comecei a trabalhar ou investir no meio de uma crise financeira.\" ", points: { entusiasta_exausto: 2, a_viuva_do_bitcoin: 1, filho_do_trauma: 1 } },
        { id: "c", text: "\"Sinto que estou sempre atrasado(a) em relação aos outros financeiramente.\" ", points: { estagiario_do_proprio_dinheiro: 2, colecionador_de_pdf: 2, refem_do_pix: 1, entusiasta_exausto:1 } },
        { id: "d", text: "\"Nunca entendi bem como as pessoas realmente ficam ricas ou constroem patrimônio.\" ", points: { estagiario_do_proprio_dinheiro: 3, refem_do_pix: 2, curador_videos_youtube: 1 } },
        { id: "e", text: "\"Estou tentando ser o(a) primeiro(a) da minha família a organizar as finanças e investir de forma séria.\" ", points: { estagiario_do_proprio_dinheiro: 2, visionario_que_nao_viu_o_boletim: 1, executor_sem_causa: 1, entusiasta_exausto:1 } },
      ],
    },
    {
      id: 13,
      text: "Onde está investido a maior parte do seu dinheiro hoje? ",
      type: 'single',
      options: [
        { id: "a", text: "Poupança ", points: { refem_do_pix: 2, filho_do_trauma: 2, estagiario_do_proprio_dinheiro: 1, conservador_da_renda_fixa: 1 } },
        { id: "b", text: "CDB / Tesouro Direto ", points: { conservador_da_renda_fixa: 3, filho_do_trauma: 2, refem_do_pix: 1 } },
        { id: "c", text: "Fundos de investimento diversos ", points: { estagiario_do_proprio_dinheiro: 1, executor_sem_causa: 1, curador_videos_youtube: 1 } },
        { id: "d", text: "Ações no Brasil ", points: { executor_sem_causa: 2, socio_da_euforia: 2, visionario_que_nao_viu_o_boletim: 1 } },
        { id: "e", text: "Criptomoedas ", points: { socio_da_euforia: 3, executor_sem_causa: 2, a_viuva_do_bitcoin: 1 } },
        { id: "f", text: "Dólar / Ativos fora do Brasil ", points: { forasteiro_financeiro: 3, executor_sem_causa: 1 } },
        { id: "g", text: "Não invisto ainda ou quase nada ", points: { estagiario_do_proprio_dinheiro: 3, refem_do_pix: 2, curador_videos_youtube: 1 } },
      ],
    },
  ],
};

// --- COMPONENTE QUIZ (Mantido como no original) ---
const Quiz = ({ onQuizComplete, initialAnswers, initialQuestionIndex = 0 }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
  const [answers, setAnswers] = useState(initialAnswers || {});
  const [startTime] = useState(Date.now());
  const [questionTimings, setQuestionTimings] = useState({});

  const currentQuestion = quizData.questions[currentQuestionIndex];

  useEffect(() => {
    const currentQuestionId = currentQuestion.id;
    if (!questionTimings[currentQuestionId] || !questionTimings[currentQuestionId].startTime) {
        setQuestionTimings(prev => ({
            ...prev,
            [currentQuestionId]: { ...prev[currentQuestionId], startTime: Date.now() }
        }));
    }
  }, [currentQuestionIndex, questionTimings, currentQuestion.id]);

  const finalizeQuiz = (currentAnswers) => {
    const endTime = Date.now();
    const timeToComplete = endTime - startTime;
    
    const scores = Object.keys(quizData.archetypes).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
    }, {});

    const detailedAnswersData = quizData.questions.map(q => {
      const questionAnswerData = {
        questionId: q.id,
        questionText: q.text,
        type: q.type,
        timeSpent: questionTimings[q.id]?.timeSpent || null,
        answeredIds: [],
        answeredTexts: [],
        pointsFromOptions: [],
      };

      if (q.type === 'multiple') {
        const selectedOptionIds = currentAnswers[q.id] || [];
        const selectedOptionsObjects = selectedOptionIds
          .map(optId => q.options.find(opt => opt.id === optId))
          .filter(Boolean);

        questionAnswerData.answeredIds = selectedOptionIds;
        questionAnswerData.answeredTexts = selectedOptionsObjects.map(opt => opt.text);
        questionAnswerData.pointsFromOptions = selectedOptionsObjects.map(opt => opt.points || {});
        
        selectedOptionsObjects.forEach(chosenOption => {
          if (chosenOption && chosenOption.points) {
            for (const archetypeKey in chosenOption.points) {
              if (Object.prototype.hasOwnProperty.call(scores, archetypeKey)) {
                scores[archetypeKey] += chosenOption.points[archetypeKey];
              }
            }
          }
        });
      } else { // single
        const selectedOptionId = currentAnswers[q.id];
        const selectedOptionObject = q.options.find(opt => opt.id === selectedOptionId);

        if (selectedOptionId) {
            questionAnswerData.answeredIds = [selectedOptionId];
            questionAnswerData.answeredTexts = selectedOptionObject ? [selectedOptionObject.text] : [];
            questionAnswerData.pointsFromOptions = selectedOptionObject ? [selectedOptionObject.points || {}] : [];
        }

        if (selectedOptionObject && selectedOptionObject.points) {
          for (const archetypeKey in selectedOptionObject.points) {
            if (Object.prototype.hasOwnProperty.call(scores, archetypeKey)) {
              scores[archetypeKey] += selectedOptionObject.points[archetypeKey];
            }
          }
        }
      }
      return questionAnswerData;
    });

    const finalArchetypeKey = determineArchetypeFromScores(scores);
    const quizResultData = {
      determinedArchetypeKey: finalArchetypeKey,
      allArchetypeScores: scores,
      detailedAnswers: detailedAnswersData,
      timeToComplete: timeToComplete,
    };
    onQuizComplete(quizData.archetypes[finalArchetypeKey], quizResultData);
  };

  const handleAnswer = (questionId, optionId) => {
    let newAnswers = { ...answers };
    const question = quizData.questions.find(q => q.id === questionId);

    if (question.type === 'multiple') {
      const currentSelections = answers[questionId] || [];
      const newSelections = currentSelections.includes(optionId)
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId];
      newAnswers = { ...answers, [questionId]: newSelections };
      setAnswers(newAnswers);
    } else { // single
      newAnswers = { ...answers, [questionId]: optionId };
      setAnswers(newAnswers);
      
      const questionStartTime = questionTimings[questionId]?.startTime;
      if (questionStartTime && (!questionTimings[questionId]?.timeSpent)) {
        const timeSpentOnQuestion = Date.now() - questionStartTime;
        setQuestionTimings(prev => ({ ...prev, [questionId]: { ...prev[questionId], timeSpent: timeSpentOnQuestion, answeredAt: Date.now() } }));
      }

      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finalizeQuiz(newAnswers);
      }
    }
  };
  
  const handleNextForMultipleChoice = () => {
    const questionId = currentQuestion.id;
    const questionStartTime = questionTimings[questionId]?.startTime;
    if (questionStartTime && (!questionTimings[questionId]?.timeSpent)) {
        const timeSpentOnQuestion = Date.now() - questionStartTime;
        setQuestionTimings(prev => ({ ...prev, [questionId]: { ...prev[questionId], timeSpent: timeSpentOnQuestion, answeredAt: Date.now() } }));
    }

    if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        finalizeQuiz(answers);
    }
  };
  
  const determineArchetypeFromScores = (calculatedScores) => {
    let highestScore = -1;
    let determinedArchetypeKey = 'estagiario_do_proprio_dinheiro'; 
    for (const archetypeKey in calculatedScores) {
      if (calculatedScores[archetypeKey] > highestScore) {
        highestScore = calculatedScores[archetypeKey];
        determinedArchetypeKey = archetypeKey;
      } else if (calculatedScores[archetypeKey] === highestScore) {
        determinedArchetypeKey = archetypeKey; 
      }
    }
    return determinedArchetypeKey;
  };

  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="bg-[#1A1A1A] p-6 md:p-10 w-full border-2 border-[#555555]">
      <div className="mb-6">
        <p className="font-pixel-bold pb-2 text-sm text-[#CCCCCC] mb-1">Pergunta {currentQuestionIndex + 1} de {quizData.questions.length}</p>
        <div className="w-full bg-[#2A2A2A] rounded-full h-2.5">
          <div className="bg-[#E3E5E7] h-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <h3 className="font-sans text-xl md:text-2xl text-white mb-6 min-h-[60px] md:min-h-[80px]">{currentQuestion.text}</h3>
      <div className="space-y-3">
        {currentQuestion.options.map(option => {
          const isSelected = currentQuestion.type === 'multiple' && answers[currentQuestion.id]?.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(currentQuestion.id, option.id)}
              className={`w-full font-sans text-left p-4 rounded-md transition-colors duration-200 border-2 
                         ${isSelected 
                           ? 'bg-[#CCCCCC] text-black border-white' 
                           : 'bg-[#2A2A2A] text-[#E3E5E7] border-[#555555] hover:bg-[#4A4A4A] hover:border-[#CCCCCC]'}`}
            >
              {currentQuestion.type === 'multiple' && (
                isSelected ? <CheckSquare size={18} className="inline mr-2" /> : <Square size={18} className="inline mr-2" />
              )}
              {option.text}
            </button>
          );
        })}
      </div>
      
      <div className="pt-8 flex justify-end items-center gap-4"> 
        {/* Botão Voltar */}
        {currentQuestionIndex > 0 && (
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            className="font-pixel-bold text-[#CCCCCC] hover:text-white transition-colors duration-200 text-sm">
              <ChevronLeft size={16} className="inline mr-1" /> Voltar
          </button>
        )}

        {/* Botão Próxima Pergunta / Ver Resultado */}
        {currentQuestion.type === 'multiple' && (
          <button
            onClick={handleNextForMultipleChoice}
            className="font-pixel-bold bg-[#CCCCCC] text-black px-6 py-3 text-md hover:bg-white transition-all duration-300 transform pixel-button">
            {currentQuestionIndex < quizData.questions.length - 1 ? "Próxima" : "Ver Resultado"} <ArrowRight size={18} className="inline ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};


// --- COMPONENTE EmailCollectionPage (Mantido como no original) ---
const EmailCollectionPage = ({ onSubmitEmail }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [whatsappDDI, setWhatsappDDI] = useState('+55');
    const [error, setError] = useState('');
    const emailInputRef = useRef(null);
    const [allocationSuggestionConsent, setAllocationSuggestionConsent] = useState('');
    const [personalComment, setPersonalComment] = useState('');
    const [selectedProvocation, setSelectedProvocation] = useState('');
    const [provocationResponse, setProvocationResponse] = useState('');

    const provocations = [
        { id: 'p1', text: "Você investe com medo ou com convicção? " },
        { id: 'p2', text: "Se você fosse gestor de um fundo, você deixaria seu 'eu atual' cuidar da sua carteira? " },
        { id: 'p3', text: "Sua estratégia de hoje resiste a 5 anos de caos? " }
    ];

    const ddiOptions = [
        { value: '+55', label: '🇧🇷 +55 (Brasil)' },
        { value: '+1', label: '🇺🇸 +1 (EUA/Canadá)' },
        { value: '+44', label: '🇬🇧 +44 (Reino Unido)' },
        { value: '+33', label: '🇫🇷 +33 (França)' },
        { value: '+49', label: '🇩🇪 +49 (Alemanha)' },
        { value: '+34', label: '🇪🇸 +34 (Espanha)' },
        { value: '+39', label: '🇮🇹 +39 (Itália)' },
        { value: '+31', label: '🇳🇱 +31 (Holanda)' },
        { value: '+46', label: '🇸🇪 +46 (Suécia)' },
        { value: '+47', label: '🇳🇴 +47 (Noruega)' },
        { value: '+351', label: '🇵🇹 +351 (Portugal)' },
        { value: '+54', label: '🇦🇷 +54 (Argentina)' },
        { value: '+56', label: '🇨🇱 +56 (Chile)' },
        { value: '+57', label: '🇨🇴 +57 (Colômbia)' },
        { value: '+58', label: '🇻🇪 +58 (Venezuela)' },
        { value: '+593', label: '🇪🇨 +593 (Equador)' },
        { value: '+51', label: '🇵🇪 +51 (Peru)' },
        { value: '+595', label: '🇵🇾 +595 (Paraguai)' },
        { value: '+598', label: '🇺🇾 +598 (Uruguai)' }
    ];

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    // Função para formatar o número do WhatsApp
    const formatWhatsApp = (value) => {
        // Remove tudo que não for número
        const numbers = value.replace(/\D/g, '');
        
        // Aplica formatação brasileira por padrão
        if (whatsappDDI === '+55') {
            if (numbers.length <= 2) return numbers;
            if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
            if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
            if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
        }
        
        // Para outros países, retorna apenas os números
        return numbers;
    };

    const handleWhatsAppChange = (e) => {
        const formatted = formatWhatsApp(e.target.value);
        setWhatsapp(formatted);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) { 
            setError('Por favor, insira seu e-mail para prosseguir.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        if (!name.trim()) {
            setError('Por favor, insira seu nome para prosseguir.');
            return;
        }
        if (!whatsapp.trim()) {
            setError('Por favor, insira seu WhatsApp para prosseguir.');
            return;
        }
        setError('');
        onSubmitEmail({
            email,
            name: name.trim(),
            whatsapp: whatsappDDI + whatsapp.replace(/\D/g, ''),
            allocationSuggestionConsent, 
            personalComment, 
            selectedProvocation: selectedProvocation ? provocations.find(p => p.id === selectedProvocation)?.text : '', 
            provocationResponse 
        });
    };

    // const handleSkip = () => {
    //     const skipData = {
    //         email: email,
    //         name: name.trim(),
    //         whatsapp: whatsappDDI + whatsapp.replace(/\D/g, ''),
    //         allocationSuggestionConsent: '',
    //         personalComment: '',
    //         selectedProvocation: '',
    //         provocationResponse: ''
    //     };
    //     if (email && !/\S+@\S+\.\S+/.test(email)) {
    //          setError('Se for pular, deixe o e-mail em branco ou insira um e-mail válido.');
    //          return;
    //     }
    //     setError('');
    //     onSkip(skipData);
    // }

    return (
        <div className="bg-[#231F20] p-6 md:p-8 rounded-lg shadow-xl max-w-xl mx-auto w-full">
            <div className="max-w-xl mx-auto text-center mb-6">
                <Mail size={48} className="mx-auto mb-4 text-[#CCCCCC]" />
                <h2 className="font-pixel-bold text-2xl md:text-3xl text-white mb-2">Quase lá!</h2>
                <p className="font-sans text-lg text-[#E3E5E7] mb-6">
                    Para receber seu diagnóstico e novidades, informe seus dados de contato. As perguntas abaixo são opcionais.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
                <div>
                    <label htmlFor="email" className="font-sans text-sm text-[#CCCCCC] mb-1 block">Seu melhor e-mail:*</label>
                    <input
                        ref={emailInputRef}
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@exemplo.com"
                        className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                    />
                    {error && <p className="text-red-400 text-sm mt-1 text-center">{error}</p>}
                </div>
                <div>
                    <label htmlFor="name" className="font-sans text-sm text-[#CCCCCC] mb-1 block">Seu nome completo:*</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="whatsapp" className="font-sans text-sm text-[#CCCCCC] mb-1 block">Seu WhatsApp:*</label>
                    <div className="flex gap-2">
                        <select
                            value={whatsappDDI}
                            onChange={(e) => setWhatsappDDI(e.target.value)}
                            className="font-sans p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none min-w-[120px]"
                        >
                            {ddiOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input
                            id="whatsapp"
                            type="tel"
                            value={whatsapp}
                            onChange={handleWhatsAppChange}
                            placeholder={whatsappDDI === '+55' ? "(11) 99999-9999" : "999999999"}
                            className="font-sans flex-1 p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                        />
                    </div>
                    <p className="font-sans text-xs text-[#A0A0A0] mt-1">
                        {whatsappDDI === '+55' ? 'Formato: (11) 99999-9999' : 'Apenas números'}
                    </p>
                </div>
                <div>
                    <label className="font-sans text-sm text-[#CCCCCC] mb-2 block">Você gostaria de receber sugestões de ajustes na sua alocação? (Opcional) </label>
                    <div className="space-y-2">
                        {[
                            { value: 'sim', label: 'Sim ' },
                            { value: 'sim_realidade', label: 'Sim, desde que respeite minha realidade ' },
                            { value: 'nao', label: 'Não ' }
                        ].map(option => (
                            <label key={option.value} className="flex items-center font-sans text-[#E3E5E7] cursor-pointer hover:text-white">
                                <input
                                    type="radio"
                                    name="allocationSuggestion"
                                    value={option.value}
                                    checked={allocationSuggestionConsent === option.value}
                                    onChange={(e) => setAllocationSuggestionConsent(e.target.value)}
                                    className="mr-2 h-4 w-4 accent-[#CCCCCC] cursor-pointer"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="personalComment" className="font-sans text-sm text-[#CCCCCC] mb-1 block">
                        Quer deixar um comentário pessoal pra tornar sua análise ainda mais certeira? (Opcional) 
                    </label>
                    <textarea
                        id="personalComment"
                        value={personalComment}
                        onChange={(e) => setPersonalComment(e.target.value)}
                        placeholder="Seu comentário aqui..."
                        rows="3"
                        className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                    />
                </div>
                <div className="p-4 border border-[#4A4A4A] rounded-md">
                    <label className="font-sans text-sm text-[#CCCCCC] mb-2 block">
                        Reflexão Opcional: Escolha uma provocação e responda com sinceridade. 
                    </label>
                    <div className="space-y-2 mb-3">
                        {provocations.map(provocation => (
                            <label key={provocation.id} className="flex items-center font-sans text-[#E3E5E7] cursor-pointer hover:text-white">
                                <input
                                    type="radio"
                                    name="selectedProvocation"
                                    value={provocation.id}
                                    checked={selectedProvocation === provocation.id}
                                    onChange={(e) => setSelectedProvocation(e.target.value)}
                                    className="mr-2 h-4 w-4 accent-[#CCCCCC] cursor-pointer"
                                />
                                {provocation.text}
                            </label>
                        ))}
                    </div>
                    {selectedProvocation && (
                        <textarea
                            id="provocationResponse"
                            value={provocationResponse}
                            onChange={(e) => setProvocationResponse(e.target.value)}
                            placeholder="Sua resposta à provocação selecionada..."
                            rows="3"
                            className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none mt-2"
                        />
                    )}
                </div>
                <div className="text-center mt-8">
                    <button
                        type="submit"
                        className="font-pixel w-full bg-[#CCCCCC] text-black px-8 py-4 text-lg hover:bg-white transition-all duration-300 transform pixel-button"
                    >
                        VER MEU DIAGNÓSTICO <ArrowRight size={20} className="inline ml-2" />
                    </button>
                </div>
            </form>
             <p className="font-sans text-xs text-[#A0A0A0] mt-8 text-center">
                Respeitamos sua privacidade. Seus dados não serão compartilhados.
            </p>
        </div>
    );
};

// --- MODIFICAÇÃO: Componente AppHeader (Menu Superior) ---
const AppHeader = () => {
    // No futuro, este estado pode vir de um contexto ou props se o menu for mais dinâmico
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Função para simular navegação ou abrir modais
    // const handleMenuAction = (action) => {
    //     console.log(`Menu Action: ${action}`);
    //     // Exemplo: if (action === 'profile') router.push('/profile');
    //     setIsMenuOpen(false); // Fecha o menu após uma ação (se for um dropdown)
    // };
    
    return (
        <header className="fixed-menu">
            <div className="menu-container">
                <a href="/" className="menu-logo">I'M NO ECONOMIST</a>
            </div>
            {/* {isMenuOpen && (
                <div className="absolute top-16 right-4 bg-[#2A2A2A] p-4 rounded-md shadow-lg md:hidden">
                    Dropdown menu items
                </div>
            )} */}
        </header>
    );
};

// Função auxiliar removida - não utilizada

const ShareComponent = ({ sessionId, archetype }) => {
  const IMAGE_WORKER_URL = "https://gerador-card-quiz-long-term-d60b.imnoeconomist-dev.workers.dev";
  
  // A URL que será de fato compartilhada nas redes sociais
  // IMPORTANTE: O ideal é que esta seja uma URL única para o resultado.
  // Por simplicidade, usaremos a URL principal do seu site. Veja a nota no final.
  const shareUrl = "https://lustrous-cranachan-172602.netlify.app/"; // URL do seu site Netlify
  
  const imageUrl = `${IMAGE_WORKER_URL}/card?session_id=${sessionId}`;
  const shareText = `Descobri meu arquétipo de investidor no quiz I'M NO ECONOMIST: ${archetype.name}. Descubra o seu também!`;

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Falha ao buscar imagem: ${response.status} ${response.statusText}`);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      // Gerar um nome de arquivo mais amigável, removendo caracteres especiais e espaços.
      const fileName = `diagnostico_imnoeconomist_${archetype.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_{2,}/g, '_')}.png`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl); // Limpar o object URL
    } catch (error) {
      console.error("Erro ao baixar a imagem:", error);
      alert("Ocorreu um erro ao tentar baixar a imagem. Por favor, tente novamente.");
    }
  };

  return (
    <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
      <h3 className="font-pixel text-xl text-white mb-4">COMPARTILHE SEU DIAGNÓSTICO</h3>
      
      {/* Exibe a imagem gerada pelo Worker 2 */}
      <img 
        src={imageUrl} 
        alt={`Card do arquétipo ${archetype.name}`} 
        className="mx-auto rounded-lg shadow-lg mb-6 border-2 border-gray-500 w-full max-w-md"
      />

      <p className="font-sans mb-4 text-[#E3E5E7]">Escolha sua plataforma preferida:</p>

      <div className="flex justify-center gap-4 mb-6">
        <TwitterShareButton url={shareUrl} title={shareText}>
          <img src={Twittericon} alt="Compartilhar no Twitter" className="w-10 h-10" />
        </TwitterShareButton>

        <WhatsappShareButton url={shareUrl} title={shareText}>
          <img src={Whatsappicon} alt="Compartilhar no Twitter" className="w-10 h-10" />
        </WhatsappShareButton>

        <LinkedinShareButton url={shareUrl} title={shareText} summary={archetype.description}>
          <img src={Linkedinicon} alt="Compartilhar no Twitter" className="w-10 h-10" />
        </LinkedinShareButton>
      </div>

      <button
        onClick={handleDownloadImage}
        className="font-pixel-bold bg-[#CCCCCC] text-black px-6 py-3 text-md hover:bg-white transition-all duration-300 transform pixel-button w-full max-w-xs mx-auto flex items-center justify-between"
      >
        <img src={Downloadicon} alt="Compartilhar no Twitter" className="w-8 h-8" />
        BAIXAR IMAGEM
      </button>
    </div>
  );
};

const ResultsPage = ({ archetype, onRestart, quizResultDataForBackend, sessionId }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  // Note que o botão só aparece se o sessionId já foi recebido.
  const shareButton = sessionId ? (
    <button 
      onClick={() => setShowShareModal(true)}
      className="font-pixel-bold bg-[#CCCCCC] text-black px-4 py-3 rounded-md text-md hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto pixel-button"
    >
      COMPARTILHAR
    </button>
  ) : (
    <button 
      disabled
      className="font-pixel-bold bg-gray-500 text-black px-4 py-3 rounded-md text-md cursor-not-allowed w-full sm:w-auto pixel-button"
    >
      COMPARTILHAR 
    </button>
  );
  
  const saasLink = "#"; // Link para o SaaS

  // Dados do perfil do usuário (exemplo, viriam do Supabase/quizResultDataForBackend)
  // No futuro, você buscaria isso do Supabase ou passaria via props de forma mais estruturada
  const userProfileData = {
    mainGoal: quizResultDataForBackend?.userProfileData?.mainGoal || "Não definido",
    investmentRange: quizResultDataForBackend?.userProfileData?.investmentRange || "Não definido",
    timeHorizon: quizResultDataForBackend?.userProfileData?.timeHorizon || "Não definido",
    maritalStatus: quizResultDataForBackend?.userProfileData?.maritalStatus || "Não definido",
  };

  return (
    <div className="bg-[#1A1A1A] p-6 md:p-10 w-full text-center border-2 border-[#555555]">
        {/* Espaço para Imagem do Arquétipo */}

        <div className="flex flex-col md:flex-row gap-8 mb-8 items-center justify-center">
          <div className="mb-8">
              <img 
                  src={archetype.image || Estag} // Usa a imagem do arquétipo ou o placeholder
                  alt={`[Imagem do arquétipo ${archetype.name}]`}
                  className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-md object-cover border-4 border-[#CCCCCC]" 
              />
          </div>
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <h1 className="font-pixel text-2xl md:text-3xl text-white mb-2">Seu Arquétipo</h1>
              <h2 className="font-pixel text-xl md:text-2xl text-[#CCCCCC]">{archetype.name}</h2>
            </div>
        </div>
        
        <p className="font-sans text-md md:text-lg text-[#E3E5E7] mb-8 text-left whitespace-pre-line bg-[#231F20] p-6 rounded-md shadow-md">{archetype.description}</p>
        
        {/* MODIFICAÇÃO: Recomendações em formato de Card */}
        <div className="text-left mb-8">
            <h3 className="font-pixel text-xl md:text-2xl text-white mb-6 text-center">Recomendações Principais para Seu Perfil:</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {archetype.recommendations && archetype.recommendations.map((rec, index) => (
                    <div key={index} className="bg-[#231F20] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                        <div>
                            <h4 className="font-pixel text-lg text-[#CCCCCC] mb-3">{rec.title}</h4>
                            <p className="font-sans text-sm text-[#E3E5E7] mb-4">{rec.text}</p>
                        </div>
                        {rec.text.includes("iamnoeconomist.substack.com") && (
                             <a 
                                href="https://iamnoeconomist.substack.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-sans text-sm text-black bg-[#CCCCCC] px-4 py-2 rounded-md hover:bg-white transition-colors duration-300 self-start mt-auto pixel-button"
                            >
                                Acessar Newsletter <ArrowRight size={16} className="inline ml-1" />
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Dados do Perfil do Usuário (exemplo de como exibir) */}
        {/* No futuro, isso pode ser uma seção mais elaborada ou integrada às "Métricas" */}
        <div className="text-left mb-8 bg-[#231F20] p-6 rounded-lg shadow-md">
            <h3 className="font-pixel text-xl text-[#CCCCCC] mb-4">Seus Objetivos e Perfil:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm">
                <p><strong>Objetivo Principal:</strong> {userProfileData.mainGoal}</p>
                <p><strong>Faixa de Investimento:</strong> {userProfileData.investmentRange}</p>
                <p><strong>Horizonte de Tempo:</strong> {userProfileData.timeHorizon}</p>
                <p><strong>Estado Civil:</strong> {userProfileData.maritalStatus}</p>
            </div>
        </div>
        
        <p className="font-sans text-sm text-[#CCCCCC] mb-6">
            Este é um resumo inicial. Um diagnóstico completo e mais detalhado estará disponível no seu dashboard personalizado.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
            {shareButton}
            <button
              onClick={onRestart}
              className="flex justify-center w-full font-pixel-bold text-[#E3E5E7] border border-[#CCCCCC] px-4 py-3 rounded-md text-md hover:bg-[#CCCCCC] hover:text-black transition-all duration-300 w-full sm:w-auto pixel-button"
            >
              REFAZER DIAGNÓSTICO <RefreshCw size={16} className="inline ml-2" />
            </button>
        </div>

        <div className="border-t border-[#4A4A4A] pt-8 mt-8">
            <Rocket size={40} className="mx-auto mb-4 text-[#CCCCCC]" />
            <h3 className="font-pixel text-2xl text-white mb-3">PREPARE-SE PARA O PRÓXIMO NÍVEL!</h3>
            <p className="font-sans text-lg text-[#E3E5E7] mb-6 max-w-xl mx-auto">
                Gostou do seu diagnóstico? Em breve, lançaremos nossa plataforma SaaS completa, com acompanhamento personalizado, ferramentas avançadas e uma comunidade exclusiva.
            </p>
            <a 
              href={saasLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel-bold bg-white text-black px-8 py-4 rounded-md text-md hover:bg-[#E3E5E7] transition-all duration-300 transform hover:scale-105 shadow-lg inline-block pixel-button"
            >
                QUERO SABER MAIS SOBRE O SAAS <ArrowRight size={20} className="inline ml-2" />
            </a>
        </div>

        <p className="font-sans text-xs text-[#A0A0A0] mt-10">
            Lembre-se: este diagnóstico é uma ferramenta para autoconhecimento. Não constitui aconselhamento de investimento profissional.
        </p>
        {showShareModal && (
        <div 
          // Fundo semi-transparente
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-2000"
          onClick={() => setShowShareModal(false)} // Fecha ao clicar fora
        >
          <div 
            // O container do modal em si
            className="w-full max-w-lg p-4"
            onClick={e => e.stopPropagation()} // Impede que o clique dentro feche o modal
          >
            <ShareComponent sessionId={sessionId} archetype={archetype} />
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para coleta de dados adicionais (após o quiz)
const AdditionalDataCollection = ({ onDataSubmitted }) => {
    const [allocationSuggestionConsent, setAllocationSuggestionConsent] = useState('');
    const [personalComment, setPersonalComment] = useState('');
    const [selectedProvocation, setSelectedProvocation] = useState('');
    const [provocationResponse, setProvocationResponse] = useState('');

    const provocations = [
        { id: 'p1', text: "Você investe com medo ou com convicção? " },
        { id: 'p2', text: "Se você fosse gestor de um fundo, você deixaria seu 'eu atual' cuidar da sua carteira? " },
        { id: 'p3', text: "Sua estratégia de hoje resiste a 5 anos de caos? " }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onDataSubmitted({
            allocationSuggestionConsent,
            personalComment,
            selectedProvocation: selectedProvocation ? provocations.find(p => p.id === selectedProvocation)?.text : '',
            provocationResponse
        });
    };

    const handleSkip = () => {
        onDataSubmitted({
            allocationSuggestionConsent: '',
            personalComment: '',
            selectedProvocation: '',
            provocationResponse: ''
        });
    };

    return (
        <div className="bg-[#231F20] p-6 md:p-8 rounded-lg shadow-xl max-w-xl mx-auto w-full">
            <div className="max-w-xl mx-auto text-center mb-6">
                <Mail size={48} className="mx-auto mb-4 text-[#CCCCCC]" />
                <h2 className="font-pixel-bold text-2xl md:text-3xl text-white mb-2">Quase lá!</h2>
                <p className="font-sans text-lg text-[#E3E5E7] mb-6">
                    Para personalizar ainda mais seu diagnóstico, você pode responder as perguntas abaixo (todas opcionais).
                </p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
                <div>
                    <label className="font-sans text-sm text-[#CCCCCC] mb-2 block">Você gostaria de receber sugestões de ajustes na sua alocação? (Opcional) </label>
                    <div className="space-y-2">
                        {[
                            { value: 'sim', label: 'Sim ' },
                            { value: 'sim_realidade', label: 'Sim, desde que respeite minha realidade ' },
                            { value: 'nao', label: 'Não ' }
                        ].map(option => (
                            <label key={option.value} className="flex items-center font-sans text-[#E3E5E7] cursor-pointer hover:text-white">
                                <input
                                    type="radio"
                                    name="allocationSuggestion"
                                    value={option.value}
                                    checked={allocationSuggestionConsent === option.value}
                                    onChange={(e) => setAllocationSuggestionConsent(e.target.value)}
                                    className="mr-2 h-4 w-4 accent-[#CCCCCC] cursor-pointer"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="personalComment" className="font-sans text-sm text-[#CCCCCC] mb-1 block">
                        Quer deixar um comentário pessoal pra tornar sua análise ainda mais certeira? (Opcional)
                    </label>
                    <textarea
                        id="personalComment"
                        value={personalComment}
                        onChange={(e) => setPersonalComment(e.target.value)}
                        placeholder="Seu comentário aqui..."
                        rows="3"
                        className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                    />
                </div>
                <div className="p-4 border border-[#4A4A4A] rounded-md">
                    <label className="font-sans text-sm text-[#CCCCCC] mb-2 block">
                        Reflexão Opcional: Escolha uma provocação e responda com sinceridade.
                    </label>
                    <div className="space-y-2 mb-3">
                        {provocations.map(provocation => (
                            <label key={provocation.id} className="flex items-center font-sans text-[#E3E5E7] cursor-pointer hover:text-white">
                                <input
                                    type="radio"
                                    name="selectedProvocation"
                                    value={provocation.id}
                                    checked={selectedProvocation === provocation.id}
                                    onChange={(e) => setSelectedProvocation(e.target.value)}
                                    className="mr-2 h-4 w-4 accent-[#CCCCCC] cursor-pointer"
                                />
                                {provocation.text}
                            </label>
                        ))}
                    </div>
                    {selectedProvocation && (
                        <textarea
                            id="provocationResponse"
                            value={provocationResponse}
                            onChange={(e) => setProvocationResponse(e.target.value)}
                            placeholder="Sua resposta à provocação selecionada..."
                            rows="3"
                            className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none mt-2"
                        />
                    )}
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        type="button"
                        onClick={handleSkip}
                        className="font-sans text-[#CCCCCC] px-6 py-3 rounded-md hover:text-white transition-colors duration-200"
                    >
                        Pular
                    </button>
                    <button
                        type="submit"
                        className="font-sans bg-[#CCCCCC] text-black px-8 py-3 rounded-md hover:bg-white transition-colors duration-200 font-semibold pixel-button"
                    >
                        VER MEU DIAGNÓSTICO
                    </button>
                </div>
            </form>
        </div>
    );
};

// Componente para coleta inicial de dados (antes do quiz)
const InitialDataCollection = ({ onDataSubmitted }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [whatsappDDI, setWhatsappDDI] = useState('+55');
    const [error, setError] = useState('');
    const emailInputRef = useRef(null);

    const ddiOptions = [
        { value: '+55', label: '🇧🇷 +55 (Brasil)' },
        { value: '+1', label: '🇺🇸 +1 (EUA/Canadá)' },
        { value: '+44', label: '🇬🇧 +44 (Reino Unido)' },
        { value: '+33', label: '🇫🇷 +33 (França)' },
        { value: '+49', label: '🇩🇪 +49 (Alemanha)' },
        { value: '+34', label: '🇪🇸 +34 (Espanha)' },
        { value: '+39', label: '🇮🇹 +39 (Itália)' },
        { value: '+31', label: '🇳🇱 +31 (Holanda)' },
        { value: '+46', label: '🇸🇪 +46 (Suécia)' },
        { value: '+47', label: '🇳🇴 +47 (Noruega)' },
        { value: '+351', label: '🇵🇹 +351 (Portugal)' },
        { value: '+54', label: '🇦🇷 +54 (Argentina)' },
        { value: '+56', label: '🇨🇱 +56 (Chile)' },
        { value: '+57', label: '🇨🇴 +57 (Colômbia)' },
        { value: '+58', label: '🇻🇪 +58 (Venezuela)' },
        { value: '+593', label: '🇪🇨 +593 (Equador)' },
        { value: '+51', label: '🇵🇪 +51 (Peru)' },
        { value: '+595', label: '🇵🇾 +595 (Paraguai)' },
        { value: '+598', label: '🇺🇾 +598 (Uruguai)' }
    ];

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    // Função para formatar o número do WhatsApp
    const formatWhatsApp = (value) => {
        const numbers = value.replace(/\D/g, '');

        if (whatsappDDI === '+55') {
            if (numbers.length <= 2) return numbers;
            if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
            if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
            if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
        }

        return numbers;
    };

    const handleWhatsAppChange = (e) => {
        const formatted = formatWhatsApp(e.target.value);
        setWhatsapp(formatted);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor, insira seu e-mail para prosseguir.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        if (!name.trim()) {
            setError('Por favor, insira seu nome para prosseguir.');
            return;
        }
        if (!whatsapp.trim()) {
            setError('Por favor, insira seu WhatsApp para prosseguir.');
            return;
        }
        setError('');
        onDataSubmitted({
            email,
            name: name.trim(),
            whatsapp: whatsappDDI + whatsapp.replace(/\D/g, '')
        });
    };

    return (
        <div className="bg-[#231F20] p-6 md:p-8 rounded-lg shadow-xl max-w-xl mx-auto w-full">
            <div className="max-w-xl mx-auto text-center mb-6">
                <HelpCircle size={48} className="mx-auto mb-4 text-[#CCCCCC]" />
                <h2 className="font-pixel-bold text-2xl md:text-3xl text-white mb-2">Antes de começar</h2>
                <p className="font-sans text-lg text-[#E3E5E7] mb-6">
                    Para recebermos seus resultados, precisamos de algumas informações básicas.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
                <div>
                    <label htmlFor="email" className="font-sans text-sm text-[#CCCCCC] mb-1 block">Seu melhor e-mail:*</label>
                    <input
                        ref={emailInputRef}
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@exemplo.com"
                        className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="font-sans text-sm text-[#CCCCCC] mb-1 block">Seu nome completo:*</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="font-sans w-full p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="whatsapp" className="font-sans text-sm text-[#CCCCCC] mb-1 block">Seu WhatsApp:*</label>
                    <div className="flex gap-2">
                        <select
                            value={whatsappDDI}
                            onChange={(e) => setWhatsappDDI(e.target.value)}
                            className="font-sans p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none min-w-[120px]"
                        >
                            {ddiOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input
                            id="whatsapp"
                            type="tel"
                            value={whatsapp}
                            onChange={handleWhatsAppChange}
                            placeholder={whatsappDDI === '+55' ? "(11) 99999-9999" : "999999999"}
                            className="font-sans flex-1 p-3 rounded-md bg-[#2A2A2A] text-white border border-[#4A4A4A] focus:ring-2 focus:ring-[#CCCCCC] outline-none"
                        />
                    </div>
                    <p className="font-sans text-xs text-[#A0A0A0] mt-1">
                        {whatsappDDI === '+55' ? 'Formato: (11) 99999-9999' : 'Apenas números'}
                    </p>
                </div>
                {error && <p className="text-red-400 text-sm mt-1 text-center">{error}</p>}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="font-sans bg-[#CCCCCC] text-black px-8 py-3 rounded-md hover:bg-white transition-colors duration-200 font-semibold pixel-button"
                    >
                        Começar Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

const QuizPageController = () => {
  const [quizState, setQuizState] = useState('initialData'); // Começar com coleta de dados
  const [initialUserData, setInitialUserData] = useState(null);
  const [resultIds, setResultIds] = useState({ submissionId: null, sessionId: null });
  const [finalArchetype, setFinalArchetype] = useState(null);
  const [quizResultDataForBackend, setQuizResultDataForBackend] = useState(null);
  const [, setIsSubmitting] = useState(false); // Feedback de loading

  // Função para lidar com dados iniciais
  const handleInitialDataSubmitted = (userData) => {
    setInitialUserData(userData);
    setQuizState('quiz');
  };

  // Função para lidar com dados adicionais
  const handleAdditionalDataSubmitted = async (additionalData) => {
    if (quizResultDataForBackend && finalArchetype) {
      // Combinar dados iniciais com dados adicionais
      const completeUserData = {
        ...initialUserData,
        ...additionalData
      };

      await sendQuizDataToCloudflare(
        quizResultDataForBackend,
        completeUserData,
        quizResultDataForBackend.userProfileData
      );
      setQuizState('results');
    }
  };

  // A URL do seu worker de dados
  const CLOUDFLARE_WORKER_ENDPOINT = "https://imnosupabase.imnoeconomist-dev.workers.dev/"; 

  // --- ALTERAÇÃO 1: Modificar a função de envio para capturar o ID ---
  const sendQuizDataToCloudflare = async (coreQuizData, followUpFormData, userProfileData) => {
    setIsSubmitting(true);
    const sessionId = crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(36).substring(2,15)}`;

    // Verificar se estamos em desenvolvimento (localhost)
    const isDevelopment = window.location.hostname === 'localhost';

    const payloadToCloudflare = {
      sessionId,
      timestamp: new Date().toISOString(),
      quizVersion: "3.2_Final_Two_Workers",
      userEmail: initialUserData?.email || followUpFormData?.email,
      quizCoreData: coreQuizData,
      followUpData: {
        allocationSuggestionConsent: followUpFormData?.allocationSuggestionConsent || '',
        personalComment: followUpFormData?.personalComment || '',
        selectedProvocation: followUpFormData?.selectedProvocation || '',
        provocationResponse: followUpFormData?.provocationResponse || '',
      },
      userProfileData: userProfileData
    };

    try {
      if (isDevelopment) {
        // Em modo de desenvolvimento, apenas logar os dados
        console.log('🔧 MODO DESENVOLVIMENTO: Dados que seriam enviados para o Cloudflare Worker:', payloadToCloudflare);

        // Simular resultado do worker
        setResultIds({
          submissionId: `dev-${sessionId}`,
          sessionId: sessionId
        });

        setIsSubmitting(false);
        return;
      }
      // Enviar para o Cloudflare Worker (mantido como estava)
      const response = await fetch(CLOUDFLARE_WORKER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(payloadToCloudflare),
      });

      if (!response.ok) {
        console.error("Erro ao enviar dados para o Cloudflare:", response.statusText, await response.text());
        throw new Error("Falha ao salvar dados.");
      }
      
      const result = await response.json();
      console.log("Dados salvos! Resposta do Worker 1:", result);
      setResultIds({
          submissionId: result.submissionId || result.id,
          sessionId: result.sessionId
      });

      // NOVO: Enviar para o webhook do n8n
      const webhookPayload = {
        numero: initialUserData?.whatsapp || followUpFormData?.whatsapp, // DDI + número formatado
        nome: initialUserData?.name || followUpFormData?.name,
        codigo_arquetipo: coreQuizData.determinedArchetypeKey, // Código do arquétipo (EXEC, PDF, etc.)
        email: initialUserData?.email || followUpFormData?.email,
        timestamp: new Date().toISOString()
      };

      if (isDevelopment) {
        console.log('🔧 MODO DESENVOLVIMENTO: Dados que seriam enviados para o webhook N8N:', webhookPayload);
      } else {
        try {
          const webhookResponse = await fetch('https://n8n.sof.to/webhook/form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookPayload),
          });

          if (webhookResponse.ok) {
            console.log("Dados enviados para o webhook n8n com sucesso!");
          } else {
            console.warn("Aviso: Falha ao enviar para o webhook n8n:", webhookResponse.statusText);
          }
        } catch (webhookError) {
          console.warn("Aviso: Erro ao enviar para o webhook n8n:", webhookError);
          // Não bloqueia o fluxo principal se o webhook falhar
        }
      }

    } catch (error) {
      console.error("Falha na requisição para o Cloudflare:", error);
      alert("Houve um erro ao salvar seu resultado. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
    
  };

  const handleQuizLogicComplete = async (archetype, quizResultData) => {
    setFinalArchetype(archetype);
    const exampleUserProfileData = {
        mainGoal: "Futuro da Família", investmentRange: "€100K-€500K",
        timeHorizon: "6-18 meses", maritalStatus: "Solteiro(a)"
    };
    setQuizResultDataForBackend({ ...quizResultData, userProfileData: exampleUserProfileData });
    // Ir para coleta de dados adicionais
    setQuizState('additionalData'); 
  };
  
  // --- ALTERAÇÃO 2: Garantir que o envio aconteça ANTES de ir para a página de resultados ---
  const handleEmailSubmittedOrSkipped = async (formDataFromEmailPage) => {
    if (quizResultDataForBackend && finalArchetype) {
        // Usamos 'await' para esperar a finalização do envio
        await sendQuizDataToCloudflare(
          quizResultDataForBackend,
          formDataFromEmailPage,
          quizResultDataForBackend.userProfileData
        );
    }
    setQuizState('results'); 
  };

  const handleRestartQuiz = () => {
    setFinalArchetype(null);
    setQuizResultDataForBackend(null);
    setResultIds({ submissionId: null, sessionId: null });
    setQuizState('initialData'); // Reiniciar na coleta de dados
  };
  
  if (quizState === 'initialData') {
    return <InitialDataCollection onDataSubmitted={handleInitialDataSubmitted} />;
  }

  if (quizState === 'quiz') {
    return <Quiz onQuizComplete={handleQuizLogicComplete} initialAnswers={{}} initialQuestionIndex={0} />;
  }

  if (quizState === 'additionalData') {
    return <AdditionalDataCollection onDataSubmitted={handleAdditionalDataSubmitted} />;
  }

  if (quizState === 'results') {
    console.log('🔍 Estado de resultados:', { finalArchetype, quizResultDataForBackend, resultIds });

    if (finalArchetype) {
      return <ResultsPage
                archetype={finalArchetype}
                onRestart={handleRestartQuiz}
                quizResultDataForBackend={quizResultDataForBackend}
                submissionId={resultIds.submissionId}
                sessionId={resultIds.sessionId}
              />;
    } else {
      return <p className="text-center text-[#CCCCCC] p-10">Processando resultados...</p>;
    }
  }

  if (quizState === 'emailCollection') {
    return <EmailCollectionPage
              onSubmitEmail={handleEmailSubmittedOrSkipped}
              onSkip={handleEmailSubmittedOrSkipped}
           />;
  }

  return <p className="text-center text-[#CCCCCC] p-10">Carregando...</p>; 
};


// --- APP MÍNIMO PARA RENDERIZAR O QUIZ ---
export default function QuizPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'tailwind-script';
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);

    script.onload = () => {
        if (typeof window.tailwind !== 'undefined') {
            window.tailwind.config = {
                theme: {
                    extend: {
                        fontFamily: {
                            'pixel': ['"Press Start 2P"', 'cursive'],
                            'sans': ['Inter', 'sans-serif'],
                        },
                        colors: { // Adicionando cores personalizadas se necessário
                            'brand-dark': '#1A1A1A',
                            'brand-gray': '#231F20',
                            'brand-lightgray': '#2A2A2A',
                            'brand-accent': '#CCCCCC',
                            'brand-text': '#E3E5E7',
                        }
                    },
                },
            };
        }
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppHeader />
      <QuizPageController />
    </>
  );
}
