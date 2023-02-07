import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "Test route." });
});
export default router;
