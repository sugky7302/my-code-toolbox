!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t(require('dayjs')))
        : 'function' == typeof define && define.amd
        ? define(['dayjs'], t)
        : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).dayjs_locale_gom_latn =
              t(e.dayjs));
})(this, function (e) {
    'use strict';
    function t(e) {
        return e && 'object' == typeof e && 'default' in e ? e : { default: e };
    }
    var a = t(e),
        _ = {
            name: 'gom-latn',
            weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split('_'),
            months: 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split(
                '_'
            ),
            weekStart: 1,
            weekdaysShort: 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
            monthsShort: 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
            weekdaysMin: 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
            ordinal: function (e) {
                return e;
            },
            formats: {
                LT: 'A h:mm [vazta]',
                LTS: 'A h:mm:ss [vazta]',
                L: 'DD-MM-YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY A h:mm [vazta]',
                LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
                llll: 'ddd, D MMM YYYY, A h:mm [vazta]',
            },
        };
    return a.default.locale(_, null, !0), _;
});