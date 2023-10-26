import useSWR from "swr";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

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

export const useCourses = (): { data: { data: ICourseDetails[] }, isLoading: boolean, error: any } => {
    const {data, isLoading, error} = useSWR("http://localhost:4000/courses", fetcher, swrOptions);
    return {data, isLoading, error};
};

export const useCourseDetails = (courseName: string): { data: any, isLoading: boolean, error: any } => {
    const {data, isLoading, error} = useCourses()
    if (data) {
        const courseDetails = data.data.filter((item: any) => areStringsEqual(item.courseName, courseName))
        return {data: courseDetails, isLoading, error}
    }
    return {data: [], isLoading, error};
};

export const useCategories = (): { data: { data: ICategories[] }, isLoading: boolean, error: any } => {
    const {data, isLoading, error} = useSWR(`http://localhost:4000/categories`, fetcher, swrOptions);
    return {data, isLoading, error};
};

function areStringsEqual(str1: string, str2: string) {
    const normalizedStr1 = str1.toLowerCase();
    const normalizedStr2 = str2.toLowerCase();

    const decodedStr1 = decodeURIComponent(normalizedStr1);
    const decodedStr2 = decodeURIComponent(normalizedStr2);

    return decodedStr1 === decodedStr2;
}

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    use: [middleware]
}

const client = new KintoneRestAPIClient({
    baseUrl: "https://te-amp-2.cybozu-dev.com",
    httpsAgent: 'http://dc-ty3-squid-1.cb.local:3128',
    auth: {
        username: 'cybozu',
        password: 'cybozu'
        // apiToken: 'wbTEYNrUZDFbWySYlOvQ3acgWwTAec7SGykYtyUV'
    }
})

// export const downloadFile = async () => {
//     const APP_ID = "41";
//     // const ATTACHMENT_FIELD_CODE = "Attachment";
//
//     // const { record } = await client1.record.getRecord({
//     //     app: APP_ID,
//     // });
//
//     // const data = client1.file.downloadFile({
//     //     fileKey: '2023100904155886547DAFBE544B1F9E1552E32738364F178',
//     // });
//     // console.log(data)
//
//     const { record } = await client.record.getRecord({
//         app: APP_ID,
//         id : "17",
//     });
//
//     console.log(record)
//     // const data = await client.file.downloadFile({
//     //     fileKey: record.Table.value[0].value.attachment.value[0].fileKey,
//     // });
//     //
//     // console.log(data.toString()); // Hello World!
//
//     return <>
//         {}
//     </>
//     // const data = await client.file.downloadFile({
//     //     fileKey: record[ATTACHMENT_FIELD_CODE].value[0].fileKey,
//     // });
// }
