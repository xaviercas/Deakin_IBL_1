import * as table from "./table.js"

window.onload = function () {
    var bomXml, htmlResult;
    var myhttp = new XMLHttpRequest();

    myhttp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            console.log("I am ready");
            bomXml = this.responseXML;
            htmlResult = table.CreateFromXml(bomXml);
            document.getElementById('result').innerHTML = htmlResult;
        } else {
            console.log("Oooops");
        }
    };

    // myhttp.open('GET', 'IDV10752.xml', true);
    myhttp.open('GET', 'data/IDV10752.xml', true);
    myhttp.responseType = 'document';
    myhttp.send();

};

