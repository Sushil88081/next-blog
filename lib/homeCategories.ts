import { getPostSlugs } from "@/lib/markdown";

export type HomeCategoryCard = {
  name: string;
  description: string;
  image: string;
  link: string;
  color: string;
  count: string;
};

/** Homepage grid cards; Agentic AI badge reflects live markdown count. */
export function getHomeCategoryCards(): HomeCategoryCard[] {
  const agenticN = getPostSlugs("agentic-ai").length;
  const agenticLabel =
    agenticN === 0 ? "Start here" : agenticN === 1 ? "1 Post" : `${agenticN} Posts`;

  return [
    {
      name: `React`,
      description:
        "React is a JavaScript library for building user interfaces. Learn React with comprehensive tutorials and examples.",
      image: "/assets/images/react.jpg",
      link: "/react",
      color: "from-blue-500 to-cyan-500",
      count: "26 Posts",
    },
    {
      name: "Go Lang",
      description:
        "Go is a programming language developed by Google for building efficient and scalable applications.",
      image: "/assets/images/golang.jpg",
      link: "/go/golang",
      color: "from-cyan-500 to-blue-600",
      count: "10 Posts",
    },
    {
      name: "Python",
      description:
        "Python is a versatile programming language perfect for beginners. Learn Python for web development, data science, and more.",
      image: "/assets/images/python.jpg",
      link: "/python",
      color: "from-yellow-500 to-orange-500",
      count: "7 Posts",
    },
    {
      name: "JavaScript",
      description:
        "JavaScript is the language of the web. Learn JavaScript to build interactive websites and web applications.",
      image: "/assets/images/javascript.jpg",
      link: "/javascript",
      color: "from-yellow-400 to-yellow-600",
      count: "6 Posts",
    },
    {
      name: "TypeScript",
      description:
        "TypeScript adds type safety to JavaScript. Learn TypeScript to write safer, more maintainable code.",
      image: "/assets/images/typescript.png",
      link: "/typescript",
      color: "from-blue-600 to-indigo-600",
      count: "6 Posts",
    },
    {
      name: "Java",
      description:
        "Java powers enterprise backends, Android, and cloud APIs. Follow a practical roadmap from core Java to Spring Boot and production best practices.",
      image: "/assets/images/java.png",
      link: "/java",
      color: "from-orange-500 to-red-600",
      count: "154 Posts",
    },
    {
      name: "Spring Boot + PostgreSQL + AI",
      description:
        "A step-by-step series: REST APIs with Spring Boot, PostgreSQL, layered architecture, validation, and an AI chat feature—through Docker and deployment basics.",
      image: "/assets/java/java.png",
      link: "/spring-boot-postgres-ai",
      color: "from-emerald-600 to-teal-500",
      count: "29 Posts",
    },
    {
      name: "Agentic AI",
      description:
        "Systems that plan steps, call tools, and keep receipts—explained in plain language and grounded in Java and PostgreSQL backends.",
      image: "/assets/images/agentic-ai-hero.png",
      link: "/agentic-ai",
      color: "from-violet-600 to-teal-600",
      count: agenticLabel,
    },
  ];
}
