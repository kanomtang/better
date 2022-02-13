// Use Promise.all to Stop Async/Await from Blocking Execution

const functionA = async () => {
    const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay))
    return waitFor(500).then(() => {
        return "A"
    })
}

const functionB = async () => {
    const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay))
    return waitFor(500).then(() => {
        return "B"
    })
}

// Normal sequnce ( Blocking execution )
const runNormalSequence = async () => {
    const a = await functionA();
    const b = await functionB();
    return { a, b } 
}

// Better sequnce ( Non-Blocking execution )
const runBetterSequence = async () => {
    const a = functionA();
    const b = functionB();
    return Promise.all([a, b]) 
}

(async () => {
    console.time('normal sequence')
    await runNormalSequence();
    console.timeEnd('normal sequence')
    
    console.time('bettter sequence')
    await runBetterSequence();
    console.timeEnd('bettter sequence')
})()