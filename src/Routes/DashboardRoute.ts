
import * as express from "express"
import { Request, Response } from "express"
import { myDataSource } from "./index"
import { ObjectId } from "typeorm"
import { Dashboard } from "../Model/Dashboard.ts"


export const router = express.Router()



router.get("/", async function (req: Request, res: Response) {
    const folder = await myDataSource.getRepository(Dashboard).find()
    res.json(folder)
}),


router.get("/:id", async function (req: Request<{id: ObjectId}>, res: Response) {
    const results = await myDataSource.getRepository(Dashboard).findOneBy({
        dashboard_id: req.params.id
    })
    return res.send(results)
}),

router.post("/", async function (req: Request, res: Response) {
    const folder = await myDataSource.getRepository(Dashboard).create(req.body)
    const results = await myDataSource.getRepository(Dashboard).save(folder)
    return res.send(results)
}),

router.put("/:id", async function (req: Request<{id: ObjectId}>, res: Response) {
    const folder = await myDataSource.getRepository(Dashboard).findOneBy({
        dashboard_id: req.params.id,
    })
    myDataSource.getRepository(Dashboard).merge(folder, req.body)
    const results = await myDataSource.getRepository(Dashboard).save(folder)
    return res.send(results)
}),

router.delete("/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Dashboard).delete(req.params.id)
    return res.send(results)
})

module.exports = router