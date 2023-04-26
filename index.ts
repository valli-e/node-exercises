// DO
// Write simple Express server that listens on port 3000 (use dotenv to specify the port)
// Create a dummy "database" of planets using a let variable. (You will use this data in further exercises.)
// Configure your app (app.use()) to:
// accept JSON from the Client
// log the Client's requests


// USE
// Dummy database with initial data:
//   type Planet = {
//     id: number,
//     name: string,
//   };

//   type Planets = Planet[];

//   let planets: Planets = [
//     {
//       id: 1,
//       name: "Earth",
//     },
//     {
//       id: 2,
//       name: "Mars",
//     },
//   ];
// express-async-errors
// morgan

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

// dummy database of planets
type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// middleware 
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.get('/planets', (req, res) => {
  res.json(planets);
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
