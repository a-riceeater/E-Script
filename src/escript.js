/*
E-Script
An API that makes programming in JavaScript very easy.
*/

const eScriptApi;

eScriptApi.prototype.addRaw = function(injection) {
    const esaElement = document.createElement("eScriptApiElement");
    esaElement.innerHTML = "ello"
    document.body.append(esaElement);
}
