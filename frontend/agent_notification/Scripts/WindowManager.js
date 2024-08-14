const { app, BrowserWindow, screen, Tray, nativeImage, Menu, ipcMain, dialog } = require('electron');
const helper = require('./HelperFunctions.js');
const path = require('path');
let imgPath;
const AppNameVersion = app.getName() + " " + app.getVersion();
const win_width = 290;
const win_height = 190;

class WindowManager {
    constructor() {
        //super(props)
        this.state = { isReady: false }

        //Iconpaht different in Build
        //imgPath = helper.isDev() ? './assets/Icon.png' : path.join(process.resourcesPath, '../assets/Icon.png');
        imgPath = helper.isDev() ? './assets/rabbit_logo.png' : path.join(__dirname, '../assets/rabbit_logo.png');
        this.icon = nativeImage.createFromPath(imgPath);

    }

    createIPC() {
        ipcMain.on('close-me', (evt, arg) => {
            app.quit()
        })

        ipcMain.on('hide-me', (evt, arg) => {
            this.hideWindow()
        })

        ipcMain.on('show-me', (evt, arg) => {
            this.showWindow()
        })

        ipcMain.on('callonescreen', (event, arg) => {

            //const webContents = this.webContents

            let child = require('child_process').execFile;

            let executablePathx64 = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

            let executablePathx86 = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

            //--POC Server------------------------------
            //let chromeString = 'https://www.dev2solution.com/onescreen/outbound/';

            //--Public PRODUCTION Server------[Ver.x.x.0]----------
            let chromeString = 'http://rbl-ccobcus/onescreen/outbound/campaign/';

            console.log('--- Call operation parameters ---',);
            console.log("operationType: " + arg.operationType);
            console.log("callParameter: " + arg.callParameter);
            console.log("phoneNumber: " + arg.phoneNumber);
            console.log("AgentCode: " + arg.AgentCode);
            console.log("x64Chrome: " + arg.x64Chrome);
            console.log("callId: " + String(arg.callId));

            let parameters = [];
            let returnString = "";
            let executablePath = "";

            if (arg.operationType == 1) { //Call Out
                // parameters = ["--call=" + arg.phoneNumber];
                parameters = [chromeString + arg.AgentCode];

                if (arg.x64Chrome) executablePath = executablePathx64
                else executablePath = executablePathx86

                console.log("parameters: " + parameters);
                console.log("executablePath: " + executablePath);

                child(executablePath, parameters, function (err, data) {
                    //child(executablePathx86, parameters, function (err, data) {
                    console.log("err: " + err)

                    returnString = data.toString();
                    console.log("data.toString(): " + data.toString());

                    console.log("Call operationType: [" + arg.operationType + "] completed.");

                    if (returnString == "") {
                        console.log("Call has been Ended"); // true
                        //this.win.webContents.send('endcall', arg.phoneNumber)

                    } else {
                        console.log("returnString: " + returnString);
                        event.sender.send('getcallid', returnString);

                    }

                });

            }

        })


        ipcMain.on('calloperation', (event, arg) => {
            console.log("-----------------calloperation-------------------");

            //const webContents = this.webContents

            let child = require('child_process').execFile;
            //let executablePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
            //let executablePath = "/Applications/3CXPhone.app";
            let executablePath = "C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\CallTriggerCmd.exe";

            console.log('--- [ipcMain] Call operation parameters ---',);
            console.log("operationType: " + arg.operationType);
            console.log("callParameter: " + arg.callParameter);
            console.log("phoneNumber: " + arg.phoneNumber);
            console.log("callId: " + String(arg.callId));

            let parameters = [];
            let returnString = "";



                    
            //console.log("xxxxxxreturnString: " + returnString);
            //event.sender.send('getcallid', returnString);


            if (arg.operationType == 1) { //Call Out
                parameters = ["--call=" + arg.phoneNumber];

                console.log("parameters: " + parameters);

                child(executablePath, parameters, function (err, data) {
                    console.log("err: " + err)

                    returnString = data.toString();
                    console.log("data.toString(): " + data.toString());

                    console.log("Call operationType: [" + arg.operationType + "] completed.");

                    if (returnString == "") {
                        console.log("Call has been Ended"); // true
                        //this.win.webContents.send('endcall', arg.phoneNumber)

                    } else {
                        console.log("returnString: " + returnString);
                        event.sender.send('getcallid', returnString);

                    }

                });

            } else
                if (arg.operationType == 2) { //Drop Call

                    console.log("Call operationType: [" + arg.operationType + "] started.");



                    //-----------------------------------------------------
                    console.log("Getting call list..");

                    parameters = ["--list"];

                    console.log("call list parameters: " + parameters);

                    child(executablePath, parameters, function (err, data) {
                        //console.log("err: " + err)

                        returnString = data.toString();
                        console.log("data.toString(): " + data.toString());

                        console.log("Call operationType: [--list] completed.");

                        if (returnString == "") {
                            console.log("returnString was nothing"); // true
                            //this.win.webContents.send('endcall', arg.phoneNumber)

                        } else {

                            let callStatus ='';

                            console.log("Do [getcallid] returnString: " + returnString);

                            //console.log(`Call Status:\n${data}`);
                            console.log(`-------------------`);
                            let splitArray = returnString.split('\n'); // This will become an array now
                            console.log("splitArray.length: " + splitArray.length);
                            for (let i = 0; i < splitArray.length; i++) {
            
                                // console.log("splitArray[i].indexOf(arg.callParameter): "+splitArray[i].indexOf(arg.callParameter));
                                console.log(`<------------------->`);
            
                                if (splitArray[i].length != 0) {
            
            
                                    //  if (splitArray[i].indexOf(arg.callParameter) != -1) {
                                    // console.log(`Line: ${splitArray[i]}`);
                                    console.log(`Output: ${splitArray[i].substring(0, splitArray[i].indexOf(' '))}`);
            
                                    let s = splitArray[i].split(/(?<=^\S+)\s/)
                                    callStatus = s[0];
                                // console.log("callStatus1: " + callStatus);
                                }
            
                                //  }
                            }

                            console.log("callStatus: " + callStatus);
                            //event.sender.send('getcallid', callStatus);
                            console.log("Getting call list completed");

                            //console.log("Call operationType: [" + arg.operationType + "] completed.");
                            console.log("drop call parameters: " + parameters+' '+callStatus);

                            const { exec } = require('child_process');

                        // exec('"C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\CallTriggerCmd.exe" --drop=' + String(arg.callId));

                            exec('"C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\CallTriggerCmd.exe" --drop=' + callStatus);

                            console.log("Call operationType: [" + arg.operationType + "] completed.");

                        }

                    });

                    //-----------------------------------------------------








                } else
                    if (arg.operationType == 3) { //Hold Call
                        console.log("Call operationType: [" + arg.operationType + "] completed.");
                        parameters = ["--hold=" + String(arg.callId)];

                        console.log("parameters: " + parameters);
                        const { exec } = require('child_process');
                        exec('"C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\CallTriggerCmd.exe" --hold=' + String(arg.callId));

                    } else
                        if (arg.operationType == 4) { // Resume Call
                            console.log("Call operationType: [" + arg.operationType + "] completed.");
                            parameters = ["--resume=" + String(arg.callId)];

                            console.log("parameters: " + parameters);
                            const { exec } = require('child_process');
                            exec('"C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\CallTriggerCmd.exe" --resume=' + String(arg.callId));

                        }
                        console.log("-----------------End of calloperation ----------------");
        })


        ipcMain.on('dropcall', (event, arg) => {

            let child2 = require('child_process').execFile;

            let executablePath = "C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\CallTriggerCmd.exe"; //CallTriggerCmd.exe -c=90988289519


            console.log('--- Drop call operation ---',)
            console.log("callParameter: " + arg.callParameter);
            console.log("callId: " + String(arg.callId));
            //let parameters = ["--call=90992818989"];
            //let parameters = ["-c=90988289519"];
            let parameters = ["--" + arg.callParameter + "=" + String(arg.callId)];
            let returnString = "";

            //parameters = "";
            console.log("parameters: " + parameters);


            const { exec } = require('child_process');

            exec('"C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\CallTriggerCmd.exe" --drop=' + String(arg.callId));

        })

    }

