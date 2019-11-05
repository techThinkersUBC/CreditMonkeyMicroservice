const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');

router.get('/', (req, res) => {
    // Call the API filter (theortically hosted somewhere else, otherwise we could just route
    // it through without using fetch)
    fetch('http://localhost:4000/balance', {
        method: 'GET',
        headers: {
            'Content-Type': req.header('Content-Type'),
            // Should be of the format: DirectLogin username="", password="", consumer_key=""
            'Authorization': req.header('Authorization')
        }
    })
    .then(response => {
        response.json().then(data => {
            const creditResponse = {
                // Calculate credit score from account balance
                credit_score: (data.overall_balance.amount / 6) + 500
            }
            // Only return processed credit score (no raw data from the API filter call)
            res.status(200).json(creditResponse);
        })
    })
    .catch((e) => {
        console.log(e);
    })
});

module.exports = router;