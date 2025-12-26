
function saveanswer(savedKey, inputId){   
    const inputElem = document.getElementById(inputId);
    let answerTyped;
    if (inputElem && inputElem.type === "radio") {
        // Find the checked radio in the group
        const group = document.getElementsByName(inputElem.name);
        for (let i = 0; i < group.length; i++) {
            if (group[i].checked) {
                answerTyped = group[i].value;
                break;
            }
        }
    } else if (inputElem) {
        answerTyped = inputElem.value;
    }
    sessionStorage.setItem(savedKey, answerTyped || "");
    // Log and update UI immediately when possible
    try { console.log(`saveanswer: saved ${savedKey} = ${answerTyped}`); } catch (e) {}
    try { if (typeof allStorage === 'function') allStorage(); } catch (e) {}
    try { if (typeof checkAnswers === 'function') checkAnswers(); } catch (e) {}
}


function showanswer(savedKey){
    let storedAnswer = sessionStorage.getItem(savedKey);
    document.getElementById("displayanswer").innerHTML = storedAnswer;
}


function allStorage() {
    const keys = Object.keys(sessionStorage);
    
    keys.sort();

    let output = "";

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = sessionStorage.getItem(key);
        output += `${key}: ${value}<br>`;
    }

    document.getElementById("displaystorage").innerHTML = output;
}

    function checkAnswers(){
       
        //validators to say what the answers should be
        const validators = {
            "Opgave 1a svar": ["correct"],
            "Opgave 1b svar": ["ethan-gruppe","carboxyl-gruppe","C-C","COOH","alkan"],
            "Opgave 1c svar": ["correct"],
            "Opgave 1d polære svar": ["1"],
            "Opgave 1d upolære svar": ["1"],
            "Opgave 1f svar": "nej, fordi olie er upolært",
            "Opgave 2a svar": ["correct"],
            "Opgave 2b svar": ["correct"],
            "Opgave 2d svar": ["De tre fedtsyrer er upolære","molekylet er upolært men gruppen er polær"] ,
            "Opgave 2e svar": ["nej eddike polært","molekyler samle sig og skille sig fra upolære fedtstof"],
            "Opgave 3a svar": ["interagere både polære og upolære molekyler"],
            "Opgave 3c svar": ["2 haler, de er upolære","vil kunne blande sig med fedtstof"]
        };

        const container = document.querySelector('.CheckAnswers');
        if (!container) {
            console.warn('checkAnswers: .CheckAnswers element not found in DOM');
            return false;
        }

        //makes sure that answers are text, safety
        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        //remove previous results
        container.innerHTML = '';
        const keys = Object.keys(validators);
        const total = keys.length;
        let answeredCount = 0;
        let correctCount = 0;

        // will update after every answer
        const summaryEl = document.createElement('p');
        summaryEl.className = 'summary';
        summaryEl.textContent = `Besvaret: 0 / ${total} — Korrekt: 0`;
        container.appendChild(summaryEl);

        for (const key of keys) {
            const validator = validators[key];
            const storedRaw = sessionStorage.getItem(key);
            const stored = storedRaw == null ? '' : String(storedRaw).trim();

            // If an answer is missing
            if (!stored) {
                const p = document.createElement('p');
                p.className = 'answer-row unanswered';
                p.innerHTML = `${escapeHtml(key)}: <em>Ikke besvaret</em>`;
                container.appendChild(p);
                continue;
            }

            answeredCount++;

            let isCorrect = false;
            let expectedText = '';
            //test the answers with regex
            if (validator instanceof RegExp) {
                isCorrect = validator.test(stored);
                expectedText = validator.toString();
            } else if (Array.isArray(validator)) {
                expectedText = validator.map(v => (v instanceof RegExp ? v.toString() : v)).join(' | ');
                const storedLower = String(stored).toLowerCase();
                for (const v of validator) {
                    if (v instanceof RegExp) {
                        if (v.test(stored)) { isCorrect = true; break; }
                    } else {
                        
                        if (storedLower.includes(String(v).toLowerCase())) { isCorrect = true; break; }
                    }
                }
            } else if (typeof validator === 'function') {
                try {
                    isCorrect = !!validator(stored);
                    expectedText = 'custom validator';
                } catch (e) {
                    console.error('Validator function threw for key', key, e);
                    isCorrect = false;
                    expectedText = 'validator error';
                }
            } else {
                // treat as a string exact match (case-insensitive)
                expectedText = String(validator);
                isCorrect = String(stored).toLowerCase() === String(validator).toLowerCase();
            }
            //displays the results
            const p = document.createElement('p');
            p.className = 'answer-row ' + (isCorrect ? 'correct' : 'incorrect');
            p.innerHTML = `${escapeHtml(key)}: <strong>${isCorrect ? 'Korrekt' : 'Forkert'}</strong>` +
                ` — "${escapeHtml(stored)}"; forventet: ${escapeHtml(expectedText)}`;
            container.appendChild(p);

            if (isCorrect) correctCount++;
        }

        // Update
        summaryEl.textContent = `Besvaret: ${answeredCount} / ${total} — Korrekt: ${correctCount}`;

        // Return true only if everything is answered and all correct
        return (answeredCount === total && correctCount === total);

    }

    // Shows the answers that are stored in sessionStorage in the console for debugging
    function debugStorageConsole() {
        console.group('sessionStorage contents');
        const keys = Object.keys(sessionStorage).sort();
        for (const k of keys) {
            console.log(k, '->', sessionStorage.getItem(k));
        }
        console.groupEnd();
    }
    
    function showValidatorDiagnostics() {
        const expected = [
            "Opgave 1a svar",
            "Opgave 1b svar",
            "Opgave 1c svar",
            "Opgave 1d polære svar",
            "Opgave 1d upolære svar",
            "Opgave 1f svar",
            "Opgave 2a svar",
            "Opgave 2b svar",
            "Opgave 2d svar",
            "Opgave 2e svar",
            "Opgave 3a svar"
        ];
        console.group('Validator diagnostics');
        console.log('Expected keys:', expected);
        for (const k of expected) {
            console.log(k, '->', sessionStorage.getItem(k));
        }
        console.groupEnd();
    }

