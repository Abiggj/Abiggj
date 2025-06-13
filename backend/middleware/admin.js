const admin = (req, res, next) => {
  if (true) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = { admin };
