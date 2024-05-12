import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';
import { handleError } from '../errors/errorHandler';
import verifyJWT from "../middlewares/authentication";
import multer from 'multer';
import path from "node:path";
import authRoute from '../routes/auth';

const multipartDataHandler = multer().any();
export default function (app: Express) {
    //Middlewares
    app.use(cors());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(multipartDataHandler);
    app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
    app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

    //DB connection
    // mongoose.connect(`mongodb+srv://${config.get('db_username')}:${config.get('db_password')}@cluster0.csv9r7j.mongodb.net/D3`)
    //     .then(() => console.log('Connected to mongoDB'))
    //     .catch(() => console.log("Error in connecting to mongoDB"));

    //API Routes
    app.use('/api', authRoute);

    //Lost routes
    app.use((req: Request, res: Response) => {
        res.json("You're lost, check your route !");
    });

    //Error handler
    app.use(handleError)
}