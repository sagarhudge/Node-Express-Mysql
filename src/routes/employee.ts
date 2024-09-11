import express, { NextFunction, Request, response, Response } from "express";
import employee from "../controller/employee";

const router = express.Router();
//create employee
router.post(
    "/create",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await employee.create(req.body));
        } catch (err) {
            next(err);
        }
    }
);
// get employee by id

router.get("/all", async (req: Request, res: Response, next) => {
    try {
        const emp = await employee.getAllEmployees(req);
        res.json(emp);
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

//update employee by id

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emp = await employee.update(req.params.id, req.body);
        res.json(emp);
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

// Delete employee by id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emp = await employee.remove(req.params.id);
        res.json(emp);
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

export default router;