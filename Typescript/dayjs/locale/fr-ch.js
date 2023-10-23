!(function (e, n) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = n(require('dayjs')))
        : 'function' == typeof define && define.amd
        ? define(['dayjs'], n)
        : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).dayjs_locale_fr_ch = n(
              e.dayjs
          ));
})(this, function (e) {
    'use strict';
    function n(e) {
        return e && 'object' == typeof e && 'default' in e ? e : { default: e };
    }
    var i = n(e),
        _ = {
            name: 'fr-ch',
            weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
            months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
                '_'
            ),
            weekStart: 1,
            weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
            monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
                '_'
            ),
            weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
            ordinal: function (e) {
                return e;
            },
            formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm',
            },
            relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans',
            },
        };
    return i.default.locale(_, null, !0), _;
});
