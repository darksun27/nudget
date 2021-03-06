let amazon_priceblock = document.getElementById('price');
let location_href = document.location.href;
let glimit = 100;
let costprice = null;
let qtyElem = null;
let qty = 1;
let cp = null;
let isEssential = false;
window.chrome.storage.sync.get('limit', (items) => {
    if(!items.limit) {

    } else {
        glimit = items.limit;
    }
})
window.chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "reload"){
        window.location.reload();
    }
})

if(amazon_priceblock) {
    costprice = document.getElementById('priceblock_ourprice');
    if(!costprice) {
        costprice = document.getElementById('priceblock_dealprice');
    }
    qtyElem = document.querySelector('[id=quantity][data-action*="a-dropdown-select"]');
    qty = 1;
    if(qtyElem) {
        qty = qtyElem.value;
    }
    cp = "";
    console.log(costprice);
    console.log(isEssential);
    costprice.innerText.split('').forEach((num) => {
        if(Number.isInteger(parseInt(num)) || num == '.') {
            cp+=num;
        }
    });
    amazon_priceblock.innerHTML = 
        "<h4>Do I Really Want to Buy this?</h4>" + amazon_priceblock.innerHTML;
    let buy_now = document.getElementById('buyNow');
    if(buy_now) {
        buy_now.innerHTML += "<h4>Ask yourself if I really need this!</h4>";
        buy_now.addEventListener('click', (e) => {
            let response = confirm("Do you really want to buy this?");
            if(response == false) {
                console.log(cp);
                e.preventDefault();
            } else {
                chrome.storage.sync.set({'cost':isEssential ? 0 : parseFloat(cp)*qty});
                window.chrome.runtime.sendMessage({
                    action: "add",
                    cost:parseFloat(cp)*qty,
                    isEssential: isEssential
                });
            }            
        })
        isEssential = false;
    }
}