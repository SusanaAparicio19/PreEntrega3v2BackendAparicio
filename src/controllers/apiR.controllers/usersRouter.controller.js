import { UserDAO } from '../../dao/user.dao.js';
import { responseSuccessfull } from '../../middlewares/responseSuccessfull.js';
import { responseFailed } from '../../middlewares/responseFailed.js';

export async function postUserController(req, res, next) {
    try {
        const usuario = await UserDAO.createUser(req.body);
        responseSuccessfull.successfullPost(usuario);
    } catch (error) {
        next(error);
    }
}

export async function getCurrentUserController(req, res) {
    try {
        const userId = req.session.userId;
        const user = await UserDAO.findById(userId);
        res.json({
            id: user.id,
            username: user.username,
        });
    } catch (error) {
        console.error(error);
        responseFailed.serverError();
    }
}

export async function getUsersAdminController(req, res) {
    try {
        const usuarios = await UserDAO.getAllUsers();
        responseSuccessfull.successfullGet(usuarios);
    } catch (error) {
        next(error);
    }
}

export async function getUsersByRolesController(req, res) {
    try {
        const usuarios = await UserDAO.getUsersByRoles(req.query.roles);
        responseSuccessfull.successfullGet(usuarios);
    } catch (error) {
        next(error);
    }
}



