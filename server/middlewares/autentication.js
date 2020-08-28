const jwt = require('jsonwebtoken');

// =====================
// Verificar Token
// =====================
let verifyToken = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.SEED, (err, decoded) => {

    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no válido'
        }
      });
    }

    req.user = decoded.user;
    next();
  });
};

// =====================
// Verifica AdminRole TODO: verifica que el usuario tenga un rol: [ADMIN_ROLE]
// =====================
let verifyAdmin_Role = (req, res, next) => {

  let user = req.user;

  console.log(user);

  if (user.role === 'ADMINISTRADOR') {
    next();
  } else {

    return res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }
    });
  }
};


module.exports = {
  verifyToken,
  verifyAdmin_Role,
}