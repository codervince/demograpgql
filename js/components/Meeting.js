import React from "react";
import Race from "./Race";
import moment from "moment";
import Relay from 'react-relay';

class Meeting extends React.Component {

  render(){
    return (
      <div>
          <div>Your Results: </div>
          <h2>{moment( this.props.meeting.racedate).format("MMMM Do YYYY")}</h2>
          <h2>at course: { this.props.meeting.racecourse}</h2>
          <h2> Number of races today: {this.props.meeting.noraces} </h2>
          <em>Meetings is an array of races </em>
          <div>
            {this.props.meeting.races.map(
            r => <Race key={r.raceindex}race={r} />)}
          </div>
        </div>
    )
  }
}

Meeting = Relay.createContainer(Meeting, {
  fragments: {
    meeting: () => Relay.QL`
      fragment on Meeting {
        racedate
        racecourse
        noraces
        races {raceindex:raceindex, ${Race.getFragment('race')} },
      }
    `,
  },
});

export default Meeting;
