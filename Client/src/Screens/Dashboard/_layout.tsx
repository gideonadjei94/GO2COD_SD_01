import { DashboardLinks } from "@/Components/DashboardLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { LogOut, MenuIcon, Settings, User2 } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen w-full bg-muted/40 flex">
        {/* SIDENAV */}
        <div className="hidden md:block border-r bg-white basis-[20%] h-screen shadow">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex  items-center border-b px-4 lg:h-[80px] lg:px-6">
              <Link to={""} className="flex items-center gap-2">
                {/* <img src={logo} alt="" className="h-10 w-auto mr-2" /> */}
                <p className="text-xl font-semibold text-primary">
                  Contacts Box
                </p>
              </Link>
            </div>

            {/* SIDENAV LINKS */}
            <div className="flex-1 mt-4">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className="h-20  flex items-center justify-between basis-[100%] md:basis-[80%] bg-white shadow px-10">
          <Input
            placeholder="Search"
            className="border-none bg-primary/10 w-72 hidden md:block"
          />
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="left">
                <p className="text-lg font-semibold">Example Int Sch.</p>
                <SheetClose className="mt-5 w-full">
                  <DashboardLinks />
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center">
            {/* <div>
              <Bell className="mr-4 relative" />
              <Badge
                variant="destructive"
                className="absolute top-4 text-xs size-5 flex items-center justify-center right-[88px]"
              >
                5
              </Badge>
            </div> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 font-medium">
                    AD
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>User Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="" className="flex items-center">
                      <User2 className="mr-2" /> Your Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="" className="flex items-center">
                      <Settings className="mr-2" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="" className="flex items-center text-red-500">
                      <LogOut className="mr-2" /> Log Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
