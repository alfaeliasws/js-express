const db = require("./services/db");
const jwt = require("jsonwebtoken");

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function jwtUserDetail (auth) {
  if(auth){
    const token = jwt.decode(auth).userDetail;
    return token
  } else {
    return false
  }
}

async function iterator(array, callback){
  await array.forEach(async item => {
    await callback(item)
  });
}

module.exports = {
  getOffset,
  emptyOrRows,
  jwtUserDetail,
  iterator
};
