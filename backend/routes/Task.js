const express = require("express");
const router = express.Router();
const task = require("../services/Task");

/* GET programming languages. */
router.get("/task/", async function (req, res, next) {
  try {
    res.json(await task.getAll());
  } catch (err) {
    console.error(`Get Tasks List failed `, err.message);
    next(err);
  }
});

router.get("/task/:id", async function (req, res, next) {
  try {
    res.json(await task.getById(req.params.id));
  } catch (err) {
    console.error(`Get Task failed `, err.message);
    next(err);
  }
});

router.post("/task/:id", async function (req, res, next) {
  try {
    res.json(await task.create(req.params.id));
  } catch (err) {
    console.error(`Create data failed `, err.message);
    next(err);
  }
});


router.put("/task/:id", async function (req, res, next) {
  try {
    res.json(await task.update(req.params.id));
  } catch (err) {
    console.error(`Update data failed `, err.message);
    next(err);
  }
});

router.delete("/task/", async function (req, res, next) {
  try {
    res.json(await task.delete(req.params.id));
  } catch (err) {
    console.error(`Delete data failed `, err.message);
    next(err);
  }
});

// router.get("/load-more", async function (req, res, next) {
//   try {
//     res.json(await task.getPages(req.query.page));
//   } catch (err) {
//     console.error(`Get Job List By Page failed `, err.message);
//     next(err);
//   }
// });

// router.get("/search", async function (req, res, next) {
//   try {
//     res.json(await task.searchTask(req.query.desc ?? "", req.query.full ?? true, req.query.loc ?? ""));
//   } catch (err) {
//     console.error(`Search Job List failed `, err.message);
//     next(err);
//   }
// });

module.exports = router;
