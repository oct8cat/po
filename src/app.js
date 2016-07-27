const Backbone = require('backbone')
const Handlebars = require('handlebars/runtime')
const Jed = require('jed')
const locales = require('locales')

module.exports = Backbone.View.extend({
    template: require('./app.hbs'),
    events: {
        'change [data-ui="locale"]': 'handleChangeLocale',
    },
    initialize: function () {
        this.model = new Backbone.Model()
        this.model.on('change:locale', this.onModelChangeLocale, this)
        this.setLocale('en_US')

        Handlebars.registerHelper('ngettext', (m1, m2, n) => this.model.get('i18n').translate(m1).ifPlural(n, m2).fetch(n))

        this.model.on('change:i18n', this.render, this)
    },
    render: function () {
        this.$el.html(this.template({locales}))
        this.$('[data-ui="locale"]').val(this.model.get('locale'))
    },
    onModelChangeLocale: function (model, locale) {
        model.set('i18n', new Jed(locales.find((v) => v.locale === locale).data))
    },
    handleChangeLocale: function (e) {
        this.setLocale(this.$(e.target).val())
    },
    setLocale: function (locale) {
        this.model.set('locale', locale)
    },
})
