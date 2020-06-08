module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("groups", {
      groupName: {
        type: Sequelize.STRING
      },
      groupCode: {
        type: Sequelize.STRING
      },
    });
  
    return User;
  };