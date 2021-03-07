let amazon_priceblock = document.getElementById('price');
let location_href = document.location.href;
if(amazon_priceblock) {
    let popup = document.createElement("DIV");
    popup.id = "top-nudget";
    popup.title = "";
    popup.innerHTML = `
        <div class="ui verical segment">
            <h1 class="ui center aligned header">Nudget</h1>
        </div>
        <div id="setgoal">
            <div class="ui secondary segment center aligned vertical">
            <h3 class="ui center aligned header">Set Maximum Limit</h3>
            <div class="ui container">
                This would cost you so much money!!!!
                <button onclick="func()" class="ui primary button" id="limitbtn">
                    I am just Exploring
                </button>
                <button onclick="cl()">
                No Close this Tab
                </button>
            </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    var newScript = document.createElement("script");
    var inlineScript = document.createTextNode(`const func = () => {document.getElementById('top-nudget').style.visibility="hidden";}`);
    newScript.appendChild(inlineScript); 
    document.body.appendChild(newScript);
    amazon_priceblock.innerHTML = 
        "<p>Do You Really Want to Buy this?</p>" + amazon_priceblock.innerHTML;
    let buy_now = document.getElementById('buyNow');
    if(buy_now) {
        buy_now.innerHTML += "<p>Ask yourself if you really need this!</p>";
        buy_now.addEventListener('click', (e) => {
            let costprice = document.getElementById('priceblock_ourprice');
            let qty = document.querySelector('[id=quantity][data-action*="a-dropdown-select"]').value;
            let cp = "";
            costprice.innerText.split('').forEach((num) => {
                if(Number.isInteger(parseInt(num)) || num == '.') {
                    cp+=num;
                }
            });
            let response = confirm("Do you really want to buy this?");
            if(response == false) {
                e.preventDefault();
                popup.style.visibility = 'hidden';
            } else {
                chrome.storage.sync.set({'cost':parseFloat(cp)*qty});
                window.chrome.runtime.sendMessage({
                    action: "add"
                });
            }            
        })
    }
}