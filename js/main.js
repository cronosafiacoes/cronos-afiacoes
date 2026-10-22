/* ============================================
   Cronos Afiações — JavaScript Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Hamburger Menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Header Scroll Effect ---------- */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var resp = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('ativo');

      document.querySelectorAll('.faq-item').forEach(function (i) {
        if (i !== item) {
          i.classList.remove('ativo');
          i.querySelector('.faq-a').style.maxHeight = null;
          i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('ativo');
        resp.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('ativo');
        resp.style.maxHeight = resp.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Active Nav Link ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Contact Form → WhatsApp ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome = document.getElementById('nome').value.trim();
      var telefone = document.getElementById('telefone').value.trim();
      var bairro = document.getElementById('bairro') ? document.getElementById('bairro').value.trim() : '';
      var item = document.getElementById('item') ? document.getElementById('item').value : '';
      var qtd = document.getElementById('qtd') ? document.getElementById('qtd').value : '';
      var mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !telefone || !mensagem) {
        alert('Por favor, preencha nome, telefone e mensagem.');
        return;
      }

      var texto = 'Olá! Vim pelo site da Cronos Afiações.';
      texto += '\n\n*Nome:* ' + nome;
      texto += '\n*Telefone:* ' + telefone;
      if (bairro) texto += '\n*Bairro:* ' + bairro;
      if (item) texto += '\n*Item:* ' + item;
      if (qtd) texto += '\n*Quantidade:* ' + qtd;
      texto += '\n*Mensagem:* ' + mensagem;

      window.open('https://wa.me/5531989390637?text=' + encodeURIComponent(texto), '_blank');
      contactForm.reset();
    });
  }

  /* ---------- Ano atual ---------- */
  var anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

});
