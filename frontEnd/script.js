// 1. Criação das estrelas no fundo
const estrelas = []; // guarda { el, xPercent, yPercent } para o efeito de atração do mouse

function criarEstrelas(quantidade = 500) {
  const container = document.getElementById('starsContainer');
  if (!container) return;

  for (let i = 0; i < quantidade; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const tamanho = Math.random() * 2 + 1.5;
    const duracao = Math.random() * 2.5 + 1.5;
    const atraso = Math.random() * 3;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${tamanho}px`;
    star.style.height = `${tamanho}px`;
    star.style.animationDuration = `${duracao}s`;
    star.style.animationDelay = `${atraso}s`;

    container.appendChild(star);
    estrelas.push({ el: star, xPercent: x, yPercent: y });
  }
}

// 1.1 Faz as estrelas brilharem e serem atraídas pelo cursor do mouse
function configurarInteracaoEstrelas() {
  if (!estrelas.length) return;

  const RAIO = 140; // distância (px) em que a estrela reage ao cursor
  const FORCA_ATRACAO = 0.35; // o quanto a estrela "anda" na direção do cursor

  let mouseX = -9999;
  let mouseY = -9999;
  let precisaAtualizar = false;

  function atualizarEstrelas() {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;

    for (const estrela of estrelas) {
      const baseX = (estrela.xPercent / 100) * larguraTela;
      const baseY = (estrela.yPercent / 100) * alturaTela;
      const dx = mouseX - baseX;
      const dy = mouseY - baseY;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < RAIO) {
        const forca = 1 - distancia / RAIO;
        const tx = dx * forca * FORCA_ATRACAO;
        const ty = dy * forca * FORCA_ATRACAO;

        estrela.el.style.setProperty('--tx', `${tx}px`);
        estrela.el.style.setProperty('--ty', `${ty}px`);
        estrela.el.style.setProperty('--s', `${1 + forca * 1.1}`);
        estrela.el.classList.add('star--aceso');
      } else if (estrela.el.classList.contains('star--aceso')) {
        estrela.el.style.removeProperty('--tx');
        estrela.el.style.removeProperty('--ty');
        estrela.el.style.removeProperty('--s');
        estrela.el.classList.remove('star--aceso');
      }
    }

    precisaAtualizar = false;
  }

  function agendarAtualizacao() {
    if (!precisaAtualizar) {
      precisaAtualizar = true;
      requestAnimationFrame(atualizarEstrelas);
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    agendarAtualizacao();
  });

  window.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
    agendarAtualizacao();
  });
}

// 1.2 Traduções (PT/EN)
const TRADUCOES = {
  pt: {
    navSobreMim: 'Sobre Mim',
    navHabilidades: 'Habilidades',
    navProjetos: 'Projetos',
    navCertificados: 'Certificados',
    navExperiencias: 'Experiências',
    navContato: 'Contato',

    introTitulo: 'Bem-vindo(a) ao meu portfólio',
    introSubtitulo: 'Escolha a constelação que mais combina com você:',
    pularIntro: 'só quero dar uma olhada',

    perfilRecrutadorNome: 'Recrutador(a)',
    perfilRecrutadorLegenda: 'Experiências, projetos e certificados em destaque',
    perfilRecrutadorAria: 'Ver portfólio como Recrutador(a)',

    perfilDesenvolvedorNome: 'Desenvolvedor(a)',
    perfilDesenvolvedorLegenda: 'Projetos e habilidades técnicas em primeiro lugar',
    perfilDesenvolvedorAria: 'Ver portfólio como Desenvolvedor(a)',

    perfilAcademicoNome: 'Acadêmico(a)',
    perfilAcademicoLegenda: 'Formação, certificados e experiências em destaque',
    perfilAcademicoAria: 'Ver portfólio como Acadêmico(a)',

    badgePerfilPrefixo: 'Perfil',
    badgeTrocar: 'trocar',
    badgeSemPerfil: 'Ver por perfil',

    sobreMimCurso: 'Engenharia de Software - Puc Minas',
    sobreMimPeriodo: '4º período',
    sobreMimIdade: '19 anos',

    habilidadesTitulo: 'Habilidades',
    projetosTitulo: 'Projetos',
    certificadosTitulo: 'Certificados',
    experienciasTitulo: 'Experiências',
    contatoTitulo: 'Contato',
    contatoTexto: 'Quer trocar uma ideia, propor um projeto ou apenas dizer oi? Me chama por um dos canais abaixo.'
  },
  en: {
    navSobreMim: 'About Me',
    navHabilidades: 'Skills',
    navProjetos: 'Projects',
    navCertificados: 'Certificates',
    navExperiencias: 'Experience',
    navContato: 'Contact',

    introTitulo: 'Welcome to my portfolio',
    introSubtitulo: 'Choose the constellation that matches you best:',
    pularIntro: 'just want to take a look',

    perfilRecrutadorNome: 'Recruiter',
    perfilRecrutadorLegenda: 'Experience, projects and certificates highlighted',
    perfilRecrutadorAria: 'View portfolio as Recruiter',

    perfilDesenvolvedorNome: 'Developer',
    perfilDesenvolvedorLegenda: 'Projects and technical skills first',
    perfilDesenvolvedorAria: 'View portfolio as Developer',

    perfilAcademicoNome: 'Academic',
    perfilAcademicoLegenda: 'Education, certificates and experience highlighted',
    perfilAcademicoAria: 'View portfolio as Academic',

    badgePerfilPrefixo: 'Profile',
    badgeTrocar: 'change',
    badgeSemPerfil: 'View by profile',

    sobreMimCurso: 'Software Engineering - PUC Minas',
    sobreMimPeriodo: '4th semester',
    sobreMimIdade: '19 years old',

    habilidadesTitulo: 'Skills',
    projetosTitulo: 'Projects',
    certificadosTitulo: 'Certificates',
    experienciasTitulo: 'Experience',
    contatoTitulo: 'Contact',
    contatoTexto: "Want to talk, propose a project, or just say hi? Reach me through the channel below."
  }
};
const CHAVE_IDIOMA = 'idiomaVisitante';
let idiomaAtual = 'pt';

function t(chave) {
  return (TRADUCOES[idiomaAtual] && TRADUCOES[idiomaAtual][chave]) || chave;
}

function aplicarIdioma(idioma) {
  idiomaAtual = TRADUCOES[idioma] ? idioma : 'pt';
  document.documentElement.lang = idiomaAtual === 'en' ? 'en' : 'pt-BR';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });

  document.querySelectorAll('.idiomaBtn').forEach((btn) => {
    btn.classList.toggle('ativo', btn.dataset.lang === idiomaAtual);
  });

  atualizarBadgePerfil();
}

function configurarIdioma() {
  document.querySelectorAll('.idiomaBtn').forEach((botao) => {
    botao.addEventListener('click', () => {
      localStorage.setItem(CHAVE_IDIOMA, botao.dataset.lang);
      aplicarIdioma(botao.dataset.lang);
    });
  });

  const idiomaSalvo = localStorage.getItem(CHAVE_IDIOMA);
  aplicarIdioma(idiomaSalvo === 'en' ? 'en' : 'pt');
}

// 1.3 Tela inicial: pergunta o perfil do visitante e reorganiza o conteúdo
const NOME_CHAVE_PERFIL = {
  recrutador: 'perfilRecrutadorNome',
  desenvolvedor: 'perfilDesenvolvedorNome',
  academico: 'perfilAcademicoNome'
};
const CHAVE_PERFIL = 'perfilVisitante';

let perfilAtual = null;
let decisaoTomada = false;

const QUOTE_PADRAO = {
  texto: `"If you can't do it, practice until you can"`,
  autor: '— Yuzuru Hanyu'
};
const QUOTES_POR_PERFIL = {
  academico: {
    texto: `"What's there to lose? Every second there's something you're winning"`,
    autor: '— Alysa Liu'
  }
};

function atualizarQuote() {
  const quoteTexto = document.getElementById('quoteTexto');
  const quoteAutor = document.getElementById('quoteAutor');
  if (!quoteTexto || !quoteAutor) return;

  const quote = (perfilAtual && QUOTES_POR_PERFIL[perfilAtual]) || QUOTE_PADRAO;
  quoteTexto.textContent = quote.texto;
  quoteAutor.textContent = quote.autor;
  quoteAutor.style.display = quote.autor ? '' : 'none';
}

function atualizarBadgePerfil() {
  const badge = document.getElementById('perfilBadge');
  if (!badge) return;

  if (!decisaoTomada) {
    badge.textContent = '';
    badge.classList.remove('visivel');
    return;
  }

  if (perfilAtual && NOME_CHAVE_PERFIL[perfilAtual]) {
    badge.textContent = `${t('badgePerfilPrefixo')}: ${t(NOME_CHAVE_PERFIL[perfilAtual])} · ${t('badgeTrocar')}`;
  } else {
    badge.textContent = t('badgeSemPerfil');
  }
  badge.classList.add('visivel');
}

function aplicarPerfil(perfil) {
  perfilAtual = perfil && NOME_CHAVE_PERFIL[perfil] ? perfil : null;
  decisaoTomada = true;

  if (perfilAtual) {
    document.body.setAttribute('data-perfil', perfilAtual);
  } else {
    document.body.removeAttribute('data-perfil');
  }

  atualizarBadgePerfil();
  atualizarQuote();
}

function esconderIntro() {
  const overlay = document.getElementById('introOverlay');
  if (overlay) overlay.classList.add('escondido');
}

function mostrarIntro() {
  const overlay = document.getElementById('introOverlay');
  if (overlay) overlay.classList.remove('escondido');
}

function configurarSelecaoPerfil() {
  const overlay = document.getElementById('introOverlay');
  const botoesPerfil = document.querySelectorAll('.constelacaoBtn');
  const botaoPular = document.getElementById('pularIntro');
  const badge = document.getElementById('perfilBadge');
  if (!overlay) return;

  botoesPerfil.forEach((botao) => {
    botao.addEventListener('click', () => {
      const perfil = botao.dataset.perfil;
      localStorage.setItem(CHAVE_PERFIL, perfil);
      aplicarPerfil(perfil);
      esconderIntro();
    });
  });

  // "só quero dar uma olhada" também guarda a decisão, mas deixa o badge
  // disponível para voltar e escolher um perfil, igual acontece com os outros.
  if (botaoPular) {
    botaoPular.addEventListener('click', () => {
      localStorage.setItem(CHAVE_PERFIL, 'nenhum');
      aplicarPerfil(null);
      esconderIntro();
    });
  }

  if (badge) {
    badge.addEventListener('click', mostrarIntro);
  }

  // O site sempre abre na tela de escolha de perfil; o perfil salvo só é
  // reaplicado ao conteúdo (para o caso de o visitante pular a escolha de novo),
  // sem pular a tela automaticamente.
  const perfilSalvo = localStorage.getItem(CHAVE_PERFIL);
  if (perfilSalvo === 'nenhum') {
    aplicarPerfil(null);
  } else if (perfilSalvo && NOME_CHAVE_PERFIL[perfilSalvo]) {
    aplicarPerfil(perfilSalvo);
  }
}

// 2. Scroll suave ao clicar nos botões do cabeçalho
function configurarScrollSuave() {
  const links = {
    sobreMim: 'sobreMimPag',
    habilidades: 'habilidadesPag',
    projetos: 'projetosPag',
    certificados: 'certificadosPag',
    experiencias: 'experienciasPag',
    contato: 'contatoPag'
  };

  Object.entries(links).forEach(([btnId, secaoId]) => {
    const botao = document.getElementById(btnId);
    const secao = document.getElementById(secaoId);

    if (botao && secao) {
      botao.addEventListener('click', (e) => {
        e.preventDefault();
        secao.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  });
}

// 3. Move o ícone (✯) ao longo da linha conforme a rolagem da página
function atualizarScrollIcon() {
  const icon = document.querySelector('.sideBar .icon');
  if (!icon) return;

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const progresso = (window.scrollY / totalScroll) * 100;
      icon.style.top = `${progresso}%`;
      icon.style.transform = `translateY(-${progresso}%)`;
    }
  });
}

// 4. Permite arrastar o ícone (✯) para controlar o scroll da página diretamente
function configurarArrastoScrollIcon() {
  const linha = document.querySelector('.sideBar .line');
  const icon = document.querySelector('.sideBar .icon');
  if (!linha || !icon) return;

  let arrastando = false;

  function moverParaY(clientY) {
    const rect = linha.getBoundingClientRect();
    const progresso = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, progresso * totalScroll);
  }

  icon.addEventListener('mousedown', (e) => {
    arrastando = true;
    icon.classList.add('arrastando');
    moverParaY(e.clientY);
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!arrastando) return;
    moverParaY(e.clientY);
  });

  window.addEventListener('mouseup', () => {
    if (!arrastando) return;
    arrastando = false;
    icon.classList.remove('arrastando');
  });
}

// Executa todas as funções assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
  criarEstrelas(500);
  configurarInteracaoEstrelas();
  configurarIdioma();
  configurarSelecaoPerfil();
  configurarScrollSuave();
  atualizarScrollIcon();
  configurarArrastoScrollIcon();
});