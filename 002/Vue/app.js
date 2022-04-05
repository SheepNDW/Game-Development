import { createApp, ref, getCurrentInstance } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js'

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const app = createApp({
  setup() {
    const isXTurn = ref(true)
    const isShowRestart = ref(false)
    const winningMessageText = ref('')

    const handleClick = (e) => {
      const cell = e.target
      const currentClass = isXTurn.value ? X_CLASS : CIRCLE_CLASS
      placeMark(cell, currentClass)
      if (checkWin(currentClass)) {
        endGame(false)
      } else if (isDraw()) {
        endGame(true)
      } else {
        swapTurns()
      }
    }

    const placeMark = (cell, currentClass) => {
      cell.classList.add(currentClass)
    }
    const swapTurns = () => {
      isXTurn.value = !isXTurn.value
    }

    // 檢查是否勝利
    // const cellRefs = ref([])
    const { ctx } = getCurrentInstance()
    const checkWin = (currentClass) => {
      return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return ctx.$refs.cellRefs[index].classList.contains(currentClass)
        })
      })
    }
    const isDraw = () => {
      return ctx.$refs.cellRefs.every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
      })
    }

    // 結束遊戲
    const endGame = (draw) => {
      if (draw) {
        winningMessageText.value = '和局!'
      } else {
        winningMessageText.value = `${isXTurn.value ? 'X ' : 'O '}贏了!`
      }
      isShowRestart.value = true
    }

    const { cells, reRenderCells } = initGame()
    const startGame = () => {
      reRenderCells()
      isShowRestart.value = false
      isXTurn.value = true
    }

    return {
      isXTurn,
      isShowRestart,
      winningMessageText,
      // cellRefs,
      cells,
      handleClick,
      startGame
    }
  }
})

const initGame = () => {
  const cells = ref([
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
    { key: '5' },
    { key: '6' },
    { key: '7' },
    { key: '8' },
    { key: '9' }
  ])
  const reRenderCells = () => {
    cells.value.forEach((cell, i) => {
      cells.value[i].key = cells.value[i].key + '1'
    })
  }

  return {
    cells,
    reRenderCells
  }
}

app.mount('#app')