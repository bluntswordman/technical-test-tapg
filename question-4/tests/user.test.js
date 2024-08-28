const UserService = require('../src/services/UserService');
const userRepository = require('../src/repositories/UserRepository');
const { User } = require('../src/models');

// Mock userRepository and User
jest.mock('../src/repositories/UserRepository');
jest.mock('../src/models');

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all users', async () => {
        // Arrange
        const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
        userRepository.getAll.mockResolvedValue(mockUsers);

        // Act
        const users = await UserService.getAllUsers();

        // Assert
        expect(userRepository.getAll).toHaveBeenCalled();
        expect(users).toEqual(mockUsers);
    });

    test('should get user by ID', async () => {
        // Arrange
        const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
        userRepository.getById.mockResolvedValue(mockUser);

        // Act
        const user = await UserService.getUserById(1);

        // Assert
        expect(userRepository.getById).toHaveBeenCalledWith(1);
        expect(user).toEqual(mockUser);
    });

    test('should create a user', async () => {
        // Arrange
        const name = 'John Doe';
        const email = 'john@example.com';
        const age = 30;
        const bod = '1994-01-01';
        const mockUser = { id: 1, name, email, age, bod };
        userRepository.create.mockResolvedValue(mockUser);
        User.mockImplementation((id, name, email, age, bod) => ({ id, name, email, age, bod }));

        // Act
        const user = await UserService.createUser(name, email, age, bod);

        // Assert
        expect(userRepository.create).toHaveBeenCalledWith(mockUser);
        expect(user).toEqual(mockUser);
    });

    test('should update a user', async () => {
        // Arrange
        const id = 1;
        const userData = { name: 'Jane Doe' };
        userRepository.update.mockResolvedValue({ id, ...userData });

        // Act
        const updatedUser = await UserService.updateUser(id, userData);

        // Assert
        expect(userRepository.update).toHaveBeenCalledWith(id, userData);
        expect(updatedUser).toEqual({ id, ...userData });
    });

    test('should delete a user', async () => {
        // Arrange
        const id = 1;
        userRepository.delete.mockResolvedValue({ id });

        // Act
        const deletedUser = await UserService.deleteUser(id);

        // Assert
        expect(userRepository.delete).toHaveBeenCalledWith(id);
        expect(deletedUser).toEqual({ id });
    });
});
