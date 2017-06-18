import React from "react";
import Relay from 'react-relay';

class Runner extends React.Component {

  render(){
    return (
      <li>
        <span>

          {this.props.runner.horse} &nbsp;&nbsp;
            {this.props.runner.decimalPrice}&nbsp;&nbsp;
          {this.props.runner.englishPrice}
        </span>


      </li>
    );
    }
  }

//declaring data requirement, collocating views with queries
Runner = Relay.createContainer(Runner, {
  fragments: {
    runner: () => Relay.QL`
      fragment on Runner {
        horse
        decimalPrice
        englishPrice
      }
    `,
  },
});

//now export Relay container Runner
export default Runner;
