"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lanyard from "./components/Lanyard/Lanyard";
import {
  FaUserGraduate,
  FaCode,
  FaChartLine,
  FaRobot,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";
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
  useAnimation,
} from "framer-motion";
import { useInView } from "react-intersection-observer";

// AnimatedText Component
const AnimatedText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// NavLink Component
const NavLink = ({
  href,
  active,
  children,
  label,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <a
      href={href}
      className={`relative p-2 rounded-full transition-colors duration-300 flex flex-col items-center ${
        active
          ? "text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-400"
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          active ? "bg-blue-100 dark:bg-blue-900/50" : ""
        }`}
      >
        {children}
      </div>
      <span className={`text-xs mt-1 ${active ? "font-medium" : ""}`}>
        {label}
      </span>
    </a>
  );
};

// AnimatedFeatureCard Component
const AnimatedFeatureCard = ({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      whileHover={{ y: -5 }}
      className="flex items-start gap-4 p-4 rounded-xl bg-opacity-20 dark:bg-opacity-20 backdrop-blur-sm"
      style={{
        backgroundColor: `${color}20`,
      }}
    >
      <div
        className={`p-3 rounded-full ${color} bg-opacity-20 dark:bg-opacity-20`}
      >
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-gray-200">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      const isDark = savedMode !== null ? savedMode === "true" : true;
      setDarkMode(isDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode === null) return;
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeSection, setActiveSection] = useState("home");
  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({
    threshold:
      typeof window !== "undefined" && window.innerWidth < 640 ? 0.1 : 0.3,
  });
  const [certificatesRef, certificatesInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (homeInView) setActiveSection("home");
    else if (aboutInView) setActiveSection("about");
    else if (skillsInView) setActiveSection("skills");
    else if (projectsInView) setActiveSection("projects");
    else if (certificatesInView) setActiveSection("certificates");
    else if (contactInView) setActiveSection("contact");
  }, [
    homeInView,
    aboutInView,
    skillsInView,
    projectsInView,
    certificatesInView,
    contactInView,
  ]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-md">
          <div className="flex items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-2 py-1 rounded-full shadow-xl border border-gray-300/50 dark:border-gray-600/50">
            <NavLink
              href="#home"
              active={activeSection === "home"}
              label="Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </NavLink>
            <NavLink
              href="#about"
              active={activeSection === "about"}
              label="About"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </NavLink>
            <NavLink
              href="#skills"
              active={activeSection === "skills"}
              label="Skills"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </NavLink>
            <NavLink
              href="#projects"
              active={activeSection === "projects"}
              label="Projects"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </NavLink>
            <NavLink
              href="#certificates"
              active={activeSection === "certificates"}
              label="Certificates"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2l4-4M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            </NavLink>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                activeSection === "theme"
                  ? "bg-blue-100 dark:bg-blue-900/50"
                  : "bg-transparent"
              }`}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="text-yellow-400"
                  >
                    <FaMoon className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="text-indigo-500"
                  >
                    <FaSun className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

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

            <div className="hidden lg:flex lg:w-1/2 justify-center items-center h-screen ">
              <div className="relative w-full h-full">
                <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
              </div>
            </div>
          </div>

          <TechBubbles />
        </section>

        <section
          id="about"
          ref={aboutRef}
          className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-900/30 blur-3xl opacity-40"
            animate={{
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-200 dark:bg-purple-900/30 blur-3xl opacity-40"
            animate={{
              x: [0, -20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <div className="container mx-auto px-6 relative z-10">
            <SectionHeader
              title="About Me"
              subtitle="Get to know the person behind the code"
            />

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/3 flex justify-center relative"
              >
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-xl">
                  <Image
                    src="/assets/profile.jpg"
                    alt="Zonatan Sihombing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <motion.div
                  className="absolute -top-5 -left-5 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <FaPython className="text-blue-500 text-xl" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                >
                  <SiLaravel className="text-red-600 text-xl" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-2/3 space-y-6"
              >
                <AnimatedText
                  text="Full Stack Developer & Data Enthusiast"
                  className="text-2xl font-bold text-gray-900 dark:text-gray-200"
                />

                <motion.p
                  className="text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  I'm an active Informatics Engineering student passionate about
                  Web Development, Data Analysis, and Machine Learning. I
                  specialize in creating modern, responsive websites while
                  exploring how data and AI can drive meaningful solutions.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <AnimatedFeatureCard
                    icon={<FaUserGraduate className="text-blue-500 text-xl" />}
                    title="Education"
                    description="Informatics Engineering Student at Manado State University"
                    color="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                  />

                  <AnimatedFeatureCard
                    icon={<FaCode className="text-purple-500 text-xl" />}
                    title="Web Development"
                    description="Building functional, modern websites with clean code"
                    color="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400"
                  />

                  <AnimatedFeatureCard
                    icon={<FaChartLine className="text-green-500 text-xl" />}
                    title="Data Analysis"
                    description="Extracting insights from data to drive decisions"
                    color="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                  />

                  <AnimatedFeatureCard
                    icon={<FaRobot className="text-orange-500 text-xl" />}
                    title="Machine Learning"
                    description="Exploring AI to automate processes and recognize patterns"
                    color="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
                  />
                </div>

                <motion.div
                  className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border border-blue-100 dark:border-gray-700 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-3 -right-3 text-yellow-400 dark:text-yellow-300 opacity-20">
                    <FaLightbulb className="text-6xl" />
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="text-pink-500 dark:text-pink-400">
                      <FaHeart className="text-xl" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      I believe technology should create positive social impact.
                      That's why I'm passionate about projects that combine
                      technical challenge with real-world value.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

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
              {(showAllProjects ? projects : projects.slice(0, 4)).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                {showAllProjects ? "Show less" : "Show More Projects"}
              </button>
            </motion.div>
          </div>
        </section>

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
            <span>View</span>
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
            left: `${26 + index * 8}%`,
            top: `${80 + index * -0.1}%`,
          }}
          aria-label={tech.name}
        >
          <div className="text-2xl">{tech.icon}</div>
        </motion.div>
      ))}
    </>
  );
}

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
    id: 6,
    title: "Learning Management and Attendance System Using QR Code",
    description:
      "QR Code-Based LMS and Attendance System is a web-based application developed to enhance the efficiency of classroom management and student monitoring. The system integrates a Learning Management System (LMS) with a QR code-based attendance feature, allowing students to mark their presence by scanning a unique QR code during class sessions.Once a student successfully checks in, the system automatically sends an email notification to the student's parent or guardian, informing them of the attendance. This feature improves transparency and strengthens communication between the school and parents.Teachers can also manage class schedules, share learning materials, and monitor student progress within a single platform. With real-time attendance tracking and automated email alerts, this system offers a smart and reliable solution for modern educational environments.",
    technologies: ["Web Development","UI/UX Design"],
    githubLink: "https://github.com/bryanwalujan/Smk2_fix",
    demoLink: "https://github.com/bryanwalujan/Smk2_fix",
  },
  {
    id: 2,
    title: "Library Management System",
    description:
      "Comprehensive library management solution with online member registration, book inventory, and lending system. Features include real-time availability checks, automated reminders, and detailed reporting.",
    technologies: ["Web Development"],
    githubLink: "https://github.com/zonatan/Sistem-Perpustakaan",
    demoLink: "https://github.com/zonatan/Sistem-Perpustakaan",
  },
  {
    id: 4,
    title: "Church Mentoring Website",
    description:
      "This is the website of the GSJA church mentoring system in Indonesia, where on this website there are pages of church networks and workshops carried out by the church network throughout Indonesia which is divided into 5 regions.",
    technologies: ["Website Development", "UI/UX Design"],
    githubLink: "https://github.com/bryanwalujan/website_gereja",
    demoLink: "https://kingdomexpansion.id/",
  },
  {
    id: 5,
    title: "AI Major Recommendation System",
    description:
      "An AI-based college major recommendation system that helps students determine the optimal choice of major based on personality, interests, and abilities using the Decision Tree algorithm.",
    technologies: ["Website Development", "Machine Learning"],
    githubLink: "https://github.com/zonatan/Rekomendasi-Jurusan",
    demoLink: "https://github.com/zonatan/Rekomendasi-Jurusan",
  },
  {
    id: 3,
    title: "Company Portfolio",
    description:
      "Professional business portfolio website with modern design aesthetics. Features services showcase, team profiles, client testimonials, and contact forms. Built with performance and SEO best practices in mind.",
    technologies: ["UI/UX Design"],
    githubLink: "https://github.com/zonatan/company-portfolio",
    demoLink: "https://zonatan.github.io/company-portfolio/",
  },
  {
    id: 1,
    title: "Motorbike Club Website",
    description:
      "Modern static website for a motorcycle enthusiast club featuring responsive design, smooth animations, and clean UI. Showcases events, member galleries, and club information with an engaging user experience.",
    technologies: ["UI/UX Design"],
    githubLink: "https://github.com/zonatan/ClubMotor",
    demoLink: "https://zonatan.github.io/ClubMotor/",
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