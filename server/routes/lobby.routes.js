import {Router} from "express";
import * as lobbyController from "../controllers/lobby.controller.js";

const router = Router();

/**
 * @openapi
 * '/lobbies':
 *   get:
 *     tags:
 *       - Lobby
 *     summary: Get all lobbies
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.get("/", lobbyController.getLobbies);

/**
 * @openapi
 * '/lobbies/{id}':
 *   get:
 *     tags:
 *       - Lobby
 *     summary: Get lobby by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.get("/:id", lobbyController.getLobby);

/**
 * @openapi
 * '/lobbies/{id}/join':
 *   post:
 *     tags:
 *       - Lobby
 *     summary: Join lobby by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.post("/:id/join", lobbyController.joinLobby);

/**
 * @openapi
 * /lobbies/{id}/leave:
 *   delete:
 *     tags:
 *       - Lobby
 *     summary: Leave lobby by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Choose player to leave
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playerId
 *             properties:
 *               playerId:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.delete("/:id/leave", lobbyController.leaveLobby);

/**
 * @openapi
 * '/lobbies/{id}':
 *   delete:
 *     tags:
 *       - Lobby
 *     summary: Remove lobby by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Removed
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found
 */
router.delete("/:id", lobbyController.deleteLobby);

export default router;
