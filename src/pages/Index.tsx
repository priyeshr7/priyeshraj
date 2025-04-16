import { Terminal, TerminalLine } from "@/components/Terminal";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/components/BlogPost";
import { PhotoGallery } from "@/components/PhotoGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-pythonBlue py-20">
        <div className="container mx-auto px-4">
          <Terminal>
            <TerminalLine>print("Hello, I'm Priyesh Raj")</TerminalLine>
            <TerminalLine>class Developer:</TerminalLine>
            <TerminalLine prefix="...">    def __init__(self):</TerminalLine>
            <TerminalLine prefix="...">        self.role = "   "</TerminalLine>
            <TerminalLine prefix="...">        self.languages = ["Python", "SQL", "TypeScript"]</TerminalLine>
          </Terminal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-mono text-pythonBlue mb-8">{'>>'} About Me</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-8">
              Passionate Python developer with experience in web development, data analysis, and automation.
              I love creating elegant solutions to complex problems.
            </p>
            <PhotoGallery />
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-mono text-pythonBlue mb-8">{'>>'} Latest Blog Posts</h2>
          <div className="max-w-4xl mx-auto">
            <BlogPost 
              title="Getting Started with Python"
              date="2025-04-16"
              excerpt="Learn the basics of Python programming and why it's a great first language."
              content="Python is one of the most popular programming languages in the world, and for good reason. Its clean syntax and readability make it perfect for beginners..."
              tags={["Python", "Programming", "Beginners"]}
            />
            <div className="mt-8 text-center">
              <Link to="/blog">
                <Button variant="outline" className="gap-2">
                  Read More Posts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-mono text-pythonYellow mb-8">{'>>'} Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Data Analysis Tool"
              description="A Python-based data analysis tool using pandas and matplotlib"
              technologies={["Python", "pandas", "matplotlib"]}
              codeSnippet="import pandas as pd\ndf = pd.DataFrame(data)"
            />
            <ProjectCard
              title="Web Scraper"
              description="Automated web scraping tool built with Python"
              technologies={["Python", "BeautifulSoup", "Requests"]}
              codeSnippet="from bs4 import BeautifulSoup\nimport requests"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-mono text-pythonBlue mb-8">{'>>'} Contact</h2>
          <Terminal>
            <TerminalLine>contact = {'{'}</TerminalLine>
            <TerminalLine prefix="...">    "email": "your.email@example.com",</TerminalLine>
            <TerminalLine prefix="...">    "github": "github.com/yourusername",</TerminalLine>
            <TerminalLine prefix="...">    "linkedin": "linkedin.com/in/yourusername"</TerminalLine>
            <TerminalLine>{'}'}</TerminalLine>
          </Terminal>
        </div>
      </section>
    </div>
  );
};

export default Index;
