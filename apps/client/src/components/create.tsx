import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Component() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [syntax, setSyntax] = useState("plain");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the paste data to your backend
    console.log({ title, content, syntax });
    // Reset form after submission
    setTitle("");
    setContent("");
    setSyntax("plain");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Paste</h1>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="space-y-2 mb-4">
          <Label htmlFor="title">Title (Optional)</Label>
          <Input
            id="title"
            placeholder="Enter paste title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2 flex-grow flex flex-col mb-4">
          <Label htmlFor="content">Paste Content</Label>
          <Textarea
            id="content"
            placeholder="Enter your code or text here"
            className="flex-grow resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 mb-4">
          <Label htmlFor="syntax">Syntax Highlighting</Label>
          <Select value={syntax} onValueChange={setSyntax}>
            <SelectTrigger id="syntax">
              <SelectValue placeholder="Select syntax" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plain">Plain Text</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Create Paste
        </Button>
      </form>
    </div>
  );
}
