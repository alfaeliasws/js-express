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

  let {success, message, status, projects}  = variableInitiator()

  const result = await db.query(`SELECT *, progress = SUM(CASE WHEN t.status = "Done" THEN t.wait ELSE 0 END)/SUM(t.weight)*100 FROM projects p LEFT JOIN tasks t ON t.project_id = p.id WHERE deleted_at IS NULL GROUP BY p.id`)
  projects = helper.emptyOrRows(result);
  
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
    projects
  };
}

async function getById(id) {
    let {success, message, status, projects}  = variableInitiator()
    const result = await db.query(`SELECT * FROM projects p LEFT JOIN tasks t ON t.project_id = p.id WHERE p.deleted_at IS NULL AND t.deleted_at IS NULL AND p.id = ? GROUP BY p.id`, [id])
    tasks = helper.emptyOrRows(result);

    if (result) {
      success = 1;
      status = 200;
      message = "Data found";
      projects = result;
    }

    return {
        success,
        status,
        message,
        projects,
    };

}
async function create(project) {
  let {success, message, status, projects}  = variableInitiator()

  const result = await db.query(`INSERT INTO projects (project) VALUES (?)`, [project.project])
  projects = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Data found";
    projects = result;
  }

  return {
      success,
      status,
      message,
      projects,
  };

}

async function update(body) {
  let {success, message, status, projects}  = variableInitiator()
  const result = await db.query(`UPDATE projects set project = ?, status = ?, progress = ? WHERE id = ? AND deleted_at IS NULL`, [body.task, body.completed, progress[0].progress, body.id])
  projects = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Update Success";
    projects = result;
  }

  return {
      success,
      status,
      message,
      projects,
  };

}

async function remove(body) {
  let {success, message, status, projects}  = variableInitiator()
  
const result = await db.query(`UPDATE projects set deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [body.id]);
  projects = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Remove Success";
    projects = result;
  }

  return {
      success,
      status,
      message,
      projects,
  };
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
