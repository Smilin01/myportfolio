import { motion, AnimatePresence } from "framer-motion";
import { FaAws, FaDocker, FaPython, FaCode, FaServer, FaDatabase, FaBell, FaCog, FaCheckCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";
import { SiKubernetes, SiAnsible, SiJenkins, SiTerraform, SiGnubash } from "react-icons/si";
import { BiGitBranch, BiX, BiTimeFive, BiMoney } from "react-icons/bi";
import { BsFileEarmarkCode, BsArrowRight, BsGraphUp } from "react-icons/bs";

export default function ProjectArchitecture({ project, onClose }) {
    if (!project) return null;

    // Detailed Documentation Data
    const projectDocs = {
        1: {
            overview: "This project automates the provisioning of a secure, production-ready network environment on AWS. Using Python and the Boto3 SDK, it programmatically sets up a Virtual Private Cloud (VPC), subnets, routing, and EC2 compute resources. This shifts infrastructure management from manual \"ClickOps\" to code, ensuring reproducibility and speed.",
            problem: {
                title: "The Problem (Why I built this)",
                points: [
                    { title: "Manual Overhead", desc: "Manually configuring a VPC, attaching Internet Gateways, and setting up Route Tables via the AWS Console takes 15–20 minutes per environment." },
                    { title: "Human Error", desc: "It is easy to forget a step (e.g., enabling auto-assign public IP) or misconfigure a Security Group, leading to connectivity issues." },
                    { title: "Inconsistency", desc: "Development, Staging, and Production environments often drift apart because they were set up manually at different times." }
                ]
            },
            solution: {
                title: "The Solution",
                desc: "I implemented an Infrastructure as Code (IaC) solution using Python and AWS Boto3.",
                points: [
                    { title: "Automation", desc: "The script defines the exact state of the infrastructure, creating a complete environment in under 60 seconds." },
                    { title: "Error Handling", desc: "Integrated try-except blocks catch API errors immediately, preventing partial deployments." },
                    { title: "Tags & Organization", desc: "All resources are automatically tagged (e.g., Name: DevOps-Portfolio-VPC), making resource management and cost tracking easy." }
                ]
            },
            workflow: {
                title: "Technical Workflow (How it works)",
                steps: [
                    "SDK Initialization: The script initializes the Boto3 EC2 client for the us-east-1 region.",
                    "VPC Creation: Creates a VPC with CIDR 10.0.0.0/16.",
                    "Networking Setup: Creates and attaches an Internet Gateway, Public Subnet (10.0.1.0/24), and Route Table.",
                    "Security: Creates a Security Group allowing port 80 (HTTP) and 22 (SSH).",
                    "Compute: Launches an Ubuntu EC2 instance within the new subnet.",
                    "Validation: The script waits for the instance state to turn Running and prints the Public IP."
                ]
            },
            results: [
                { icon: BiTimeFive, title: "Efficiency", desc: "Reduced infrastructure provisioning time from 20 minutes to <1 minute." },
                { icon: FaCheckCircle, title: "Reliability", desc: "100% consistent environments across multiple deployments." }
            ]
        },
        2: {
            overview: "A fully serverless backend system that processes images in real-time. By leveraging AWS Lambda and S3 events, the system eliminates the need for always-on servers, scaling automatically from 1 to 10,000 requests without manual intervention.",
            problem: {
                title: "The Problem (Why I built this)",
                points: [
                    { title: "Cost Inefficiency", desc: "Running a dedicated EC2 instance to process occasional file uploads is expensive because you pay for idle time." },
                    { title: "Scalability", desc: "A traditional server crashes if 1,000 users upload images simultaneously unless complex load balancing is set up." },
                    { title: "Latency", desc: "Polling a database to check for new uploads introduces unnecessary delays." }
                ]
            },
            solution: {
                title: "The Solution",
                desc: "I designed an Event-Driven Architecture using AWS Lambda, S3, and SNS.",
                points: [
                    { title: "Trigger-Based", desc: "No servers run until a file is uploaded. The S3 PUT event triggers the code immediately." },
                    { title: "Serverless Logic", desc: "A Python Lambda function handles the metadata extraction and processing logic." },
                    { title: "Automated Notifications", desc: "Amazon SNS is integrated to alert administrators instantly upon success or failure." }
                ]
            },
            workflow: {
                title: "Technical Workflow (How it works)",
                steps: [
                    "Ingestion: A user uploads an image (JPG/PNG) to a designated S3 Bucket.",
                    "Trigger: S3 detects the upload and invokes the Lambda Function asynchronously.",
                    "Processing: The Lambda function retrieves file metadata and optionally resizes the image.",
                    "Notification: If successful, Lambda publishes a message to an SNS Topic which alerts the admin."
                ]
            },
            results: [
                { icon: BiMoney, title: "Cost Savings", desc: "Reduced operational costs by nearly 100% for low-traffic periods (Free Tier eligible)." },
                { icon: BsGraphUp, title: "Scalability", desc: "Handles sudden traffic spikes automatically without any configuration changes." }
            ]
        },
        3: {
            overview: "A containerized microservice deployment showcasing modern DevOps practices. This project involves Dockerizing a Python Flask application, automating node configuration with Ansible, and orchestrating high-availability deployment using Kubernetes (K8s).",
            problem: {
                title: "The Problem (Why I built this)",
                points: [
                    { title: "\"Works on My Machine\"", desc: "The application worked in development but failed in production due to missing dependencies and OS differences." },
                    { title: "Downtime", desc: "Updating the application required stopping the server, causing service interruptions." },
                    { title: "Manual Scaling", desc: "Handling increased load required manually SSH-ing into servers to start more instances." }
                ]
            },
            solution: {
                title: "The Solution",
                desc: "I implemented a Containerized & Orchestrated workflow.",
                points: [
                    { title: "Docker", desc: "Packaged the application and all dependencies into a lightweight image, ensuring it runs exactly the same everywhere." },
                    { title: "Kubernetes (K8s)", desc: "Managed the application lifecycle, enabling self-healing (restarting failed containers) and load balancing." },
                    { title: "Ansible", desc: "Automated the setup of the underlying servers (installing Docker, configuring networking) before the deployment." }
                ]
            },
            workflow: {
                title: "Technical Workflow (How it works)",
                steps: [
                    "Containerization: Built Docker image using slim Python image and pushed to Docker Hub.",
                    "Infrastructure Prep (Ansible): Connected to raw Linux servers and installed Docker/system updates.",
                    "Orchestration (Kubernetes): Defined Deployment (3 Replicas) and LoadBalancer Service.",
                    "Rolling Updates: Kubernetes updates image version without downtime by replacing pods one by one."
                ]
            },
            results: [
                { icon: FaCheckCircle, title: "High Availability", desc: "Achieved zero downtime during updates using K8s rolling deployments." },
                { icon: FaServer, title: "Portability", desc: "The application can now be deployed on any cloud provider or on-premise server." }
            ]
        }
    };

    const docData = projectDocs[project.id];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 1.5, delayChildren: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.8, type: "spring" }
        }
    };

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1, opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b-2 border-black flex justify-between items-center bg-gray-50 sticky top-0 z-20">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold">{project.title}</h2>
                            <p className="text-gray-600 mt-1 flex items-center gap-2">
                                <BsFileEarmarkCode /> Project Documentation
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-black hover:text-white rounded-full transition-colors border-2 border-transparent hover:border-black"
                        >
                            <BiX size={32} />
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6 lg:p-10 bg-slate-50 overflow-y-auto">

                        {/* 1. Overview */}
                        <section className="mb-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Project Overview
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {docData.overview}
                            </p>
                        </section>

                        {/* 2. The Problem */}
                        <section className="mb-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                                <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                {docData.problem.title}
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {docData.problem.points.map((point, idx) => (
                                    <div key={idx} className="bg-red-50 p-5 rounded-xl border border-red-100">
                                        <div className="text-red-500 mb-2"><FaExclamationTriangle size={24} /></div>
                                        <h4 className="font-bold text-red-900 mb-2">{point.title}</h4>
                                        <p className="text-sm text-red-800">{point.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. The Solution */}
                        <section className="mb-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                                <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                {docData.solution.title}
                            </h3>
                            <p className="mb-6 text-gray-700">{docData.solution.desc}</p>
                            <div className="grid md:grid-cols-3 gap-6">
                                {docData.solution.points.map((point, idx) => (
                                    <div key={idx} className="bg-green-50 p-5 rounded-xl border border-green-100">
                                        <div className="text-green-500 mb-2"><FaLightbulb size={24} /></div>
                                        <h4 className="font-bold text-green-900 mb-2">{point.title}</h4>
                                        <p className="text-sm text-green-800">{point.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Technical Workflow (With Visualization) */}
                        <section className="mb-10">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                {docData.workflow.title}
                            </h3>

                            {/* Animated Diagram Container */}
                            <div className="bg-white rounded-2xl border-2 border-black p-8 mb-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] min-h-[400px] relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 opacity-5" style={{
                                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}></div>

                                {/* Project 1: AWS Infrastructure Diagram */}
                                {project.id === 1 && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="relative w-full max-w-4xl flex justify-between items-center gap-4"
                                    >
                                        {/* Step 1: Script */}
                                        <motion.div variants={itemVariants} className="flex flex-col items-center z-10">
                                            <div className="w-20 h-20 bg-blue-100 border-2 border-blue-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                                                <FaPython size={40} className="text-blue-600" />
                                            </div>
                                            <p className="font-bold text-sm bg-white px-2 py-1 rounded border border-gray-200">Boto3 Script</p>
                                        </motion.div>

                                        {/* Arrow 1 */}
                                        <div className="flex-1 h-1 bg-gray-200 relative overflow-hidden rounded-full">
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-blue-500 w-1/2"
                                            />
                                        </div>

                                        {/* Step 2: VPC */}
                                        <motion.div variants={itemVariants} className="relative z-10 p-6 border-2 border-dashed border-orange-400 rounded-2xl bg-orange-50/50 w-96 h-64 flex flex-col items-center justify-center">
                                            <div className="absolute -top-3 left-4 bg-white px-2 text-orange-600 font-bold text-xs border border-orange-200 rounded">AWS VPC</div>

                                            <div className="flex gap-4 w-full justify-center">
                                                <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-white border-2 border-orange-500 rounded-lg flex items-center justify-center mb-2">
                                                        <FaServer size={30} className="text-orange-500" />
                                                    </div>
                                                    <span className="text-xs font-bold">Public Subnet</span>
                                                </motion.div>

                                                <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-white border-2 border-orange-500 rounded-lg flex items-center justify-center mb-2">
                                                        <FaDatabase size={30} className="text-orange-500" />
                                                    </div>
                                                    <span className="text-xs font-bold">Private Subnet</span>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Arrow 2 */}
                                        <div className="flex-1 h-1 bg-gray-200 relative overflow-hidden rounded-full">
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                                                className="absolute inset-0 bg-green-500 w-1/2"
                                            />
                                        </div>

                                        {/* Step 3: Monitoring */}
                                        <motion.div variants={itemVariants} className="flex flex-col items-center z-10">
                                            <div className="w-20 h-20 bg-green-100 border-2 border-green-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                                                <FaBell size={40} className="text-green-600" />
                                            </div>
                                            <p className="font-bold text-sm bg-white px-2 py-1 rounded border border-gray-200">CloudWatch</p>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Project 2: Serverless Pipeline Diagram */}
                                {project.id === 2 && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="relative w-full max-w-4xl flex flex-col items-center gap-8"
                                    >
                                        {/* Top Row */}
                                        <div className="flex justify-between w-full items-center">
                                            {/* User Upload */}
                                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-100 border-2 border-gray-500 rounded-xl flex items-center justify-center mb-2">
                                                    <BsFileEarmarkCode size={32} className="text-gray-600" />
                                                </div>
                                                <p className="text-xs font-bold">Image Upload</p>
                                            </motion.div>

                                            <BsArrowRight size={24} className="text-gray-400" />

                                            {/* S3 Bucket */}
                                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                <div className="w-20 h-20 bg-purple-100 border-2 border-purple-500 rounded-xl flex items-center justify-center mb-2">
                                                    <FaAws size={40} className="text-purple-600" />
                                                </div>
                                                <p className="text-xs font-bold">S3 Bucket</p>
                                            </motion.div>

                                            <BsArrowRight size={24} className="text-gray-400" />

                                            {/* Lambda Trigger */}
                                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                    className="w-24 h-24 bg-orange-100 border-2 border-orange-500 rounded-full flex items-center justify-center mb-2"
                                                >
                                                    <FaCog size={48} className="text-orange-600" />
                                                </motion.div>
                                                <p className="text-xs font-bold">Lambda Processing</p>
                                            </motion.div>
                                        </div>

                                        {/* Bottom Row */}
                                        <div className="flex justify-center w-full gap-16 items-center">
                                            {/* SNS */}
                                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                <div className="w-20 h-20 bg-pink-100 border-2 border-pink-500 rounded-xl flex items-center justify-center mb-2">
                                                    <FaBell size={40} className="text-pink-600" />
                                                </div>
                                                <p className="text-xs font-bold">SNS Topic</p>
                                            </motion.div>

                                            {/* End Users */}
                                            <motion.div variants={itemVariants} className="flex gap-4">
                                                <div className="px-4 py-2 bg-white border border-gray-300 rounded shadow text-sm">📧 Email</div>
                                                <div className="px-4 py-2 bg-white border border-gray-300 rounded shadow text-sm">📱 SMS</div>
                                            </motion.div>
                                        </div>

                                        {/* Connecting Lines (SVG) */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                                            <motion.path
                                                d="M 600 80 L 600 180 L 300 180"
                                                fill="none"
                                                stroke="#CBD5E1"
                                                strokeWidth="2"
                                                strokeDasharray="5,5"
                                                variants={lineVariants}
                                            />
                                        </svg>
                                    </motion.div>
                                )}

                                {/* Project 3: Kubernetes Diagram */}
                                {project.id === 3 && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="relative w-full max-w-4xl"
                                    >
                                        <div className="flex justify-between items-center mb-12">
                                            {/* Dev */}
                                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-800 text-white rounded-xl flex items-center justify-center mb-2">
                                                    <FaCode size={32} />
                                                </div>
                                                <p className="text-xs font-bold">Dev Commit</p>
                                            </motion.div>

                                            <div className="h-0.5 w-16 bg-gray-300"></div>

                                            {/* CI/CD */}
                                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-red-100 border-2 border-red-500 rounded-xl flex items-center justify-center mb-2">
                                                    <SiJenkins size={32} className="text-red-600" />
                                                </div>
                                                <p className="text-xs font-bold">Jenkins CI</p>
                                            </motion.div>

                                            <div className="h-0.5 w-16 bg-gray-300"></div>

                                            {/* Registry */}
                                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-blue-100 border-2 border-blue-500 rounded-xl flex items-center justify-center mb-2">
                                                    <FaDocker size={32} className="text-blue-600" />
                                                </div>
                                                <p className="text-xs font-bold">Docker Hub</p>
                                            </motion.div>
                                        </div>

                                        {/* K8s Cluster */}
                                        <motion.div variants={itemVariants} className="border-2 border-blue-500 rounded-2xl p-6 bg-blue-50 relative">
                                            <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">Kubernetes Cluster</div>

                                            <div className="flex justify-around items-center">
                                                {/* Master Node */}
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                                                        <SiKubernetes size={40} className="text-white" />
                                                    </div>
                                                    <p className="text-sm font-bold">Control Plane</p>
                                                </div>

                                                {/* Worker Nodes */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <motion.div
                                                            key={i}
                                                            variants={itemVariants}
                                                            className="w-24 h-24 bg-white border-2 border-blue-200 rounded-xl flex flex-col items-center justify-center shadow-sm"
                                                        >
                                                            <div className="flex gap-1 mb-2">
                                                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                                            </div>
                                                            <span className="text-xs text-gray-500">Worker Node {i}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Workflow Steps */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <ul className="space-y-3">
                                    {docData.workflow.steps.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1.5 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                {idx + 1}
                                            </div>
                                            <span className="text-gray-700">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* 5. Key Results */}
                        <section className="mb-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                                <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                                Key Results
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {docData.results.map((result, idx) => (
                                    <div key={idx} className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-lg shadow-sm text-purple-600">
                                            <result.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-purple-900 mb-1">{result.title}</h4>
                                            <p className="text-sm text-purple-800">{result.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer Actions */}
                        <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
                            <a href={project.code} className="flex-1 bg-black text-white py-4 rounded-xl font-bold text-center hover:bg-gray-800 transition-colors shadow-lg">
                                View Source Code
                            </a>
                            <button onClick={onClose} className="flex-1 bg-white border-2 border-black py-4 rounded-xl font-bold text-center hover:bg-gray-50 transition-colors">
                                Close Documentation
                            </button>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
