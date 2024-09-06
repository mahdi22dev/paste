"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { syntaxSelectOptions } from "@/lib/constrains";
import { DatePicker } from "./custom/DatePicker";
import { Formik, useField, Form } from "formik";
import { pasteSchema } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";
import CodeMirror, { Extension } from "@uiw/react-codemirror";

export function PasteForm() {
  const [syntax, setSyntax] = useState("syntax");
  const [mode, setMode] = useState("public");
  const [date, setDate] = useState<Date>();
  const [experation, setExperation] = useState("1");
  const [content, setContent] = useState("");
  const [extensions, setExtensions] = useState<Extension[]>();

  useEffect(() => {
    async function loadLanguage() {
      let languageExtension: Extension;

      switch (syntax) {
        case "javascript":
          languageExtension = (
            await import("@codemirror/lang-javascript")
          ).javascript();
          break;
        case "python":
          languageExtension = (
            await import("@codemirror/lang-python")
          ).python();
          break;
        case "java":
          languageExtension = (await import("@codemirror/lang-java")).java();
          break;
        case "html":
          languageExtension = (await import("@codemirror/lang-html")).html();
          break;
        case "css":
          languageExtension = (await import("@codemirror/lang-css")).css();
          break;
        case "php":
          languageExtension = (await import("@codemirror/lang-php")).php();
          break;
        case "ruby":
          languageExtension = (await import("@codemirror/lang-css")).css();
          break;
        default:
          languageExtension = (
            await import("@codemirror/lang-javascript")
          ).javascript(); // Default
      }

      setExtensions([languageExtension]);
    }

    loadLanguage();
  }, [syntax]);

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create a New Paste
      </h1>
      <Formik
        initialValues={{
          title: "Untitled Paste",
          date: undefined,
        }}
        validationSchema={() => pasteSchema(mode == "password")}
        onSubmit={async (values, {}) => {
          console.log(values);

          const pasteBody = {
            ...values,
            date: date,
            syntax: syntax,
            mode: mode,
            content,
          };

          const currentdate = new Date();
          if (pasteBody.date && pasteBody.date < currentdate) {
            return toast({
              variant: "default",
              title: "Please make sure the date is in the feature",
            });
          }
          if (content === "") {
            return toast({
              variant: "default",
              title: "Can't create empty paste",
            });
          }
          // await handleSubmit();
          // await handleSignin(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="min-h-[80vh] max-w-[80vw] mx-auto flex gap-3 items-start justify-between p-4">
            <div className="w-full h-full">
              <div className="space-y-2 flex-grow flex flex-col mb-4">
                <CodeMirror
                  height="600px"
                  theme="dark"
                  extensions={syntax == "plain" ? undefined : extensions}
                  onChange={onChange}
                  lang="en"
                  className="z-0"
                />
              </div>

              <Button type="submit" className="w-full">
                Create Paste
              </Button>
            </div>
            <div>
              <div className="space-y-2 mb-4">
                <MyTextInput
                  label="Title"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Untitled Paste"
                  size={50}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2 mb-4">
                <Select value={syntax} onValueChange={setSyntax}>
                  <SelectTrigger id="syntax">
                    <SelectValue placeholder="Select syntax" />
                  </SelectTrigger>
                  <SelectContent>
                    {syntaxSelectOptions.map((syntax) => [
                      <SelectItem value={syntax.value}>
                        {syntax.label}
                      </SelectItem>,
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
              </div>

              {mode === "password" && (
                <div className="space-y-2 mb-4">
                  <MyTextInput
                    label="Password"
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Your Password"
                    size={50}
                    className="border-secondary"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              {experation === "2" ? (
                <DatePicker date={date} setDate={setDate} />
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
          </Form>
        )}
      </Formik>
    </>
  );
}

const MyTextInput = ({ ...props }) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  return (
    <div>
      <Input {...field} {...props} className="p-5 placeholder:opacity-50" />
      {meta.touched && meta.error ? (
        <div className="text-destructive mt-3 text-[13px]">{meta.error}</div>
      ) : null}
    </div>
  );
};
