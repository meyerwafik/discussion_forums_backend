module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("course", {
      courseName: {
        type: DataTypes.STRING,
      },
      courseDescription: {
        type: DataTypes.STRING,
      },
    
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
   
    });
    return Course;
  };