import { Edit2 } from "lucide-react";
import { getUser } from "@/lib/store";
import { putWithToken } from "@/lib/useApiHandler";
import { toast } from "sonner";
import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface editProps {
  contactId: string;
  id?: string;
  name?: string;
  number?: string;
  email?: string;
}
export default function EditContact({
  contactId,
  number,
  email,
  name,
}: editProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: name || "",
    number: number || "",
    email: email || "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = getUser();
    const data = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
    };
    const res = await putWithToken(
      `api/v1/phonebook/update/${user.phonebook_id}/${contactId}`,
      data
    );

    toast.success(res.status, {
      description: res.message,
    });
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="p-0"
          >
            <Edit2 className="size-4" />
            Edit Contact
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.stopPropagation();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-slate-900">Edit Contact</DialogTitle>
            <DialogDescription>
              Make changes to this contact in your Phonebook.
            </DialogDescription>
          </DialogHeader>

          <form className="py-2" onSubmit={handleSubmit}>
            <div className="mb-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
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
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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

              <Button type="submit" className="bg-slate-900 text-white px-7">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
