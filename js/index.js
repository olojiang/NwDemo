/**
 * Created by Hunter on 4/3/2015.
 */
$(function(){
    console.info("index.js");
    // Get GUI
    var gui = require('nw.gui');

    // GUI element are inherited from Node.js EventEmitter.

    // Tray API
    trayApi(gui);

    // Window API
    winApi(gui);

    // Clipboard.
    clipboardApi(gui);

    // File Dialog
    fileDialogApi();

    // Shell API
    shellApi(gui);

    // Screen API
    screenApi(gui);

    // App Api
    appApi(gui);

    // App Api -> ShortCut
    shortCutApi(gui);

    // Menu
    menuApi(gui);

    // Drag file
    addButton($('#drapFile')/*parentDom*/, ''/*spanId*/, 'Open drag file UI'/*buttonText*/, function(){
        gui.Window.open('drag.file.html');
    });

    addButton($('#cam')/*parentDom*/, ''/*spanId*/, 'Open cam UI'/*buttonText*/, function(){
        gui.Window.open('cam.html');
    });

    // HTML5 data list
    addButton($('#datalist')/*parentDom*/, ''/*spanId*/, 'data list control'/*buttonText*/, function(){
        gui.Window.open('html5.datalist.html');
    });
});

function menuApi(gui) {
    var menu = new gui.Menu();

    // Add MenuItem
    var itemA = new gui.MenuItem({label: 'can click A', icon: 'img/deer_icon.png'});
    itemA.click = function () {
        $('#menuApi').append(';A clicked');
    };
    menu.append(itemA);
    menu.append(new gui.MenuItem({label: 'click B', tooltip: 'B', enabled: false}));
    menu.append(new gui.MenuItem({type: 'separator'}));

    var itemC = new gui.MenuItem({label: 'click C', tooltip: 'C', key: 'c', modifiers: "ctrl-alt"});
    itemC.click = function () {
        $('#menuApi').append(';C clicked');
    };
    menu.append(itemC);

    var itemD = new gui.MenuItem({label: 'click D'}, 0);
    var subMenu = new gui.Menu();
    subMenu.append(new gui.MenuItem({label: 'sub 1'}));
    subMenu.append(new gui.MenuItem({label: 'sub 2', enabled: false}));
    subMenu.append(new gui.MenuItem({label: 'sub 3'}));
    itemD.submenu = subMenu;
    menu.insert(itemD);

    var itemE = new gui.MenuItem({label: 'click E', type: 'checkbox'}, 0);
    menu.append(itemE);
    var itemF = new gui.MenuItem({label: 'click F', type: 'checkbox', checked: true}, 0);
    menu.append(itemF);

    // Remove on item
    menu.removeAt(2);

    addButton($('#menuApi')/*parentDom*/, ''/*spanId*/, 'popup()'/*buttonText*/, function () {
        // Popup
        menu.popup(10, 10);
    });

    var menuBar = new gui.Menu({type: 'menubar'});
    menuBar.append(new gui.MenuItem({label: 'Menubar 1'}));
    var menuItem2 = new gui.MenuItem({label: 'Menubar 2'});
    var subMenu2 = new gui.Menu();
    subMenu2.append(new gui.MenuItem({label: 'Menubar 21'}));
    subMenu2.append(new gui.MenuItem({label: 'Menubar 22'}));
    subMenu2.append(new gui.MenuItem({label: 'Menubar 23'}));
    menuItem2.submenu = subMenu2;
    menuBar.append(menuItem2);
    menuBar.append(new gui.MenuItem({label: 'Menubar 3'}));

    // Mac is little different to assign menuBar.
    // Following is for windows and linux.
    gui.Window.get().menu = menuBar;
}

function shortCutApi(gui) {
    var options = {
        key: "Alt+F3",
        active: function(){
            console.info("global shortcut \"Alt+F3\" is active.", this.key);
            gui.Window.open('http://www.quora.com/');
        },
        failed: function(msg) {
            console.error(msg);
            alert(msg);
        }
    };

    var shortCut1 = new gui.Shortcut(options);
    gui.App.unregisterGlobalHotKey(shortCut1);
    gui.App.registerGlobalHotKey(shortCut1);

    shortCut1.on('active', function(){
        console.info("shortCut1 is active");
    });

    shortCut1.on('failed', function(evt){
        console.info("shortCut1 is failed: ", evt);
    });

    addButton($('#shortCutApi')/*parentDom*/, ''/*spanId*/, 'Unregister Shortcut Alt+F3'/*buttonText*/, function(){
        // Compute value for display
        gui.App.unregisterGlobalHotKey(shortCut1);
    });
}

