import { Routes, Route } from 'react-router-dom'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import CreateWorkoutPage from '../pages/CreateWorkoutPage/CreateWorkoutPage'
import TodaysWorkout from './../pages/TodaysWorkoutPage/TodaysWorkout'
import MyWorkoutsPage from './../pages/MyWorkoutsPage/MyWorkoutsPage'
import ExercisesDetailsPage from '../pages/ExercisesDetailsPage/ExercisesDetailsPage'
import PrivateRoute from './PrivateRoute'
import ListExercisePage from '../pages/ListExercisePage/ListExercisePage'
import CreateExercisePage from '../pages/CreateExercisePage/CreateExercisePage'
import ExercisesEditPage from '../pages/ExercisesEditPage/ExercisesEditPage'
import AdminPage from '../pages/AdminPage/AdminPage'
import UserDetails from '../pages/UserDetails/UserDetails'
import UserEdit from '../pages/UserEdit/UserEdit'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import WhatsNextPage from '../pages/WhatsNextPage/WhatsNextPage'
import OwnUserPage from '../pages/OwnUserPage/OwnUserPage'
import HomePage from '../pages/HomePage/HomePage'

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<h1>About this app</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route element={<PrivateRoute admittedRoles={['GM', 'PT', 'USER']} />}>
                <Route path='/profile' element={<ProfilePage />} />
                <Route path="/profile/edit/:id" element={<OwnUserPage />} />
                <Route path="/workouts/create" element={<CreateWorkoutPage />} />
                <Route path="/workouts/todays-workout/:id" element={<TodaysWorkout />} />
                <Route path="/workouts/todays-workout/edit" element={<h1>edit workout</h1>} />
                <Route path="/workouts/my-workouts" element={<MyWorkoutsPage />} />

                <Route path="/exercises" element={<ListExercisePage />} />
                <Route path="/exercises/:id" element={<ExercisesDetailsPage />} />

                <Route path="/whats-next" element={<WhatsNextPage />} />
            </Route>

            <Route element={<PrivateRoute admittedRoles={['GM', 'PT']} />}>
                <Route path="/exercises/create" element={<CreateExercisePage />} />
                <Route path="/exercises/edit/:id" element={<ExercisesEditPage />} />
            </Route>

            <Route element={<PrivateRoute admittedRoles={['GM']} />}>
                <Route path="/users" element={<AdminPage />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/users/edit/:id" element={<UserEdit />} />
            </Route>

            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )

}

export default AppRoutes