module.exports = {
    Query: {
        getUser: async (root, {}, {db}) => {
            let result = await db.users.findAll();
            return result;
        }
    }
}