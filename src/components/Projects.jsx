 
import { TbExternalLink } from "react-icons/tb";
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Automated Cloud Provisioning Tool",
    tech: ["Python", "Boto3"],
    description: "Auto-provisioning VPCs and EC2s with CloudWatch alerts.",
    mockup: "3D Desktop Monitor",
    display: "monitor",
    link: "#"
  },
  {
    id: 2,
    title: "Serverless Event-Driven Pipeline",
    tech: ["AWS Lambda", "S3"],
    description: "Real-time image processing triggered by S3 uploads.",
    mockup: "3D Mobile Phone",
    display: "phone",
    link: "#"
  },
  {
    id: 3,
    title: "Microservices on Kubernetes",
    tech: ["Kubernetes", "Helm", "Prometheus"],
    description: "Helm charts and Prometheus monitoring.",
    mockup: "3D Device/Container",
    display: "container",
    link: "#"
  }
];

export default function Projects() {
  return (
    <div className="bg-black px-5 lg:px-28 py-8 my-8 lg:py-16 lg:my-16" id="projects">
      <h2 className="text-2xl lg:text-4xl text-center text-white">
        Project <span className="font-extrabold">Showcase</span>
      </h2>

      <div className="lg:mt-16 mt-8 lg:space-y-16 space-y-8 lg:pb-6 pb-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex justify-between items-center flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 10, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-[500px] w-full">
              {project.display === "monitor" && (
                <div className="rounded-2xl border-2 border-black p-4 bg-white shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
                  <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 h-64 flex items-center justify-center">
                    <span className="font-bold">Inside monitor screen</span>
                  </div>
                  <div className="mx-auto mt-2 h-3 w-24 rounded-full bg-black"></div>
                </div>
              )}
              {project.display === "phone" && (
                <div className="rounded-[2rem] border-2 border-black p-3 bg-white shadow-[16px_16px_0_0_rgba(0,0,0,1)] w-72 mx-auto">
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-pink-500/20 to-purple-500/20 h-96 flex items-center justify-center">
                    <span className="font-bold">Inside phone screen</span>
                  </div>
                  <div className="mx-auto mt-2 h-2 w-16 rounded-full bg-black"></div>
                </div>
              )}
              {project.display === "container" && (
                <div className="rounded-2xl border-2 border-black p-4 bg-white shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
                  <div className="rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 h-64 flex items-center justify-center">
                    <span className="font-bold">3D Device/Container</span>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-1/2 lg:space-y-6 space-y-4">
              <h2 className="font-extrabold text-white mt-5 lg:mt-0 text-3xl lg:text-5xl">
                {String(project.id).padStart(2, "0")}
              </h2>
              <p className="font-bold text-white text-xl lg:text-3xl">{project.title}</p>

              <p className="font-light text-sm/6 lg:text-base text-[#71717A]">
                {project.description}
              </p>
              <p className="text-xs lg:text-sm text-[#a1a1aa]">{project.tech.join(", ")}</p>
              <a href={project.link} className="text-white mt-3 block" target="_blank" rel="noopener noreferrer">
                <TbExternalLink size={23} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
