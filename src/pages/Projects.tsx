import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { projects, projectCategories, type ProjectCategory } from "../content";

type Filter = ProjectCategory | "All";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-black uppercase text-silver sm:text-5xl">Projects</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-mist/70">
          Client work, live infrastructure, academic builds and freelance collateral. Filter by category.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {(["All", ...projectCategories] as Filter[]).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`min-h-11 flex-shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
              filter === category
                ? "border-yellow bg-yellow text-ink"
                : "border-border text-mist/80 hover:border-yellow hover:text-yellow"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={project.featured ? "sm:col-span-2 lg:col-span-2" : ""}
          >
            <ProjectCard project={project} variant={index} size={project.featured ? "large" : "default"} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
