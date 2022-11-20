const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}

// **************************************************
//              RECOMMENDATION ROUTES
// **************************************************
async function company_category_recommendations(req, res){

    const major = req.query.major;

    connection.query(`WITH people_in_same_major AS(
        SELECT object_id 
        FROM degrees 
        WHERE subject LIKE '%${major}%'
        ), people_in_which_company AS(
        SELECT relationship_object_id
        FROM relationships 
        JOIN people_in_same_major ON people_in_same_major.object_id = relationships.person_object_id
        ), company_categories AS(
        SELECT category_code 
        FROM companies 
        JOIN people_in_which_company ON people_in_which_company.relationship_object_id = companies.id
        )
        SELECT category_code, COUNT(category_code)
        FROM company_categories
        GROUP BY category_code
        ORDER BY COUNT(category_code) DESC;`, function(error, results, fields){
            if (error){
                console.log(error)
                res.json({error: error})
            }
            else if (results){
                res.json({results: results})
            }
            else{
                res.json({results: []})
            }
        }
    );
}

async function company_region_recommendations(req, res){

    const major = req.query.major;
    
    connection.query(`WITH people_in_same_major AS(
        SELECT object_id 
        FROM degrees 
        WHERE subject LIKE '%${major}%'
        ), people_in_which_company AS(
        SELECT relationship_object_id
        FROM relationships 
        JOIN people_in_same_major ON people_in_same_major.object_id = relationships.person_object_id
        ), company_regions AS(
        SELECT region
        FROM companies 
        JOIN people_in_which_company ON people_in_which_company.relationship_object_id = companies.id
        )
        SELECT region, COUNT(region)
        FROM company_regions
        GROUP BY region
        ORDER BY COUNT(region) DESC;`, function(error, results, fields){
            if (error){
                console.log(error)
                res.json({error: error})
            }
            else if (results){
                res.json({results: results})
            }
            else{
                res.json({results: []})
            }
        }
    );
}

module.exports = {
    hello,
    company_category_recommendations,
    company_region_recommendations
}