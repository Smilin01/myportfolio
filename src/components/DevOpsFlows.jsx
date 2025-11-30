import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaAws, FaDocker, FaServer } from "react-icons/fa";
import { SiKubernetes, SiTerraform, SiJenkins, SiGithubactions } from "react-icons/si";
import { BiGitBranch, BiCodeBlock } from "react-icons/bi";

export default function DevOpsFlows() {
    const [activeFlow, setActiveFlow] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [terminalLines, setTerminalLines] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const flows = [
        {
            title: "CI/CD Pipeline",
            subtitle: "Reduced deployment time by 70%",
            icon: SiGithubactions,
            color: "#2088FF",
            steps: [
                {
                    name: "Source Control",
                    icon: BiGitBranch,
                    desc: "GitHub/GitLab",
                    commands: [
                        { type: "command", text: "$ git status" },
                        { type: "output", text: "On branch main" },
                        { type: "output", text: "Your branch is up to date with 'origin/main'" },
                        { type: "command", text: "$ git add ." },
                        { type: "command", text: "$ git commit -m 'feat: add new feature'" },
                        { type: "success", text: "✓ Committed successfully" },
                        { type: "command", text: "$ git push origin main" },
                        { type: "success", text: "✓ Pushed to remote repository" },
                    ]
                },
                {
                    name: "CI Pipeline",
                    icon: SiJenkins,
                    desc: "Build & Test",
                    commands: [
                        { type: "command", text: "$ jenkins build start" },
                        { type: "output", text: "Triggering CI/CD pipeline..." },
                        { type: "output", text: "Fetching latest code from repository..." },
                        { type: "success", text: "✓ Code fetched successfully" },
                        { type: "output", text: "Installing dependencies..." },
                        { type: "success", text: "✓ Dependencies installed" },
                        { type: "output", text: "Building application..." },
                        { type: "success", text: "✓ Build completed" },
                    ]
                },
                {
                    name: "Unit Testing",
                    icon: BiCodeBlock,
                    desc: "Automated Tests",
                    commands: [
                        { type: "command", text: "$ npm test" },
                        { type: "output", text: "Running test suites..." },
                        { type: "output", text: "Test Suites: 12 passed, 12 total" },
                        { type: "output", text: "Tests: 156 passed, 156 total" },
                        { type: "output", text: "Snapshots: 0 total" },
                        { type: "output", text: "Time: 8.234s" },
                        { type: "success", text: "✓ All tests passed" },
                        { type: "success", text: "✓ Coverage: 94.2%" },
                    ]
                },
                {
                    name: "Containerization",
                    icon: FaDocker,
                    desc: "Docker Build",
                    commands: [
                        { type: "command", text: "$ docker build -t myapp:latest ." },
                        { type: "output", text: "Sending build context to Docker daemon..." },
                        { type: "output", text: "Step 1/8 : FROM node:18-alpine" },
                        { type: "output", text: "Step 2/8 : WORKDIR /app" },
                        { type: "output", text: "Step 3/8 : COPY package*.json ./" },
                        { type: "success", text: "✓ Successfully built image" },
                        { type: "command", text: "$ docker push myapp:latest" },
                        { type: "success", text: "✓ Pushed to registry" },
                    ]
                },
                {
                    name: "Orchestration",
                    icon: SiKubernetes,
                    desc: "K8s Deploy",
                    commands: [
                        { type: "command", text: "$ kubectl apply -f deployment.yaml" },
                        { type: "output", text: "deployment.apps/myapp created" },
                        { type: "output", text: "service/myapp-service created" },
                        { type: "command", text: "$ kubectl get pods" },
                        { type: "output", text: "NAME                     READY   STATUS" },
                        { type: "output", text: "myapp-7d9f8c-abc12       1/1     Running" },
                        { type: "success", text: "✓ Deployment successful" },
                        { type: "emoji", text: "🚀 Application is live!" },
                    ]
                },
            ],
        },
        {
            title: "AWS Infrastructure",
            subtitle: "Saved $15K/month in cloud costs",
            icon: FaAws,
            color: "#FF9900",
            steps: [
                {
                    name: "VPC Setup",
                    icon: FaServer,
                    desc: "Network Config",
                    commands: [
                        { type: "command", text: "$ aws ec2 create-vpc --cidr-block 10.0.0.0/16" },
                        { type: "output", text: "Creating VPC..." },
                        { type: "success", text: "✓ VPC created: vpc-0abc123def456" },
                        { type: "command", text: "$ aws ec2 create-subnet --vpc-id vpc-0abc123" },
                        { type: "success", text: "✓ Subnet created" },
                        { type: "command", text: "$ aws ec2 create-internet-gateway" },
                        { type: "success", text: "✓ Internet Gateway attached" },
                    ]
                },
                {
                    name: "EC2 Instances",
                    icon: FaServer,
                    desc: "Compute",
                    commands: [
                        { type: "command", text: "$ aws ec2 run-instances --image-id ami-12345" },
                        { type: "output", text: "Launching EC2 instances..." },
                        { type: "output", text: "Instance Type: t3.medium" },
                        { type: "output", text: "Region: us-east-1" },
                        { type: "success", text: "✓ Instance i-0abc123 running" },
                        { type: "success", text: "✓ Instance i-0def456 running" },
                        { type: "success", text: "✓ 2 instances launched" },
                    ]
                },
                {
                    name: "Lambda Functions",
                    icon: FaAws,
                    desc: "Serverless",
                    commands: [
                        { type: "command", text: "$ aws lambda create-function --function-name myFunc" },
                        { type: "output", text: "Creating Lambda function..." },
                        { type: "output", text: "Runtime: python3.9" },
                        { type: "output", text: "Memory: 512 MB" },
                        { type: "success", text: "✓ Function created" },
                        { type: "command", text: "$ aws lambda invoke --function-name myFunc" },
                        { type: "success", text: "✓ Function executed successfully" },
                    ]
                },
                {
                    name: "SNS/SQS",
                    icon: FaAws,
                    desc: "Messaging",
                    commands: [
                        { type: "command", text: "$ aws sns create-topic --name myTopic" },
                        { type: "success", text: "✓ SNS topic created" },
                        { type: "command", text: "$ aws sqs create-queue --queue-name myQueue" },
                        { type: "success", text: "✓ SQS queue created" },
                        { type: "command", text: "$ aws sns subscribe --topic-arn arn:aws:sns..." },
                        { type: "success", text: "✓ Subscription confirmed" },
                    ]
                },
                {
                    name: "CloudWatch",
                    icon: FaAws,
                    desc: "Monitoring",
                    commands: [
                        { type: "command", text: "$ aws cloudwatch put-metric-alarm --alarm-name cpu-high" },
                        { type: "success", text: "✓ Alarm created" },
                        { type: "command", text: "$ aws logs create-log-group --log-group-name /aws/app" },
                        { type: "success", text: "✓ Log group created" },
                        { type: "output", text: "Monitoring metrics..." },
                        { type: "emoji", text: "🎯 Infrastructure ready!" },
                    ]
                },
            ],
        },
        {
            title: "Container Orchestration",
            subtitle: "Scaled to 10K+ concurrent users",
            icon: SiKubernetes,
            color: "#326CE5",
            steps: [
                {
                    name: "Docker Build",
                    icon: FaDocker,
                    desc: "Containerize",
                    commands: [
                        { type: "command", text: "$ docker build -t myapp:v1.0 ." },
                        { type: "output", text: "Sending build context..." },
                        { type: "output", text: "Step 1/10 : FROM alpine:latest" },
                        { type: "output", text: "Step 2/10 : RUN apk add --no-cache nodejs" },
                        { type: "output", text: "Step 3/10 : WORKDIR /app" },
                        { type: "success", text: "✓ Image built successfully" },
                        { type: "output", text: "Image size: 156 MB" },
                    ]
                },
                {
                    name: "Registry Push",
                    icon: FaDocker,
                    desc: "Image Store",
                    commands: [
                        { type: "command", text: "$ docker tag myapp:v1.0 registry.io/myapp:v1.0" },
                        { type: "success", text: "✓ Image tagged" },
                        { type: "command", text: "$ docker push registry.io/myapp:v1.0" },
                        { type: "output", text: "Pushing to registry..." },
                        { type: "output", text: "v1.0: digest: sha256:abc123..." },
                        { type: "success", text: "✓ Pushed to registry" },
                    ]
                },
                {
                    name: "K8s Deployment",
                    icon: SiKubernetes,
                    desc: "Deploy Pods",
                    commands: [
                        { type: "command", text: "$ kubectl apply -f deployment.yaml" },
                        { type: "output", text: "deployment.apps/myapp created" },
                        { type: "command", text: "$ kubectl rollout status deployment/myapp" },
                        { type: "output", text: "Waiting for deployment to roll out..." },
                        { type: "output", text: "deployment 'myapp' successfully rolled out" },
                        { type: "success", text: "✓ Pods: 3/3 running" },
                    ]
                },
                {
                    name: "Service Mesh",
                    icon: SiKubernetes,
                    desc: "Networking",
                    commands: [
                        { type: "command", text: "$ kubectl apply -f service.yaml" },
                        { type: "success", text: "✓ Service created" },
                        { type: "command", text: "$ kubectl apply -f ingress.yaml" },
                        { type: "success", text: "✓ Ingress configured" },
                        { type: "output", text: "External IP: 34.123.45.67" },
                        { type: "success", text: "✓ Service exposed on port 80" },
                    ]
                },
                {
                    name: "Auto Scaling",
                    icon: SiKubernetes,
                    desc: "HPA",
                    commands: [
                        { type: "command", text: "$ kubectl autoscale deployment myapp --min=3 --max=10" },
                        { type: "success", text: "✓ HPA created" },
                        { type: "output", text: "Current replicas: 3" },
                        { type: "output", text: "Target CPU: 70%" },
                        { type: "success", text: "✓ Auto-scaling enabled" },
                        { type: "emoji", text: "⚡ Cluster ready!" },
                    ]
                },
            ],
        },
        {
            title: "Infrastructure as Code",
            subtitle: "Automated 100% of infrastructure",
            icon: SiTerraform,
            color: "#7B42BC",
            steps: [
                {
                    name: "Define Resources",
                    icon: BiCodeBlock,
                    desc: "HCL Config",
                    commands: [
                        { type: "command", text: "$ cat main.tf" },
                        { type: "output", text: "resource 'aws_instance' 'web' {" },
                        { type: "output", text: "  ami           = 'ami-12345'" },
                        { type: "output", text: "  instance_type = 't3.medium'" },
                        { type: "output", text: "}" },
                        { type: "success", text: "✓ Configuration defined" },
                    ]
                },
                {
                    name: "Plan Changes",
                    icon: SiTerraform,
                    desc: "Preview",
                    commands: [
                        { type: "command", text: "$ terraform plan" },
                        { type: "output", text: "Terraform will perform the following actions:" },
                        { type: "output", text: "+ aws_instance.web" },
                        { type: "output", text: "+ aws_security_group.allow_http" },
                        { type: "output", text: "Plan: 15 to add, 0 to change, 0 to destroy" },
                        { type: "success", text: "✓ Plan generated" },
                    ]
                },
                {
                    name: "Apply Config",
                    icon: SiTerraform,
                    desc: "Provision",
                    commands: [
                        { type: "command", text: "$ terraform apply -auto-approve" },
                        { type: "output", text: "Applying changes..." },
                        { type: "output", text: "aws_vpc.main: Creating..." },
                        { type: "output", text: "aws_subnet.public: Creating..." },
                        { type: "output", text: "aws_instance.web: Creating..." },
                        { type: "success", text: "✓ Apply complete! Resources: 15 added" },
                    ]
                },
                {
                    name: "State Management",
                    icon: SiTerraform,
                    desc: "Track State",
                    commands: [
                        { type: "command", text: "$ terraform state list" },
                        { type: "output", text: "aws_instance.web" },
                        { type: "output", text: "aws_security_group.allow_http" },
                        { type: "output", text: "aws_vpc.main" },
                        { type: "command", text: "$ terraform state show aws_instance.web" },
                        { type: "success", text: "✓ State synchronized" },
                    ]
                },
                {
                    name: "Destroy/Update",
                    icon: SiTerraform,
                    desc: "Lifecycle",
                    commands: [
                        { type: "command", text: "$ terraform plan -destroy" },
                        { type: "output", text: "Plan: 0 to add, 0 to change, 15 to destroy" },
                        { type: "output", text: "Resources managed: 15" },
                        { type: "output", text: "State file: terraform.tfstate" },
                        { type: "success", text: "✓ Infrastructure managed" },
                        { type: "emoji", text: "📦 State saved remotely" },
                    ]
                },
            ],
        },
    ];

    // Auto-play terminal animation with typing effect for commands
    useEffect(() => {
        setTerminalLines([]);
        setIsTyping(false);

        const currentCommands = flows[activeFlow]?.steps[activeStep]?.commands;
        if (!currentCommands) return;

        let lineIndex = 0;
        let timeoutIds = [];
        let currentTypingText = '';

        const typeCommand = (text, callback) => {
            let charIndex = 0;
            currentTypingText = '';

            const typeChar = () => {
                if (charIndex < text.length) {
                    currentTypingText += text[charIndex];
                    setTerminalLines(prev => {
                        const newLines = [...prev];
                        if (newLines.length > 0 && newLines[newLines.length - 1].isTyping) {
                            newLines[newLines.length - 1] = {
                                type: 'command',
                                text: currentTypingText,
                                isTyping: true
                            };
                        } else {
                            newLines.push({
                                type: 'command',
                                text: currentTypingText,
                                isTyping: true
                            });
                        }
                        return newLines;
                    });
                    charIndex++;
                    const timeout = setTimeout(typeChar, 50); // 50ms per character
                    timeoutIds.push(timeout);
                } else {
                    // Finish typing
                    setTerminalLines(prev => {
                        const newLines = [...prev];
                        if (newLines.length > 0 && newLines[newLines.length - 1].isTyping) {
                            newLines[newLines.length - 1] = {
                                type: 'command',
                                text: text,
                                isTyping: false
                            };
                        }
                        return newLines;
                    });
                    setIsTyping(false);
                    const timeout = setTimeout(callback, 300);
                    timeoutIds.push(timeout);
                }
            };

            setIsTyping(true);
            typeChar();
        };

        const showNextLine = () => {
            if (lineIndex < currentCommands.length) {
                const currentLine = currentCommands[lineIndex];

                if (currentLine.type === 'command') {
                    // Type command character by character
                    typeCommand(currentLine.text, () => {
                        lineIndex++;
                        const timeout = setTimeout(showNextLine, 400);
                        timeoutIds.push(timeout);
                    });
                } else {
                    // Show output/success lines instantly
                    setTerminalLines(prev => [...prev, currentLine]);
                    lineIndex++;
                    const timeout = setTimeout(
                        showNextLine,
                        currentLine.type === 'success' ? 300 : 200
                    );
                    timeoutIds.push(timeout);
                }
            }
        };

        showNextLine();

        // Cleanup function to clear all timeouts
        return () => {
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, [activeStep, activeFlow]);

    const FlowIcon = flows[activeFlow].icon;

    return (
        <div className="min-h-screen pt-32 pb-20 px-5 lg:px-28 relative overflow-hidden" id="devops">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}></div>
            </div>

            {/* Floating Dots Animation */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-black rounded-full opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

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
                        ⚡ DevOps Engineering
                    </motion.span>
                    <h2 className="text-4xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        How I <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Automate</span> & Solve
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Real-world solutions I've implemented to streamline deployments, reduce costs, and scale infrastructure
                    </p>
                </motion.div>

                {/* Flow Selector Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {flows.map((flow, index) => {
                        const TabIcon = flow.icon;
                        return (
                            <motion.button
                                key={index}
                                onClick={() => {
                                    setActiveFlow(index);
                                    setActiveStep(0);
                                }}
                                className={`px-6 py-3 rounded-2xl border-2 border-black font-semibold transition-all ${activeFlow === index
                                        ? 'bg-black text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                                        : 'bg-white text-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]'
                                    }`}
                                whileHover={{ scale: 1.05, rotate: activeFlow === index ? 0 : -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <TabIcon className="inline-block mr-2" />
                                {flow.title}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Active Flow Display */}
                <motion.div
                    key={activeFlow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-12"
                >
                    {/* Left Side - Flow Steps */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="p-4 rounded-2xl border-2 border-black"
                                    style={{ backgroundColor: `${flows[activeFlow].color}20` }}
                                >
                                    <FlowIcon size={32} style={{ color: flows[activeFlow].color }} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{flows[activeFlow].title}</h3>
                                    <p className="text-gray-600">{flows[activeFlow].subtitle}</p>
                                </div>
                            </div>

                            {/* Flow Steps */}
                            <div className="space-y-4">
                                {flows[activeFlow].steps.map((step, idx) => {
                                    const StepIcon = step.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            onClick={() => setActiveStep(idx)}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all group cursor-pointer ${activeStep === idx
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-gray-50 border-gray-200 hover:border-black'
                                                }`}
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center group-hover:scale-110 transition-transform ${activeStep === idx ? 'bg-white' : 'bg-white'
                                                }`}>
                                                <StepIcon size={24} style={{ color: flows[activeFlow].color }} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-semibold text-lg ${activeStep === idx ? 'text-white' : 'text-black'}`}>{step.name}</h4>
                                                <p className={`text-sm ${activeStep === idx ? 'text-gray-300' : 'text-gray-600'}`}>{step.desc}</p>
                                            </div>
                                            <div className={`text-2xl font-bold ${activeStep === idx ? 'text-gray-400' : 'text-gray-300'}`}>
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Terminal Mockup */}
                    <div className="flex items-start">
                        <motion.div
                            className="w-full"
                            key={`${activeFlow}-${activeStep}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Terminal Window */}
                            <div className="bg-gray-900 rounded-2xl border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
                                {/* Terminal Header */}
                                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b-2 border-black">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="ml-4 text-gray-400 text-sm font-mono">
                                        terminal — {flows[activeFlow].steps[activeStep].name.toLowerCase().replace(/ /g, '-')}
                                    </span>
                                </div>

                                {/* Terminal Content */}
                                <div className="p-6 font-mono text-sm min-h-[400px]">
                                    {terminalLines.map((line, idx) => (
                                        <motion.div
                                            key={`${activeFlow}-${activeStep}-${idx}`}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className={`mb-2 ${line?.type === 'command' ? 'text-green-400 font-semibold' :
                                                    line?.type === 'success' ? 'text-blue-400' :
                                                        line?.type === 'emoji' ? 'text-yellow-400 font-bold text-lg' :
                                                            'text-gray-300'
                                                }`}
                                        >
                                            {line?.text || ''}
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <motion.span
                                            className="inline-block w-2 h-4 bg-green-400 ml-1"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* 3D Mockup Effect */}
                            <motion.div
                                className="mt-8 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-sm font-semibold">SYSTEM_STATUS: ONLINE</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
