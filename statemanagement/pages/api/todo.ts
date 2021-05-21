import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Record } from "../../interfaces";

//TODO 본인 airtable 계정 url로 수정
axios.defaults.baseURL = "https://api.airtable.com/v0/appEqRAlH0Tj9fjvu/todo";
axios.interceptors.request.use(async (config) => {
    if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${process.env.AIRTABLE_KEY}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const post = await axios.post("/", {
                records: [req.body],
            });
            res.status(200).json({ success: true, data: post.data });
        } else if (req.method === "PATCH") {
            const id = req.query.id;
            const body = req.body;
            console.log("Update", id, body.fields);
            const response = await axios.patch(`/${id}`, {
                fields: body.fields,
            });
            res.status(200).json({ success: true, data: response.data });
        } else if (req.method === "DELETE") {
            const id = req.query.id;
            console.log("Delete", id);
            const response = await axios.delete(`/${id}`);
            res.status(200).json({ success: true, data: response.data });
        } else {
            const list = await axios.get("/?maxRecords=100&view=raw");

            const records: Record[] = list.data.records;
            res.status(200).json({ records: records });
        }
    } catch (e) {
        // console.log(e);
        console.log(e.message);
        res.status(500).json({ error: true });
    }
};
