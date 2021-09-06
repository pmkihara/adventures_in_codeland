const enter = () => {
  function submitOnEnter(event){
    if(event.which === 13){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();
    }
  }

  if (document.getElementById("answer")) {
    document.getElementById("answer").addEventListener("keypress", submitOnEnter);
  }

<<<<<<< HEAD
  document.querySelector(".dialogue-form").addEventListener("submit", (event) => {
=======
  if (document.querySelector(".dialogue-form")) {
    document.querySelector(".dialogue-form").addEventListener("submit", (event) => {
>>>>>>> d317fee8d6756d460c2a8703550f2f443e91241c
      event.preventDefault();
      console.log("form submitted");
    });
  }
}

export { enter }