function trayApi(gui) {
    // Tray API
    var win = gui.Window.get();

    win.on('minimize', function(){
        var tray = new gui.Tray({title: 'Ji Wei Test', icon: 'img/deer.png'});
        var menu = new gui.Menu();
        menu.append(new gui.MenuItem({type: 'checkbox', label: 'box1'}));
        tray.menu = menu;
        tray.tooltip = 'Demo Title';

        tray.on('click', function(){
            win.show();
            this.remove();
            tray = null;
        })
    });

    addButton($('#trayApi')/*parentDom*/, ''/*spanId*/, 'Remove tray'/*buttonText*/, function () {
        tray.remove();
        tray = null;
    });
}

function appApi(gui) {
    var $appApi = $('#appApi');
    $appApi.append(", gui.app.argv=" + gui.App.argv);
    $appApi.append(", gui.App.fullArgv=" + gui.App.fullArgv);
    $appApi.append(", gui.App.manifest.name=" + process.argv);
    $appApi.append(", gui.App.dataPath=" + gui.App.dataPath);

    // Following event only valid for packaged nw program.
    gui.App.on('open', function (cmdLine) {
        $('#appApi').append(", cmdline: " + cmdLine);
    });

    addButton($appApi/*parentDom*/, 'clearCacheSpan'/*spanId*/, 'clearCache() HTTP Cache'/*buttonText*/, function(){
        gui.App.clearCache();

        // Display
        $('#clearCacheSpan').text("Cleared");
    });

    addButton($appApi/*parentDom*/, 'baiduProxySpan'/*spanId*/, 'getProxyForUrl("baidu.com")'/*buttonText*/, function(){
        // Display
        $('#baiduProxySpan').text(gui.App.getProxyForUrl("www.baidu.com"));
    });

    addButton($appApi/*parentDom*/, 'googleProxySpan'/*spanId*/, 'getProxyForUrl("www.google.com")'/*buttonText*/, function(){
        // Display
        $('#googleProxySpan').text(gui.App.getProxyForUrl("www.google.com"));
    });

    addButton($appApi/*parentDom*/, ''/*spanId*/, 'closeAllWindows()'/*buttonText*/, function(){
        gui.App.closeAllWindows();
    });

    addButton($appApi/*parentDom*/, ''/*spanId*/, 'quit() -> no onClose event'/*buttonText*/, function(){
        gui.App.quit();
    });
}

function screenApi(gui) {
    gui.Screen.Init(); // only once;
    var screens = gui.Screen.screens;

    addButton($('#screenApi')/*parentDom*/, 'screenInfo'/*spanId*/, 'Show Screen Info'/*buttonText*/, function () {
        // Compute value for display
        var string = "";
        for (var i = 0; i < screens.length; i++) {
            string += screenToString(screens[i]);
        }

        // Display
        $('#screenInfo').append(string);
    });

    var screenCB = {
        onDisplayBoundsChanged: function (screen) {
            var out = "OnDisplayBoundsChanged " + screenToString(screen);
        },

        onDisplayAdded: function (screen) {
            var out = "OnDisplayAdded " + screenToString(screen);
        },

        onDisplayRemoved: function (screen) {
            var out = "OnDisplayRemoved " + screenToString(screen);
        }
    };

    // listen to screen events
    gui.Screen.on('displayBoundsChanged', screenCB.onDisplayBoundsChanged);
    gui.Screen.on('displayAdded', screenCB.onDisplayAdded);
    gui.Screen.on('displayRemoved', screenCB.onDisplayRemoved);
}

function screenToString(screen) {
    var string = "";
    string += "screen " + screen.id + " ";
    var rect = screen.bounds;
    string += "bound{" + rect.x + ", " + rect.y + ", " + rect.width + ", " + rect.height + "} ";
    rect = screen.work_area;
    string += "work_area{" + rect.x + ", " + rect.y + ", " + rect.width + ", " + rect.height + "} ";
    string += " scaleFactor: " + screen.scaleFactor;
    string += " isBuiltIn: " + screen.isBuiltIn;
    string += "<br>";
    return string;
}

function chooseFile(jQueryDom, onFileChange) {
    // Handle the file change event
    jQueryDom.unbind().change(onFileChange);

    // This is the key for the NW.js's file dialog.
    // Default input[type=file] doesn't allow click event.
    jQueryDom.trigger('click');
}

