(function($, global) {

    var ignore_attr = ['ready', 'label', 'options'];

    var attr = function(o) {
        if (!o)
            return '';

        return Object.keys(o).map(function(key) {
            return (ignore_attr.indexOf(key) !== -1)
                ? ''
                : key + (o[key] !== true ? '="' + o[key] + '" ' : ' ');
        }).join('');
    };


    /*
     Fields
     */
    var fields = {};
    fields.input = function(o) {
        return $('<input ' + attr(o) + '/>');
    };
    fields.text = function(o) {
        return fields.input($.extend(o, { type: 'text' }));
    };
    fields.password = function(o) {
        return fields.input($.extend(o, { type: 'password' }));
    };
    fields.select = function(o) {
        $.extend(true, o, { options: [] });
        return $('<select>' +
            o.options.map(function(option) {
                return '<option>' + option + '</option>'
            }).join('') +
        '</select>');
    };
    fields.radio = function(o) {
        $.extend(o, {
            type: 'radio'
        });
        var val = o.value,
            options = o.options;
        delete o.value;

        return options.map(function(value) {
            var opt = value == val
                ? $.extend({ checked: true }, o)
                : o;
            return $('<label />').append(fields.input(opt), ' ' + value);
        });
    };


    /*
     Forma Class
     */
    var Forma = function(fields) {
        for (var name in fields) {
            var o = fields[name];

            if (typeof o == 'string')
                o = { type: o };

            else if (Array.isArray(o))
                o = { type: 'select', options: o };

            o.name = name;
            o.label || (o.label = name);

            fields[name] = o;
        }
        this.fields = fields;
    };
    Forma.fields = fields;
    Forma.prototype.render = function() {
        this.el = $('<div />');
        for (var name in this.fields) {
            var o = this.fields[name];
            this.el.append(this.row(o.label || name , o));
        }
        return this.el;
    };
    Forma.prototype.row = function(label, o) {
        return $('<label />').text(label).append(this.field(o));
    };
    Forma.prototype.field = function(o) {
        if (!o.el) {
            var el = fields[o.type] ? fields[o.type](o) : '';
            if (o.ready)
                o.ready(el);
            o.el = el;
        }
        return el;
    };

    global.Forma = Forma;

})(jQuery, window);