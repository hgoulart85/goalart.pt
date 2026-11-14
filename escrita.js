/* GOALart · título escrito progressivamente, com cursor (respeita movimento reduzido) */
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  [].slice.call(document.querySelectorAll('[data-escrever]')).forEach(function(el){
    var texto = el.textContent, h = el.closest('h1') || el;
    if (!h.getAttribute('aria-label')) h.setAttribute('aria-label', h.textContent.replace(/\s+/g,' ').trim());
    el.textContent = ''; el.setAttribute('aria-hidden','true');
    var letras = texto.split('').map(function(c){ var s=document.createElement('span'); s.className='ch'; s.textContent=c; el.appendChild(s); return s; });
    var cursor = document.createElement('span'); cursor.className='cursor'; cursor.setAttribute('aria-hidden','true');
    el.classList.add('a-escrever'); el.setAttribute('data-feito','1');
    var i = 0;
    function passo(){
      if (i < letras.length) {
        letras[i].classList.add('on'); letras[i].parentNode.insertBefore(cursor, letras[i].nextSibling);
        var c = letras[i].textContent; i++;
        setTimeout(passo, /[,.?]/.test(c) ? 260 : 42 + Math.random()*30);
      } else {
        setTimeout(function(){ cursor.classList.add('fim'); setTimeout(function(){ cursor.remove(); el.classList.remove('a-escrever'); }, 600); }, 900);
      }
    }
    setTimeout(passo, parseInt(el.getAttribute('data-escrever'),10) || 250);
  });
})();