function fileDialogApi() {
    // File Dialog API
    var fileApiDom = $('#fileApi');
    addButton(fileApiDom/*parentDom*/, 'multipleFilesSpan'/*spanId*/, 'Multiple Files'/*buttonText*/, function () {
        // Multiple files
        var input = $('<input type="file" multiple style="display:none;"/>').appendTo($('#fileApi'));
        chooseFile(input, function generalOnFileChange(evt) {
            var val = $(this).val();
            console.log("File chose: ", val);
            $('#multipleFilesSpan').text(val);

            // Files tag(Provided by NW.js)
            var files = $(this)[0].files;
            var file = null;
            for (var i = 0, len = files.length; i < len; i++) {
                file = files[i];
                console.info(i, "file.name:", file.name);
                console.info(i, "file.path:", file.path);
            }
        });
    });

    addButton(fileApiDom/*parentDom*/, 'fileTypeFilterSpan'/*spanId*/, 'File Type Restrict'/*buttonText*/, function () {
        // Restrict the accept file types
        var input = $('<input type="file" accept=".jpg,.jpeg,.png" style="display:none;"/>').appendTo($('#fileApi'));
        chooseFile(input, function generalOnFileChange(evt) {
            var val = $(this).val();
            console.log("File chose: ", val);
            $('#fileTypeFilterSpan').text(val);
        });
    });

    addButton(fileApiDom/*parentDom*/, 'selectDirectorySpan'/*spanId*/, 'Select Directory'/*buttonText*/, function () {
        // Choose directory
        var input = $('<input type="file" nwdirectory style="display:none;"/>').appendTo($('#fileApi'));
        chooseFile(input, function generalOnFileChange(evt) {
            var val = $(this).val();
            console.log("File chose: ", val);
            $('#selectDirectorySpan').text(val);
        });
    });

    addButton(fileApiDom/*parentDom*/, 'saveAsFileSpan1'/*spanId*/, 'Save As'/*buttonText*/, function () {
        // Select new file name, not exist
        var input = $('<input type="file" nwsaveas style="display:none;"/>').appendTo($('#fileApi'));
        chooseFile(input, function generalOnFileChange(evt) {
            var val = $(this).val();
            console.log("File chose: ", val);
            $('#saveAsFileSpan1').text(val);
        });
    });

    addButton(fileApiDom/*parentDom*/, 'saveAsFileSpan2'/*spanId*/, 'Save As(DefaultName)'/*buttonText*/, function () {
        // Select new file name, not exist, (Default Name)
        var input = $('<input type="file" nwsaveas="jiwei.png" style="display:none;"/>').appendTo($('#fileApi'));
        chooseFile(input, function generalOnFileChange(evt) {
            var val = $(this).val();
            console.log("File chose: ", val);
            $('#saveAsFileSpan2').text(val);
        });
    });

    addButton(fileApiDom/*parentDom*/, 'workingDirectorySpan'/*spanId*/, 'Set WorkingDir'/*buttonText*/, function () {
        // Startup working dir
        var input = $('<input type="file" nwworkingdir="f:\\ToDel" style="display:none;"/>').appendTo($('#fileApi'));
        chooseFile(input, function generalOnFileChange(evt) {
            var val = $(this).val();
            console.log("File chose: ", val);
            $('#workingDirectorySpan').text(val);
        });
    });

    addButton(fileApiDom/*parentDom*/, 'reuseInputSpan'/*spanId*/, 'Reuse input'/*buttonText*/, function () {
        // Startup working dir, (Default Dir)
        var input = $('<input type="file" nwworkingdir="f:\\ToDel" style="display:none;"/>').appendTo($('#fileApi'));
        chooseFile(input, function generalOnFileChange(evt) {
            var val = $(this).val();
            console.log("File chose: ", val);
            $('#reuseInputSpan').text(val);

            // To use, must set the file value to blank, otherwise onchange will not trigger again.
            $(this).val('');
        });
    });
}

/**
 * Shell API
 * @param gui
 */
function shellApi(gui) {
    var shellApiDom = $('#shellApi');
    addButton(shellApiDom/*parentDom*/, ''/*spanId*/, 'openExternal()'/*buttonText*/, function () {
        gui.Shell.openExternal('http://olojiang.com');
    });
    addButton(shellApiDom/*parentDom*/, ''/*spanId*/, 'openItem()'/*buttonText*/, function () {
        gui.Shell.openItem('d:\\eclipse\\workspace\\NwDemo\\package.json');
    });
    addButton(shellApiDom/*parentDom*/, ''/*spanId*/, 'showItemInFolder()'/*buttonText*/, function () {
        gui.Shell.showItemInFolder('d:\\eclipse\\workspace\\NwDemo\\package.json');
    });
}

/**
 * Clipboard support
 * @param gui
 */
