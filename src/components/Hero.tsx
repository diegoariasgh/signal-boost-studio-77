import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import sternLogo from "@/assets/stern-logo.webp";
import vc4aLogo from "@/assets/vc4a-logo.png";
import adbLogo from "@/assets/adb-logo.png";
import atsfLogo from "@/assets/atsf-logo.png";
import plugandplayLogo from "@/assets/plugandplay-logo.png";
import mantaLogo from "@/assets/manta-logo.png";
import ivbLogo from "@/assets/ivb-logo.png";
import heroBackground from "@/assets/hero-gradient-bg.png";

const logos = [
  { src: plugandplayLogo, alt: "Plug and Play Tech Center", h: "h-6 md:h-7" },
  { src: sternLogo, alt: "NYU Stern School of Business", h: "h-10 md:h-12" },
  { src: adbLogo, alt: "African Development Bank", h: "h-8 md:h-10" },
  { src: vc4aLogo, alt: "VC4A Venture Capital Platform", h: "h-8 md:h-10" },
  { src: atsfLogo, alt: "Africa Tech Startup Forum", h: "h-8 md:h-10" },
  { src: mantaLogo, alt: "Manta Ray Ventures", h: "h-8 md:h-10" },
  { src: ivbLogo, alt: "IVB", h: "h-8 md:h-10" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-navy/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy"></div>
      </div>

      {/* Subtle floating accents */}
      <div className="absolute top-32 left-10 w-1.5 h-1.5 bg-electric rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-16 w-1 h-1 bg-electric-light rounded-full animate-pulse opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
            <p className="eyebrow-light mb-8">signalworks is —</p>

            <h1 className="display-xl text-white mb-10">
              <span className="block">
                <span className="editorial-underline">Mission-aligned</span>{" "}
                advisory
              </span>
              <span className="block">for venture &amp; innovation</span>
              <span className="block">
                across <span className="text-electric">EMEA</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-light/80 max-w-2xl leading-relaxed mb-12">
              Boutique advisory for funds, founders, and the institutions
              backing them — across&nbsp;Africa, the GCC, and Europe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button variant="signal" size="lg" className="group" asChild>
                <a href="mailto:diego@signalworks.xyz">
                  Get in Touch
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 signal-transition" />
                </a>
              </Button>
              <Button variant="outline-light" size="lg" asChild>
                <a href="#about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 hidden md:flex items-center justify-end container mx-auto px-6 pb-8">
        <a
          href="#about"
          className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-light/60 hover:text-electric signal-transition"
        >
          Scroll
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>

      {/* Previous projects strip */}
      <div className="relative z-10 border-t border-white/10 bg-navy/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <p className="eyebrow-light mb-6">Trusted by —</p>
          <div className="overflow-hidden">
            <div className="flex items-center gap-16 md:gap-20 animate-[scroll_25s_linear_infinite] w-fit">
              {[...logos, ...logos].map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className={`${logo.h} w-auto object-contain filter brightness-0 invert opacity-60 hover:opacity-100 signal-transition flex-shrink-0`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
