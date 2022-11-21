const { connection } = require("../config/dbconfig");

// get all Spaces
const getAllSpaces = async (req, res) => {
  try {
    connection.query("SELECT * FROM space", function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// get single Space
const getSingleSpace = async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      `SELECT * FROM space WHERE id = ?`,
      id,
      (error, results, fields) => {
        if (error) throw error;

        if (results.length === 0) {
          return res.json({
            error: "no such space",
          });
        }

        res.json(results);
      }
    );
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// craete new space
const createSpace = async (req, res) => {
  try {
    connection.query(
      "INSERT INTO space SET ?",
      { ...req.body },
      function (error, results, fields) {
        if (error) throw error;

        res.json(results);
      }
    );
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// delete space
const deleteSpace = async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "DELETE FROM space WHERE id = ?",
      id,
      (error, results, fields) => {
        if (error) throw error;

        if (results.affectedRows === 0) {
          return res.json({
            error: "no such space",
          });
        }

        res.json(results);
      }
    );
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// update space
const updateSpace = async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "UPDATE space SET ? WHERE id = ?",
      [{ ...req.body }, id],
      (error, results, fields) => {
        if (error) throw error;

        if (results.affectedRows === 0) {
          return res.json({
            error: "no such space",
          });
        }

        res.json(results);
      }
    );
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllSpaces,
  getSingleSpace,
  createSpace,
  deleteSpace,
  updateSpace,
};
