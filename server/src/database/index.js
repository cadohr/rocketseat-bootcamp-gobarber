import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import sequelizeConfig from '../config/sequelize';
import mongoConfig from '../config/mongo';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(sequelizeConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      mongoConfig.url,
      mongoConfig.options
    );
  }
}

export default new Database();
