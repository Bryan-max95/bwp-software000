"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function GSAPInitializer() {
  useEffect(() => {
    // 1. Accessibility Safety check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 2. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Hook Lenis raf directly into GSAP's optimized requestAnimationFrame ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing to keep scrolling perfectly synced
    gsap.ticker.lagSmoothing(0);

    // 4. Scroll-Triggered Animations definition
    // Ensure styles are set up for smooth fade-ins without flashing (using hidden initial opacities)
    
    // A. Hero content entry sequence
    gsap.fromTo(
      "#home-hero-text > *",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1,
      }
    );

    gsap.fromTo(
      "#home-hero-visual",
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
      }
    );

    // B. Services cards section animation (Staggered reveal)
    const servicesHeader = document.querySelector("#capabilities-section h2");
    const servicesSub = document.querySelector("#capabilities-section span");
    const serviceCards = document.querySelectorAll("[id^='capability-']");

    if (servicesHeader && servicesSub && serviceCards.length > 0) {
      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#capabilities-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      servicesTl
        .fromTo([servicesSub, servicesHeader], 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        )
        .fromTo(serviceCards, 
          { opacity: 0, y: 25 }, 
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
          "-=0.2"
        );
    }

    // C. Solutions Cards Grid section animation (Staggered reveal)
    const solutionsSection = document.getElementById("stage-solutions-section");
    const solutionCards = document.querySelectorAll("[id^='home-sol-']");

    if (solutionsSection && solutionCards.length > 0) {
      const solutionsTl = gsap.timeline({
        scrollTrigger: {
          trigger: solutionsSection,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      solutionsTl
        .fromTo(solutionsSection.querySelector("span"), 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        )
        .fromTo(solutionsSection.querySelector("h2"), 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(solutionsSection.querySelector("p"), 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(solutionCards, 
          { opacity: 0, scale: 0.95, y: 20 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(document.getElementById("link-all-solutions"), 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.1"
        );
    }

    // D. Featured Product POS section animation
    const featuredSection = document.getElementById("featured-product-section");
    if (featuredSection) {
      const children = featuredSection.querySelectorAll(".grid > *");
      gsap.fromTo(children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuredSection,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // E. Why BWP section animation
    const whyBwpSection = document.getElementById("why-bwp-section");
    const valueProps = document.querySelectorAll("[id^='value-prop-']");

    if (whyBwpSection && valueProps.length > 0) {
      const whyTl = gsap.timeline({
        scrollTrigger: {
          trigger: whyBwpSection,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      whyTl
        .fromTo(whyBwpSection.querySelector("span"), 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        )
        .fromTo(whyBwpSection.querySelector("h2"), 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(whyBwpSection.querySelector("p"), 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(valueProps, 
          { opacity: 0, x: -15 }, 
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.2"
        );
    }

    // F. Work Steps timeline sequence
    const workSection = document.getElementById("work-process-section");
    const workSteps = document.querySelectorAll("[id^='work-step-']");

    if (workSection && workSteps.length > 0) {
      const workTl = gsap.timeline({
        scrollTrigger: {
          trigger: workSection,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      workTl
        .fromTo(workSection.querySelector("span"), 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        )
        .fromTo(workSection.querySelector("h2"), 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(workSection.querySelector("p"), 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(workSteps, 
          { opacity: 0, scale: 0.9, y: 20 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2"
        );
    }

    // G. Bottom Banner CTA
    const ctaBanner = document.getElementById("home-cta-banner");
    if (ctaBanner) {
      gsap.fromTo(ctaBanner,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaBanner,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 5. Cleanup routine
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
