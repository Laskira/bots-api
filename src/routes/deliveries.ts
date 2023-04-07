import { Router } from "express";

import {
  getDeliveriesFilterById,
  getDeliveriesPaginated,
} from "../controllers/deliveries";

const DeliveriesRouter: Router = Router();

/**
 * @openapi
 * /deliveries:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Returns deliveries pagination.
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
DeliveriesRouter.route("/").get(getDeliveriesPaginated);

/**
 * @openapi
 * /deliveries/{id}:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Returns a delivery by ID.
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
DeliveriesRouter.route("/:id").get(getDeliveriesFilterById);

export default DeliveriesRouter;
