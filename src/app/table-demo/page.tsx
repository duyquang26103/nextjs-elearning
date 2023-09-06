'use client'

import useSWR from "swr";
import TableComponentsDemo from "@/components/app.table.demo";
import React, {Suspense} from "react";
import Loading from "@/app/loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const {data, error, isLoading} = useSWR(
        "http://localhost:8000/persons",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
        <>
            {isLoading ? <Suspense fallback={<Loading />}/> : ''}
            <TableComponentsDemo persons={data}/>
        </>
    )
}

