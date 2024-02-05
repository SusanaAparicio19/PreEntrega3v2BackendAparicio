import { model } from 'mongoose';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { User } from '../models/User.model.js';

export class UserDAO {
    static async createUser(userData) {
        try {
            userData.password = hashSync(userData.password, genSaltSync(10));
            const user = await model('usuarios').create(userData);
            return new User(user);
        } catch (error) {
            throw new Error('Error al crear usuario en la base de datos');
        }
    }

    static async findUserByEmail(email) {
        try {
            const user = await model('usuarios').findOne({ email }).lean();
            return new User(user);
        } catch (error) {
            throw new Error('Error al buscar usuario por email en la base de datos');
        }
    }

    static async getAllUsers() {
        try {
            const users = await model('usuarios').find().lean();
            return users.map(user => new User(user));
        } catch (error) {
            throw new Error('Error al obtener todos los usuarios de la base de datos');
        }
    }

    static async getUsersByRoles(roles) {
        try {
            const users = await model('usuarios').find({ rol: { $in: roles } }).lean();
            return users.map(user => new User(user));
        } catch (error) {
            throw new Error('Error al obtener usuarios por roles de la base de datos');
        }
    }
}


