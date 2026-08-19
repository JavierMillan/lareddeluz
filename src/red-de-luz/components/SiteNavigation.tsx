export function SiteNavigation() {
  return (
    <header className="rdl-nav">
      <a className="rdl-nav__brand" href="#cielo" aria-label="La Red de Luz, inicio">
        <img data-testid="brand-logo" src="/assets/logo.png" alt="" width="42" height="42" />
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
