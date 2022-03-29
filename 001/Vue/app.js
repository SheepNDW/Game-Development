import { createApp, ref } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js'
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = createApp({
  setup() {
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

    const yourScore = ref(0)
    const computerScore = ref(0)
    const results = ref([])

    // player's choice
    const makeSelection = (selection) => {
      // #1 得到雙方出的拳資料
      const yourSelection = { ...selection }
      const computerSelection = randomSelection()

      // #2 檢查是否獲勝
      const yourWinner = isWinner(yourSelection, computerSelection)
      const computerWinner = isWinner(computerSelection, yourSelection)

      // #3 將結果推入 results
      // #3-1 將獲勝者加上 winner 屬性
      if (yourWinner) {
        yourSelection.winner = true
        yourScore.value++
      }
      if (computerWinner) {
        computerSelection.winner = true
        computerScore.value++
      }

      // #3-2 將結果掛上唯一 id
      yourSelection.id = nanoid()
      computerSelection.id = nanoid()

      // #3-3 插入到陣列
      results.value.unshift(computerSelection)
      results.value.unshift(yourSelection)
    }

    // computer's choice (random)
    const randomSelection = () => {
      const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
      return { ...SELECTIONS[randomIndex] }
    }

    // check win
    const isWinner = (selection, opponentSelection) => {
      return selection.beats === opponentSelection.name
    }


    return {
      SELECTIONS,
      yourScore,
      computerScore,
      results,
      makeSelection
    }
  }
})

app.mount('#app')