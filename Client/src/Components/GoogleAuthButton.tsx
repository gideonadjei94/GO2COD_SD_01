import { Button } from "./ui/button";
import Google from "/Google.webp";

export function GoogleAuthButton() {
  return (
    <Button className="w-full py-6 flex justify-start" variant="outline">
      <img src={Google} alt="" className="size-7" />
      Continue with Google
    </Button>
  );
}
