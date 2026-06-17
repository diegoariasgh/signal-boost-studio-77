import signalWorksLogo from "@/assets/signalworks-logo-new.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 items-start mb-12">
            <div>
              <img
                src={signalWorksLogo}
                alt="Signal Works"
                width="200"
                height="40"
                loading="lazy"
                className="h-9 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Boutique advisory for funds, founders, and the institutions backing them — across Africa, the GCC, and Europe.
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Connect —</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/company/signalworksxyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 hover:text-electric signal-transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-foreground/80 hover:text-electric signal-transition">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Navigate —</p>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-foreground/80 hover:text-electric signal-transition">About</a>
                </li>
                <li>
                  <a href="#services" className="text-foreground/80 hover:text-electric signal-transition">Services</a>
                </li>
                <li>
                  <a href="#testimonials" className="text-foreground/80 hover:text-electric signal-transition">Testimonials</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <p>© Signalworks, 2026</p>
            <p>Mission-aligned. Outcome-driven.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
