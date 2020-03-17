const xmlHttp = new XMLHttpRequest();
function inithighlight() {
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block);
    });
}

function openPage(url, thisObject) {
    xmlHttp.open("GET", `/api/docs/res/${url}`);
    xmlHttp.onload = () => {
        if (thisObject) {
            document.querySelectorAll(".highlight")[0].classList.remove("highlight");
            thisObject.classList.add("highlight");
        }
        document.getElementById("body").innerHTML = xmlHttp.response;
        inithighlight();
    };
    xmlHttp.send(null);
}