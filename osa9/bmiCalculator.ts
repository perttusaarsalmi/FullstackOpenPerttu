import { isNotNumber } from "./utils";

interface BMIValues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const getBMIResult = (height: number, weight: number): string => {
  const heightInMeters = height / 100 // Muutetaan senteistä metreiksi
  const bmi = weight / (heightInMeters * heightInMeters)
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal range'
  } else if (bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)

  console.log(getBMIResult(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
