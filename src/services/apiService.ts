import axios from "axios";

import {basePosterUrl, baseURL} from "../constants";

const apiService = axios.create({baseURL})
const apiPosterService = axios.create(({baseURL: basePosterUrl}))

apiService.interceptors.request.use(request=>{
    request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGY2ZGQ3Njg5ZGM5MWVkMTZiMmMzZjE0MmY1ZGJiMyIsInN1YiI6IjY1ZDkwYTZhYTA2NjQ1MDE3Yjg4ZTBjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YuI57YktGrTtRvNI1AHxiaMS-MotWCYa7uyp95xTAvc'
    return request
})

export {
    apiService,
    apiPosterService
}