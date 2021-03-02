(this["webpackJsonpsudoku-chess2-client"] =
  this["webpackJsonpsudoku-chess2-client"] || []).push([
  [0],
  {
    108: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(1),
        c = n(0),
        a = n.n(c),
        s = n(29),
        o = n.n(s),
        i = n(22),
        u = n(3),
        l = n(8),
        j =
          (n(69),
          function (e) {
            return "string" === typeof e.action
              ? Object(r.jsx)(i.b, {
                  className: "menu-button",
                  to: e.action,
                  children: e.text,
                })
              : Object(r.jsx)("button", {
                  className: "menu-button",
                  onClick: e.action,
                  children: e.text,
                });
          }),
        d =
          (n(71),
          function () {
            return Object(r.jsxs)("div", {
              className: "menu-container",
              children: [
                Object(r.jsx)("div", {
                  className: "menu-header",
                  children: Object(r.jsx)("h1", { children: " SuGoKu" }),
                }),
                Object(r.jsx)(j, { action: "/create", text: "Create Game" }),
                Object(r.jsx)(j, { action: "/join", text: "Join Game" }),
              ],
            });
          }),
        b = n(26),
        f = n.n(b),
        h = n(41),
        O =
          (n(31),
          function (e, t) {
            return { type: "SET_BOARD", payload: { board: e, isPlayer: t } };
          }),
        m = Object(l.b)(null, {
          newGame: function (e) {
            return function (t, n) {
              var r = n().user.conn;
              console.log(r),
                r.emit(
                  "NEW_GAME",
                  { size: e },
                  (function () {
                    var e = Object(h.a)(
                      f.a.mark(function e(n) {
                        var r;
                        return f.a.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), n;
                              case 2:
                                (r = e.sent), t(O(r, 1));
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    );
                    return function (t) {
                      return e.apply(this, arguments);
                    };
                  })()
                );
            };
          },
        })(function (e) {
          var t = function (t) {
            console.log(t), e.newGame(t);
          };
          return Object(r.jsxs)("div", {
            className: "menu-container",
            children: [
              Object(r.jsxs)("div", {
                className: "menu-header",
                children: [
                  Object(r.jsx)("h1", { children: " Create Game " }),
                  Object(r.jsx)("h4", { children: " Select Board Size " }),
                ],
              }),
              Object(r.jsx)(j, {
                action: function () {
                  return t(81);
                },
                text: "9x9",
              }),
              Object(r.jsx)(j, {
                action: function () {
                  return t(256);
                },
                text: "14x14",
              }),
            ],
          });
        }),
        v = n(15),
        p = Object(l.b)(
          function (e) {
            return { conn: e.user.conn };
          },
          {
            joinGame: function (e) {
              return function (t, n) {
                n().user.conn.emit(
                  "JOIN_GAME",
                  { _id: e },
                  (function () {
                    var e = Object(h.a)(
                      f.a.mark(function e(n) {
                        var r;
                        return f.a.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), n;
                              case 2:
                                (r = e.sent), t(O(r, 2));
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    );
                    return function (t) {
                      return e.apply(this, arguments);
                    };
                  })()
                );
              };
            },
          }
        )(function (e) {
          var t = Object(c.useState)([]),
            n = Object(v.a)(t, 2),
            a = n[0],
            s = n[1];
          Object(c.useEffect)(
            function () {
              e.conn.emit("GET_GAMES", null, function (e) {
                s(e);
              });
            },
            [e.conn]
          );
          return Object(r.jsxs)("div", {
            className: "menu-container",
            children: [
              Object(r.jsx)("h1", { children: "JoinGame" }),
              a.map(function (t, n) {
                return Object(r.jsx)(
                  j,
                  {
                    text: t,
                    action: function () {
                      return (function (t) {
                        e.joinGame(t);
                      })(t);
                    },
                  },
                  n
                );
              }),
            ],
          });
        }),
        x = n(25),
        y = function (e) {
          var t = Object(c.useState)(e.value),
            n = Object(v.a)(t, 2),
            a = n[0],
            s = n[1],
            o = function (t) {
              "Enter" === t.key && e.handleTurn(e.index, a);
            };
          return (
            Object(c.useEffect)(
              function () {
                var e = document.getElementsByClassName("infocus");
                e[0] && e[0].addEventListener("keyup", o);
              },
              [a]
            ),
            Object(r.jsx)("input", {
              className: "input-cell ".concat(
                0 === e.value ? "infocus" : "nofocus"
              ),
              type: "number",
              min: 0,
              max: e.n * e.n,
              value:
                e.value > 0 ? Number(e.value).toString() : Number(a).toString(),
              onChange: function (e) {
                var t = parseInt(e.currentTarget.value);
                s(t);
              },
              disabled: e.value > 0,
            })
          );
        },
        g = n(57),
        N = {
          initGrid: function (e, t) {
            for (
              var n = t * t,
                r = new Array(n * n).fill(0),
                c = new Array(n * n).fill(0),
                a = 0;
              a < e.length;
              a++
            ) {
              var s = e[a];
              (r[s.index] = s.value), (c[s.index] = s.player);
              var o = N.autoComplete(s.index, r, 3);
              if ((console.log(o), o)) {
                var i,
                  u = Object(g.a)(o);
                try {
                  for (u.s(); !(i = u.n()).done; ) {
                    var l = i.value;
                    0 !== l.value &&
                      ((r[l.index] = l.value), (c[l.index] = s.player));
                  }
                } catch (j) {
                  u.e(j);
                } finally {
                  u.f();
                }
              }
            }
            return { values: r, players: c };
          },
          getRow: function (e, t) {
            var n = t * t,
              r = ~~(e / n) * n;
            return Array.from(Array(n).keys()).map(function (e) {
              return r + e;
            });
          },
          getCol: function (e, t) {
            var n = t * t,
              r = e % n;
            return Array.from(Array(n).keys()).map(function (e) {
              return r + n * e;
            });
          },
          getBox: function (e, t) {
            for (
              var n = t * t,
                r = ~~(e / (n * t)) * n * t + ~~((e % n) / t) * t,
                c = [],
                a = 0;
              a < t;
              a++
            )
              for (var s = 0; s < t; s++) c.push(r + s + a * n);
            return c;
          },
          getGroupSet: function (e, t, n) {
            var r = N.getBox(e, n)
              .concat(N.getCol(e, n))
              .concat(N.getRow(e, n))
              .map(function (e) {
                return t[e];
              });
            return new Set(r);
          },
          testInput: function (e, t, n, r) {
            var c = N.getGroupSet(e, t, n);
            return (
              r > 0 &&
              r <= n * n &&
              (!c.has(r) ||
                Array.from(
                  new Set(
                    [N.getRow(e, n), N.getCol(e, n), N.getBox(e, n)].flat()
                  )
                ).filter(function (e) {
                  return t[e] === r;
                }))
            );
          },
          autoComplete: function (e, t, n) {
            var r =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : [],
              c = new Set(
                [N.getRow(e, n), N.getCol(e, n), N.getBox(e, n)].flat()
              ),
              a = Array.from(c)
                .map(function (e) {
                  return { set: N.getGroupSet(e, t, n), index: e };
                })
                .filter(function (e) {
                  return e.set.size === n * n && 0 === t[e.index];
                });
            if ((console.log(a), a.length > 0)) {
              var s = Object(x.a)(t),
                o = a.map(function (e) {
                  e.set.delete(0);
                  for (
                    var t = Array.from(e.set), r = Array(n * n).fill(!1), c = 0;
                    c < t.length;
                    c++
                  )
                    r[t[c] - 1] = !0;
                  var o = {
                    index: e.index,
                    value:
                      r.findIndex(function (e) {
                        return !e;
                      }) + 1,
                  };
                  return (
                    (s[o.index] = o.value),
                    a.forEach(function (e) {
                      return e.set.add(o.value);
                    }),
                    o
                  );
                }),
                i = o.map(function (e) {
                  return N.autoComplete(
                    e.index,
                    s,
                    n,
                    [].concat(Object(x.a)(r), [e])
                  );
                }),
                u = o.concat(i).flat();
              return console.log(u), Array.from(u);
            }
            return r;
          },
        },
        S = N,
        T =
          (n(73),
          function (e) {
            for (
              var t = Array.from(S.getGroupSet(e.index, e.values, e.n)),
                n = Array(e.n * e.n).fill(!1),
                c = 0,
                a = t;
              c < a.length;
              c++
            ) {
              var s = a[c];
              s > 0 && (n[s - 1] = !0);
            }
            return Object(r.jsx)("div", {
              className: "hint-cell hint-cell-".concat(e.n),
              children: n.map(function (e, t) {
                return e
                  ? Object(r.jsx)("div", { children: t + 1 }, t)
                  : Object(r.jsx)("div", { children: "\xa0" }, t);
              }),
            });
          }),
        A =
          (n(74),
          Object(l.b)(
            function (e) {
              return { focus: e.game.focus, hintStyle: e.game.hintStyle };
            },
            {
              setFocus: function (e) {
                return { type: "SET_FOCUS", payload: { focus: e } };
              },
            }
          )(function (e) {
            var t = Math.sqrt(Math.sqrt(e.values.length)),
              n = function (e) {
                var n = "";
                return (
                  e % (t * t) === 0 && (n += "left "),
                  e % t === t - 1 && (n += "right "),
                  0 === ~~(e / (t * t)) && (n += "top "),
                  ~~(e / (t * t)) % t === t - 1 && (n += "bottom "),
                  n
                );
              },
              c = new Set(e.errors);
            return Object(r.jsx)("div", {
              className: "grid-container-".concat(t),
              children: e.values.map(function (a, s) {
                return Object(r.jsxs)(
                  "div",
                  {
                    className: "grid-cell "
                      .concat(n(s), "cell-size-")
                      .concat(t, " player-")
                      .concat(e.players[s], " ")
                      .concat(c.has(s) ? "cell-error" : ""),
                    onClick: function () {
                      return e.setFocus(s);
                    },
                    children: [
                      c.has(s)
                        ? Object(r.jsx)("div", {
                            className: "error-dot",
                            children: Object(r.jsx)("div", {}),
                          })
                        : null,
                      e.focus === s || a > 0
                        ? Object(r.jsx)(y, {
                            player: e.players[s],
                            value: a,
                            index: s,
                            n: t,
                            handleTurn: e.handleTurn,
                          })
                        : Object(r.jsx)(T, {
                            index: s,
                            n: t,
                            values: e.values,
                          }),
                    ],
                  },
                  s
                );
              }),
            });
          })),
        E = function (e) {
          return Object(r.jsxs)("div", {
            className: "score-card",
            children: [
              Object(r.jsx)("div", {
                className: "player-dot player-"
                  .concat(e.label, " ")
                  .concat(e.isTurn ? "isturn" : null),
                children: "\xa0",
              }),
              Object(r.jsxs)("h4", {
                className: "player-label",
                children: [
                  e.isPlayer === e.label ? "You" : "Them",
                  ":\xa0",
                  e.sum,
                ],
              }),
            ],
          });
        },
        _ =
          (n(75),
          function (e) {
            var t = function (e, t) {
              return e + t;
            };
            return Object(r.jsxs)("div", {
              className: "game-sidebar-left",
              children: [
                Object(r.jsx)("h2", { children: "Score" }),
                Object(r.jsx)(E, {
                  isTurn: 1 === e.isTurn,
                  isPlayer: e.isPlayer,
                  label: 1,
                  sum: e.players
                    .filter(function (e) {
                      return 1 === e;
                    })
                    .reduce(t, 0),
                }),
                Object(r.jsx)(E, {
                  isTurn: 2 === e.isTurn,
                  isPlayer: e.isPlayer,
                  label: 2,
                  sum:
                    e.players
                      .filter(function (e) {
                        return 2 === e;
                      })
                      .reduce(t, 0) / 2,
                }),
                e.errors.types.map(function (t, n) {
                  return (function (t, n) {
                    switch (t) {
                      case "BAD_INPUT":
                        return Object(r.jsxs)(
                          "div",
                          {
                            className: "error",
                            children: [
                              "Move was blocked by ",
                              e.errors.cells.length > 1 ? "cells" : "cell",
                              ":",
                              "\xa0",
                              e.errors.cells.map(function (t, n) {
                                return Object(r.jsx)(
                                  "span",
                                  {
                                    children:
                                      e.errors.cells.length - 1 !== n
                                        ? t + ",\xa0"
                                        : t,
                                  },
                                  n
                                );
                              }),
                            ],
                          },
                          n
                        );
                      case "NOT_TURN":
                        return Object(r.jsx)(
                          "div",
                          {
                            className: "error",
                            children: "It's not your turn",
                          },
                          n
                        );
                      case "BIG_NUM":
                        return Object(r.jsxs)(
                          "div",
                          {
                            className: "error",
                            children: [
                              "Number must be less than ",
                              Math.sqrt(e.players.length) + 1,
                            ],
                          },
                          n
                        );
                      case "ZERO_NUM":
                        return Object(r.jsx)(
                          "div",
                          {
                            className: "error",
                            children: "Number must be greater than 0",
                          },
                          n
                        );
                      default:
                        return Object(r.jsx)(
                          "div",
                          { className: "error", children: "Error" },
                          n
                        );
                    }
                  })(t, n);
                }),
              ],
            });
          }),
        w =
          (n(76),
          Object(l.b)(
            function (e) {
              return {
                focus: e.game.focus,
                hintStyle: e.game.hintStyle,
                isPlayer: e.game.isPlayer,
              };
            },
            {
              setTurnArr: function (e) {
                return { type: "SET_TURNS", payload: { turnArr: e } };
              },
            }
          )(function (e) {
            var t = Math.sqrt(Math.sqrt(e.board.size)),
              n = Object(c.useState)({
                values: Array(e.board.size).fill(0),
                players: Array(e.board.size).fill(0),
              }),
              s = Object(v.a)(n, 2),
              o = s[0],
              i = s[1],
              u = Object(c.useState)({ types: [], cells: [] }),
              l = Object(v.a)(u, 2),
              j = l[0],
              d = l[1],
              b = Object(c.useState)(2 === e.isPlayer),
              f = Object(v.a)(b, 2),
              h = f[0],
              O = f[1],
              m = Object(c.useState)(!1),
              p = Object(v.a)(m, 2),
              y = p[0],
              g = p[1],
              N = e.board.turnArr,
              T = N.length,
              E = T > 0 && 1 === N[T - 1].player ? 2 : 1;
            Object(c.useEffect)(
              function () {
                var n = S.initGrid(e.board.turnArr, t);
                return (
                  n.values !== o.values && i(n),
                  e.conn.on("PLAYER_JOIN", function () {
                    O(!0);
                  }),
                  e.conn.on("USER_QUIT", function () {
                    g(!0);
                  }),
                  e.conn.on("UPDATE_TURN", function (t) {
                    e.setTurnArr(t.turnArr);
                  }),
                  function () {
                    e.conn.off("UPDATE_TURN"),
                      e.conn.off("USER_QUIT"),
                      e.conn.off("UPDATE_TURN");
                  }
                );
              },
              [e.board, y]
            );
            return Object(r.jsx)("div", {
              className: "game-container",
              children: y
                ? Object(r.jsxs)("div", {
                    className: "pre-game",
                    children: [
                      Object(r.jsx)("h4", {
                        children:
                          " Uh oh, it looks like the other player quit the game! ",
                      }),
                      Object(r.jsxs)("h4", {
                        children: [
                          " ",
                          "Currently there is no way for someone to rejoin a game, sorry :(",
                        ],
                      }),
                    ],
                  })
                : h
                ? Object(r.jsxs)(a.a.Fragment, {
                    children: [
                      Object(r.jsx)(_, {
                        players: o.players,
                        errors: j,
                        isTurn: E,
                        isPlayer: e.isPlayer,
                      }),
                      Object(r.jsx)(A, {
                        errors: j.cells,
                        players: o.players,
                        values: o.values,
                        handleTurn: function (n, r) {
                          console.log(E);
                          var c = S.testInput(n, o.values, t, r),
                            a = e.isPlayer === E,
                            s = { types: [], cells: [] };
                          if (!0 === c && a && r > 0 && r <= t * t) {
                            var i = {
                              gameID: e.board._id,
                              player: e.isPlayer,
                              index: n,
                              value: r,
                            };
                            e.conn.emit("ADD_TURN", i);
                          }
                          "boolean" !== typeof c &&
                            0 !== r &&
                            (s = {
                              types: [].concat(Object(x.a)(s.types), [
                                "BAD_INPUT",
                              ]),
                              cells: c,
                            }),
                            a || s.types.push("NOT_TURN"),
                            r < 1 && s.types.push("ZERO_NUM"),
                            r > t * t && s.types.push("BIG_NUM"),
                            d(s);
                        },
                      }),
                      Object(r.jsx)("div", {
                        className: "game-sidebar-right",
                        children: "\xa0",
                      }),
                    ],
                  })
                : Object(r.jsxs)("div", {
                    className: "pre-game",
                    children: [
                      Object(r.jsx)("h4", {
                        children: "Waiting for player to join you",
                      }),
                      Object(r.jsxs)("h4", {
                        children: ["You're Game ID is: ", e.board._id, " "],
                      }),
                    ],
                  }),
            });
          })),
        U =
          (n(77),
          Object(u.g)(
            Object(l.b)(function (e) {
              return { conn: e.user.conn, board: e.game.board };
            }, {})(function (e) {
              var t = Object(u.f)();
              return (
                Object(c.useEffect)(
                  function () {
                    null !== e.board &&
                      "/game" !== t.location.pathname &&
                      t.push("/game");
                  },
                  [e.board]
                ),
                Object(r.jsx)("div", {
                  className: "App",
                  children: Object(r.jsxs)(u.c, {
                    children: [
                      Object(r.jsx)(u.a, {
                        path: "/game",
                        children: Object(r.jsx)(w, {
                          board: e.board,
                          conn: e.conn,
                        }),
                      }),
                      Object(r.jsx)(u.a, {
                        path: "/create",
                        children: Object(r.jsx)(m, {}),
                      }),
                      Object(r.jsx)(u.a, {
                        path: "/join",
                        children: Object(r.jsx)(p, {}),
                      }),
                      Object(r.jsx)(u.a, {
                        exact: !0,
                        path: "/",
                        children: Object(r.jsx)(d, {}),
                      }),
                    ],
                  }),
                })
              );
            })
          )),
        G = n(16),
        P = n(58),
        R = n(5),
        k = n(59),
        C = {
          string: "",
          conn: n.n(k)()("http://localhost:3001", {
            transports: ["websocket"],
          }),
        },
        I = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : C,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case "TEST":
              var n = t.payload.string;
              return Object(R.a)(Object(R.a)({}, e), {}, { string: n });
            default:
              return Object(R.a)({}, e);
          }
        },
        M = {
          board: null,
          target: 0,
          hintStyle: "default",
          focus: 0,
          isPlayer: void 0,
        },
        B = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : M,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case "SET_BOARD":
              var n = t.payload,
                r = n.board,
                c = n.isPlayer;
              return Object(R.a)(
                Object(R.a)({}, e),
                {},
                { board: r, isPlayer: c }
              );
            case "SET_FOCUS":
              var a = t.payload.focus;
              return Object(R.a)(Object(R.a)({}, e), {}, { focus: a });
            case "SET_TURNS":
              var s = t.payload.turnArr;
              return Object(R.a)(
                Object(R.a)({}, e),
                {},
                {
                  board: Object(R.a)(
                    Object(R.a)({}, e.board),
                    {},
                    { turnArr: s }
                  ),
                }
              );
            default:
              return Object(R.a)({}, e);
          }
        },
        D = Object(G.c)({ user: I, game: B }),
        z = Object(G.d)(D, Object(G.a)(P.a));
      o.a.render(
        Object(r.jsx)(l.a, {
          store: z,
          children: Object(r.jsx)(a.a.StrictMode, {
            children: Object(r.jsx)(i.a, { children: Object(r.jsx)(U, {}) }),
          }),
        }),
        document.getElementById("root")
      );
    },
    69: function (e, t, n) {},
    71: function (e, t, n) {},
    73: function (e, t, n) {},
    74: function (e, t, n) {},
    75: function (e, t, n) {},
    76: function (e, t, n) {},
    77: function (e, t, n) {},
  },
  [[108, 1, 2]],
]);
//# sourceMappingURL=main.37330ed8.chunk.js.map
