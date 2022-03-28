const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌️',
    beats: 'paper'
  }
]

selectionButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const selectionName = button.dataset.selection
    const selection = SELECTIONS.find(selction => selction.name === selectionName)
    makeSelection(selection)
  })
})

/**
 * 選擇出什麼拳
 * @param {Object} selection - 玩家的選擇
 */
function makeSelection(selection) {
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  // 註: 要從後面插入，所以要將電腦的結果先渲染在畫面
  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)
}

// 獲勝得分
function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

/**
 * 添加結果到畫面上
 * @param {Object} selction - 打出的拳
 * @param {Boolean} winner - 是否獲勝
 */
function addSelectionResult(selction, winner) {
  const div = document.createElement('div')
  div.innerText = selction.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
}

// 檢查是否獲勝
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

// 電腦隨機出拳
function randomSelection() {
  const ramdomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[ramdomIndex]
}