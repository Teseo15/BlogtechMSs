import { sign } from "../../../auth";
import { store, findBy } from "../../../store/dummy";
import { response } from "../../../network";
import { hash, compare } from "../../../helper/encrypt";
import User from "../user/model";
import fetch from "node-fetch";
//const fetch = require('node-fetch');

export const login = async (req, res) => {
 // ?Destructuracion
 const user = req.body;
 console.log("SI FUNCIONA lOGIN")
 //? Este payload se envia a sign para ser parte de la creacion del token
 const payload = {
   email: user.email,
   name: user.name,
   password: user.password,
 };

 // const token =  sign(payload);
  //console.log("SI FUNCIONA lOGIN despues de token", token)
  
/*
 const token = app.post({url : "http://localhost:5000/auth/sign", form: payload})
 
 console.log("DATOS TOKEN : ",token);
*/

const url = 'http://localhost:5000/auth/sign';

const respuesta = await fetch(url, {
	method: 'post',
	body: JSON.stringify(payload),
	headers: {'Content-Type': 'application/json'}
});
const data = await respuesta.json();
const token = data.data;
console.log("TOKEN: ",token);


 //? primer debo buscar a mi usario

 //const userData = await findBy(User, "email", user.email);
 const userData = await User.findOne({ email: req.body.email })
 console.log("SI FUNCIONA userData", userData)
 //? luego debo ver si existe
 if (!userData) return;
 console.log('existe')
 //? luego comparo la contraseña
 const validate = compare(user.password, userData.password);

 if (!validate) {
   return response({
     res,
     ok: false,
     status: 500,
     data: {
       message: "User invalid",
     },
   });
 }
 console.log("SI FUNCIONA lOGIN YA ESTA EN LO ULTIMO")
 return response({
  res,
  data: {
    user,
    token
  },
});
 //? si es ok retorno al usuario con su token
};

export const signUp = async (req, res) => {
  const user = req.body;

  //* Creamos el data del usuario nuevo
  // borramos el id porque mongodb ya lo pone
  console.log("SI FUNCIONA signup")
  const data = {
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    password: hash(user.password),
  };

  const users = await store(User, data);

  return response({ res, data: users, status: 201 });
};
