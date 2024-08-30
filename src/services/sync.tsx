import _ from "lodash"
import { SyncIface } from "@/schemas/sync";
import { getSession } from "./session";

export const getSync = async (db: string | undefined) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nodeRed/sync/${db}`,
      {
         method: 'GET',
         headers: {
            'Content-type': 'application/json',
            token: `${process.env.NEXT_PUBLIC_API_KEY}`,
         },
      }).then(res => res.json());
}

export const postSync = async (data: SyncIface, db?: string) => {
   if (!db) {
      const session = await getSession();
      db = session?.user.db;
   }

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nodeRed/sync/${db}`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
            token: `${process.env.NEXT_PUBLIC_API_KEY}`,
         },
         body: JSON.stringify(data),
      }).then(res => res.json());
}