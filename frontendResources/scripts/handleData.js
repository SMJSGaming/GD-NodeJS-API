const reader = new FileReader();

function errorCSS(message) {
    document.getElementById("error").innerHTML = "⚠ " + message;
    document.getElementById("dropbox").style.boxShadow = "0 0 20px rgba(253, 43, 43, 0.7)";
    setTimeout(() => {
        document.getElementById("dropbox").style.boxShadow = "0 0 0 rgba(253, 43, 43, 0.7)";
    }, 1000);
}

function fileDropped(event, input = false) {
    event.preventDefault();
    let file;
    if (input) {
        file = event.target.files[0];
    } else {
        file = event.dataTransfer.files[0];
    }
    if (file) {
        if (file.name == "CCLocalLevels.dat") {
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                let saveFile = btoa(evt.target.result).replace(/\+/g, "-").replace(/\//g, "_");
                let redirectForm = $('<form id="tempform" method="post"><input type="text" name="data" value="' + saveFile + '"></form>');
                $('body').append(redirectForm);
                redirectForm.submit();
            }
            reader.onerror = function (evt) {
                errorCSS("Error reading the file!");
            }
        } else {
            errorCSS("Only CCLocalLevels.dat is allowed!");
        }
    } else {
        errorCSS("No files were detected!");
    }
}

$(document).ready(function() {
    document.getElementById('file_upload').value = "";
    document.getElementById("file_upload").onchange = event => { 
        fileDropped(event, true);
    }
});