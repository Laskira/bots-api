import { Router } from "express";

import { addBot, assingOrderToBot, getBotsByZone } from "../controllers/bots";

const BotsRouter: Router = Router();

/**
 * @openapi
 * components:
 *   schema:
 *     Bots:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         status:
 *           type: string
 *         zone_id:
 *           type: string 
 *         location:
 *           type: object
 */

/**
 * @openapi
 * /bots:
 *   post:
 *     tags:
 *       - Bots
 *     summary: Save a bot register.
 *     requestBody:
 *        required: true
 *     responses:
 *       200:
 *         description: Bot added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example:
 *                      id: 11243
 *                      status: avaliable
 *                      zone_id: 65432
 *                      location: {"lat": 7.884867, "lon": -76.633155}
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schema/Bots'
 */
BotsRouter.route("/").post(addBot);


/**
 * @openapi
 * components:
 *   schema:
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         creation_date:
 *           type: string 
 *           format: date 
 *         state:
 *           type: string
 *         pickup:
 *          type: object
 *         dropoff:
 *           type: object
 *         zone_id:
 *           type: string
 */

/**
 * @openapi
 * /bots/assging:
 *   post:
 *     tags:
 *       - Bots
 *     summary: Save a order to a bot.
 *     requestBody:
 *        required: true
 *     responses:
 *       200:
 *         description: Order saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example:
 *                      id: 11243
 *                      creation_date: 2023-04-07,
 *                      state: pending
 *                      pickup: {"lat": 7.884867, "lon": -76.633155}
 *                      dropoff: {"lat": 7.884315, "lon": -76.634430}
 *                      zone_id: 65432
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schema/Delivery'
 */
BotsRouter.route("/assging").post(assingOrderToBot);

/**
 * @openapi
 * /bots/{id}:
 *   get:
 *     tags:
 *       - Bots
 *     summary: Returns a bots by zone_id.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *           minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
BotsRouter.route("/:idZone").get(getBotsByZone);

export default BotsRouter;
