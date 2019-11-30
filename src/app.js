const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express()
const port = process.env.PORT || 3000 //set by heroku

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "weather app",
        name: "abc company"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "abc company"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "Help text",
        title: "Help",
        name: "abc Company"
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "abc company",
        errorMessage: "Help article not found"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }
  
    // geocode(req.query.address, (err,  {latitude, longitude, location}) => {
    geocode(req.query.address, (err,  {latitude, longitude, location} = {}) => { //set default with empty object      
        if (err) {
            return res.send({ err})
        }
        
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })  
    })
})


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({error: "You must provide a search term"})
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "abc company",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => console.log(`Server is up on port ${port}.`))