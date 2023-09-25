'use client'

import CourseDetails from "@/components/courses/details/app.overview.course";
import { CourseSlider } from "@/components/courses/details/app.carousel.course";

export default function Course({ params }: { params: { course: string } }) {
    return (<div>
        <CourseDetails courseName={params.course}/>
        <CourseSlider courseName={params.course}/>
    </div>)
}