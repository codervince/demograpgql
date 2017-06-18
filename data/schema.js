import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'; //from reference implementation
import { GraphQLDate} from 'graphql-scalars';




//JS trick
let schemaFunc = (db) => {

      // new container object bc cannot start with an array
      // let storeType = new GraphQLObjectType({
      //   name: 'Store',
      //   fields: {
      //     store: { type: new GraphQLObjectType({
      //       name: 'Store',
      //       fields: {
      //
      //       }
      //     })}
      //   }
      // })

      function getDecimalPrice(numerator, denominator){
        return (numerator+denominator)/denominator;
      }

      //func reference
      let fractional2Decimal = function(p){
        p = ((p/10)+1).toString() + '/1'
        return p;
      }

      let runnerType = new GraphQLObjectType({
        name: 'Runner',
        description: 'Horse data for race',
        fields: {
          _id: {
            type: GraphQLString
          },
          horse: {type: GraphQLString},
          price: {type: GraphQLInt},
          decimalPrice: {type: GraphQLInt,
            resolve: (horse) => horse.price
          },
          englishPrice: { type: GraphQLString,
          resolve: (horse)=> fractional2Decimal(horse.price) }
        }
      });

      let raceType =new GraphQLObjectType({
        name: 'Race',
        description: 'race-specific information',
        fields: {
          raceindex: {type: GraphQLString},
          racenumber: {type: GraphQLInt},
          runners: {type: new GraphQLList(runnerType)}
        }
      });

      let meetingType =new GraphQLObjectType({
        name: 'Meeting',
        description: 'Meet information',
        fields: {
            _id: {
              type: GraphQLString
            },
            racedate: {type: GraphQLString},
            racecourse: {type: GraphQLString},
            noraces: {type: GraphQLInt},
            races: {type: new GraphQLList(raceType)}
            }
        });



      // let meetingListType =new GraphQLObjectType({
      //   name: 'MeetingList',
      //   description: 'List of Meetings',
      //   fields: {
      //       meetings: {type: new GraphQLList(meetingType)}
      //       }
      //   });

      let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: {

            // meetings: {
            //   type: new GraphQLList(meetingType),
            //   resolve(_, args) {
            //       return db.collection("HKJCruns").find({}).toArray(); //returns Promise taken care of automagically
            //   }
            // }
            meetings: {
              //or meetingType?
                type: new GraphQLList(meetingType),
                description: "Return a list of meetings in any case - todo: arguments array of horses - Takes 2 arguments: racedate & racecourse - must be unique - returns all the meeting, race, runner data for that event",
                args: {
                  racedate : {type:GraphQLString },
                  racecourse : {type:GraphQLString }
                },
                resolve(_, args) {
                  return db.collection("HKJCruns").find({}).toArray();
                  // presently we only have 1 event stored later remove this condition
                  //change this to a list of horsecodes
                  // if (args.racedate == '20170614' && args.racecourse =='HV') {
                  //   return db.collection("HKJCruns").find({}).toArray(); //returns Promise taken care of automagically
                  // }else {
                  //   return [`nothing here yet for ${args.racedate} - ${args.racecourse} - ${args.racenumber}`]; //dummy string
                  //   }
                }
              }


        }
      });



        let store = {}; //can be anything

        var schema = new GraphQLSchema({
            query: new GraphQLObjectType({
              name: 'RootQueryType', //required

              fields: { //required
                  store: {
                    type: storeType,
                    resolve: () => store
                  }
                  // meetings: {
                  //     type: new GraphQLList(meetingListType),
                  //     description: "Return a list of meetings in any case - todo: arguments array of horses - Takes 2 arguments: racedate & racecourse - must be unique - returns all the meeting, race, runner data for that event",
                  //     args: {
                  //       racedate : {type:GraphQLString },
                  //       racecourse : {type:GraphQLString }
                  //     },
                  //     resolve(_, args) {
                  //       // presently we only have 1 event stored later remove this condition
                  //       if (args.racedate == '20170614' && args.racecourse =='HV') {
                  //         return db.collection("HKJCruns").find({}).toArray(); //returns Promise taken care of automagically
                  //       }else {
                  //         return [`nothing here yet for ${args.racedate} - ${args.racecourse} - ${args.racenumber}`]; //dummy string
                  //         }
                  //     }
                  //   }

              }//end fields
          })
        });

      return schema;
};


export default schemaFunc;
