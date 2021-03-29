chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "sendMessageBudget"){
        window.chrome.storage.sync.get('userID', (items) => {
            if(items.userID) {
                fetch(`
                https://fate-warm-interest.glitch.me/save?userID=${items.userID}&action=change-budget&reason=${request.reason}&prevLimit=${request.prevLimit}&changeLimit=${request.changeLimit}`).then((response) => {window.location.reload()});
                chrome.tabs.query({url:["*://*.amazon.in/*", "*://*.amazon.com/*"]}, (tabs) => {
                    tabs.forEach(tab => {
                        chrome.tabs.sendMessage(tab.id, {action: "reload", value: tabs}); 
                    });
                });
            }
        })
    }
    else if(request.action == "add"){
        chrome.storage.sync.get('cost', (items) => {
            chrome.storage.sync.get('progress', (p) => {
                chrome.storage.sync.set({'progress' : p.progress+items.cost});
                window.chrome.storage.sync.get('userID', (items) => {
                    if(items.userID) {
                        fetch(`https://fate-warm-interest.glitch.me/save?userID=${items.userID}&action=buy&isEssential=${request.isEssential}&cost=${request.cost}&budgetUsed=${p.progress+request.cost}`).then((response) => {});
                    }
                })
            })
        });
    }
    else if(request.action == "show"){
        chrome.browserAction.setPopup({popup:"notification.html"});
    }
})