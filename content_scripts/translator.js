(function () {

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

    var translation_btn = document.createElement('div');
    translation_btn.id = 'translation_btn';
    translation_btn.style.cssText = `
        position:absolute;
        display:none;
        border:grey solid 1px;
        background:white;`
    translation_btn.innerText = 'T';
    document.body.appendChild(translation_btn);


    var sel = window.getSelection();
    var rel1 = document.createRange();
    rel1.selectNode(cal1);
    var rel2 = document.createRange();
    rel2.selectNode(cal2);
    window.addEventListener('mouseup', function () {
        if (!sel.isCollapsed) {
            var r = sel.getRangeAt(0).getBoundingClientRect();
            var rb1 = rel1.getBoundingClientRect();
            var rb2 = rel2.getBoundingClientRect();
            translation_btn.style.top = (r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px'; //this will place ele below the selection
            translation_btn.style.left = (r.left - rb2.left) * 100 / (rb1.left - rb2.left) + 'px'; //this will align the right edges together

            //code to set content
            translation_btn.style.display = 'block';
        }
    });
    window.addEventListener('mousedown', function () {
        translation_btn.style.display = 'none';
    });


})();