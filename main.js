document.addEventListener("DOMContentLoaded", () => {
  var toggleButtons = document.getElementById("toggle-buttons-container").children;
  console.log(toggleButtons[0]);

  for (var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener('click', function () {
      console.log("test");
    });
  }
});

