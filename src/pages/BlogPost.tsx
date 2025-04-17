import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogPost as BlogPostType } from "@/components/BlogPost";
import { Card } from "@/components/ui/card";
import { Tag } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would normally be a fetch from an API
    // For now, we're using hardcoded data
    setTimeout(() => {
      if (slug === "getting-started-with-python") {
        setPost({
          title: "Getting Started with Python",
          date: "2025-04-16",
          excerpt: "Learn the basics of Python programming and why it's a great first language.",
          content: "Python is one of the most popular programming languages in the world, and for good reason. Its clean syntax and readability make it perfect for beginners, while its powerful features and extensive library ecosystem make it suitable for professional development.\n\nHere's a simple example to get you started:\n\n```python\n# This is a simple greeting function\ndef greet(name):\n    return f'Hello, {name}!'\n\n# Let's use the function\nprint(greet('Python Developer'))\n```\n\nPython's philosophy emphasizes code readability and simplicity. The language's creator, Guido van Rossum, designed it with the goal of making code easier to understand and maintain.\n\nKey features that make Python great:\n1. Easy to learn and read\n2. Large standard library\n3. Active community\n4. Cross-platform compatibility\n5. Versatile applications",
          tags: ["Python", "Programming", "Beginners"]
        });
      } else {
        // Post not found
        setPost(null);
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <p className="text-xl font-mono">Loading post...</p>
    </div>
    );
  }
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="p-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-4">The blog post you're looking for doesn't exist.</p>
        <a href="/blog" className="text-blue-500 hover:underline">
        &larr; Back to Blog
        </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-500 mb-4">{post.date}</p>
          
          <div className="flex gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="prose max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => {
              // Check if paragraph is a code block
              if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                const code = paragraph.substring(
                  paragraph.indexOf('\n') + 1, 
                  paragraph.lastIndexOf('```')
                );
                
                return (
                  <pre key={i} className="bg-gray-800 text-white p-4 rounded my-4 overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                );
              }
              
              return <p key={i} className="mb-4">{paragraph}</p>;
            })}
          </div>
          
          <div className="mt-8 pt-4 border-t">
            <a href="/blog" className="text-blue-500 hover:underline">
              &larr; Back to Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;