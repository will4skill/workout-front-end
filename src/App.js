import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Login from './components/login';
import Logout from './components/logout';
import UserIndex from './components/users/userIndex';
import UserNew from './components/users/userNew';
import UserEdit from './components/users/userEdit';
import UserShow from './components/users/userShow';
import WorkoutIndex from './components/workouts/workoutIndex';
import WorkoutNew from './components/workouts/workoutNew';
import WorkoutEdit from './components/workouts/workoutEdit';
import WorkoutShow from './components/workouts/workoutShow';
import CompletedExerciseNew from './components/completed_exercises/completedExerciseNew';
import CompletedExerciseEdit from './components/completed_exercises/completedExerciseEdit';
import MuscleIndex from './components/muscles/muscleIndex';
import MuscleNew from './components/muscles/muscleNew';
import MuscleEdit from './components/muscles/muscleEdit';
import ExerciseIndex from './components/exercises/exerciseIndex';
import ExerciseNew from './components/exercises/exerciseNew';
import ExerciseEdit from './components/exercises/exerciseEdit';
import HomePage from './components/homePage';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './components/notFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path="/users/index"
              component={UserIndex}
              redirect_path="/users/me/show"
              admin_required={true}
            />
            <Route path="/users/new" component={UserNew} />
            <ProtectedRoute
              path="/users/me/edit"
              component={UserEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/users/me/show"
              component={UserShow}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/workouts/index"
              component={WorkoutIndex}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/workouts/new"
              component={WorkoutNew}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/workouts/:id/edit"
              component={WorkoutEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/workouts/:id/show"
              component={WorkoutShow}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/workouts/:id/completed_exercise/"
              component={CompletedExerciseNew}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/completed_exercise/:id/edit"
              component={CompletedExerciseEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/muscles/index"
              component={MuscleIndex}
              redirect_path="/login"
            />
              <ProtectedRoute
                path="/muscles/new"
                component={MuscleNew}
                redirect_path="/muscles/index"
                admin_required={true}
              />
              <ProtectedRoute
                path="/muscles/:id/edit"
                component={MuscleEdit}
                redirect_path="/muscles/index"
                admin_required={true}
              />
            <ProtectedRoute
              path="/exercises/index"
              component={ExerciseIndex}
              redirect_path="/login"
            />
              <ProtectedRoute
                path="/exercises/new"
                component={ExerciseNew}
                redirect_path="/exercises/index"
                admin_required={true}
              />
              <ProtectedRoute
                path="/exercises/:id/edit"
                component={ExerciseEdit}
                redirect_path="/exercises/index"
                admin_required={true}
              />
            <Route path="/not-found" component={NotFound} />;
            <Route path="/" component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
