const handleSubmit = (event) => {
  event.preventDefault();
  const questAnswer = document.getElementById('quest-answer').value;

  if (questAnswer === '4') {
    console.log('correct!')
  }
  else {
    console.log('incorrect!')
  }
  document.querySelector('textarea').reset();
}

export { handleSubmit }
