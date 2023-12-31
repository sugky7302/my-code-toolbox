!(function (t, n) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = n())
        : 'function' == typeof define && define.amd
        ? define(n)
        : ((t =
              'undefined' != typeof globalThis
                  ? globalThis
                  : t || self).dayjs_plugin_objectSupport = n());
})(this, function () {
    'use strict';
    return function (t, n, e) {
        var i = n.prototype,
            r = function (t) {
                var n,
                    r = t.date,
                    o = t.utc,
                    a = {};
                if (
                    !(
                        (n = r) instanceof Date ||
                        n instanceof Array ||
                        i.$utils().u(n) ||
                        'Object' !== n.constructor.name
                    )
                ) {
                    if (!Object.keys(r).length) return new Date();
                    var u = o ? e.utc() : e();
                    Object.keys(r).forEach(function (t) {
                        var n, e;
                        a[((n = t), (e = i.$utils().p(n)), 'date' === e ? 'day' : e)] = r[t];
                    });
                    var c = a.day || (a.year || a.month >= 0 ? 1 : u.date()),
                        s = a.year || u.year(),
                        d = a.month >= 0 ? a.month : a.year || a.day ? 0 : u.month(),
                        f = a.hour || 0,
                        b = a.minute || 0,
                        h = a.second || 0,
                        y = a.millisecond || 0;
                    return o
                        ? new Date(Date.UTC(s, d, c, f, b, h, y))
                        : new Date(s, d, c, f, b, h, y);
                }
                return r;
            },
            o = i.parse;
        i.parse = function (t) {
            (t.date = r.bind(this)(t)), o.bind(this)(t);
        };
        var a = i.set,
            u = i.add,
            c = i.subtract,
            s = function (t, n, e, i) {
                void 0 === i && (i = 1);
                var r = Object.keys(n),
                    o = this;
                return (
                    r.forEach(function (e) {
                        o = t.bind(o)(n[e] * i, e);
                    }),
                    o
                );
            };
        (i.set = function (t, n) {
            return (
                (n = void 0 === n ? t : n),
                'Object' === t.constructor.name
                    ? s.bind(this)(
                          function (t, n) {
                              return a.bind(this)(n, t);
                          },
                          n,
                          t
                      )
                    : a.bind(this)(t, n)
            );
        }),
            (i.add = function (t, n) {
                return 'Object' === t.constructor.name ? s.bind(this)(u, t, n) : u.bind(this)(t, n);
            }),
            (i.subtract = function (t, n) {
                return 'Object' === t.constructor.name
                    ? s.bind(this)(u, t, n, -1)
                    : c.bind(this)(t, n);
            });
    };
});
