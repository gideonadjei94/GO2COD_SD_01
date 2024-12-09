import { TrashTable } from "@/Components/Trash/TrashTable";
import { contacts } from "@/Components/Trash/TrashColums";
import { getUser } from "@/lib/store";
import { useEffect, useState } from "react";
import { getWithToken } from "@/lib/useApiHandler";

export default function Trash() {
  const user = getUser();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const res = await getWithToken(`api/v1/user/trash/all/${user.trash_id}`);
      setData(res.trash.contacts);
    };

    getContacts();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Trash</h1>

      <div className="container mx-auto py-14 ">
        <TrashTable columns={contacts} data={data} />
      </div>
    </div>
  );
}
