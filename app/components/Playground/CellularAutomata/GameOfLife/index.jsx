import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './index.styl'

const randomLive = (row, column) => {
  return Math.random() > 0.9
}

const newGeneration = (rows, columns) => {
  const grid = []

  for (let row = 0; row < rows; row++) {
    const rowArray = []

    for (let column = 0; column < columns; column++) {
      rowArray.push({alive: randomLive(row / rows, column / columns)})
    }

    grid.push(rowArray)
  }

  return grid
}

const nextGeneration = (rows, columns, grid) => {
  const newGrid = grid.map(row => row.map(cell => cell))

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cell = grid[row][column]

      let nextRow = row + 1
      let prevRow = row - 1
      let nextColumn = column + 1
      let prevColumn = column - 1

      if (nextRow >= rows) {
        nextRow = 0
      }

      if (prevRow < 0) {
        prevRow = rows - 1
      }

      if (nextColumn >= columns) {
        nextColumn = 0
      }

      if (prevColumn < 0) {
        prevColumn = columns - 1
      }

      const neighborsArray = [
        grid[prevRow][prevColumn],
        grid[prevRow][column],
        grid[prevRow][nextColumn],
        grid[row][prevColumn],
        grid[row][nextColumn],
        grid[nextRow][prevColumn],
        grid[nextRow][column],
        grid[nextRow][nextColumn],
      ]

      const aliveNeighbours = neighborsArray.filter(({alive}) => alive).length

      if (cell.alive && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
        newGrid[row][column].alive = false
      } else if (aliveNeighbours === 3) {
        newGrid[row][column].alive = true
      }
    }
  }

  return newGrid
}

const Cell = (props = {}) => {
  const {alive} = props

  const className = cx({
    [css.cell]: true,
    [css.liveCell]: alive,
  })

  return <div className={className} />
}

Cell.propTypes = {
  alive: PropTypes.bool.isRequired,
}

export default class GameOfLife extends PureComponent {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    generationTimeout: PropTypes.number.isRequired,
  }

  static defaultProps = {
    rows: 30,
    columns: 30,
    generationTimeout: 300,
  }

  state = {grid: [[]], runnig: false}

  componentDidMount() {
    this.populateGrid(this.props)
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.rows !== this.props.rows ||
      newProps.columns !== this.props.columns
    ) {
      this.setState({runnig: false}, () => this.populateGrid(newProps))
    }
  }

  populateGrid = ({rows, columns}, callback = () => {}) => {
    this.setState({grid: newGeneration(rows, columns)}, callback)
  }

  nextGeneration = () => {
    const {rows, columns} = this.props
    const {grid} = this.state

    this.setState({grid: nextGeneration(rows, columns, grid)}, this.setNextTick)
  }

  setNextTick = () => {
    this.generationTimeout = setTimeout(
      this.nextGeneration,
      this.props.generationTimeout,
    )
  }

  run = () => {
    this.setState({runnig: true}, this.nextGeneration)
  }

  pause = () => {
    this.setState({runnig: false}, () => {
      clearTimeout(this.generationTimeout)
    })
  }

  reset = () => {
    this.setState({runnig: false}, () => {
      clearTimeout(this.generationTimeout)
      this.populateGrid(this.props)
    })
  }

  renderCell = rowIndex => (cell, cellIndex) => (
    <Cell key={`${rowIndex} ${cellIndex}`} {...cell} />
  )

  renderRow = (row, rowIndex) => (
    <div className={css.row} key={rowIndex}>
      {row.map(this.renderCell(rowIndex))}
    </div>
  )

  render() {
    const {grid, runnig} = this.state

    return (
      <div>
        <aside className={css.controls}>
          <button disabled={runnig} onClick={this.run}>
            run
          </button>
          <button disabled={!runnig} onClick={this.pause}>
            pause
          </button>
          <button onClick={this.reset}>reset</button>
        </aside>
        <div className={css.grid}>{grid.map(this.renderRow)}</div>
      </div>
    )
  }
}
