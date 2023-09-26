interface IUser {
    id: number,
    lastName: string,
    firstName: string,
    age: number,
    isNew: boolean
}

interface ICategories {
    categoryName: string,
    courses: ICourse[]
}

interface ICourse {
    courseName: string,
    subCourse?: subCourse[]
}

interface subCourse {
    name: string
}

interface ICourseDetails {
    category: ICategories,
    courseName: string,
    description: string,
    image: string,
    path: string,
    details: string
}
