'use client'

import styles from './page.module.css';
import CourseCards from "@/components/courses/app.courses";


export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.description}>
                    <CourseCards/>
                </div>
            </main>
        </>
    )
}

