const Gender = require("../models/gender.model.js");

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	// Save Gender in the database
	Gender.initiate((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Gender."
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
  Gender.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving genders."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Gender.findById(req.params.genderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gender with id ${req.params.genderId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Gender with id " + req.params.genderId
        });
      }
    } else res.send(data);
  });
};

