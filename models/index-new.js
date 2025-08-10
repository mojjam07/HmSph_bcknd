'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import all models
const models = require('./model1');

// Import associations
const { setupAssociations } = require('./associations');

// Add models to db
Object.keys(models).forEach(modelName => {
  db[modelName] = models[modelName];
});

// Set up associations
setupAssociations();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
