import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, ArrowRight, RefreshCw, ChevronLeft, FileText, Rocket, Mail, CheckSquare, Square, Menu, UserCircle, Star, Settings, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
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
      text: "Como você vê o momento atual da economia brasileira (abril 2025)? ",
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
      text: "Em qual faixa de idade você se encontra ou qual geração melhor te representa (considerando o ano de 2025)? ",
      type: 'single',
      options: [
        { id: "a", text: "Geração Z (nascidos a partir de 1997, com até ~28 anos em 2025)", points: { estagiario_do_proprio_dinheiro: 1, socio_da_euforia: 1, visionario_que_nao_viu_o_boletim: 1, refem_do_pix:1 } },
        { id: "b", text: "Millennials / Geração Y (nascidos entre 1981-1996, com ~29 a 44 anos em 2025)", points: { entusiasta_exausto:1, forasteiro_financeiro: 1, curador_videos_youtube:1, executor_sem_causa:1 } },
        { id: "c", text: "Geração X (nascidos entre 1965-1980, com ~45 a 60 anos em 2025)", points: { forasteiro_financeiro: 2, filho_do_trauma: 1, colecionador_de_pdf: 1, conservador_da_renda_fixa:1 } },
        { id: "d", text: "Baby Boomers ou mais velhos (nascidos antes de 1965, com mais de 60 anos em 2025)", points: { filho_do_trauma: 3, conservador_da_renda_fixa: 2 } },
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
  ],
};

