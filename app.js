const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

// sending home file
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

// collection data from home by post method
app.post("/", function (req, res) {
    // data from post
    const data = JSON.stringify({
        members: [{
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.fname,
                LNAME: req.body.lname
            }
        }]
    })
    console.log(req.body.email+"  "+req.body.fname+"  "+req.body.lname)
    // option for authe and api connection
    const options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/b4a04b557f",
        method: "POST",
        headers: {
            Authorization: "india 694abe43c66a086b37853fb97a5e8ff8-us10"
        },
        body: data
    }
    // sending data to mailchimp servers
    request(options, function (err, response) {
        if (err) {
            res.sendFile(__dirname + "/public/fail.html")
        }
        else if (req.body.email === "" || req.body.fname === "" || req.body.lname === "") {
            console.log("erro ");
            res.sendFile(__dirname + "/public/fail.html")
        }
        else {
            if (res.statusCode === 200) {
                res.sendFile(__dirname + "/public/sucess.html")
            }
            else {
                res.sendFile(__dirname + "/public/fail.html")
            }
        }
    })
})

app.post("/fail", function (req, res) {
    res.redirect("/")
})
app.listen(process.env.PORT || 3000)