import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static targets = ['speechActive', 'speechInactive', 'form'];
  static values = {
    info: Array
  }

  // ---------- Sets the dialogues depending on the status of the NPC ----------
  refreshBoxes() {
    this.infoValue.forEach((hashInfo) => {
      if (hashInfo.cellStatus == "active_quest") {
        this.speechActiveTarget.innerText = hashInfo.question;
      } else {
        this.speechInactiveTarget.innerText = hashInfo.randomSpeech;
      }
    });
  }

  // ---------------------- Places the NPCs when loading -----------------------
  connect() {
    this.infoValue.forEach((hashInfo) => {
      const row = document.getElementById(`tr-${hashInfo.positionX}`);
      const columnsOfRow = row.querySelectorAll('td');
      const column = columnsOfRow[hashInfo.positionY];

      column.classList.add(`npc-${hashInfo.nameNpc}`)
      column.classList.add(`${hashInfo.cellStatus}`)
      column.classList.add("blocked")
    });
    this.refreshBoxes();
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
    });
    this.refreshBoxes();
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
