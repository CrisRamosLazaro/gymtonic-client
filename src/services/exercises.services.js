import axios from 'axios'

class ExercisesService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/exercises`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }
    getAllExercises() {
        return this.api.get('/getAllExercises')
    }
    getOneExercise(_id) {
        return this.api.get(`/getOneExercise/${_id}`)
    }
    getExercisesByType(type) {
        return this.api.get(`/getExercisesByType`, { params: { type } })
    }
    saveExercise(exerciseData) {
        return this.api.post('/saveExercise', exerciseData)
    }
    editOneExercise(_id, exerciseData) {
        return this.api.put(`/edit/${_id}`, exerciseData);
    }
    deleteExercise(_id) {
        return this.api.delete(`/delete/${_id}/`)
    }
}

const exercisesService = new ExercisesService()

export default exercisesService