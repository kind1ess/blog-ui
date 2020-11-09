import service from '../utils/service'

const baseUrl = 'blog/api/tags'

const tagsApi = {}

tagsApi.listAll = () => {
    return service({
        url:baseUrl,
        method:'get'
    })
}

export default tagsApi