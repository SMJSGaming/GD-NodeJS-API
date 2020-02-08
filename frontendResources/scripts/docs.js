function inithighlight() {
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block);
    });
}

function openPage(url, thisObject) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `/api/docs/res/${url}`);
    xmlHttp.onload = () => {
        document.querySelectorAll(".highlight")[0].classList.remove("highlight");
        thisObject.classList.add("highlight");
        document.getElementById("body").innerHTML = xmlHttp.response;
        inithighlight();
    };
    xmlHttp.send(null);
}
inithighlight();