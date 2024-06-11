'use client'
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";

export function GetLines({ lines, line, setter }: any) {
   return (
      <>
         <label className="flex">
            <select value={`${line}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  setter(e.target.value)
               }}>

               {lines.map((line: any) => {
                  return <option key={line} value={`${line}`}>
                     {line}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetNames({ names, name, setter }: any) {
   return (
      <>
         <label className="flex">
            <select value={`${name}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  setter(e.target.value)
               }}>

               {names.map((name: any) => {
                  return <option key={name} value={`${name}`}>
                     {name}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetTimeIntervals() {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const interval = (pathArray[2]) ? pathArray[2] : process.env.DASHBOARD_DEFAULT_INTERVAL;
   const ints = [1, 2, 4, 8, 12, 24]
   return (
      <>
         <label className="flex">
            <select value={`/live/${interval}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {ints.map((int: any) => {
                  return <option key={int} value={`/live/${int}`}>
                     {int}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}