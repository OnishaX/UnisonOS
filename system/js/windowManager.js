let Applist = ["Scour", "Music", "Mailbox", "Settings"]
let InstalledApps = ["Music", "Error", "Files", "Mailbox", "Cells", "Write", "Pitch", "Settings"]
let Systemlist = ["Clock", "AppDrawer"]
let wallpaper = "1.jpg"
let RunningApps = []
let temp
let user = "template"



function FillWindow() {
  if (temp = (document.getElementById("Display").className) == "DisplayNormal") {
    document.getElementById("Display").className = "DisplayFullscreen";
  } else {
    document.getElementById("Drawer").className = "DrawerClosed";
    document.getElementById("Display").className = "DisplayNormal";
  }

}

function MinimiseWindow(minimisingApp) {
  minimisingApp.String
  temp = String("#" + minimisingApp)
  $(temp + "App").addClass('miniApp')
  sleep(500).then(() => {
    $(temp + "App").css({ "display": "none" })
    document.getElementById("Drawer").className = "DrawerClosed";
    document.getElementById("Display").className = "DisplayNormal";
    $(temp + "App").removeClass('miniApp')
  })
}

function LaunchSystem(systemApp) {
  console.log(temp)
  if (systemApp === "AppDrawer") {
    if (temp = (document.getElementById("Drawer").className) == "DrawerClosed") {
      document.getElementById("Drawer").className = "DrawerOpen";
      console.log(temp)
    } else {
      document.getElementById("Drawer").className = "DrawerClosed";
      document.getElementById("Display").className = "DisplayNormal";
      console.log(temp)
    }

  }
}
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function CloseWindow(closingApp) {
  closingApp.String
  temp = String("#" + closingApp);
  $(temp + "App").addClass('closeApp')
  sleep(500).then(() => {
    $(temp + "App").remove();
    RunningApps.splice(RunningApps.indexOf(closingApp, 0), 1)
    document.getElementById("Display").className = "DisplayNormal";
  })

}

function LaunchWindow(launchingApp) {
  temp = String(launchingApp)
  // $('#' + String(temp + 'AppIcon')).addClass('bounce-top');

  if (RunningApps.includes(temp, 0) == false) {
    RunningApps.push(launchingApp)
    temp = RunningApps[RunningApps.length - 1]
    $("#Windows").append('<div class="AppContainer openApp" id="' + temp + 'App"></div>');
    $('#' + String(temp + 'App')).load('/users/' + user + '/Apps/' + temp + '/App.html');
    $(temp + "App").removeClass("openApp");
  }
  else {
    temp = String("#" + launchingApp);
    $(temp + "App").addClass('unMiniApp');
    $(temp + "App").css({ "display": "grid" })
    
    sleep(500).then(() => {
      $(temp + "App").removeClass("unMiniApp");
      console.log(temp + " is already running");
    })
  }
  // $('#' + String(temp + 'AppIcon')).removeClass('bounce-top');

  document.getElementById("Drawer").className = "DrawerClosed";
  document.getElementById("Display").className = "DisplayNormal";
  sleep(500).then(() => {
  $('#' + String(temp + 'App')).removeClass('openApp');
  })
}

function init() {

  console.log(RunningApps)
  document.getElementById("Display").style.backgroundImage = String("url(/users/" + user + "/Backgrounds/1.jpg)");

  displayPinnedList(Applist);
  displayAppList(InstalledApps);
  displaySystem(Systemlist);
  console.log("Init Triggered");

  new Sortable(AppList, {
    animation: 300,
    direction: 'horizontal',
    ghostClass: "DockAppIconGhost"
  });

  new Sortable(Windows, {
    animation: 300,
    direction: 'horizontal',
    ghostClass: 'ghost'
  });
  new Sortable(System, {
    animation: 300,
    direction: 'horizontal',
    ghostClass: "DockAppIconGhost"
  });
  var audio = new Audio('/system/sounds/Login.mp3');
  // audio.play();
}

function displayPinnedList(Applist) {
  console.log("displayAppList Triggered")
  let html = "";
  for (let app of Applist) {
    html += `
				<button type="button" class="DockAppIcon" id="${app}AppIcon" onClick='LaunchWindow(` + `"` + `${app}` + `"` + `)' style="background-image: url(/users/` + user + `/Apps/${app}/AppIcon.svg)"></button>`;
  }
  console.log("dock appended")
  $("#AppList").html(html)
}
function displayAppList(InstalledApps) {
  console.log("displayAppList Triggered")
  let html = "";
  for (let app of InstalledApps) {
    html += `
				<button type="button" class="DockAppIcon" id="${app}AppIcon" onClick='LaunchWindow(` + `"` + `${app}` + `"` + `)' style="background-image: url(/users/` + user + `/Apps/${app}/AppIcon.svg)"></button>`;
  }
  console.log("dock appended")
  $("#AllApps").html(html)
}

function displaySystem(Systemlist) {
  console.log("displaySystemList Triggered")
  let html = "";
  for (let app of Systemlist) {
    html += `
				<button type="button" class="DockAppIcon" id="${app}" onClick='LaunchSystem(` + `"` + `${app}` + `"` + `)' style="background-image: url(/users/` + user + `/System/${app}/AppIcon.svg)"></button>`;
  }
  console.log("dock appended")
  $("#System").html(html)
}

init();
console.log("Init Trigger")