import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { postWithToken } from "@/lib/useApiHandler";
import { getUser } from "@/lib/store";
import { toast } from "sonner";
import SubmitButton from "../SubmitButton";

export function AddContact() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = getUser();
    setIsLoading(true);
    const res = await postWithToken(
      `api/v1/phonebook/add/${user.phonebook_id}`,
      formData
    );

    toast.success(res.status, {
      description: res.message,
    });

    setFormData({
      name: "",
      number: "",
      email: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          className="bg-slate-900"
          type="button"
          onClick={() => setOpen(true)}
        >
          <Plus />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Add Contact</DialogTitle>
          <DialogDescription>
            Add a new contact to your Phonebook.
          </DialogDescription>
        </DialogHeader>

        <form className="py-2" onSubmit={handleSubmit}>
          <div className="mb-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              placeholder="+233/(0)-241571751 "
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="johndoe@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between  w-full mt-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <SubmitButton
              isLoading={isLoading}
              text="Done"
              classname="text-white bg-slate-900 px-7"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
