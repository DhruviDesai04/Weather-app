const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Whether App',
    name: 'Dhruvi Desai'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Dhruvi Desai'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Dhruvi Desai'
  })
})


// app.get("", (req, res) => {
//   res.send("<h1>Home</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Dhruvi",
//     },
//     { age: 20 },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h3>About Us</h3>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must Provide an address.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  });

  // res.send({
  //     forecast: "Summer",
  //     location: "India",
  //     address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must Provide a Search term'
    })
  }

  console.log(req.query.search);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',  {
    title: '404',
    name: 'Dhruvi Desai',
    error: 'Help Article not Found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dhruvi Desai',
    error: 'Page Not Found'
  })
})

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
