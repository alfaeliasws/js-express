const db = require("./db");
const helper = require("../helper");

function variableInitiator () {
    let success = 0;
    let message = "Data not found";
    let status = 204;
    let jobs = [];
    
    return {success, message, status, jobs, token}
}

const token = helper.jwtUserDetail()

async function getAll() {

  let {success, message, status, tasks}  = variableInitiator()

  const result = await db.query(`SELECT * FROM tasks WHERE deleted_at IS NULL`)
  tasks = helper.emptyOrRows(result);
  
  if ((result?.length ?? 0) > 0) {
    success = 1;
    status = 200;
    message = "Data found";
    tasks = result.slice(0,10);
  }

  return {
    success,
    status,
    message,
    tasks
  };
}

async function getById(id) {
    let {success, message, status, tasks}  = variableInitiator()
    const result = await db.query(`SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL`, [id])
    tasks = helper.emptyOrRows(result);

    if (result) {
      success = 1;
      status = 200;
      message = "Data found";
      tasks = result;
    }

    return {
        success,
        status,
        message,
        tasks,
    };

}
async function create(body) {
  let {success, message, status, tasks}  = variableInitiator()
  
  const result = await db.query(`INSERT INTO tasks (task, weight, status) VALUES (? ,  ?)`, [body.task, body.weight, body.status])
  tasks = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Create Success";
    tasks = result;
  }

  return {
      success,
      status,
      message,
      tasks,
  };

}

async function update(body) {
  let {success, message, status, tasks}  = variableInitiator()
  
  const progressQuery = await db.query(`SELECT progress = SUM(CASE WHEN t.status = "Done" THEN t.wait ELSE 0 END)/SUM(t.weight)*100 FROM tasks t ON t.project_id = p.id WHERE t.project_id = ? AND t.deleted_at IS NULL AND t.deleted_at IS NULL GROUP BY p.id`, [body.id, body.project_id])

  const progress = progressQuery[0].progress

  let progressStatus = "Draft"

  if (progress < 100 && progreess > 0) {
    progressStatus = "In Progress"
  }

  if (progress >= 100) {
    progressStatus = "Done"
  }

  await db.query(`UPDATE projects SET `, [progress[0].progress])

  const result = await db.query(`UPDATE tasks set task = ?, status = ?, progress = ? WHERE id = ? AND deleted_at IS NULL`, [body.task, progressStatus, progress, body.id])

  tasks = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Update Success";
    tasks = result;
  }

  return {
      success,
      status,
      message,
      tasks,
  };

}

async function remove(body) {
  let {success, message, status, tasks}  = variableInitiator()
  
const result = await db.query(`UPDATE tasks set deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [body.id]);
  tasks = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Remove Success";
    tasks = result;
  }

  return {
      success,
      status,
      message,
      tasks,
  };

}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
