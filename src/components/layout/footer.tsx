export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Living Gold Interiors. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
