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
import moment from 'moment-timezone';
import { GraphQLDate} from 'graphql-scalars';




//JS trick
let schemaFunc = (db) => {

      let counter = 1; //init value

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
          racenumber: {type: GraphQLInt},
          runners: {type: new GraphQLList(runnerType)}
        }
      });

      let meetingType =new GraphQLObjectType({
        name: 'Meeting',
        description: 'Meet information',
        fields: {
            racedate: {type: GraphQLString},
            racecourse: {type: GraphQLString},
            noraces: {type: GraphQLInt},
            races: {type: new GraphQLList(raceType)}
            }
        });


        var schema = new GraphQLSchema({
            query: new GraphQLObjectType({
              name: 'RootQueryType', //required

              fields: { //required

                hkjcresults: {
                  type: new GraphQLList(meetingType),
                  description: "Takes 2 arguments: racedate & racecourse - must be unique - returns all the meeting, race, runner data for that event",
                  args: {
                    racedate : {type:GraphQLString },
                    racecourse : {type:GraphQLString }
                  },
                  resolve(_, args) {
                    // presently we only have 1 event stored later remove this condition
                    if (args.racedate == '20170614' && args.racecourse =='HV') {
                      return db.collection("HKJCruns").find({}).toArray(); //returns Promise taken care of automagically
                    }else {
                      return [`nothing here yet for ${args.racedate} - ${args.racecourse} - ${args.racenumber}`]; //dummy string
                      }
                    }
                  }, //end hkjcresult
                random: {
                  type: GraphQLFloat,
                  resolve() {
                    return Math.random();
                  }
                }
              }//end fields
          })
        });

      return schema;
}




/*
resolve() {
  return 'world';
}
can also be written as
resolve: () => 'world'

*/





export default schemaFunc;
