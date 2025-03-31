"use client";

import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ChevronDown,
  Code2,
  Server,
  PenToolIcon as Tool,
  Languages,
  Terminal,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  MessageSquare,
  X,
  User,
} from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeProvider } from "@/components/theme-provider";
import { useMobile } from "@/hooks/use-mobile";
import Particles from "@/components/particles";
import ChatBot from "@/components/chat-bot";
import AnimatedText from "@/components/animated-text";
import HeroBackground from "@/components/hero-background";
import { FloatingNav } from "@/components/floating-nav";
import { TextRevealCard } from "@/components/text-reveal-card";
import { HoverEffect } from "@/components/card-hover-effect";
import { CardBody } from "@/components/3d-card";
// Import the ProfessionalGreeting component
import ProfessionalGreeting from "@/components/professional-greeting";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showChatbot, setShowChatbot] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const skills = {
    languages: ["JavaScript"],
    frontend: ["React", "HTML5", "CSS3", "Bootstrap"],
    backend: ["Node.js", "Express", "MongoDB"],
    tools: ["Git", "VS Code", "GitHub", "AWS"],
  };

  const certifications = [
    {
      title: "MERN Stack Development",
      organization: "GUVI (IIT-M Incubated)",
      date: "August 30, 2023",
      description:
        "Full Stack Development certification with focus on MongoDB, Express, React, and Node.js",
      image: "./Images/Full_Stack_certification.png",
    },
    {
      title: "AI India 2.0",
      organization: "GUVI",
      date: "August 15, 2023",
      description:
        "Comprehensive program covering artificial intelligence fundamentals and applications",
      image: "./Images/AI_certification.png",
    },
    {
      title: "Web Designing",
      organization: "Besant Technologies",
      date: "August 20, 2022",
      description:
        "Advanced web design principles and modern frontend development techniques",
      image: "./Images/Web_designing_certification.png",
    },
  ];

  const projects = [
    {
      title: "COMFORT-PATH",
      description:
        "E-commerce platform offering a wide range of products with secure checkout, providing a seamless shopping experience",
      image: "./Images/comfort-path1.jpg",
      github:
        "https://github.com/Arun-SoftwareDeveloper/-Comfort-Path-e-commerce-",
      live: "https://poetic-kleicha-bb5e09.netlify.app/",
      tech: ["React", "Node.js", "MongoDB", "Express"],
    },
    {
      title: "CRUD Application",
      description:
        "Full-stack MERN application with complete CRUD operations and real-time updates",
      image: "./Images/Url_Shortening.png",
      github: "https://github.com/Arun-SoftwareDeveloper/Mern-Crud",
      live: "https://scintillating-madeleine-57e916.netlify.app/",
      tech: ["React", "Express", "MongoDB", "Node.js"],
    },
    {
      title: "Tic Tac Toe",
      description:
        "Interactive game built with React and modern design principles, featuring AI opponent",
      image: "./Images/Tic_Tac_Toe2.png",
      github: "https://github.com/Arun-SoftwareDeveloper/-TIC-TAC-TOE-",
      live: "https://main--glowing-souffle-5649f7.netlify.app/",
      tech: ["React", "CSS3", "JavaScript"],
    },
  ];

  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <Terminal className="h-4 w-4" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      name: "Certifications",
      link: "#certifications",
      icon: <Award className="h-4 w-4" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  const projectCards = projects.map((project) => ({
    title: project.title,
    description: project.description,
    icon: (
      <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  }));

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      if (isMobile) {
        setMenuOpen(false);
      }
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Particles className="absolute inset-0" quantity={100} />
        </div>

        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary transform-none z-50"
          style={{ scaleX }}
        />

        {/* Navigation */}
        <nav className="fixed w-full bg-background/80 backdrop-blur-md z-40 border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <Terminal className="text-primary h-8 w-8" />
                <span className="text-2xl font-bold">
                  <span className="text-primary">AR</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-foreground">dev</span>
                </span>
              </motion.div>

              {isMobile ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {menuOpen ? (
                      <>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </>
                    ) : (
                      <>
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                      </>
                    )}
                  </svg>
                </Button>
              ) : (
                <div className="hidden md:flex space-x-1">
                  {[
                    "home",
                    "about",
                    "skills",
                    "projects",
                    "certifications",
                    "contact",
                  ].map((item) => (
                    <Button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      variant={activeSection === item ? "default" : "ghost"}
                      className="capitalize"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobile && menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-background/95 backdrop-blur-md border-b border-border"
              >
                <div className="container mx-auto px-6 py-4 flex flex-col space-y-2">
                  {[
                    "home",
                    "about",
                    "skills",
                    "projects",
                    "certifications",
                    "contact",
                  ].map((item) => (
                    <Button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      variant={activeSection === item ? "default" : "ghost"}
                      className="justify-start capitalize"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Floating Navigation for Mobile */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <FloatingNav navItems={navItems} defaultIndex={1} />
        </div>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
        >
          <HeroBackground />

          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/0 via-primary/5 to-background/10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 text-center relative z-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <Avatar className="h-24 w-24 border-4 border-primary/50">
                  <AvatarImage src="/profile-image.webp" alt="Arun" />
                  <AvatarFallback className="text-3xl">AR</AvatarFallback>
                </Avatar>
              </div>
            </motion.div>

            <div className="mb-8">
              <AnimatedText
                text="Hello, I'm Arun"
                className="text-5xl md:text-7xl font-bold"
                highlightClassName="text-primary"
                highlightIndices={[10, 11, 12, 13]}
              />
              <ProfessionalGreeting className="mb-6" />
            </div>

            <motion.div
              className="text-xl md:text-2xl mb-4 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TextRevealCard
                text="Associate Software Engineer"
                revealText="Full Stack Developer"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>

            <motion.div
              className="flex justify-center space-x-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="mailto:arunramasamy46@gmail.com"
                className="bg-background/20 backdrop-blur-sm p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                target="blank"
              >
                <Mail size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/arun-ramasamy-033544247/"
                className="bg-background/20 backdrop-blur-sm p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                target="blank"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/Arun-SoftwareDeveloper"
                className="bg-background/20 backdrop-blur-sm p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                target="blank"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1N2C4V3hEBKVwYzZI87ejH8f3AGsj0eiT/view"
                className="bg-background/20 backdrop-blur-sm p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                target="blank"
              >
                <FileText size={24} />
              </motion.a>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mt-16"
            >
              <ChevronDown
                size={24}
                className="mx-auto text-muted-foreground"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Split Education & Experience Section */}
        <section id="about" className="py-20 bg-muted/30 relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 rounded-full bg-primary/20">
                    <GraduationCap className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Education</h3>
                </div>
                <CardBody className="w-full">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 w-full">
                    <CardHeader>
                      <CardTitle>BSc, Information Technology</CardTitle>
                      <p className="text-muted-foreground">
                        Devanga Arts and Science College
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2019 - 2022
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "76%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>CGPA: 7.6</span>
                          <span className="text-primary">76%</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <motion.li
                          className="flex items-center space-x-2 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>Advanced Programming Concepts</span>
                        </motion.li>
                        <motion.li
                          className="flex items-center space-x-2 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>Database Management Systems</span>
                        </motion.li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardBody>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Briefcase className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Experience</h3>
                </div>
                <CardBody className="w-full">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 w-full">
                    <CardHeader>
                      <CardTitle>Associate Software Engineer</CardTitle>
                      <p className="text-muted-foreground">
                        Resulticks Edge Solutiom Private Limited
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2024 - Present
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "90%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>Progress</span>
                          <span className="text-primary">90%</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <motion.li
                          className="flex items-center space-x-2 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>Frontend Development in React JS</span>
                        </motion.li>
                        <motion.li
                          className="flex items-center space-x-2 text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>API Integration and Demo work flows.</span>
                        </motion.li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardBody>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-2 rounded-full bg-primary/20">
                <Code2 className="text-primary h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold">Skills & Technologies</h2>
            </motion.div>

            <Tabs defaultValue="languages" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger
                    value="languages"
                    className="flex items-center gap-2"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline">Languages</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="frontend"
                    className="flex items-center gap-2"
                  >
                    <Code2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Frontend</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="backend"
                    className="flex items-center gap-2"
                  >
                    <Server className="h-4 w-4" />
                    <span className="hidden sm:inline">Backend</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    className="flex items-center gap-2"
                  >
                    <Tool className="h-4 w-4" />
                    <span className="hidden sm:inline">Tools</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {Object.entries(skills).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                        className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          {category === "languages" && (
                            <Languages className="text-primary h-6 w-6" />
                          )}
                          {category === "frontend" && (
                            <Code2 className="text-primary h-6 w-6" />
                          )}
                          {category === "backend" && (
                            <Server className="text-primary h-6 w-6" />
                          )}
                          {category === "tools" && (
                            <Tool className="text-primary h-6 w-6" />
                          )}
                        </div>
                        <h3 className="font-medium">{item}</h3>
                        <motion.div
                          className="w-12 h-1 bg-primary/50 rounded-full mt-2"
                          initial={{ width: 0 }}
                          whileInView={{ width: "3rem" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-muted/30 relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-2 rounded-full bg-primary/20">
                <Terminal className="text-primary h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold">Featured Projects</h2>
            </motion.div>

            {/* <HoverEffect items={projectCards} /> */}

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full flex flex-col hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                      <motion.div
                        className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 0.2 }}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto flex space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={project.github}
                          className="flex items-center justify-center gap-2"
                        >
                          <Github size={16} />
                          <span>Code</span>
                        </a>
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={project.live}
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-2 rounded-full bg-primary/20">
                <Award className="text-primary h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold">Certifications</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <CardBody>
                    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                      </div>
                      <CardHeader>
                        <CardTitle>{cert.title}</CardTitle>
                        <p className="text-primary text-sm">
                          {cert.organization}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {cert.date}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground">{cert.description}</p>
                      </CardContent>
                    </Card>
                  </CardBody>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/30 relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center justify-center space-x-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="p-2 rounded-full bg-primary/20">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Get In Touch</h2>
              </motion.div>
              <p className="text-muted-foreground mb-8">
                I'm currently looking for new opportunities. Whether you have a
                question or just want to say hi, I'll try my best to get back to
                you!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="px-8">
                  <a
                    href="mailto:arunramasamy46@gmail.com"
                    className="flex items-center gap-2"
                  >
                    <Mail size={20} />
                    <span>Say Hello</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center text-muted-foreground border-t border-border">
          <p>© {new Date().getFullYear()} Arun R. All rights reserved.</p>
        </footer>

        {/* Chatbot Button */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg shadow-primary/20"
            onClick={toggleChatbot}
          >
            {showChatbot ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageSquare className="h-6 w-6" />
            )}
          </Button>
        </motion.div>

        {/* Chatbot */}
        <AnimatePresence>
          {showChatbot && <ChatBot onClose={toggleChatbot} />}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
