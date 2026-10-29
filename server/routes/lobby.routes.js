import { Router } from "express";
import * as lobbyController from "../controllers/lobby.controller.js";

const router = Router();

router.get("/", lobbyController.getLobbies);
router.get("/:id", lobbyController.getLobby);
router.post("/:id/join", lobbyController.joinLobby);
router.delete("/:id", lobbyController.deleteLobby);

export default router;
