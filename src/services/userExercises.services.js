import axios from 'axios'

class UserExercisesService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/userExercises`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }
    getAllUserExercises() {
        return this.api.get('/getAllUserExercises')
    }
    getOneUserExercise(_id) {
        return this.api.get(`/getOneUserExercise/${_id}`)
    }
    saveUserExercise(userExerciseData) {
        console.log('Im the user exercise data', userExerciseData)
        return this.api.post('/saveUserExercise', userExerciseData)
    }
    editOneUserExercise(_id, userExerciseData) {
        return this.api.put(`/edit/${_id}`, userExerciseData)
    }
    deleteUserExercise(_id) {
        return this.api.delete(`/delete/${_id}/`)
    }
}

const userExercisesService = new UserExercisesService()

export default userExercisesService