const dataMapping = {
  6: 1,
  8: 2,
  9: 1,
  0: 1
}

export const countingO = (value: string) => {
  let totalO = 0

  value.split("").forEach((number: string) => {
    if (dataMapping.hasOwnProperty(parseInt(number))) {
      totalO += dataMapping[number]
    }
  })

  return totalO
}