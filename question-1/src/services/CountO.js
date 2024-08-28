const dataMapping = {
  6: 1,
  8: 2,
  9: 1,
  0: 1
}

const countingO = (value) => {
  let totalO = 0

  value.split("").forEach((number) => {
    if (dataMapping.hasOwnProperty(parseInt(number))) {
      totalO += dataMapping[number]
    }
  })

  return totalO
}

module.exports = {
  countingO
}