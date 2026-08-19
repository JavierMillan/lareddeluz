export function NetworkFinale() {
  return (
    <footer className="rdl-finale">
      <div className="rdl-finale__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="rdl-coordinate">06 · Tu umbral</p>
      <h2>
        Empezaste como una luz suelta.
        <span>Ya no tienes que serlo.</span>
      </h2>
      <p className="rdl-finale__copy">
        No prometemos milagros. Prometemos movimiento, estructura y gente que rema
        hacia el mismo lado.
      </p>
      <a className="rdl-finale__cta" href="https://chat.whatsapp.com/LQwZxtrJSmNECZEyIwO9az" target="_blank" rel="noopener">
        Entrar al grupo de avisos <span aria-hidden="true">↗</span>
      </a>
      <p className="rdl-finale__note">Gratis · avisos y nuevas constelaciones · sin ruido</p>
      <div className="rdl-finale__foot">
        <span>La Red de Luz</span>
        <span>Un mundo de ecosistemas para crecer.</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
