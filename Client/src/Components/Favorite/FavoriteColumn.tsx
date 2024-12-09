import { getAvatarColor, getInitials } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown, Copy, Mail, MoreHorizontal, Undo2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";

export type Contact = {
  id: string;
  name: string;
  number: string;
  email: string;
};
export const contacts: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
                <div className="flex justify-evenly">
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className=" gap-y-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Copy className="size-4" />
              Copy Contact
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Undo2 className="size-4" />
              Remove From Favorite
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
