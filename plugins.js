/*
    Connecting popular and useful jQuery-plugins to Forma fields.
 */

// Datepicker for Bootstrap
// http://www.eyecon.ro/bootstrap-datepicker/
Forma.fields.date = function(o) {
    var value = o.value;
    delete o.value;
    var el = Forma.fields.text(o);

    setTimeout(function() {
        el.datepicker(Forma.fields.date.options);
        value && el.datepicker('setValue', value);
    }, 0);

    return el;
};
Forma.fields.date.options = {
    format: 'yyyy-mm-dd'
};

// Slider for Bootstrap
// http://www.eyecon.ro/bootstrap-slider/
Forma.fields.slider = function(o) {
    var options = {
            min: o.min,
            max: o.max,
            step: o.step,
            tooltip: 'hide',
            value: o.value
        },
        el = Forma.fields.text(o),
        val = $('<span />');

    setTimeout(function() {
        $(el).slider(options).on('slide', function(e) {
            val.text(!e.value ? 'none' : e.value + ' mins');
        }).trigger('slide');
    }, 0);

    return val.add(el);
};

// Select2
// http://ivaynberg.github.io/select2/
Forma.fields.select2 = function(o) {
    var el = Forma.fields.select.call(this, o);

    setTimeout(function() {
        el.select2();
    }, 0);

    return el;
};