import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static targets = ['speechActive', 'speechInactive', 'form', 'boxDialogueNpc', 'boxDialoguePlayer'];
  static values = {
    info: Array
  }

  refreshBoxes() {
    this.infoValue.forEach((hashInfo) => {
      if (hashInfo.cellStatus === "active_quest") {
        this.speechActiveTarget.innerText = hashInfo.question;
      } else {
        this.speechInactiveTarget.innerText = hashInfo.randomSpeech;
      }
    });
  }

  updateInfos() {
    const enumInfos = this.infoValue.values();
    const newArrayInfos = [];
    const currentElement = enumInfos.next().value;
    const nextElement = enumInfos.next().value;
    if (currentElement.cellStatus === "active_quest") {
      currentElement.cellStatus = "inactive_quest";
      newArrayInfos.push(currentElement);

      if (nextElement) {
        nextElement.cellStatus = "active_quest";
        newArrayInfos.push(nextElement);
      }
    }

    this.infoValue = newArrayInfos;
  }

  connect() {
    // Construção do mapa
    this.infoValue.forEach((hashInfo) => {
      const row = document.getElementById(`tr-${hashInfo.positionX}`);
      const columnsOfRow = row.querySelectorAll('td');
      const column = columnsOfRow[hashInfo.positionY];

      column.className = "";
      column.classList.add(`npc-${hashInfo.nameNpc}`)
      column.classList.add(`${hashInfo.cellStatus}`)
      column.classList.add("blocked")
    });
    this.refreshBoxes();
  }

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
}
