import React from "react";
import Runner from "./Runner";
import Relay from 'react-relay';
/*
A Race is actually a RunnerList
*/

class Race extends React.Component {
  render(){
    return (
      <div>
        <h2>
          racenumber: { this.props.race.racenumber}
        </h2>
        <p> { this.props.race.raceindex}</p>
        <ol>
          HorseCode&nbsp;&nbsp;DecimalPrice&nbsp;&nbsp;fractionalPrice
          {this.props.race.runners.map(r => <Runner key={r.horse} runner={r} /> )}
        </ol>
      </div>
    )
  }
}
//race = runnerlist
Race= Relay.createContainer(Race, {
  fragments: {
    race: () => Relay.QL`
      fragment on Race {
        raceindex
        racenumber
        runners {horse: horse, ${Runner.getFragment('runner')} },
      }
    `,
  },
});

export default Race;
