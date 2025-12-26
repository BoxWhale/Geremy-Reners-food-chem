// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
    function selectImage(radioId, img) {
        var container = img.closest('.image-options');
        if (!container) container = document;
        var imgs = container.querySelectorAll('img');
        imgs.forEach(function(i){ i.style.border = '2px solid transparent'; });
        var radio = document.getElementById(radioId);
        if (radio) {
            radio.checked = true;
            var savedKey = radio.getAttribute('data-saveanswer-key');
            if (!savedKey) {
                // Fallback: parse from the closest onfocusout
                var onfocusout = radio.getAttribute('onfocusout');
                if (onfocusout && onfocusout.includes('saveanswer')) {
                    var match = onfocusout.match(/saveanswer\('([^']+)'/);
                    savedKey = match ? match[1] : null;
                }
            }
            if (savedKey) {
                img.style.border = '2px solid #0078d4';
                try { saveanswer(savedKey, radioId); } catch (e) { }
            }
        }
    }