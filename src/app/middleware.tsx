import useSWR from "swr";

export function myMiddleware (useSWRNext) {
    return (key, fetcher, config) => {
        // Add logger to the original fetcher.
        const extendedFetcher = (...args) => {
            console.log('SWR Request:', key)
            return fetcher(...args)
        }

        // Execute the hook with the new fetcher.
        return useSWRNext(key, extendedFetcher, config)
    }
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCourses = () => {
    const { data, isLoading, error } = useSWR("http://localhost:8000/courses", fetcher,  { use: [myMiddleware] });
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return { data } ;
};

export const useCourseDetail = (courseName: string) => {
    const { data, isLoading, error } = useSWR(`http://localhost:8000/courses`, fetcher, { use: [myMiddleware] });
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return data.filter((item: any) => item.path == courseName);
};