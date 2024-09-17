import React, { useEffect, useState } from "react";
import { getPasteAction } from "../actions/actions";
import { Link, useParams } from "react-router-dom";
import { Paste } from ".pnpm/@prisma+client@5.19.0_prisma@5.19.0/node_modules/@prisma/client";
import { BounceLoader } from "react-spinners";
import ReactCodeMirror, { Extension } from "@uiw/react-codemirror";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock2, Eye, LucideProps, View } from "lucide-react";
import { formatDate, formatExperationDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

function Past() {
  const params = useParams();
  const [extensions, setExtensions] = useState<Extension[]>();
  const [loading, setloading] = useState(true);
  const [btnLoading, setBtnloading] = useState(false);
  const [error, setError] = useState(false);
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState<string | null>("");
  const [data, setData] = useState<Paste & { unlocked: boolean }>();

  const handleUnlock = async () => {
    try {
      setBtnloading(true);
      await fetchData();
    } catch (error) {
    } finally {
      setBtnloading(false);
    }
  };
  const fetchData = async () => {
    try {
      setloading(true);
      const paste = await getPasteAction(params, password);
      if (paste?.mode == "PASSWORD" && paste.unlocked === false) {
        setLocked(true);
      }
      if (paste?.unlocked) {
        setLocked(false);
      }
      if (!paste) {
        setError(true);
      } else {
        setData(paste);
      }
    } catch (error) {
      setError(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function loadLanguage() {
      let languageExtension: Extension;
      switch (data?.syntax) {
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

    if (data) {
      loadLanguage();
    }
  }, [data]);

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="text-primary text-4xl">Paste Not found</h1>
        <p>Paste you are looking for expired or deleted by the owner</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <BounceLoader size={70} color="#e390eb" />
      </div>
    );
  }

  if (locked) {
    return (
      <LockedSkeleton setPassword={setPassword} handleUnlock={handleUnlock} />
    );
  }

  return (
    <div className="w-full min-h-full">
      <div className="mx-auto h-full flex gap-5 flex-col-reverse xl:flex-row p-5 xl:p-10 justify-center items-start">
        <ReactCodeMirror
          height="600px"
          style={{ maxWidth: "1000px", width: "100%" }}
          theme={"dark"}
          value={data?.content || ""}
          extensions={data?.syntax === "plain" ? undefined : extensions}
          readOnly={true}
          lang="en"
          className="z-0"
        />
        <Card className="min-h-[350px] w-full sm:w-[350px] mx-auto lg:mx-0">
          <CardHeader className="text-center">
            <CardTitle>Author</CardTitle>
            <CardDescription>
              <Link to={"/user/mahdi22dev"} className="text-primary text-3xl">
                Mahdi22dev
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between gap-3 flex-wrap ">
            <div className="space-y-3 w-full">
              <PasteInfoItem text="Views" info="312314" Icon={Eye} />
              <PasteInfoItem
                text="created"
                info={formatDate(data?.createdAt)}
                Icon={Calendar}
              />
            </div>
            <div className="space-y-3 w-full">
              <PasteInfoItem
                text="Visibility"
                info={data?.mode && data?.mode}
                Icon={View}
              />
              <PasteInfoItem
                text="Expires"
                info={
                  data?.experation == null
                    ? "no experation"
                    : formatExperationDate(data?.experation)
                }
                Icon={Clock2}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size={"lg"}>
              Download
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const PasteInfoItem = ({
  text,
  info,
  Icon,
}: {
  text: string;
  info: string | undefined;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <div className="flex justify-between items-center gap-4 border border-primary/10 rounded px-5 py-2 flex-wrap">
      <div className="flex gap-3 flex-wrap">
        <Icon />
        <p>{text}</p>
      </div>
      <p className="text-primary">{info}</p>
    </div>
  );
};

const LockedSkeleton = ({
  setPassword,
  handleUnlock,
}: {
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
  handleUnlock: () => Promise<void>;
}) => {
  return (
    <div className="w-full min-h-full  relative">
      <div className="blur-3xl mx-auto h-full flex gap-5 flex-col-reverse xl:flex-row p-5 xl:p-10 justify-center items-start">
        <ReactCodeMirror
          height="600px"
          style={{ maxWidth: "1000px", width: "100%" }}
          theme={"dark"}
          value="Morbi posuere urna in nunc facilisis tristique. In vitae blandit lectus. Aliquam cursus, augue in sagittis laoreet, diam ante mollis nisi, vitae tincidunt ligula dolor non nunc. In vitae justo vitae dolor pulvinar lacinia quis eget sem. Mauris lobortis magna pharetra purus tristique, ac luctus erat lobortis. Curabitur fringilla purus eu purus euismod consectetur. Nunc imperdiet ultricies ipsum ac mollis. Integer semper magna a nisi congue, at facilisis libero facilisis."
          readOnly={true}
          lang="en"
          className="z-0"
        />
        <Card className="min-h-[350px] w-full sm:w-[350px] mx-auto lg:mx-0">
          <CardHeader className="text-center">
            <CardTitle>Author</CardTitle>
            <CardDescription>
              <Link to={"/user/mahdi22dev"} className="text-primary text-3xl">
                Mahdi22dev
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between gap-3 flex-wrap ">
            <div className="space-y-3 w-full">
              <PasteInfoItem text="Views" info="10000" Icon={Eye} />
              <PasteInfoItem text="created" info={""} Icon={Calendar} />
            </div>
            <div className="space-y-3 w-full">
              <PasteInfoItem text="Visibility" info={"Password"} Icon={View} />
              <PasteInfoItem text="Expires" info={""} Icon={Clock2} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size={"lg"}>
              Download
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* <div className="absolute top-0 bottom-0 left-0 right-0 bg-black z-50"></div> */}
      <form className="absolute inset-0 flex justify-center items-center z-50 flex-col gap-4">
        <Input
          placeholder="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value);
          }}
          className="w-520"
          type="password"
        />
        <Button onClick={handleUnlock}>Unlock paste</Button>
      </form>
    </div>
  );
};

export default Past;
