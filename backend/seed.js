const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./model/user");
const Blog = require("./model/blog");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected ✅");

  await User.deleteMany();
  await Blog.deleteMany();

  const password = await bcrypt.hash("password123", 10);

  const users = await User.insertMany([
    { name: "Super Admin", email: "superadmin@blog.com", password, role: "superadmin" },
    { name: "Author User", email: "author@blog.com", password, role: "author" },
    { name: "Viewer User", email: "viewer@blog.com", password, role: "viewer" },
  ]);

  await Blog.create({
    title: "Complete Guide to Full Stack Development in 2026",
    slug: "complete-guide-to-full-stack-development-2026",
    content: `## What is Full Stack Development?\n\nFull stack development refers to the ability to build both frontend and backend parts of a web application. A full stack developer works on UI, server logic, databases, APIs, and deployment.\n\n## Frontend Technologies\n\nPopular frontend technologies include:\n- React.js\n- Next.js\n- HTML5, CSS3\n- Tailwind CSS\n- JavaScript (ES6+)\n\n## Backend Technologies\n\nCommon backend tools:\n- Node.js\n- Express.js\n- REST APIs\n- JWT Authentication\n\n## Database Layer\n\nPopular choices:\n- MongoDB (NoSQL)\n- PostgreSQL\n- MySQL\n\nFor modern scalable apps, MongoDB with Mongoose is widely used.\n\n## Tools Every Full Stack Developer Must Know\n\n- Git & GitHub\n- Docker\n- Postman\n- VS Code\n- CI/CD pipelines\n\n## Career Opportunities\n\nFull stack developers can work as Software Engineer, Web Developer, Startup CTO, Freelancer, or Technical Consultant.\n\n## Conclusion\n\nFull stack development in 2026 is about building scalable, SEO-friendly, secure, and high-performance applications.`,
    excerpt: "Learn full stack development in 2026 with this complete guide covering frontend, backend, databases, tools, career paths, and FAQs.",
    metaTitle: "Full Stack Development Guide 2026 | Skills, Tools & Career",
    metaDescription: "Learn full stack development in 2026 with this complete guide covering frontend, backend, databases, tools, career paths, and FAQs.",
    ogTitle: "Full Stack Development Guide 2026",
    ogDescription: "Complete guide to full stack development in 2026.",
    twitterTitle: "Full Stack Development Guide 2026",
    twitterDescription: "Complete guide to full stack development in 2026.",
    categories: ["Web Development"],
    tags: ["Full Stack Developer", "MERN Stack", "Web Development", "JavaScript", "Career Guide"],
    author: users[0]._id,
    status: "published",
    faqs: [
      { question: "Is full stack development a good career in 2026?", answer: "Yes, full stack development remains one of the highest-paying and most in-demand tech careers globally." },
      { question: "Which stack is best for full stack development?", answer: "The MERN stack (MongoDB, Express, React, Node) is one of the most popular and industry-ready stacks." },
      { question: "Do full stack developers need DevOps knowledge?", answer: "Basic DevOps knowledge like CI/CD, Docker, and cloud deployment is a big plus." },
    ],
    tableOfContents: [
      { id: "what-is-full-stack-development", text: "What is Full Stack Development?", level: 2 },
      { id: "frontend-technologies", text: "Frontend Technologies", level: 2 },
      { id: "backend-technologies", text: "Backend Technologies", level: 2 },
      { id: "database-layer", text: "Database Layer", level: 2 },
      { id: "tools", text: "Tools Every Full Stack Developer Must Know", level: 2 },
      { id: "career-opportunities", text: "Career Opportunities", level: 2 },
      { id: "conclusion", text: "Conclusion", level: 2 },
    ],
  });

  console.log("\n✅ Seed complete!");
  console.log("superadmin@blog.com / password123");
  console.log("author@blog.com    / password123");
  console.log("viewer@blog.com    / password123");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
