module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      studentName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      
      pwHash: {
        type: DataTypes.STRING,
      },
      
      userRole: {
        type: DataTypes.STRING,
      },

      token:{
        type:DataTypes.STRING,
      },
    
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
   
    });
    return User;
  };