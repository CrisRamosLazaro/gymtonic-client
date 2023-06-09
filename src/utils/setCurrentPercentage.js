const totalPercentage = (selectedExercises, setCurrentPercentage, setAlerMessage) => {

    const actualPercentage = selectedExercises.reduce((sum, exercise) => sum + exercise.percentage, 0)

    setCurrentPercentage(actualPercentage)

    if (actualPercentage > 100) {
        setAlerMessage(`You can't exceed 100% for your workout. Please select another exercise.`)
    } else if (actualPercentage < 100) {
        setAlerMessage('You must complete 100%')
    } else {
        setAlerMessage('Great job! Your workout is ready!')
    }
}

export { totalPercentage }