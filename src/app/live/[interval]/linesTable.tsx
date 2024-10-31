'use client'
import React, { MouseEventHandler, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useSession } from 'next-auth/react';
import { LiveChart } from "./liveChart";
import { createThemes } from "@/styles/themes";
import { Loading } from "@/components/loading.component";
import { GaugeChart } from './gaugeChart';
import { BoolChart } from './boolChart';
import { FaPlus, FaXmark } from "react-icons/fa6";
import RGL, { WidthProvider } from "react-grid-layout";

const GridLayout = WidthProvider(RGL);


const ExpandedComponent = ({ data }: any) => {
   const { data: session, status, update } = useSession();
   const [layoutConf, setLayoutConf] = useState([]);

   useEffect(() => {
      setLayoutConf(session?.user.config.live[data.line] as any)
   }, [data, session])

   function handleDel(i: any): void {
      if (session) {
         let user = session.user;
         user.config.live[data.line].splice(i, 1);
         update(user);
      }

   }

   if (layoutConf == undefined) return <Loading />

   const width = window.innerWidth - 105;

   return (
      <GridLayout
         className="layout bg-bgDark rounded-md mt-2"
         layout={layoutConf}
         cols={8}
         rowHeight={width / 20}
         width={width}
         draggableHandle=".dragHandle"
      >
         {layoutConf.map((chart: any, index: number) => {
            chart.i = index.toString();
            if (chart.type == 'line') {
               return < div key={chart.i} className='bg-bgLight rounded-md'>
                  <div className="flex flex-row justify-between rounded-t-md bg-gradient-to-b from-40% from-bgLight to bg-bgDark">
                     <span className="flex-grow text-center dragHandle cursor-grab active:cursor-grabbing">{chart.name} ({chart.unit})</span>
                     <FaXmark size={20} onClick={() => { handleDel(chart.i); }} className='cursor-pointer mx-3 my-1 text-accent'>Remove Graph</FaXmark>
                  </div>
                  <LiveChart
                     i={chart.i}
                     line={data.line}
                     name={chart.name}
                     unit={chart.unit}
                     interval={data.interval}
                  />
               </div>
            } else if (chart.type == 'gauge') {
               return < div key={chart.i} className='bg-bgLight rounded-md'>
                  <div className="flex flex-row justify-between rounded-t-md bg-gradient-to-b from-40% from-bgLight to bg-bgDark">
                     <span className=" flex-grow text-center dragHandle cursor-grab active:cursor-grabbing">{chart.name} ({chart.unit})</span>
                     <FaXmark size={20} onClick={() => { handleDel(chart.i); }} className='cursor-pointer mx-3 my-1 text-accent'>Remove Graph</FaXmark>
                  </div>
                  <GaugeChart
                     i={chart.i}
                     line={data.line}
                     name={chart.name}
                     unit={chart.unit}
                  />
               </div>
            } else if (chart.type == 'bool') {
               return < div key={chart.i} className='bg-bgLight rounded-md'>
                  <div className="flex flex-row justify-between rounded-t-md bg-gradient-to-b from-40% from-bgLight to bg-bgDark">
                     <span className=" flex-grow text-center dragHandle cursor-grab active:cursor-grabbing">{chart.name}</span>
                     <FaXmark size={20} onClick={() => { handleDel(chart.i); }} className='cursor-pointer mx-3 my-1 text-accent'>Remove Graph</FaXmark>
                  </div>
                  <BoolChart
                     i={chart.i}
                     line={data.line}
                     name={chart.name}
                  />
               </div>
            }
         })}
      </GridLayout >
   );
}

const handleAdd = (row: any, session: any, update: any, selected: any) => async (event: any) => {
   let user = session.user;
   let newData = {
      i: (user.config.live[row.line].length).toString(),
      x: 8,
      y: 0,
      w: 4,
      h: 4,
      type: selected[row.line].type,
      name: selected[row.line].sensor
   };
   switch (selected[row.line].type) {
      case 'gauge':
         newData.w = 2;
         newData.h = 3
         break;
      case 'bool':
         newData.w = 1;
         newData.h = 1
         break;
      default:
         break;
   }

   user.config.live[row.line].push(newData);
   update(user);
}

export function LinesTable({ lines, interval, sensors, types, selected }: any) {
   const { data: session, status, update } = useSession();
   let columns: any = [{
      name: 'Line',
      selector: (row: any) => row.line,
      sortable: true,
      grow: 6,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'Selects',
      cell: (row: any) => (
         <div className='flex flex-row mr-2'>
            <select id="line" className={'text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 border-foreground'}
               onChange={e => {
                  row.type = e.target.value;
                  selected[row.line].type = e.target.value;
               }}>
               {types.map((type: any, i: number) => {
                  return <option key={i} value={`${type}`} tabIndex={i}>
                     {type}
                  </option>
               })}
            </select>

            <select id="sensor" className={'text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 border-foreground'}
               onChange={e => {
                  row.sensor = e.target.value;
                  selected[row.line].sensor = e.target.value;
               }}>
               {sensors[row.line].map((sensor: any, i: number) => {
                  return <option key={i} value={`${sensor.name}`} tabIndex={i}>
                     {sensor.name}
                  </option>
               })}
            </select>
         </div>
      ),
      grow: 1,
      ignoreRowClick: true,
      button: false,
   },
   {
      name: 'Accions',
      cell: (row: any) => (
         <FaPlus size={20} onClick={handleAdd(row, session, update, selected)} className='cursor-pointer mx-3 my-1 text-accent'>ADD Graph</FaPlus>
      ),
      grow: 1,
      ignoreRowClick: true,
      button: true,
   }];

   const data = lines.map((line: string) => {
      return ({
         line: line,
         interval: interval,
         type: 'line',
         sensor: sensors[line] ? sensors[line][0].name : null
      })
   });

   if (data[0]) {
      data[0].defaultExpanded = true;
   }

   createThemes();

   return (
      <div className='flex-col grow'>
         <a className="flex justify-center text-xl font-bold">Production Lines</a>
         <DataTable
            className='flex'
            columns={columns}
            data={data}
            theme={'custom'}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={ExpandedComponent}
            expandableRowExpanded={(row: any) => row.defaultExpanded}
         />
      </div>
   )
};