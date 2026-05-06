import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { MouseEvent, useEffect, useRef, useState } from "react";

const strengths = [
  "Full-stack engineering",
  "Cloud platform development",
  "Frontend systems with React",
  "Backend services in Python, Go, and Node",
  "CI/CD and developer workflows"
];

const experienceGroups = [
  {
    title: "Programming Languages",
    items: ["Python", "Go", "JavaScript", "TypeScript"]
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Angular", "Node.js", "Django"]
  },
  {
    title: "Tools & Technologies",
    items: ["Git", "Docker", "Kubernetes", "Terraform"]
  },
  {
    title: "Database Management",
    items: ["SQL", "MongoDB", "Redis", "PostgreSQL"]
  }
];

const projects = [
  {
    label: "Project 01",
    title: "Interactive portfolio system",
    summary: "A motion-forward personal site designed to feel like software booting into a story."
  },
  {
    label: "Project 02",
    title: "Component-driven product work",
    summary: "UI engineering shaped by reusable systems, clean interfaces, and thoughtful implementation."
  },
  {
    label: "Project 03",
    title: "Cloud-minded engineering",
    summary: "Full-stack work built around reliability, maintainability, and developer experience."
  }
];

const certifications = [
  { title: "Cloud Essentials", issuer: "IBM", issued: "Issued Oct 2024" },
  { title: "IBM watsonx Essentials", issuer: "IBM", issued: "Issued Oct 2024" },
  { title: "IBM Growth Behaviors", issuer: "IBM", issued: "Issued Jul 2024 · Expires Jul 2034" },
  { title: "Trustworthy AI and AI Ethics", issuer: "IBM", issued: "Issued May 2024" },
  { title: "Containers & Kubernetes Essentials", issuer: "IBM", issued: "Issued May 2024" },
  { title: "Docker Essentials: A Developer Introduction", issuer: "IBM", issued: "Issued Feb 2024" },
  { title: "Deep Learning using TensorFlow", issuer: "IBM", issued: "Issued Feb 2024" },
  { title: "IBM Security Essentials for Architects", issuer: "IBM", issued: "Issued Jan 2024" },
  { title: "Think Like a Hacker", issuer: "IBM", issued: "Issued Jan 2024" },
  { title: "IBM Security Zero Trust Principles", issuer: "IBM", issued: "Issued Jan 2024" },
  { title: "IBM Developer Jumpstart - Practitioner", issuer: "IBM", issued: "Issued Nov 2022" },
  { title: "IBM Certified Advocate - Cloud v2", issuer: "IBM", issued: "Issued Sep 2022 · Skills: Kubernetes" },
  { title: "Enterprise Design Thinking Practitioner", issuer: "IBM", issued: "Issued Jul 2022" },
  { title: "IBM Agile Explorer", issuer: "IBM", issued: "Issued May 2022" },
  { title: "Security and Privacy by Design Foundations", issuer: "IBM", issued: "Issued May 2022" }
];

