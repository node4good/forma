[Forma](http://empeeric.github.io/forma/) - Client-side form generator
=======

> forma, formae; (f.); form, figure, shape; beautiful shape, beauty (-- Latin-English Dictionary)

Quick and easy javascript form builder. May you never have to write boring, repetitive markup again.

### [Example](http://empeeric.github.io/forma/)

```js
/*
 Just declare your schema, we'll do the rest
 */
var form = new Forma({
    // simplest: just declare name and type
    username: 'text',
    password: 'password',

    // or you can have full control
    where: {
        type: 'text',
        value: 'Shine',
        required: true,         // jQuery.validate or browser form validation can read this!
        ready: function(el) {   // You can actually access your element!
            el.on('click', function() {
                console.log($(this).val());
            });
        },
        label: 'WHERE?!'        // Or set
    },
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

// Extend Forma with more field types; e.g. define a reusable select2 field
Forma.fields['select2'] = function(o) {
    var el = Forma.fields.select.call(this, o);

    setTimeout(function() {
        el.select2();
    }, 0);

    return el;
};

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

// Elements can be accessed later
form.fields.radio.el[1].on('click', function() {
    console.log('Tuning radio...')
});
```

#### Field types
- text (`<input type="text" />`)
- password (`<input type="password" />`)
- file (`<input type="file" />`)
- select (`<select />`)
- radio (`<input type="radio" />`)

#### Plugins' fields
See `plugins.js`. Dependent on the actual plugins.
- date ([Bootstrap Datepicker](http://www.eyecon.ro/bootstrap-datepicker))
- slider ([Bootstrap Slider](http://www.eyecon.ro/bootstrap-slider/))
- select2 ([Select2](http://ivaynberg.github.io/select2/))