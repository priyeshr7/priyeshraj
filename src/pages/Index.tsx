import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowUpRight, Award, BrainCircuit, CheckCircle2, ChevronLeft,
  ChevronRight, Cloud, Code2, Database, Download, Flag, Github, Linkedin,
  MapPin, Menu, Newspaper, Pause, Plane, Play, Trophy, X,
} from "lucide-react";

type Project = { name: string; description: string; language: string; html_url: string; pushed_at: string };
type Certification = { title: string; issuer: string; issued: string; expires?: string; id?: string; featured?: boolean };
type GalleryItem = { src: string; alt: string; location: string; note: string };

const fallbackProjects: Project[] = [
  { name: "LocalRAG_Bot", description: "A private, local-first research assistant for PDF, CSV, and TXT files. Select sources, ask questions, and keep every document on your machine.", language: "Python", html_url: "https://github.com/priyeshr7/LocalRAG_Bot", pushed_at: "2026-11-04T06:39:22Z" },
  { name: "EDA-automation-Tool", description: "A Python workflow that turns raw datasets into useful exploratory analysis and makes common data transformations available in a few clicks.", language: "Python", html_url: "https://github.com/priyeshr7/EDA-automation-Tool", pushed_at: "2026-10-15T16:16:58Z" },
  { name: "predictive-maintenance-for-metro-assets-", description: "A predictive system that helps metro teams identify failure-prone assets early and plan maintenance before queues and service disruption begin.", language: "Python", html_url: "https://github.com/priyeshr7/predictive-maintenance-for-metro-assets-", pushed_at: "2026-10-10T17:14:32Z" },
];

