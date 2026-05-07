"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authController_1 = require("../auth/authController");
const router = express.Router();
router.post('/login', authController_1.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map