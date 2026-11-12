import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, BrainCircuit, Cloud, Code2, Database, Github, Linkedin, Menu, X } from "lucide-react";

type Project = { name: string; description: string; language: string; html_url: string; pushed_at: string };

const fallbackProjects: Project[] = [
  { name: "LocalRAG_Bot", description: "A private, local-first research assistant for PDF, CSV, and TXT files. Select sources, ask questions, and keep every document on your machine.", language: "Python", html_url: "https://github.com/priyeshr7/LocalRAG_Bot", pushed_at: "2026-11-04T06:39:22Z" },
  { name: "EDA-automation-Tool", description: "A Python workflow that turns raw datasets into useful exploratory analysis and makes common data transformations available in a few clicks.", language: "Python", html_url: "https://github.com/priyeshr7/EDA-automation-Tool", pushed_at: "2026-10-15T16:16:58Z" },
  { name: "predictive-maintenance-for-metro-assets-", description: "A predictive system that helps metro teams identify failure-prone assets early and plan maintenance before queues and service disruption begin.", language: "Python", html_url: "https://github.com/priyeshr7/predictive-maintenance-for-metro-assets-", pushed_at: "2026-10-10T17:14:32Z" },
];

const skills = [
  { icon: Code2, title: "Python engineering", text: "Automation, APIs, data pipelines, and useful tools built for real workflows." },
  { icon: BrainCircuit, title: "Applied AI", text: "Local RAG, predictive models, and practical ML experiments with a clear purpose." },
  { icon: Database, title: "Data products", text: "Exploration, analysis, and interfaces that make complex datasets easier to act on." },
  { icon: Cloud, title: "Cloud & delivery", text: "AWS, containers, Terraform, and deployment systems designed to stay dependable." },
];

const formatName = (name: string) => name.replace(/-+$/, "").replaceAll("_", " ").replaceAll("-", " ");
const formatDate = (date: string) => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(date));

const Index = () => {
  const [projects, setProjects] = useState(fallbackProjects);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="wordmark" href="#top" aria-label="Priyesh Raj, home">PR<span>.</span></a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="nav-cta" href="https://github.com/priyeshr7" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> Python · Data · Cloud</p>
            <h1>I make complex systems feel <em>simple.</em></h1>
            <p className="hero-intro">I’m Priyesh Raj, a developer building local-first AI tools, data products, and cloud systems that turn messy problems into clear, useful software.</p>
            <div className="hero-actions">
              <a className="button button--dark" href="#work">Explore my work <ArrowDown size={17} /></a>
              <a className="text-link" href="https://github.com/priyeshr7" target="_blank" rel="noreferrer">github.com/priyeshr7 <ArrowUpRight size={16} /></a>
            </div>
          </div>

          <a className="project-console reveal reveal--delay" href={projects[0].html_url} target="_blank" rel="noreferrer" aria-label={`Open ${formatName(projects[0].name)} on GitHub`}>
            <div className="console-bar"><span /><span /><span /><p>latest_project.py</p></div>
            <div className="console-body">
              <p><b>01</b><span className="code-purple">project</span> = <span className="code-green">"{formatName(projects[0].name)}"</span></p>
              <p><b>02</b><span className="code-purple">mode</span> = <span className="code-green">"private + local-first"</span></p>
              <p><b>03</b><span className="code-purple">sources</span> = [<span className="code-green">"PDF"</span>, <span className="code-green">"CSV"</span>, <span className="code-green">"TXT"</span>]</p>
              <p><b>04</b></p><p><b>05</b><span className="code-blue">def</span> <span className="code-yellow">ask</span>(question):</p>
              <p><b>06</b>&nbsp;&nbsp;<span className="code-blue">return</span> knowledge.<span className="code-yellow">retrieve</span>(question)</p><p><b>07</b></p>
              <p className="console-output"><b>›</b> Your documents stay yours.<span className="cursor" /></p>
            </div>
            <div className="console-footer"><span>Newest release</span><span className="console-link">View repository <ArrowUpRight size={16} /></span></div>
          </a>
        </section>

        <section className="ticker" aria-label="Focus areas"><div>LOCAL AI <span>✦</span> DATA SYSTEMS <span>✦</span> PYTHON AUTOMATION <span>✦</span> CLOUD DELIVERY <span>✦</span> LOCAL AI <span>✦</span> DATA SYSTEMS <span>✦</span> PYTHON AUTOMATION <span>✦</span> CLOUD DELIVERY <span>✦</span></div></section>

        <section className="work-section" id="work">
          <div className="section-heading"><div><p className="eyebrow"><span /> Selected work</p><h2>Recent projects, first.</h2></div><p>Built in public and ordered by the latest push on GitHub.</p></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <a className="project-row" href={project.html_url} target="_blank" rel="noreferrer" key={project.name}>
                <span className="project-number">0{index + 1}</span><div className="project-info"><div className="project-meta"><span>{project.language}</span><span>{formatDate(project.pushed_at)}</span></div><h3>{formatName(project.name)}</h3><p>{project.description}</p></div><span className="project-arrow"><ArrowUpRight /></span>
              </a>
            ))}
          </div>
          <a className="all-work" href="https://github.com/priyeshr7?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight size={17} /></a>
        </section>

        <section className="about-section" id="about">
          <div className="about-lead"><p className="eyebrow eyebrow--light"><span /> How I work</p><h2>Useful beats flashy.<br />Clear beats clever.</h2><p>I like tools that respect the user: private when they should be, understandable when they can be, and reliable when they matter.</p></div>
          <div className="skill-grid">{skills.map(({ icon: Icon, title, text }) => <article className="skill-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="contact-section" id="contact">
          <div><p className="eyebrow"><span /> Let’s build something</p><h2>Have an interesting problem?</h2></div>
          <div className="contact-actions"><a className="button button--dark" href="https://www.linkedin.com/in/priyeshraj" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={17} /></a><p>Open to thoughtful projects, collaboration, and learning in public.</p></div>
        </section>
      </main>

      <footer><div className="wordmark">PR<span>.</span></div><p>Designed & built by Priyesh Raj.</p><div className="social-links"><a href="https://github.com/priyeshr7" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.linkedin.com/in/priyeshraj" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></div></footer>
    </div>
  );
};

export default Index;
