import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import UserIndex from './components/userIndex';
import UserNew from './components/userNew';
import UserEdit from './components/userEdit';
import UserShow from './components/userShow';
import WorkoutIndex from './components/workoutIndex';
import WorkoutNew from './components/workoutNew';
import WorkoutEdit from './components/workoutEdit';
import WorkoutShow from './components/workoutShow';
import CompletedExerciseNew from './components/completedExerciseNew';
import CompletedExerciseEdit from './components/completedExerciseEdit';
import MuscleIndex from './components/muscleIndex';
import MuscleNew from './components/muscleNew';
import MuscleEdit from './components/muscleEdit';
import ExerciseIndex from './components/exerciseIndex';
import ExerciseNew from './components/exerciseNew';
import ExerciseEdit from './components/exerciseEdit';
import HomePage from './components/homePage';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/users/index" component={UserIndex} />
            <Route path="/users/new" component={UserNew} />
            <Route path="/users/me/edit" component={UserEdit} />
            <Route path="/users/me/show" component={UserShow} />
            <Route path="/workouts/index" component={WorkoutIndex} />
            <Route path="/workouts/new" component={WorkoutNew} />
            <Route path="/workouts/:id/edit" component={WorkoutEdit} />
            <Route path="/workouts/:id/show" component={WorkoutShow} />
            <Route
              path="/workouts/:id/completed_exercise/"
              component={CompletedExerciseNew}
            />
            <Route
              path="/completed_exercise/:id/edit"
              component={CompletedExerciseEdit}
            />
            <Route path="/muscles/index" component={MuscleIndex} />
            <Route path="/muscles/new" component={MuscleNew} />
            <Route path="/muscles/:id/edit" component={MuscleEdit} />
            <Route path="/exercises/index" component={ExerciseIndex} />
            <Route path="/exercises/new" component={ExerciseNew} />
            <Route path="/exercises/:id/edit" component={ExerciseEdit} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
