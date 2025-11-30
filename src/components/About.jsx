import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="px-5 lg:px-28 flex justify-between flex-col lg:flex-row mb-20 lg:mb-32" id="about">
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img src="/assets/about-me.svg" alt="About Me Illustration" />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0">
          About <span className="font-extrabold">Me</span>
        </h2>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-10">
          I'm a <strong>DevOps Engineer</strong> passionate about automating infrastructure and optimizing cloud workflows. I specialize in building resilient <strong>CI/CD pipelines</strong>, managing <strong>Kubernetes clusters</strong>, and implementing <strong>Infrastructure as Code (IaC)</strong> to ensure scalability and reliability.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          With a strong foundation in <strong>AWS, Docker, and Python</strong>, I focus on solving complex operational challenges. From reducing deployment times by <strong>70%</strong> to cutting cloud costs by <strong>$15K/month</strong>, my goal is to bridge the gap between development and operations with efficient, automated solutions.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          When I'm not writing <strong>Terraform</strong> scripts or debugging pipelines, I enjoy exploring new cloud-native technologies and contributing to the open-source community. Check out my work on <strong>GitHub</strong> or connect with me to discuss how we can streamline your infrastructure.
        </p>
      </motion.div>
    </div>
  );
}
