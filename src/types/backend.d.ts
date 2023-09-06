interface IPerson {
    id: number,
    lastName: string,
    firstName: string,
    age: number,
    isNew: boolean
}

interface ICategories {
    name: string,
    courses: ICourse[]
}

interface ICourse {
    name: string,
    subCourse?: subCourse[]
}

interface subCourse {
    name: string
}

interface ICourseDetails {
    title: string,
    description: string,
    image: string,
    path: string,
    details: string
}
