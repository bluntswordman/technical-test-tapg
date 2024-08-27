import {countingO} from "../services/CountO";

test('should return count o as expected', () => {
  const dataTest = [
    {
      "input": "886",
      "output": 5
    },
    {
      "input": "100",
      "output": 2
    }
  ]

  dataTest.forEach((data, index) => {
    expect(countingO(data.input)).toBe(data.output)
  })
})