// import memoize from 'fast-memoize'

const {floor, random} = Math
const scrambledChars = '!<>-_[]{}—=+*^?#________'

export const randomChar = (chars = scrambledChars) => {
  return chars[floor(random() * chars.length)]
}

const threshold = 0.28

const mapOutputToString = output => output.map(({char}) => char).join('')

export const castOutputToString = mapOutputToString

export const setText = (children, oldText) => {
  const queue = []

  for (let i = 0, len = children.length; i < len; i += 1) {
    const from = oldText[i] || ''
    const to = children[i] || ''
    const start = floor(random() * 40)
    const end = start + floor(random() * 40)

    queue.push({from, to, start, end})
  }

  return {
    frame: 0,
    queue,
    newText: children,
    done: false,
  }
}

// eslint-disable-next-line complexity
export const buildNewOutput = (queue, frame) => {
  let complete = 0
  const output = []
  const newQueue = [...queue]

  for (let i = 0, n = queue.length; i < n; i += 1) {
    const {from, to, start, end, char = null} = queue[i]

    if (frame >= end) {
      complete += 1
      output.push({char: to})
    }

    if (frame < end && frame >= start) {
      if (!char || random() < threshold) {
        newQueue[i].char = randomChar(scrambledChars)
      }
      output.push({dud: true, char})
    }

    if (frame < end && frame < start) {
      output.push({char: from})
    }
  }

  return {
    newQueue,
    output,
    complete,
  }
}
