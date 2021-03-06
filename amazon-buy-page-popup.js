window.chrome.storage.sync.get('progress', (items) => {
    let progress2 = items.progress;
    if(!items.progress) {
        progress2 = 0;
    }
    if(amazon_priceblock) {
        let safeZoneNudges = ['Hey looks like you are on a product page! Here is an overview of your budget.'];
        let transitionZoneNudges = ['Hey looks like you are on a product page! You have already spent more that 50% of your budget!'];
        let dangerZoneNudges = ['Hey looks like you are on a product page! You are close to reaching your budget, are you sure you need to buy this?'];
        let overbudgetNudges = ['Hey looks like you are on a product page! You have already exceeded your budget; you can change the budget, but should you?'];
        let popup = document.createElement("DIV");
        console.log(amazon_priceblock);
        popup.id = "top-nudget";
        popup.title = "";
        popup.innerHTML = `
        <div class="ui segment">
            <div class="ui left aligned">
                <h5 id="hide" class="ui header" style="cursor:pointer;max-width:15px;">X</h5>
            </div>
            <div class="ui verical segment">
                <h4 id="nudge" class="ui center aligned header">Hey! It looks like you are going to buy a product.</h4>
            </div>
            <div class="ui vertical segment">
                <div class="ui segment">
                    <h5 class="ui left aligned header">Your current budget outlook:</h5>
                    <div class="ui progress2" id="status">
                        <div class="bar">
                            <div class="progress2"></div>
                        </div>
                        <div class="label"></div>
                    </div>
                </div>
                <div class="ui segment">
                    <h5 class="ui left aligned header">After this purchase, your outlook would be:</h5>
                    <div class="ui progress2" id="status2">
                        <div class="bar">
                            <div class="progress2"></div>
                        </div>
                        <div class="label"></div>
                    </div>
                </div>
            </div>
            <div class="ui vertical segment center aligned">
                <button id="okay" class="ui primary button mini mb">
                    OKAY
                </button>
                <button id="essential" class="ui primary button mini mb">
                    This is an essential purchase
                </button>
            </div>
        </div>`;
        $(document).ready(() => {
            $('#top-nudget').draggable();
            $('#hide, #okay').click(() => {
                $('#top-nudget').hide();
            });
            $('#essential').click(() => {
                $('#top-nudget').hide();
                isEssential = true;
            })

            $('#save').click(() => {
                window.location.replace('https://forge.medium.com/8-money-experts-on-how-to-curb-an-online-shopping-habit-5fb9dc06d0b7')
            })

            $('#status').progress2({
                percent: (progress2/glimit) * 100 <= 100 ? (progress2/glimit) * 100: 100,
                text: {
                    active:progress2 +" / "+glimit + ' consumed',
                    error: "You are overbudget"
                }
            });
            $('#status2').progress2({
                percent: ((progress2+parseFloat(cp))/parseFloat(glimit)) * 100 <= 100 ?
                        ((progress2+parseFloat(cp))/parseFloat(glimit))*100: 100,
                text: {
                    active:progress2+parseFloat(cp) +" / "+glimit + ' consumed',
                    error: "You will be overbudget"
                }
            });

            if((progress2/glimit)*100 > 100) {
                $('#status').progress2('set error');                
            }

            else if($('#status').progress2('get percent') > 80) {
                $('#status').addClass('red').removeClass('green yellow');
            }
            
            else if($('#status').progress2('get percent') > 50) {
                $('#status').addClass('yellow').removeClass('green red');
            }
            
            else {
                $('#status').addClass('green').removeClass('yellow red');
            }
            
            if(((progress2+parseFloat(cp))/parseFloat(glimit))*100 > 100) {
                $('#status2').progress2('set error');
                $('#nudge').text(overbudgetNudges[Math.floor(Math.random()*overbudgetNudges.length)]);
            }

            else if($('#status2').progress2('get percent') > 80) {
                $('#status2').addClass('red').removeClass('green yellow');
                $('#nudge').text(dangerZoneNudges[Math.floor(Math.random()*dangerZoneNudges.length)]);
            }
            
            else if($('#status2').progress2('get percent') > 50) {
                $('#status2').addClass('yellow').removeClass('green red');
                $('#nudge').text(transitionZoneNudges[Math.floor(Math.random()*transitionZoneNudges.length)]);
            }
            
            else {
                $('#status2').addClass('green').removeClass('yellow red');
                $('#nudge').text(safeZoneNudges[Math.floor(Math.random()*safeZoneNudges.length)]);
            }
        })
        document.body.appendChild(popup);
    }
});
