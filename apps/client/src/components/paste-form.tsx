"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { syntaxSelectOptions } from "@/lib/constrains";
import { DatePicker } from "./custom/DatePicker";

export function PasteForm() {
  const [title, setTitle] = useState("Untitled title");
  const [content, setContent] = useState("");
  const [syntax, setSyntax] = useState("syntax");
  const [mode, setMode] = useState("public");
  const [date, setDate] = useState({ date: "", experation: false });
  const [experation, setExperation] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, syntax });
    setTitle("");
    setContent("");
    setSyntax("plain");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create a New Paste
      </h1>
      <div className="min-h-[80vh] max-w-[80vw] mx-auto flex gap-3 items-start justify-between p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-grow min-h-full"
        >
          <div className="space-y-2 flex-grow flex flex-col mb-4">
            <Textarea
              id="content"
              placeholder=""
              className="flex-grow resize-none"
              value={content}
              rows={35}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Paste
          </Button>
        </form>
        <div>
          <div className="space-y-2 mb-4">
            <Input
              size={50}
              id="title"
              placeholder="Untitled Paste"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2 mb-4">
            <Select value={syntax} onValueChange={setSyntax}>
              <SelectTrigger id="syntax">
                <SelectValue placeholder="Select syntax" />
              </SelectTrigger>
              <SelectContent>
                {syntaxSelectOptions.map((syntax) => [
                  <SelectItem value={syntax.value}>{syntax.label}</SelectItem>,
                ])}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 mb-4">
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger id="mode">
                <SelectValue placeholder="public" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">User private</SelectItem>
                <SelectItem value="password">Password</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
          {mode === "password" && (
            <div className="space-y-2 mb-4">
              <Input
                size={50}
                id="title"
                placeholder="Your Password"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-secondary"
              />
            </div>
          )}
          {experation === "2" ? (
            <DatePicker />
          ) : (
            <Select value={experation} onValueChange={setExperation}>
              <SelectTrigger id="date">
                <SelectValue placeholder="No experation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">No experation</SelectItem>
                <SelectItem value="2">Chose an experation date</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </>
  );
}
