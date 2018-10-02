String.prototype.ucfirst = function() {
    return this.slice(0, 1).toUpperCase() + this.slice(1).toLowerCase();
}

console.log("hello world".ucfirst());

String.prototype.capitalize = function() {
    return this.split(" ").map(s => {
        return s.ucfirst();
    }).join(" ");
}

console.log("hello world".capitalize());

String.prototype.camelCase = function() {
    return this.capitalize().replace(/ /g, "");
}

console.log("hello world".camelCase());

String.prototype.snake_case = function() {
    return this.capitalize().toLowerCase().replace(" ", "_");
}

console.log("hello world".snake_case());

String.prototype.leet = function() {
    return this.replace(/a/ig, "4").replace(/e/ig, "3").replace(/i/ig, "1").replace(/o/ig, "0").replace(/u/ig, "(_)").replace(/y/ig, "7");
}

console.log("hello world".leet());

var prairie = {
    animal: {
        type: {
            name: "anaconda"
        }
    }
}

Object.prototype.prop_access = function(str) {
    let obj = this;
    str.split('.').map(s => {
        if (this.hasOwnProperty(s)) {
            obj = obj[s];
            str = s;
        }
    });
    return obj;
}

console.log(prairie.prop_access("animal.type.name"));

String.prototype.verlan = function() {
    return this.split(" ").map(s => {
        return s.split("").reverse().join("");
    }).join(" ");
}

console.log("hello world".verlan());

String.prototype.yoda = function() {
    return this.split(" ").reverse().join(" ");
}

console.log("hello world".yoda());

String.prototype.vig = function(str2) {
    var i = 0, b, result;
    str2 = str2.toUpperCase().replace(/[^A-Z]/g, '');
    result = this.toUpperCase().replace(/[^A-Z]/g, '').replace(/[A-Z]/g, function(a) {
        b = str2[i++ % str2.length];
        return String.fromCharCode((((a.charCodeAt(0) - 65) + (b.charCodeAt(0) - 65)) % 26 + 65));
    });
    return result.toLowerCase();
}

console.log("wikipedia".vig("crypto"));