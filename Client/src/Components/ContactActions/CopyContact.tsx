import { Copy } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

interface CopyContactProps {
  contact: {
    name: string;
    email: string;
    number: string;
  };
}

export default function CopyContact({ contact }: CopyContactProps) {
  const handleCopy = () => {
    const contactInfo = `Name: ${contact.name}\nEmail: ${contact.email}\nNumber: ${contact.number}`;

    navigator.clipboard
      .writeText(contactInfo)
      .then(() => {
        toast.success("Contact copied to clipboard!", {
          description: "You can now paste it anywhere.",
        });
      })
      .catch(() => {
        toast.error("Failed to copy contact", {
          description: "An error occurred while copying the contact.",
        });
      });
  };

  return (
    <DropdownMenuItem onClick={handleCopy}>
      <Copy className="size-4" />
      Copy Contact
    </DropdownMenuItem>
  );
}
