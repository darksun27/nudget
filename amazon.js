let amazon_priceblock = document.getElementById('price');
let location_href = document.location.href;
let glimit = 100;
let costprice = null;
let qtyElem = null;
let qty = 1;
let cp = null;
window.chrome.storage.sync.get('limit', (items) => {
    if(!items.limit) {

    } else {
        glimit = items.limit;
    }
})

window.onbeforeunload = () => {
    window.chrome.storage.sync.set({'outlookappear': true})
    return undefined;
}

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
                chrome.storage.sync.set({'cost':parseFloat(cp)*qty});
                window.chrome.runtime.sendMessage({
                    action: "add"
                });
            }            
        })
    }
}