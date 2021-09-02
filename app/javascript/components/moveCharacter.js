const moveCharacter = (e) => {
  // -------------------------------------- Character position  --------------------------------------
  const characterCell = document.querySelector('.character');
  const characterDiv = document.getElementById('character');
  const characterSprite = document.querySelector('.character-sprite');
  const charColumn = characterCell.cellIndex;
  const charRow = characterCell.parentElement.rowIndex;

  // -------------------------------------- Active cell position  --------------------------------------

  const activeCell = document.querySelector('.active');
  const table = document.querySelector('.map-table');
  const dialogue = document.querySelector('.dialogue-player');

  // -------------------------------------- Active cell functions --------------------------------------

  const nearActiveCell = (cell) => {
    const sameRow = activeCell.parentElement.rowIndex === cell.parentElement.rowIndex;
    const adjRow = activeCell.parentElement.rowIndex === cell.parentElement.rowIndex + 1 || activeCell.parentElement.rowIndex === cell.parentElement.rowIndex - 1;
    const sameColumn = activeCell.cellIndex === cell.cellIndex;
    const adjColumn = activeCell.cellIndex === cell.cellIndex + 1 || activeCell.cellIndex === cell.cellIndex - 1;

    if ((sameRow && adjColumn) || (sameColumn && adjRow)) {
      dialogue.classList.remove('hidden');
    }
    else {
      dialogue.classList.add('hidden');
    }
  }

  // -------------------------------------- Movement functions -----------------------------------------

  const moveDown = (column, row) => {
    const destinationCell = table.rows[row + 1].cells[column]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
      nearActiveCell(destinationCell);
    }
  }
  const moveUp = (column, row) => {
    const destinationCell = table.rows[row - 1].cells[column]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
      nearActiveCell(destinationCell);
    }
  }
  const moveRight = (column, row) => {
    const destinationCell = table.rows[row].cells[column + 1]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
      nearActiveCell(destinationCell);
    }
  }
  const moveLeft = (column, row) => {
    const destinationCell = table.rows[row].cells[column - 1]
    if (!(destinationCell.classList.contains('blocked'))) {
      destinationCell.appendChild(characterDiv);
      destinationCell.classList.add('character');
      characterCell.classList.remove('character');
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
