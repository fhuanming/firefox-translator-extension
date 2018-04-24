(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /**
     * Given a URL to a beast image, remove all existing beasts, then
     * create and style an IMG node pointing to
     * that image, then insert the node into the document.
     */
    function insertBeast(beastURL) {
        removeExistingBeasts();
        let beastImage = document.createElement("img");
        beastImage.setAttribute("src", beastURL);
        beastImage.style.height = "100vh";
        beastImage.className = "beastify-image";
        document.body.appendChild(beastImage);
    }

    /**
     * Remove every beast from the page.
     */
    function removeExistingBeasts() {
        let existingBeasts = document.querySelectorAll(".beastify-image");
        for (let beast of existingBeasts) {
            beast.remove();
        }
    }

    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
    */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "beastify") {
            // insertBeast(message.beastURL);
            getCursorSelectContent()
        } else if (message.command === "reset") {
            removeExistingBeasts();
        }
    });


    function getCursorSelectContent() {

    }


    var cal1 = document.createElement('div');
    cal1.id = 'cal1';
    cal1.style.cssText = `
        position:absolute;
        height: 0px;
        width: 0px;
        top: 100px;
        left: 100px;
        overflow: none;
        z - index: -100;`
    document.body.appendChild(cal1);

    var cal2 = document.createElement('div');
    cal2.id = 'cal2';
    cal2.style.cssText = `
        position:absolute;
        height:0px;
        width:0px;
        top:0px;
        left:0px;
        overflow:none;
        z-index:-100;`
    document.body.appendChild(cal2);

    var translation = document.createElement('div');


    var ele = document.getElementById('translate');
    var sel = window.getSelection();
    var rel1 = document.createRange();
    rel1.selectNode(document.getElementById('cal1'));
    var rel2 = document.createRange();
    rel2.selectNode(document.getElementById('cal2'));
    window.addEventListener('mouseup', function () {
        if (!sel.isCollapsed) {
            // debugger;
            var r = sel.getRangeAt(0).getBoundingClientRect();
            var rb1 = rel1.getBoundingClientRect();
            var rb2 = rel2.getBoundingClientRect();
            ele.style.top = (r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px'; //this will place ele below the selection
            ele.style.left = (r.left - rb2.left) * 100 / (rb1.left - rb2.left) + 'px'; //this will align the right edges together

            //code to set content
            ele.style.display = 'block';
        }
    });
    window.addEventListener('mousedown', function () {
        ele.style.display = 'none';
    });


})();

console.log('test!');