// --- COMPONENTE QUIZ (Mantido como no original) ---
const Quiz = ({ onQuizComplete, initialAnswers, initialQuestionIndex = 0 }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
  const [answers, setAnswers] = useState(initialAnswers || {});
  const [startTime, setStartTime] = useState(Date.now());
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
              if (scores.hasOwnProperty(archetypeKey)) {
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
            if (scores.hasOwnProperty(archetypeKey)) {
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
const EmailCollectionPage = ({ onSubmitEmail, onSkip }) => {
    const [email, setEmail] = useState('');
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

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

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
        setError('');
        onSubmitEmail({
            email,
            allocationSuggestionConsent, 
            personalComment, 
            selectedProvocation: selectedProvocation ? provocations.find(p => p.id === selectedProvocation)?.text : '', 
            provocationResponse 
        });
    };
    
    const handleSkip = () => {
        const skipData = {
            email: email, 
            allocationSuggestionConsent: '',
            personalComment: '',
            selectedProvocation: '',
            provocationResponse: ''
        };
        if (email && !/\S+@\S+\.\S+/.test(email)) {
             setError('Se for pular, deixe o e-mail em branco ou insira um e-mail válido.');
             return;
        }
        setError('');
        onSkip(skipData);
    }

    return (
        <div className="bg-[#231F20] p-6 md:p-8 rounded-lg shadow-xl max-w-xl mx-auto w-full">
            <div className="max-w-xl mx-auto text-center mb-6">
                <Mail size={48} className="mx-auto mb-4 text-[#CCCCCC]" />
                <h2 className="font-pixel-bold text-2xl md:text-3xl text-white mb-2">Quase lá!</h2>
                <p className="font-sans text-lg text-[#E3E5E7] mb-6">
                    Para receber seu diagnóstico e novidades, informe seu e-mail. As perguntas abaixo são opcionais.
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
                Respeitamos sua privacidade. Seu e-mail não será compartilhado.
            </p>
        </div>
    );
};

// --- MODIFICAÇÃO: Componente AppHeader (Menu Superior) ---
const AppHeader = () => {
    // No futuro, este estado pode vir de um contexto ou props se o menu for mais dinâmico
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Função para simular navegação ou abrir modais
    const handleMenuAction = (action) => {
        console.log(`Menu Action: ${action}`);
        // Exemplo: if (action === 'profile') router.push('/profile');
        setIsMenuOpen(false); // Fecha o menu após uma ação (se for um dropdown)
    };
    
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

// Função auxiliar para converter uma string SVG em um Blob PNG
const convertSvgToPngBlob = (svgString, targetWidth, targetHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Cria um Data URL para o SVG para que possa ser usado como src da imagem
    // Isso também ajuda a lidar com SVGs que podem ter referências externas ou estilos complexos
    // se o SVG for bem formado e auto-contido.
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      URL.revokeObjectURL(url); // Libera o URL do objeto SVG após o carregamento

      const canvas = document.createElement('canvas');
      // Define as dimensões do canvas. Idealmente, use as dimensões pretendidas para o card.
      // O card do diagnóstico geralmente tem dimensões como 1200x630 (padrão Open Graph)
      canvas.width = targetWidth || img.naturalWidth || 1200;
      canvas.height = targetHeight || img.naturalHeight || 630;

      const ctx = canvas.getContext('2d');
      // Preenche o fundo com branco se o SVG puder ter transparência e você quiser um fundo opaco
      // ctx.fillStyle = '#FFFFFF';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((pngBlob) => {
        if (pngBlob) {
          resolve(pngBlob);
        } else {
          reject(new Error('Falha ao converter canvas para Blob PNG.'));
        }
      }, 'image/png');
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(url);
      console.error("Erro ao carregar SVG na tag <img>:", error);
      reject(new Error('Erro ao carregar SVG para conversão. O SVG pode estar malformado ou conter erros.'));
    };

    img.src = url;
  });
};

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
  const handleDownloadPdf = () => {
    console.log(`Simulação de Download do PDF para o perfil: ${archetype.name}`);
    const modal = document.createElement('div');
    modal.style.position = 'fixed'; modal.style.left = '0'; modal.style.top = '0';
    modal.style.width = '100%'; modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)'; modal.style.display = 'flex';
    modal.style.justifyContent = 'center'; modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    modal.innerHTML = `
      <div style="background: #231F20; color: #E3E5E7; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2); max-width: 90%; width: 300px;">
        <p style="font-size: 1.1em;">Simulação de Download do PDF para:</p>
        <p style="font-family: 'Press Start 2P', cursive; color: #CCCCCC; font-size: 1.2em; margin: 10px 0;">${archetype.name}</p>
        <p style="font-size: 0.8em;">(Esta funcionalidade seria implementada no servidor)</p>
        <button id="closeModalBtn" style="margin-top: 20px; padding: 10px 18px; background: #CCCCCC; color: black; border: none; border-radius: 5px; cursor: pointer; font-family: 'Press Start 2P', cursive; font-size: 0.8em;">Fechar</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeModalBtn').onclick = () => {
      document.body.removeChild(modal);
    };
  };

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
                  src={archetype.image || testeImage} // Usa a imagem do arquétipo ou o placeholder
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
            <button 
              onClick={handleDownloadPdf}
              className="font-pixel-bold bg-[#CCCCCC] text-black px-4 py-3 rounded-md text-md hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto pixel-button"
            >
              BAIXAR DIAGNÓSTICO (PDF)
            </button>
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

const QuizPageController = () => {
  const [quizState, setQuizState] = useState('quiz'); // MODIFICAÇÃO: Iniciar diretamente no quiz
  const [resultIds, setResultIds] = useState({ submissionId: null, sessionId: null });
  const [finalArchetype, setFinalArchetype] = useState(null);
  const [quizResultDataForBackend, setQuizResultDataForBackend] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Feedback de loading

  // A URL do seu worker de dados
  const CLOUDFLARE_WORKER_ENDPOINT = "https://imnosupabase.imnoeconomist-dev.workers.dev/"; 

  // --- ALTERAÇÃO 1: Modificar a função de envio para capturar o ID ---
  const sendQuizDataToCloudflare = async (coreQuizData, followUpFormData, userProfileData) => {
    setIsSubmitting(true);
    const sessionId = crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(36).substring(2,15)}`;
    
    const payloadToCloudflare = {
      sessionId,
      timestamp: new Date().toISOString(),
      quizVersion: "3.2_Final_Two_Workers",
      userEmail: followUpFormData.email, 
      quizCoreData: coreQuizData, 
      followUpData: { 
        allocationSuggestionConsent: followUpFormData.allocationSuggestionConsent,
        personalComment: followUpFormData.personalComment,
        selectedProvocation: followUpFormData.selectedProvocation,
        provocationResponse: followUpFormData.provocationResponse,
      },
      userProfileData: userProfileData
    };
    
    try {
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

    } catch (error) {
      console.error("Falha na requisição para o Cloudflare:", error);
      alert("Houve um erro ao salvar seu resultado. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
    
  };

  const handleQuizLogicComplete = (archetype, quizResultData) => {
    setFinalArchetype(archetype);
    const exampleUserProfileData = {
        mainGoal: "Futuro da Família", investmentRange: "€100K-€500K",
        timeHorizon: "6-18 meses", maritalStatus: "Solteiro(a)"
    };
    setQuizResultDataForBackend({ ...quizResultData, userProfileData: exampleUserProfileData });
    setQuizState('emailCollection'); 
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
    setQuizState('quiz'); // MODIFICAÇÃO: Reiniciar diretamente para o quiz
  };
  
  if (quizState === 'results' && finalArchetype) { 
      return <ResultsPage 
                archetype={finalArchetype} 
                onRestart={handleRestartQuiz} 
                quizResultDataForBackend={quizResultDataForBackend}
                submissionId={resultIds.submissionId}
                sessionId={resultIds.sessionId} // Passando o novo ID
            />; 
  }

  if (quizState === 'quiz') { 
    return <Quiz onQuizComplete={handleQuizLogicComplete} initialAnswers={{}} initialQuestionIndex={0} />; 
  }
  if (quizState === 'emailCollection') {
    return <EmailCollectionPage 
              onSubmitEmail={handleEmailSubmittedOrSkipped} 
              onSkip={handleEmailSubmittedOrSkipped}
           />;
  }
  if (quizState === 'results' && finalArchetype) { 
    return <ResultsPage archetype={finalArchetype} onRestart={handleRestartQuiz} quizResultDataForBackend={quizResultDataForBackend} />; 
  }
  
  return <p className="text-center text-[#CCCCCC] p-10">Carregando...</p>; 
};


