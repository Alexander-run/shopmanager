import { get, post, put, del } from "../utils/request";

export function listApi() {
    return get('/api/v1/admin/products')
}

export function getOneById(id) {
    return get(`/api/v1/admin/products/${id}`)    
}

export function createApi(data) {
    return post('/api/v1/admin/products', data)
}

export function modifyOne(id, data) {
    return put(`/api/v1/admin/products/${id}`, data)
}

export function delOne(id) {
    return del(`/api/v1/admin/products/${id}`)
}