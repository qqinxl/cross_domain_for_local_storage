var RallyServer = function(option) {

    var whitelist = [];

    if (option && option.whitelist) {
        whitelist = option.whitelist;
    }

    var verifyOrigin = function(origin) {
        var domain = origin.replace(/^https?:\/\/|:\d{1,4}$/g, "").toLowerCase(),
        i = 0,
        len = whitelist.length;

        while(i < len){
            if (whitelist[i] == domain){
                return true;
            }
            i++;
        }

        return false;
    };

    var handleRequest = function(event) {
        if (verifyOrigin(event.origin)){
            var data = JSON.parse(event.data);
            var value = data.value;

            if (value === undefined) {
                value = localStorage.getItem(data.key);
            } else {
                localStorage.setItem(data.key, value);
            }

            event.source.postMessage(JSON.stringify({id: data.id, key:data.key, value: value}), event.origin);
        }
    };

    var handleStorage = function(e) {
        if (!e) { e = window.event; }
    };

    if(window.addEventListener){
        window.addEventListener("message", handleRequest, false);
        window.addEventListener("storage", handleStorage, false);
    } else if (window.attachEvent){
        window.attachEvent("onmessage", handleRequest);
        window.attachEvent("onstorage", handleStorage);
    }
};

RallyServer.prototype = {
    items: function() {
        var arr = [];
        for (var i=0, l=localStorage.length; i<l; i++){
            var key = localStorage.key(i);
            var value = localStorage[key];
            arr[i] = key + "=" + value;
        }
        return arr.join(", ");
    },
    clearAll: function() {
        localStorage.clear();
    },
};