import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static targets = ['speechActive', 'speechInactive', 'form', 'boxDialogueNpc', 'boxDialoguePlayer', 'finalScore', 'startGame'];

  // ---------- Sets the dialogues depending on the status of the NPC ----------
  refreshBoxes(specialCells) {
    specialCells.forEach((specialCell) => {
      if (specialCell.cell_status === "active_quest") {
        const npcNameParagraph = this.boxDialogueNpcTarget.querySelector("p");
        npcNameParagraph.innerHTML = specialCell.name_npc.charAt(0).toUpperCase() + specialCell.name_npc.slice(1);
        this.speechActiveTarget.innerHTML = specialCell.question;
      }
    });
  }

  // ------- Sets the exclamation mark in the cell above the active NPC --------
  setExclamationMark() {
    const activeQuestCell = document.querySelector('.active_quest');
    const table = document.querySelector('table');
    const upperCell = table.rows[activeQuestCell.parentElement.rowIndex - 1].cells[activeQuestCell.cellIndex];
    const previousExclamationMark = document.querySelector('.exclamation_mark');

    if (previousExclamationMark) previousExclamationMark.classList.remove('exclamation_mark');
    if (activeQuestCell) upperCell.classList.add('exclamation_mark');
  }

  // ---------- Set position player in map ----------
  positionPlayer(positionX, positionY) {
    const row = document.getElementById(`tr-${positionX}`);
    const columnsOfRow = row.querySelectorAll('td');
    const column = columnsOfRow[positionY];

    column.className = "";
    column.classList.add('character')
  }

  // ---------- Set position npcs in map ----------
  positionNpcs(specialCells) {
    specialCells.forEach((specialCell) => {
      const row = document.getElementById(`tr-${specialCell.position_x}`);
      const columnsOfRow = row.querySelectorAll('td');
      const column = columnsOfRow[specialCell.position_y];

      column.className = "";
      column.classList.add(`npc-${specialCell.name_npc}`)
      column.classList.add(`${specialCell.cell_status}`)
      column.classList.add("blocked")

    });
  }

  // ---------- Check game ----------
  checkGame(gameOver, score) {
    //tirar a hidden e colocar a final score
    if (gameOver) {
      const scoreInput = this.finalScoreTarget.querySelector('.score-number');
      scoreInput.innerText = score;
      this.finalScoreTarget.classList.add('final-score');
      this.finalScoreTarget.classList.remove('hidden');
      this.startGameTarget.classList.add('hidden');
    }
  }

  // ---------- Hides the game over box when the button is clicked ----------
  hideFinalScore(event) {
    event.preventDefault();

    this.finalScoreTarget.classList.remove('final-score');
    this.finalScoreTarget.classList.add('hidden');
  }

  // ---------- Hides the start game box when the button is clicked ----------
  hideStartGame(event) {
    event.preventDefault();

    this.startGameTarget.classList.remove('final-score');
    this.startGameTarget.classList.add('hidden');
  }

  // ---------- Request new info's for refresh play ----------
  updateInfos() {
    fetch(`${window.location.href}/update_infos`, {
      method: 'GET',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() }
    })
    .then(response => response.json())
    .then((data) => {
      // this.positionPlayer(data.user_position_x, data.user_position_y);
      this.positionNpcs(data.special_cells);
      this.refreshBoxes(data.special_cells);
      this.checkGame(data.game_over, data.score);
      this.setExclamationMark();
    });
  }

  connect() {
    // ---------------------- Load game -----------------------
    this.updateInfos();
  }

  // -------------------------- User Input Validation --------------------------
  validateAnswer(event) {
    event.preventDefault();
    const sound_correct = document.getElementById("correct_audio");
    const sound_wrong = document.getElementById("wrong_audio");
    const startAudio = (event) => {
      sound_correct.volume = 0.2;
      sound_correct.play();
    }
    fetch(this.formTarget.action, {
      method: 'POST',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {
      this.speechActiveTarget.innerHTML = data.message
      this.formTarget.reset()
      if (data.correct) {
        this.boxDialoguePlayerTarget.classList.add("hidden");
        startAudio();
        setTimeout(() => {
          this.boxDialogueNpcTarget.classList.add("hidden");
          this.updateInfos();
        }, 3000);
      } else {
        sound_wrong.play();
      }
    });
  }
}
