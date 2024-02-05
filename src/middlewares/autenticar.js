import mongoose from 'mongoose';
import { Schema,model } from 'mongoose'
import { randomUUID } from "node:crypto"
import { hashear, hasheadasSonIguales } from "../utils/cripto.js"
import { responseFailed } from '../middlewares/responseFailed.js';
import { responseSuccessfull } from "../middlewares/responseSuccessfull.js";


export async function autenticarUsuario(username, password) {
  let datosUsuario;

  if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    datosUsuario = {
      email: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      rol: 'admin'
    };
    responseSuccessfull.successfullPost(datosUsuario);
  } else {
    const usuario = await mongoose.model('User').findOne({ email: username }).lean();

    if (!usuario) {
      responseFailed.failedLogin();
    }
    
    if (!hasheadasSonIguales(password, usuario.password)) {
      responseFailed.failedLogin();
    }

    datosUsuario = {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 'usuario'
    };
  }
  return datosUsuario;
}

