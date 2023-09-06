'use client'

import CourseDetails from "@/components/courses/details/app.details.course";

export default function Course({ params }: { params: { course: string } }) {
    console.log("p",params);
    return (<div>
        <CourseDetails courseName={params.course}/>
    </div>)
}