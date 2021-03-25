window.chrome.storage.sync.get('progress', (items) => {
    let progress2 = items.progress;
    if(!items.progress) {
        progress2 = 0;
    }
    if(!amazon_priceblock) {
        let popup = document.createElement("DIV");
        popup.id = "top-nudget";
        popup.title = "";
        popup.innerHTML = `
        <div class="ui segment">
            <div class="ui right aligned">
                <i class="close icon" id="hide"></i>
            </div>
            <div class="ui verical segment">
                <h4 class="ui center aligned header">
                Looks like you are on a shopping website.
                You might want to have a look at your budget limit before proceeding.
                </h4>
            </div>
            <div class="ui center aligned verical segment">
                <h5 class="ui header">Your current budget outlook:</h4>
                <div class="ui progress2" id="status">
                    <div class="bar">
                        <div class="progress2"></div>
                    </div>
                    <div class="label"></div>
                </div>
            </div>
        </div>`;
        
        document.body.appendChild(popup);

        $(document).ready(() => {
            $('#exploring, #essentials, #hide').click(() => {
                $('#top-nudget').hide();
                window.chrome.storage.sync.set({'outlookappear': false});
            })
            $('#save').click(() => {
                window.location.replace('https://forge.medium.com/8-money-experts-on-how-to-curb-an-online-shopping-habit-5fb9dc06d0b7')
            })
            $('#status').progress2({
                percent: (progress2/glimit) * 100 <= 100 ?
                        (progress2/glimit) * 100: 100,
                text: {
                    active:progress2 +" / "+glimit + ' consumed',
                    error: "You are overbudget"
                }
            });

            if((progress2/glimit)*100 > 100) {
                $('#status').progress2('set error');
            }

            else if($('#status').progress2('get percent') > 80) {
                $('#status').addClass('red').removeClass('green yellow')
            }
            
            else if($('#status').progress2('get percent') > 50) {
                $('#status').addClass('yellow').removeClass('green red')
            }
            
            else {
                $('#status').addClass('green').removeClass('yellow red')
            }
        })
    }
});
