function saveanswer(savedKey, inputId){   
    const answerTyped = document.getElementById(inputId).value; 
    sessionStorage.setItem(savedKey, answerTyped);
}


function showanswer(savedKey){
    let storedAnswer = sessionStorage.getItem(savedKey);
    document.getElementById("displayanswer").innerHTML = storedAnswer;
}


function allStorage() {
    const keys = Object.keys(sessionStorage);
    let output = "";

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = sessionStorage.getItem(key);
        output += `${key}: ${value}<br>`;
    }

    document.getElementById("displaystorage").innerHTML = output;
}