import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTOPLAY_INTERVAL = 8000;

const testimonials = [
  {
    name: "Yaya Mbaoua",
    role: "Founder & CEO",
    company: "Zencey",
    content:
      "Diego's support has been instrumental in advancing our fundraising strategy. His proactive approach, from facilitating high-value investor introductions to providing diligent follow-ups, ensured we maintained strong momentum throughout the process. His meticulous attention to detail and creative negotiation insights consistently elevated the quality of our discussions and outcomes.",
  },
  {
    name: "Hania Tarek",
    role: "Country Manager, Egypt & Head of Programs, Africa",
    company: "Plug and Play Tech Center",
    content:
      "Diego is one of the best people I know to ever give feedback to our founders; constructive and insightful. He also has an eye for detail that is unmatched. We've received the best feedback from startups about his level of knowledge in various sectors and regions, his ability to bring in an investor's perspective while also connecting founders to the right people.",
  },
  {
    name: "Mejda Elheni",
    role: "BRAIN Program Manager",
    company: "Open Startup (OST)",
    content:
      "Diego is one of the standout experts in our network and someone we consistently trust to support our African founders at Open Startup. With a strong background spanning venture investing, startup growth, and business strategy, he brings a unique perspective that combines investor expectations with the practical realities of building and scaling a company.",
    more:
      " What founders appreciate most is not only the quality of his feedback, but also his genuine willingness to help. Diego is incredibly supportive, approachable, and generous with his time, often going the extra mile to provide guidance, strategic introductions, and ongoing support well beyond formal mentoring engagements. His ability to challenge founders while remaining constructive and encouraging makes him an exceptional mentor, advisor, and trusted partner for any startup navigating growth and fundraising.",
  },
  {
    name: "Adam Stoll",
    role: "COO",
    company: "Rogue Venture Partners",
    content:
      "Diego's ability as a strategic thinker while also focusing down on the details is unparalleled. His personal skills shine when making fundraising connections and when working with portfolio companies in a way that allows teams to take his feedback with conviction. I would recommend Diego wholeheartedly to anyone looking for a top 1% contributor within a fund or delivering value to growth companies around the world.",
  },
];

const Testimonials = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const autoplayRef = useRef(
    Autoplay({
      delay: AUTOPLAY_INTERVAL,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplayRef.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Ensure autoplay is running with the configured delay
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;
    (autoplay as unknown as { options: { delay: number } }).options.delay = AUTOPLAY_INTERVAL;
    autoplay.reset();
    autoplay.play();
  }, [emblaApi]);

  // Recompute slide heights when a quote is expanded/collapsed
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [expanded, emblaApi]);

  return (
    <section
      id="testimonials"
      className="min-h-screen flex items-center py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-20 max-w-5xl">
            <p className="eyebrow mb-6">Testimonials —</p>
            <h2 className="display-lg text-foreground">
              Trusted by founders &amp;{" "}
              <span className="editorial-underline">operators</span>
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-6 md:-ml-10">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="pl-6 md:pl-10 shrink-0 grow-0 basis-full md:basis-1/2"
                  >
                    <figure className="relative flex flex-col h-full">
                      <span
                        aria-hidden
                        className="font-space-grotesk text-electric/40 leading-none select-none"
                        style={{ fontSize: "clamp(4rem, 7vw, 6rem)" }}
                      >
                        &ldquo;
                      </span>
                      <blockquote className="-mt-6 md:-mt-8 lead font-light flex-1">
                        {t.content}
                        {"more" in t && t.more ? (
                          <>
                            {expanded[i] ? (
                              <span>{t.more}</span>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => {
                                setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
                                emblaApi?.plugins()?.autoplay?.stop();
                              }}
                              className="ml-1 inline text-sm font-medium uppercase tracking-widest text-foreground/70 hover:text-foreground transition-colors underline-offset-4 hover:underline"
                              aria-expanded={!!expanded[i]}
                            >
                              {expanded[i] ? "Show less" : "Read more"}
                            </button>
                          </>
                        ) : null}
                      </blockquote>
                      <figcaption className="mt-8 pt-6 border-t border-border">
                        <p className="font-semibold text-foreground leading-snug">
                          {t.name}
                        </p>
                        <p className="body-muted text-sm mt-1 leading-snug">
                          <span className="block md:inline">{t.role}</span>
                          <span className="hidden md:inline"> · </span>
                          <span className="block md:inline text-foreground/70">
                            {t.company}
                          </span>
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === selectedIndex
                        ? "w-8 bg-foreground"
                        : "w-4 bg-foreground/20 hover:bg-foreground/40"
                    )}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-5">


                <span className="eyebrow tabular-nums">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    aria-label="Previous testimonial"
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollNext}
                    aria-label="Next testimonial"
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
