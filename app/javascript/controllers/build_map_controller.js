import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static values = {
    info: Array
  }

  connect() {
    // console.log(this.infoValue);
    this.infoValue.forEach((hashInfo) => {
      const row = document.getElementById(`tr-${hashInfo.positionX}`);
      const columnsOfRow = row.querySelectorAll('td');
      const column = columnsOfRow[hashInfo.positionY];

      column.classList.add(`npc-${hashInfo.nameNpc}`)
      column.classList.add(`${hashInfo.cellStatus}`)
      column.classList.add("blocked")
    });
  }
}
