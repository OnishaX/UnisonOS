let temp
let RunningApps = []
let History = []
let UserSettings =[]
let CurrentUserName = "template"

function init() {
  console.log("Init Triggered");
  console.log("Loading " + CurrentUserName + " User Data");
  LoadUserData()

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


  SetWallpaper(UserSettings.Wallpaper.Wallpaper, UserSettings.Wallpaper.Variant, UserSettings.Wallpaper.Ext)
  displayPinnedList();
  displayAppList("AllApps");
  displaySystem();

  if (UserSettings.Sounds.Login == true) {
    var audio = new Audio('/system/sounds/Login.mp3');
    audio.play();
  }

  console.log("Init Complete");
}
function LoadUserData() {
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
}
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
  //   $("#Windows").css("grid-template-columns", "100%")
  //   AppMode = "Full"
  // }
  // if (RunningApps.length == 2) {
  //   $("#Windows").css("grid-template-columns", "50%")
  //   AppMode = "Medium"
  // }
  // if (RunningApps.length == 3) {
  //   $("#Windows").css("grid-template-columns", "30%")
  //   AppMode = "Small"
  // }
}


function FillWindow() {
  if (temp = (document.getElementById("Display").className) == "DisplayNormal") {
    document.getElementById("Display").className = "DisplayFullscreen";
  } else {
    document.getElementById("Drawer").className = "DrawerClosed";
    document.getElementById("Display").className = "DisplayNormal";
  }
  AdjustWindowTiling()
}

function MinimiseWindow(minimisingApp) {
  minimisingApp.String
  temp = String("#" + minimisingApp)
  AdjustWindowTiling()
  $(temp + "App").addClass('miniApp')
  sleep(500).then(() => {
    $(temp + "App").css({ "display": "none" })
    document.getElementById("Drawer").className = "DrawerClosed";
    document.getElementById("Dock").className = "";
    document.getElementById("Windows").className = "";
    document.getElementById("AllApps").className = "";
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
  if (systemApp === "AppDrawer") {
    if (temp = (document.getElementById("Drawer").className) == "DrawerClosed") {
      document.getElementById("Drawer").className = "DrawerDrawerOpen";
      document.getElementById("Dock").className = "DockDrawerOpen";
      document.getElementById("Windows").className = "WindowsDrawerOpen";
      document.getElementById("AllApps").className = "AllAppsDrawerOpen";

      console.log(temp)
    } else {
      document.getElementById("Drawer").className = "DrawerClosed";
      document.getElementById("Dock").className = "";
      document.getElementById("Windows").className = "";
      document.getElementById("AllApps").className = "";
      console.log(temp)
    }

  }
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
  temp = String("#" + closingApp);
  $(temp + "App").addClass('closeApp')
  sleep(500).then(() => {
    $(temp + "App").remove();
    $(temp + "RunningAppIcon").remove();
    RunningApps.splice(RunningApps.indexOf(closingApp, 0), 1)
    document.getElementById("Display").className = "DisplayNormal";
    UpdateAppRunningIndicator(closingApp)
  })
  AdjustWindowTiling()

}
function LoadPage(targetapp, newpage) {
  var TargetApp = String(targetapp);
  var NewPage = String(newpage);
  console.log("Loading Page")
  $('#' + TargetApp + "ScreenContainer").empty();
  $('#' + TargetApp + "ScreenContainer").append('<embed name="' + TargetApp + 'Screen" rel="preload" style="width: 100%; height: 100%; overflow:scroll; border-radius: 0.5em; border: none;" class="Body" id="' + TargetApp + 'Screen" src="/users/' + UserSettings.Username + '/Apps/' + TargetApp + '/Screens/' + NewPage + '.html"></embed>');
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
  // $('#' + String(temp + 'AppIcon')).addClass('bounce-top');
  // AdjustWindowTiling()

  if (UserSettings.PinnedApps.includes(temp, 0) == false) {
    $("#AppList").append('<div class="DockAppIcon" id="' + launchingApp + 'RunningAppIcon"></div>');
    $('#' + String(launchingApp + 'RunningAppIcon')).load('/users/' + UserSettings.Username + '/Apps/' + launchingApp + '/AppIcon.html');
  }

  if (RunningApps.includes(temp, 0) == false) {
    // AdjustWindowTiling()
    RunningApps.push(launchingApp)
    temp = RunningApps[RunningApps.length - 1]
    $("#Windows").append('<div class="AppContainer openApp" id="' + launchingApp + 'App"></div>');
    $('#' + String(temp + 'App')).load('/users/' + UserSettings.Username + '/Apps/' + temp + '/App.html');
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
  document.getElementById("Dock").className = "";
  document.getElementById("Windows").className = "";
  document.getElementById("AllApps").className = "";
  document.getElementById("Display").className = "DisplayNormal";
  sleep(500).then(() => {
    $(String(temp + 'App')).removeClass('openApp');
  })
  UpdateAppRunningIndicator(launchingApp)
}

function displayPinnedList() {
  console.log("displayAppList Triggered")
  $("#AppList").html('')
  for (let app of UserSettings.PinnedApps) {
    $("#AppList").append('<div class="DockAppIcon" id="' + app + 'PinnedAppIcon"></div>');
    $('#' + String(app + 'PinnedAppIcon')).load('/users/' + UserSettings.Username + '/Apps/' + app + '/AppIcon.html');
  }
  console.log("dock appended")
  for (let app of RunningApps) {
    $("#AppList").append('<div class="DockAppIcon" id="' + app + 'RunningAppIcon"></div>');
    $('#' + String(app + 'RunningAppIcon')).load('/users/' + UserSettings.Username + '/Apps/' + app + '/AppIcon.html');
  }
  console.log("runningapp appended")
}
function displayAppList(location) {
  console.log("displayAppList Triggered")
  if (location == "AllApps") {
    for (let app of UserSettings.InstalledApps) {
      $("#" + location).append('<button class="HListItem"><div class="DockAppIcon" id="' + app + 'AllAppIcon"></div><div class="ListItemLabel">' + app + '</div></button>');
      $('#' + String(app + 'AllAppIcon')).load('/users/' + UserSettings.Username + '/Apps/' + app + '/AppIcon.html');
      // History.push(app)
    }
  }
}
function SettingsAppList() {
  console.log("list apps in settings")
  for (let app of UserSettings.InstalledApps) {
    console.log(app)
    $("#SettingsHAppList:SettingsScreen").append('<button class="HListItem" onclick="parent.LoadPage(`Settings`,`Apps/`' + app + '`/Index`)"><div class="DockAppIcon" id="' + app + 'AllAppIcon"></div><div class="ListItemLabel">' + app + '</div></button>');
    $('#' + String(app + 'AllAppIcon')).load('/users/' + UserSettings.Username + '/Apps/' + app + '/AppIcon.html');
  }
}
function displaySystem() {
  console.log("displaySystemList Triggered")
  for (let app of UserSettings.SystemApps) {
    $("#System").append('<div class="DockAppIcon" id="' + app + 'PinnedAppIcon"></div>');
    $('#' + String(app + 'PinnedAppIcon')).load('/users/' + UserSettings.Username + '/System/' + app + '/AppIcon.html');
  }
  console.log("dock appended")
}
onload(init());