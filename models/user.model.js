const { db, Sequelize } = require("./db.js");

const userSchema = db.define('user', {
  firstName: {
    type: Sequelize.STRING(50)
  },
  lastName: {
    type: Sequelize.STRING(50)
  },
  birthday: {
    type: Sequelize.DATE
  },
  password: {
    type: Sequelize.STRING(40)
  },
  genderId: {
    type: Sequelize.TINYINT
  }
}, {
  timestamps: false
});

userSchema.sync({force: true});

const User = function(user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.birthday = user.birthday;
  this.password = user.password;
  this.genderId = user.genderId;
};

User.create = async (newUser, result) => {
  try {
    console.log(newUser);
    const res = await userSchema.create({ ...newUser });
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

User.findById = async (userId, result) => {
  try {
    const res = await userSchema.findAll({
      where: {
        id: userId
      }
    });
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

User.getAll = async result => {
  try {
    const res = await userSchema.findAll({where: {}});
    console.log("users: ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

User.updateById = async (id, user, result) => {
  try {
    console.log("hi", id);
    const res = await userSchema
    .update({ ...user }, {
      where: {
        id: id
      }
    });
    console.log(res);
    if (res.length) {
      console.log("updated user: ", res[0]);
      result(null, {updatedCount: res[0]});
      return;
    }
    result({ kind: "not_found" }, null);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

User.remove = async (id, result) => {
  try {
    const res = await userSchema
    .destroy({
      where: {
        id: id
      }
    });
    if (res > 0) {
      console.log("deleted user: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

User.removeAll = async result => {
  try {
    const res = await userSchema.destroy({where: {}});
    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};


module.exports = User;