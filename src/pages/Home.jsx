import { motion } from "framer-motion";
import { IoLogoLinkedin } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";
import { SiDocker, SiKubernetes, SiJenkins, SiPython, SiTerraform, SiAnsible, SiGit } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const devopsIcons = [
    {
      Icon: SiDocker,
      color: "#2496ED",
      name: "Docker",
      description: "Containerization platform for packaging applications"
    },
    {
      Icon: SiKubernetes,
      color: "#326CE5",
      name: "Kubernetes",
      description: "Container orchestration for scaling deployments"
    },
    {
      Icon: FaAws,
      color: "#FF9900",
      name: "AWS",
      description: "Cloud infrastructure and managed services"
    },
    {
      Icon: SiJenkins,
      color: "#D24939",
      name: "Jenkins",
      description: "CI/CD automation and build pipelines"
    },
    {
      Icon: SiPython,
      color: "#3776AB",
      name: "Python",
      description: "Automation scripts and infrastructure tools"
    },
    {
      Icon: SiTerraform,
      color: "#7B42BC",
      name: "Terraform",
      description: "Infrastructure as Code provisioning"
    },
    {
      Icon: SiAnsible,
      color: "#EE0000",
      name: "Ansible",
      description: "Configuration management and automation"
    },
    {
      Icon: SiGit,
      color: "#F05032",
      name: "Git",
      description: "Version control and source code management"
    },
  ];

  return (
    <div className="mt-20 min-h-[85vh] flex items-center" id="home">
      <div className="w-full px-5 lg:px-28 py-10">

        {/* Main Content Container - Side by Side Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Side - Content */}
          <motion.div
            className="w-full lg:w-1/2 order-1 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2, ease: "easeInOut" },
              },
            }}
          >
            <motion.h1
              className="text-3xl lg:text-5xl xl:text-6xl font-extrabold mb-4 lg:mb-6 text-center lg:text-left"
              style={{ fontFamily: "'Playfair Display', serif" }}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              Automating the Cloud, One Script at a Time.
            </motion.h1>

            <motion.p
              className="text-[#71717A] text-base lg:text-lg xl:text-xl mb-6 lg:mb-8 text-center lg:text-left"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              Hi, I&apos;m John Smilin. I build CI/CD pipelines and scalable cloud infrastructure.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4 text-base lg:text-xl mb-8 lg:mb-10"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <motion.span
                className="px-4 py-2 rounded-2xl bg-black text-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-semibold"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                DevOps Engineer
              </motion.span>
              <motion.span
                className="px-4 py-2 rounded-2xl bg-white text-black border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-semibold"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Python Developer
              </motion.span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-x-5 justify-center lg:justify-start"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <motion.a
                href="https://github.com/smilin01"
                className="bg-white p-3 lg:p-4 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <BsGithub className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/johnsmilin/"
                className="bg-white p-3 lg:p-4 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoLogoLinkedin className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Rotating Icons Circle */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center order-2 lg:order-2">
            <div className="relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] pointer-events-none">
              {devopsIcons.map((item, index) => {
                const totalIcons = devopsIcons.length;
                const startAngle = (index / totalIcons) * 360;
                const radiusMobile = 140;
                const fallDelay = index * 0.15;
                const rotationStartDelay = totalIcons * 0.15 + 0.5;
                const anyHovered = hoveredIcon !== null;

                return (
                  <motion.div
                    key={item.name}
                    className="absolute left-1/2 top-1/2"
                    initial={{
                      y: -400,
                      x: 0,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      y: {
                        delay: fallDelay,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                      },
                      opacity: {
                        delay: fallDelay,
                        duration: 0.3,
                      }
                    }}
                  >
                    <motion.div
                      className="absolute"
                      initial={{
                        rotate: startAngle,
                      }}
                      animate={{
                        rotate: anyHovered ? startAngle : startAngle + 360,
                      }}
                      transition={{
                        rotate: {
                          delay: rotationStartDelay,
                          duration: anyHovered ? 0 : 25,
                          repeat: anyHovered ? 0 : Infinity,
                          ease: "linear",
                        }
                      }}
                    >
                      <div
                        className="bg-white rounded-2xl border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] p-3 lg:p-4 pointer-events-auto cursor-pointer"
                        style={{
                          boxShadow: `6px 6px 0 0 ${item.color}40`,
                          transform: `translate(-50%, -50%) translate(${radiusMobile}px, 0)`,
                        }}
                        onMouseEnter={() => setHoveredIcon(item.name)}
                        onMouseLeave={() => setHoveredIcon(null)}
                      >
                        <motion.div
                          initial={{
                            rotate: -startAngle,
                          }}
                          animate={{
                            rotate: anyHovered ? -startAngle : -(startAngle + 360),
                          }}
                          transition={{
                            rotate: {
                              delay: rotationStartDelay,
                              duration: anyHovered ? 0 : 25,
                              repeat: anyHovered ? 0 : Infinity,
                              ease: "linear",
                            }
                          }}
                        >
                          <item.Icon
                            className="w-8 h-8 lg:w-10 lg:h-10"
                            style={{ color: item.color }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tooltip - Fixed Position Below Circle */}
            {hoveredIcon && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 bg-black text-white px-6 py-3 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-center"
              >
                <div
                  className="font-bold text-lg mb-1"
                  style={{ color: devopsIcons.find(i => i.name === hoveredIcon)?.color }}
                >
                  {hoveredIcon}
                </div>
                <div className="text-sm text-gray-300">
                  {devopsIcons.find(i => i.name === hoveredIcon)?.description}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
