function saveanswer(savedKey, inputId){   
    const answerTyped = document.getElementById(inputId).value; 
    sessionStorage.setItem(savedKey, answerTyped);
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
        // Flexible validators map. Each value can be:
        // - a RegExp (tested with .test())
        // - a string (case-insensitive exact match)
        // - an array of strings (any item matches case-insensitively)
        // - a function: (storedValue) => boolean
        // Update these per-question to the actual expected answers.
        // Match the exact sessionStorage keys used by the question pages (they include 'Opgave' and ' svar')
        const validators = {
            "Opgave 1b svar": ["ethan-gruppe","carboxyl-gruppe","C-C","COOH","alkan"],
            "Opgave 1d polære svar": ["1"],
            "Opgave 1d upolære svar": ["1"],
            "Opgave 1f svar": "nej, olie er upolært",
            "Opgave 2d svar": ["De tre fedtsyrer er upolære","molekylet er upolært men gruppen er polær"]/* multiple choice istedet*/,
            "Opgave 2e svar": ["nej eddike polært","molekyler samle sig og skille sig fra upolære fedtstof"],
            "Opgave 3a svar": ["interagere både polære og upolære molekyler"],
            "Opgave 3c svar": ["2 haler, de er upolære","vil kunne blande sig med fedtstof"]
        };

        const container = document.querySelector('.CheckAnswers');
        if (!container) {
            console.warn('checkAnswers: .CheckAnswers element not found in DOM');
            return false;
        }

        // small helper to safely show stored text
        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        // Clear previous results
        container.innerHTML = '';
        let allCorrect = true;

        // If none of the expected keys have been answered yet, show a friendly message
        const answeredKeys = Object.keys(validators).filter(k => {
            const v = sessionStorage.getItem(k);
            return v != null && String(v).trim() !== '';
        });

        if (answeredKeys.length === 0) {
            container.innerHTML = '<p> Der er ingen svar indsendt endnu. Venligst besvar spørgsmålene og åbn derefter denne side.</p>';
            return false;
        }

        for (const key of Object.keys(validators)) {
            const validator = validators[key];
            const storedRaw = sessionStorage.getItem(key);
            const stored = storedRaw == null ? '' : String(storedRaw).trim();

            let isCorrect = false;
            let expectedText = '';

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
                        // For string entries in arrays, allow substring match (case-insensitive)
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

            container.innerHTML += `<p class="answer-row">${escapeHtml(key)}: <strong>${isCorrect ? 'Correct' : 'Incorrect'}</strong>` +
                ` "${escapeHtml(stored)}"; svar: ${escapeHtml(expectedText)}</p>`;

            if (!isCorrect) allCorrect = false;
        }

        return allCorrect;

    }

    // Simple diagnostics you can call from the console
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
            "Opgave 1b svar",
            "Opgave 1d polære svar",
            "Opgave 1d upolære svar",
            "Opgave 1f svar",
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

