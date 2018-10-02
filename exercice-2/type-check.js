function type_check_v1(val, type) {
    if (val === null || val === undefined || !type) return false;
    return typeof val === type;
}

console.log(type_check_v1(1, "number") + " => expect true");
console.log(type_check_v1(1, "string") + " => expect false");

function type_check_v2(val, conf) {
    switch (Object.keys(conf).length) {
        case 0:
            return false;
            break;
        case 1:
            if (Object.keys(conf)[0] === "enum") {
                return conf.enum.indexOf(val) > -1;
            } else {
                if (Object.keys(conf)[0] === "type") {
                    return type_check_v1(val, conf.type);
                } else {
                    return val === conf.value;
                }
            }
            break;
        case 2:
            return type_check_v1(val, conf.type) && val === conf.value;
            break;
    }
}

console.log(type_check_v2({prop1: 1}, {type: "object"}) + " => expect true");
console.log(type_check_v2("foo", {type: "string", value: "foo"}) + " => expect true");
console.log(type_check_v2("bar", {type: "string", value: "foo"}) + " => expect false");
console.log(type_check_v2(3, {enum: ["foo", "bar", 3]}) + " => expect true");

function type_check(val, conf) {
    if ("type" in conf && typeof val !== conf['type']) {
        return false;
    }

    if ("properties" in conf) {
        var properties = conf['properties'];
        for (var key in properties) {
            var val_v2 = val[key];
            var property = properties[key];
            if ("properties" in property) {
                var property_v2 = property['properties'];
                if (property instanceof Object) {
                    for (var value in property_v2) {
                        if (!value in val_v2) {
                            return false;
                        }

                        if (!type_check_v1(val_v2[value], property_v2[value])) {
                            return false;
                        }

                    }
                }

                if (property_v2 instanceof Array) {
                    for (var key_v2 in property_v2) {
                        if (!type_check_v1(val_v2[key_v2], property_v2[key_v2])) {
                            return false;
                        }
                    }
                }
            }

            if (!(key in val)) {
                return false;
            }
            if (!type_check_v2(val_v2, property)) {
                return false;
            }
        }
    }

    return true;
}

console.log(type_check(
    {
        prop1: 4,
        prop2: 'val1',
        prop3: {prop31: 3},
        prop4: [true]
    },
    {
        type: "object",
        properties: {
            prop1: {type: 'number'},
            prop2: {type: 'string', enum: ['val1', 'val2']},
            prop3: {type: 'object', properties: {prop31: 'number'}},
            prop4: {type: 'array', properties: ["boolean"]}
        }
    }
) + " => expect true");