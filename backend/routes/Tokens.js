// const express = require("express");
// const router = express.Router();
// const token = require("../services/Tokens");

// router.get("/", async function (req, res, next) {
//   try {
//     const valid = token.authenticateToken(req);
//     // const resToken = token.generateAccessToken({ username: "a" });
//     // res.json(resToken);
//   } catch (err) {
//     console.error(`Error  `, err.message);
//     next(err);
//   }
// });

// router.post("/reCreate", async function (req, res, next) {
//   try {
//     res.json(token.reCreate(req));
//   } catch (err) {
//     console.error(`Error  `, err.message);
//     next(err);
//   }
// });
// module.exports = router;