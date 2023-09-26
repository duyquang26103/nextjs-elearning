import useSWR from "swr";

export function middleware(useSWRNext: any) {
    return (key: string, fetcher: () => Promise<any>, config: any) => {
        // Add logger to the original fetcher.
        const extendedFetcher = (...args: any[]) => {
            return fetcher(...args)
        }

        // Execute the hook with the new fetcher.
        return useSWRNext(key, extendedFetcher, config)
    }
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCourses = (): { data: ICourseDetails[], isLoading: boolean, error: any } => {
    const {data, isLoading, error} = useSWR("http://localhost:4000/courses", fetcher, {use: [middleware]});
    return {data, isLoading, error};
};

export const useCourseDetails = (courseName: string): { data: ICourseDetails, isLoading: boolean, error: any } => {
    const {data, isLoading, error} = useSWR(`http://localhost:4000/courses`, fetcher, {use: [middleware]});
    let courseDetails;
    if (data) {
        courseDetails = data.filter((item: any) => item.path == courseName)
    }
    return {data: courseDetails, isLoading, error};
};

export const useCategories = (): { data: any, isLoading: boolean, error: any } => {
    const {data, isLoading, error} = useSWR(`http://localhost:4000/categories`, fetcher, {use: [middleware]});
    return {data, isLoading, error};
};