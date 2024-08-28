const request = require('supertest');
const app = require('../src');
const userRepository = require('../src/repositories/UserRepository');
const UserFactory = require('../src/factories/UserFactory')

jest.mock('../src/repositories/UserRepository');

describe('User API Endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch all users', async () => {
        const users = UserFactory.build(4);
        userRepository.getAll.mockReturnValue(users);

        const response = await request(app).get('/api/users');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(users);
    });

    test('should fetch a user by ID', async () => {
        const user = UserFactory.build();
        userRepository.getById.mockReturnValue(user);

        const response = await request(app).get('/api/users/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(user);
    });

    test('should return 404 if user not found by ID', async () => {
        userRepository.getById.mockReturnValue(undefined);

        const response = await request(app).get('/api/users/999');

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({message: 'User not found'});
    });

    test('should create a user', async () => {
        const newUser = UserFactory.build();
        const {id, ...payload} = newUser
        userRepository.create.mockReturnValue(newUser);

        const response = await request(app)
            .post('/api/users')
            .send(payload);

        expect(response.statusCode).toBe(201);
        expect(response.body.user).toEqual(newUser);
    });

    test('should update a user', async () => {
        const {id, ...updatedUser} = UserFactory.build();
        userRepository.update.mockReturnValue(updatedUser);

        const {id: payloadId, ...payload} = UserFactory.build()

        const response = await request(app)
            .put('/api/users/1')
            .send(payload);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(updatedUser);
    });

    test('should return 404 if user not found for update', async () => {
        userRepository.update.mockReturnValue(undefined);

        const {id: payloadId, ...payload} = UserFactory.build()

        const response = await request(app)
            .put('/api/users/999')
            .send(payload);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({message: 'User not found'});
    });

    test('should delete a user', async () => {
        const deletedUser = UserFactory.build();
        userRepository.delete.mockReturnValue(deletedUser);

        const response = await request(app).delete('/api/users/1');

        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if user not found for delete', async () => {
        userRepository.delete.mockReturnValue(null);

        const response = await request(app).delete('/api/users/999');

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({message: 'User not found'});
    });
});
