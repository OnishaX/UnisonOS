let temp
let RunningApps = []
let History = []
let UserSettings = []
let CurrentUserName = "template"
let Active = "Desktop"

function init() {
  console.log("Init Triggered");
  console.log("Loading " + CurrentUserName + " User Data");
  var PathToSettings = "/users/" + CurrentUserName + "/data/User.json";
  var jsonFile = new XMLHttpRequest();
  jsonFile.open("GET", PathToSettings, true);
  jsonFile.send();

  jsonFile.onreadystatechange = function () {
    if (jsonFile.readyState == 4 && jsonFile.status == 200) {
      UserSettings = JSON.parse(jsonFile.responseText)
    }
  }

  console.log("User Data:");
  console.log(UserSettings)

  SetWallpaper(UserSettings.Wallpaper.Wallpaper, UserSettings.Wallpaper.Variant, UserSettings.Wallpaper.Ext)
  displayPinnedList();
  displaySystem();

  if (UserSettings.Sounds.Login == true) {
    var audio = new Audio('/system/sounds/Login.mp3');
    audio.play();
  }
  console.log("Init Complete");
}

// function LoadUserData() {

// }
function SetWallpaper(selection, variant, ext) {
  if (selection != null) {
    UserSettings.Wallpaper.Wallpaper = selection
  }
  if (variant != null) {
    UserSettings.Wallpaper.Variant = variant
  }
  if (ext != null) {
    UserSettings.Wallpaper.Ext = ext
  }
  temp = document.getElementById("Display");
  temp.style.backgroundImage = String("url(/users/" + UserSettings.Username + "/Backgrounds/" + UserSettings.Wallpaper.Wallpaper + "/" + UserSettings.Wallpaper.Variant + "." + UserSettings.Wallpaper.Ext);
  console.log(String("url(/users/" + UserSettings.Username + "/Backgrounds/" + UserSettings.Wallpaper.Wallpaper + "/" + UserSettings.Wallpaper.Variant + "." + UserSettings.Wallpaper.Ext))
}

function AdjustWindowTiling() {
  // if (RunningApps.length == 1) {
  //   $("#Desktop").css("grid-template-columns", "100%")
  //   AppMode = "Full"
  // }
  // if (RunningApps.length == 2) {
  //   $("#Desktop").css("grid-template-columns", "50%")
  //   AppMode = "Medium"
  // }
  // if (RunningApps.length == 3) {
  //   $("#Desktop").css("grid-template-columns", "30%")
  //   AppMode = "Small"
  // }
}


function FillWindow(temp) {
  if (document.getElementById(temp + "WindowDecoration").style.display != "none") {
    document.getElementById("TitleAndMenu").innerHTML = document.getElementById(temp + "WindowDecoration").innerHTML;
    document.getElementById(temp + "WindowDecoration").style.display = "none";
    document.getElementById(temp + "App").classList.add("AppFullScreen")

  }
  else {
    document.getElementById(temp + "WindowDecoration").style.display = "flex";
    document.getElementById("TitleAndMenu").innerHTML = ''
    document.getElementById(temp + "App").classList.remove("AppFullScreen")
  }

}


interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move(event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    allowFrom: '.WindowDecoration',
    inertia: true,
  })

function MinimiseWindow(minimisingApp) {
  minimisingApp.String
  document.getElementById("TitleAndMenu").innerHTML = ''
  temp = String("#" + minimisingApp)
  AdjustWindowTiling()
  $(temp + "App").addClass('miniApp')
  sleep(500).then(() => {
    $(temp + "App").css({ "display": "none" })
    document.getElementById("Dock").className = "";
    document.getElementById("Desktop").className = "";
    document.getElementById("Display").className = "DisplayNormal";
    $(temp + "App").removeClass('miniApp')

  })
}
function ToggleSearch(searchApp) {
  temp = String("#" + searchApp + "Search")
  console.log(temp)

  if (document.getElementById(searchApp + "Search").className == "search") {
    $(temp).replaceWith(`'<button id="` + searchApp + 'Search"  type="button" class="searchOpen"><i onclick="ToggleSearch(' + '`' + searchApp + '`' + ')" class="ri-close-circle-line"></i><input autofocus="autofocus"type="text"</button>')
  } else {
    $(temp).replaceWith(`'<button id="` + searchApp + 'Search" onclick="ToggleSearch(' + '`' + searchApp + '`' + ')" type="button" class="search"><i class="ri-search-line"></i>Search</button>')
  }

}

function LaunchSystem(systemApp) {
  console.log(temp)
}
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function DeepLaunch(mainapp, jumppage) {
  LaunchWindow(mainapp)
  sleep(500).then(() => {
    LoadPage(mainapp, jumppage)
  })
  UpdateAppRunningIndicator(mainapp)
}

