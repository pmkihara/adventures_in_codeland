const moveCharacter = (e) => {
  // -------------------------------------- Character settings  --------------------------------------
  const characterCell = document.querySelector('.character');
  const characterDiv = document.getElementById('character');
  const characterSprite = document.querySelector('.character-sprite');
  const charColumn = characterCell.cellIndex;
  const charRow = characterCell.parentElement.rowIndex;

  // -------------------------------------- Active cell settings  --------------------------------------

  const activeCell = document.querySelector('.active_quest');
  const table = document.querySelector('.map-table');
  const dialogue = document.querySelector('.dialogue-player');
  const npcBox = document.querySelector('.dialogue-npc');

  // -------------------------------------- Active cell functions --------------------------------------

  const nearActiveCell = (cell) => {
    const sameRow = activeCell.parentElement.rowIndex === cell.parentElement.rowIndex;
    const adjRow = activeCell.parentElement.rowIndex === cell.parentElement.rowIndex + 1 || activeCell.parentElement.rowIndex === cell.parentElement.rowIndex - 1;
    const sameColumn = activeCell.cellIndex === cell.cellIndex;
    const adjColumn = activeCell.cellIndex === cell.cellIndex + 1 || activeCell.cellIndex === cell.cellIndex - 1;

    if ((sameRow && adjColumn) || (sameColumn && adjRow)) {
      dialogue.classList.remove('hidden');
      npcBox.classList.remove('hidden');
    }
    else {
      dialogue.classList.add('hidden');
      npcBox.classList.add('hidden');
    }
  }

  // -------------------------------------- Inactive cell settings  --------------------------------------

  const inactiveCell = document.querySelector('.inactive_quest');

  // -------------------------------------- Inactive cell functions --------------------------------------

  const nearInactiveCell = (cell) => {
    const sameRow = inactiveCell.parentElement.rowIndex === cell.parentElement.rowIndex;
    const adjRow = inactiveCell.parentElement.rowIndex === cell.parentElement.rowIndex + 1 || inactiveCell.parentElement.rowIndex === cell.parentElement.rowIndex - 1;
    const sameColumn = inactiveCell.cellIndex === cell.cellIndex;
    const adjColumn = inactiveCell.cellIndex === cell.cellIndex + 1 || inactiveCell.cellIndex === cell.cellIndex - 1;

    if ((sameRow && adjColumn) || (sameColumn && adjRow)) {
      console.log("entrou?");
      npcBox.classList.remove('hidden');
    }
    else {
      npcBox.classList.add('hidden');
    }
  }

  // -------------------------------------- Movement functions -----------------------------------------

  const moveDown = (column, row) => {
    const destinationCell = table.rows[row + 1].cells[column]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
      nearInactiveCell(destinationCell);
      nearActiveCell(destinationCell);
    }
  }
  const moveUp = (column, row) => {
    const destinationCell = table.rows[row - 1].cells[column]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
      nearInactiveCell(destinationCell);
      nearActiveCell(destinationCell);
    }
  }
  const moveRight = (column, row) => {
    const destinationCell = table.rows[row].cells[column + 1]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
      nearInactiveCell(destinationCell);
      nearActiveCell(destinationCell);
    }
  }
  const moveLeft = (column, row) => {
    const destinationCell = table.rows[row].cells[column - 1]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
      nearInactiveCell(destinationCell);
      nearActiveCell(destinationCell);
    }
  }

  // -------------------------------------- Key functions --------------------------------------

  if (e.key === "ArrowDown") {
    characterSprite.classList.remove("character-down", "character-right", "character-left", "character-up");
    characterSprite.classList.add("character-down");
    moveDown(charColumn, charRow);
  }
  else if (e.key === "ArrowUp") {
    characterSprite.classList.remove("character-down", "character-right", "character-left", "character-up");
    characterSprite.classList.add("character-up");
    moveUp(charColumn, charRow);
  }
  else if (e.key === "ArrowRight") {
    characterSprite.classList.remove("character-down", "character-right", "character-left", "character-up");
    characterSprite.classList.add("character-right");
    moveRight(charColumn, charRow);
  }
  else if (e.key === "ArrowLeft") {
    characterSprite.classList.remove("character-down", "character-right", "character-left", "character-up");
    characterSprite.classList.add("character-left");
    moveLeft(charColumn, charRow);
  }
}

export { moveCharacter }
