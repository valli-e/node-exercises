import express, { Request, Response } from 'express';
import joi from 'joi';

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

const router = express.Router();

// planet validation
const planetSchema = joi.object({
  name: joi.string().required(),
});

// GET: return all planets in JSON with 200
router.get('/api/planets', (req: Request, res: Response) => {
  res.json(planets);
});

// GET: return a planet in JSON by id with 200
router.get('/api/planets/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  res.json(planet);
});

// POST: create a planet, return 201 code and a success JSON with key msg
router.post('/api/planets', (req: Request, res: Response) => {
  const { error, value } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newPlanet: Planet = {
    id: planets.length + 1,
    name: value.name,
  };
  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});

// PUT: update a planet by id, return 200 code and a success JSON with key msg
router.put('/api/planets/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  const { error, value } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  planet.name = value.name;
  res.json({ msg: 'Planet updated successfully' });
});

// DELETE: delete a planet by id, return 200 code and a success JSON with key msg
router.delete('/api/planets/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const planetIndex = planets.findIndex(p => p.id === id);
  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  planets.splice(planetIndex, 1);
  res.json({ msg: 'Planet deleted successfully' });
});

export default router;
