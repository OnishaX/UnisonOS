let temp
let RunningApps = []
let History = []
let UserSettings = []
let AppCatelogue = []
let CurrentUserName = "template"
let Active = "Desktop"
let CurrentWorkspace = 1

function init() {
  // const request = new Request('/users/template/data/User.json');
  // const response = await fetch(request);
  // const userDataText = await response.text();
  // UserSettings = JSON.parse(userDataText);


  $('#BootStatus').text("Getting Ready");
  ;
  console.log("Init Triggered");

  $('#BootStatus').text("Loading Account Data");
  ;
  console.log("Loading Account");

  var jsonFile = new XMLHttpRequest();
  jsonFile.open("GET", "/users/" + CurrentUserName + "/data/User.json", true);
  jsonFile.send();
  jsonFile.onreadystatechange = function () {
    if (jsonFile.readyState == 4 && jsonFile.status == 200) {
      UserSettings = JSON.parse(jsonFile.responseText)
      console.log("User Data:");
      console.log(UserSettings)

      console.log("Applying " + UserSettings.Firstname + "'s Settings")

      $('#BootStatus').text("Applying " + UserSettings.Firstname + "'s Settings");
      SetWallpaper(UserSettings.Wallpaper.Wallpaper, UserSettings.Wallpaper.Variant, UserSettings.Wallpaper.Ext)
      displayPinnedList();
      displaySystem();
      document.getElementById("WorkspaceSwitcherIcon").style.backgroundImage = String("url(/system/Icons/WorkspaceSwitcher/" + CurrentWorkspace + ".svg)");
      console.log("Init Complete");
      $('#BootStatus').text("Ready!");

      $('#BootScreen').remove();
      if (UserSettings.Sounds.Login == true) {
        var audio = new Audio('/system/sounds/Login.mp3');
        audio.play();
      }
    }
  }

}

function SetActive(temp, appID) {
  console.log("Temp is " + temp)
  console.log("Active is " + Active)
  $('#TopBarMenu').empty();
  $('#TopBarControls').empty();

  if (Active == "Desktop") {
  }
  Active = String(temp)
  $(temp + "WindowDecoration:last-child").appendTo( "#TopBarMenu")
  
  if (document.getElementById(temp + "WindowDecoration").classList.contains('AppFullScreen')) {
    $(temp + "WindowDecoration:first-child" ).appendTo( "#TopBarControls")
  }
  
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
  temp = document.getElementById("Desktop1");
  temp.style.backgroundImage = String("url(/users/" + UserSettings.Username + "/Backgrounds/" + UserSettings.Wallpaper.Wallpaper + "/" + UserSettings.Wallpaper.Variant + "." + UserSettings.Wallpaper.Ext);
  temp = document.getElementById("Desktop2");
  temp.style.backgroundImage = String("url(/users/" + UserSettings.Username + "/Backgrounds/" + UserSettings.Wallpaper.Wallpaper + "/" + UserSettings.Wallpaper.Variant + "." + UserSettings.Wallpaper.Ext);
  temp = document.getElementById("Desktop3");
  temp.style.backgroundImage = String("url(/users/" + UserSettings.Username + "/Backgrounds/" + UserSettings.Wallpaper.Wallpaper + "/" + UserSettings.Wallpaper.Variant + "." + UserSettings.Wallpaper.Ext);
  temp = document.getElementById("Desktop4");
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
const position = { x: 0, y: 0 }

function FillWindow(temp) {
  if (document.getElementById(temp + "WindowDecoration").style.display != "none") {
    document.getElementById(temp + "WindowDecoration").style.display = "none";
    document.getElementById(temp + "App").classList.add("AppFullScreen")

  }
  else {
    document.getElementById(temp + "WindowDecoration").style.display = "flex";
    document.getElementById(temp + "App").classList.remove("AppFullScreen")
  }
  SetActive(temp, String(temp + 'App'))
}

function BringToFront(temp) {
  document.getElementById(temp + "App").style.zIndex = +1
  SetActive(temp, (temp + "App"))
}

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.marginLeft = target.style.marginLeft = x + 'px'
  target.style.marginTop = target.style.marginTop = y + 'px'

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

interact('.resize-drag')
  .draggable({
    onmove: window.dragMoveListener,
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      }),
      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 300, height: 200 }
      })
    ],
  })
  .on('resizemove', function (event) {
    var target = event.target;
    x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.marginLeft = target.style.marginLeft = x + 'px'
    target.style.marginTop = target.style.marginTop = y + 'px'

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });


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
    $(temp).replaceWith(`<button id="` + searchApp + 'Search" type="button" class="searchOpen"><img onclick="ToggleSearch(' + '`' + searchApp + '`' + ')" src="/system/icons/Actions/Clear.svg"><input autofocus="autofocus"type="text"</button>')
  } else {
    $(temp).replaceWith(`<button id="` + searchApp + 'Search" onclick="ToggleSearch(' + '`' + searchApp + '`' + ')" type="button" class="search"><img src="/system/icons/Actions/Search.svg">Search</button>')
  }

}

