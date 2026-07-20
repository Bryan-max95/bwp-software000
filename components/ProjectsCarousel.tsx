"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Briefcase, Award, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { getStoredDataAsync, INITIAL_CLIENT_CASES } from "../lib/data";

export default function ProjectsCarousel() {
  const [projects, setProjects] = useState(INITIAL_CLIENT_CASES);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    let active=true;
    void getStoredDataAsync("client_cases",INITIAL_CLIENT_CASES).then(items=>{if(active)setProjects(items.filter(item=>item.active))});
    return () => {active=false};
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // Defer state updates to next tick to avoid synchronous cascading render warnings
    const timer = setTimeout(() => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    }, 0);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => clearTimeout(timer);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative" id="projects-carousel-root">
      {/* Embla Viewport */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing px-2 py-4" ref={emblaRef}>
        <div className="flex gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-none w-full md:w-[85%] lg:w-[65%] min-w-0 transition-opacity duration-300 relative"
              style={{ opacity: selectedIndex === index ? 1 : 0.6 }}
              id={`project-slide-${index}`}
            >
              <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-10 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300 text-left">
                
                {/* Header info */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
                      <Briefcase className="w-3.5 h-3.5" />
                      {project.industry}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      CASO DE ÉXITO 0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-display">
                      {project.companyName}
                    </h3>
                    <h4 className="text-sm font-semibold text-red-700 font-display">
                      {project.projectTitle}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Grid info of tech + results */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 my-6 border-t border-b border-dashed border-gray-150">
                  
                  {/* Technologies */}
                  <div className="md:col-span-5 space-y-2">
                    <span className="text-xs font-bold text-slate-800 tracking-wider flex items-center gap-1.5 font-mono">
                      <Terminal className="w-4 h-4 text-slate-500" />
                      TECNOLOGÍAS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-slate-50 border border-gray-100 text-slate-600 text-[11px] px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results achieved */}
                  <div className="md:col-span-7 space-y-1.5">
                    <span className="text-xs font-bold text-slate-800 tracking-wider flex items-center gap-1.5 font-mono">
                      <Award className="w-4 h-4 text-red-700" />
                      RESULTADO OBTENIDO
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-red-50/30 p-2.5 rounded-lg border border-red-100/30">
                      {project.result}
                    </p>
                  </div>

                </div>

                {/* Testimonial if available */}
                {project.testimonial ? (
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-150 relative text-left">
                    <span className="absolute top-2 right-4 text-5xl font-serif text-red-200/50 pointer-events-none">“</span>
                    <p className="text-xs italic text-gray-600 leading-relaxed relative z-10">
                      {project.testimonial.text}
                    </p>
                    <div className="mt-3 text-xs">
                      <span className="font-bold text-slate-950 block">{project.testimonial.author}</span>
                      <span className="text-slate-400">{project.testimonial.role}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-150/70 text-center">
                    <p className="text-xs text-gray-500">
                      Implementación completa con auditoría, capacitación técnica y garantía de soporte permanente.
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6 px-2" id="carousel-controls">
        {/* Navigation Dot Indicators */}
        <div className="flex gap-1.5" id="carousel-dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                selectedIndex === index ? "w-6 bg-red-700" : "w-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Ir al proyecto ${index + 1}`}
              id={`carousel-dot-${index}`}
            />
          ))}
        </div>

        {/* Action Arrows */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={scrollPrev}
            className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
              prevBtnEnabled
                ? "bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                : "bg-gray-50 border-gray-150 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Proyecto anterior"
            disabled={!prevBtnEnabled}
            id="carousel-btn-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={scrollNext}
            className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
              nextBtnEnabled
                ? "bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                : "bg-gray-50 border-gray-150 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Siguiente proyecto"
            disabled={!nextBtnEnabled}
            id="carousel-btn-next"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
