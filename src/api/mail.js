import service from '../utils/service'

const baseUrl = 'blog/api/mail'

const mailApi = {}

mailApi.sendMail = articleId => {
    return service({
        url:baseUrl,
        method:'post',
        params:{
            articleId
        }
    })
}
export default mailApi