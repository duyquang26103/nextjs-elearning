import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get(
            `https://te-amp-2.cybozu-dev.com/k/v1/file.json?fileKey=20231010040005EF61F85410D04BCBB4391D2928D388EE185`,
            {
                headers: {
                    'X-Cybozu-API-Token': 'wbTEYNrUZDFbWySYlOvQ3acgWwTAec7SGykYtyUV',
                },
            },
        )
        console.log("response", response.data)
        // res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        // res.status(500).json({ error })
    }
}