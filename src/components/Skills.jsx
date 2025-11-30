import { useState } from "react";
import { motion } from "framer-motion";
import { SiDocker, SiKubernetes, SiTerraform, SiGnubash, SiJenkins, SiGrafana, SiPython } from "react-icons/si";
import { FaAws } from "react-icons/fa";

export default function Skills() {
  const [skills] = useState([
    { id: 1, name: "Python", icon: <SiPython size={44} /> },
    { id: 2, name: "AWS", icon: <FaAws size={44} /> },
    { id: 3, name: "Docker", icon: <SiDocker size={44} /> },
    { id: 4, name: "Kubernetes", icon: <SiKubernetes size={44} /> },
    { id: 5, name: "Terraform", icon: <SiTerraform size={44} /> },
    { id: 6, name: "Bash", icon: <SiGnubash size={44} /> },
    { id: 7, name: "Jenkins", icon: <SiJenkins size={44} /> },
    { id: 8, name: "Grafana", icon: <SiGrafana size={44} /> },
  ]);

  return (
    <div className="mt-3 lg:mt-16 mb-32 lg:mb-48" id="toolbox">
      <div className="px-5 lg:px-28">

        <motion.h2
          className="text-2xl lg:text-4xl text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          The <span className="font-extrabold">Toolbox</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 text-lg font-bold mt-7 lg:mt-16 w-full place-items-center gap-y-6 lg:gap-y-12">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="bg-white border-2 border-black rounded-3xl p-3 h-36 w-36 lg:h-44 lg:w-44 flex flex-col items-center justify-center gap-3 shadow-[12px_12px_0_0_rgba(0,0,0,1)]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: skill.id * 0.06 }}
              viewport={{ once: true }}
            >
              {skill.icon}
              <p>{skill.name}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
