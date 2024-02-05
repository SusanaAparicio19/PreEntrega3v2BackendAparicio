import { SessionsService } from '../../service/sessions.service.js';
import { responseSuccessfull } from '../../middlewares/responseSuccessfull.js';
import { responseFailed } from '../../middlewares/responseFailed.js';

const sessionsService = new SessionsService();

export async function postSessionsController(req, res) {
    try {
        const { email, password } = req.body;
        const datosUsuario = await sessionsService.login({ email, password });
        req.session.user = datosUsuario;
        return responseSuccessfull.successfullPost(datosUsuario); 
    } catch (error) {
        return responseFailed.failedPost(); 
    }
}

export async function deleteCurrentSessionsController(req, res) {
    try {
        await sessionsService.eliminarSesion({ userData: req.session.user });
        req.session.destroy(err => {
            if (err) {
                return responseFailed.failedDelete(); 
            }
            return responseSuccessfull.successfullDelete(); 
        });
    } catch (error) {
        return responseFailed.failedDelete(); 
    }
}

export function getCurrentSessionsController(req, res, next) {
    try {
        if (req.session.user) {
            return responseSuccessfull.successfullGet(req.session.user); 
        } else {
            return responseFailed.failedGet(); 
        }
    } catch (error) {
        next(error);
    }
}



