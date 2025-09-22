interface ResultObject { 
  periodLength: number
  trainingDays: number
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))