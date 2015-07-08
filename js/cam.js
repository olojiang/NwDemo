/**
 * Created by Hunter on 4/15/2015.
 */
$(function(){
    // Video
    function onSuccess(stream){
        $('#cam').attr("src", URL.createObjectURL(stream));
    }

    function onFail() {
        alert('can not connect to camara stream.');
    }

    if(navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia({video: true}, onSuccess, onFail);
    } else {
        alert('webRTC is not available.');
    }

    // Take photo from cam
    $('#take').unbind().on('click', function(){
        var c = $('#photo')[0];
        var v = $('#cam')[0];
        c.getContext('2d').drawImage(v, 0, 0, 320, 240);
    });

    var filters = $('#filters');
    var filterStrings = ['grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate', 'saturate', 'invert'];

    for(var i = 0, len = filterStrings.length; i < len; i++) {
        var f = filterStrings[i];
        $('<span></span>').text(f).data('d', f).addClass('filter').appendTo(filters);
    }
    var existingClass = '';
    filters.on('click', 'span', function(evt){

        var target = $(evt.currentTarget);
        var cam = $('#cam');
        if(existingClass) {
            cam.removeClass(existingClass);
        }
        var newClass = target.data('d');
        cam.addClass(newClass);

        existingClass = newClass;
    });
});