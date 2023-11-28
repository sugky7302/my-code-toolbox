var e = new Map();
function t(t) {
    var o = e.get(t);
    o && o.destroy();
}
function o(t) {
    var o = e.get(t);
    o && o.update();
}
var r = null;
"undefined" == typeof window
    ? (((r = function (e) {
          return e;
      }).destroy = function (e) {
          return e;
      }),
      (r.update = function (e) {
          return e;
      }))
    : (((r = function (t, o) {
          return (
              t &&
                  Array.prototype.forEach.call(t.length ? t : [t], function (t) {
                      return (function (t) {
                          if (t && t.nodeName && "TEXTAREA" === t.nodeName && !e.has(t)) {
                              var o,
                                  r = null,
                                  n = window.getComputedStyle(t),
                                  i =
                                      ((o = t.value),
                                      function () {
                                          a({
                                              testForHeightReduction:
                                                  "" === o || !t.value.startsWith(o),
                                              restoreTextAlign: null,
                                          }),
                                              (o = t.value);
                                      }),
                                  l = function (o) {
                                      t.removeEventListener("autosize:destroy", l),
                                          t.removeEventListener("autosize:update", s),
                                          t.removeEventListener("input", i),
                                          window.removeEventListener("resize", s),
                                          Object.keys(o).forEach(function (e) {
                                              return (t.style[e] = o[e]);
                                          }),
                                          e.delete(t);
                                  }.bind(t, {
                                      height: t.style.height,
                                      resize: t.style.resize,
                                      textAlign: t.style.textAlign,
                                      overflowY: t.style.overflowY,
                                      overflowX: t.style.overflowX,
                                      wordWrap: t.style.wordWrap,
                                  });
                              t.addEventListener("autosize:destroy", l),
                                  t.addEventListener("autosize:update", s),
                                  t.addEventListener("input", i),
                                  window.addEventListener("resize", s),
                                  (t.style.overflowX = "hidden"),
                                  (t.style.wordWrap = "break-word"),
                                  e.set(t, { destroy: l, update: s }),
                                  s();
                          }
                          function a(e) {
                              var o,
                                  i,
                                  l = e.restoreTextAlign,
                                  s = void 0 === l ? null : l,
                                  d = e.testForHeightReduction,
                                  u = void 0 === d || d,
                                  c = n.overflowY;
                              if (
                                  0 !== t.scrollHeight &&
                                  ("vertical" === n.resize
                                      ? (t.style.resize = "none")
                                      : "both" === n.resize && (t.style.resize = "horizontal"),
                                  u &&
                                      ((o = (function (e) {
                                          for (
                                              var t = [];
                                              e && e.parentNode && e.parentNode instanceof Element;

                                          )
                                              e.parentNode.scrollTop &&
                                                  t.push([e.parentNode, e.parentNode.scrollTop]),
                                                  (e = e.parentNode);
                                          return function () {
                                              return t.forEach(function (e) {
                                                  var t = e[0],
                                                      o = e[1];
                                                  (t.style.scrollBehavior = "auto"),
                                                      (t.scrollTop = o),
                                                      (t.style.scrollBehavior = null);
                                              });
                                          };
                                      })(t)),
                                      (t.style.height = "")),
                                  (i =
                                      "content-box" === n.boxSizing
                                          ? t.scrollHeight -
                                            (parseFloat(n.paddingTop) + parseFloat(n.paddingBottom))
                                          : t.scrollHeight +
                                            parseFloat(n.borderTopWidth) +
                                            parseFloat(n.borderBottomWidth)),
                                  "none" !== n.maxHeight && i > parseFloat(n.maxHeight)
                                      ? ("hidden" === n.overflowY && (t.style.overflow = "scroll"),
                                        (i = parseFloat(n.maxHeight)))
                                      : "hidden" !== n.overflowY && (t.style.overflow = "hidden"),
                                  (t.style.height = i + "px"),
                                  s && (t.style.textAlign = s),
                                  o && o(),
                                  r !== i &&
                                      (t.dispatchEvent(
                                          new Event("autosize:resized", { bubbles: !0 })
                                      ),
                                      (r = i)),
                                  c !== n.overflow && !s)
                              ) {
                                  var v = n.textAlign;
                                  "hidden" === n.overflow &&
                                      (t.style.textAlign = "start" === v ? "end" : "start"),
                                      a({ restoreTextAlign: v, testForHeightReduction: !0 });
                              }
                          }
                          function s() {
                              a({ testForHeightReduction: !0, restoreTextAlign: null });
                          }
                      })(t);
                  }),
              t
          );
      }).destroy = function (e) {
          return e && Array.prototype.forEach.call(e.length ? e : [e], t), e;
      }),
      (r.update = function (e) {
          return e && Array.prototype.forEach.call(e.length ? e : [e], o), e;
      }));
var n = r;
export default n;
