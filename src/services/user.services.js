import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }

    getOneUser(id) {
        return this.api.get(`/getOneUser/${id}`)
    }
    editOneUser(id, userData) {
        return this.api.put(`/edit/${id}`, userData)
    }

    deleteOneUser(id) {
        return this.api.delete(`/delete/${id}`)
    }
}

const userService = new UserService()

export default userService