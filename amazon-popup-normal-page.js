window.chrome.storage.sync.get('progress', (items) => {
    if(!amazon_priceblock) {
        let popup = document.createElement("DIV");
        popup.id = "top-nudget";
        popup.title = "";
        popup.innerHTML = `
        <div class="ui segment">
            <div class="ui verical segment">
                <h4 class="ui center aligned header">
                Looks like you are on a shopping website.
                You might want to have a look at your budget limit before proceeding.
                </h4>
            </div>
            <div class="ui center aligned verical segment">
                <h5 class="ui header">Your current budget outlook:</h4>
                <div class="ui progress" id="status">
                    <div class="bar">
                        <div class="progress"></div>
                    </div>
                    <div class="label"></div>
                </div>
            </div>
            <div class="ui center aligned verical segment">
                <button id="essentials" class="ui primary button mini mb">
                Buying Essentials
                </button>
                <button id="save" class="ui primary button mini mb">
                    Help Me!
                </button>
                <button id="exploring" class="ui primary button mini mb">
                    Just Exploring
                </button>
            </div>
        </div>`;
        document.body.appendChild(popup);

        $(document).ready(() => {
            $('#exploring, #essentials').click(() => {
                $('#top-nudget').hide();
            })
            $('#save').click(() => {
                window.location.replace('https://forge.medium.com/8-money-experts-on-how-to-curb-an-online-shopping-habit-5fb9dc06d0b7')
            })
            $('#status').progress({
                percent: (items.progress/glimit) * 100 <= 100 ?
                        (items.progress/glimit) * 100: 100,
                text: {
                    active:items.progress +" / "+glimit + ' consumed',
                    error: "You are overbudget"
                }
            });

            if((items.progress/glimit)*100 > 100) {
                $('#status').progress('set error');
            }

            else if($('#status').progress('get percent') > 80) {
                $('#status').addClass('red').removeClass('green yellow')
            }
            
            else if($('#status').progress('get percent') > 50) {
                $('#status').addClass('yellow').removeClass('green red')
            }
            
            else {
                $('#status').addClass('green').removeClass('yellow red')
            }
        })
    }
});
