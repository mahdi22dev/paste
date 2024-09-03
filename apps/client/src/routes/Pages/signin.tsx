import { Button } from "@/components/ui/button";
import google from "../../assets/google.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";
function SignIn() {
  const [_, setLoading] = useState(false);
  const handleSignin = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email: "admin@gmail.com",
          password: "mahdi2019",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = (await response.json()) as { access_token: string };
      if (token.access_token) {
        localStorage.setItem("auth_token", token.access_token);
      } else {
        // show pleaes try again
      }
    } catch (error) {
      // dispaly error
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
          placeholder="Email"
          className="gap-5 p-6 font-extrabold placeholder:opacity-80"
        />
        <Input
          placeholder="Password"
          className="gap-5 p-6 font-extrabold placeholder:opacity-80"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="mt-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Button variant={"link"}>Forget password</Button>
        </div>
        <Button className="mt-5 p-6 font-extrabold" onClick={handleSignin}>
          Sign in
        </Button>
        <div className="text-sm mx-auto flex justify-center items-center">
          Don't have account?
          <Button asChild variant={"link"}>
            <Link to={"/auth/signup"}>Sign up for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
