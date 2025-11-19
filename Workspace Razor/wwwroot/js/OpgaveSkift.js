function show(type) {
    fetch(type)
        .then(response => response.text())
        .then(html => {
            document.getElementById('opgaveBox').innerHTML = html;
        })
        .catch (error => { console.log('Error fetching content:', error); });
}


//const box = document.getElementById('opgaveBox');
//switch (type) {
//    case 'one':
//        box.innerHTML = document.getElementById(opgave1A);
//        break;
//    case 'two':
//        box.innerHTML = "<p>Opgave 2</p>";
//        break;
//    case 'three':
//        box.innerHTML = "<p>Opgave 3</p>";
//        break;
//    default:
//        box.innerHTML = "<p>Error</p>";
//        break;
//}