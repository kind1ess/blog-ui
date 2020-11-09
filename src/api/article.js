import service from '../utils/service'

const baseUrl = 'blog/api/article'

const articleApi = {}

articleApi.pageBy = (page,size) => {
    return service({
        url:baseUrl,
        method:'get',
        params:{
            page,
            size
        }
    })
}

articleApi.getById = (id,accessKey) => {
    return service({
        url:`${baseUrl}/${id}`,
        headers:{
            'AccessKey':accessKey
        },
        method:'get'
    })
} 

articleApi.authAuthor = (articleId, accessKey) => {
    return service({
        url:`${baseUrl}/authAuthor`,
        method:'post',
        params:{
            articleId,
            accessKey
        }
    })
}
export default articleApi