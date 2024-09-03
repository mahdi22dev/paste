import { Button } from "@/components/ui/button";
import google from "../../assets/google.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Formik, useField, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "@/lib/validation";
import { PulseLoader } from "react-spinners";
import { toast } from "@/hooks/use-toast";

function SignIn() {
  return (
    <div className="flex flex-col gap-10 justify-center">
      <div>paste nest agly logo</div>
      <h1 className="text-xl">Welcome Back! Please enter your details </h1>
      <SignInForm />
    </div>
  );
}

const SignInForm = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (values: any) => {
    try {
      localStorage.setItem("remember_me", "true");
      setMessage("");

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      let token = await response.json();
      if (!response.ok) {
        setMessage(token.message.message);
        return;
      }

      if (token?.access_token) {
        try {
          localStorage.setItem("auth_token", token.access_token);
          return navigate("/user/posts");
        } catch (error) {
          toast({
            variant: "default",
            title: "Please Try again later",
            description: "internal server error at " + new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      toast({
        variant: "default",
        title: "Please Try again later",
        description: "internal server error at " + new Date().toISOString(),
      });
    }
  };

  return (
    <>
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

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={async (values, {}) => {
          await handleSignin(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {message && (
              <p className="text-destructive p-2 mb-4 text-center text-[16px]">
                {message}
              </p>
            )}
            <div className="flex flex-col gap-5 ">
              <MyTextInput
                label="Email address"
                name="email"
                type="text"
                placeholder="Email"
                disabled={isSubmitting}
              />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                disabled={isSubmitting}
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

              <Button
                type="submit"
                className="mt-5 p-6 font-extrabold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <PulseLoader color="#1f0620" size={10} />
                ) : (
                  "Sign in"
                )}
              </Button>
              <div className="text-sm mx-auto flex justify-center items-center">
                Don't have account?
                <Button asChild variant={"link"}>
                  <Link to={"/auth/signup"}>Sign up for free</Link>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const MyTextInput = ({ ...props }) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  return (
    <div>
      <Input
        {...field}
        {...props}
        className="gap-5 p-6 font-extrabold placeholder:opacity-80"
      />

      {meta.touched && meta.error ? (
        <div className="text-destructive mt-3 text-[13px]">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default SignIn;
