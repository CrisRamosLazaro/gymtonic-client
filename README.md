# FitTrack (working title): a fitness application buit using the MERN stack

FitTrack is a fitness application built using the MERN stack that enables users to create their own workout routine separated into 4 major muscle groups (legs, push, pull and core), from a database of exercises. Each selected exercise corresponds to a percentage of the full workout session, and the combination of exercises added to the workout session pie must amount to 100%. Then the user can tick each exercise off as "done". 


## Deployed Application
The deployed application will be found at the following link: [Insert](https://github.com/ricknavarro/). The application has been developed aesthetically as mobile-fist.


## Api endpoints

### Exercise Routes

BaseURL /api/workouts

| HTTP Method |      URI Path       |          Description          |
| :---------: | :-----------------: | :---------------------------: |
|     GET     |  /getAllExercises   |      All exercises list       |
|    POST     |    /saveExercise    |      Create new exercise      |
|     GET     | /getOneExercise/:id | Matching ID exercise details  |
|     PUT     |      /:id/edit      | Matching ID exercise editing  |
|   DELETE    |     /:id/delete     | Matching ID exercise deletion |

### Auth Routes

BaseURL /api/auth

| HTTP Method | URI Path |    Description    |
| :---------: | :------: | :---------------: |
|    POST     | /signup  |   Sign up user    |
|    POST     |  /login  |    Login User     |
|     GET     | /verify  | Verify auth token |


## Client Routes

|         URL path         |     Description     | Protected |
| :----------------------: | :-----------------: | :-------: |
|            /             |      Home page      |     ❌     |
|          /login          |     Login page      |     ❌     |
|         /signup          |     Signup page     |     ❌     |
|          /about          |      About us       |     ❌     |
|         /profile         |    Profile Page     |     ✅     |
|      /profile/edit       |  Edit Profile Page  |     ✅     |
|     /profile/delete      | Delete Profile Page |     ✅     |
|     /workouts/create     |  Create a Workout   |     ✅     |
| /workouts/todays-session | Tick off exercises  |     ✅     |
|    /workouts/history     | See workout history |     ✅     |
