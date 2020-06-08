module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("groups", {
      groupName: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.STRING
      },
    });
  
    return User;
  };