import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import WorkoutIndex from './components/workoutIndex';
import MuscleIndex from './components/muscleIndex';
import MuscleNew from './components/muscleNew';
import ExerciseIndex from './components/exerciseIndex';
import HomePage from './components/homePage';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/workouts/index" component={WorkoutIndex} />
            <Route path="/muscles/index" component={MuscleIndex} />
            <Route path="/muscles/new" component={MuscleNew} />
            <Route path="/exercises/index" component={ExerciseIndex} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