function CloseWindow(closingApp) {
  closingApp.String
  document.getElementById("TitleAndMenu").innerHTML = ''
  temp = String("#" + closingApp);
  $(temp + "App").addClass('closeApp')
  sleep(500).then(() => {
    $(temp + "App").remove();
    $(temp + "RunningAppIcon").remove();
    RunningApps.splice(RunningApps.indexOf(closingApp, 0), 1)
    document.getElementById("Display").className = "DisplayNormal";
    UpdateAppRunningIndicator(closingApp)
  })

}
function LoadPage(targetapp, newpage) {
  var TargetApp = String(targetapp);
  var NewPage = String(newpage);
  console.log("Loading Page")
  $('#' + TargetApp + "ScreenContainer").empty();
  $('#' + TargetApp + "ScreenContainer").append('<embed name="' + TargetApp + 'Screen" rel="preload" style="width: 100%; height: 100%; overflow:scroll; border-radius: 0.5em; border: none;" class="Body" id="' + TargetApp + 'Screen" src="/Apps/' + TargetApp + '/Screens/' + NewPage + '.html"></embed>');
  // temp = History.indexOf(TargetApp)
  // History[temp].push(NewPage)
  // console.log(History);
}

function UpdateAppRunningIndicator(app) {
  if (RunningApps.includes(app, 0) == true) {
    if (UserSettings.PinnedApps.includes(app, 0) == false) {
      $('#' + app + 'RunningAppIcon').addClass("AppRunning")
    }
    if (UserSettings.PinnedApps.includes(app, 0) == true) {
      $('#' + app + 'PinnedAppIcon').addClass("AppRunning")
    }
  }
  if (RunningApps.includes(app, 0) == false) {
    if (UserSettings.PinnedApps.includes(app, 0) == false) {
      $('#' + app + 'RunningAppIcon').removeClass("AppRunning")
    }
    if (UserSettings.PinnedApps.includes(app, 0) == true) {
      $('#' + app + 'PinnedAppIcon').removeClass("AppRunning")
    }
  }
}

function LaunchWindow(launchingApp) {
  temp = String(launchingApp)
  if (temp != "Dash") {
    if (UserSettings.PinnedApps.includes(temp, 0) == false) {
      $("#AppList").append('<div class="DockAppIcon" id="' + launchingApp + 'RunningAppIcon"></div>');
      $('#' + String(launchingApp + 'RunningAppIcon')).load('/Apps/' + launchingApp + '/AppIcon.html');
    }
    if (RunningApps.includes(temp, 0) == false) {
      // AdjustWindowTiling()
      RunningApps.push(launchingApp)
      temp = RunningApps[RunningApps.length - 1]
      $("#Desktop").append('<div class="AppContainer resize-drag openApp" id="' + launchingApp + 'App"></div>');
      $('#' + String(temp + 'App')).load('/Apps/' + temp + '/App.html');
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
    $(String(temp + 'App')).removeClass('openApp');
    UpdateAppRunningIndicator(launchingApp)
  }

  else {
    Dash("Toggle")
  }

}

function Dash(dashmod) {
  if (dashmod == "Open") {
    document.getElementById("Dash").style.display = "block"
  }
  else if (dashmod == "Close") {
    document.getElementById("Dash").style.display = "none"
  }
  else if (dashmod == "Toggle") {
    if (document.getElementById("Dash").style.display == "none") {
      document.getElementById("Dash").style.display = "block"
    }
    else {
      document.getElementById("Dash").style.display = "none"
    }
  }
}

function displayPinnedList() {
  console.log("displayAppList Triggered")
  $("#AppList").html('')
  for (let app of UserSettings.PinnedApps) {
    $("#AppList").append('<button class="DockAppIcon" onClick="LaunchWindow(`' + app + '`)" style="display: flex; align-items: middle; padding-top: 0px !importantpadding-bottom: 0px !important;background-size: cover; background-image: url(/Apps/' + app + '/AppIcon.svg)" id="' + app + 'PinnedAppIcon"></button>');
  }
  console.log("dock appended")
  for (let app of RunningApps) {
    $("#AppList").append('<button class="RunningAppIcon" onClick="LaunchWindow(`' + app + '`)" style="display: flex; align-items: middle; padding-top: 0px !importantpadding-bottom: 0px !important;background-size: cover; background-image: url(/Apps/' + app + '/AppIcon.svg)" id="' + app + 'PinnedAppIcon"></button>');
  }
  console.log("runningapp appended")
}
function displayAppList(location) {
  console.log("displayAppList Triggered")
  if (location == "AllApps") {
    for (let app of UserSettings.InstalledApps) {
      $("#" + location).append('<div class="HListItem"><div class="DockAppIcon" id="' + app + 'AllAppIcon"></div><div class="ListItemLabel">' + app + '</div></div>');
      temp = document.getElementById(String(app + 'AllAppIcon'));
      temp.style.backgroundImage = String('/Apps/' + app + '/AppIcon.svg');
      // History.push(app)
    }
  }
}
function SettingsAppList() {
  console.log("list apps in settings")
  for (let app of UserSettings.InstalledApps) {
    console.log(app)
    $("#SettingsHAppList:SettingsScreen").append('<button class="HListItem" onclick="parent.LoadPage(`Settings`,`Apps / `' + app + '` / Index`)"><div class="DockAppIcon" id="' + app + 'AllAppIcon"></div><div class="ListItemLabel">' + app + '</div></button>');
    $('#' + String(app + 'AllAppIcon')).load('/Apps/' + app + '/AppIcon.html');
  }
}
function displaySystem() {
  console.log("displaySystemList Triggered")
  for (let app of UserSettings.SystemApps) {
    $("#System").append('<div class="SystemIndicator" id="' + app + 'SystemIndicator"></div>');
    $('#' + String(app + 'SystemIndicator')).load('/users/' + UserSettings.Username + '/System/' + app + '/SystemIndicator.html');
  }
  console.log("dock appended")
}
onload(init());