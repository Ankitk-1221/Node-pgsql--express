const express = require("express");
const router = express.Router();
const app = express()
const salesController = require('../controllers/salesController');




router
  .get('/stats/:param?', salesController.getStats)
  .post('/create-sales', salesController.createSales);


module.exports = router;



