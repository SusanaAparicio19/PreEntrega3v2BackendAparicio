import { UserDAO } from '../dao/user.dao.js';

export class UserRepository {
    async save(userData) {
        try {
            await UserDAO.createUser(userData);
        } catch (error) {
            throw error;
        }
    }

    async findOneByEmail(email) {
        try {
            const user = await UserDAO.findUserByEmail(email);
            return user ? user.toPOJO() : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const users = await UserDAO.getAllUsers();
            return users.map(user => user.toPOJO());
        } catch (error) {
            throw error;
        }
    }

    async findByRoles(roles) {
        try {
            const users = await UserDAO.getUsersByRoles(roles);
            return users.map(user => user.toPOJO());
        } catch (error) {
            throw error;
        }
    }

    async updateByEmail(email, newData) {
        try {
            const updatedUser = await UserDAO.updateUserByEmail(email, newData);
            return updatedUser ? updatedUser.toPOJO() : null;
        } catch (error) {
            throw error;
        }
    }

    async deleteByEmail(email) {
        try {
            const deletedUser = await UserDAO.deleteUserByEmail(email);
            return deletedUser ? deletedUser.toPOJO() : null;
        } catch (error) {
            throw error;
        }
    }
}

export const userRepository = new UserRepository();

