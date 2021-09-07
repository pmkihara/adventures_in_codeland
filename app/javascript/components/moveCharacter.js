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

  // ---------------------------- Active NPC Settings ----------------------------
  const activeCell = document.querySelector('.active_quest');
  const dialogue = document.querySelector('.dialogue-player');
  const answerInput = document.getElementById('answer');
  const npcBox = document.querySelector('.dialogue-npc');

  // -------------------------- Inactive NPC settings  ---------------------------

  const selectInactiveCells = document.querySelectorAll('.inactive_quest');
  const inactiveCells = [...selectInactiveCells];
  const inactiveNpcBox = document.querySelector('.dialogue-inactive-npc');

  // -------------------------- Function: checks if the --------------------------
  // ----------------- Destination Cell is near a Special Cell  ------------------

  const isNearSpecialCell = (specialCell, destinationCell) => {
    const sameRow = specialCell.parentElement.rowIndex === destinationCell.parentElement.rowIndex;
    const adjRow = specialCell.parentElement.rowIndex === destinationCell.parentElement.rowIndex + 1 || specialCell.parentElement.rowIndex === destinationCell.parentElement.rowIndex - 1;
    const sameColumn = specialCell.cellIndex === destinationCell.cellIndex;
    const adjColumn = specialCell.cellIndex === destinationCell.cellIndex + 1 || specialCell.cellIndex === destinationCell.cellIndex - 1;

    return (sameRow && adjColumn) || (sameColumn && adjRow);
  }

  const isAnyInactiveCellNear = (destinationCell) => {
    return inactiveCells.some(function (inactiveCell) {
      return isNearSpecialCell(inactiveCell, destinationCell);
    }, [destinationCell]);
  }

  // ------------------- Function: Display the dialogue boxes --------------------
  // ------------------------ when near an Inactive Cell -------------------------

  const nearInactiveCell = (destinationCell) => {
    if (isAnyInactiveCellNear(destinationCell)) {
      inactiveNpcBox.classList.remove('hidden');
    }
    else {
      inactiveNpcBox.classList.add('hidden');
    }
  }

  // ------------------ Function: Display the dialogue boxes -------------------
  // ------------------------ when near an Active Cell -------------------------

  const nearActiveCell = (destinationCell) => {
    if (isNearSpecialCell(activeCell, destinationCell)) {
      dialogue.classList.remove('hidden');
      npcBox.classList.remove('hidden');
      answerInput.focus()
    }
    else {
      dialogue.classList.add('hidden');
      npcBox.classList.add('hidden');
    }
  }

  // ------------------- Function: Activate the dialogue boxes -------------------

  const activateBoxes = (destinationCell) => {
    if (activeCell) {
      nearActiveCell(destinationCell);
    }
    nearInactiveCell(destinationCell);
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
      activateBoxes(destinationCell)

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
