import axios from 'axios'

class WorkoutService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/workouts`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createWorkout(workoutData) {
        return this.api.post(`/create`, workoutData)
    }
    getAllWorkouts() {
        return this.api.get('/getAllWorkouts')
    }
    getWorkoutByDate(date) {
        return this.api.get(`/getWorkoutByDate/${date}`)
    }
    getWorkoutById(id) {
        return this.api.get(`/getWorkoutById/${id}`)
    }
    getUserWorkouts(owner) {
        return this.api.get(`/user/${owner}`)
    }
    getWorkoutLevel(owner, workoutType) {
        return this.api.get(`/level/${owner}/${workoutType}`)
    }
    updateWorkout(workoutId, workoutData) {
        return this.api.put(`/${workoutId}`, workoutData)
    }


}

const workoutService = new WorkoutService()

export default workoutService
