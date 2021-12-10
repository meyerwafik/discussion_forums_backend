const dbConfig = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require("./course.js")(sequelize, Sequelize);
db.discussions = require("./discussion.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);
db.users = require("./user.js")(sequelize, Sequelize);


db.courses.hasMany(db.discussions, { as: "discussions" });
db.discussions.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});


db.discussions.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.discussions, {
  foreignKey: "discussionId",
  as: "discussion",
});


db.users.hasMany(db.discussions, { as: "discussions" });
db.discussions.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

const user_courses = sequelize.define('user_courses', {});
db.users.belongsToMany(db.courses, {through: user_courses});
// db.users.belongsToMany(db.courses, {
//   through: user_courses,
//   foreignKey: "userId",
//   as: "user",
// });
db.courses.belongsToMany(db.users, {through: user_courses});
db.user_courses=user_courses;


module.exports = db;