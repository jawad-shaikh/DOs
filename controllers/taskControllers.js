const { connection } = require("../config/dbconfig");

// get all Parent Tasks
const getAllParentTasks = async (req, res) => {
  const space = req.params.space;

  try {
    connection.query(
      "SELECT * FROM task WHERE space = ? AND parentId IS NULL",
      space,
      (error, results, fields) => {
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

// get all Child Tasks
const getAllChildTasks = async (req, res) => {
  const space = req.params.space;
  const id = req.params.id;

  try {
    connection.query(
      `SELECT * FROM task WHERE space = ? AND parentId = ?`,
      [space, id],
      (error, results, fields) => {
        if (error) throw error;

        if (results.length === 0) {
          return res.json({
            error: "no such tasks.",
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

// get single Task
const getSingleTask = async (req, res) => {
  const space = req.params.space;
  const id = req.params.id;

  try {
    connection.query(
      `SELECT * FROM task WHERE space = ? AND id = ?`,
      [space, id],
      (error, results, fields) => {
        if (error) throw error;

        if (results.length === 0) {
          return res.json({
            error: "no such task.",
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

// craete new Task
const createTask = async (req, res) => {
  try {
    connection.query(
      "INSERT INTO task SET ?",
      { ...req.body },
      (error, results, fields) => {
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

// delete Task
const deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "DELETE FROM task WHERE id = ?",
      id,
      (error, results, fields) => {
        if (error) throw error;

        if (results.affectedRows === 0) {
          return res.json({
            error: "no such task.",
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

// update Task
const updateTask = async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "UPDATE task SET ? WHERE id = ?",
      [{ ...req.body }, id],
      (error, results, fields) => {
        if (error) throw error;

        if (results.affectedRows === 0) {
          return res.json({
            error: "no such task",
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
  getAllParentTasks,
  getAllChildTasks,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
};
