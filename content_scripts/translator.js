var cal1 = document.createElement('div');
cal1.id = 'cal1';
cal1.style.cssText = `
    position:absolute;
    height: 0px;
    width: 0px;
    top: 100px;
    left: 100px;
    overflow: none;
    z-index: -100;`
document.body.appendChild(cal1);

var cal2 = document.createElement('div');
cal2.id = 'cal2';
cal2.style.cssText = `
    position:absolute;
    height: 0px;
    width: 0px;
    top: 0px;
    left: 0px;
    overflow: none;
    z-index: -100;`
document.body.appendChild(cal2);

var translation_btn = document.createElement('div');
translation_btn.id = 'translation-btn';
translation_btn.style.cssText = `
    position:absolute;
    display:none;
    border:grey solid 1px;
    background:white;
    font-size: 18px`
translation_btn.innerText = ' Translate ';
document.body.appendChild(translation_btn);


var resultArea = document.createElement('div');
resultArea.id = 'result-area';
resultArea.style.cssText = `
    position:fixed;
    display:none;
    border:grey solid 1px;
    background:white;
    font-size: 18px`
resultArea.innerText = ' ';
document.body.appendChild(resultArea);

var sel = window.getSelection();
var rel1 = document.createRange();
rel1.selectNode(cal1);
var rel2 = document.createRange();
rel2.selectNode(cal2);

var selected_text = '';


if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

window.addEventListener('mouseup', function () {
    resultArea.style.display = 'none';
    resultArea.innerText = '';

    if (!sel.isCollapsed) {
        selected_text = sel.toString();

        var r = sel.getRangeAt(0).getBoundingClientRect();
        var rb1 = rel1.getBoundingClientRect();
        var rb2 = rel2.getBoundingClientRect();

        //this will place translation_btn below the selection.
        translation_btn.style.top = (r.bottom - rb2.top) / (rb1.top - rb2.top) * 100 + 'px';
        //this will align the left edges together.
        translation_btn.style.left = (r.left - rb2.left) / (rb1.left - rb2.left) * 100 + 'px';
        // Show the button.
        translation_btn.style.display = 'block';
    }
    else {
        translation_btn.style.display = 'none';
    }
});


var GOOGLE_TRANSLATION_URL = "https://www.google.com/search?source=hp&q={0}+%E7%BF%BB%E8%AF%91";

translation_btn.addEventListener('mouseup', function (event) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, "text/html");
            console.log(doc.getElementById("tw-target-text").childNodes[0].innerText);

            resultArea.innerText = doc.getElementById("tw-target-text").childNodes[0].innerText;
            resultArea.style.left = event.clientX + "px";
            resultArea.style.top = event.clientY + "px";
            resultArea.style.display = 'block';

            // Hide translate button.
            translation_btn.style.display = 'none';

        }
    }
    xhr.open("GET", GOOGLE_TRANSLATION_URL.format(selected_text.replace(' ', '+')), true);
    xhr.send();
    event.stopPropagation();
});