import service from '../utils/service'

const baseUrl = 'blog/api/comment'

const commentApi = {}

commentApi.listComment = (articleId,accessKey) => {
    return service({
        url:`${baseUrl}/${articleId}`,
        headers:{
            'AccessKey':accessKey
        },
        method:'get'
    })
}

commentApi.postComment = (commentParams,isRoot,parentId) => {
    return service({
        url:`${baseUrl}`,
        method:'post',
        data:commentParams,
        params:{
            isRoot,
            parentId
        }
    })
}

export default commentApi