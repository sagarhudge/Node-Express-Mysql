import express, { NextFunction, Request, Response } from "express";
const app = express();
import db from "./database/config";
import employee from "./routes/employee";
const port = db.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/employee", employee);
/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});