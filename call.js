var call = (function() {
    var run = function() {
        const connectid = window.location.hash.substr(1);
        console.log(connectid);

        var session = {
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: false,
            },
            video: true
        };
        var userMedia = navigator.mediaDevices.getUserMedia(session);
        userMedia.then(function(stream) {
            var peer = new Peer();
            peer.on('open', function (id) {
                console.log('ID: ' + id);
            });
            call = peer.call(connectid, stream);
            call.on('open', function(){
                console.log('call open');
            });
            call.on('error', function() {
                console.log('call error');
            });
        });
    }

    return { run: run }
}());