function LaunchSystem(systemApp) {
  console.log(systemApp)
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

}
function LoadPage(targetapp, newpage) {
  var TargetApp = String(targetapp);
  var NewPage = String(newpage);
  console.log("Loading Page")
  $('#' + TargetApp + "ScreenContainer").empty();
  $('#' + TargetApp + "ScreenContainer").append('<embed name="' + TargetApp + 'Screen" rel="preload" style="width: 100%; height: 100%; overflow:scroll; border-radius: 0.5em; border: none;" class="Body" id="' + TargetApp + 'Screen" src="/Apps/' + TargetApp + '/Screens/' + NewPage + '.html"></embed>');

  $(TargetApp + 'Screen').ready(function () {
    SetActive(TargetApp, TargetApp + 'App')
  });
  if (NewPage != History[History.length - 1]) {
    History.push(NewPage)
  }
  console.log(History)
}

function HistoryBack(targetapp) {
  if (History.length > 1) {
    temp = History[History.length - 2]
    var TargetApp = String(targetapp);
    var NewPage = String(temp);
    History.pop(0)
    console.log("Loading Page")
    $('#' + TargetApp + "ScreenContainer").empty();
    $('#' + TargetApp + "ScreenContainer").append('<embed name="' + TargetApp + 'Screen" rel="preload" style="width: 100%; height: 100%; overflow:scroll; border-radius: 0.5em; border: none;" class="Body" id="' + TargetApp + 'Screen" src="/Apps/' + TargetApp + '/Screens/' + NewPage + '.html"></embed>');

    console.log(History)
  }
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
      LoadPage(launchingApp, "index")
      $('#' + String('Desktop' + CurrentWorkspace)).append('<div class="AppContainer resize-drag openApp" id="' + launchingApp + 'App"></div>')
      $('#' + String(temp + 'App')).load('/Apps/' + temp + '/App.html')
      $('#' + String(temp + 'App')).attr("onclick", String('BringToFront("' + launchingApp + '")'))
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
  console.log("displayPinnedAPpList Triggered")
  $("#AppList").html('')
  for (let app of UserSettings.PinnedApps) {
    $("#AppList").append('<button class="DockAppIcon" onClick="LaunchWindow(`' + app + '`)" style="display: flex; align-items: middle; padding-top: 0px !importantpadding-bottom: 0px !important;background-size: cover; background-image: url(/Apps/' + app + '/AppIcon.svg)" id="' + app + 'PinnedAppIcon"></button>');
  }
  console.log("dock appended")
  // for (let app of RunningApps) {
  //   $("#AppList").append('<button class="RunningAppIcon" onClick="LaunchWindow(`' + app + '`)" style="display: flex; align-items: middle; padding-top: 0px !importantpadding-bottom: 0px !important;background-size: cover; background-image: url(/Apps/' + app + '/AppIcon.svg)" id="' + app + 'PinnedAppIcon"></button>');
  // }
  // console.log("runningapp appended")
}
function displayAppList(location) {
  console.log("displayAppList Triggered")
  if (location == "AllApps") {
    for (let app of UserSettings.InstalledApps) {
      $("#" + location).append('<div class="HListItem"><div class="DockAppIcon" id="' + app + 'AllAppIcon"></div><div class="ListItemLabel">' + app + '</div></div>');
      temp = document.getElementById(String(app + 'AllAppIcon'));
      temp.style.backgroundImage = String('/Apps/' + app + '/AppIcon.svg');
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
    $('#' + String(app + 'SystemIndicator')).load('/Plugins/' + app + '/SystemIndicator.html');
  }
  console.log("dock appended")
}

function pause(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
function WorkspaceSwitcher() {
  $("#Desktop").addClass("DesktopOverview")
  $("#Desktop").removeClass("Desktop1")
  $("#Desktop").removeClass("Desktop2")
  $("#Desktop").removeClass("Desktop3")
  $("#Desktop").removeClass("Desktop4")
  document.getElementById("DesktopSelector1").style.display = "block"
  document.getElementById("DesktopSelector2").style.display = "block"
  document.getElementById("DesktopSelector3").style.display = "block"
  document.getElementById("DesktopSelector4").style.display = "block"
}
function WorkspaceSwitcherSelect(Workspace) {
  $("#Desktop").removeClass("DesktopOverview")
  document.getElementById("DesktopSelector1").style.display = "none"
  document.getElementById("DesktopSelector2").style.display = "none"
  document.getElementById("DesktopSelector3").style.display = "none"
  document.getElementById("DesktopSelector4").style.display = "none"
  $("#Desktop").addClass(Workspace)
  if (Workspace == "Desktop1") {
    CurrentWorkspace = 1
  }
  if (Workspace == "Desktop2") {
    CurrentWorkspace = 2
  }
  if (Workspace == "Desktop3") {
    CurrentWorkspace = 3
  }
  if (Workspace == "Desktop4") {
    CurrentWorkspace = 4
  }
  document.getElementById("WorkspaceSwitcherIcon").style.backgroundImage = String("url(/system/Icons/WorkspaceSwitcher/" + CurrentWorkspace + ".svg)");
}
function InstallApp(AppToInstall) {
  UserSettings.InstalledApps.push(String(AppToInstall));
  UserSettings.PinnedApps.push(String(AppToInstall));
  refreshAppList("AppList")
}
function refreshAppList(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  displayPinnedList()
}

