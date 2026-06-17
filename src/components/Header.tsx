import { Button } from "@/components/ui/button";
import signalWorksLogo from "@/assets/signalworks-logo-new.png";
import { useActiveSection } from "@/hooks/use-active-section";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const activeSection = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 signal-transition ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src={signalWorksLogo}
              alt="Signal Works"
              width="160"
              height="32"
              className="h-7 w-auto brightness-0 invert"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm tracking-wide signal-transition ${
                  activeSection === item.id
                    ? "text-electric"
                    : "text-slate-light/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="outline-light"
              size="sm"
              className="rounded-full px-5"
              asChild
            >
              <a
                href="https://zcal.co/diegoarias/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </a>
            </Button>
          </nav>

          {/* Mobile */}
          <div className="md:hidden">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 bg-navy/95 backdrop-blur-md border border-white/10 shadow-lg z-50"
                align="end"
              >
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`text-base px-3 py-2 rounded-md signal-transition ${
                        activeSection === item.id
                          ? "text-electric"
                          : "text-slate-light hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="pt-2 border-t border-white/10">
                    <Button variant="signal" className="w-full" asChild>
                      <a
                        href="https://zcal.co/diegoarias/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book a Call
                      </a>
                    </Button>
                  </div>
                </nav>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
