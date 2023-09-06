'use client'

import CourseCards from "@/components/courses/app.courses";
import useSWR from "swr";
import { CourseContext } from "@/app/courses/courseContext";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Courses() {
    const {data, error, isLoading} = useSWR(
        "http://localhost:8000/courses",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    console.log('data',data)
    return (
        <CourseContext.Provider value={{data}}>
            <CourseCards/>
        </CourseContext.Provider>)
}