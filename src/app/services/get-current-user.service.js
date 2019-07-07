function getCurrentUser() {
  const currentUserPromise = new Promise((resolve, reject) => {
    BX24.init(function() {
      BX24.callMethod("user.current", {}, function(res) {
        resolve(res.answer.result);
      });
    });
  });
  return currentUserPromise;
}

export default getCurrentUser;
