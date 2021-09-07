import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static targets = ['speechActive', 'speechInactive', 'form', 'boxDialogueNpc', 'boxDialoguePlayer', 'finalScore'];

  // ---------- Sets the dialogues depending on the status of the NPC ----------
  refreshBoxes(specialCells) {
    specialCells.forEach((specialCell) => {
      if (specialCell.cell_status === "active_quest") {
        const npcNameParagraph = this.boxDialogueNpcTarget.querySelector("p");
        npcNameParagraph.innerText = specialCell.name_npc.charAt(0).toUpperCase() + specialCell.name_npc.slice(1);
        this.speechActiveTarget.innerText = specialCell.question;
      }
    });
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
    }
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
    });
  }

  connect() {
    // ---------------------- Load game -----------------------
    this.updateInfos();
  }

  // -------------------------- User Input Validation --------------------------
  validateAnswer(event) {
    event.preventDefault();

    fetch(this.formTarget.action, {
      method: 'POST',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {
      this.speechActiveTarget.innerText = data.message
      this.formTarget.reset()
      if (data.correct) {
        this.boxDialoguePlayerTarget.classList.add("hidden");
        setTimeout(() => {
          this.boxDialogueNpcTarget.classList.add("hidden");
          this.updateInfos();
        }, 3000);
      }
    });
  }

  validateName(event) {
    event.preventDefault();

    fetch(this.formTarget.action, {
      method: 'POST',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {
      this.speechActiveTarget.innerText = data.message
      this.formTarget.reset()
    });
    this.refreshBoxes();
  }

  validateAge(event) {
    event.preventDefault();

    fetch(this.formTarget.action, {
      method: 'POST',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {
      this.speechActiveTarget.innerText = data.message
      this.formTarget.reset()
    });
    this.refreshBoxes();
  }
}
