export default function promiseWithTimeout(promise, timeoutTime = 5000) {
  // deadline will always reject, but hopefully after the race finishes
  const deadline = new Promise((resolve, reject) => {
    const rejection = () => reject({status: 500, message: 'timeout'})

    setTimeout(rejection, timeoutTime)
  })

  return Promise.race([promise, deadline])
}
