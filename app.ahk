#Requires AutoHotkey v2.0 64-bit
SetWorkingDir(A_ScriptDir)
#SingleInstance force

OnExit(trueExit)

#Include webview\WebViewToo.ahk

WebViewSettings := {}
if (A_IsCompiled) {
	WebViewCtrl.CreateFileFromResource("64bit\WebView2Loader.dll", WebViewCtrl.TempDir)
    WebViewSettings := {DllPath: WebViewCtrl.TempDir "\64bit\WebView2Loader.dll"}
}

MyGui := WebViewGui("-Resize -Caption",,, WebViewSettings)
MyGui.OnEvent("Close", mygui_Close)

MyGui.AddCallbackToScript("Visit", WebviewVisit)
MyGui.AddCallbackToScript("Msg", WebviewMsg)
MyGui.AddCallbackToScript("DragStart", dragStart)

if(A_IsCompiled) {
	MyGui.Navigate("index.html")
} else {
	MyGui.Navigate("http://localhost:5173")
	MyGui.Debug()
}

testMessager() {
	static msgs := [
		"Autohotkey",
		"Vite",
		"TailwindCSS",
		"Webview"
	]
	static t := 1
	msger(*) {
		MyGui.PostWebMessageAsJson('{"type":"testMsg","content":"' msgs[t] " is awesome!!!" '"}')
		t := t >= msgs.Length ? 1 : t+1
	}
	return msger
}
ahkSendMsg2Web := testMessager()
Hotkey("~F1", ahkSendMsg2Web)
MyGui.Show("w800 h600")
return

WebviewVisit(webview, msg) {
	Run(msg)
}
WebviewMsg(webview, msg) {
	MsgBox(msg, "MSG", 0x1040)
}

OnDragWindowMouseUp() {
	MyGui.PostWebMessageAsJson('{"type":"cmd","content":"DragWindowMouseUp"}')
}

dragStart(webview, msg) {
	MyGui.DragParentWindow()
	waitForMouseup(*) {
		if(!GetKeyState("LButton", "P")) {
			SetTimer(waitForMouseup, 0)
			OnDragWindowMouseUp()
		}
	}
	SetTimer(waitForMouseup, 20)
}

mygui_Close(*) {
	trueExit(0, 0)
}
trueExit(ExitReason, ExitCode){
	ExitApp(ExitCode)
}

#Include resource.ahk

;@Ahk2Exe-IgnoreBegin
; For dev
F6::ExitApp(5173)
;@Ahk2Exe-IgnoreEnd

