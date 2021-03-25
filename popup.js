let glimit = 0;
let changeLimit = 0;

window.chrome.storage.sync.get('progress', (items) => {
    if(!items.progress) {
        window.chrome.storage.sync.set({'progress':0});
    }
})

window.chrome.storage.sync.get('userID', (items) => {
    if(!items.userID) {
        let randomPool = new Uint8Array(32);
        crypto.getRandomValues(randomPool);
        let hex = '';
        for (var i = 0; i < randomPool.length; ++i) {
            hex += randomPool[i].toString(16);
        }
        window.chrome.storage.sync.set({'userID': hex});
    }
})

window.chrome.storage.sync.get('limit', (items) => {
    if(!items.limit) {

    } else {
        glimit = items.limit;
        document.getElementById('goal').style.display = "block";
        document.getElementById('setgoal').style.display = "none";
    }
})

$(function(){
    window.chrome.storage.sync.get('progress', (items) => {
        if(items.progress >= 0) {
            let ug = document.getElementById('ug');
            ug.innerText = glimit.toString();
            $('#status').progress2({
                percent: ((items.progress/glimit)*100 > 100 ? 100: (items.progress/glimit)*100),
                text: {
                    active: items.progress +" / "+glimit + ' consumed',
                    error: "You are overbudget"
                }
            });
            if((items.progress/glimit)*100 > 100) {
                $('#status').progress2('set error');
            }
            else if($('#status').progress2('get percent') > 80) {
                $('#status').addClass('red').removeClass('green yellow')
                $('#ul').addClass('red').removeClass('green yellow')
            } else if($('#status').progress2('get percent') > 50) {
                $('#status').addClass('yellow').removeClass('green red')
                $('#ul').addClass('yellow').removeClass('green red')
            } else {
                $('#status').addClass('green').removeClass('yellow red')
                $('#ul').addClass('green').removeClass('yellow red')
            }
        }
    })

    $('#limitbtn').click(() => {
        let limit = document.getElementById('limit').value;
        if(limit > 0) {
            window.chrome.storage.sync.set({'limit': limit}, () => {
                document.getElementById('goal').style.display = "block";
                document.getElementById('setgoal').style.display = "none";
                location.reload();
            });
        }
    })
    $('#cr, input[name="fruit"]').click(() => {
        let reason = $('#cr').find('[name="fruit"]:checked').val();
        if(reason == 'others') {
            $('#oth').removeAttr('disabled');
            $('#oth').focus();
        } else{
            $('#oth').attr('disabled');
        }
    })
    $('#climitbtn').click(() => {
        let reason = $('#cr').find('[name="fruit"]:checked').val();
        if(reason == "others") {
            reason = $('#oth').val();
        }
        window.chrome.runtime.sendMessage({
            action: "sendMessage",
            value: reason
        });
        if(changeLimit > 0 && reason) {
            window.chrome.storage.sync.set({'limit': changeLimit}, () => {
                document.getElementById('goal').style.display = "block";
                document.getElementById('setgoal').style.display = "none";
                document.getElementById('reason').style.display = "none";
                location.reload();
            });
        }
    })
    $('#confirmbtn').click(() => {
        changeLimit = document.getElementById('climit').value;
        if(changeLimit > 0) {
            document.getElementById('goal').style.display = "none";
            document.getElementById('setgoal').style.display = "none";
            document.getElementById('reason').style.display = "none";
            document.getElementById('changeReason').style.display = "block";
        } else {
            $('#limitInp').addClass('error');
            document.getElementById('inpl').style.display="block";
        }
    })

    $('#cg').click(() => {
        document.getElementById('goal').style.display = "none";
        document.getElementById('setgoal').style.display = "none";
        document.getElementById('reason').style.display = "block";
        document.getElementById('climit').placeholder=glimit;
    })
    $('#cancel').click(() => {
        document.getElementById('goal').style.display = "block";
        document.getElementById('setgoal').style.display = "none";
        document.getElementById('reason').style.display = "none";
        document.getElementById('changeReason').style.display = "none";
        document.getElementById('climit').placeholder=glimit;
    })
    $('.ui.radio.checkbox').checkbox();
    $('#cancelR').click(() => {
        document.getElementById('goal').style.display = "block";
        document.getElementById('setgoal').style.display = "none";
        document.getElementById('reason').style.display = "none";
        document.getElementById('changeReason').style.display = "none";
        document.getElementById('climit').placeholder=glimit;
    })
})