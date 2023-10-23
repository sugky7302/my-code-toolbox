!(function (_, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = e(require('dayjs')))
        : 'function' == typeof define && define.amd
        ? define(['dayjs'], e)
        : ((_ = 'undefined' != typeof globalThis ? globalThis : _ || self).dayjs_locale_lo = e(
              _.dayjs
          ));
})(this, function (_) {
    'use strict';
    function e(_) {
        return _ && 'object' == typeof _ && 'default' in _ ? _ : { default: _ };
    }
    var t = e(_),
        d = {
            name: 'lo',
            weekdays: 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
            months: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split(
                '_'
            ),
            weekdaysShort: 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
            monthsShort:
                'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split(
                    '_'
                ),
            weekdaysMin: 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
            ordinal: function (_) {
                return _;
            },
            formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'ວັນdddd D MMMM YYYY HH:mm',
            },
            relativeTime: {
                future: 'ອີກ %s',
                past: '%sຜ່ານມາ',
                s: 'ບໍ່ເທົ່າໃດວິນາທີ',
                m: '1 ນາທີ',
                mm: '%d ນາທີ',
                h: '1 ຊົ່ວໂມງ',
                hh: '%d ຊົ່ວໂມງ',
                d: '1 ມື້',
                dd: '%d ມື້',
                M: '1 ເດືອນ',
                MM: '%d ເດືອນ',
                y: '1 ປີ',
                yy: '%d ປີ',
            },
        };
    return t.default.locale(d, null, !0), d;
});
