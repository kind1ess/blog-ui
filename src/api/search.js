import service from '../utils/service'

const baseUrl = 'blog/api/search'

const searchApi = {}

searchApi.searchBy = (keyWord,scope,page,size) => {
    return service({
        url:baseUrl,
        method:'GET',
        params:{
            keyWord,
            scope,
            page,
            size
        }
    })
}

export default searchApi