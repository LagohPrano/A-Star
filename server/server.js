const express = require("express")
const mysql = require('mysql')
const app = express()
const cors = require("cors")

app.use(cors())

const routes = require('./routes')
const config = require('./config.json')

app.get("/", function(req, res) {
    res.send({"name": "Mei"}) // Should be json format
})

// Route 
app.get("/recommendation/company-category", routes.company_category_recommendations)
app.get("/recommendation/company-region", routes.company_region_recommendations)

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;