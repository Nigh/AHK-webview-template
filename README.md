
# AHK Webview Template (WIP)

[简体中文](README_cn.md)

A **vite**+**tailwindcss** WebView template for **AutoHotkey**.

> [!WARNING]
> This project is still in the early stages of development, and various features and behaviors may change.

> [!NOTE]
> This template uses [**WebViewToo**](https://github.com/The-CoDingman/WebViewToo) as the webview wrapper.

## Overview

![](screenshot.png)

This template uses [**WebViewToo**](https://github.com/The-CoDingman/WebViewToo) as the webview wrapper combined with vite to build an AHK WebView GUI development framework that supports frontend hot-reloading. With this framework, you can use various modern frontend technologies to create stunning graphical interfaces and interactions for your AHK applications.

In the template's interface, you can drag the entire window by clicking the `Hello WebView` title.

The input box on the left is an example of sending messages from the frontend to the AHK script. Enter any string in the input box and click send, and the AHK script will use the `Msgbox` method to print the string.

The input box on the right is an example of sending messages from the AHK script to the frontend. Press the hotkey `F1`, and the AHK script will send several preset strings to the frontend in turn.

At the bottom is a completely frontend-built counter that does not interact with the AHK script.

## Project Structure

```
.
├── frontend
│   ├── public
│   │   └── assets
│   ├── src
│   │   ├── counter.js
│   │   ├── main.js
│   │   └── style.css
│   └── index.html		; frontend index
├── scripts
│   └── dev.js
├── webview				; WebViewToo Lib
├── .gitignore
├── app.ahk				; AHK entry
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── resource.ahk
├── Screenshot.png
└── vite.config.js
```

## Setup

Since this template uses a frontend tech stack to build the application's GUI, `npm` is used to manage the project's dependencies and build process.

Here’s how to install NPM on Windows:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version for Windows
3. Choose the 64-bit version, as this template only supports 64-bit
4. Run the Installer to install Node.js with NPM
5. After installation, open **PowerShell** and run `node --version` and `npm --version` to verify the installation.

## Usage

First, install the dependencies:

```sh
npm install
```

Then, you can use the following command to enter development mode:

```sh
npm run dev
```

In development mode, frontend changes will update immediately. After updating the AHK script, press the hotkey `F6` to reload the script.

Alternatively, you can use the following command to enter watch mode, which automatically reloads the AHK script when changes are detected (this is less commonly used):

```sh
npm run dev:watch
```

To exit the development mode, press `Ctrl+C` in the command line.

Finally, use the following command to compile the binary:

```sh
npm run build
```

You can run the compiled binary with the following command, or you can run it manually:

```sh
npm run preview
```
