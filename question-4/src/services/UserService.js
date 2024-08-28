const {UserRepository} = require('../repositories');
const {User} = require('../models');

let userCounter = 1

class UserService {
    getAllUsers() {
        return UserRepository.getAll();
    }

    getUserById(id) {
        return UserRepository.getById(id);
    }

    createUser(name, email, age, bod) {
        const id = userCounter++
        const user = new User(id, name, email, age, bod);
        return UserRepository.create(user);
    }

    updateUser(id, userData) {
        return UserRepository.update(id, userData);
    }

    deleteUser(id) {
        return UserRepository.delete(id);
    }
}

module.exports = new UserService();
