!(function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define(e)
        : ((t =
              'undefined' != typeof globalThis ? globalThis : t || self).dayjs_plugin_buddhistEra =
              e());
})(this, function () {
    'use strict';
    return function (t, e) {
        var n = e.prototype,
            i = n.format;
        n.format = function (t) {
            var e = this,
                n = (t || 'YYYY-MM-DDTHH:mm:ssZ').replace(/(\[[^\]]+])|BBBB|BB/g, function (t, n) {
                    var i,
                        o = String(e.$y + 543),
                        f = 'BB' === t ? [o.slice(-2), 2] : [o, 4];
                    return n || (i = e.$utils()).s.apply(i, f.concat(['0']));
                });
            return i.bind(this)(n);
        };
    };
});
