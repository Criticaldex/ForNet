import { getLines } from "@/services/values";
import { LinesTable } from "./linesTable";


export default async function Dashboard({ params }: any) {
   const { interval } = params;
   const lines = await getLines();

   return (
      <>
         <div className="flex mx-2 mb-2">
            <div className="flex grow p-1 bg-bgLight rounded-md ">
               <LinesTable
                  lines={lines}
                  interval={interval}
               />
            </div>
         </div>
      </>
   )
}