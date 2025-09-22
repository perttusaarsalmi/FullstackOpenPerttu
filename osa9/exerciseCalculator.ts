import { isNotNumber } from "./utils";

interface ResultObject { 
  periodLength: number
  trainingDays: number
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


interface ExerciseValues {
  target: number
  dailyHours: number[]
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  
  const target = Number(args[2])
  if (isNotNumber(args[2])) {
    throw new Error('Target must be a number!')
  }
  
  const dailyHours: number[] = []
  for (let i = 3; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error('Provided values were not numbers!')
    }
    dailyHours.push(Number(args[i]))
  }
  
  return {
    target,
    dailyHours
  }
}

const calculateExercises = (dailyHours: number[], target: number): ResultObject => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(day => day > 0).length
  const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength
  const success = average >= target
  
  let rating: number
  let ratingDescription: string
  
  if (average >= target) {
    rating = 3
    ratingDescription = 'excellent'
  } else if (average >= target * 0.8) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'bad'
  }
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, dailyHours } = parseArguments(process.argv)
  console.log(calculateExercises(dailyHours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}