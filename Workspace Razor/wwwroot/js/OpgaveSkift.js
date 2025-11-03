function show(type) {
    const box = document.getElementById('opgaveBox');
    switch (type) {
        case 'one':
            box.innerHTML = "<p>Opgave 1</p>";
            break;
        case 'two':
            box.innerHTML = "<p>Opgave 2</p>";
            break;
        case 'three':
            box.innerHTML = "<p>Opgave 3</p>";
            break;
        default:
            box.innerHTML = "<p>Error</p>";
            break;
    }
}