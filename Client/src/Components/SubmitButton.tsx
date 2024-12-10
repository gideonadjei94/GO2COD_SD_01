import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface btnProps {
  isLoading: boolean;
  classname?: string;
  text: string;
}

export default function SubmitButton({ isLoading, text, classname }: btnProps) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      variant={isLoading ? "secondary" : "default"}
      className={cn(classname)}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin size-4 mr-2" /> Please Wait
        </div>
      ) : (
        <p>{text}</p>
      )}
    </Button>
  );
}
