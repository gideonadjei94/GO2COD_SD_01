import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { NavLink } from "react-router-dom";

export const AuthForm = () => {
  const [authType, setAuthType] = useState("login");
  return (
    <div className="bg-white p-4 shadow-xl rounded-md flex flex-col items-center w-full">
      <h1 className="text-3xl text-center font-semibold text-primary mt-6">
        {authType === "login" ? "Welcome back!" : "Hi There!"}
      </h1>
      <p className="text-muted-foreground mb-2">
        {authType === "login"
          ? "Sign In to continue"
          : "Let's get you started by Signing Up"}
      </p>

      <form className="w-full px-4 mt-2 my-2">
        <div
          className={cn(
            "group relative mb-4",
            authType === "login" ? "hidden" : "block"
          )}
        >
          <label
            htmlFor="name"
            className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm  text-medium group-has-[:disabled]:opacity-50"
          >
            Name
          </label>
          <Input className="h-12 w-full" type="text" />
        </div>

        <div className="group relative">
          <label
            htmlFor="email"
            className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm  text-medium group-has-[:disabled]:opacity-50"
          >
            Email
          </label>
          <Input className="h-12 w-full" type="email" />
        </div>

        <div className="group relative mt-4">
          <label
            htmlFor="password"
            className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm  text-medium group-has-[:disabled]:opacity-50"
          >
            Password
          </label>
          <Input className="h-12 w-full" type="password" />
        </div>

        <NavLink to={"/dashboard"}>
          <Button className="w-full mt-3 py-6 text-md">Continue</Button>
        </NavLink>

        <p className="text-sm text-center mt-4">
          {authType === "login"
            ? " Don't have an account?"
            : "Already have an account?"}{" "}
          <span>
            <button
              type="button"
              className="text-primary"
              onClick={() =>
                setAuthType((prevType) =>
                  prevType === "login" ? "signup" : "login"
                )
              }
            >
              {authType === "login" ? "SignUp" : "Login"}
            </button>
          </span>
        </p>
        <div className="w-full flex items-center justify-center my-3">
          <div className="h-[1px] w-[40%] bg-gray-200 mr-2" />
          <p className="text-sm text-muted-foreground">Or</p>
          <div className="h-[1px] w-[40%] bg-gray-200 ml-2" />
        </div>
        <GoogleAuthButton />
      </form>
    </div>
  );
};
