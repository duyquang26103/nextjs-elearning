'use client'

import CourseCards from "@/components/courses/app.courses";
import {usePathname} from "next/navigation";
export default function Courses() {
    const currentPath = usePathname();
    let path = currentPath.split('/');
    const categoryName = path[(path.length) -1];
    return <CourseCards categoryName={categoryName}/>
}