// Tag and attributes 
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const PTAG = 'area';
const DESC = 'description';
const TYPE = 'type';
const TYPES = [
    'region',
    'public-district',
    'metropolitan',
    'location'
];

// Types html formating
let typeToHtnl = {
    'region': 'h1',
    'public-district': 'h2',
    'metropolitan': 'strong',
    'location': 'strong'
}

function WrapInTag(contentStr, htmlTag) {
    let wrapper = '';
    wrapper = document.createElement(htmlTag);
    wrapper.innerHTML = contentStr;
    return wrapper.outerHTML;
}

function getDate(date) {
    let _date = new Date(date);
    let dw = DAYS[_date.getDay()];
    let dd = _date.getDay();
    let dm = MONTHS[_date.getMonth()];
    return dw + ' ' + dd + ' ' + dm
}

function CreateTableCells(xml) {
    let i, day = '', htm = '';
    for (i = 0; i < xml.length; i++) {
        if (xml[i].childElementCount <= 0) {
        } else {
            if ((day = xml[i].getAttribute('start-time-local')) != undefined) {
                console.log(xml[i]);
                htm += '<td><strong>' + getDate(day) + '</strong><br>' + xml[i].textContent + '<td>';
            }
        }
    }
    return htm;
}

export function CreateFromXml(dataXML) {
    let i, type, typeDesc, temp;
    let html = '', row = '';

    // Grab tag of interest
    var xml = dataXML.getElementsByTagName(PTAG);

    for (i = 0; i < xml.length; i++) {
        type = xml[i].getAttribute(TYPE);
        typeDesc = xml[i].getAttribute(DESC);
        // console.log(xml[i].children);

        if (xml[i].childElementCount == 0) {
            // If no children
            html += WrapInTag(typeDesc, typeToHtnl[type]);
        } else {
            row = '<tr>' + WrapInTag(typeDesc, 'th') + CreateTableCells(xml[i].children) + '</tr>';
            html += WrapInTag(row, 'table');
        }
    }
    return html;
}