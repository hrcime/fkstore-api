const { sequelize, Sequelize } = require('../models');
const { User } = sequelize.models;

class UserRepository {
  async findAll(){
    return await User.findAll();
  }

  async createUser(info){
    let checkUser = await User.findOne({
      where: {
        email: info.email
      }
    });

    if (checkUser) return false;
    
    let newUser = await User.create(info);
    return newUser;
  }
}

module.exports = UserRepository;

