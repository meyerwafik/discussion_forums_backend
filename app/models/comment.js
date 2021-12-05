module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      content: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
     
   
    });
    return Comment;
  };