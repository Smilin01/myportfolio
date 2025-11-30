import { motion } from "framer-motion";
import { FaAws, FaDocker, FaPython } from "react-icons/fa";
import { SiKubernetes, SiAnsible } from "react-icons/si";
import { BiGitBranch } from "react-icons/bi";
import { useState } from "react";
import ProjectArchitecture from "./ProjectArchitecture";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Automated Cloud Infrastructure Provisioning",
      description: "A Python automation tool using Boto3 to programmatically provision custom VPCs, subnets, and EC2 instances, reducing setup time by 90%.",
      keyFeature: "Self-healing infrastructure with CloudWatch alarms",
      techStack: ["Python", "Boto3", "AWS"],
      techIcons: [FaPython, FaPython, FaAws],
      colors: {
        primary: "#FF9900",
        secondary: "#3776AB",
        gradient: "from-orange-400 to-blue-500"
      },
      architecture: "#",
      code: "https://github.com/Smilin01/aws-infra-automation.git"
    },
    {
      id: 2,
      title: "Serverless Event-Driven Image Pipeline",
      description: "An event-driven backend that triggers image processing immediately upon S3 upload and notifies admins via SNS.",
      keyFeature: "Zero-server management and real-time execution",
      techStack: ["AWS Lambda", "S3", "SNS"],
      techIcons: [FaAws, FaAws, FaAws],
      colors: {
        primary: "#9333EA",
        secondary: "#3B82F6",
        gradient: "from-purple-500 to-blue-500"
      },
      architecture: "#",
      code: "https://github.com/Smilin01/serverless-image-pipeline.git"
    },
    {
      id: 3,
      title: "Microservices Deployment on Kubernetes",
      description: "Containerized Python microservices orchestrated on a K8s cluster. Uses Ansible for consistent node configuration.",
      keyFeature: "Auto-scaling and high availability setup",
      techStack: ["Docker", "Kubernetes", "Ansible"],
      techIcons: [FaDocker, SiKubernetes, SiAnsible],
      colors: {
        primary: "#06B6D4",
        secondary: "#14B8A6",
        gradient: "from-cyan-500 to-teal-500"
      },
      architecture: "#",
      code: "https://github.com/Smilin01/k8s-microservice-deployment.git"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-5 lg:px-28 relative overflow-hidden" id="projects">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-black text-white text-sm font-semibold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            💼 Featured Projects
          </motion.span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Real-World <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cloud infrastructure and automation projects that solve real problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -10,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 h-full flex flex-col transition-all duration-300 group-hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]">

                {/* 3D Isometric Illustration Area */}
                <div className="relative h-48 mb-6 rounded-2xl border-2 border-black overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.secondary}20)`
                }}>
                  {/* Project 1: AWS Infrastructure */}
                  {project.id === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* VPC Container */}
                      <motion.div
                        className="relative"
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Main VPC Box */}
                        <div className="relative w-32 h-32">
                          {/* Top face */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-black transform -skew-y-12 origin-bottom-left"></div>
                          {/* Left face */}
                          <div className="absolute top-8 left-0 w-16 h-24 bg-gradient-to-br from-orange-500 to-orange-600 border-2 border-black transform skew-y-12 origin-top-right"></div>
                          {/* Right face */}
                          <div className="absolute top-8 right-0 w-16 h-24 bg-gradient-to-br from-orange-300 to-orange-400 border-2 border-black transform -skew-y-12 origin-top-left"></div>

                          {/* EC2 Instances (small cubes) */}
                          <motion.div
                            className="absolute top-12 left-8 w-8 h-8"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-blue-400 border border-black transform -skew-y-12"></div>
                            <div className="absolute top-2 left-0 w-4 h-6 bg-blue-500 border border-black transform skew-y-12"></div>
                            <div className="absolute top-2 right-0 w-4 h-6 bg-blue-300 border border-black transform -skew-y-12"></div>
                          </motion.div>

                          {/* Database Cylinder */}
                          <motion.div
                            className="absolute top-12 right-8 w-10 h-12"
                            animate={{ rotateY: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="w-10 h-3 bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-black rounded-full"></div>
                            <div className="w-10 h-9 bg-gradient-to-r from-purple-500 to-purple-600 border-x-2 border-black"></div>
                            <div className="w-10 h-3 bg-gradient-to-r from-purple-600 to-purple-700 border-2 border-black rounded-full"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Project 2: Serverless Pipeline */}
                  {project.id === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      {/* S3 Bucket */}
                      <motion.div
                        className="relative w-16 h-16"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-black rounded-lg flex items-center justify-center">
                          <div className="text-2xl">📁</div>
                        </div>
                      </motion.div>

                      {/* Arrow */}
                      <motion.div
                        className="text-3xl"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>

                      {/* Lambda Gear */}
                      <motion.div
                        className="relative w-16 h-16"
                        animate={{
                          rotate: 360,
                          y: [0, -8, 0]
                        }}
                        transition={{
                          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                          y: { duration: 2.5, repeat: Infinity, delay: 0.3 }
                        }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-black rounded-lg flex items-center justify-center">
                          <div className="text-2xl">⚙️</div>
                        </div>
                      </motion.div>

                      {/* Arrow */}
                      <motion.div
                        className="text-3xl"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      >
                        →
                      </motion.div>

                      {/* SNS Envelope */}
                      <motion.div
                        className="relative w-16 h-16"
                        animate={{
                          y: [0, -8, 0],
                          x: [0, 5, 0]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 border-2 border-black rounded-lg flex items-center justify-center">
                          <div className="text-2xl">✉️</div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Project 3: Kubernetes */}
                  {project.id === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-40 h-40">
                        {/* Central K8s Wheel */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 border-2 border-black rounded-full flex items-center justify-center">
                            <SiKubernetes size={32} className="text-white" />
                          </div>
                        </motion.div>

                        {/* Orbiting Pods */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2"
                            style={{
                              transformOrigin: '0 0',
                            }}
                            animate={{
                              rotate: angle + 360,
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "linear",
                              delay: i * 0.1
                            }}
                          >
                            <div
                              className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 border-2 border-black"
                              style={{
                                transform: `translate(-5px, -5px) translateX(60px) rotate(-${angle}deg)`,
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                              }}
                            ></div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => {
                      const Icon = project.techIcons[i];
                      return (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 rounded-full border-2 border-black text-sm font-semibold flex items-center gap-1"
                          style={{
                            background: `linear-gradient(135deg, ${project.colors.primary}30, ${project.colors.secondary}30)`
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon size={14} style={{ color: project.colors.primary }} />
                          {tech}
                        </motion.span>
                      );
                    })}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Key Feature Badge */}
                  <motion.div
                    className="mb-4 px-3 py-2 rounded-xl border-2 border-black text-sm font-semibold text-center"
                    style={{
                      background: `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.secondary}20)`,
                      boxShadow: `0 0 20px ${project.colors.primary}40`
                    }}
                    whileHover={{
                      boxShadow: `0 0 30px ${project.colors.primary}60`,
                      scale: 1.02
                    }}
                  >
                    ⚡ {project.keyFeature}
                  </motion.div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 px-4 py-2 rounded-xl border-2 border-black font-semibold text-center text-sm text-white cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 0 20px ${project.colors.primary}80`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Architecture
                    </motion.button>
                    <motion.a
                      href={project.code}
                      className="flex-1 px-4 py-2 rounded-xl bg-white border-2 border-black font-semibold text-center text-sm flex items-center justify-center"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: '#f3f4f6'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BiGitBranch className="inline mr-1" />
                      See Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Modal */}
      <ProjectArchitecture
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
