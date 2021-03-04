let amazon_priceblock = document.getElementById('price');
let location_href = document.location.href;
if(amazon_priceblock) {
    amazon_priceblock.innerHTML = 
        "<p>Do You Really Want to Buy this?</p>" + amazon_priceblock.innerHTML;
    let buy_now = document.getElementById('buyNow');
    if(buy_now) {
        buy_now.innerHTML += "<p>Ask yourself if you really need this!</p>";
        buy_now.addEventListener('click', (e) => {
            let costprice = document.getElementById('priceblock_ourprice');
            let cp = "";
            costprice.innerText.split('').forEach((num) => {
                if(Number.isInteger(parseInt(num)) || num == '.') {
                    cp+=num;
                }
            })
            let response = confirm("Do you really want to buy this?");
            if(response == false) {
                e.preventDefault();
                window.location.replace(location_href);
            } else {
                chrome.storage.sync.set({'cost':parseFloat(cp)});
                window.chrome.runtime.sendMessage({
                    action: "add"
                });
            }
        })
    }
}