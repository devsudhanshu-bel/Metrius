
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { number: "01", title: "CLARITY", description: "Remove the noise. Make the essential impossible to miss." },
  { number: "02", title: "PRECISION", description: "Every detail, interaction and system has a reason to exist." },
  { number: "03", title: "INTELLIGENCE", description: "Technology should reduce complexity, not introduce more of it." },
  { number: "04", title: "IMPACT", description: "Build things that remain useful, memorable and meaningful." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const select = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, section);
      const cards = select(".principle");
      const first = cards[0];

      gsap.set(cards, { autoAlpha: 0, y: 70, scale: 0.98 });
      if (first) gsap.set(first, { autoAlpha: 1, y: 0, scale: 1 });

      const intro = gsap.timeline({
        scrollTrigger: { trigger: ".about-intro", start: "top 75%", end: "bottom 35%", scrub: 1.1 },
      });

      intro.fromTo(".about-intro-kicker", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      intro.fromTo(".about-word", { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power4.out" }, "-=0.45");
      intro.fromTo(".about-intro-copy", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.45");

      const principlesIntro = gsap.timeline({
        scrollTrigger: { trigger: ".principles-intro", start: "top 78%", end: "bottom 40%", scrub: 1 },
      });

      principlesIntro.fromTo(".principles-intro-number", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      principlesIntro.fromTo(".principles-intro-title", { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.35");
      principlesIntro.fromTo(".principles-intro-line", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9 }, "-=0.45");

      gsap.to(".orbit-outer", { rotation: 360, duration: 28, ease: "none", repeat: -1 });
      gsap.to(".orbit-middle", { rotation: -360, duration: 20, ease: "none", repeat: -1 });
      gsap.to(".orbit-inner", { rotation: 360, duration: 15, ease: "none", repeat: -1 });
      gsap.to(".orbit-particle", { rotation: 360, duration: 7, ease: "none", repeat: -1 });
      gsap.to(".orbit-core", { scale: 1.12, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".orbit-core-glow", { scale: 1.35, opacity: 0.12, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });

      gsap.to(".orbit-visual", {
        y: -80, x: 20, scale: 1.05, ease: "none",
        scrollTrigger: { trigger: ".principles-stage", start: "top bottom", end: "bottom top", scrub: 2 },
      });

      gsap.to(".principles-grid", {
        y: -120, ease: "none",
        scrollTrigger: { trigger: ".principles-stage", start: "top bottom", end: "bottom top", scrub: 2 },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".principles-stage",
          start: "top top",
          end: `+=${Math.max(cards.length, 1) * 2100}`,
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        const title = card.querySelector<HTMLElement>(".principle-title");
        const number = card.querySelector<HTMLElement>(".principle-number");
        const description = card.querySelector<HTMLElement>(".principle-description");
        const line = card.querySelector<HTMLElement>(".principle-line");
        const label = card.querySelector<HTMLElement>(".principle-label");
        const background = card.querySelector<HTMLElement>(".principle-background-number");

        if (!title || !number || !description || !line || !label) return;

        if (index === 0) {
          timeline.fromTo(card, { y: 20, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" });
        }

        timeline.fromTo(number, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, index === 0 ? "<0.05" : "<0.08");
        timeline.fromTo(title, { opacity: 0, yPercent: 22, letterSpacing: "0em" }, { opacity: 1, yPercent: 0, letterSpacing: "-0.075em", duration: 0.85, ease: "power4.out" }, "<0.08");
        timeline.fromTo(description, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, "<0.18");
        timeline.fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.7 }, "<0.08");
        timeline.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.35 }, "<");

        if (background) {
          timeline.fromTo(background, { opacity: 0, scale: 0.96 }, { opacity: 0.025, scale: 1, duration: 0.8 }, "<");
        }

        timeline.to({}, { duration: 5 });
        timeline.to(title, { x: index % 2 === 0 ? -18 : 18, duration: 2.5, ease: "none" }, "<");
        timeline.to(title, { x: 0, duration: 1, ease: "power2.out" });

        if (index < cards.length - 1) {
          timeline.to(card, { autoAlpha: 0, y: -75, scale: 0.985, duration: 0.9, ease: "power3.inOut" });
          timeline.to([title, description, number, label], { opacity: 0, duration: 0.45 }, "<");
          timeline.to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.45 }, "<");
          if (background) timeline.to(background, { opacity: 0, scale: 1.04, duration: 0.5 }, "<");
          timeline.to({}, { duration: 0.55 });

          const next = cards[index + 1];
          const nextTitle = next.querySelector<HTMLElement>(".principle-title");
          const nextNumber = next.querySelector<HTMLElement>(".principle-number");
          const nextDescription = next.querySelector<HTMLElement>(".principle-description");
          const nextLine = next.querySelector<HTMLElement>(".principle-line");
          const nextLabel = next.querySelector<HTMLElement>(".principle-label");
          const nextBackground = next.querySelector<HTMLElement>(".principle-background-number");

          gsap.set(next, { autoAlpha: 0, y: 70, scale: 0.985 });
          if (nextTitle) gsap.set(nextTitle, { opacity: 0, yPercent: 20 });
          if (nextNumber) gsap.set(nextNumber, { opacity: 0, y: 20 });
          if (nextDescription) gsap.set(nextDescription, { opacity: 0, y: 25 });
          if (nextLine) gsap.set(nextLine, { scaleX: 0, transformOrigin: "left center" });
          if (nextLabel) gsap.set(nextLabel, { opacity: 0 });
          if (nextBackground) gsap.set(nextBackground, { opacity: 0, scale: 0.96 });

          timeline.to(next, { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: "power4.out" });
          if (nextNumber) timeline.to(nextNumber, { opacity: 1, y: 0, duration: 0.45 }, "<0.08");
          if (nextTitle) timeline.to(nextTitle, { opacity: 1, yPercent: 0, duration: 0.85 }, "<0.08");
          if (nextDescription) timeline.to(nextDescription, { opacity: 1, y: 0, duration: 0.55 }, "<0.18");
          if (nextLine) timeline.to(nextLine, { scaleX: 1, duration: 0.7 }, "<0.08");
          if (nextLabel) timeline.to(nextLabel, { opacity: 1, duration: 0.35 }, "<");
          if (nextBackground) timeline.to(nextBackground, { opacity: 0.025, scale: 1, duration: 0.8 }, "<");
        }
      });

      const outro = gsap.timeline({
        scrollTrigger: { trigger: ".about-outro", start: "top 78%", end: "bottom 45%", scrub: 1.1 },
      });

      outro.fromTo(".outro-kicker", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 });
      outro.fromTo(".outro-word", { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power4.out" }, "-=0.35");
      outro.fromTo(".outro-copy", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.35");
      outro.fromTo(".outro-line", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8 }, "-=0.35");

      const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(refresh);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full overflow-hidden bg-[#050505] text-white">
      <section className="about-intro relative flex min-h-[115vh] w-full items-center overflow-hidden px-[7vw] py-32">
        <div className="pointer-events-none absolute inset-[-15%] opacity-[0.028]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "110px 110px" }} />
        <div className="pointer-events-none absolute right-[-20vw] top-1/2 h-[55vw] w-[55vw] -translate-y-1/2 rounded-full bg-white/[0.025] blur-[160px]" />
        <div className="relative z-10 w-full">
          <div className="about-intro-kicker mb-10 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>02 / 04</span><span className="h-px w-12 bg-white/20" /><span>ABOUT METRIUS</span>
          </div>
          <h2 className="about-intro-heading max-w-[1250px] text-[clamp(4rem,9vw,10rem)] font-light uppercase leading-[0.83] tracking-[-0.07em]">
            <span className="block overflow-hidden"><span className="about-word inline-block">WE BUILD</span></span>
            <span className="block overflow-hidden"><span className="about-word inline-block text-white/40">DIGITAL</span></span>
            <span className="block overflow-hidden"><span className="about-word inline-block">SYSTEMS</span></span>
            <span className="block overflow-hidden"><span className="about-word inline-block text-white/40">PEOPLE REMEMBER.</span></span>
          </h2>
          <div className="about-intro-copy mt-14 flex max-w-[1000px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <p className="max-w-[540px] text-base leading-[1.8] text-white/55 md:text-lg">Metrius is a digital systems studio focused on creating premium products, intelligent software and experiences that exist beyond the screen.</p>
            <p className="max-w-[360px] text-xs leading-[1.8] text-white/30 md:text-[13px]">Design.<br />Engineering.<br />Intelligence.<br />Systems thinking.</p>
          </div>
        </div>
      </section>

      <section className="principles-intro relative flex min-h-[85vh] w-full items-center overflow-hidden px-[7vw] py-32">
        <div className="w-full">
          <div className="principles-intro-number text-[10px] uppercase tracking-[0.3em] text-white/35">THE FOUR PRINCIPLES</div>
          <div className="mt-8 overflow-hidden"><h2 className="principles-intro-title max-w-[1200px] text-[clamp(4rem,10vw,11rem)] font-light uppercase leading-[0.82] tracking-[-0.075em]">HOW WE<br />BUILD.</h2></div>
          <div className="principles-intro-line mt-14 h-px w-full bg-white/15" />
          <div className="mt-6 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-white/25"><span>CLARITY / PRECISION / INTELLIGENCE / IMPACT</span><span>SCROLL</span></div>
        </div>
      </section>

      <section className="principles-stage relative h-screen w-full overflow-hidden bg-[#050505]">
        <div className="principles-grid pointer-events-none absolute inset-[-20%] z-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "110px 110px" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.018] blur-[180px]" />
        <div className="absolute left-[5vw] right-[5vw] top-8 z-50 flex items-center justify-between border-b border-white/[0.08] pb-5 text-[9px] uppercase tracking-[0.3em] text-white/30"><span>METRIUS</span><span>FOUR PRINCIPLES</span></div>

        <div className="orbit-visual pointer-events-none absolute right-[-15vw] top-1/2 z-10 h-[70vh] w-[70vh] -translate-y-1/2 opacity-75">
          <div className="absolute left-1/2 top-1/2 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[70px]" />
          <div className="orbit-outer absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.09]">
            <span className="orbit-particle absolute left-[17%] top-[10%] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,.9)]" />
            <span className="absolute bottom-[14%] right-[10%] h-[3px] w-[3px] rounded-full bg-white/60" />
          </div>
          <div className="orbit-middle absolute left-1/2 top-1/2 h-[67%] w-full -translate-x-1/2 -translate-y-1/2 rotate-[24deg] rounded-[50%] border border-white/[0.09]"><span className="absolute right-[12%] top-[7%] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,.85)]" /></div>
          <div className="orbit-inner absolute left-1/2 top-1/2 h-full w-[60%] -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] rounded-[50%] border border-white/[0.065]"><span className="absolute bottom-[5%] left-[45%] h-[4px] w-[4px] rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,.7)]" /></div>
          <div className="absolute left-1/2 top-1/2 h-[42%] w-[73%] -translate-x-1/2 -translate-y-1/2 rotate-[58deg] rounded-[50%] border border-white/[0.05]" />
          <div className="orbit-core-glow absolute left-1/2 top-1/2 h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.055] opacity-[0.16] blur-[30px]" />
          <div className="orbit-core absolute left-1/2 top-1/2 z-20 h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/[0.09] shadow-[0_0_35px_rgba(255,255,255,.18)] backdrop-blur-md"><div className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,.9)]" /></div>
        </div>

        {principles.map((principle) => (
          <div key={principle.number} className="principle absolute inset-0 z-30 flex items-center px-[7vw] will-change-transform">
            <div className="principle-background-number pointer-events-none absolute right-[-2vw] top-1/2 -translate-y-1/2 select-none text-[36vw] font-light leading-none tracking-[-0.1em] text-white">{principle.number}</div>
            <div className="relative z-40 w-full max-w-[1350px]">
              <div className="principle-number flex items-center gap-5"><span className="text-[11px] font-medium tracking-[0.25em] text-white/45">{principle.number}</span><span className="h-px w-14 bg-white/20" /><span className="text-[9px] uppercase tracking-[0.28em] text-white/30">PRINCIPLE</span></div>
              <div className="mt-9 overflow-hidden"><h2 className="principle-title origin-left whitespace-nowrap text-[clamp(4.5rem,13vw,15rem)] font-light uppercase leading-[0.72] tracking-[-0.075em] text-white will-change-transform">{principle.title}</h2></div>
              <div className="mt-12 flex max-w-[900px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <p className="principle-description max-w-[430px] text-[15px] leading-[1.8] text-white/45 md:text-[17px]">{principle.description}</p>
                <div className="principle-label text-[9px] uppercase leading-[1.8] tracking-[0.22em] text-white/25">METRIUS<br />DIGITAL SYSTEMS</div>
              </div>
              <div className="principle-line mt-12 h-px w-[65vw] max-w-[1000px] bg-white/[0.16]" />
            </div>
            <div className="absolute bottom-8 right-[5vw] z-50 text-[9px] uppercase tracking-[0.3em] text-white/25">{principle.number} / 04</div>
          </div>
        ))}
      </section>

      <section className="about-outro relative flex min-h-[120vh] w-full items-center overflow-hidden px-[7vw] py-32">
        <div className="pointer-events-none absolute right-[-20vw] top-1/2 h-[55vw] w-[55vw] -translate-y-1/2 rounded-full bg-white/[0.02] blur-[170px]" />
        <div className="relative z-10 w-full">
          <div className="outro-kicker mb-10 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/35"><span>ABOUT / 02</span><span className="h-px w-12 bg-white/20" /><span>THE NEXT CHAPTER</span></div>
          <h2 className="outro-heading max-w-[1200px] text-[clamp(4rem,9vw,10rem)] font-light uppercase leading-[0.82] tracking-[-0.07em]">
            <span className="block overflow-hidden"><span className="outro-word inline-block">BUILT FOR</span></span>
            <span className="block overflow-hidden"><span className="outro-word inline-block text-white/40">WHAT COMES</span></span>
            <span className="block overflow-hidden"><span className="outro-word inline-block">NEXT.</span></span>
          </h2>
          <div className="outro-copy mt-14 max-w-[600px] text-base leading-[1.8] text-white/45 md:text-lg"><p>From the first idea to the final system, we build with one thing in mind:</p><p className="mt-5 text-white/75">Make it matter.</p></div>
          <div className="outro-line mt-16 h-px w-full bg-white/[0.16]" />
          <div className="mt-6 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-white/25"><span>METRIUS</span><span>DIGITAL SYSTEMS</span><span>03 / 04 → SERVICES</span></div>
        </div>
      </section>
    </section>
  );
}
