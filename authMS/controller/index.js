import jwt from "jsonwebtoken";
import { secret } from "../../config/config";
import { response } from "../../network";

/**
 * Como ahora sign sera una funcion a la cual yo acceda mediante un request
 * el parametero
 */
const sign = (req, res) => {
  const signed = jwt.sign(req.body, secret);
  return response({
    res,
    data: signed,
  });
};

const verify = (token) => jwt.verify(token, secret);

/**
 * @param {string} authorization
 * @param {Response} res
 */
const getToken = (authorization, res) => {
  if (authorization === null) {
    response({
      res,
      ok: false,
      status: 403,
      data: { message: "Token not found" },
    });
  }

  if (authorization.indexOf("Bearer") === -1) {
    response({
      res,
      ok: false,
      status: 403,
      data: { message: "Format token invalid" },
    });
  }

  const token = authorization.split(" ")[1];
  return token;
};

/**
 * @param {*} req: Request
 * @param {*} res: Response
 * @param {*} next: Next
 */
const checkToken = (req, res, next) => {
  const authorization = req.headers.authorization || null;
  const token = getToken(authorization, res);
  const decoded = verify(token);

  if (!decoded) {
    response({
      res,
      ok: false,
      status: 403,
      data: { message: "Invalid Token" },
    });
  }

  req.decoded = decoded;

  next();
};

export { sign, checkToken };
