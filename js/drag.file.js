/**
 * Created by Hunter on 4/13/2015.
 */
var fs = require('fs');

$(function(){
    /**
     * Stop window to accept the drag event by default
     */
    window.ondragover = function(e) {
        e.preventDefault();
        return false;
    };
    window.ondrop = function(e) {
        e.preventDefault();
        return false;
    };

    var target = document.getElementById('dragTarget');
    var contentContainer = document.getElementById('fileContent');
    target.ondragover = function() {
        $(this).addClass('hover');
    };

    target.ondragrelease = function() {
        $(this).removeClass('hover');
    };

    target.ondrop = function(e) {
        var files = e.dataTransfer.files;
        console.info("files:", files);
        var file = null;
        var path = null;
        var content = null;

        for(var i = 0, len = files.length; i < len; i++) {
            file = files[i];
            path = file.path;
            content = fs.readFileSync(path);

            target.innerHTML = path;
            contentContainer.innerHTML = content.toString().replace(/\n/g, '<br/>');
        }

        e.preventDefault();
        return false;
    };
});