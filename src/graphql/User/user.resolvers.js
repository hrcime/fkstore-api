const { ApolloError } = require('apollo-server-express');

module.exports = {
  Query: {
    getUser: async (root, {}, { db }) => {
      let result = await db.User.findAll();
      return result;
    },
  },
  Mutation: {
    createUser: async (root, { }, { db }) => {
      let user = await db.User.createUser({
        firstName: 'test',
        lastName: 'test 1',
        sex: 0,
        email: 'test@test.com',
        status: 1,
      })

      if(user) return user;

      throw new ApolloError('Email already is exists', 'USER_EXISTS');
    },
  },
};
