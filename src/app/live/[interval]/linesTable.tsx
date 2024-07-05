'use client'
import React, { Component, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useSession } from 'next-auth/react';
import { LiveChart } from "./liveChart";
import { createThemes } from "@/styles/themes";
import { getNames } from '@/services/values';
import { Loading } from "@/components/loading.component";
import { GaugeChart } from './gaugeChart';
import { BoolChart } from './boolChart';

const ExpandedComponent = ({ data }: any) => {
   const { data: session, status } = useSession();
   const [names, setNames] = useState(null);
   const [units, setUnits] = useState(null);
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      getNames({ line: data.line }, session?.user.db)
         .then((res: any) => {
            setNames(res.names);
            setUnits(res.units);
            setLoading(false)
         });
   }, [data, session?.user.db])

   if (isLoading) return <Loading />

   const layoutConf: any = [
      [
         {
            type: 'line',
            index: '5'
         }
      ],
      [
         {
            type: 'gauge',
            index: '9'
         },
         {
            type: 'bool',
            index: '1'
         }
      ],
      [
         {
            type: 'bool',
            index: '1'
         },
         {
            type: 'gauge',
            index: '7'
         }
      ]
   ]

   return (
      <>
         <div className="flex flex-row flex-wrap mt-2">
            {layoutConf.map((conf: any, index: number) => {
               return < div key={index} className={`flex flex-col ${conf.length > 1 ? 'basis-3/12' : 'basis-6/12'}`}>
                  {conf.map((ele: any, i: number) => {
                     if (ele.type == 'line') {
                        return <LiveChart
                           key={i}
                           title={'productividad'}
                           line={data.line}
                           names={names}
                           index={ele.index}
                           units={units}
                           interval={data.interval}
                        />
                     } else if (ele.type == 'gauge') {
                        return <GaugeChart
                           key={i}
                           title={'productividad'}
                           line={data.line}
                           names={names}
                           index={ele.index}
                           units={units}
                           interval={data.interval}
                        />
                     } else if (ele.type == 'bool') {
                        return <BoolChart
                           key={i}
                           title={'productividad'}
                           line={data.line}
                           names={names}
                           index={ele.index}
                           units={units}
                           interval={data.interval}
                        />
                     }
                  })}
               </div>
            })}
         </div >
      </>
   );
}

export function LinesTable({ lines, interval }: any) {
   let columns: any = [{
      name: 'Line',
      selector: (row: any) => row.line,
      sortable: true,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   const data = lines.map((line: String) => {
      return ({
         line: line,
         interval: interval
      })
   });

   data[0].defaultExpanded = true;

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