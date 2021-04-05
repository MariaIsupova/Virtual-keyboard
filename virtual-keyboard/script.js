var text = document.getElementById('text');
speech = false
sound = true
myAudio1 = new Audio;
myAudio2 = new Audio;
myAudio3 = new Audio;
myAudio4 = new Audio;
myAudio5 = new Audio;
myAudio6 = new Audio;
myAudio7 = new Audio;
myAudio8 = new Audio;
myAudio9 = new Audio;

myAudio1.src = "./audio/bs.mp3";
myAudio2.src = "./audio/caps.mp3";
myAudio3.src = "./audio/shift.mp3";
myAudio4.src = "./audio/enter.mp3";
myAudio5.src = "./audio/space.mp3";
myAudio6.src = "./audio/en.mp3";
myAudio7.src = "./audio/ru.mp3";
myAudio8.src = "./audio/lang.mp3";
myAudio9.src = "./audio/close.mp3";


const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },
    condition: {
        language: 'en',
        shift: 'no-shift',
        caps: 'no-caps'
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "en", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "left", "right",
            "speech", "space", 'sound'
        ];
        const ruКeyLayout = [
            "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "ru", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
            "speech", "space", 'sound'
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };


        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "enter", "right"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");


            switch (key) {
                case "sound":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "keyboard__key--active");
                    keyElement.innerHTML = createIconHTML("&#x266B;");

                    keyElement.addEventListener("click", () => {
                        sound = !sound
                        keyElement.classList.toggle("keyboard__key--active", sound);
                        // text.focus()
                    });
                    break;

                case "speech":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = '<div class="no-speech"></div>';

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            myAudio8.currentTime = 0;
                            myAudio8.play()
                        }

                        if (!speech) {
                            speech = !speech
                            keyElement.innerHTML = '<div class="speech"></div>';
                            recognition.interimResults = true;
                            if (this.condition.language === 'en') {
                                recognition.lang = 'en-US'
                                console.log(recognition.lang)
                            } else if (this.condition.language === 'ru') {
                                recognition.lang = 'ru'
                                console.log(recognition.lang)
                            }
                            recognition.interimResults = true
                            recognition.start();
                            recognition.addEventListener('end', recognition.start)
                            recognition.addEventListener('result', tryRec);

                        } else {
                            stopVoice()
                            keyElement.innerHTML = '<div class="no-speech"></div>';
                        }

                        text.focus()
                    });
                    break;

                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            myAudio1.currentTime = 0;
                            myAudio1.play()
                        }

                        curPos = text.selectionStart;
                        if (curPos === 0) {} else if (curPos === text.value.length && curPos !== 0) {
                            text.value = text.value.substring(0, text.value.length - 1)
                        } else {
                            let msg = text.value.slice(curPos)
                            text.value = text.value.slice(0, curPos).substring(0, text.value.slice(0, curPos).length - 1) + msg;
                        }
                        setCaretToPos(text, curPos - 1)
                        text.focus()
                    });

                    break;

                case "left":
                    keyElement.classList.add("keyboard__key--not-wide", );
                    keyElement.innerHTML = createIconHTML("&#x25C1;");

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            if (this.condition.language === "en") {
                                myAudio6.currentTime = 0;
                                myAudio6.play()
                            } else {
                                myAudio7.currentTime = 0;
                                myAudio7.play()
                            }
                        }

                        curPos = text.selectionStart;
                        if (curPos !== 0) {
                            setCaretToPos(text, curPos - 1)
                            text.focus()
                        } else {
                            text.focus()
                        }
                    });

                    break;

                case "right":
                    keyElement.classList.add("keyboard__key--not-wide");
                    keyElement.innerHTML = createIconHTML("&#x25B7;");

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            if (this.condition.language === "en") {
                                myAudio6.currentTime = 0;
                                myAudio6.play()
                            } else {
                                myAudio7.currentTime = 0;
                                myAudio7.play()
                            }
                        }

                        curPos = text.selectionStart;
                        if (curPos !== text.value.length) {
                            setCaretToPos(text, curPos + 1)
                            text.focus()
                        } else {
                            text.focus()
                        }
                    });

                    break;



                case "caps":

                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            myAudio2.currentTime = 0;
                            myAudio2.play()
                        }
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.condition.caps === 'caps');
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("&uArr;");

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            myAudio3.currentTime = 0;
                            myAudio3.play()
                        }
                        this._toggleShift(ruКeyLayout, keyLayout, true);
                        keyElement.classList.toggle("keyboard__key--active", this.condition.shift === 'shift');
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide", "enter_button");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            myAudio4.currentTime = 0;
                            myAudio4.play()
                        }

                        this.properties.value = "\n";

                        curPos = text.selectionStart;
                        if (curPos === text.value.length) {
                            text.value += this.properties.value
                        } else {
                            var msg = text.value.slice(curPos)
                            text.value = text.value.slice(0, curPos) + this.properties.value + msg;
                        }
                        setCaretToPos(text, curPos + 1)
                        text.focus()

                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            myAudio5.currentTime = 0;
                            myAudio5.play()
                        }

                        this.properties.value = " ";
                        curPos = text.selectionStart;
                        if (curPos === text.value.length) {
                            text.value += this.properties.value
                        } else {
                            console.log("!=")
                            var msg = text.value.slice(curPos)
                            text.value = text.value.slice(0, curPos) + this.properties.value + msg;
                        }
                        setCaretToPos(text, curPos + 1)
                        text.focus()
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("&#x25BD;");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "en":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = '<div class="keyboard__key__en--active"></div>';

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            myAudio8.currentTime = 0;
                            myAudio8.play()
                        }
                        this._toggleLanguage(ruКeyLayout, keyLayout);
                        if (this.condition.language === 'en') {
                            keyElement.innerHTML = '<div class="keyboard__key__en--active"></div>';
                        } else {
                            keyElement.innerHTML = '<div class="keyboard__key__ru--active"></div>';
                        }
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        if (sound) {
                            if (this.condition.language === "en") {
                                myAudio6.currentTime = 0;
                                myAudio6.play()
                            } else {
                                myAudio7.currentTime = 0;
                                myAudio7.play()
                            }
                        }

                        this.properties.value = keyElement.textContent

                        curPos = text.selectionStart;
                        console.log(curPos)
                        if (curPos === text.value.length) {
                            text.value += this.properties.value
                            // console.log("curPos = text.value.len", text.value)
                        } else {
                            var msg = text.value.slice(curPos)
                            // console.log("curPos != text.value.len", text.value)
                            text.value = text.value.slice(0, curPos) + this.properties.value + msg;
                            // console.log('text.val - ', text.value.slice(0, curPos))
                            // console.log('prop.val - ', this.properties.value)
                            // console.log('msg - ', msg)
                        }
                        setCaretToPos(text, curPos + 1)
                        text.focus()

                        this._triggerEvent("oninput")
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.condition.caps = this.condition.caps == 'no-caps' ? this.condition.caps = 'caps' : this.condition.caps = 'no-caps';
        // this.properties.capsLock = !this.properties.capsLock;
        console.log("caps", this.condition)

        if (this.condition.caps == 'no-caps' && this.condition.shift == 'no-shift') {
            console.log("no-caps, no-shift")
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = key.textContent.toLowerCase();
                }
            }
        }
        if (this.condition.caps == 'no-caps' && this.condition.shift == 'shift') {
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = key.textContent.toUpperCase();
                }
            }
        }
        if (this.condition.caps == 'caps' && this.condition.shift == 'no-shift') {
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = key.textContent.toUpperCase();
                }
            }
        }
        if (this.condition.caps == 'caps' && this.condition.shift == 'shift') {
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = key.textContent.toLowerCase();
                }
            }
        }

    },

    _toggleLanguage(ruКeyLayout, keyLayout) {

        this.condition.language = this.condition.language == 'en' ? this.condition.language = 'ru' : this.condition.language = 'en'
        let i = 0

        if (this.condition.language === 'ru') {
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = ruКeyLayout[i];
                }
                i++
            }
        }
        if (this.condition.language === 'en') {
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = keyLayout[i];
                }
                i++
            }
        }

        this._toggleShift(ruКeyLayout, keyLayout, false) // проверить если ли уже shift, caps
    },

    _toggleShift(ruКeyLayout, keyLayout, flag) {
        // this.properties.shift = !this.properties.shift;
        console.log("shift")
        if (flag == true) {
            this.condition.shift = this.condition.shift == 'no-shift' ? this.condition.shift = 'shift' : this.condition.shift = 'no-shift'
        }
        console.log("shift", this.condition)

        if (this.condition.language == 'en') {
            if (this.condition.caps == 'no-caps' && this.condition.shift == 'no-shift') {
                let i = 0
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = keyLayout[i];
                    }
                    i++
                }
            }
            if (this.condition.caps == 'no-caps' && this.condition.shift == 'shift') {
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = key.textContent.toUpperCase();
                    }
                }
                this.elements.keys[1].textContent = '!'
                this.elements.keys[2].textContent = '@'
                this.elements.keys[3].textContent = '#'
                this.elements.keys[4].textContent = '$'
                this.elements.keys[5].textContent = '%'
                this.elements.keys[6].textContent = '^'
                this.elements.keys[7].textContent = '&'
                this.elements.keys[8].textContent = '*'
                this.elements.keys[9].textContent = '('
                this.elements.keys[10].textContent = ')'

                this.elements.keys[23].textContent = '{'
                this.elements.keys[24].textContent = '}'
                this.elements.keys[35].textContent = ':'
                this.elements.keys[36].textContent = '"'
                this.elements.keys[46].textContent = '<'
                this.elements.keys[47].textContent = '>'
                this.elements.keys[48].textContent = '?'
            }
            if (this.condition.caps == 'caps' && this.condition.shift == 'no-shift') {
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = key.textContent.toUpperCase();
                    }
                }
                this.elements.keys[1].textContent = '1';
                this.elements.keys[2].textContent = '2';
                this.elements.keys[3].textContent = '3';
                this.elements.keys[4].textContent = '4';
                this.elements.keys[5].textContent = '5';
                this.elements.keys[6].textContent = '6';
                this.elements.keys[7].textContent = '7';
                this.elements.keys[8].textContent = '8';
                this.elements.keys[9].textContent = '9';
                this.elements.keys[10].textContent = '0';

                this.elements.keys[23].textContent = '['
                this.elements.keys[24].textContent = ']'
                this.elements.keys[35].textContent = ';'
                this.elements.keys[36].textContent = "'"
                this.elements.keys[46].textContent = ','
                this.elements.keys[47].textContent = '.'
                this.elements.keys[48].textContent = '/'
            }
            if (this.condition.caps == 'caps' && this.condition.shift == 'shift') {
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = key.textContent.toLowerCase();
                    }
                }
                this.elements.keys[1].textContent = '!'
                this.elements.keys[2].textContent = '@'
                this.elements.keys[3].textContent = '#'
                this.elements.keys[4].textContent = '$'
                this.elements.keys[5].textContent = '%'
                this.elements.keys[6].textContent = '^'
                this.elements.keys[7].textContent = '&'
                this.elements.keys[8].textContent = '*'
                this.elements.keys[9].textContent = '('
                this.elements.keys[10].textContent = ')'

                this.elements.keys[23].textContent = '{'
                this.elements.keys[24].textContent = '}'
                this.elements.keys[35].textContent = ':'
                this.elements.keys[36].textContent = '"'
                this.elements.keys[46].textContent = '<'
                this.elements.keys[47].textContent = '>'
                this.elements.keys[48].textContent = '?'
            }
        } else {
            if (this.condition.caps == 'no-caps' && this.condition.shift == 'no-shift') {
                let i = 0
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = ruКeyLayout[i];
                    }
                    i++
                }
            }
            if (this.condition.caps == 'no-caps' && this.condition.shift == 'shift') {
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = key.textContent.toUpperCase();
                    }
                }
                this.elements.keys[1].textContent = '!'
                this.elements.keys[2].textContent = '"'
                this.elements.keys[3].textContent = '№'
                this.elements.keys[4].textContent = ';'
                this.elements.keys[5].textContent = '%'
                this.elements.keys[6].textContent = ':'
                this.elements.keys[7].textContent = '?'
                this.elements.keys[8].textContent = '*'
                this.elements.keys[9].textContent = '('
                this.elements.keys[10].textContent = ')'

                this.elements.keys[48].textContent = ','

            }
            if (this.condition.caps == 'caps' && this.condition.shift == 'no-shift') {
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = key.textContent.toUpperCase();
                    }
                }
                this.elements.keys[1].textContent = '1';
                this.elements.keys[2].textContent = '2';
                this.elements.keys[3].textContent = '3';
                this.elements.keys[4].textContent = '4';
                this.elements.keys[5].textContent = '5';
                this.elements.keys[6].textContent = '6';
                this.elements.keys[7].textContent = '7';
                this.elements.keys[8].textContent = '8';
                this.elements.keys[9].textContent = '9';
                this.elements.keys[10].textContent = '0';

            }
            if (this.condition.caps == 'caps' && this.condition.shift == 'shift') {
                for (const key of this.elements.keys) {
                    if (key.childElementCount === 0) {
                        key.textContent = key.textContent.toLowerCase();
                    }
                }
                this.elements.keys[1].textContent = '!'
                this.elements.keys[2].textContent = '"'
                this.elements.keys[3].textContent = '№'
                this.elements.keys[4].textContent = ';'
                this.elements.keys[5].textContent = '%'
                this.elements.keys[6].textContent = ':'
                this.elements.keys[7].textContent = '?'
                this.elements.keys[8].textContent = '*'
                this.elements.keys[9].textContent = '('
                this.elements.keys[10].textContent = ')'

                this.elements.keys[48].textContent = ','
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
        if (sound) {
            myAudio9.currentTime = 0;
            myAudio9.play()
        }
    },
};

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const stopVoice = () => {
    speech = !speech;
    // setCaretToPos(text, curPos + 1)
    recognition.abort()
    recognition.removeEventListener('end', recognition.start)
    recognition.removeEventListener('result', tryRec)
}

const tryRec = (e) => {
    let transcript
    transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    if (e.results[0].isFinal) {
        curPos = text.selectionStart;
        if (curPos === text.value.length) {
            text.value += ` ${transcript} `;
            setCaretToPos(text, text.value.length)
        } else {
            let msg = text.value.slice(curPos)
            text.value = text.value.slice(0, curPos) + " " + transcript + " " + msg;
            setCaretToPos(text, text.value.length - msg.length)
        }
    }
}