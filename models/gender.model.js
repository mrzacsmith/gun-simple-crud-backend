const { db, Sequelize } = require("./db.js");

// constructor
const genderSchema = db.define('gender', {
  gender: {
    type: Sequelize.STRING(50)
  }
}, {
  timestamps: false
});

const Gender = function(gender) {
  this.gender = gender.gender;
}

genderSchema.sync({force: true});

Gender.findById = async (genderId, result) => {
  try {
    const res = await genderSchema.findAll({
      where: {
        id: genderId
      }
    });
    if (res.length) {
      console.log("found gender: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

Gender.initiate = async result => {
  try {
    await genderSchema.create({ gender: 'Male' });
    await genderSchema.create({ gender: 'Female' });
    result(null, {succeed: true});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
}

Gender.getAll = async result => {
  try {
    const res = await genderSchema.findAll();
    console.log("genders: ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

module.exports = Gender;