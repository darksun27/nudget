window.chrome.storage.sync.get('progress', (items) => {
    if(amazon_priceblock) {
        let popup = document.createElement("DIV");
        popup.id = "top-nudget";
        popup.title = "";
        popup.innerHTML = `
        <div class="ui segment">
            <div class="ui verical segment">
                <h4 class="ui center aligned header">Hey! It looks like you are going to buy a product.</h4>
            </div>
            <div class="ui vertical segment">
                <div class="ui segment center aligned vertical">
                    <h5 class="ui left aligned header">Your current budget outlook:</h5>
                    <div class="ui progress" id="status">
                        <div class="bar">
                            <div class="progress"></div>
                        </div>
                        <div class="label"></div>
                    </div>
                </div>
                <div class="ui segment center aligned vertical">
                    <h5 class="ui left aligned header">After this purchase, your outlook would be:</h5>
                    <div class="ui progress" id="status2">
                        <div class="bar">
                            <div class="progress"></div>
                        </div>
                        <div class="label"></div>
                    </div>
                </div>
            </div>
            <div class="ui vertical segment center aligned">
                <button id="essential" class="ui primary button mini mb">
                    This is an essential purchase
                </button>
                <button id="save" class="ui primary button mini mb">
                    Help me save!
                </button>
            </div>
        </div>`;
        $(document).ready(() => {
            $('#essential').click(() => {
                $('#top-nudget').hide();
            });

            $('#save').click(() => {
                window.location.replace('https://forge.medium.com/8-money-experts-on-how-to-curb-an-online-shopping-habit-5fb9dc06d0b7')
            })

            $('#status').progress({
                percent: (items.progress/glimit) * 100 <= 100 ? (items.progress/glimit) * 100: 100,
                text: {
                    active:items.progress +" / "+glimit + ' consumed',
                    error: "You are overbudget"
                }
            });
            $('#status2').progress({
                percent: ((items.progress+parseFloat(cp))/parseFloat(glimit)) * 100 <= 100 ?
                        ((items.progress+parseFloat(cp))/parseFloat(glimit))*100: 100,
                text: {
                    active:items.progress+parseFloat(cp) +" / "+glimit + ' consumed',
                    error: "You will be overbudget"
                }
            });

            if((items.progress/glimit)*100 > 100) {
                $('#status').progress('set error');
            }

            else if($('#status').progress('get percent') > 80) {
                $('#status').addClass('red').removeClass('green yellow');
            }
            
            else if($('#status').progress('get percent') > 50) {
                $('#status').addClass('yellow').removeClass('green red');
            }
            
            else {
                $('#status').addClass('green').removeClass('yellow red');
            }
            
            if(((items.progress+parseFloat(cp))/parseFloat(glimit))*100 > 100) {
                $('#status2').progress('set error');
            }

            else if($('#status2').progress('get percent') > 80) {
                $('#status2').addClass('red').removeClass('green yellow');
            }
            
            else if($('#status2').progress('get percent') > 50) {
                $('#status2').addClass('yellow').removeClass('green red');
            }
            
            else {
                $('#status2').addClass('green').removeClass('yellow red');
            }
        })
        document.body.appendChild(popup);
    }
});
