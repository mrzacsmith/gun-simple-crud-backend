const { Sequelize } = require("sequelize");
const {
	HOST,
	USER,
	PASSWORD,
	DB,
	PORT
} = require('../config/db.config');

var sequelize = new Sequelize(DB, USER, PASSWORD, {
	host: HOST,
  dialect: "mysql",
  port: PORT,
	logging: function () {},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {
		paranoid: true
	}
});

module.exports = {
	db: sequelize,
	Sequelize
}
