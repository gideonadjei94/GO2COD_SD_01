import { Contact, contacts } from "@/Components/Columns";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

export default function Contacts() {
  return (
    <div className="">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Contacts </h1>
        <Button className="bg-slate-900">
          <Plus />
          Add Contact
        </Button>
      </div>
      <div className="container mx-auto py-14 ">
        <DataTable columns={contacts} data={data} />
      </div>
    </div>
  );
}

const data: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    number: "+1-555-123-4567",
    email: "alice.johnson@example.com",
  },
  {
    id: "2",
    name: "Bob Smith",
    number: "+1-555-987-6543",
    email: "bob.smith@example.com",
  },
  {
    id: "3",
    name: "Charlie Davis",
    number: "+1-555-567-8901",
    email: "charlie.davis@example.com",
  },
  {
    id: "4",
    name: "Diana Moore",
    number: "+1-555-234-5678",
    email: "diana.moore@example.com",
  },
  {
    id: "5",
    name: "Ethan Brown",
    number: "+1-555-876-5432",
    email: "ethan.brown@example.com",
  },
  {
    id: "6",
    name: "Fiona White",
    number: "+1-555-345-6789",
    email: "fiona.white@example.com",
  },
  {
    id: "7",
    name: "George Wilson",
    number: "+1-555-456-7890",
    email: "george.wilson@example.com",
  },
  {
    id: "8",
    name: "Hannah Taylor",
    number: "+1-555-654-3210",
    email: "hannah.taylor@example.com",
  },
  {
    id: "9",
    name: "Isaac Martinez",
    number: "+1-555-789-0123",
    email: "isaac.martinez@example.com",
  },
  {
    id: "10",
    name: "Julia Adams",
    number: "+1-555-901-2345",
    email: "julia.adams@example.com",
  },
];
