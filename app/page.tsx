"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lanyard from "./components/Lanyard/Lanyard";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiLaravel,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  // Dark mode state dengan nilai awal null untuk menghindari hydration mismatch
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Inisialisasi darkMode dari localStorage di sisi klien, default ke true
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      const isDark = savedMode !== null ? savedMode === "true" : true; // Default ke true jika null
      setDarkMode(isDark);
      console.log(
        "Initial dark mode from localStorage:",
        savedMode,
        "isDark:",
        isDark
      );
    }
  }, []);

  // Efek untuk memperbarui kelas dark dan localStorage
  useEffect(() => {
    if (darkMode === null) return;
    console.log("Updating dark mode:", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
      console.log(
        "Added dark class:",
        document.documentElement.classList.contains("dark")
      );
    } else {
      document.documentElement.classList.remove("dark");
      console.log(
        "Removed dark class:",
        !document.documentElement.classList.contains("dark")
      );
    }
  }, [darkMode]);

  // Parallax effect setup
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Active section tracking
  const [activeSection, setActiveSection] = useState("home");
  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  // Menurunkan threshold untuk projects di mobile
  const [projectsRef, projectsInView] = useInView({
    threshold:
      typeof window !== "undefined" && window.innerWidth < 640 ? 0.1 : 0.3,
  });
  const [certificatesRef, certificatesInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    console.log("Section in view:", {
      home: homeInView,
      skills: skillsInView,
      projects: projectsInView,
      certificates: certificatesInView,
      contact: contactInView,
    });
    if (homeInView) setActiveSection("home");
    else if (skillsInView) setActiveSection("skills");
    else if (projectsInView) setActiveSection("projects");
    else if (certificatesInView) setActiveSection("certificates");
    else if (contactInView) setActiveSection("contact");
  }, [
    homeInView,
    skillsInView,
    projectsInView,
    certificatesInView,
    contactInView,
  ]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
        {/* Floating Navigation */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-auto">
          <div className="flex items-center gap-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex-wrap justify-center">
            <NavLink href="#home" active={activeSection === "home"}>
              Home
            </NavLink>
            <NavLink href="#skills" active={activeSection === "skills"}>
              Skills
            </NavLink>
            <NavLink href="#projects" active={activeSection === "projects"}>
              Projects
            </NavLink>
            <NavLink
              href="#certificates"
              active={activeSection === "certificates"}
            >
              Certificates
            </NavLink>
            <NavLink href="#contact" active={activeSection === "contact"}>
              Contact
            </NavLink>
            <button
              onClick={() => {
                console.log("Toggling dark mode, current:", darkMode);
                setDarkMode(!darkMode);
              }}
              className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaSun className="text-yellow-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaMoon className="text-indigo-500" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Hero Section with Lanyard */}
        <section
          id="home"
          ref={homeRef}
          className="relative h-screen overflow-hidden"
        >
          <div ref={targetRef} className="absolute inset-0">
            <motion.div
              style={{ y, opacity }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30"
            />
          </div>

          <div className="container mx-auto h-full flex items-center px-6 relative z-10">
            <div className="w-full md:w-2/3 lg:w-1/2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-sm font-medium tracking-wider text-blue-600 dark:text-blue-400">
                  FULL STACK DEVELOPER
                </span>
                <h1 className="text-5xl pb-2 pt-2 md:text-6xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Zonatan Sihombing
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-200 mt-4 leading-relaxed">
                  I craft exceptional digital experiences with clean, efficient
                  code and intuitive interfaces that users love.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#projects"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors border border-gray-300 dark:border-gray-600 shadow-lg"
                >
                  Contact Me
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4 mt-8"
              >
                <SocialIcon
                  href="https://github.com/zonatan"
                  icon={<FaGithub />}
                  label="GitHub"
                  className="hover:bg-gray-800 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                />
                <SocialIcon
                  href="https://linkedin.com/in/zonatan"
                  icon={<FaLinkedin />}
                  label="LinkedIn"
                  className="hover:bg-blue-700 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
                />
                <SocialIcon
                  href="https://instagram.com/zonatansihombing_"
                  icon={<FaInstagram />}
                  label="Instagram"
                  className="hover:bg-pink-600 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white"
                />
                <SocialIcon
                  href="mailto:zonatan.sh03@gmail.com"
                  icon={<FaEnvelope />}
                  label="Email"
                  className="hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white"
                />
              </motion.div>
            </div>

            {/* Lanyard Component - Right Side */}
            <div className="hidden lg:flex lg:w-1/2 justify-center items-center h-full">
              <div className="relative w-full h-[400px]">
                <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
              </div>
            </div>
          </div>

          {/* Floating tech bubbles */}
          <TechBubbles />
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsRef}
          className="py-20 bg-white dark:bg-gray-950"
        >
          <div className="container mx-auto px-6">
            <SectionHeader
              title="My Expertise"
              subtitle="Technologies I've mastered through professional and personal projects"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800 flex flex-col items-center"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-center text-gray-900 dark:text-gray-200">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-4">
                    <div
                      className={`h-full rounded-full ${skill.levelColor}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {skill.level}% proficiency
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsRef}
          className="py-20 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container mx-auto px-6">
            <SectionHeader
              title="Featured Projects"
              subtitle="A showcase of my best work demonstrating my skills and capabilities"
            />

            <div className="space-y-16 mt-12">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          ref={certificatesRef}
          className="py-20 bg-white dark:bg-gray-950"
        >
          <div className="container mx-auto px-6">
            <SectionHeader
              title="Certifications"
              subtitle="Proof of my continuous learning and professional development"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`/assets/sertif/sertif${cert.id}.jpg`}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-200">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {cert.issuer} • {cert.date}
                    </p>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                    >
                      View credential{" "}
                      <FaExternalLinkAlt className="ml-1 text-xs" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-200">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Whether you have a project in mind or just want to chat about
                technology, I'd love to hear from you. Get in touch and let's
                create something exceptional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:zonatan.sh03@gmail.com"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <FaEnvelope className="text-xl" />
                  Email Me
                </a>
                <a
                  href="https://linkedin.com/in/zonatan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors border border-gray-300 dark:border-gray-600 shadow-lg flex items-center justify-center gap-2"
                >
                  <FaLinkedin className="text-xl" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center gap-6 mb-4">
              <SocialIcon
                href="https://github.com/zonatan"
                icon={<FaGithub />}
                label="GitHub"
                className="hover:text-gray-900 dark:hover:text-white"
              />
              <SocialIcon
                href="https://linkedin.com/in/zonatan"
                icon={<FaLinkedin />}
                label="LinkedIn"
                className="hover:text-blue-700 dark:hover:text-blue-400"
              />
              <SocialIcon
                href="https://instagram.com/zonatansihombing_"
                icon={<FaInstagram />}
                label="Instagram"
                className="hover:text-pink-600 dark:hover:text-pink-400"
              />
              <SocialIcon
                href="mailto:zonatan.sh03@gmail.com"
                icon={<FaEnvelope />}
                label="Email"
                className="hover:text-red-600 dark:hover:text-red-400"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Zonatan Sihombing. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Components
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
      }`}
    >
      {children}
    </a>
  );
}