function clipboardApi(gui) {
    // Get handler
    var clipboard = gui.Clipboard.get();

    addButton($('#clipboardApi')/*parentDom*/, null/*spanId*/, 'Set ClipBoard'/*buttonText*/, function () {
        // Compute value for display
        clipboard.set(('NW.js clipboard function is for the text only: ' + Math.random())/*text*/, 'text'/*type*/);
    });

    addButton($('#clipboardApi')/*parentDom*/, 'spanFromClipBoard'/*spanId*/, 'Get ClipBoard'/*type*/, function () {
        // Compute value for display

        // Display
        $('#spanFromClipBoard').text(clipboard.get('text'));
    });

    addButton($('#clipboardApi')/*parentDom*/, null/*spanId*/, 'Clear ClipBoard'/*buttonText*/, function () {
        // Compute value for display
        clipboard.clear();
    });
}

function winApi(gui) {
// Get current window
    var win = gui.Window.get();

    // Get Window for DOM
    console.info('window:', win.window);

    win.on('minimize', function () {
        console.info('minimized.');
    });

    win.on('maximize', function () {
        console.info('maximize');
    });

    /*
     * Get Info
     */
    addButton($('#winGet')/*parentDom*/, 'span12'/*spanId*/, 'Get window info'/*buttonId*/, function () {
        win.title = 'JW NW.js Demo';
        $('#span12').text("Win.x=" + win.x + ", Win.y=" + win.y + ", Win.width=" + win.width + ", Win.height=" + win.height + ", Win.title=" + win.title);
    });

    /**
     * Open URL
     */
    addButton($('#winOpenUrl')/*parentDom*/, 'span5'/*spanId*/, 'Open  URL'/*buttonId*/, function () {
        var new_win = gui.Window.open('http://www.codeceo.com');

        new_win.on('focus', function () {
            $('span5').text('new windows has focus.');
        })
    });

    addButton($('#winOpenUrl')/*parentDom*/, 'span18'/*spanId*/, 'Open  URL, olojiang.com'/*buttonId*/, function () {
        var new_win = gui.Window.open('http://olojiang.com', {
            position: 'center',
            width: 1024,
            height: 768,
            toolbar: false,
            frame: false
        });

        new_win.on('focus', function () {
            $('span18').text('new windows has focus.');
        })
    });

    addButton($('#winOpenUrl')/*parentDom*/, 'span28'/*spanId*/, 'Take snapshot and show it'/*buttonId*/, function () {
        win.capturePage(function (img) {
            var popupWin = gui.Window.open('popup.html', {
                width: 800,
                height: 600
            });

            popupWin.on('loaded', function () {
                popupWin.window.$('#image').attr('src', img);
            });
        });
    });

    addButton($('#winOpenUrl')/*parentDom*/, 'span29'/*spanId*/, 'Take snapshot and save as file'/*buttonId*/, function () {
        win.capturePage(function (img) {
            var base64Data = img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

            require('fs').writeFile('d:/out.png', base64Data, 'base64', function (err) {
                if (err) {
                    console.error("Save PNG error: ", err);
                }
            }, 'png');
        });
    });

    /*
     * Progress
     */
    addButton($('#winProgress')/*parentDom*/, 'span30'/*spanId*/, 'setProgressBar(0.3)'/*buttonId*/, function () {
        win.setProgressBar(0.3);
    });


    /*
     * Show, hide
     */
    addButton($('#winShowHide')/*parentDom*/, 'span4'/*spanId*/, 'enterFullscreen'/*buttonId*/, function () {
        win.enterFullscreen();
    });
    addButton($('#winShowHide')/*parentDom*/, 'span6'/*spanId*/, 'leaveFullscreen'/*buttonId*/, function () {
        win.leaveFullscreen();
    });

    addButton($('#winShowHide')/*parentDom*/, 'span6'/*spanId*/, 'enterKioskMode'/*buttonId*/, function () {
        win.enterKioskMode();
    });
    addButton($('#winShowHide')/*parentDom*/, 'span7'/*spanId*/, 'leaveKioskMode'/*buttonId*/, function () {
        win.leaverKioskMode();
    });

    addButton($('#winShowHide')/*parentDom*/, 'span13'/*spanId*/, 'show()/hide()'/*buttonId*/, function () {
        win.hide();

        setTimeout(function () {
            win.show();
        }, 3000);
    });

    addButton($('#winShowHide')/*parentDom*/, 'span25'/*spanId*/, 'setShowInTaskBar(true)'/*buttonId*/, function () {
        win.setShowInTaskbar(true);
    });

    addButton($('#winShowHide')/*parentDom*/, 'span26'/*spanId*/, 'setShowInTaskBar(false)'/*buttonId*/, function () {
        win.setShowInTaskbar(false);
    });

    addButton($('#winShowHide')/*parentDom*/, 'span27'/*spanId*/, 'requestAttention(3)'/*buttonId*/, function () {
        win.requestAttention(3);
    });

    /**
     * Always on top
     */
    addButton($('#winOnTop')/*parentDom*/, 'span-18'/*spanId*/, 'setAlwaysOnTop(true)'/*buttonId*/, function () {
        win.setAlwaysOnTop(true);
    });

    addButton($('#winOnTop')/*parentDom*/, 'span18'/*spanId*/, 'setAlwaysOnTop(false)'/*buttonId*/, function () {
        win.setAlwaysOnTop(false);
    });

    /**
     * Close
     */
    win.on('close', function () {
        this.hide();
        console.info("We are closing");

        setTimeout(function () {
            win.close(true);
        }, 3000);
    });

    addButton($('#winClose')/*parentDom*/, 'span14'/*spanId*/, 'Close And clean'/*buttonId*/, function () {
        win.close();
    });

    /*
     * Position
     */
    addButton($('#winPosition')/*parentDom*/, 'span8'/*spanId*/, 'moveTo(0, 0)'/*buttonId*/, function () {
        win.moveTo(0, 0);
    });

    addButton($('#winPosition')/*parentDom*/, 'span9'/*spanId*/, 'moveBy(50, 50)'/*buttonId*/, function () {
        win.moveBy(50, 50);
    });

    addButton($('#winPosition')/*parentDom*/, 'span16'/*spanId*/, 'setPosition("center")'/*buttonId*/, function () {
        win.setPosition('center');
    });

    /*
     * Size
     */
    addButton($('#winSize'), 'span1', 'minimize', function () {
        win.minimize();
    });

    addButton($('#winSize')/*parentDom*/, 'span2'/*spanId*/, 'maximize'/*buttonId*/, function () {
        win.maximize();

        // Unlisten minimize event
        win.removeAllListeners('minimize');
    });

    addButton($('#winSize')/*parentDom*/, 'span3'/*spanId*/, 'unmaximize'/*buttonId*/, function () {
        win.unmaximize();
    });
    addButton($('#winSize')/*parentDom*/, 'span10'/*spanId*/, 'moveBy(800, 600)'/*buttonId*/, function () {
        win.resizeTo(800, 600);
    });

    addButton($('#winSize')/*parentDom*/, 'span11'/*spanId*/, 'moveBy(80, 60)'/*buttonId*/, function () {
        win.resizeBy(80, 60);
    });

    addButton($('#winSize')/*parentDom*/, 'span21'/*spanId*/, 'setResizable(true)'/*buttonId*/, function () {
        win.setResizable(true);
    });

    addButton($('#winSize')/*parentDom*/, 'span22'/*spanId*/, 'setResizable(false)'/*buttonId*/, function () {
        win.setResizable(false);
    });

    addButton($('#winSize')/*parentDom*/, 'span23'/*spanId*/, 'setMaximumSize(1366, 768)'/*buttonId*/, function () {
        win.setMaximumSize(1366, 768);
    });

    addButton($('#winSize')/*parentDom*/, 'span24'/*spanId*/, 'setMinimumSize(800, 600)'/*buttonId*/, function () {
        win.setMinimumSize(800, 600);
    });

    /**
     * Transparent
     * body {
        background-color: rgba(255, 255, 255, 0.5);
       }
     */
    addButton($('#winTransparent')/*parentDom*/, 'span15'/*spanId*/, 'Transparent'/*buttonId*/, function () {
        win.setTransparent(!win.isTransparent);
    });

    /**
     * Devtool
     */
    addButton($('#winDevtool')/*parentDom*/, 'span16'/*spanId*/, 'Devtool - Show'/*buttonId*/, function () {
        win.showDevTools();
    });
    addButton($('#winDevtool')/*parentDom*/, 'span17'/*spanId*/, 'Devtool - Close'/*buttonId*/, function () {
        win.closeDevTools();
    });

    /*
     * Reload Window
     */
    addButton($('#winReload')/*parentDom*/, 'span19'/*spanId*/, 'reloadDev()'/*buttonId*/, function () {
        win.reloadDev();
    });

    addButton($('#winReload')/*parentDom*/, 'span20'/*spanId*/, 'reloadIgnoringCache()'/*buttonId*/, function () {
        win.reloadIgnoringCache();
    });
}


