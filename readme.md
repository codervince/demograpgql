# Getting HKJC data using GraphQL (and Relay)

```
  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
|                                          |
|   Every man has his own destiny:         |
|   the only imperative is to follow it,   |
|   to accept it, no matter where it       |
|   leads him.                             |
|                                          |
|                          @henrymiller    |
| _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|

```

# How to use

```
// runs this ./node_modules/.bin/babel-node --presets 'es2015' server.js start
nodemon start

```

In GraphQL:
------------

Example query:

```graphql

{
  hkjcresults(racedate: "20170614", racecourse: "HV") {
    racedate
    racecourse
    noraces
    races {
      racenumber
      runners {
        horse
        decimalPrice
        englishPrice
      }
    }
  }
}

```

Which returns

```graphql

{
  "data": {
    "hkjcresults": [
      {
        "racedate": "20170614",
        "racecourse": "HV",
        "noraces": 8,
        "races": [
          {
            "racenumber": 1,
            "runners": [
              {
                "horse": "T333",
                "decimalPrice": 31,
                "englishPrice": "4.1/1"
              },
              {
                "horse": "S245",
                "decimalPrice": 48,
                "englishPrice": "5.8/1"
              },
              {
                "horse": "T056",
                "decimalPrice": 60,
                "englishPrice": "7/1"
              },
              {
                "horse": "V119",
                "decimalPrice": 180,
                "englishPrice": "19/1"
              }
            ]
          },
          {
            "racenumber": 2,
            "runners": [
              {
                "horse": "V164",
                "decimalPrice": 33,
                "englishPrice": "4.3/1"
              },
              {
                "horse": "T369",
                "decimalPrice": 79,
                "englishPrice": "8.9/1"
              },
              {
                "horse": "N432",
                "decimalPrice": 230,
                "englishPrice": "24/1"
              },
              {
                "horse": "V171",
                "decimalPrice": 190,
                "englishPrice": "20/1"
              }
            ]
          },
          {
            "racenumber": 4,
            "runners": [
              {
                "horse": "S216",
                "decimalPrice": 300,
                "englishPrice": "31/1"
              },
              {
                "horse": "A051",
                "decimalPrice": 22,
                "englishPrice": "3.2/1"
              },
              {
                "horse": "T0334",
                "decimalPrice": 82,
                "englishPrice": "9.2/1"
              },
              {
                "horse": "S397",
                "decimalPrice": 79,
                "englishPrice": "8.9/1"
              }
            ]
          }
        ]
      }
    ]
  }
}




```
