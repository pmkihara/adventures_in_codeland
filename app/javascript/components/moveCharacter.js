import { map } from "jquery";

const moveCharacter = (e) => {

  // ------------------------------ Map Settings -------------------------------
  const table = document.querySelector('.map-table');
  const mapLayer = document.querySelector('.map-layer');
  var mapTopPosition = Number.parseInt(mapLayer.style.top, 10);
  var mapLeftPosition = Number.parseInt(mapLayer.style.left, 10);

  // --------------------------- Character Settings ----------------------------
  const characterCell = document.querySelector('.character');
  const characterDiv = document.getElementById('character');
  const characterSprite = document.querySelector('.character-sprite');
  const charColumn = characterCell.cellIndex;
  const charRow = characterCell.parentElement.rowIndex;

  // -------------------------- Active NPC Settings ---------------------------
  const activeCell = document.querySelector('.active_quest');
  const dialogue = document.querySelector('.dialogue-player');
  const answerInput = document.getElementById('answer');
  const npcBox = document.querySelector('.dialogue-npc');

  // ------------------------- Inactive NPC settings  -------------------------

  const inactiveCells = document.querySelectorAll('.inactive_quest');
  const inactiveNpcBox = document.querySelector('.dialogue-inactive-npc');

  // ------------------ Function: Display the dialogue boxes -------------------
  // ------------------------ when near an Active Cell -------------------------

  const nearActiveCell = (cell) => {
    const sameRow = activeCell.parentElement.rowIndex === cell.parentElement.rowIndex;
    const adjRow = activeCell.parentElement.rowIndex === cell.parentElement.rowIndex + 1 || activeCell.parentElement.rowIndex === cell.parentElement.rowIndex - 1;
    const sameColumn = activeCell.cellIndex === cell.cellIndex;
    const adjColumn = activeCell.cellIndex === cell.cellIndex + 1 || activeCell.cellIndex === cell.cellIndex - 1;

    if ((sameRow && adjColumn) || (sameColumn && adjRow)) {
      dialogue.classList.remove('hidden');
      npcBox.classList.remove('hidden');
      answerInput.focus()
    }
    else {
      dialogue.classList.add('hidden');
      npcBox.classList.add('hidden');
    }
  }

  // ------------------ Function: Display the dialogue boxes -------------------
  // ----------------------- when near an Inactive Cell ------------------------

  const nearInactiveCell = (cell) => {
    inactiveCells.forEach((inactiveCell) => {
      const sameRow = inactiveCell.parentElement.rowIndex === cell.parentElement.rowIndex;
      const adjRow = inactiveCell.parentElement.rowIndex === cell.parentElement.rowIndex + 1 || inactiveCell.parentElement.rowIndex === cell.parentElement.rowIndex - 1;
      const sameColumn = inactiveCell.cellIndex === cell.cellIndex;
      const adjColumn = inactiveCell.cellIndex === cell.cellIndex + 1 || inactiveCell.cellIndex === cell.cellIndex - 1;

      if ((sameRow && adjColumn) || (sameColumn && adjRow)) {
        inactiveNpcBox.classList.remove('hidden');
        console.log(inactiveCell)
      }
      else {
        inactiveNpcBox.classList.add('hidden');
      }
    })

  }

  // ------------- Function: Move the map when the character moves -------------

  const moveMap = (key) => {
    if (key === 'ArrowDown') {
      mapTopPosition -= 64;
    }
    else if (key === 'ArrowUp') {
      mapTopPosition += 64;
    }
    else if (key === 'ArrowRight') {
      mapLeftPosition -= 64;
    }
    else if (key === 'ArrowLeft') {
      mapLeftPosition += 64;
    }

    mapLayer.style.top = `${mapTopPosition}px`;
    mapLayer.style.left = `${mapLeftPosition}px`;
  }

  // --------------------- Function: Moves the character  ----------------------
  const move = (destinationCell, key) => {
    if (!(destinationCell.classList.contains('blocked'))) {
      // Moves the character if it's not a collision path
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');

      // Activates the NPC dialogue if near their cell
      if (activeCell) {
        nearActiveCell(destinationCell);
      }
      nearInactiveCell(destinationCell);

      // Moves the map
      moveMap(key);
    }
  }

  // -------------------------------------- Key functions --------------------------------------

  if (e.key === "ArrowDown") {
    characterSprite.classList.remove("character-right", "character-left", "character-up");
    characterSprite.classList.add("character-down");
    const destinationCell = table.rows[charRow + 1].cells[charColumn]
    move(destinationCell, "ArrowDown");
  }
  else if (e.key === "ArrowUp") {
    characterSprite.classList.remove("character-down", "character-right", "character-left");
    characterSprite.classList.add("character-up");
    const destinationCell = table.rows[charRow - 1].cells[charColumn]
    move(destinationCell, "ArrowUp");
  }
  else if (e.key === "ArrowRight") {
    characterSprite.classList.remove("character-down", "character-left", "character-up");
    characterSprite.classList.add("character-right");
    const destinationCell = table.rows[charRow].cells[charColumn + 1]
    move(destinationCell, "ArrowRight");
  }
  else if (e.key === "ArrowLeft") {
    characterSprite.classList.remove("character-down", "character-right", "character-up");
    characterSprite.classList.add("character-left");
    const destinationCell = table.rows[charRow].cells[charColumn - 1]
    move(destinationCell, "ArrowLeft");
  }
}

export { moveCharacter }
