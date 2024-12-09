import { FavTable } from "@/Components/Favorite/FavTable";
import { contacts } from "@/Components/Favorite/FavoriteColumn";
import { getUser } from "@/lib/store";
import { getWithToken } from "@/lib/useApiHandler";
import { useEffect, useState } from "react";

export default function Favorites() {
  const user = getUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await getWithToken(
        `api/v1/user/favorites/all/${user.favorites_id}`
      );
      setData(res.favorite.contacts);
    };

    getContacts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Favorites</h1>

      <div className="container mx-auto py-14 ">
        <FavTable columns={contacts} data={data} />
      </div>
    </div>
  );
}
