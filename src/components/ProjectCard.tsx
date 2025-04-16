
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  codeSnippet?: string;
}

export const ProjectCard = ({ title, description, technologies, codeSnippet }: ProjectCardProps) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-pythonBlue">
      <h3 className="text-xl font-mono text-pythonYellow mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      {codeSnippet && (
        <pre className="bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
          <code className="text-pythonLightBlue">{codeSnippet}</code>
        </pre>
      )}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-pythonDarkBlue text-pythonYellow rounded text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
