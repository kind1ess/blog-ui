import service from '../utils/service'

const baseUrl = '/blog/api/articleTags'

const articleTagsApi = {}

articleTagsApi.listAllTags = () => {
    return service({
        url:baseUrl,
        method:'get'
    })
}

articleTagsApi.listAllArticlesPageBy = (tagId,page,size) => {
    return service({
        url:`${baseUrl}/pageBy/${tagId}`,
        method:'get',
        params:{
            page,
            size
        }
    })
}

export default articleTagsApi