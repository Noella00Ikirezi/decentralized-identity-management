// backend/middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur serveur :', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur',
  });
};
