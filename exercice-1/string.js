function ucfirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(ucfirst("hello world"));

function capitalize(str) {
    return str.split(" ").map(s => {
        return ucfirst(s);
    }).join(" ");
}

console.log(capitalize("hello world"));

function camelCase(str) {
    return capitalize(str).replace(/ /g, "");
}

console.log(camelCase("hello world"));

function snake_case(str) {
    return capitalize(str).toLowerCase().replace(" ", "_")
}

console.log(snake_case("hello world"));

function leet(str) {
    return str.replace(/a/ig, "4").replace(/e/ig, "3").replace(/i/ig, "1").replace(/o/ig, "0").replace(/u/ig, "(_)").replace(/y/ig, "7");
}

console.log(leet("anaconda"));

var prairie = {
    animal: {
        type: {
            name: "anaconda"
        }
    }
}

function prop_access(obj, str) {
    str.split('.').map(s => {
        if (obj.hasOwnProperty(s)) {
            obj = obj[s];
            str = s;
        }
    });
    return obj;
}

console.log(prop_access(prairie, "animal.type.name"));

function verlan(str) {
    return str.split(" ").map(s => {
        return s.split("").reverse().join("");
    }).join(" ");
}

console.log(verlan("Hello world"));

function yoda(str) {
    return str.split(" ").reverse().join(" ");
}

console.log(yoda("Hello world"));


function vig(str1, str2) {
    var i = 0, b;
    str2 = str2.toUpperCase().replace(/[^A-Z]/g, '');
    str1 = str1.toUpperCase().replace(/[^A-Z]/g, '').replace(/[A-Z]/g, function(a) {
        b = str2[i++ % str2.length];
        return String.fromCharCode((((a.charCodeAt(0) - 65) + (b.charCodeAt(0) - 65)) % 26 + 65));
    });
    return str1.toLowerCase();
}

console.log(vig("wikipedia", "crypto"));