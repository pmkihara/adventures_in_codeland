import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static targets = ['speechActive', 'speechInactive', 'form', 'boxDialogueNpc', 'boxDialoguePlayer'];
  static values = {
    info: Object
  }

  // ---------- Sets the dialogues depending on the status of the NPC ----------
  refreshBoxes(specialCells) {
    specialCells.forEach((specialCell) => {
      if (specialCell.cell_status === "active_quest") {
        this.speechActiveTarget.innerText = specialCell.question;
      } else {
        this.speechInactiveTarget.innerText = specialCell.random_speech;
      }
    });
  }

  updateInfos() {
    const enumInfos = this.infoValue.special_cells.values();
    const newArrayInfos = [];
    const currentElement = enumInfos.next().value;
    const nextElement = enumInfos.next().value;
    if (currentElement.cell_status === "active_quest") {
      currentElement.cell_status = "inactive_quest";
      newArrayInfos.push(currentElement);

      if (nextElement) {
        nextElement.cell_status = "active_quest";
        newArrayInfos.push(nextElement);
      }
    }

    this.infoValue.special_cells = newArrayInfos;
  }

  positionPlayer(positionX, positionY) {
    const row = document.getElementById(`tr-${positionX}`);
    const columnsOfRow = row.querySelectorAll('td');
    const column = columnsOfRow[positionY];

    column.className = "";
    column.classList.add('character')
  }

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

  connect() {
    // ---------------------- Place the Player when loading -----------------------
    // this.positionPlayer(this.infoValue.user_position_x, this.infoValue.user_position_y);
    this.positionNpcs(this.infoValue.special_cells);
    this.refreshBoxes(this.infoValue.special_cells);
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
          this.connect();
        }, 2000);
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
