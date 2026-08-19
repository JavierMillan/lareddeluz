export function NetworkFinale() {
  return (
    <footer className="rdl-finale">
      <div className="rdl-finale__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="rdl-coordinate">04 · La red sigue creciendo</p>
      <h2>
        Tu luz no llega aquí
        <span>para perderse entre otras.</span>
      </h2>
      <p className="rdl-finale__copy">
        Llega para encontrar conexiones, crear algo compartido y encender nuevas
        constelaciones.
      </p>
      <a className="rdl-finale__cta" href="#constelaciones">
        Encuentra tu constelación <span aria-hidden="true">↑</span>
      </a>
      <div className="rdl-finale__foot">
        <span>La Red de Luz</span>
        <span>Un mundo de ecosistemas para crecer.</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
