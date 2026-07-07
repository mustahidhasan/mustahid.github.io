import { db, initializeDatabase } from "./db";

initializeDatabase();

function resetTables(): void {
  db.exec(`
    DELETE FROM projects;
    DELETE FROM skills;
    DELETE FROM experiences;
    DELETE FROM contact_messages;
  `);
}

function seedProjects(): void {
  const insertProject = db.prepare(`
    INSERT INTO projects (title, description, imageUrl, tags, stack)
    VALUES (?, ?, ?, ?, ?)
  `);

  const projects = [
    {
      title: "CMS System",
      description:
        "Built a CMS and admin platform for content, media, recruitment, and publishing workflows with SEO controls, preview flows, and secure role-based access.",
      imageUrl: "assets/imgs/project-cms-system.svg",
      tags: ["TypeScript", "Node.js", "Cloudflare"],
      stack: ["TypeScript", "Node.js", "tRPC", "Cloudflare", "Python Scripts", "Shell", "Git"],
    },
    {
      title: "RAG System",
      description:
        "Built document ingestion, semantic search, context retrieval, and answer generation workflows with embeddings, vector storage, cache layers, and chat APIs.",
      imageUrl: "assets/imgs/project-rag-system.svg",
      tags: ["Python", "TypeScript", "LLM"],
      stack: ["Python", "TypeScript", "PostgreSQL", "Redis", "Vector DB", "Docker", "LLM Tooling"],
    },
    {
      title: "Network Management System",
      description:
        "Developed a monitoring platform for large-scale Ping, DNS, SNMP, and Traceroute checks with Azure AD SSO, CSV export, and real-time dashboard visibility.",
      imageUrl: "assets/imgs/project-network-system.svg",
      tags: ["Python", "Node.js", "React"],
      stack: ["Python", "Node.js", "React", "AWS", "Docker", "Shell", "Git"],
    },
  ];

  for (const project of projects) {
    insertProject.run(
      project.title,
      project.description,
      project.imageUrl,
      JSON.stringify(project.tags),
      JSON.stringify(project.stack)
    );
  }
}

function seedSkills(): void {
  const insertSkill = db.prepare(`
    INSERT INTO skills (name, value, category)
    VALUES (?, ?, ?)
  `);

  const skills = [
    {
      name: "Python Engineering",
      value: 96,
      category: "Backend",
    },
    {
      name: "Node.js and TypeScript Platforms",
      value: 95,
      category: "Backend",
    },
    {
      name: "Django, FastAPI, DRF, REST APIs",
      value: 92,
      category: "Backend",
    },
    {
      name: "React and Full-Stack UI Delivery",
      value: 88,
      category: "Frontend",
    },
    {
      name: "AWS, Docker, Cloudflare, CI/CD Support",
      value: 87,
      category: "Cloud",
    },
    {
      name: "PostgreSQL, Redis, DynamoDB, Prisma, Pandas",
      value: 85,
      category: "Data",
    },
  ];

  for (const skill of skills) {
    insertSkill.run(skill.name, skill.value, skill.category);
  }
}

function seedExperiences(): void {
  const insertExperience = db.prepare(`
    INSERT INTO experiences (
      company,
      role,
      location,
      startDate,
      endDate,
      description,
      skills
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const experiences = [
    {
      company: "Ninja Digital Innovations",
      role: "Software Engineer",
      location: "Dhaka",
      startDate: "June 2025",
      endDate: "Present",
      description:
        "Build internal platforms using Node.js, TypeScript, Python, Django, and React; design REST APIs, service workflows, and integration layers for automation and developer productivity.",
      skills: ["Python", "Node.js", "TypeScript", "Django", "React", "AWS", "Docker"],
    },
    {
      company: "Brandcloud, Inc.",
      role: "Software Engineer",
      location: "Tokyo",
      startDate: "April 2023",
      endDate: "May 2025",
      description:
        "Built internal tools and automation platforms, developed backend services and RESTful APIs for workflows and data processing.",
      skills: ["Python", "Node.js", "TypeScript", "Django", "React", "REST APIs"],
    },
  ];

  for (const experience of experiences) {
    insertExperience.run(
      experience.company,
      experience.role,
      experience.location,
      experience.startDate,
      experience.endDate,
      experience.description,
      JSON.stringify(experience.skills)
    );
  }
}

resetTables();
seedProjects();
seedSkills();
seedExperiences();

console.log("Database seeded successfully.");