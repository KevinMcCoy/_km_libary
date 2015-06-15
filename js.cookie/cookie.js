var cookie = function () {
  return cookie.get.apply(cookie, arguments);
};

cookie.set = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    return this;
}

cookie.get = function(cname) {
  if(!cname){ //Get All Cookies
    if (document.cookie === '') return {};

    var cookies = document.cookie.split('; '),
        result = {};

    for (var i = 0, l = cookies.length; i < l; i++) {
      var item = cookies[i].split('=');
      result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
    }
    return result;

  }else{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return true;
  }
}

cookie.delete = function(cname) {
  if(!cname){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    return true;
  }else{
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return true;
  }
}