function SocialIcon({
  href,
  icon,
  label,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-500 dark:text-gray-400 text-xl transition-colors ${
        className || ""
      }`}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <span className="text-sm font-medium tracking-wider text-blue-600 dark:text-blue-400">
        {subtitle}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`flex flex-col ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700`}
    >
      <div className="lg:w-1/2 w-full relative group overflow-hidden rounded-lg">
        <div className="relative aspect-video">
          <Image
            src={`/assets/projects/project${project.id}.png`}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white font-medium">View Project</span>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-800 dark:text-gray-200"
          >
            <FaGithub />
            <span>View Code</span>
          </a>
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors text-white"
          >
            <FaExternalLinkAlt />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function TechBubbles() {
  const techs = [
    {
      icon: <FaReact className="text-blue-500" />,
      name: "React",
      size: "w-16 h-16",
      delay: 0,
    },
    {
      icon: <SiNextdotjs className="text-black dark:text-white" />,
      name: "Next.js",
      size: "w-16 h-16",
      delay: 0.2,
    },
    {
      icon: <SiTypescript className="text-blue-600" />,
      name: "TypeScript",
      size: "w-16 h-16",
      delay: 0.4,
    },
    {
      icon: <FaNodeJs className="text-green-500" />,
      name: "Node.js",
      size: "w-16 h-16",
      delay: 0.6,
    },
    {
      icon: <SiTailwindcss className="text-cyan-500" />,
      name: "Tailwind",
      size: "w-16 h-16",
      delay: 0.8,
    },
  ];

  return (
    <>
      {techs.map((tech, index) => (
        <motion.div
          key={index}
          initial={{ opacity: -0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: tech.delay,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className={`absolute ${tech.size} flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700`}
          style={{
            left: `${28 + index * 8}%`,
            top: `${80 + index * 0}%`,
          }}
          aria-label={tech.name}
        >
          <div className="text-2xl">{tech.icon}</div>
        </motion.div>
      ))}
    </>
  );
}

// Data
const skills = [
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-500" />,
    level: 95,
    levelColor: "bg-orange-500",
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="text-blue-500" />,
    level: 90,
    levelColor: "bg-blue-500",
  },
  {
    name: "JavaScript",
    icon: <FaJs className="text-yellow-500" />,
    level: 88,
    levelColor: "bg-yellow-500",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-600" />,
    level: 80,
    levelColor: "bg-blue-600",
  },
  {
    name: "React",
    icon: <FaReact className="text-blue-400" />,
    level: 85,
    levelColor: "bg-blue-400",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-black dark:text-white" />,
    level: 75,
    levelColor: "bg-gray-800 dark:bg-gray-300",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-green-500" />,
    level: 78,
    levelColor: "bg-green-500",
  },
  {
    name: "Python",
    icon: <FaPython className="text-blue-600" />,
    level: 70,
    levelColor: "bg-blue-600",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-400" />,
    level: 75,
    levelColor: "bg-green-400",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="text-blue-500" />,
    level: 72,
    levelColor: "bg-blue-500",
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss className="text-cyan-400" />,
    level: 85,
    levelColor: "bg-cyan-400",
  },
  {
    name: "Laravel",
    icon: <SiLaravel className="text-red-600" />,
    level: 65,
    levelColor: "bg-red-600",
  },
  {
    name: "MySQL",
    icon: <FaDatabase className="text-blue-600" />,
    level: 70,
    levelColor: "bg-blue-600",
  },
];

type ProjectType = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
};

const projects: ProjectType[] = [
  {
    id: 1,
    title: "Library Management System",
    description:
      "Comprehensive library management solution with online member registration, book inventory, and lending system. Features include real-time availability checks, automated reminders, and detailed reporting.",
    technologies: ["PHP", "JavaScript", "Bootstrap", "MySQL"],
    githubLink: "https://github.com/zonatan/Sistem-Perpustakaan",
    demoLink: "https://github.com/zonatan/Sistem-Perpustakaan",
  },
  {
    id: 2,
    title: "Motorbike Club Website",
    description:
      "Modern static website for a motorcycle enthusiast club featuring responsive design, smooth animations, and clean UI. Showcases events, member galleries, and club information with an engaging user experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/zonatan/ClubMotor",
    demoLink: "https://zonatan.github.io/ClubMotor/",
  },
  {
    id: 3,
    title: "Company Portfolio",
    description:
      "Professional business portfolio website with modern design aesthetics. Features services showcase, team profiles, client testimonials, and contact forms. Built with performance and SEO best practices in mind.",
    technologies: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    githubLink: "https://github.com/zonatan/company-portfolio",
    demoLink: "https://zonatan.github.io/company-portfolio/",
  },
];

const certificates = [
  {
    id: "1",
    title: "Basic Data",
    issuer: "Coding Bootcamp",
    date: "2023",
    link: "#",
  },
  {
    id: "2",
    title: "API Introduction",
    issuer: "Online Course Platform",
    date: "2022",
    link: "#",
  },
  {
    id: "3",
    title: "Website Development Fundamental",
    issuer: "Web Development Institute",
    date: "2021",
    link: "#",
  },
];
