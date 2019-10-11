const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');

const {validateUser} = require('./middleware');
const port = process.env.PORT || 3000;
const logger = require('morgan');
const {
  users,
  roles,
  restaurants,
  menus,
  schedules,
  sections,
} = require('./routes/api');

app.use(cors());
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/v1/users/', users);
// app.use('/api/v1/roles/', roles);

app.use('/api/v1/menus/', menus);
app.use('/api/v1/schedules', schedules);
app.use('/api/v1/sections', sections);
app.use('/api/v1/restaurants', restaurants);

app.listen(port, () => {
  console.log(`🚀 Server running on ${port}`);
});

module.exports = app;

// const {GraphQLServer} = require('graphql-yoga'); // server.start(() => console.log("🚀 server running")); //   type Query { //     user(username: String!): User //   } //     name: String //     avatar_url: String //   } // `; //   Query: { //     user: (_, args) => { //       const {username} = args; //         .get(`https://api.github.com/users/${username}`) //         .then(res => res.data); //     }, //   }, // }; //   console.log(`🚀 Server running`); // const BASE_URL = 'https://api.github.com/users'; // const typeDefs = ` //   type User { // const resolvers = { //       return axios // const server = new GraphQLServer({typeDefs, resolvers}); // server.start(() => {
