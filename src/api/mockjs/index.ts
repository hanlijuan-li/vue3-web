import Mock from 'mockjs'

Mock.mock('/api/unauthorized', 'get', () => {
    return Promise.reject({
        response: {
            status: 401,
            data: {
                message: 'Unauthorized'
            }
        }
    })
})