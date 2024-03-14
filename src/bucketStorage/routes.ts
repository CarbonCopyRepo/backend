import { Router, Request, Response } from "express";
import { createAxiosInstance, makePostRequest } from '../lib/apiClient/apiClient'
import { AxiosConfig, PostPatchPutConfig, StringObject } from '../lib/apiClient/apiClient.types'
require('dotenv').config()

const bucketStorageRouter = Router();

bucketStorageRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json()
})

bucketStorageRouter.post("/", (req: Request, res: Response) => {
    const axiosConfig: AxiosConfig = {
        baseURL : req.baseUrl,
        timeout: 500,
        headers: {
            Authorization: `Bearer ${process.env.OAUTH2_TOKEN}`
        },
        responseType: 'json'
    }
    const axios = createAxiosInstance(axiosConfig)

    const postConfig: PostPatchPutConfig = {
        axiosInstance: axios,
        body: req.body,
        headers: req.headers as StringObject
    }

    const response = makePostRequest(postConfig)
    res.status(201).json(response);
});

export default bucketStorageRouter;
