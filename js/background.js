'use strict';

function handleRequest(request, sender, cb){
    chrome.tabs.sendMessage(sender.tab.id, request, cb)
}
chrome.runtime.onMessage.addListener(handleRequest);

chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.sendMessage(tab.id, {type:'toggleBar'})
})

chrome.runtime.onMessage.addListener(function(request, sender, callback){
    if(request.action == 'xhttp'){
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function(){
            callback(xhttp.responseText);
        };
        xhttp.onerror = function(){
            callback();
        }
        xhttp.open(method, request.url, true);
        if(method == 'POST'){
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
        }
        xhttp.send(request.data);
        return true;
    }
})
