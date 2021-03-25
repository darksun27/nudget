chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "show"){
        chrome.browserAction.setPopup({popup:"notification.html"});
    }
})
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "add"){
        chrome.storage.sync.get('cost', (items) => {
            chrome.storage.sync.get('progress', (p) => {
                chrome.storage.sync.set({'progress' : p.progress+items.cost});
            })
        });
    }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "sendMessage"){
        window.chrome.storage.sync.get('userID', (items) => {
            if(items.userID) {
                fetch(`https://fate-warm-interest.glitch.me/save?userID=${request.value}&feedback="where"`).then((response) => {});
            }
        })
    }
})