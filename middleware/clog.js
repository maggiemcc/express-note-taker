// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  const yellow = '\x1b[33m';
  switch (req.method) {
    default:
      console.log(`${yellow}${req.method} request to ${req.path}`);
  }

  next();
};

exports.clog = clog;
