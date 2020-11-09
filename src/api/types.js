import service from '../utils/service'

const baseUrl = 'blog/api/category'

const typesApi = {}

typesApi.listAll = () => {
    return service({
        url:baseUrl,
        method:'get'
    })
}

export default typesApi