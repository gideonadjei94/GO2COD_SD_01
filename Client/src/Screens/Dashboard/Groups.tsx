import { GroupTable } from "@/Components/Groups/GroupsTable";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { contacts } from "@/Components/Groups/GroupsColumns";

export default function Groups() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Groups</h1>
        <Dialog open={open}>
          <DialogTrigger asChild>
            <Button
              className="bg-slate-900"
              type="button"
              onClick={() => setOpen(true)}
            >
              <Plus />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-slate-900">Create Group</DialogTitle>
              <DialogDescription>
                Group your contacts for easy access
              </DialogDescription>
            </DialogHeader>

            <form className="">
              <div className="mb-2">
                <Label htmlFor="name" className="mb-2">
                  Group Name
                </Label>
                <Input
                  id="name"
                  placeholder="eg. Family"
                  type="text"
                  name="name"
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
                  Create
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4 ml-4">
        <Select>
          <SelectTrigger className="w-40 ">
            <SelectValue placeholder="Groups" />
          </SelectTrigger>
        </Select>
      </div>

      <div className="container mx-auto py-14">
        <GroupTable columns={contacts} data={data} />
      </div>
    </div>
  );
}
