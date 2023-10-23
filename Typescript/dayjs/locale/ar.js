!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t(require('dayjs')))
        : 'function' == typeof define && define.amd
        ? define(['dayjs'], t)
        : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).dayjs_locale_ar = t(
              e.dayjs
          ));
})(this, function (e) {
    'use strict';
    function t(e) {
        return e && 'object' == typeof e && 'default' in e ? e : { default: e };
    }
    var n = t(e),
        r = 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        _ = { 1: '١', 2: '٢', 3: '٣', 4: '٤', 5: '٥', 6: '٦', 7: '٧', 8: '٨', 9: '٩', 0: '٠' },
        d = {
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9',
            '٠': '0',
        },
        o = {
            name: 'ar',
            weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
            weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
            weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
            months: r,
            monthsShort: r,
            weekStart: 6,
            relativeTime: {
                future: 'بعد %s',
                past: 'منذ %s',
                s: 'ثانية واحدة',
                m: 'دقيقة واحدة',
                mm: '%d دقائق',
                h: 'ساعة واحدة',
                hh: '%d ساعات',
                d: 'يوم واحد',
                dd: '%d أيام',
                M: 'شهر واحد',
                MM: '%d أشهر',
                y: 'عام واحد',
                yy: '%d أعوام',
            },
            preparse: function (e) {
                return e
                    .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
                        return d[e];
                    })
                    .replace(/،/g, ',');
            },
            postformat: function (e) {
                return e
                    .replace(/\d/g, function (e) {
                        return _[e];
                    })
                    .replace(/,/g, '،');
            },
            ordinal: function (e) {
                return e;
            },
            formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'D/‏M/‏YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm',
            },
        };
    return n.default.locale(o, null, !0), o;
});