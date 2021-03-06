let glimit = 0;

window.chrome.storage.sync.get('progress', (items) => {
    if(!items.progress) {
        window.chrome.storage.sync.set({'progress':0});
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
            $('#status').progress({
                percent: ((items.progress/glimit)*100 > 100 ? 100: (items.progress/glimit)*100),
                text: {
                    active: (Math.round(((items.progress/glimit)*100)*100)/100).toString() + '% budget consumed',
                    error: "You are overbudget"
                }
            });
            if((items.progress/glimit)*100 > 100) {
                $('#status').progress('set error');
            }
            else if($('#status').progress('get percent') > 80) {
                $('#status').addClass('red').removeClass('green yellow')
            } else if($('#status').progress('get percent') > 50) {
                $('#status').addClass('yellow').removeClass('green red')
            } else {
                $('#status').addClass('green').removeClass('yellow red')
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
    $('#climitbtn').click(() => {
        let limit = document.getElementById('climit').value;
        let reason = document.getElementById('r').value
        if(limit > 0 && reason) {
            window.chrome.storage.sync.set({'limit': limit}, () => {
                document.getElementById('goal').style.display = "block";
                document.getElementById('setgoal').style.display = "none";
                document.getElementById('reason').style.display = "none";
                location.reload();
            });
        }
    })

    $('#cg').click(() => {
        document.getElementById('goal').style.display = "none";
        document.getElementById('setgoal').style.display = "none";
        document.getElementById('reason').style.display = "block";
        let limit = document.getElementById('climit').placeholder=glimit;
    })
})