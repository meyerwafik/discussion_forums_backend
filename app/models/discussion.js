module.exports = (sequelize, DataTypes) => {
    const Discussion = sequelize.define("discussion", {
      title: {
        type: DataTypes.STRING,
      },
      discDescription: {
        type: DataTypes.STRING,
      },
    
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
   
    });
    return Discussion;
  };