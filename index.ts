import express, { Request, Response }  from "express";
import { PrismaClient } from "@prisma/client";
import  user  from "./router/user";
const app = express()
app.use(express.json())
app.use(user)

const PORT = process.env.PORT || 5000

app.get('/', async(req:Request, res:Response) =>{})

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})