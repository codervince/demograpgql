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

/*
resolve() {
  return 'world';
}
can also be written as
resolve: () => 'world'

*/

function getDecimalPrice(numerator, denominator){
  return (numerator+denominator)/denominator;
}

//func reference
let fractional2Decimal = function(p){
  p = ((p/10)+1).toString() + '/1'
  return p;
}

// let top4_20170614HV1 = ['T333', 'S245', 'T056', 'V119'];
let runner1 = {
      horse:'T333',
      price: 33
    }
let top4_20170614HV1 = [
  {horse:'T333',price: 33},
  {horse:'S245',price: 79},
  {horse:'T056',price: 230},
  {horse:'V119',price: 190}
];
    // },
    // second: {
    //   horse:'S245',
    //   price: 79
    // },
    // third: {
    //   horse:'T056',
    //   price: 230
    // },
    // fourth: {
    //   horse:'V119',
    //   price: 190
    // }

let runnerType =new GraphQLObjectType({
  name: 'top4_20170614HV1',
  fields: {
    horse: {type: GraphQLString},
    price: {type: GraphQLInt,
          deprecationReason: "We dont need this"
    },
    decimalPrice: {type: GraphQLInt,
      resolve: (horse) => horse.price
    },
    englishPrice: { type: GraphQLString,
    resolve: (horse)=> fractional2Decimal(horse.price) }
    }
  });

let counter = 1; //init value

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType', //required
      fields: { //required
        hkjcresult: {
          type: new GraphQLList(runnerType),
          description: "Needs 3 arguments: racedate-racecourse-racenumber - returns first 4 horsecodes in order plus URL",
          args: {
            racedate : {type:GraphQLString },
            racecourse : {type:GraphQLString },
            racenumber : {type:GraphQLInt }
          },
          resolve(_, args) {
            // return top4_20170614HV1;
            if (args.racedate == '20170614' && args.racecourse =='HV' && args.racenumber == 1) {
              return top4_20170614HV1;
            }else {
              return [`nothing here yet for ${args.racedate} - ${args.racecourse} - ${args.racenumber}`];
              }
            }
          },
        random: {
          type: GraphQLFloat,
          resolve() {
            return Math.random();
          }
        }
      }//end fields
  })
});

export default schema;
