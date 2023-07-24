// Global
var siteName = document.getElementById('siteName');
var siteLink = document.getElementById('siteLink');
var btn = document.getElementById('btn');
var tableContent = document.getElementById('tableContent');
var nameRules = document.getElementById('nameRules');
var linkRules = document.getElementById('linkRules');


// onclick
btn.onclick = function () {
    submitFun()
}

// store
var siteArr;
if (localStorage.getItem('list')) {
    siteArr = JSON.parse(localStorage.getItem('list'));
    display();
}
else {
    siteArr = [];
}

// submit
function submitFun() {
    if (siteNameRegex()) {
        nameRules.innerHTML='';
    }
    if(siteLinkRegex) {
        linkRules.innerHTML='';
    }
    if (siteNameRegex() && siteLinkRegex()) {
        var site = {
            name: siteName.value,
            link: siteLink.value
        }
        siteArr.push(site);
        localStorage.setItem('list', JSON.stringify(siteArr));
        display();
        clear();
    }
    else {
        notValid();
    }
}

// display
function display() {
    var box = ``;
    for (var i = 0; i < siteArr.length; i++) {
        box += `
       <tr>
       <td>${i + 1}</td>
       <td class="text-capitalize">${siteArr[i].name}</td>
       <td>
        <button class="btn btn-visit">
          <a href="http://${siteArr[i].link}" target="_blank" class="text-white text-decoration-none">
          <i class="fa-solid fa-eye pe-md-1" style="color: #ffffff;"></i>
          Visit</a>
        </button>
       </td>
       <td><button class="btn btn-delete" onclick="deleteFun(${i})">
       <i class="fa-solid fa-trash-can pe-md-1" style="color: #ffffff;"></i>
       Delete</button></td>
       </tr>
       `
    }
    tableContent.innerHTML = box;
}

// clear
function clear() {
    siteName.value = '';
    siteLink.value = '';
}

// Delete
function deleteFun(index) {
    siteArr.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(siteArr));
    display();
}


// Validation
function siteNameRegex() {
    var regex = /^\w{3,}$/
    return (regex.test(siteName.value));
}

function siteLinkRegex() {
    var regex = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/
    return (regex.test(siteLink.value));
}

function notValid() {
    if (!siteNameRegex()) {
        if (siteName.value == '') {
            nameRules.innerHTML = 'Site name is requred.'
        }
        else {
            nameRules.innerHTML = 'Not match, Site name must contain at least 3 characters.'
        }
    } else if (!siteLinkRegex()) {
        if (siteLink.value == '') {
            linkRules.innerHTML = 'Website URL is requred.'
        }
        else {
            linkRules.innerHTML = 'Not match, Site URL must be a valid one. <br> Note: Do not start with http:// or https:// .'
        }
    }
}

