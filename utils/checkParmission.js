const checkPermission = (requestUser, queryUserId) => {
  return (
    requestUser.role === "admin" ||
    requestUser.userId === queryUserId.toString()
  );
};

export default checkPermission;
