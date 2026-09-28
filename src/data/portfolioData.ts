export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Machine Learning' | 'Data Analytics' | 'Web Development' | 'Systems & AI';
  tags: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
  details: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface ScrollStop {
  id: string;
  sectionKey: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  sceneIndex: number;
}

export const portfolioData = {
  personal: {
    name: "Dhruv Mahadik",
    shortName: "Dhruv",
    title: "Data Analyst",
    kicker: "Data Analyst.",
    location: "Mumbai, India",
    email: "dhruvmahadik51@gmail.com",
    github: "https://github.com/dnm124421",
    linkedin: "https://linkedin.com/in/dhruv-mahadik-51",
    bio: "Early-career Data Analyst based in Mumbai with a strong analytical foundation in Python, SQL, and Machine Learning. Passionate about uncovering patterns in complex datasets, building predictive models, and translating raw data into clear, high-impact business decisions.",
    learningFocus: "Currently deep in preparation for GATE DA (Data Science & Artificial Intelligence), mastering mathematical foundations, statistical inference, algorithms, and deep learning architectures.",
    stats: [
      { label: "Data & ML Projects", value: "12+" },
      { label: "Core Tech Stack", value: "Python / SQL / ML" },
      { label: "Location", value: "Mumbai, IN" },
      { label: "Focus Track", value: "GATE DA 2025" }
    ],
    funFacts: [
      "Built a chess engine from scratch with Minimax and Alpha-Beta pruning.",
      "Loves analyzing game telemetry and quantitative strategy.",
      "Enjoys architecting clean full-stack web platforms alongside analytical models."
    ]
  },

  scrollStops: [
    {
      id: "hero",
      sectionKey: "hero",
      kicker: "Data Analyst.",
      title: "Dhruv",
      subtitle: "Mumbai, India",
      description: "Scroll to start",
      buttonText: "",
      sceneIndex: 0
    },
    {
      id: "about",
      sectionKey: "about",
      kicker: "01 / Background",
      title: "About Me",
      subtitle: "Curiosity Driven Analysis",
      description: "Data analyst from Mumbai turning raw data into clear, useful insights.",
      buttonText: "Know More →",
      sceneIndex: 1
    },
    {
      id: "projects",
      sectionKey: "projects",
      kicker: "02 / Portfolio Work",
      title: "Projects",
      subtitle: "Algorithms & Analytics",
      description: "ML and data projects, from a chess engine to full-stack builds.",
      buttonText: "View Projects →",
      sceneIndex: 2
    },
    {
      id: "experience",
      sectionKey: "experience",
      kicker: "03 / Work History",
      title: "Experience",
      subtitle: "Building & Delivering",
      description: "Freelance web development and hands-on analytics work.",
      buttonText: "See Experience →",
      sceneIndex: 3
    },
    {
      id: "skills",
      sectionKey: "skills",
      kicker: "04 / Capabilities",
      title: "Skills",
      subtitle: "Toolkit & Expertise",
      description: "Python, SQL, Machine Learning, Data Visualization and more.",
      buttonText: "View Skills →",
      sceneIndex: 4
    },
    {
      id: "education",
      sectionKey: "education",
      kicker: "05 / Milestones",
      title: "Education",
      subtitle: "Academic Journey",
      description: "10th, 12th, graduation and GATE DA (Data Science & AI) preparation.",
      buttonText: "See Journey →",
      sceneIndex: 5
    },
    {
      id: "resume",
      sectionKey: "resume",
      kicker: "06 / Credentials",
      title: "Resume",
      subtitle: "Curriculum Vitae",
      description: "Download my latest resume and review comprehensive credentials.",
      buttonText: "Download Resume →",
      sceneIndex: 6
    },
    {
      id: "contact",
      sectionKey: "contact",
      kicker: "07 / Connect",
      title: "Contact",
      subtitle: "Let's Collaborate",
      description: "Let's build something extraordinary with data and intelligent systems.",
      buttonText: "Get in Touch →",
      sceneIndex: 7
    }
  ] as ScrollStop[],

  projects: [
    {
      id: "chess-engine",
      title: "Autonomous Chess AI Engine",
      subtitle: "Search algorithms, evaluation heuristics & game trees",
      description: "A custom chess engine built from the ground up in Python implementing bitboard board representation, minimax search with alpha-beta pruning, quiescence search, and piece-square evaluation heuristics.",
      category: "Systems & AI",
      tags: ["Python", "Algorithms", "Minimax", "Alpha-Beta", "Game Theory"],
      metrics: "Evaluates ~25,000 nodes/sec with 5-ply depth",
      githubUrl: "https://github.com/dnm124421",
      liveUrl: "",
      featured: true
    },
    {
      id: "notehive",
      title: "NoteHive — Campus Knowledge Hub",
      subtitle: "Private student notes & resource sharing platform",
      description: "A full-featured cloud collaboration platform designed for college students to upload, organize, search, and exchange semester notes, syllabus guides, and past question papers with role-based access.",
      category: "Web Development",
      tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      metrics: "Fast full-text search with indexed categorization",
      githubUrl: "https://github.com/dnm124421",
      liveUrl: "",
      featured: true
    },
    {
      id: "leetcode-companion",
      title: "LeetCode Companion & Analytics",
      subtitle: "Problem categorization & cognitive spaced repetition",
      description: "An analytical dashboard and study companion for competitive programming that tracks solving times, algorithm patterns, topic mastery distributions, and recommends next questions using a personalized spaced-repetition algorithm.",
      category: "Data Analytics",
      tags: ["TypeScript", "Next.js", "Data Viz", "Chart.js", "Analytics"],
      metrics: "Custom difficulty scoring & retention curves",
      githubUrl: "https://github.com/dnm124421",
      liveUrl: "",
      featured: true
    },
    {
      id: "churn-predictor",
      title: "Predictive Customer Churn Classifier",
      subtitle: "Supervised classification with feature importance analysis",
      description: "End-to-end Machine Learning pipeline analyzing customer behavior telemetry, subscription retention, and transaction history using XGBoost and Random Forest with SHAP interpretability values.",
      category: "Machine Learning",
      tags: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "SHAP"],
      metrics: "89.4% ROC-AUC score with actionable risk triggers",
      githubUrl: "https://github.com/dnm124421",
      liveUrl: "",
      featured: false
    },
    {
      id: "sales-eda",
      title: "E-Commerce Quantitative Exploratory Analysis",
      subtitle: "Multi-dimensional statistical trend decomposition",
      description: "Comprehensive exploratory data analysis examining over 250,000 transactions to uncover seasonal demand elasticity, customer lifetime value (CLV), and geographic revenue clusters.",
      category: "Data Analytics",
      tags: ["Python", "SQL", "Seaborn", "PowerBI", "Statsmodels"],
      metrics: "Identified key 22% margin optimization segments",
      githubUrl: "https://github.com/dnm124421",
      liveUrl: "",
      featured: false
    }
  ] as Project[],

  experience: [
    {
      id: "freelance-web",
      role: "Freelance Full-Stack & Web Developer",
      company: "Self-Employed / Client Projects",
      period: "2023 - Present",
      location: "Mumbai, India",
      type: "Contract / Freelance",
      description: [
        "Architected and deployed custom e-commerce and business platforms utilizing WordPress, WooCommerce, and modern JavaScript stacks.",
        "Engineered secure payment gateway integrations (Razorpay, Stripe) with automated webhook verification and transactional emails.",
        "Managed end-to-end cloud hosting, DNS configuration, and performance optimization on Hostinger and cloud VPS environments.",
        "Delivered data-driven SEO optimizations and analytics dashboards for client conversion tracking."
      ],
      skills: ["WordPress", "WooCommerce", "Razorpay Integration", "PHP", "JavaScript", "Hostinger", "SEO Analytics"]
    },
    {
      id: "data-analyst-projects",
      role: "Independent Data Analyst & ML Researcher",
      company: "Data Science Projects & Research",
      period: "2023 - Present",
      location: "Mumbai, India",
      type: "Independent",
      description: [
        "Formulated data pipelines to clean, ingest, and transform complex unstructured datasets using Python (Pandas, NumPy) and SQL.",
        "Designed interactive visualization dashboards to communicate metric variances and statistical correlations effectively to non-technical stakeholders.",
        "Conducted exploratory data analyses and hypothesis testing on diverse real-world benchmarks."
      ],
      skills: ["Python", "SQL", "Pandas", "Matplotlib", "Seaborn", "Data Cleaning", "Hypothesis Testing"]
    }
  ] as ExperienceItem[],

  skillsData: [
    {
      title: "Programming & Query Languages",
      iconName: "Code2",
      skills: [
        { name: "Python", level: 90, highlight: true },
        { name: "SQL (MySQL, PostgreSQL)", level: 85, highlight: true },
        { name: "C++ / C", level: 75 },
        { name: "JavaScript / TypeScript", level: 80 }
      ]
    },
    {
      title: "Data Science & Machine Learning",
      iconName: "BrainCircuit",
      skills: [
        { name: "Pandas & NumPy", level: 92, highlight: true },
        { name: "Scikit-Learn", level: 85, highlight: true },
        { name: "Exploratory Data Analysis (EDA)", level: 90, highlight: true },
        { name: "Supervised & Unsupervised ML", level: 82 },
        { name: "Statistical Modeling & Hypothesis Testing", level: 80 },
        { name: "Feature Engineering", level: 85 }
      ]
    },
    {
      title: "Visualization & BI Tools",
      iconName: "BarChart3",
      skills: [
        { name: "Matplotlib & Seaborn", level: 88, highlight: true },
        { name: "Power BI / Tableau (Basics)", level: 78 },
        { name: "Excel & Advanced Spreadsheets", level: 85 },
        { name: "Plotly Interactive Dashboards", level: 80 }
      ]
    },
    {
      title: "Web & Deployment Tools",
      iconName: "Globe",
      skills: [
        { name: "Git & GitHub Version Control", level: 88, highlight: true },
        { name: "React & Next.js", level: 80 },
        { name: "Tailwind CSS", level: 85 },
        { name: "WooCommerce & Razorpay APIs", level: 85 },
        { name: "Cloud & VPS Hosting (Hostinger)", level: 82 }
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      id: "gate-da",
      degree: "GATE DA (Data Science & Artificial Intelligence)",
      institution: "National Competitive Examination Preparation",
      period: "In Progress / Targeted",
      score: "Active Preparation",
      details: "Comprehensive study of Probability & Statistics, Linear Algebra, Calculus, Algorithms & Data Structures, DBMS, Machine Learning, and Artificial Intelligence foundations.",
      highlight: true
    },
    {
      id: "graduation",
      degree: "Bachelor of Science / Engineering (Undergraduate)",
      institution: "University / College in Mumbai",
      period: "Completed / Final Year",
      score: "First Class with Distinction",
      details: "Core focus on Computer Science, Information Technology, Discrete Mathematics, Database Management Systems, and Statistical Analysis.",
      highlight: false
    },
    {
      id: "hsc",
      degree: "Higher Secondary Certificate (12th Grade)",
      institution: "Junior College, Mumbai",
      period: "Completed",
      score: "Science Stream (PCM)",
      details: "Focus on Mathematics, Physics, and Chemistry with strong foundation in analytical problem solving.",
      highlight: false
    },
    {
      id: "ssc",
      degree: "Secondary School Certificate (10th Grade)",
      institution: "High School, Mumbai",
      period: "Completed",
      score: "Distinction",
      details: "Strong academic foundation in Mathematics, Science, and English.",
      highlight: false
    }
  ] as EducationItem[],

  resume: {
    fileName: "Dhruv_Mahadik_Resume.pdf",
    filePath: "/resume.pdf",
    summary: "Dedicated Data Analyst with hands-on proficiency in Python, SQL, exploratory data analysis, and predictive modeling. Proven track record of delivering end-to-end projects ranging from algorithmic chess engines to full-stack platforms and analytical dashboards.",
    sections: [
      {
        heading: "Core Competencies",
        items: [
          "Data Analysis & Statistical Modeling",
          "Machine Learning & Algorithmic Design",
          "Data Visualization & Insight Communication",
          "SQL Database Querying & Optimization",
          "Full-Stack Web Development & API Integration"
        ]
      },
      {
        heading: "Key Project Highlights",
        items: [
          "Autonomous Chess AI Engine (Minimax, Alpha-Beta pruning in Python)",
          "NoteHive Student Resource Sharing Platform (Full-Stack)",
          "Customer Churn Predictive Pipeline with SHAP interpretability",
          "Quantitative E-Commerce Exploratory Analysis"
        ]
      }
    ]
  }
};
