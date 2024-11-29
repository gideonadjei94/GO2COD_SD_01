import { AuthForm } from "@/Components/AuthForm";
import illustration from "/contact1.png";

export default function LandingPage() {
  return (
    <div className="w-full flex min-h-screen bg-[#f3f4f6] ">
      {/* left */}
      <div className="basis-[60%] flex flex-col items-center ">
        <h1 className=" bg-primary/10 py-2 px-4 rounded-full   text-sm mt-12">
          Introducing Contacts Box 1.0
        </h1>
        <img src={illustration} alt="illustration" />
        <h1 className="text-6xl text-center font-semibold text-black">
          Contacts Management <br />{" "}
          <span className="text-primary">Made Easy!</span>
        </h1>
      </div>

      {/* right */}
      <div className="basis-[35%]  flex items-center  px-14">
        <AuthForm />
      </div>
    </div>
  );
}
