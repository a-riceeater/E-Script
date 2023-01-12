/*
E-Script
An API that makes programming in JavaScript very easy.
*/

var eScriptApi = {};

eScriptApi.addRaw = function (injection, useAutoStart) {
    const esaElement = document.createElement("eScriptApiElement");
    const lines = injection.split("\n")
    if (useAutoStart || useAutoStart == null) {
        var trueText = "";
        for (let i = 0; i < lines.length; i++) {
            try {
                let line = lines[i];
                if (line.replaceAll(" ", "") == "") {
                    delete lines[i];
                    continue;
                }
                evalulateLine(line);
                esaElement.innerHTML += "<br>" + line;
            } catch (err) {
                console.error(err)
            }
        }
    } else {
        for (let i = 0; i < lines.length; i++) {
            esaElement.innerHTML += "<br>" + lines[i];
        }
    }
    esaElement.style.display = "block"
    document.body.append(esaElement);
    if (useAutoStart == null) console.warn("eScript API | Warning\nReccomended to use `true/false` for addRaw autostart attribute!")
}

eScriptApi.start = startEval;
function startEval() {
    const code = document.querySelector("eScriptApiElement")
    if (document.body.contains(code)) {
        const lines = code.innerHTML.split("<br>")
        var trueText = "";
        for (let i = 0; i < lines.length; i++) {
            try {
                let line = lines[i];
                if (line.remove(" ") == "") {
                    delete lines[i];
                    continue;
                }
                evalulateLine(line);
            } catch (err) {
                alert(err)
            }
        }
        return true;
    } else {
        return false;
    }
}

var currentElement;
function evalulateLine(line) {
    // features such as get, etc;
    if (line.includes("get")) {
        currentElement = document.querySelector(line.remove("get "))
    } else if (line.includes("break")) {
        currentElement = null;
    } else if (line.includes("set innerHTML to ")) {
        currentElement.innerHTML = line.remove("set innerHTML to ");
    } else if (line.includes("set innerText to ")) {
        currentElement.innerText = line.remove("set innerText to ");
    } else if (line.includes("set document title to")) {
        document.title = line.remove("set document title to ")
    } else {
        try {
            eval(line)
        } catch (err) {
            console.error(err);
        }
    }
}

String.prototype.remove = function (query) {
    return this.replace(query, "")
}