import service from '../utils/service'

const baseUrl = '/blog/api/articleCategory'

const articleCategoryApi = {}

articleCategoryApi.listAllCategory = () => {
    return service({
        url:baseUrl,
        method:'get'
    })
}

articleCategoryApi.listAllArticlesBy = (categoryId) => {
    return service({
        url:`${baseUrl}/${categoryId}`,
        method:'get'
    })
}

articleCategoryApi.selectArticlePageBy = (categoryId,page,size) => {
    return service({
        url:`${baseUrl}/pageBy/${categoryId}`,
        params:{
            page,
            size
        },
        method:'get'
    })
}

export default articleCategoryApi