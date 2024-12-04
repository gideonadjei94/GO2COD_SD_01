import { getAvatarColor, getInitials } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Copy,
  Edit2,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export type Contact = {
  id: string;
  name: string;
  number: string;
  email: string;
};
export const contacts: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="">
        {" "}
        <Checkbox className="mr-2" />
        Name
      </div>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name");
      const formattedName = getInitials(`${name}`);

      return (
        <div className="flex items-center  ">
          <div className="flex items-center">
            <Checkbox />
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="ml-2">
                  <AvatarImage src="" />
                  <AvatarFallback
                    className={`${getAvatarColor(name as string)} text-white`}
                  >
                    {formattedName}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex justify-between space-x-2">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback
                      className={`${getAvatarColor(name as string)} text-white`}
                    >
                      {formattedName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="">
                    <h4 className="text-sm font-semibold">{name as string}</h4>
                    <p className="text-sm">Phone: {row.getValue("number")}</p>
                    <div className="flex items-center pt-2">
                      <Mail className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        {row.getValue("email")}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="ml-5">{row.getValue("name")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Copy className="size-4" />
              Copy
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Edit2 className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="size-4" />
              Add
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
