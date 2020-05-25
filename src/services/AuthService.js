import { Post } from './RequestService'

var service = {
  login: data => Post(`http://192.168.1.179:8080/api/v1/auth/login-sso`, data)
}

export default service
