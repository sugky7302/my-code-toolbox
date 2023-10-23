!(function (a, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = e(require('dayjs')))
        : 'function' == typeof define && define.amd
        ? define(['dayjs'], e)
        : ((a = 'undefined' != typeof globalThis ? globalThis : a || self).dayjs_locale_bm = e(
              a.dayjs
          ));
})(this, function (a) {
    'use strict';
    function e(a) {
        return a && 'object' == typeof a && 'default' in a ? a : { default: a };
    }
    var l = e(a),
        t = {
            name: 'bm',
            weekdays: 'Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri'.split('_'),
            months: 'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo'.split(
                '_'
            ),
            weekStart: 1,
            weekdaysShort: 'Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib'.split('_'),
            monthsShort: 'Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des'.split('_'),
            weekdaysMin: 'Ka_Nt_Ta_Ar_Al_Ju_Si'.split('_'),
            ordinal: function (a) {
                return a;
            },
            formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'MMMM [tile] D [san] YYYY',
                LLL: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
                LLLL: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
            },
            relativeTime: {
                future: '%s kɔnɔ',
                past: 'a bɛ %s bɔ',
                s: 'sanga dama dama',
                m: 'miniti kelen',
                mm: 'miniti %d',
                h: 'lɛrɛ kelen',
                hh: 'lɛrɛ %d',
                d: 'tile kelen',
                dd: 'tile %d',
                M: 'kalo kelen',
                MM: 'kalo %d',
                y: 'san kelen',
                yy: 'san %d',
            },
        };
    return l.default.locale(t, null, !0), t;
});