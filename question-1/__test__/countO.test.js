const {countingO} = require('../src/services/countO')

test('should return count o as expected', () => {
    const dataTest = [
        {
            "input": "886",
            "output": 5
        },
        {
            "input": "100",
            "output": 2
        },
        {
            "input": "1245894008530",
            "output": 8
        },
        {
            "input": "880950349686",
            "output": 12
        }
    ]

    dataTest.forEach((data, index) => {
        expect(countingO(data.input)).toBe(data.output)
    })
})