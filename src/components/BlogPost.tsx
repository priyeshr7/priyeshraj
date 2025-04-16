
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const BlogPost = ({ title, date, excerpt, content, tags }: BlogPostProps) => {
  return (
    <Card className="overflow-hidden border-pythonBlue">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
        </div>
        <CardTitle className="text-2xl font-mono text-pythonBlue">{title}</CardTitle>
        <CardDescription>{excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-slate max-w-none">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-pythonDarkBlue text-pythonYellow rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
