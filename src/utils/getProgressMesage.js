const getProgressMessage = (progress) => {
    if (progress === 0) return 'Ready to start!'
    if (progress < 50) return 'Keep going'
    if (progress === 50) return 'Half way there!'
    if (progress > 50 && progress < 100) return 'Last push!'
    if (progress === 100) return 'Well done! Your sweat sesh is complete!'
}
export { getProgressMessage }