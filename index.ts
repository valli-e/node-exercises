
const express = require('express');
const morgan = require('morgan');
const app = express();

import { Request, Response } from 'express';

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

// Controller functions

function getAll(req: Request, res: Response): void {
  res.json(planets);
}

function getOneById(req: Request, res: Response): void {
  const planetId = parseInt(req.params.id);
  const planet = planets.find(p => p.id === planetId);
  if (planet) {
    res.json(planet);
  } else {
    res.status(404).send(`Planet with id ${planetId} not found.`);
  }
}

function create(req: Request, res: Response): void {
  const newPlanet: Planet = { id: planets.length + 1, ...req.body };
  planets.push(newPlanet);
  res.status(201).json(newPlanet);
}

function updateById(req: Request, res: Response): void {
  const planetId = parseInt(req.params.id);
  const planetIndex = planets.findIndex(p => p.id === planetId);
  if (planetIndex !== -1) {
    planets[planetIndex] = { id: planetId, ...req.body };
    res.json(planets[planetIndex]);
  } else {
    res.status(404).send(`Planet with id ${planetId} not found.`);
  }
}

function deleteById(req: Request, res: Response): void {
  const planetId = parseInt(req.params.id);
  const planetIndex = planets.findIndex(p => p.id === planetId);
  if (planetIndex !== -1) {
    planets = planets.filter(p => p.id !== planetId);
    res.sendStatus(204);
  } else {
    res.status(404).send(`Planet with id ${planetId} not found.`);
  }
}

// Routes

app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteById);

// Error handling
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

