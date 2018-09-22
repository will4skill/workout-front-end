import React, { Component} from 'react';
import { Link } from 'react-router-dom';
//import { getMuscles } from '../services/muscleService.js';

class MuscleIndex extends Component {
  state = {
    muscles: []
  };

  async componentDidMount() {
    //const { data: muscles } = await getMuscles();
    let muscles = [{"_id":"5b91406c749aa34e4911b6c3","name":"abdominals","__v":0},{"_id":"5b91406c749aa34e4911b6c0","name":"biceps","__v":0},{"_id":"5b91406c749aa34e4911b6d0","name":"calves","__v":0},{"_id":"5b91406c749aa34e4911b6bf","name":"deltoids","__v":0},{"_id":"5b91406c749aa34e4911b6be","name":"front-neck","__v":0},{"_id":"5b91406c749aa34e4911b6ce","name":"glutes","__v":0},{"_id":"5b91406c749aa34e4911b6cf","name":"hamstrings","__v":0},{"_id":"5b91406c749aa34e4911b6c5","name":"hip adductors","__v":0},{"_id":"5b91406c749aa34e4911b6ca","name":"infraspinatus","__v":0},{"_id":"5b91406c749aa34e4911b6cc","name":"latissimus dorsi","__v":0},{"_id":"5b91406c749aa34e4911b6cd","name":"lower back","__v":0},{"_id":"5b91406c749aa34e4911b6c8","name":"lower trapezius","__v":0},{"_id":"5b91406c749aa34e4911b6c2","name":"obliques","__v":0},{"_id":"5b91406c749aa34e4911b6c1","name":"pectorals","__v":0},{"_id":"5b91406c749aa34e4911b6c9","name":"posterior deltoids","__v":0},{"_id":"5b91406c749aa34e4911b6c4","name":"quadriceps","__v":0},{"_id":"5b91406c749aa34e4911b6c6","name":"tibialis anterior","__v":0},{"_id":"5b91406c749aa34e4911b6cb","name":"triceps","__v":0},{"_id":"5b91406c749aa34e4911b6c7","name":"upper trapezius","__v":0}]
    this.setState({ muscles });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Muscles</h1>
        <Link
          to="/muscles/new"
          className="btn btn-primary"
        >
          New Muscle
        </Link>
        <ul className="list-group">
          {this.state.muscles.map(muscle => (
            <li key={muscle._id} className="list-group-item">
              {muscle.name}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default MuscleIndex;
