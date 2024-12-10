import { Trash2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { getUser } from "@/lib/store";

export default function AddToTrash() {
  const user = getUser();

  const handleSubmit = async () => {};
  return (
    <>
      <DropdownMenuItem className="text-red-500">
        <Trash2 />
        Move To Trash
      </DropdownMenuItem>
    </>
  );
}
