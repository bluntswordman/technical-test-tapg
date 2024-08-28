import axios from "axios";
import {BASE_URL} from "../../../helpers/Constant.js";

const BASE_ROUTE = `${BASE_URL}/users`

export const getAll = async () => {
    try {
        return await axios.get(BASE_ROUTE)
    } catch (error) {
        return false
    }
}

export const show = async (id) => {
    try {
        return await axios.get(`${BASE_ROUTE}/${parseInt(id)}`)
    } catch (error) {
        return false
    }
}

export const save = async (data, id) => {
    try {
        delete data.id

        return id === null
            ? await axios.post(BASE_ROUTE, data)
            : await axios.put(`${BASE_ROUTE}/${parseInt(id)}`, data)
    } catch (error) {
        return false
    }
}

export const destroy = async (id) => {
    try {
        return await axios.delete(`${BASE_ROUTE}/${parseInt(id)}`)
    } catch (error) {
        return false
    }
}