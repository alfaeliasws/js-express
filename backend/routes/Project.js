const express = require("express");
const router = express.Router();
const project = require("../services/Project");

/* GET programming languages. */
router.get("/project/", async function (req, res, next) {
  try {
    res.json(await project.getAll());
  } catch (err) {
    console.error(`Get Projects List failed `, err.message);
    next(err);
  }
});

router.get("/project/:id", async function (req, res, next) {
  try {
    res.json(await project.getById(req.params.id));
  } catch (err) {
    console.error(`Get Project failed `, err.message);
    next(err);
  }
});

router.post("/project/:id", async function (req, res, next) {
  try {
    res.json(await project.create(req.params.id));
  } catch (err) {
    console.error(`Create data failed `, err.message);
    next(err);
  }
});


router.put("/project/:id", async function (req, res, next) {
  try {
    res.json(await project.update(req.params.id));
  } catch (err) {
    console.error(`Update data failed `, err.message);
    next(err);
  }
});

router.delete("/project/", async function (req, res, next) {
  try {
    res.json(await project.delete(req.params.id));
  } catch (err) {
    console.error(`Delete data failed `, err.message);
    next(err);
  }
});

// router.get("/load-more", async function (req, res, next) {
//   try {
//     res.json(await project.getPages(req.query.page));
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
