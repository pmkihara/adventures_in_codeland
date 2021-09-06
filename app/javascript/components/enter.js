const enter = () => {
  function submitOnEnter(event){
    if(event.which === 13){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();
    }
  }

  document.getElementById("answer").addEventListener("keypress", submitOnEnter);

  document.querySelector(".dialogue-form").addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("form submitted");
  });
}

export { enter }
