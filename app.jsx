/* Tecnificación Barquero — interacciones + Tweaks */

// ---- nav scroll state ----
(function () {
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---- reveal on scroll ----
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
})();

// ---- form submit ----
(function () {
  const form = document.getElementById('reserveForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.classList.add('sent');
  });
})();

// ---- Tweaks ----
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direccion": "editorial",
  "acento": "#c8a24b",
  "display": "Saira Condensed"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.setAttribute('data-dir', t.direccion);
  }, [t.direccion]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.acento);
    document.documentElement.style.setProperty('--accent-ink', '#0a0a0a');
  }, [t.acento]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--display', `"${t.display}", "Archivo", sans-serif`);
  }, [t.display]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Dirección" />
      <TweakRadio
        label="Estilo de la landing"
        value={t.direccion}
        options={[
          { value: 'editorial', label: 'Editorial' },
          { value: 'cinematico', label: 'Cinemático' },
          { value: 'dossier', label: 'Dossier' },
        ]}
        onChange={(v) => setTweak('direccion', v)}
      />

      <TweakSection label="Acento" />
      <TweakColor
        label="Color de acento"
        value={t.acento}
        options={['#c8a24b', '#f2efe8', '#2fb66b', '#e8482b', '#3d7bf0']}
        onChange={(v) => setTweak('acento', v)}
      />

      <TweakSection label="Tipografía" />
      <TweakSelect
        label="Titulares"
        value={t.display}
        options={['Saira Condensed', 'Oswald', 'Anton', 'Archivo']}
        onChange={(v) => setTweak('display', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
