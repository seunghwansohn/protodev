module.exports = function rmTimeFromReq (obj) {
    delete obj.createdAt
    delete obj.updatedAt
    return obj;
};
  
