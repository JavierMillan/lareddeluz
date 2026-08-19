export function SiteNavigation() {
  return (
    <header className="rdl-nav">
      <a className="rdl-nav__brand" href="#cielo" aria-label="La Red de Luz, inicio">
        <span className="rdl-nav__mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>La Red de Luz</span>
      </a>

      <nav aria-label="Navegación principal">
        <a href="#constelaciones">Constelaciones</a>
        <a className="rdl-nav__cta" href="#constelaciones">
          Explorar el cielo
        </a>
      </nav>
    </header>
  );
}
