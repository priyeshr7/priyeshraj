
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, TerminalLine } from "@/components/Terminal";
import { BookText } from "lucide-react";
import { BlogPost } from "@/components/BlogPost";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-pythonBlue py-20">
        <div className="container mx-auto px-4">
          <Terminal>
            <TerminalLine>class TechBlog:</TerminalLine>
            <TerminalLine prefix="...">    def __init__(self):</TerminalLine>
            <TerminalLine prefix="...">        self.topics = ["Python", "Web Dev", "AI"]</TerminalLine>
          </Terminal>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-mono text-pythonBlue mb-8 flex items-center gap-2">
            <BookText className="h-8 w-8" />
            <span>{'>>'} Latest Posts</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            <BlogPost 
              title="Getting Started with Python"
              date="2025-04-16"
              excerpt="Learn the basics of Python programming and why it's a great first language."
              content="Python is one of the most popular programming languages in the world, and for good reason. Its clean syntax and readability make it perfect for beginners, while its powerful features and extensive library ecosystem make it suitable for professional development.

Here's a simple example to get you started:

```python
# This is a simple greeting function
def greet(name):
    return f'Hello, {name}!'

# Let's use the function
print(greet('Python Developer'))
```

Python's philosophy emphasizes code readability and simplicity. The language's creator, Guido van Rossum, designed it with the goal of making code easier to understand and maintain.

Key features that make Python great:
1. Easy to learn and read
2. Large standard library
3. Active community
4. Cross-platform compatibility
5. Versatile applications"
              tags={["Python", "Programming", "Beginners"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
