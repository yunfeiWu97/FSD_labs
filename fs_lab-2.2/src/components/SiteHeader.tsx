export function SiteHeader() {
  return (
    <header className="site-header">
      <a href="#" className="logo-link" aria-label="Pixell River Financial">
        <img className="logo" src="/pixell-river-logo.svg" alt="Pixell River Financial logo" />
      </a>

      <div className="header-right">
        <h1>Pixell River Employee Directory</h1>
        <p className="greeting">Welcome! Browse employees by department.</p>
      </div>
    </header>
  );
}
