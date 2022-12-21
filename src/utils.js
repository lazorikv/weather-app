export const roundValue = (value) => {
    return Math.sign(value) * Math.round(Math.abs(value))
  }