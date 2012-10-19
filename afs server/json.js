if (typeof window.JSON !== 'object') {
    window.JSON = {};
}

if (typeof JSON.stringify !== 'function') {
    JSON.stringify = function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
 
            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
}

if (typeof window.JSON.parse !== 'function') {
    window.JSON.parse = function (data) {
        if ( typeof data !== "string" || !data ) {
            return null;
        }
        //data = data.trim();
        data = data.replace(/^\s+|\s+$/g, '');

        var rvalidchars = /^[\],:{}\s]*$/;
        var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
        // Make sure the incoming data is actual JSON
        // Logic borrowed from http://json.org/json2.js
        if ( rvalidchars.test( data.replace( rvalidescape, "@" )
            .replace( rvalidtokens, "]" )
            .replace( rvalidbraces, "")) ) {

            return ( new Function( "return " + data ) )();

        }
        throw new Error("Unsupported browser.");
    }
}
