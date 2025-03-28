const body = document.querySelector("body")
const title = document.querySelector("#title")
const textCursor = document.querySelector("#textCursor")

const titleKeys = "qwerty."
const darkModeInstructions = 'Type "dark" to enable dark mode'
const lightModeInstructions = 'Type "light" to enable light mode'

let characterQueue = ""

const keyIDs = [
    { code: "Escape", label: "esc" },
    { code: "F1", label: "F1" }, { code: "F2", label: "F2" }, { code: "F3", label: "F3" }, { code: "F4", label: "F4" },
    { code: "F5", label: "F5" }, { code: "F6", label: "F6" }, { code: "F7", label: "F7" }, { code: "F8", label: "F8" },
    { code: "F9", label: "F9" }, { code: "F10", label: "F10" }, { code: "F11", label: "F11" }, { code: "F12", label: "F12" },
    { code: "PrintScreen", label: "print/scr" }, { code: "ScrollLock", label: "scroll lock" }, { code: "Pause", label: "pause break" },

    { code: "Backquote", label: "~" },
    { code: "Digit1", label: "1" }, { code: "Digit2", label: "2" }, { code: "Digit3", label: "3" }, { code: "Digit4", label: "4" },
    { code: "Digit5", label: "5" }, { code: "Digit6", label: "6" }, { code: "Digit7", label: "7" }, { code: "Digit8", label: "8" },
    { code: "Digit9", label: "9" }, { code: "Digit0", label: "0" },
    { code: "Minus", label: "-" }, { code: "Equal", label: "=" },
    { code: "Delete", label: "del" },

    { code: "Tab", label: "Tab" },
    { code: "KeyQ", label: "Q" }, { code: "KeyW", label: "W" }, { code: "KeyE", label: "E" }, { code: "KeyR", label: "R" },
    { code: "KeyT", label: "T" }, { code: "KeyY", label: "Y" }, { code: "KeyU", label: "U" }, { code: "KeyI", label: "I" },
    { code: "KeyO", label: "O" }, { code: "KeyP", label: "P" },
    { code: "BracketLeft", label: "[" }, { code: "BracketRight", label: "]" }, { code: "Backslash", label: "\\" },

    { code: "CapsLock", label: "CapsLock" },
    { code: "KeyA", label: "A" }, { code: "KeyS", label: "S" }, { code: "KeyD", label: "D" }, { code: "KeyF", label: "F" },
    { code: "KeyG", label: "G" }, { code: "KeyH", label: "H" }, { code: "KeyJ", label: "J" }, { code: "KeyK", label: "K" },
    { code: "KeyL", label: "L" }, { code: "Semicolon", label: ";" }, { code: "Quote", label: "'" },
    { code: "Enter", label: "Enter" },

    { code: "ShiftLeft", label: "Shift" },
    { code: "KeyZ", label: "Z" }, { code: "KeyX", label: "X" }, { code: "KeyC", label: "C" }, { code: "KeyV", label: "V" },
    { code: "KeyB", label: "B" }, { code: "KeyN", label: "N" }, { code: "KeyM", label: "M" },
    { code: "Comma", label: "," }, { code: "Period", label: "." }, { code: "Slash", label: "/" },
    { code: "ShiftRight", label: "Shift" },

    { code: "ControlLeft", label: "Ctrl" }, { code: "MetaLeft", label: "Win" }, { code: "AltLeft", label: "Alt" },
    { code: "Space", label: "Space" },
    { code: "AltRight", label: "Alt" }, { code: "MetaLeft", label: "Win" }, { code: "ContextMenu", label: "Menu" },
    { code: "ControlRight", label: "Ctrl" },

    { code: "Insert", label: "insert" },
    { code: "Home", label: "home" },
    { code: "PageUp", label: "page up" },
    { code: "Delete", label: "delete" },
    { code: "End", label: "end" },
    { code: "PageDown", label: "page down" },

    { code: "ArrowUp", label: "↑" },
    { code: "ArrowLeft", label: "←" },
    { code: "ArrowDown", label: "↓" },
    { code: "ArrowRight", label: "→" },

    { code: "NumLock", label: "num lock" },
    { code: "NumpadDivide", label: "/" },
    { code: "NumpadMultiply", label: "*" },
    { code: "NumpadSubtract", label: "-" },
    { code: "Numpad7", label: "7" },
    { code: "Numpad8", label: "8" },
    { code: "Numpad9", label: "9" },
    { code: "NumpadAdd", label: "+" },
    { code: "Numpad4", label: "4" },
    { code: "Numpad5", label: "5" },
    { code: "Numpad6", label: "6" },
    { code: "Numpad1", label: "1" },
    { code: "Numpad2", label: "2" },
    { code: "Numpad3", label: "3" },
    { code: "NumpadEnter", label: "enter" },
    { code: "Numpad0", label: "0" },
    { code: "NumpadDecimal", label: "." }
];

class keyObject {
    constructor(code) {
        this.code = code
        this.element = document.querySelector(`#${this.code}`);
    }
}

const keyObjectArr = keyIDs.map((obj) => {
    return new keyObject(obj.code)
})

function generateKeyListeners(objArr) {
    objArr.forEach(obj => {
        body.addEventListener("keydown", (e) => {
            if (e.code === obj.code) {
                obj.element.classList.add("is-pressed")
            }
        })

        body.addEventListener("keyup", (e) => {
            if (e.code === obj.code) {
                obj.element.classList.remove("is-pressed")
                enqueueCharacter(e.key[0])
            }
        })
    });
}

//character queue 
function enqueueCharacter(char) {
    characterQueue = characterQueue + char
    console.log(characterQueue)
    characterQueue.toLowerCase()

    checkThemeChange(characterQueue)
}

//check for theme change
function checkThemeChange(charArr) {
    if (charArr.indexOf("light") !== -1) {
        document.documentElement.style.setProperty("--keyBorderColor", "#393e41")
        document.documentElement.style.setProperty("--backgroundColor", "#f6f7eb")
        document.documentElement.style.setProperty("--keyPressColor", "#e94f37")
        characterQueue = ""
    } else if (charArr.indexOf("dark") !== -1) {
        document.documentElement.style.setProperty("--keyBorderColor", "#f8f7f9")
        document.documentElement.style.setProperty("--backgroundColor", "#151515")
        document.documentElement.style.setProperty("--keyPressColor", "#f2af29")
        characterQueue = ""
    }
}

//title animation
function typeAnimation(displayString) {
    const displayChar = [...displayString]
    const totalTime = (displayChar.length * 150) + 150
    let i = 0

    const intervalID = setInterval(() => {
        title.textContent += displayChar[i]
        i++
    }, 150)

    setTimeout(() => {
        clearInterval(intervalID)
    }, totalTime)
}

function cursorAnimation() {
    let i = 0
    setInterval(() => {
        i++
        if (i % 2)
            textCursor.textContent = "_"
        else
            textCursor.textContent = ""
    }, 500)
}

generateKeyListeners(keyObjectArr)
typeAnimation(titleKeys)
cursorAnimation()