export function SiteFooter() {
  const year = new Date().getFullYear();
  return <footer className="site-footer">Copyright Pixell River Financial {year}.</footer>;
}