const certifications: Certification[] = [
  { title: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", issued: "May 2026", expires: "May 2029", id: "aa699eed-6ede-4a79-91af-02efa0fbb1ab", featured: true },
  { title: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", issued: "Apr 2026", expires: "Apr 2029", id: "0e76e7ec-8dfc-4dd6-8b34-189923176f77", featured: true },
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", issued: "Jan 2026", expires: "Jan 2029", featured: true },
  { title: "DP-900: Data Platform Fundamentals", issuer: "GTechLearn", issued: "Credential earned", id: "GTL-14773-G7Q3" },
  { title: "AWS Academy Graduate – Generative AI Foundations", issuer: "Amazon Web Services", issued: "Sep 2025" },
  { title: "Data Science Foundations: Fundamentals", issuer: "LinkedIn", issued: "Jul 2025" },
  { title: "Oracle Cloud Infrastructure AI Foundations Associate", issuer: "Oracle", issued: "Jul 2025" },
  { title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", issued: "Jul 2025" },
  { title: "Introduction to Data Science", issuer: "Cisco", issued: "Jul 2025" },
  { title: "Python Essentials 2", issuer: "Cisco", issued: "Jun 2025" },
  { title: "Python Essentials 1", issuer: "Cisco", issued: "Jun 2025" },
  { title: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco", issued: "Jun 2025" },
  { title: "CCNA: Enterprise Networking, Security, and Automation", issuer: "Cisco", issued: "Jun 2025" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco", issued: "Jun 2025", id: "f350c274-928c-459a-8298-2d37e132ea91" },
  { title: "CCNA: Introduction to Networks", issuer: "Cisco", issued: "Jun 2025", id: "aec6e994-fb35-471c-9c07-9255efe446d6" },
];

const interests = [
  { icon: Trophy, label: "Chess", detail: "Strategy, patience, and finding the move that changes the position." },
  { icon: Flag, label: "Formula 1", detail: "Following the racing, engineering, team calls, and every shifting storyline." },
  { icon: Newspaper, label: "Tech & trends", detail: "Keeping up with what is changing across cloud, AI, security, and software." },
  { icon: Plane, label: "Travel", detail: "New places, long views, and photographs worth bringing back." },
];

const skillGroups = [
  { icon: Cloud, title: "AWS & cloud", text: "Cloud-native architecture, networking, security, containers, and infrastructure delivery." },
  { icon: Code2, title: "Python", text: "Automation, APIs, data pipelines, research tools, and practical backend systems." },
  { icon: Database, title: "Data analysis", text: "Exploration, transformation, and interfaces that make datasets easier to understand." },
  { icon: BrainCircuit, title: "ML & inference", text: "Predictive models, local RAG, generative AI foundations, and useful inference workflows." },
];

// Add future trip photographs here. The infinite loop, autoplay, arrows, and dots update automatically.
const galleryItems: GalleryItem[] = [
  {
    src: "assets/travel-24.6160743-72.7661412.jpeg",
    alt: "Sunlight over a rugged mountain landscape",
    location: "24.6160743, 72.7661412",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-18.9224039-72.8348735.jpeg",
    alt: "Historic stone architecture against a clear blue sky",
    location: "18.9224039, 72.8348735",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-18.9459839-72.8214078.jpeg",
    alt: "Mumbai skyline viewed across the water",
    location: "18.9459839, 72.8214078",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-19.0637020-72.8674835.jpeg",
    alt: "A colorful circular artwork with flowers and city forms",
    location: "19.0637020, 72.8674835",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-19.1264727-72.8154463.jpeg",
    alt: "Sunset over the sea and a sandy shoreline",
    location: "19.1264727, 72.8154463",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-22.4144020-78.4404919.jpeg",
    alt: "Cloud-covered mountain ridges",
    location: "22.4144020, 78.4404919",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-23.2262151-77.4357253.jpeg",
    alt: "An illuminated highway at night",
    location: "23.2262151, 77.4357253",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-23.2297520-77.4834612.jpeg",
    alt: "A faint rainbow under warm evening clouds",
    location: "23.2297520, 77.4834612",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-28.5543027-77.2611470.jpeg",
    alt: "The Lotus Temple framed by gardens",
    location: "28.5543027, 77.2611470",
    note: "From the travel archive",
  },
  {
    src: "assets/travel-29.9567873-78.1715655.jpeg",
    alt: "A historic clock tower viewed from below",
    location: "29.9567873, 78.1715655",
    note: "From the travel archive",
  },
];

const loopedGalleryItems = [galleryItems[galleryItems.length - 1], ...galleryItems, galleryItems[0]];

const formatName = (name: string) => name.replace(/-+$/, "").replace(/[_-]/g, " ");
const formatDate = (date: string) => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(date));

const Index = () => {
  const [projects, setProjects] = useState(fallbackProjects);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllCredentials, setShowAllCredentials] = useState(false);
  const [galleryPosition, setGalleryPosition] = useState(1);
  const [galleryTransition, setGalleryTransition] = useState(true);
  const [galleryMoving, setGalleryMoving] = useState(false);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [galleryInteracting, setGalleryInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const activeDotRef = useRef<HTMLButtonElement>(null);
  const activeSlide = (galleryPosition - 1 + galleryItems.length) % galleryItems.length;

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/users/priyeshr7/repos?sort=pushed&per_page=12", { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((repositories) => {
        const recent = repositories
          .filter((repo: { fork: boolean; name: string; description: string | null }) => !repo.fork && repo.name !== "priyeshraj" && repo.description)
          .slice(0, 3)
          .map((repo: Project) => ({ name: repo.name, description: repo.description, language: repo.language || "Project", html_url: repo.html_url, pushed_at: repo.pushed_at }));
        if (recent.length === 3) setProjects(recent);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (galleryPaused || galleryInteracting || galleryMoving || galleryItems.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rotation = window.setInterval(() => {
      setGalleryTransition(true);
      setGalleryMoving(true);
      setGalleryPosition((position) => position + 1);
    }, 5000);
    return () => window.clearInterval(rotation);
  }, [galleryPaused, galleryInteracting, galleryMoving]);

  useEffect(() => {
    const activeDot = activeDotRef.current;
    const dotRail = activeDot?.parentElement;
    if (!activeDot || !dotRail) return;
    dotRail.scrollTo({
      left: activeDot.offsetLeft - (dotRail.clientWidth / 2) + (activeDot.clientWidth / 2),
      behavior: "smooth",
    });
  }, [activeSlide]);

  const closeMenu = () => setMenuOpen(false);
  const visibleCredentials = showAllCredentials ? certifications : certifications.slice(0, 5);
  const showPreviousSlide = () => {
    if (galleryMoving) return;
    setGalleryTransition(true);
    setGalleryMoving(true);
    setGalleryPosition((position) => position - 1);
  };
  const showNextSlide = () => {
    if (galleryMoving) return;
    setGalleryTransition(true);
    setGalleryMoving(true);
    setGalleryPosition((position) => position + 1);
  };
  const showGallerySlide = (index: number) => {
    if (galleryMoving || index === activeSlide) return;
    setGalleryTransition(true);
    setGalleryMoving(true);
    setGalleryPosition(index + 1);
  };
  const handleGalleryTransitionEnd = () => {
    if (galleryPosition === 0) {
      setGalleryTransition(false);
      setGalleryPosition(galleryItems.length);
    } else if (galleryPosition === galleryItems.length + 1) {
      setGalleryTransition(false);
      setGalleryPosition(1);
    }
    setGalleryMoving(false);
  };
  const handleTouchEnd = (endX: number) => {
    if (touchStart === null) return;
    const distance = touchStart - endX;
    if (distance > 50) showNextSlide();
    if (distance < -50) showPreviousSlide();
    setTouchStart(null);
  };

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="wordmark" href="#top" aria-label="Priyesh Raj, home">PR<span>.</span></a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#credentials" onClick={closeMenu}>Credentials</a><a href="#life" onClick={closeMenu}>Life</a><a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a className="nav-cta" href={`${import.meta.env.BASE_URL}assets/priyesh-raj-cloud-security-resume.pdf`} target="_blank" rel="noreferrer">Resume <Download size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> AWS · Cloud · Python · Data · ML</p>
            <h1>I build systems that turn <em>signals</em> into decisions.</h1>
            <p className="hero-intro">I’m Priyesh Raj—a cloud and Python developer working across AWS, data analysis, machine learning, and inference. I like making complex systems clear, useful, and ready for the real world.</p>
            <div className="hero-actions">
              <a className="button button--dark" href="#work">Explore my work <ArrowDown size={17} /></a>
              <a className="button button--outline" href={`${import.meta.env.BASE_URL}assets/priyesh-raj-cloud-security-resume.pdf`} target="_blank" rel="noreferrer">View resume <Download size={16} /></a>
            </div>
          </div>

          <a className="project-console reveal reveal--delay" href={projects[0].html_url} target="_blank" rel="noreferrer" aria-label={`Open ${formatName(projects[0].name)} on GitHub`}>
            <div className="console-bar"><span /><span /><span /><p>priyesh.profile.py</p></div>
            <div className="console-body">
              <p><b>01</b><span className="code-purple">focus</span> = [<span className="code-green">"AWS"</span>, <span className="code-green">"cloud"</span>, <span className="code-green">"Python"</span>]</p>
              <p><b>02</b><span className="code-purple">data</span> = [<span className="code-green">"analysis"</span>, <span className="code-green">"ML"</span>, <span className="code-green">"inference"</span>]</p>
              <p><b>03</b></p><p><b>04</b><span className="code-blue">def</span> <span className="code-yellow">build</span>(problem):</p>
              <p><b>05</b>&nbsp;&nbsp;signals = data.<span className="code-yellow">understand</span>()</p>
              <p><b>06</b>&nbsp;&nbsp;<span className="code-blue">return</span> cloud.<span className="code-yellow">ship</span>(signals)</p><p><b>07</b></p>
              <p className="console-output"><b>›</b> Latest: {formatName(projects[0].name)}<span className="cursor" /></p>
            </div>
            <div className="console-footer"><span>Building in public</span><span className="console-link">View latest project <ArrowUpRight size={16} /></span></div>
          </a>
        </section>

        <section className="ticker" aria-label="Focus areas"><div>AWS <span>✦</span> CLOUD ARCHITECTURE <span>✦</span> PYTHON <span>✦</span> DATA ANALYSIS <span>✦</span> MACHINE LEARNING <span>✦</span> INFERENCE <span>✦</span> AWS <span>✦</span> CLOUD ARCHITECTURE <span>✦</span> PYTHON <span>✦</span> DATA ANALYSIS <span>✦</span></div></section>

        <section className="expertise-section" aria-labelledby="expertise-title">
          <div className="section-heading"><div><p className="eyebrow"><span /> What I work with</p><h2 id="expertise-title">From cloud foundations to intelligent systems.</h2></div><p>My interests meet where infrastructure, data, and inference become something people can actually use.</p></div>
          <div className="expertise-grid">{skillGroups.map(({ icon: Icon, title, text }, index) => <article className="expertise-card" key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading"><div><p className="eyebrow"><span /> Selected work</p><h2>Recent projects, first.</h2></div><p>Built in public and ordered by the latest push on GitHub.</p></div>
          <div className="project-list">{projects.map((project, index) => <a className="project-row" href={project.html_url} target="_blank" rel="noreferrer" key={project.name}><span className="project-number">0{index + 1}</span><div className="project-info"><div className="project-meta"><span>{project.language}</span><span>{formatDate(project.pushed_at)}</span></div><h3>{formatName(project.name)}</h3><p>{project.description}</p></div><span className="project-arrow"><ArrowUpRight /></span></a>)}</div>
          <a className="all-work" href="https://github.com/priyeshr7?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight size={17} /></a>
        </section>

        <section className="credentials-section" id="credentials">
          <div className="credentials-intro"><p className="eyebrow eyebrow--light"><span /> Certifications</p><h2>Learning, validated.</h2><p>A growing body of work across AWS architecture, cloud, AI, data, networking, security, and Python.</p><div className="credential-stat"><strong>{certifications.length}</strong><span>credentials<br />and learning milestones</span></div></div>
          <div className="credential-list">
            {visibleCredentials.map((cert) => <article className={cert.featured ? "credential-card credential-card--featured" : "credential-card"} key={cert.title}><div className="credential-mark">{cert.featured ? <Award /> : <CheckCircle2 />}</div><div><p className="credential-issuer">{cert.issuer}</p><h3>{cert.title}</h3><p className="credential-date">{cert.issued}{cert.expires ? ` — expires ${cert.expires}` : ""}</p>{cert.id && <p className="credential-id">ID {cert.id}</p>}</div>{cert.featured && <span className="verified-label">AWS certified</span>}</article>)}
            <button className="credentials-toggle" type="button" onClick={() => setShowAllCredentials((shown) => !shown)}>{showAllCredentials ? "Show fewer credentials" : `Show all ${certifications.length} credentials`} <ArrowDown className={showAllCredentials ? "rotate-icon" : ""} size={16} /></button>
          </div>
        </section>

        <section className="life-section" id="life">
          <div className="section-heading"><div><p className="eyebrow"><span /> Off the clock</p><h2>A little more personal.</h2></div><p>Good work is only one part of a good life. These are the things that keep me curious.</p></div>
          <div className="interest-grid">{interests.map(({ icon: Icon, label, detail }) => <article className="interest-card" key={label}><Icon /><h3>{label}</h3><p>{detail}</p></article>)}</div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="gallery-heading"><p className="eyebrow eyebrow--light"><span /> Field notes</p><h2>Places worth remembering.</h2><p>A small visual log from the road—one frame at a time.</p></div>
          <div className="gallery-carousel" aria-roledescription="carousel" aria-label="Travel photographs" tabIndex={0} onMouseEnter={() => setGalleryInteracting(true)} onMouseLeave={() => setGalleryInteracting(false)} onFocus={() => setGalleryInteracting(true)} onBlur={() => setGalleryInteracting(false)} onKeyDown={(event) => { if (event.key === "ArrowLeft") showPreviousSlide(); if (event.key === "ArrowRight") showNextSlide(); }}>
            <div className="gallery-viewport" onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}>
              <div className="gallery-track" style={{ transform: `translateX(-${galleryPosition * 100}%)`, transition: galleryTransition ? undefined : "none" }} onTransitionEnd={handleGalleryTransitionEnd}>
                {loopedGalleryItems.map((item, index) => (
                  <figure className="travel-frame" key={`${item.src}-${index}`} aria-hidden={galleryPosition !== index}>
                    <img src={`${import.meta.env.BASE_URL}${item.src}`} alt={item.alt} loading={index === 1 ? "eager" : "lazy"} decoding="async" />
                    <figcaption><div><MapPin size={17} /><span>{item.location}</span></div><p>{item.note}</p></figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="gallery-controls">
              <div className="gallery-buttons">
                <button type="button" onClick={showPreviousSlide} disabled={galleryItems.length < 2} aria-label="Previous photograph"><ChevronLeft /></button>
                <button type="button" onClick={() => setGalleryPaused((paused) => !paused)} aria-label={galleryPaused ? "Resume automatic gallery rotation" : "Pause automatic gallery rotation"}>{galleryPaused ? <Play /> : <Pause />}</button>
                <button type="button" onClick={showNextSlide} disabled={galleryItems.length < 2} aria-label="Next photograph"><ChevronRight /></button>
              </div>
              <div className="gallery-progress" aria-label={`Photograph ${activeSlide + 1} of ${galleryItems.length}`}>
                <div className="gallery-dots">{galleryItems.map((item, index) => <button ref={activeSlide === index ? activeDotRef : undefined} type="button" className={activeSlide === index ? "gallery-dot gallery-dot--active" : "gallery-dot"} onClick={() => showGallerySlide(index)} aria-label={`Show photograph ${index + 1}`} key={item.src} />)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact"><div><p className="eyebrow"><span /> Let’s build something</p><h2>Have an interesting problem?</h2></div><div className="contact-actions"><a className="button button--dark" href="https://www.linkedin.com/in/priyeshraj" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={17} /></a><p>Open to thoughtful cloud, data, and machine-learning projects—and always happy to learn in public.</p></div></section>
      </main>

      <footer><div className="wordmark">PR<span>.</span></div><p>Designed & built by Priyesh Raj.</p><div className="social-links"><a href="https://github.com/priyeshr7" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.linkedin.com/in/priyeshraj" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></div></footer>
    </div>
  );
};

export default Index;
