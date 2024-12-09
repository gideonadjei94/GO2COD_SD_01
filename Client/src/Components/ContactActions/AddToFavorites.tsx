import { Plus } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { postWithToken } from "@/lib/useApiHandler";
import { getUser } from "@/lib/store";
import { toast } from "sonner";

interface favoriteProps {
  name: string;
  number: string;
  email: string;
}

export default function AddToFavorites({ name, number, email }: favoriteProps) {
  const handleSubmit = async () => {
    const user = getUser();
    const data = {
      contact: {
        name,
        number,
        email,
      },
    };
    const res = await postWithToken(
      `api/v1/user/favorites/add/${user.favorites_id}`,
      data
    );
    toast.success(res.status, {
      description: res.message,
    });
  };
  return (
    <>
      <DropdownMenuItem onClick={handleSubmit}>
        <Plus className="size-4" />
        Add To Favorite
      </DropdownMenuItem>
    </>
  );
}
