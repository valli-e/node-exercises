import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise"; 
import express from "express";

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;


const { DATABASE_URL } = process.env;

export const db = pgPromise()(DATABASE_URL);


const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;
    CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
    );
    INSERT INTO planets (name) VALUES ('Earth');
    INSERT INTO planets (name) VALUES ('Mars');
  `);
};

setupDb();


const getAll = async (req: Request, res: Response) => {
  const planets = await db.many("SELECT * FROM planets;");
  res.status(200).json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone("SELECT * FROM planets WHERE id=$1", Number(id));
  res.status(200).json(planet);
};

const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  await db.none("INSERT INTO planets (name) VALUES ($1)", [name]);
  res.status(201).json({ msg: 'The planet was created' });
};

const updatedById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none("UPDATE planets SET name=$1 WHERE id=$2", [name, id]);
  res.status(200).json({ msg: `planet ${name} was updated` });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none("DELETE FROM planets WHERE id=$1", [id]);
  res.status(200).json({ msg: `Planet ${id} deleted` });
};

export {
  getAll,
  getOneById,
  create,
  updatedById,
  deleteById,
};
