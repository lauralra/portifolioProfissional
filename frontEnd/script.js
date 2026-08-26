// 1. Criação das estrelas no fundo
function criarEstrelas(quantidade = 500) {
  const container = document.getElementById('starsContainer');
  if (!container) return;

  for (let i = 0; i < quantidade; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const tamanho = Math.random() * 2 + 1;
    const duracao = Math.random() * 2.5 + 1.5;
    const atraso = Math.random() * 3;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${tamanho}px`;
    star.style.height = `${tamanho}px`;
    star.style.animationDuration = `${duracao}s`;
    star.style.animationDelay = `${atraso}s`;

    container.appendChild(star);
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
  console.log('scroll configurado')
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

// Executa todas as funções assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
  criarEstrelas(500);
  configurarScrollSuave();
  atualizarScrollIcon();
});