import React from "react";
import Meeting from "./Meeting";
import Relay from 'react-relay';

class MeetingList extends React.Component {
  render(){
    return (
      <div>
        <h1> List of Meetings Matching your Query </h1>
        <div>
          {this.props.store.meetings.map(
            meeting => <Meeting key={meeting.id} meeting={meeting} />)}
        </div>
      </div>
    );
  }
}
//really needs a single entry point that is an object not an array - could be list or currentuser
MeetingList = Relay.createContainer(MeetingList, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        meetings {id: _id, ${Meeting.getFragment('meeting')} },
      }
    `,
  },
});

export default MeetingList;
