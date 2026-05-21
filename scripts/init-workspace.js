import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

function rel(p) {
	return p.replace(root, "").replace(/^[/\\]+/, "")
}

console.log("\n=== AHK WebView Template: Init Workspace ===\n")

// Step A: Replace index.html with index2.html
const index2Path = join(root, "frontend", "index2.html")
const indexPath = join(root, "frontend", "index.html")

if (!existsSync(index2Path)) {
	console.error("Error: frontend/index2.html not found.")
	process.exit(1)
}

const index2Content = readFileSync(index2Path, "utf-8")
writeFileSync(indexPath, index2Content, "utf-8")
console.log("  Replaced: frontend/index.html <- frontend/index2.html")

// Step B: Write clean app.ahk
const cleanAppAhk = `#Requires AutoHotkey v2.0 64-bit
SetWorkingDir(A_ScriptDir)
#SingleInstance force

OnExit(trueExit)

#Include webview\\WebViewToo.ahk

WebViewSettings := {}
if (A_IsCompiled) {
	WebViewCtrl.CreateFileFromResource("64bit\\WebView2Loader.dll", WebViewCtrl.TempDir)
    WebViewSettings := {DllPath: WebViewCtrl.TempDir "\\64bit\\WebView2Loader.dll"}
}

MyGui := WebViewGui("-Resize -Caption",,, WebViewSettings)
MyGui.OnEvent("Close", mygui_Close)

MyGui.AddCallbackToScript("Msg", WebviewMsg)
MyGui.AddCallbackToScript("Exit", WebviewExit)

if(A_IsCompiled) {
	MyGui.Navigate("index.html")
} else {
	MyGui.Navigate("http://localhost:5173")
	MyGui.Debug()
}

MyGui.Show("w820 h700")
return

WebviewMsg(webview, msg) {
	MsgBox(msg, "MSG", 0x1040)
}
WebviewExit(webview, msg) {
	ExitApp(0)
}

mygui_Close(*) {
	trueExit(0, 0)
}
trueExit(ExitReason, ExitCode){
	ExitApp(ExitCode)
}

#Include ./resource.ahk

;@Ahk2Exe-IgnoreBegin
; For dev
F6::ExitApp(5173)
;@Ahk2Exe-IgnoreEnd
`

writeFileSync(join(root, "app.ahk"), cleanAppAhk, "utf-8")
console.log("  Replaced: app.ahk (clean version)")

// Step C: Remove unused frontend files
const filesToDelete = [
	"frontend/components/ahk2front.html",
	"frontend/components/btnGroup.html",
	"frontend/components/chart.html",
	"frontend/components/checkbox.html",
	"frontend/components/counter.html",
	"frontend/components/footer.html",
	"frontend/components/front2ahk.html",
	"frontend/components/logos.html",
	"frontend/components/post.html",
	"frontend/components/progress.html",
	"frontend/components/range.html",
	"frontend/components/rating.html",
	"frontend/components/register.html",
	"frontend/components/score.html",
	"frontend/components/score2.html",
	"frontend/components/select.html",
	"frontend/components/stepper.html",
	"frontend/components/title.html",
	"frontend/components/toggle.html",
	"frontend/components/volumes.html",
	"frontend/src/counter.js",
	"frontend/src/stepper.js",
	"frontend/src/main.js",
	"frontend/public/assets/autohotkey.svg",
	"frontend/public/assets/bg.webp",
	"frontend/public/assets/TailwindCSS.svg",
]

const dirsToDelete = [
	"frontend/components",
	"dist",
]

let deletedCount = 0

for (const file of filesToDelete) {
	const fullPath = join(root, file)
	if (existsSync(fullPath)) {
		rmSync(fullPath, { force: true })
		console.log(`  Deleted:  ${file}`)
		deletedCount++
	}
}

for (const dir of dirsToDelete) {
	const fullPath = join(root, dir)
	if (existsSync(fullPath)) {
		rmSync(fullPath, { recursive: true, force: true })
		console.log(`  Deleted:  ${dir}/`)
		deletedCount++
	}
}

// Step D: Summary
console.log(`\nDone. Replaced 2 files, removed ${deletedCount} files/directories.`)
console.log("\nKept:")
console.log("  frontend/index.html       - clean single-page UI")
console.log("  frontend/src/app.css       - TailwindCSS + DaisyUI theme")
console.log("  frontend/public/assets/    - vite.svg (favicon)")
console.log("  scripts/dev.js             - dev orchestrator")
console.log("  app.ahk                    - simplified AHK entry point")
console.log("\nRun 'npm run dev' to start developing.")
