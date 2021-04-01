let glimit = 0;
let changeLimit = 0;

window.chrome.storage.sync.get('progress', (items) => {
    if(!items.progress) {
        window.chrome.storage.sync.set({'progress':0});
    }
})

// window.chrome.storage.sync.get('userID', (items) => {
//     if(!items.userID) {
//         let randomPool = new Uint8Array(32);
//         crypto.getRandomValues(randomPool);
//         let hex = '';
//         for (var i = 0; i < randomPool.length; ++i) {
//             hex += randomPool[i].toString(16);
//         }
//         window.chrome.storage.sync.set({'userID': hex});
//     }
// })

window.chrome.storage.sync.get('limit', (items) => {
    if(!items.limit) {

    } else {
        glimit = items.limit;
        document.getElementById('goal').style.display = "block";
        document.getElementById('setgoal').style.display = "none";
        document.getElementById('onboarding').style.display = "none";
    }
})

$(function(){
    $('#setup').click(() => {
        document.getElementById('setgoal').style.display = "block";
        document.getElementById('onboarding').style.display = "none";
    })
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
                document.getElementById('budgetNotif').style.display = 'block';
                $('#status').addClass('red').removeClass('green yellow')
                $('#ul').addClass('red').removeClass('green yellow')
            } else if($('#status').progress2('get percent') > 50) {
                document.getElementById('budgetNotif').style.display = 'none';
                $('#status').addClass('yellow').removeClass('green red')
                $('#ul').addClass('yellow').removeClass('green red')
            } else {
                document.getElementById('budgetNotif').style.display = 'none';
                $('#status').addClass('green').removeClass('yellow red')
                $('#ul').addClass('green').removeClass('yellow red')
            }
        }
    })
    $('#privacy').click(() => {
        document.getElementById('goal').style.display = "none";
        document.getElementById('setgoal').style.display = "none";
        document.getElementById('reason').style.display = "none";
        document.getElementById('changeReason').style.display = "none";
        document.getElementById('onboarding').style.display = "none";
        document.getElementById('dataP').style.display = "block"
        document.getElementById('resetP').style.display = "none";
    })
    $('#resetN').click(() => {
        document.getElementById('goal').style.display = "none";
        document.getElementById('setgoal').style.display = "none";
        document.getElementById('reason').style.display = "none";
        document.getElementById('changeReason').style.display = "none";
        document.getElementById('onboarding').style.display = "none";
        document.getElementById('dataP').style.display = "none";
        document.getElementById('resetP').style.display = "block";
    })
    $('#yes').click(() => {
        window.chrome.storage.sync.clear(() => {
            location.reload();
        })
    })
    $('#no').click(() => {
        location.reload();
    })
    $('#okay').click(() => {
        location.reload();
    })
    $('#limitbtn').click(() => {
        let limit = document.getElementById('limit').value;
        let uid = document.getElementById('uid').value;
        if(limit > 0 && uid >= 1000) {
            window.chrome.storage.sync.set({'limit': limit}, () => {
                window.chrome.storage.sync.set({'userID': uid}, () => {
                    window.chrome.runtime.sendMessage({
                        action: "sendMessageSetup",
                        reason: "Extension-Setup",
                        limit: limit
                    });
                    document.getElementById('goal').style.display = "block";
                    document.getElementById('setgoal').style.display = "none";
                    location.reload();
                })
            });
        } else {
            $('#blimitInp').addClass('error');
            $('#uidInp').addClass('error');
            document.getElementById('setupErr').style.display="block";
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
        if(changeLimit > 0 && reason) {
            window.chrome.runtime.sendMessage({
                action: "sendMessageBudget",
                reason: reason,
                prevLimit: glimit,
                changeLimit: changeLimit
            });
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