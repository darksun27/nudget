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
            console.log(items.progress)
            let progress_bar = document.getElementById('status');
            progress_bar.value = items.progress;
            progress_bar.max = glimit;
            let bar_text = document.getElementById('bartext');
            bar_text.innerText = (items.progress).toString() + '/' + glimit.toString();
            let ug = document.getElementById('ug');
            ug.innerText = glimit.toString();
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
    })
})