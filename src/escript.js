/*
E-Script
An API that makes programming in JavaScript very easy.
*/

var eScriptApi = {};

eScriptApi.addRaw = function (injection, useAutoStart) {
    const esaElement = document.createElement("eScriptApiElement");
    injection = injection.replaceAll("  ", "")
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
                esaElement.innerHTML += "<br>" + line;
                evalulateLine(line);
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
                evalulateLine(line)
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
var inStyles;
function evalulateLine(line) {
    try {
        if (inStyles && !line.includes("break")) {
            evalulateStyles(currentElement, line);
            return;
        }
        // features such as get, etc;
        if (line.includes("get")) {
            if (line.remove("get ").includes("document.body")) { currentElement = document.body; return; }
            if (line.remove("get ").includes("document.head")) { currentElement = document.head; return; }
            if (line.remove("get ").includes("document")) { currentElement = document; return; }
            currentElement = document.querySelector(line.remove("get "))
            return true;
        } else if (line.includes("break")) {
            currentElement = null;
            inStyles = null;
            return true;
        } else if (line.includes("set innerHTML to ")) {
            currentElement.innerHTML = line.remove("set innerHTML to ");
            return true;
        } else if (line.includes("set innerText to ")) {
            currentElement.innerText = line.remove("set innerText to ");
            return true;
        } else if (line.includes("set document title to")) {
            document.title = line.remove("set document title to ")
            return true;
        } else if (line.includes("alert")) {
            alert(line.remove("alert "))
        } else if (line.includes("log")) {
            console.log(line.remove("log "));
        } else if (line.includes("warn ")) {
            console.warn(line.remove("warn "));
        } else if (line.includes("error")) {
            console.error(line.remove("error "))
        } else if (line.includes("prompt ")) {
            prompt(line.remove("prompt "))
        } else if (line.includes("confirm ")) {
            confirm(line.remove("confirm "))
        } else if (line.includes("set styles")) {
            inStyles = true;
        } else if (line.includes("import css url ")) {
            if (document.body.contains(document.getElementById("#eScriptApiStyles"))) {
                const styles = document.document.getElementById("#eScriptApiStyles");
                styles.innerHTML = line.remove("import css url ");
            } else {
                const styles = document.createElement("style");
                styles.innerHTML = line.remove("import css url ");
                document.head.append(styles);
            }
        }
        else {
            try {
                eval(line)
            } catch (err) {
                console.error(err);
            }
        }
    } catch (err) {
        logError(err)
        return err;
    }
}

String.prototype.remove = function (query) {
    return this.replaceAll(query, "")
}

function logError(error) {
    console.error("eScriptAPI Error\n" + error);
}

function logWarning(warn) {
    console.warn("eScriptAPI Error\n" + warn);
}

function evalulateStyles(currentElement, line) {
    const property = line.split(" ")[0].remove(":")
    const value = line.split(" ")[1].remove(";")

    try {
        currentElement.style.setProperty(property, value);
        return true;
    } catch (err) {
        logError(err)
        return false;
    }
}