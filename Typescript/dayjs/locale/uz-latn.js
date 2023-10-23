!(function (a, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = e(require('dayjs')))
        : 'function' == typeof define && define.amd
        ? define(['dayjs'], e)
        : ((a = 'undefined' != typeof globalThis ? globalThis : a || self).dayjs_locale_uz_latn = e(
              a.dayjs
          ));
})(this, function (a) {
    'use strict';
    function e(a) {
        return a && 'object' == typeof a && 'default' in a ? a : { default: a };
    }
    var n = e(a),
        _ = {
            name: 'uz-latn',
            weekdays: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
            months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split(
                '_'
            ),
            weekStart: 1,
            weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
            monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
            weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
            ordinal: function (a) {
                return a;
            },
            formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'D MMMM YYYY, dddd HH:mm',
            },
            relativeTime: {
                future: 'Yaqin %s ichida',
                past: 'Bir necha %s oldin',
                s: 'soniya',
                m: 'bir daqiqa',
                mm: '%d daqiqa',
                h: 'bir soat',
                hh: '%d soat',
                d: 'bir kun',
                dd: '%d kun',
                M: 'bir oy',
                MM: '%d oy',
                y: 'bir yil',
                yy: '%d yil',
            },
        };
    return n.default.locale(_, null, !0), _;
});
