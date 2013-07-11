[Forma](http://empeeric.github.io/forma/) - Client-side form generator
=======

Quick and easy javascript form builder. May you never have to write boring, repetative markup again.

### [Example](http://empeeric.github.io/forma/)
```js
/*
 Add new fields to Former,
 e.g. define a reusable select2 field
 */
Forma.fields['select2'] = function(o) {
    $.extend(true, o, { options: [] });

    var el = $('<select>' +
        o.options.map(function(option) {
            return '<option>' + option + '</option>'
        }).join('') +
        '</select>');

    setTimeout(function() { // wait till form is rendered
        el.select2();
    }, 0);

    return el;
};

/*
 Forma Example
 Just declare your schema, we'll do the rest
 */
var form = new Forma({
    name: {
        type: 'text',
        value: 'Shine',
        required: true, // jQuery.validate or browser form validation can read this!
        ready: function(el) { // You can actually access your element!
            el.on('click', function() {
                console.log($(this).val());
            });
        }
    },
    password: 'password',
    select: {
        type: 'select2',
        options: ['what', 'where', 'when']
    },
    radio: {
        type: 'radio',
        options: ['No', 'Yes'],
        value: 'No'
    }
});

// Forma is happy to play well with Rivets.js, and other data binders
form.field = function(o) {
    o['data-value'] = 'model.' + o.name;
    return Forma.prototype.field(o);
};

// Easily use bootstrap for your form layout
form.row = function(label, o) {
    var row = $('<div class="control-group">' +
        '<label class="control-label">' + label.capitalize() + '</label>' +
        '<div class="controls"></div>' +
    '</div>');

    row.find('.controls').append(this.field(o));
    return row;
};

// Render the form and append it to the document!
$('form').prepend(form.render());

// Elements can be accessed later if you want
form.fields.radio.el[1].on('click', function() {
    console.log('Tuning radio...')
});
```