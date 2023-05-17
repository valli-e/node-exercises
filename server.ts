import express from "express";
import "express-async-errors";
import multer from "multer"; 
import morgan from "morgan";
import pgPromise from "pg-promise"; 
import Joi from "joi";
import { getAll, getOneById, create, updatedById, deleteById, createImage} from "./controllers/planets"; 

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
    }
  }
}
const storage = multer.diskStorage ({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })
app.get('/api/planets', getAll); 
app.get('/api/planets/:id', getOneById); 
app.post('/api/planets', create); 
app.put('/api/planets/:id', updatedById); 
app.delete("/api/planets/:id", deleteById); 

app.post("/api/planets/:id/image", upload.single("image"), createImage)

app.listen(port, () => {
  console.log(`example app running on port http://localhost:${port}`);
});