// --- APP MÍNIMO PARA RENDERIZAR O QUIZ ---
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // Inicializa allowQuizRender baseado na presença imediata do estado da rota.
  // Isso pode ajudar a evitar um piscar inicial se o estado já estiver disponível.
  const [allowQuizRender, setAllowQuizRender] = useState(!!location.state?.fromHomepage);

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'tailwind-script';
    script.src = 'https://cdn.tailwindcss.com'; 
    document.head.appendChild(script);
    
    script.onload = () => {
        if (typeof tailwind !== 'undefined') {
            tailwind.config = {
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

  // Efeito para verificar o acesso e redirecionar se necessário
  useEffect(() => {
    if (location.state?.fromHomepage) {
      setAllowQuizRender(true); // Permite a renderização do quiz
    } else {
      // Se não veio da homepage e está tentando acessar /quiz diretamente
      if (location.pathname === '/quiz') {
        navigate('/', { replace: true }); // Redireciona para a homepage
      }
      // Se por acaso este componente for renderizado em outra rota sem o estado,
      // ou se o estado for perdido, impede a renderização do quiz.
      setAllowQuizRender(false);
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <GlobalStyles />
      <AppHeader /> {/* MODIFICAÇÃO: Adicionando o menu superior aqui */}
      <div id="root"> {/* Este div é estilizado globalmente para o padding do header */}
        {location.pathname === '/quiz' ? ( // Renderiza conteúdo específico do quiz apenas na rota /quiz
          allowQuizRender ? (
            <QuizPageController />
          ) : (
            // Mostra uma mensagem de carregamento/verificação enquanto a lógica de acesso é processada
            // Se o redirecionamento ocorrer, este conteúdo não será exibido por muito tempo.
            <p className="text-center text-[#CCCCCC] p-10">Verificando acesso ao quiz...</p>
          )
        ) : null /* Em rotas diferentes de /quiz, este componente App não deve renderizar o QuizPageController */}
      </div>
    </>
  );
}