    //Creates a Tray and a Windows
    createUI() {
        if (process.platform == "darwin")
            app.dock.hide();
        this.createTray();
        this.createMainWindow();
        this.createIPC();
    }

    closeApp() {
        if (app.showExitPrompt) {
            e.preventDefault() // Prevents the window from closing 
            dialog.showMessageBox({
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: 'Unsaved data will be lost. Are you sure you want to quit?'
            }, function (response) {
                if (response === 0) { // Runs the following if 'Yes' is clicked
                    app.showExitPrompt = false
                    mainWindow.close()
                }
            })
        }
    }

    createTray() {
        this.tray = new Tray(this.icon);
        this.tray.getTitle('Rabbit Life')

        this.tray.on('double-click', this.toggleWindowMain.bind(this));

        const contextMenu = Menu.buildFromTemplate([
            { label: AppNameVersion, enabled: false },
            { type: 'separator' },
            { label: 'Configuration', click: () => { this.showWindow() } },
            // { label: 'Agent Code', click: () => { this.showWindow() } },
            //{ label: 'close', click: () => { this.hideWindow() }},
            { type: 'separator' },
            // { label: 'x86 Chrome', type: 'radio' },
            { label: 'Exit', click: () => { this.exitWindow() } }
        ])

        this.tray.setToolTip(AppNameVersion);
        this.tray.setContextMenu(contextMenu)

        if (process.platform == "darwin")
            this.tray.setIgnoreDoubleClickEvents(true); //Better UX on MacOS
    }

