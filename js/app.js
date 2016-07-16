/**
 * Created by Trigger on 7/16/2016.
 */


var bMouseIsDown = false;

var cbCanvas = document.getElementById("thecanvas");
var cbCtx = cbCanvas.getContext("2d");

var iWidth = cbCanvas.width;
var iHeight = cbCanvas.height;

cbCtx.fillStyle = "rgb(255, 255, 255)";
cbCtx.fillRect(0, 0, iWidth, iHeight);
cbCtx.beginPath();
cbCtx.strokeStyle = "rgb(255,0,0)";
cbCtx.strokeWidth = "3px";

var img = new Image();
img.onload = function () {
    cbCtx.drawImage(img, 0, 0);
};

cbCanvas.onmousedown = function (e) {
    bMouseIsDown = true;
    iLastX = e.clientX - cbCanvas.offsetLeft + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
    iLastY = e.clientY - cbCanvas.offsetTop + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
};
cbCanvas.onmouseup = function () {
    bMouseIsDown = false;
    iLastX = -1;
    iLastY = -1;
};
cbCanvas.onmousemove = function (e) {
    if (bMouseIsDown) {
        var iX = e.clientX - cbCanvas.offsetLeft + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
        var iY = e.clientY - cbCanvas.offsetTop + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
        cbCtx.moveTo(iLastX, iLastY);
        cbCtx.lineTo(iX, iY);
        cbCtx.stroke();
        iLastX = iX;
        iLastY = iY;
    }
};

function convertCanvas(strType) {

    var cbImg;
    if (strType === "PNG") cbImg = Canvas2Image.saveAsPNG(cbCanvas, true, 300, 125);
    if (!cbImg) {
        console.log("Sorry, this browser is not capable of saving " + strType + " files!");
        return false;
    }
    cbImg.id = "canvasimage";
    cbImg.style.border = cbCanvas.style.border;
    if (document.getElementById("canvasimage")) {
        var cbOldImg = document.getElementById("canvasimage");
        cbCanvas.parentNode.replaceChild(cbImg, cbOldImg);
    } else {
        cbCanvas.parentNode.appendChild(cbImg);
    }

}


function convertToPdf(strType) {
    if (strType === "PDF") {
        var cbImg = document.getElementById("canvasimage");
        var doc = new jsPDF('p', 'mm');
        doc.addImage(cbImg, 'PNG', 10, 10);
        doc.save('sample-file.pdf');

    }
}

document.getElementById("convertpngbtn").onclick = function () {
    convertCanvas("PNG");
};
document.getElementById("convertpdfbtn").onclick = function () {
    convertToPdf("PDF");
};

document.getElementById("resetbtn").onclick = function () {
    cbCtx.clearRect(0, 0, cbCtx.canvas.width, cbCtx.canvas.height);
    cbCtx.drawImage(img, 0, 0);
    cbCtx.beginPath();
    convertCanvas("PNG");
};