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

  if (document.querySelector(".dialogue-form")) {
    document.querySelector(".dialogue-form").addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("form submitted");
    });
  }
}

export { enter }
