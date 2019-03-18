(function() {
    window.onload = function() {
        var peer_el = document.getElementById('peerid');
        var peer = new Peer({});
        peer.on('open', function (id) {
            console.log('peer open');
            peer_el.textContent = window.location.host + "/record.html#" + id;
        });
        peer.on('call', function(call) {
            console.log('Answer call');
            call.answer();

            call.on('stream', function(stream) {
                var videoContainer = document.querySelector('#video');
                if(videoContainer) {
                    try {
                        videoContainer.srcObject = stream;
                    } catch (error) {
                        videoContainer.src = URL.createObjectURL(stream);
                    }
                    videoContainer.play();
                }
            });
            call.on('close', function () {
                console.log('call close');
                call = null;
            });
        });

        peer.on('connection', function(c) {
            console.log('peer connection');
        });

        peer.on('error', function (err) {
            console.log('peer error');
            if (err.type === 'unavailable-id') {
                alert('' + err);
                peer.reconnect();
            }
            else
                alert('' + err);
        });

        peer.on('disconnected', function () {
            console.log("Connection has been lost.");
            peer.reconnect();
            call = null;
        });
    }
}());
