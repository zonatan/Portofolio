import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import Aurora from "./components/Aurora/Aurora";
import RotatingText from "./components/RotatingText/RotatingText";
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
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiLaravel,
} from "react-icons/si";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#030A0F] relative font-montserrat">
      {/* Hero Section - Improved */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute w-full h-full">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[39%] overflow-hidden">
          <div className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 w-[100%] h-[100%] rounded-t-[50%] bg-[#02121D]"></div>
        </div>

        <div className="container mx-auto h-full relative z-20 flex items-center px-4 sm:px-6">
          <div className="w-full">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              {/* Greeting */}
              <p className="text-gray-400 text-sm sm:text-base tracking-widest uppercase mb-2 sm:mb-3">
                Hello!
              </p>

              {/* Name */}
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-gray-300 leading-tight mb-4 sm:mb-6">
                I'm{" "}
                <span className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Zonatan Sihombing
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 leading-relaxed">
                A{" "}
                <span className="font-semibold text-white">
                  Full Stack Developer
                </span>{" "}
                passionate about building modern apps & web.
              </p>

              {/* Job Ready Section */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <span className="text-white text-lg sm:text-xl font-semibold whitespace-nowrap">
                  I'm Ready For
                </span>
                <RotatingText
                  texts={[
                    "App Development",
                    "Web Development",
                    "UI/UX Design",
                    "Cloud Engineering",
                  ]}
                  mainClassName="px-3 py-1 bg-gradient-to-r from-[#0575F4] to-[#00F260] text-black rounded-lg text-lg sm:text-xl font-bold shadow-md"
                  rotationInterval={2000}
                />
              </div>

              {/* Social Links */}
              <div className="flex gap-3 sm:gap-4">
                <SocialIcon
                  href="https://github.com/zonatan"
                  icon={<FaGithub />}
                  label="GitHub"
                  hoverClass="hover:text-white"
                />
                <SocialIcon
                  href="https://instagram.com/zonatansihombing_"
                  icon={<FaInstagram />}
                  label="Instagram"
                  hoverClass="hover:text-pink-500"
                />
                <SocialIcon
                  href="https://linkedin.com/in/zonatan"
                  icon={<FaLinkedin />}
                  label="LinkedIn"
                  hoverClass="hover:text-blue-500"
                />
                <SocialIcon
                  href="mailto:zonatan.sh03@gmail.com"
                  icon={<FaEnvelope />}
                  label="Email"
                  hoverClass="hover:text-red-500"
                />
              </div>
            </div>
          </div>

          {/* Lanyard - Hidden on mobile */}
          <div className="hidden md:flex md:col-span-6 justify-center items-center z-10 h-[400px] w-full">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <section className="py-12 sm:py-20 bg-[#02121D] text-white text-center relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Skills</h2>
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
            {[
              { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
              { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
              {
                name: "JavaScript",
                icon: <FaJs className="text-yellow-500" />,
              },
              {
                name: "PHP",
                icon: (
                  <Image
                    src="/assets/php-logo.png"
                    alt="PHP"
                    width={40}
                    height={40}
                  />
                ),
              },
              { name: "Python", icon: <FaPython className="text-blue-600" /> },
              { name: "React", icon: <FaReact className="text-blue-400" /> },
              { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
              { name: "Laravel", icon: <SiLaravel className="text-red-600" /> },
              {
                name: "Node.js",
                icon: <FaNodeJs className="text-green-500" />,
              },
              {
                name: "MongoDB",
                icon: <SiMongodb className="text-green-400" />,
              },
              {
                name: "PostgreSQL",
                icon: <SiPostgresql className="text-blue-500" />,
              },
              { name: "MySQL", icon: <FaDatabase className="text-blue-600" /> },
            ].map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 shadow-md rounded-lg text-sm sm:text-base md:text-lg font-semibold transition-all hover:scale-105"
              >
                <span className="text-xl sm:text-2xl md:text-3xl">
                  {skill.icon}
                </span>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-20 bg-[#040F1A] text-white text-center relative">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
            Certificates
          </h2>
          <div className="flex flex-wrap justify-center gap-6 px-6">
            {[1, 2, 3].map((cert) => (
              <div
                key={cert}
                className="w-full sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)] bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all"
              >
                <div className="relative aspect-[5.5/3] w-full">
                  <Image
                    src={`/assets/sertif/sertif${cert}.jpg`}
                    alt={`Certificate ${cert}`}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                  />
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold">
                  Certificate {cert}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-[#050F1B] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            My Projects
          </h2>

          {/* Project 1 */}
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-16 p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[7/3] rounded-lg overflow-hidden">
                <Image
                  src="/assets/projects/project2.png"
                  alt="E-commerce Website"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="lg:w-1/2 w-full space-y-4">
              <h3 className="text-2xl font-bold text-blue-400">
                Library Management System
              </h3>
              <p className="text-gray-300">
                Full featured library management system with online member
                registration, book management, and member management. Built with
                PHP, Java Script, and MySQL.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  PHP
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  Bootsrap
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  MySQL
                </span>
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://github.com/zonatan/Sistem-Perpustakaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaGithub className="text-xl" />
                  <span>View Code</span>
                </a>
                <a
                  href="https://github.com/zonatan/Sistem-Perpustakaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xl" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="flex flex-col lg:flex-row-reverse gap-8 items-center mb-16 p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[5.8/3] rounded-lg overflow-hidden">
                <Image
                  src="/assets/projects/project1.png"
                  alt="Task Management App"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="lg:w-1/2 w-full space-y-4">
              <h3 className="text-2xl font-bold text-blue-400">
                Motorbike Club
              </h3>
              <p className="text-gray-300">
                Just a static website created with HTML and CSS but produces an
                attractive UI/UX
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  HTML
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  CSS
                </span>
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://github.com/zonatan/ClubMotor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaGithub className="text-xl" />
                  <span>View Code</span>
                </a>
                <a
                  href="https://zonatan.github.io/ClubMotor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xl" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Add more projects as needed */}
        </div>
      </section>
    </div>
  );
}

// Social Icon Component for better reusability
function SocialIcon({
  href,
  icon,
  label,
  hoverClass,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  hoverClass: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-400 transition-colors duration-300 text-2xl ${hoverClass}`}
      aria-label={label}
    >
      {icon}
    </a>
  );
}
