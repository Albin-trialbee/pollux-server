$( document ).ready(function() {
    window.addEventListener('message', wizMessageReceiver, false);
});

function wizMessageReceiver (event) {
	$("#phonegap-msg").removeText();
   	$("#phonegap-msg").text("PHONEGAP OMG OMG OMG");
}