    createMainWindow() {
        this.win = new BrowserWindow({
            icon: 'assets/rabbit_logo.png',
            width: win_width,
            height: win_height,
            // backgroundColor: '#E5E8E8', // background color
            title: AppNameVersion,
            frame: true,
            show: true,
            fullscreenable: false,
            movable: true,
            resizable: false,
            transparent: false,
            // maximazable: false,
            menu: false,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                plugins: true,
                devTools: false,
                contextIsolation: false
            },
            skipTaskbar: false
        })

        this.win.webContents.openDevTools()

        this.win.loadFile('index.html');
        this.win.setVisibleOnAllWorkspaces(true);
        this.win.setAlwaysOnTop(true, 'screen');
        this.win.setMenu(null);
        this.showMainWindow();

        this.win.setFullScreenable(false);
        this.win.setMaximizable(false);
        this.win.isResizable(false);

        this.win.on('close', function (e) {
            const choice = require('electron').dialog.showMessageBoxSync(this.win,
                {
                    type: 'question',
                    buttons: ['Yes', 'No'],
                    title: 'Confirm',
                    message: 'Are you sure you want to quit ?'
                });
            if (choice === 1) {
                e.preventDefault();
            }
        });

    }

    hideWindow() {
        this.win.hide()
    }

    exitWindow() {
        this.win.close()
        app.exit(0)
    }

    showWindow() {
        this.win.show()
    }

    getWindowPosition() {
        const windowBounds = this.win.getBounds()
        const trayBounds = this.tray.getBounds()


        let x = 0;
        let y = 0;


        console.log("(mac) windowBounds.width=" + windowBounds.width + ", (mac) windowBounds.height=" + windowBounds.height);
        console.log("(mac) trayBounds.width=" + trayBounds.width + ", (mac) trayBounds.height=" + trayBounds.height);

        //MacOS
        if (process.platform != "win32") {
            // Center window horizontally below the tray icon
            x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
            // Position window 4 pixels vertically below the tray icon
            y = Math.round(trayBounds.y + trayBounds.height + 4)

            console.log("(mac) X=" + x + ", (mac) Y=" + y);

            return {
                x: x - 338,
                y: y
            }
        }
        //On Windows the Task bar is sadly very flexible
        else {

            let display = screen.getPrimaryDisplay();
            let width = display.bounds.width;
            let height = display.bounds.height;
            //console.log("(win) X="+width - 231 + ", (win) Y=" + 1);
            console.log("(win) X=" + width + ", (win) Y=" + height);

            return {
                x: width - win_width,
                y: height - (win_height + 40),
            }

        }
    }

    showMainWindow() {
        const position = this.getWindowPosition();
        //console.log("X="+position.x + ", Y=" + position.y);
        this.win.setPosition(position.x, position.y);
        this.win.show()
        this.win.focus()

        //This is necessary for the window to appear on windows
        if (process.platform == "win32") {
            this.win.moveTop();
        }
    }


    toggleWindowMain() {

        if (this.win.isVisible()) {
            this.win.hide()
        } else {
            this.showMainWindow()
        }
    }
}

module.exports = WindowManager;