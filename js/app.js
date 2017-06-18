import 'babel-polyfill';
import MeetingList from "./components/MeetingList";
import Meeting from "./components/Meeting";
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';


//fake data first
// var data = {
//     "meetings": [
//       {
//         "racedate": "20170614",
//         "racecourse": "HV",
//         "noraces": 8,
//
//         "races": [
//           {
//             "racenumber": 1,
//             "runners": [
//               {
//                 "horse": "T333",
//                 "decimalPrice": 31,
//                 "englishPrice": "4.1/1"
//               },
//               {
//                 "horse": "S245",
//                 "decimalPrice": 48,
//                 "englishPrice": "5.8/1"
//               },
//               {
//                 "horse": "T056",
//                 "decimalPrice": 60,
//                 "englishPrice": "7/1"
//               },
//               {
//                 "horse": "V119",
//                 "decimalPrice": 180,
//                 "englishPrice": "19/1"
//               }
//             ]
//           },
//           {
//             "racenumber": 2,
//             "runners": [
//               {
//                 "horse": "V164",
//                 "decimalPrice": 33,
//                 "englishPrice": "4.3/1"
//               },
//               {
//                 "horse": "T369",
//                 "decimalPrice": 79,
//                 "englishPrice": "8.9/1"
//               },
//               {
//                 "horse": "N432",
//                 "decimalPrice": 230,
//                 "englishPrice": "24/1"
//               },
//               {
//                 "horse": "V171",
//                 "decimalPrice": 190,
//                 "englishPrice": "20/1"
//               }
//             ]
//           },
//           {
//             "racenumber": 4,
//             "runners": [
//               {
//                 "horse": "S216",
//                 "decimalPrice": 300,
//                 "englishPrice": "31/1"
//               },
//               {
//                 "horse": "A051",
//                 "decimalPrice": 22,
//                 "englishPrice": "3.2/1"
//               },
//               {
//                 "horse": "T0334",
//                 "decimalPrice": 82,
//                 "englishPrice": "9.2/1"
//               },
//               {
//                 "horse": "S397",
//                 "decimalPrice": 79,
//                 "englishPrice": "8.9/1"
//               }
//             ]
//           }
//         ]
//       }
//     ]
// };

// Where to start the Query
// this is wrong
// console.log(Relay.QL`
//   query MeetingsQuery {
//     store { ${MeetingList.getFragment('store')} },
//   }
// `)

class HomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query MeetingsQuery {
        store { ${Component.getFragment('store')} },
      }
    `,
  };
}

//starting container
ReactDOM.render(
  <Relay.RootContainer
    Component={MeetingList}
    route={new HomeRoute()}
  />,
  document.getElementById("root")
);




// ReactDOM.render(
//   <MeetingList meetings={data.hkjcresults} />,
//   document.getElementById("root")
// );
