import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { login, register } from "@/lib/useApiHandler";
import { toast } from "sonner";
import { setUser } from "@/lib/store";
import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";

export const AuthForm = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authType === "signup") {
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const signUpResponse = await register(signupData);
      if (signUpResponse.error) {
        console.log(signUpResponse.message);
        toast.error("Failed to SignUp", {
          description: `${signUpResponse.message}`,
        });
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        setUser(signUpResponse.token, signUpResponse.user);
        toast.success(`${signUpResponse.message}`);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } else {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      const loginResponse = await login(loginData);
      if (loginResponse.error) {
        console.log(loginResponse.message);
        toast.error("Failed to SignUp", {
          description: `${loginResponse.message}`,
        });
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        setUser(loginResponse.token, loginResponse.user);
        toast.success(`${loginResponse.message}`);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/dashboard");
      }
    }
  };
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

      <form className="w-full px-4 mt-2 my-2" onSubmit={handleSubmit}>
        <div className={cn(" mb-4", authType === "login" ? "hidden" : "block")}>
          <Input
            placeholder="Your Name"
            className="h-12 w-full"
            type="text"
            required={authType !== "login"}
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
        </div>

        <Input
          placeholder="Your Email"
          className="h-12 w-full"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="group relative mt-4">
          <Input
            placeholder="Your Password"
            className="h-12 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button className="w-full mt-3 py-6 text-md" type="submit">
          Continue
        </Button>

        {/* <NavLink to={"/dashboard"}>
        </NavLink> */}

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
