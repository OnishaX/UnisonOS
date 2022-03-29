// function init() {
// 	$("#ScourBody").load('/users/template/Apps/Scour/mainpage.html');
// }
// init();

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function menu() {
	document.getElementById("ScourAppMenuContent").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
	if (!event.target.matches('.AppMenuButton')) {
	  var dropdowns = document.getElementsByClassName("dropdown-content");
	  var i;
	  for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
		  openDropdown.classList.remove('show');
		}
	  }
	}
  }