const {faker} = require("@faker-js/faker");

class UserFactory {
    build(length = 1) {
        let mocks = []
        let currentIndex = 1

        let year = faker.number.int({min: 1900, max: 2024});
        let month = faker.number.int({
            min: 1,
            max: 12
        })
        let day = faker.number.int({min: 1, max: 31})

        if (length === 1) {
            return {
                id: currentIndex,
                name: faker.person.fullName(),
                email: faker.internet.email(),
                age: faker.number.int({min: 18, max: 30}),
                bod: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
            }
        }

        for (let i = 0; i < length; i++) {
            year = faker.number.int({min: 1900, max: 2024});
            month = faker.number.int({
                min: 1,
                max: 12
            })
            day = faker.number.int({min: 1, max: 31})

            mocks.push({
                id: currentIndex,
                name: faker.person.fullName(),
                email: faker.internet.email(),
                age: faker.number.int({min: 18, max: 30}),
                bod: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
            })

            currentIndex++
        }

        return mocks
    }
}

module.exports = new UserFactory()