import service from '../utils/service'

const baseUrl = '/blog/api/archive'

const archiveApi = {}

archiveApi.listAll = () => {
    return service({
        url:baseUrl,
        method:'get'
    })
}

export default archiveApi