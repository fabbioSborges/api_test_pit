import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { routes } from "./router/index.routes";
import { HttpException } from "./helpers/HttpException";
import { PrismaClient } from "@prisma/client";
class App {
  app: Express;
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    this.prisma.$connect();
    this.app = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }



  database() {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    return prisma;
  }

  router() {
    this.app.use(routes);
    this.app.use((req: Request, res: Response) => {
      return res.status(404).json({ error: "Path Not Found" });
    });
    this.app.use(
      (err: HttpException, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        next(err.message);
        res.json({ error: err.message });
      }
    );
  }
}

const { prisma, app } = new App();
export { prisma, app };
