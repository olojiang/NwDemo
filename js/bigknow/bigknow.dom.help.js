
function DomHelp (){

    this.getCheckBox = function(value,css,other) {
        return this.getInput("checkbox",value,css,other);
    };
    this.getTable =function (value,css,other){
        return this.getDom("table",value,css,other);
    };
    this.getTr =function (value,css,other){
        return this.getDom("tr",value,css,other);
    };
    this.getTD =function (value,css,other){
        return this.getDom("td",value,css,other);
    };
    this.getTH =function (value,css,other){
        return this.getDom("th",value,css,other);
    };
    this.getThead =function (value,css,other){
        return this.getDom("thead",value,css,other);
    };
    this.getTbody =function (value,css,other){
        return this.getDom("tbody",value,css,other);
    };
    this.getLi =function (value,css,other){
        return this.getDom("li",value,css,other);
    };
    this.getSpan =function (value,css,other){
        return this.getDom("span",value,css,other);
    };
    this.getI =function (value,css,other){
        return this.getDom("i",value,css,other);
    };
    this.getA =function (value,css,other){
        return this.getDom("a",value,css,other);
    };
    this.getUl =function (value,css,other){
        return this.getDom("ul",value,css,other);
    };
    this.getDiv =function (value,css,other){
        return this.getDom("div",value,css,other);
    };
    this.getInput =function (type,value,css,other){
        return this.getDom("input",value,css,this.getDomAttr("type",type)+other);
    };
    this.getDom= function (dom,value,css,other) {
        if(dom==null)return;
        var html ="<"+dom +" "+this.getDomAttr("class",css);
        if(value==null)value="";
        if(other==null)other="";
        html+=other;
        html+=">"+value+"</"+dom+">";
        return html;
    };

    this.getDomAttr =function (name,value){
        if(value==null||value==="")return "";
        return name+"=\""+value+"\"";
    };

    this.endWith =function (s1,s2) {
        if(s1==null)return false;
        if(s2==null)return false;
        if(s1.length<s2.length)
            return   false;
        if(s1==s2)
            return   true;
        if(s1.substring(s1.length-s2.length)==s2)
            return   true;
        return   false;
    };
}

/**
 * Add button and a span to UI
 * @param parentDom
 * @param spanId
 * @param text
 * @param callBack
 */
//addButton($('body')/*parentDom*/, 'span12'/*spanId*/, 'Get window info'/*buttonText*/, function () {
//
//    $('#span12').text("test");
//});
//addButton($('body')/*parentDom*/, null/*spanId*/, 'Get window info'/*buttonText*/, function () {
//
//    $('#span12').text("test");
//});
function addButton(parentDom, spanId/*Optional*/, text, callBack) {
    var p = $('<span style="display: inline-block; padding: 5px"></span>').appendTo(parentDom);

    if(spanId) {
        var span = $('<span style="display: inline-block; padding: 5px"></span>').appendTo(p);
        span.attr('id', spanId);
    }

    $('<button type="button" class="btn"></button>')
        .text(text)
        .on('click', callBack)
        .appendTo(p);
}