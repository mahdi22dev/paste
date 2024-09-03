import { Button } from "@/components/ui/button";
import google from "../../assets/google.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [_, setLoading] = useState(false);
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@gmail.com",
          password: "mahdi2019",
          username: "wefwfwef",
        }),
      });
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center">
      <div>paste nest agly logo</div>
      <h1 className="text-xl">Welcome Back! Please enter your details </h1>
      <Button className="bg-white text-black hover:bg-white flex justify-center items-center gap-3 p-6 font-extrabold">
        <div className="w-5">
          <img src={google} />
        </div>
        Log in with Google{" "}
      </Button>
      <div className="flex items-center justify-center gap-3">
        <Separator className="w-[40%]" />
        <p>Or</p>
        <Separator className="w-[40%]" />
      </div>
      <div className="flex flex-col gap-5 ">
        <Input
          placeholder="Username"
          className="gap-5 p-6 font-extrabold placeholder:opacity-80"
        />
        <Input
          placeholder="Email"
          className="gap-5 p-6 font-extrabold placeholder:opacity-80"
        />
        <Input
          placeholder="Password"
          className="gap-5 p-6 font-extrabold placeholder:opacity-80"
        />

        <Button className="mt-5 p-6 font-extrabold" onClick={handleSignUp}>
          Sign Up
        </Button>
        <div className="text-sm mx-auto flex justify-center items-center">
          Already have an account?
          <Button asChild variant={"link"}>
            <Link to={"/auth/signin"}>Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
