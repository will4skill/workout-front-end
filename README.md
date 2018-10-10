# WorkoutLogger

## Project Description
This is a simple user interface for my Workout API project. The structure of
this project is based on what I learned in the following course: https://codewithmosh.com/p/mastering-react

 The basic technology stack is:
* React (UI Library)
* Bootstrap (front-end component library)
* Joi-browser (user-input validation)
* React-router-dom (routing)

Additional resources that helped me:
* [Sort by date](https://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date)
* [Clickable map example](https://codepen.io/websitebeaver/pen/oLGGNz)
* [Exclude a class in CSS](https://stackoverflow.com/questions/16201948/how-to-exclude-particular-class-name-in-css-selector/16202009)
* [Test for empty object](https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object)
* [Sticky footer](https://www.learnenough.com/css-and-layout-tutorial)
* [Protected Route Component](https://reacttraining.com/react-router/web/example/auth-workflow)
* [Sort by name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## Project Setup
1. Install Node.js: https://nodejs.org/
2. Download project files
3. ``` $ cd workout_frontend ``` # navigate to project's root directory
4. ``` $ npm i ``` # install the packages listed in package.json
5. ``` $ npm start ``` # start server
6. Done. If you have also setup the corresponding Workout API project, you can navigate to http://localhost:3000/ to test the full project.

## Routes and Components
### Login/Logout
|URL|Corresponding Component|
|---|---|
/login|Login|
/logout|Logout|

### Users Resource
|URL|Corresponding Component|
|---|---|
/users/index|UserIndex|
/users/me/edit|UserNew|
/users/me/show|UserShow|

### Workouts Resource
|URL|Corresponding Component|
|---|---|
/workouts/index|WorkoutIndex|
/workouts/new|WorkoutNew|
/workouts/:id/edit|WorkoutEdit|
/workouts/:id/show|WorkoutShow|
/workouts/:id/completed_exercise|CompletedExerciseNew|

### CompletedExercises Resource
|URL|Corresponding Component|
|---|---|
/completed_exercise/:id/edit|CompletedExerciseEdit|

### Muscles Resource
|URL|Corresponding Component|
|---|---|
/muscles/index|MuscleIndex|
/muscles/new|MuscleNew|
/muscles/:id/edit|MuscleEdit|

### Exercises Resource
|URL|Corresponding Component|
|---|---|
/exercises/index|ExerciseIndex|
/exercises/new|ExerciseNew|
/exercises/:id/edit|ExerciseEdit|

### Misc Components
|URL|Corresponding Component|
|---|---|
/|HomePage|
/not-found|NotFound|

## Services
These functions connect the React UI to the Node API.
### Auth Service
|Function|API URL|Result|
|---|---|---|
login|POST /login|Authenticate user, save JWT on client|
logout|N/A|Delete JWT from client|
loginWithJwt|N/A|Login without calling server|
getCurrentUser|N/A|Extract user data from JWT|
getJwt|N/A|Return JWT from client|

### HTTP Service
|Function|API URL|Result|
|---|---|---|
setJwt|N/A|Add JWT to request headers|

### User Service
|Function|API URL|Result|
|---|---|---|
getUsers|GET /users|Return all users|
getUser|GET /users/me|Return logged-in user|
saveUser|POST /users|Create new user|
deleteUser|DELETE /users/:id|Delete specified user|
updateUser|PUT /users/me|Update logged-in user|

### Muscle Service
|Function|API URL|Result|
|---|---|---|
getMuscles|GET /muscles|Return all muscles|
getMuscle|GET /muscles/:id|Return specific muscle|
saveMuscle|POST /muscles|Create new muscle|
deleteMuscle|DELETE /muscles/:id|Delete specified muscle|
updateMuscle|PUT /muscles/:id|Update specified muscle|

### Exercise Service
|Function|API URL|Result|
|---|---|---|
getExercises|GET /exercises|Return all exercises|
getExercise|GET /exercises/:id|Return specific exercise|
saveExercise|POST /exercises|Create new exercise|
deleteExercise|DELETE /exercises/:id|Delete specified exercise|
updateExercise|PUT /exercises/:id|Update specified exercise|

### Workout Service
|Function|API URL|Result|
|---|---|---|
getWorkouts|GET /workouts|Return all workouts|
getWorkout|GET /workouts/:id|Return specific workout|
saveWorkout|POST /workouts|Create new workout|
deleteWorkout|DELETE /workouts/:id|Delete specified workout|
updateWorkout|PUT /workouts/:id|Update specified workout|

### CompletedExercise Service
|Function|API URL|Result|
|---|---|---|
getCompletedExercise|GET /completed_exercises/:id|Return specific completed exercise|
saveCompletedExercise|POST /workouts/:id/completed_exercises|Create new completed exercise|
deleteCompletedExercise|DELETE /completed_exercises/:id|Delete specified completed exercise|
updateWorkout|PUT /completed_exercises/:id|Update specified completed exercise|