const industryCompanies = [
  {
    company: "Oracle",
    logo: "ORCL",
    tag: "Oracle · Full-time",
    role: "Senior Site Reliability Engineer",
    timeframe: "Jul 2025 - Present",
    location: "Remote",
    blurb: "Resolve Oracle Health client service requests, monitor environments, and improve system health through automation and observability.",
    points: [
      "Resolve Oracle Health (Cerner) client service requests in Remedy",
      "Use RoyalTSX, Citrix, and RDP to monitor JVMs and troubleshoot issues",
      "Built Bash call-home scripts for health monitoring and alerting",
      "Built a dashboard to proactively track system health and performance"
    ]
  },
  {
    company: "IBM",
    logo: "IBM",
    tag: "IBM · Full-time",
    role: "MultiCloud SaaS Platform Engineer",
    timeframe: "Jan 2024 - Jul 2025",
    location: "Durham, North Carolina",
    extraRole: "Cloud Back End Developer",
    extraTimeframe: "May 2022 - Jan 2024",
    blurb: "Worked across cloud development and continuous delivery automation for multicloud enterprise environments.",
    points: [
      "Built shell scripts for continuous delivery automation processes",
      "Implemented automated deployment pipelines to reduce manual errors",
      "Streamlined deployment flows with cross-functional engineering teams",
      "Integrated modern best practices into legacy application environments"
    ]
  },
  {
    company: "Pearson",
    logo: "P+",
    tag: "Pearson · Internship",
    role: "E-Commerce Engineer",
    timeframe: "Jun 2021 - Aug 2021",
    location: "Durham, North Carolina",
    blurb: "Built front-end app experiences and integrations for the Pearson+ mobile product.",
    points: [
      "Developed mobile front-end applications for Android and iOS",
      "Worked with UI/UX designers to implement product designs",
      "Integrated RESTful APIs and backend services into mobile flows",
      "Supported accessibility compliance with WCAG-conscious implementation"
    ]
  },
  {
    company: "UNC SoM",
    logo: "UNC",
    tag: "UNC School of Medicine · Part-time",
    role: "Application & Web Developer",
    timeframe: "Aug 2021 - May 2022",
    location: "Chapel Hill, North Carolina",
    blurb: "Built and maintained application experiences across mobile and web for UNC School of Medicine.",
    points: [
      "Developed mobile apps for Android and iOS using Java and Swift",
      "Integrated third-party APIs and services to extend functionality",
      "Built responsive web applications with React, HTML, CSS, and JavaScript",
      "Supported application development for data-heavy internal use cases"
    ]
  }
];

const bootSequence = [
  "booting portfolio kernel...",
  "loading profile://sena-zadeh",
  "mounting experience/oracle.current",
  "caching visuals/zuko.runner",
  "hydrating ui/interactive-sections",
  "warming motion engine...",
  "syncing contact endpoints...",
  "status: ready for launch"
];

function buildTerminalMeter(progress: number) {
  const totalSlots = 24;
  const filledSlots = Math.round(progress * totalSlots);
  const bar = `${"=".repeat(filledSlots)}${"-".repeat(totalSlots - filledSlots)}`;
  const percent = Math.round(progress * 100);

  return `fetching profile  [${bar}] ${percent}%`;
}

function IndustryScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const [scrollCompanyIndex, setScrollCompanyIndex] = useState(0);
  const [manualCompanyIndex, setManualCompanyIndex] = useState<number | null>(null);
  const [isCertificationsPaused, setIsCertificationsPaused] = useState(false);
  const layoutOpacity = useTransform(scrollYProgress, [0.12, 0.24, 0.82], [0, 1, 1]);
  const layoutY = useTransform(scrollYProgress, [0.12, 0.26], ["8vh", "0vh"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      industryCompanies.length - 1,
      Math.max(0, Math.floor(latest * industryCompanies.length))
    );
    setScrollCompanyIndex(nextIndex);
  });

  const activeCompanyIndex = manualCompanyIndex ?? scrollCompanyIndex;
  const activeCompany = industryCompanies[activeCompanyIndex];

  return (
    <section className="scene-section" id="industry" ref={sectionRef}>
      <div className="scene-sticky">
        <div className="industry-flight-frame">
          <motion.div
            className="industry-editorial"
            style={{ opacity: layoutOpacity, y: layoutY }}
            onMouseLeave={() => setManualCompanyIndex(null)}
          >
            <div className="industry-column industry-column-left">
              <p className="industry-column-label">Industry Experience</p>
              {industryCompanies.map((company, index) => (
                <motion.div
                  key={company.company}
                  className={`industry-list-item ${index === activeCompanyIndex ? "active" : ""}`}
                  initial={{ opacity: 0, y: 42 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                  onMouseEnter={() => setManualCompanyIndex(index)}
                  onFocus={() => setManualCompanyIndex(index)}
                  onClick={() => setManualCompanyIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setManualCompanyIndex(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="industry-list-logo" aria-hidden="true">
                    {company.logo}
                  </div>
                  <div className="industry-list-copy">
                    <span>{company.company}</span>
                    <h3>{company.role}</h3>
                    <p>{company.timeframe}</p>
                    {company.extraRole ? (
                      <div className="industry-list-secondary-role">
                        <strong>{company.extraRole}</strong>
                        <span>{company.extraTimeframe}</span>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="industry-column industry-column-center">
              <motion.div
                key={activeCompany.company}
                className="industry-feature-shell"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className="industry-feature-screen">
                  <div className="industry-feature-logo">{activeCompany.logo}</div>
                  <div className="industry-feature-copy">
                    <span>{activeCompany.tag}</span>
                    <h3>{activeCompany.role}</h3>
                    <strong>{activeCompany.company}</strong>
                    <em>{activeCompany.timeframe} · {activeCompany.location}</em>
                    {activeCompany.extraRole ? (
                      <div className="industry-feature-secondary-role">
                        <strong>{activeCompany.extraRole}</strong>
                        <em>{activeCompany.extraTimeframe}</em>
                      </div>
                    ) : null}
                    <p>{activeCompany.blurb}</p>
                  </div>
                </div>

                <motion.div
                  className="industry-feature-card"
                  initial={{ opacity: 0, x: 24, y: 12 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
                >
                  <div className="industry-card-heading">
                    <div className="industry-logo" aria-hidden="true">
                      {activeCompany.logo}
                    </div>
                    <h3>{activeCompany.company}</h3>
                  </div>
                  <div className="industry-feature-points">
                    {activeCompany.points.map((point) => (
                      <div key={point} className="industry-feature-point">
                        <span>&gt;</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="industry-column industry-column-right">
              <p className="industry-column-label">Companies</p>
              {industryCompanies.map((company, index) => (
                <motion.div
                  key={company.company}
                  className={`industry-rail-item ${index === activeCompanyIndex ? "active" : ""}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: "easeOut" }}
                  onMouseEnter={() => setManualCompanyIndex(index)}
                  onFocus={() => setManualCompanyIndex(index)}
                  onClick={() => setManualCompanyIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setManualCompanyIndex(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {company.company}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="certifications-belt">
            <div className="certifications-belt-label">Certifications</div>
            <div
              className="certifications-marquee"
              onMouseDown={() => setIsCertificationsPaused(true)}
              onMouseUp={() => setIsCertificationsPaused(false)}
              onMouseLeave={() => setIsCertificationsPaused(false)}
              onTouchStart={() => setIsCertificationsPaused(true)}
              onTouchEnd={() => setIsCertificationsPaused(false)}
              onFocus={() => setIsCertificationsPaused(true)}
              onBlur={() => setIsCertificationsPaused(false)}
              tabIndex={0}
            >
              <div
                className={`certifications-track ${isCertificationsPaused ? "paused" : ""}`}
              >
                {[...certifications, ...certifications].map((certification, index) => (
                  <article key={`${certification.title}-${index}`} className="certification-card">
                    <div className="certification-card-top">
                      <div className="certification-logo" aria-hidden="true">
                        IBM
                      </div>
                      <span>{certification.issuer}</span>
                    </div>
                    <h4>{certification.title}</h4>
                    <p>{certification.issued}</p>
                    <a href="#contact">Show credential</a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.24, 0.72], [0, 1, 1]);
  const titleScale = useTransform(scrollYProgress, [0.08, 0.28], [0.92, 1]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.28], ["10vh", "0vh"]);
  const cardOpacity = useTransform(scrollYProgress, [0.16, 0.28, 0.78], [0, 1, 1]);

  const cardTransforms = [
    {
      x: useTransform(scrollYProgress, [0.14, 0.38], ["-24vw", "0vw"]),
      y: useTransform(scrollYProgress, [0.14, 0.38], ["18vh", "0vh"]),
      rotate: "-6deg"
    },
    {
      x: useTransform(scrollYProgress, [0.18, 0.42], ["-8vw", "0vw"]),
      y: useTransform(scrollYProgress, [0.18, 0.42], ["24vh", "0vh"]),
      rotate: "3deg"
    },
    {
      x: useTransform(scrollYProgress, [0.22, 0.46], ["8vw", "0vw"]),
      y: useTransform(scrollYProgress, [0.22, 0.46], ["24vh", "0vh"]),
      rotate: "-3deg"
    },
    {
      x: useTransform(scrollYProgress, [0.26, 0.5], ["24vw", "0vw"]),
      y: useTransform(scrollYProgress, [0.26, 0.5], ["18vh", "0vh"]),
      rotate: "6deg"
    }
  ];

  return (
    <section className="scene-section" id="experience" ref={sectionRef}>
      <div className="scene-sticky">
        <div className="experience-flight-frame">
          <motion.div
            className="experience-title-wrap"
            style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
          >
            <p className="eyebrow">Experience</p>
            <h2 className="experience-title terminal-display" data-text="EXPERIENCE">
              EXPERIENCE
            </h2>
          </motion.div>

          <div className="experience-card-grid">
            {experienceGroups.map((group, index) => (
              <motion.article
                key={group.title}
                className="experience-skill-card"
                style={{
                  x: cardTransforms[index].x,
                  y: cardTransforms[index].y,
                  opacity: cardOpacity,
                  rotate: cardTransforms[index].rotate
                }}
              >
                <div className="experience-card-header">
                  <span className="experience-card-tag">$ module.load</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="experience-skill-list">
                  {group.items.map((item) => (
                    <div key={item} className="experience-skill-item">
                      <span className="experience-check" aria-hidden="true">
                        &gt;
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const glowX = useSpring(cursorX, { stiffness: 140, damping: 25, mass: 0.3 });
  const glowY = useSpring(cursorY, { stiffness: 140, damping: 25, mass: 0.3 });
  const glowLeft = useTransform(glowX, (value) => `${value - 180}px`);
  const glowTop = useTransform(glowY, (value) => `${value - 180}px`);
  const { scrollYProgress } = useScroll();
  const runnerProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.25 });
  const runnerX = useTransform(runnerProgress, [0, 1], ["0%", "calc(100vw - 9.5rem)"]);
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], ["-7deg", "11deg"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4vh", "10vh"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.88, 1, 1.08]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0.12, 0.18, 0.14, 0.1]);
  const [visibleBootLines, setVisibleBootLines] = useState(1);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isBootImageMissing, setIsBootImageMissing] = useState(false);
  const bootProgress = visibleBootLines / bootSequence.length;

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setVisibleBootLines((current) => {
        if (current >= bootSequence.length) {
          window.clearInterval(lineTimer);
          return current;
        }

        return current + 1;
      });
    }, 520);

    const completeTimer = window.setTimeout(() => {
      setIsBootComplete(true);
    }, 5000);

    return () => {
      window.clearInterval(lineTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
  };

  const handleContinue = () => {
    setIsLoaderVisible(false);
  };

  return (
    <main className="page-shell" onMouseMove={handlePointerMove}>
      <motion.div
        className="page-content"
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{
          opacity: isLoaderVisible ? 0 : 1,
          scale: isLoaderVisible ? 0.99 : 1
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {!isBootImageMissing ? (
          <motion.img
            src="/sena-zuko.png"
            alt=""
            aria-hidden="true"
            className="background-corgi"
            style={{
              rotate: backgroundRotate,
              y: backgroundY,
              scale: backgroundScale,
              opacity: backgroundOpacity
            }}
          />
        ) : null}

        <motion.div className="cursor-glow" style={{ left: glowLeft, top: glowTop }} />

        <div className="scroll-runner" aria-hidden="true">
          <div className="runner-track" />
          <motion.div className="runner-corgi" style={{ x: runnerX }}>
            <div className="corgi-body">
              <span className="corgi-ear left" />
              <span className="corgi-ear right" />
              <span className="corgi-face">
                <span className="corgi-eye left" />
                <span className="corgi-eye right" />
                <span className="corgi-nose" />
              </span>
              <span className="corgi-tail" />
              <span className="corgi-leg front" />
              <span className="corgi-leg back" />
            </div>
          </motion.div>
        </div>

        <motion.nav
          className="topbar topbar-fixed"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="brand terminal-display terminal-display-brand" data-text="SENA ZADEH">
            SENA ZADEH
          </span>
          <div className="topbar-links topbar-links-terminal">
            <a href="#about">&gt; About</a>
            <a href="#experience">&gt; Experience</a>
            <a href="#industry">&gt; Industry</a>
            <a href="#projects">&gt; Projects</a>
          </div>
        </motion.nav>

        <a className="contact-fab" href="#contact">
          Contact
        </a>

        <section className="hero scene-shell">

          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <p className="eyebrow">Software engineer • dog dad • builder</p>
              <h1>Software engineer. Dog dad. Building at Oracle.</h1>
              <p className="lede">Full-stack work with a little more personality.</p>
              <div className="hero-actions">
                <a className="button primary" href="#experience">
                  View experience
                </a>
                <a className="button secondary" href="#about">
                  Meet Zuko
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <div className="panel-label">Current focus</div>
              <div className="panel-project">
                <span>Oracle</span>
                <h2>Building software with cloud-scale thinking.</h2>
                <p>
                  My portfolio should show that I care about strong engineering fundamentals and a
                  clear, memorable user experience.
                </p>
              </div>
              <div className="panel-metrics">
                <div>
                  <strong>6+</strong>
                  <span>years in software</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>industry chapters</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>very important corgi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="scene-section" id="about">
          <div className="scene-sticky">
            <motion.div
              className="scene-frame split-scene"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
            >
              <div className="scene-copy">
                <p className="eyebrow">About</p>
                <h2 className="terminal-display terminal-display-small" data-text="ABOUT">
                  ABOUT
                </h2>
                <p className="lede">
                  I&apos;m a software engineer from Durham, North Carolina with roots in full-stack
                  development, cloud platforms, and product-minded engineering. Outside of work,
                  I&apos;m a proud dog dad to my corgi, Zuko, who deserves some screen time too.
                </p>
              </div>
              <div className="terminal-stack">
                {strengths.map((strength, index) => (
                  <motion.div
                    key={strength}
                    className="terminal-row"
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <span className="terminal-prefix">$</span>
                    <span>{strength}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <ExperienceScene />

        <IndustryScene />

        <section className="scene-section" id="projects">
          <div className="scene-sticky">
            <div className="scene-frame">
              <motion.div
                className="section-heading"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7 }}
              >
                <p className="eyebrow">Projects</p>
                <h2 className="terminal-display terminal-display-small" data-text="PROJECTS">
                  PROJECTS
                </h2>
                <p className="lede section-kicker">
                  Projects should show both engineering depth and a little personality.
                </p>
              </motion.div>

              <div className="projects-stack">
                {projects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    className="project-card project-scene-card"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                  >
                    <span>{project.label}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

      </motion.div>

      <motion.div
        className="boot-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isLoaderVisible ? 1 : 0,
          pointerEvents: isLoaderVisible ? "auto" : "none"
        }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <div className="boot-shell">
          <div className="boot-portrait">
            <div className="boot-portrait-frame">
              {!isBootImageMissing ? (
                <>
                  <img
                    src="/sena-zuko.png"
                    alt=""
                    aria-hidden="true"
                    className="boot-portrait-image boot-portrait-silhouette"
                  />
                  <motion.img
                    src="/sena-zuko.png"
                    alt="Illustrated portrait of Sena with Zuko"
                    className="boot-portrait-image boot-portrait-reveal"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{
                      clipPath: `inset(${(1 - bootProgress) * 100}% 0 0 0)`
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    onError={() => setIsBootImageMissing(true)}
                  />
                </>
              ) : (
                <div className="boot-portrait-fallback">
                  <p>Drop your portrait into `public/sena-zuko.png`.</p>
                </div>
              )}
            </div>
            <div className="boot-progress">
              <span>{buildTerminalMeter(bootProgress)}</span>
            </div>
          </div>

          <div className="boot-terminal">
            <p className="boot-label">portfolio-init v2.0.0</p>
            <div className="boot-lines">
              {bootSequence.slice(0, visibleBootLines).map((line, index) => (
                <div key={line} className="boot-line">
                  <span className="boot-prompt">
                    {index === bootSequence.length - 1 ? "done" : ">"}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
              <div className="boot-line">
                <span className="boot-prompt">$</span>
                <span className="boot-caret" />
              </div>
            </div>
            <motion.div
              className="boot-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isBootComplete ? 1 : 0,
                y: isBootComplete ? 0 : 10
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button
                type="button"
                className="boot-button"
                onClick={handleContinue}
                disabled={!isBootComplete}
              >
                Continue to portfolio
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default App;
