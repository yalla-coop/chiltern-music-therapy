const getCSRFToken = async (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

export default getCSRFToken;
