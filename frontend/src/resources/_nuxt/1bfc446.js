(window.webpackJsonp = window.webpackJsonp || []).push([
    [5], {
        10: function(e, t, n) {
            "use strict";
            n.d(t, "b", (function() {
                return m
            })), n.d(t, "c", (function() {
                return f
            })), n.d(t, "a", (function() {
                return h
            }));
            var r = n(394),
                o = n(4),
                c = n(121),
                l = n(156),
                d = Object(r.a)({
                    apiKey: "AIzaSyCGgF8uzLjCyhQuxJYdQYVyeyLjSTumW5Y",
                    authDomain: "rearsea-94aef.firebaseapp.com",
                    projectId: "rearsea-94aef",
                    storageBucket: "rearsea-94aef.appspot.com",
                    messagingSenderId: "525971901616",
                    appId: "1:525971901616:web:45763913add433fbdc3f75"
                }),
                m = Object(o.g)(d),
                f = Object(l.b)(d),
                h = Object(c.b)()
        },
        118: function(e, t, n) {
            "use strict";
            var r = n(636),
                o = n(638),
                c = n(648),
                l = n(637),
                d = {
                    layout: "empty",
                    props: {
                        error: {
                            type: Object,
                            default: null
                        }
                    },
                    data: function() {
                        return {
                            pageNotFound: "404 Not Found",
                            otherError: "An error occurred"
                        }
                    },
                    head: function() {
                        return {
                            title: 404 === this.error.statusCode ? this.pageNotFound : this.otherError
                        }
                    }
                },
                m = (n(483), n(40)),
                component = Object(m.a)(d, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(r.a, {
                        attrs: {
                            dark: ""
                        }
                    }, [t(c.a, [t(l.a, {
                        staticClass: "pt-10",
                        attrs: {
                            justify: "center"
                        }
                    }, [t(o.a, {
                        staticClass: "text-center",
                        attrs: {
                            cols: "12"
                        }
                    }, [404 === e.error.statusCode ? t("h1", {
                        staticClass: "text-h2 font-weight-bold"
                    }, [e._v("\n          " + e._s(e.pageNotFound) + "\n        ")]) : t("h1", {
                        staticClass: "text-h2 font-weight-bold"
                    }, [e._v("\n          " + e._s(e.otherError) + "\n        ")])]), e._v(" "), t(o.a, {
                        staticClass: "text-center",
                        attrs: {
                            cols: "12"
                        }
                    }, [t("NuxtLink", {
                        staticClass: "accent--text font-weight-medium text-h6",
                        attrs: {
                            to: "/"
                        }
                    }, [e._v("\n          Home page\n        ")])], 1)], 1)], 1)], 1)
                }), [], !1, null, "a7bf7380", null);
            t.a = component.exports
        },
        119: function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n(646),
                o = n(645),
                c = (n(11), n(13), n(15), n(5), n(16), n(12), n(17), n(2)),
                l = n(35);

            function d(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function m(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? d(Object(n), !0).forEach((function(t) {
                        Object(c.a)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var f = {
                    name: "Alert",
                    data: function() {
                        return {}
                    },
                    computed: m({}, Object(l.c)({
                        alert: "controller/getAlert"
                    })),
                    mounted: function() {},
                    methods: m(m({}, Object(l.d)({
                        setAlert: "controller/setAlert"
                    })), {}, {
                        getColor: function(e) {
                            return e && "success" === e.toLowerCase() ? "yellow darken-2" : e && "info" === e.toLowerCase() ? "warning" : e && e
                        }
                    })
                },
                h = n(40),
                component = Object(h.a)(f, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(o.a, {
                        staticClass: "transparent",
                        attrs: {
                            app: "",
                            color: "transparent",
                            elevation: "0",
                            "max-height": "95px",
                            timeout: -1,
                            transition: e.alert.is ? "scroll-y-transition" : "scroll-y-reverse-transition",
                            top: ""
                        },
                        model: {
                            value: e.alert.is,
                            callback: function(t) {
                                e.$set(e.alert, "is", t)
                            },
                            expression: "alert.is"
                        }
                    }, [t(r.a, {
                        staticClass: "py-3 primary rounded-lg d-flex align-center",
                        attrs: {
                            border: "left",
                            "colored-border": "",
                            elevation: "2",
                            dark: "",
                            type: e.alert.type,
                            color: e.getColor(e.alert.type)
                        }
                    }, [t("div", {
                        staticClass: "d-flex align-center ml-n2 ml-sm-0 light--text"
                    }, [t("div", {
                        staticClass: "d-flex flex-column"
                    }, [t("span", {
                        staticClass: "text-subtitle-1 font-weight-medium"
                    }, [e._v(e._s(e.alert.title))]), e._v(" "), t("span", {
                        staticClass: "text-subtitle-2 font-weight-light",
                        class: e.alert.title ? "mt-n1 " : ""
                    }, [e._v(e._s(e.alert.message) + "\n          ")])])])])], 1)
                }), [], !1, null, null, null);
            t.default = component.exports
        },
        219: function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n(271),
                o = n(53),
                c = n(629),
                l = n(233),
                d = n(643),
                m = n(272),
                f = n(641),
                h = (n(11), n(13), n(15), n(5), n(16), n(12), n(17), n(2)),
                v = n(35);

            function y(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function w(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? y(Object(n), !0).forEach((function(t) {
                        Object(h.a)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var x = {
                    name: "PSideBar",
                    components: {
                        pPattern: n(390).default
                    },
                    props: {
                        color: {
                            type: String,
                            default: "primary"
                        },
                        styles: {
                            type: [String, Array, Object],
                            default: "pa-4"
                        },
                        drawer: {
                            type: Boolean,
                            default: !1
                        },
                        divided: {
                            type: Boolean,
                            default: !0
                        },
                        loading: {
                            type: Boolean,
                            default: !1
                        },
                        toggle: Function
                    },
                    data: function() {
                        return {}
                    },
                    computed: w({}, Object(v.c)({
                        sideBar: "controller/getSideBar"
                    })),
                    methods: w({}, Object(v.d)({
                        setState: "controller/setState"
                    }))
                },
                O = n(40),
                component = Object(O.a)(x, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(d.a, {
                        attrs: {
                            app: "",
                            touchless: "",
                            right: "",
                            width: "400",
                            bottom: e.$vuetify.breakpoint.xsOnly,
                            temporary: "",
                            permanent: e.drawer
                        },
                        model: {
                            value: e.drawer,
                            callback: function(t) {
                                e.drawer = t
                            },
                            expression: "drawer"
                        }
                    }, [t("p-pattern"), e._v(" "), e.loading ? t(m.a, {
                        attrs: {
                            indeterminate: "",
                            color: "secondary"
                        }
                    }) : e._e(), e._v(" "), t(r.a, {
                        class: e.styles,
                        attrs: {
                            flat: ""
                        }
                    }, [t(o.c, {
                        staticClass: "text-h6 font-weight-medium text3--text d-flex align-start pa-0"
                    }, [e._t("header"), e._v(" "), t(f.a), e._v(" "), t(l.a, {
                        attrs: {
                            color: "primary",
                            right: ""
                        },
                        on: {
                            click: function(t) {
                                return e.toggle(!1)
                            }
                        }
                    }, [e._v("\n        mdi-close\n      ")])], 2), e._v(" "), e.divided ? t(c.a, {
                        staticClass: "mt-2",
                        class: e.color
                    }) : e._e(), e._v(" "), t(o.b, {
                        staticClass: "px-0 py-1"
                    }, [e._t("default")], 2)], 1)], 1)
                }), [], !1, null, null, null);
            t.default = component.exports
        },
        227: function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n(645),
                o = (n(32), n(11), n(13), n(15), n(16), n(17), n(2)),
                c = (n(54), n(5), n(12), n(185), n(35));

            function l(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function d(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? l(Object(n), !0).forEach((function(t) {
                        Object(o.a)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var m = {
                    filters: {
                        currency: function(e) {
                            return (e = parseFloat(e)).toLocaleString()
                        }
                    },
                    props: {
                        top: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    data: function() {
                        return {
                            on: !1,
                            name: "",
                            amount: 0,
                            newUsers: [],
                            users: [{
                                name: "Bevilacqua",
                                amount: 1.423
                            }, {
                                name: "Gracie",
                                amount: 2.033
                            }, {
                                name: "Eno ",
                                amount: 2.935
                            }, {
                                name: "Willette",
                                amount: 1.271
                            }, {
                                name: "Tinder",
                                amount: 2.93423
                            }, {
                                name: "Hertha",
                                amount: 4.6533
                            }, {
                                name: "Tong ",
                                amount: 1.2456
                            }, {
                                name: "Margaret",
                                amount: 5.6789
                            }, {
                                name: "Gleeson",
                                amount: 4.8789
                            }, {
                                name: "Jacques",
                                amount: 3.7456
                            }, {
                                name: "Dell",
                                amount: 5.776
                            }, {
                                name: "Criselda",
                                amount: 9.229
                            }, {
                                name: "Oriley",
                                amount: 4.2343
                            }, {
                                name: "Vennie",
                                amount: 5.6345
                            }, {
                                name: "Herter",
                                amount: 6.7768
                            }, {
                                name: "Deangelo",
                                amount: 1.7932
                            }, {
                                name: "Whitsett",
                                amount: 4.902
                            }, {
                                name: "Edmond",
                                amount: 4.7093
                            }, {
                                name: "Bartolome",
                                amount: 1.6547
                            }, {
                                name: "Dawne",
                                amount: 4.65123
                            }, {
                                name: "Colter",
                                amount: 2.1909
                            }, {
                                name: "Annice",
                                amount: 5.52351
                            }, {
                                name: "Remmers",
                                amount: 8.002
                            }, {
                                name: "Tula",
                                amount: 2.022
                            }, {
                                name: "Lisk",
                                amount: 2.093
                            }, {
                                name: "Kam",
                                amount: 1.092
                            }, {
                                name: "Viggiano",
                                amount: 5.802
                            }, {
                                name: "Ellyn",
                                amount: 9.888
                            }, {
                                name: "Nam",
                                amount: 4.41
                            }, {
                                name: "Jacquelin",
                                amount: 5.6
                            }, {
                                name: "Huguley",
                                amount: 8.99
                            }, {
                                name: "Leonardo",
                                amount: 7.001
                            }, {
                                name: "Alper",
                                amount: 8.6764
                            }, {
                                name: "Sheridan",
                                amount: 2.001
                            }, {
                                name: "Benoit",
                                amount: 2.5002
                            }, {
                                name: "Demetrius",
                                amount: 3.2312
                            }, {
                                name: "Oathout",
                                amount: 1.6213
                            }, {
                                name: "Numbers",
                                amount: 9.908
                            }, {
                                name: "Deere",
                                amount: 2.5678
                            }, {
                                name: "Billie",
                                amount: 6.5235
                            }, {
                                name: "Dehne",
                                amount: 1.2345
                            }, {
                                name: "Delbert",
                                amount: 9.62342
                            }, {
                                name: "Fritze",
                                amount: 5.678
                            }, {
                                name: "Lynn",
                                amount: 8.122
                            }, {
                                name: "Blair",
                                amount: 2.7523
                            }, {
                                name: "Mellisa",
                                amount: 7.002
                            }, {
                                name: "Fifield",
                                amount: 1.2412
                            }, {
                                name: "Traci",
                                amount: 2.333
                            }, {
                                name: "Yedinak",
                                amount: 9.086
                            }, {
                                name: "Nerissa",
                                amount: 6.14234
                            }, {
                                name: "Misner",
                                amount: 9.904
                            }, {
                                name: "Douglas",
                                amount: 5.6412
                            }, {
                                name: "Heisler",
                                amount: 1.021
                            }, {
                                name: "Samual",
                                amount: 2.6632
                            }, {
                                name: "Britt",
                                amount: 4.5161
                            }, {
                                name: "Lecia",
                                amount: 7.005
                            }, {
                                name: "Vero",
                                amount: 1.224
                            }, {
                                name: "Dara",
                                amount: 9.241
                            }, {
                                name: "Kingsbury",
                                amount: 4.3
                            }, {
                                name: "Maranda",
                                amount: 5.6211
                            }, {
                                name: "Harvison",
                                amount: 6.703
                            }, {
                                name: "Daniell",
                                amount: 4.134
                            }, {
                                name: "rvin",
                                amount: 9.998
                            }, {
                                name: "Dina",
                                amount: 2.5678
                            }, {
                                name: "Seller",
                                amount: 6.63264
                            }, {
                                name: "Michale",
                                amount: 4.1426
                            }, {
                                name: "Wisener",
                                amount: 9.5622
                            }, {
                                name: "Magan",
                                amount: 5.678
                            }, {
                                name: "Mealing",
                                amount: 8.122
                            }, {
                                name: "Latonia",
                                amount: 2.7275
                            }, {
                                name: "Wingrove",
                                amount: 7.70432
                            }, {
                                name: "Merilyn",
                                amount: 9.1
                            }, {
                                name: "Lueck",
                                amount: 4.5069
                            }]
                        }
                    },
                    created: function() {
                        var e = this;
                        this.newUsers = this.users, setInterval((function() {
                            e.initPopup()
                        }), 5e4)
                    },
                    computed: d(d({}, Object(c.c)({
                        user: "authentication/getUser",
                        state: "controller/getState"
                    })), {}, {
                        currency: function() {
                            var e, t = this,
                                n = this.state("currency");
                            return this.user ? n && n.forEach((function(n) {
                                t.user && t.user.currency.toLowerCase() === n.name.toLowerCase() && (e = n.symbol)
                            })) : e = "$", e
                        }
                    }),
                    methods: {
                        initPopup: function() {
                            var e = this;
                            this.on = !0;
                            var t = Math.floor(Math.random() * this.users.length);
                            this.users.length > 0 ? (this.name = this.users[t].name, this.amount = this.users[t].amount, this.users.splice(t, 1)) : this.users = this.arr, setTimeout((function() {
                                e.on = !1
                            }), 3e3)
                        },
                        generate: function() {
                            var e = this,
                                t = [];
                            this.names.forEach((function(n) {
                                var r = e.names.indexOf(n);
                                t.push({
                                    name: n,
                                    amount: e.numbers[r]
                                })
                            }))
                        }
                    }
                },
                f = (n(549), n(40)),
                component = Object(f.a)(m, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(r.a, {
                        attrs: {
                            value: !0,
                            top: e.top,
                            bottom: !e.top,
                            right: "",
                            dark: "",
                            color: "gradienting",
                            elevation: "24"
                        },
                        model: {
                            value: e.on,
                            callback: function(t) {
                                e.on = t
                            },
                            expression: "on"
                        }
                    }, [t("div", {
                        staticClass: "text-subtitle-1 font-weight-medium text-capitalize"
                    }, [e._v("\n    " + e._s(e.name) + "\n  ")]), e._v(" "), t("div", [e._v("\n    just bought an NFT at\n    "), t("span", {
                        staticClass: "yellow--text text--darken-2 font-weight-medium"
                    }, [e._v("ETH " + e._s(e.amount))]), e._v("\n    few minutes ago\n  ")])])
                }), [], !1, null, null, null);
            t.default = component.exports
        },
        277: function(e, t, n) {
            "use strict";
            var r = n(396),
                o = n.n(r);
            n(594);
            t.a = function(e) {
                e.app.AOS = new o.a.init({
                    disable: "phone"
                })
            }
        },
        278: function(e, t, n) {
            "use strict";
            n(5), n(42), n(11);
            var r = n(132),
                o = n.n(r);
            t.a = {
                encryptStringData: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                    return o.a.AES.encrypt(JSON.stringify(e), t).toString()
                },
                encryptObjectData: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                    return o.a.AES.encrypt(JSON.stringify(e), t).toString()
                },
                decryptObjectData: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
                        n = o.a.AES.decrypt(e, t);
                    return JSON.parse(n.toString(o.a.enc.Utf8))
                },
                decryptStringData: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                    return o.a.AES.decrypt(e, t).toString(o.a.enc.Utf8)
                }
            }
        },
        279: function(e, t, n) {
            "use strict";
            var r = n(3),
                o = n(397),
                c = n.n(o);
            r.default.use(c.a)
        },
        280: function(e, t, n) {
            "use strict";
            var r = n(3);
            t.a = function(e) {
                var t = e.$axios,
                    n = e.redirect;
                t.onError((function(e) {
                    "401" === e.response.status && (r.default.$cookies.remove("accessToken"), n("/login")), console.log(e)
                }))
            }
        },
        281: function(e, t, n) {
            "use strict";
            var r = n(3),
                o = n(398);
            r.default.component("downloadExcel", o.a)
        },
        282: function(e, t, n) {
            "use strict";
            var r = n(3),
                o = n(399),
                c = n.n(o);
            r.default.use(c.a)
        },
        283: function(e, t, n) {
            "use strict";
            var r = n(3),
                o = n(400),
                c = n.n(o);
            r.default.use(c.a, {
                publicKey: "YOUR CONNECT PUBLIC KEY"
            })
        },
        284: function(e, t, n) {
            "use strict";
            var r = n(3),
                o = n(409);
            r.default.use(o.a)
        },
        285: function(e, t, n) {
            "use strict";
            var r = n(3),
                o = n(401),
                c = n.n(o);
            r.default.component("paystack", c.a)
        },
        286: function(e, t, n) {
            "use strict";
            n(11);
            t.a = function(e) {
                var t = e.store;
                if (localStorage.getItem("yourState")) {
                    var n = JSON.parse(localStorage.getItem("yourState"));
                    t.replaceState(n)
                }
                t.subscribe((function(e, t) {
                    localStorage.setItem("yourState", JSON.stringify(t))
                }))
            }
        },
        287: function(e, t, n) {
            "use strict";
            var r = n(3),
                o = n(402),
                c = n.n(o);
            r.default.use(c.a)
        },
        368: function(e, t, n) {
            var content = n(484);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("3326a9fa", content, !0, {
                sourceMap: !1
            })
        },
        371: function(e, t, n) {
            var content = n(544);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("36a2130e", content, !0, {
                sourceMap: !1
            })
        },
        372: function(e, t, n) {
            var content = n(550);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("534eda2d", content, !0, {
                sourceMap: !1
            })
        },
        373: function(e, t, n) {
            var content = n(552);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("b418d7fe", content, !0, {
                sourceMap: !1
            })
        },
        374: function(e, t, n) {
            var content = n(554);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("b15f0728", content, !0, {
                sourceMap: !1
            })
        },
        375: function(e, t, n) {
            var content = n(556);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("431f972e", content, !0, {
                sourceMap: !1
            })
        },
        376: function(e, t, n) {
            var content = n(568);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("7c78afd8", content, !0, {
                sourceMap: !1
            })
        },
        377: function(e, t, n) {
            var content = n(570);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(19).default)("3b05cb5a", content, !0, {
                sourceMap: !1
            })
        },
        390: function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n(228),
                o = {},
                c = (n(553), n(40)),
                component = Object(c.a)(o, (function() {
                    return (0, this._self._c)(r.a, {
                        staticClass: "bgpattern",
                        attrs: {
                            src: "/bg/pattern.png"
                        }
                    })
                }), [], !1, null, null, null);
            t.default = component.exports
        },
        404: function(e, t, n) {
            "use strict";
            var r = n(636),
                o = n(639),
                c = n(640),
                l = n(176),
                d = n(271),
                m = n(53),
                f = n(629),
                h = n(233),
                v = n(228),
                y = n(267),
                w = n(177),
                x = n(26),
                O = n(153),
                k = n(644),
                j = n(630),
                _ = n(643),
                S = n(72),
                A = n(641),
                C = n(79),
                L = (n(32), n(11), n(13), n(15), n(5), n(16), n(12), n(17), n(2)),
                P = n(35);

            function D(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function R(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? D(Object(n), !0).forEach((function(t) {
                        Object(L.a)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : D(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var M = {
                    components: {
                        pAlert: n(119).default
                    },
                    data: function() {
                        return {
                            tab: null,
                            messages: 2,
                            drawer: !0,
                            mini: !0,
                            permanent: !0,
                            sideLinks: [{
                                name: "Dashboard",
                                route: "/admin",
                                icon: "mdi-home-variant "
                            }, {
                                name: "Account",
                                route: "/admin/account",
                                icon: "mdi-account-tie"
                            }]
                        }
                    },
                    head: function() {
                        return {
                            link: [{
                                rel: "stylesheet",
                                href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
                            }, {
                                rel: "stylesheet",
                                href: "https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                            }]
                        }
                    },
                    computed: R({}, Object(P.c)({
                        user: "authentication/getUser",
                        activePage: "admin/getActivePage"
                    })),
                    created: function() {
                        this.$store.dispatch("authentication/handleAuth"), this.$store.dispatch("admin/initAdmin"), this.$vuetify.breakpoint.xsOnly && (this.drawer = !1)
                    },
                    methods: R(R({}, Object(P.d)({
                        setActivePage: "admin/setActivePage",
                        setAlert: "authentication/setAlert"
                    })), {}, {
                        switchPage: function(e) {
                            this.setActivePage(e)
                        },
                        goto: function(e, t) {
                            this.$router.push(t), this.setActivePage(e)
                        },
                        logout: function() {
                            this.$store.dispatch("authentication/logoutUser")
                        }
                    })
                },
                I = (n(543), n(40)),
                component = Object(I.a)(M, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(r.a, {
                        staticClass: "black"
                    }, [t("div", [t(o.a, {
                        attrs: {
                            fixed: "",
                            flat: "",
                            dark: "",
                            app: "",
                            elevation: "",
                            outlined: "",
                            color: "dark"
                        }
                    }, [t(c.a, {
                        staticClass: "primary--text",
                        on: {
                            click: function(t) {
                                t.stopPropagation(), e.mini = !e.mini, e.drawer = !0
                            }
                        }
                    }), e._v(" "), t(C.a, {
                        attrs: {
                            dark: "",
                            flat: "",
                            color: "dark white--text"
                        }
                    }, [t(l.a, {
                        staticClass: "font-weight-regular",
                        attrs: {
                            tile: "",
                            color: "",
                            text: "",
                            exact: ""
                        }
                    }, [e._v("\n          " + e._s(e.activePage) + "\n        ")])], 1), e._v(" "), t(A.a), e._v(" "), t(j.a, {
                        attrs: {
                            left: "",
                            bottom: ""
                        },
                        scopedSlots: e._u([{
                            key: "activator",
                            fn: function(n) {
                                var r = n.on,
                                    o = n.attrs;
                                return [t(l.a, e._g(e._b({
                                    attrs: {
                                        icon: "",
                                        fab: ""
                                    }
                                }, "v-btn", o, !1), r), [t(h.a, {
                                    attrs: {
                                        color: ""
                                    }
                                }, [e._v(" fas fa-user-circle ")])], 1)]
                            }
                        }])
                    }, [e._v(" "), t(y.a, [t(w.a, {
                        attrs: {
                            dense: "",
                            to: "/dashboard/home"
                        },
                        on: {
                            click: function(t) {
                                return e.switchPage("Home")
                            }
                        }
                    }, [t(O.a, [t(h.a, {
                        staticClass: "px-1",
                        attrs: {
                            size: "20"
                        }
                    }, [e._v(" mdi-view-dashboard ")])], 1), e._v(" "), t(x.b, [e._v("Dashboard")])], 1), e._v(" "), t(w.a, {
                        attrs: {
                            dense: "",
                            to: "/admin/account"
                        },
                        on: {
                            click: function(t) {
                                return e.switchPage("Account")
                            }
                        }
                    }, [t(O.a, [t(h.a, {
                        staticClass: "px-1",
                        attrs: {
                            size: "20"
                        }
                    }, [e._v(" mdi-account ")])], 1), e._v(" "), t(x.b, [e._v("Account")])], 1), e._v(" "), t(f.a), e._v(" "), t(w.a, {
                        attrs: {
                            dense: "",
                            color: "error"
                        },
                        on: {
                            click: e.logout
                        }
                    }, [t(O.a, [t(h.a, {
                        staticClass: "px-1",
                        attrs: {
                            size: "20",
                            color: "error"
                        }
                    }, [e._v("\n                fas fa-sign-out-alt\n              ")])], 1), e._v(" "), t(x.b, {
                        staticClass: "error--text"
                    }, [e._v("\n              Logout\n            ")])], 1)], 1)], 1)], 1)], 1), e._v(" "), t(_.a, {
                        staticClass: "dark",
                        attrs: {
                            "mini-variant": e.mini,
                            app: "",
                            dark: "",
                            src: "/bg/pattern.png",
                            width: "220",
                            "mobile-breakpoint": "700"
                        },
                        on: {
                            "update:miniVariant": function(t) {
                                e.mini = t
                            },
                            "update:mini-variant": function(t) {
                                e.mini = t
                            }
                        },
                        model: {
                            value: e.drawer,
                            callback: function(t) {
                                e.drawer = t
                            },
                            expression: "drawer"
                        }
                    }, [t(w.a, {
                        staticClass: "px-2 black"
                    }, [t(x.b, {
                        staticClass: "text-h4 font-weight-bold py-2"
                    }, [e.mini ? t(v.a, {
                        attrs: {
                            height: "70",
                            contain: "",
                            src: "/broken.svg"
                        }
                    }) : t(v.a, {
                        attrs: {
                            height: "70",
                            contain: "",
                            src: "/brokentext2.svg"
                        }
                    })], 1), e._v(" "), t(l.a, {
                        attrs: {
                            icon: ""
                        },
                        on: {
                            click: function(t) {
                                t.stopPropagation(), e.mini = !e.mini
                            }
                        }
                    }, [t(h.a, {
                        attrs: {
                            color: "primary dark"
                        }
                    }, [e._v(" mdi-chevron-left ")])], 1)], 1), e._v(" "), t(f.a), e._v(" "), t(y.a, {
                        attrs: {
                            nav: ""
                        }
                    }, e._l(e.sideLinks, (function(link) {
                        return t(w.a, {
                            key: link.name,
                            staticClass: "my-0 text-subtitle-2 font-weight-light",
                            attrs: {
                                to: link.route,
                                exact: "",
                                link: "",
                                "active-class": "white primary--text text--darken-1 font-weight-medium"
                            },
                            on: {
                                click: function(t) {
                                    return e.switchPage(link.name)
                                }
                            }
                        }, [t(O.a, [t(h.a, [e._v("\n            " + e._s(link.icon) + "\n          ")])], 1), e._v(" "), t(x.a, [t(x.b, [e._v(e._s(link.name))])], 1)], 1)
                    })), 1), e._v(" "), t(f.a), e._v(" "), t(y.a, {
                        staticClass: "my-0 text-subtitle-2 font-weight-medium"
                    }, [t(w.a, {
                        on: {
                            click: e.logout
                        }
                    }, [t(O.a, [t(h.a, {
                        attrs: {
                            color: "error"
                        }
                    }, [e._v(" fas fa-sign-out-alt ")])], 1), e._v(" "), t(x.a, [t(x.b, {
                        staticClass: "error--text"
                    }, [e._v(" Logout ")])], 1)], 1)], 1)], 1), e._v(" "), t(k.a, {
                        staticClass: "black"
                    }, [t("p-alert"), e._v(" "), e.$nuxt.isOffline ? t(d.a, {
                        attrs: {
                            tile: "",
                            flat: "",
                            dark: "",
                            color: "secondary"
                        }
                    }, [t(m.b, {
                        staticClass: "py-1"
                    }, [t(h.a, {
                        attrs: {
                            color: "white",
                            size: "36",
                            left: ""
                        }
                    }, [e._v("\n          mdi-wifi-strength-alert-outline\n        ")]), e._v("\n        Unable to verify your Internet connection\n      ")], 1)], 1) : e._e(), e._v(" "), t(S.f, {
                        attrs: {
                            mode: "out-in"
                        }
                    }, [t("keep-alive", [t("nuxt")], 1)], 1)], 1)], 1)
                }), [], !1, null, "5c1a3d0e", null);
            t.a = component.exports
        },
        405: function(e, t, n) {
            "use strict";
            var r = n(636),
                o = n(639),
                c = n(640),
                l = n(649),
                d = n(176),
                m = n(271),
                f = n(53),
                h = n(629),
                v = n(647),
                y = n(233),
                w = n(228),
                x = n(267),
                O = n(177),
                k = n(26),
                j = n(153),
                _ = n(644),
                S = n(630),
                A = n(643),
                C = n(72),
                L = n(641),
                P = n(79),
                D = (n(32), n(11), n(13), n(15), n(5), n(16), n(12), n(17), n(2)),
                R = n(35),
                M = n(119),
                I = n(227),
                U = n(408),
                E = n(219);

            function N(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function B(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? N(Object(n), !0).forEach((function(t) {
                        Object(D.a)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : N(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var T = {
                    components: {
                        PAlert: M.default,
                        PLoading: U.default,
                        PSideBar: E.default,
                        Popup: I.default
                    },
                    data: function() {
                        return {
                            tab: null,
                            messages: 2,
                            drawer: !0,
                            mini: !0,
                            permanent: !0,
                            color: "secondary"
                        }
                    },
                    head: function() {
                        return {
                            link: [{
                                rel: "preconnect",
                                href: "https://fonts.gstatic.com"
                            }, {
                                rel: "stylesheet",
                                href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Karla:wght@200;300;500;700;800&family=Open+Sans:wght@300;400;600&display=swap"
                            }, {
                                rel: "stylesheet",
                                href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
                            }, {
                                rel: "stylesheet",
                                href: "https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                            }, {
                                rel: "stylesheet",
                                href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap"
                            }],
                            script: [{
                                src: "//widgets.coingecko.com/coingecko-coin-converter-widget.js"
                            }, {
                                src: "//code.jivosite.com/widget/OD7Nl96USR"
                            }]
                        }
                    },
                    computed: B(B({}, Object(R.c)({
                        user: "authentication/getUser",
                        activePage: "controller/getActivePage",
                        sideBar: "controller/getSideBar"
                    })), {}, {
                        sideLinks: function() {
                            return [{
                                name: "Dashboard",
                                route: "/dashboard/home",
                                icon: "mdi-home-variant",
                                color: "purple"
                            }, {
                                name: "Upload NFT",
                                route: "/dashboard/upload",
                                icon: "mdi-file-arrow-up-down",
                                color: "warning"
                            }, {
                                name: "Minted NFTs",
                                route: "/dashboard/mints",
                                icon: "mdi-nfc-search-variant",
                                color: "blue"
                            }, {
                                name: "Deposit",
                                route: "/dashboard/deposit",
                                icon: "mdi-cash-plus",
                                color: "error"
                            }, {
                                name: "Withdraw",
                                route: "/dashboard/withdraw",
                                icon: "mdi-bank",
                                color: "blue"
                            }, {
                                name: "Buy NFT",
                                route: "/dashboard/buy",
                                icon: "mdi-finance",
                                color: "success"
                            }, {
                                name: "My Profile",
                                route: "/dashboard/account",
                                icon: "mdi-account",
                                color: "purple"
                            }]
                        }
                    }),
                    created: function() {
                        this.$store.dispatch("authentication/handleAuth"), this.$store.dispatch("controller/initApp"), this.$vuetify.breakpoint.xsOnly && (this.drawer = !1)
                    },
                    methods: B(B(B({}, Object(R.d)({
                        setActivePage: "controller/setActivePage"
                    })), Object(R.b)({
                        initAlert: "controller/initAlert"
                    })), {}, {
                        switchPage: function(e) {
                            this.setActivePage(e)
                        },
                        goto: function(e, t) {
                            this.$router.push(t), this.setActivePage(e)
                        },
                        logout: function() {
                            this.$store.dispatch("authentication/logoutUser")
                        },
                        onidle: function() {
                            this.initAlert({
                                is: !0,
                                type: "info",
                                timer: 0,
                                message: "You have been logged out"
                            })
                        },
                        onremind: function(time) {
                            console.log(time)
                        }
                    })
                },
                G = (n(555), n(40)),
                component = Object(G.a)(T, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(r.a, {
                        staticClass: "grey lighten-3",
                        staticStyle: {
                            position: "relative"
                        }
                    }, [t("div", [t(o.a, {
                        staticClass: "gradientingT bluring",
                        attrs: {
                            fixed: "",
                            flat: "",
                            app: "",
                            elevation: "",
                            color: "transparent primary--text px-md-6"
                        }
                    }, [t(c.a, {
                        on: {
                            click: function(t) {
                                t.stopPropagation(), e.mini = !e.mini, e.drawer = !0
                            }
                        }
                    }), e._v(" "), t(P.a, {
                        attrs: {
                            flat: "",
                            color: "transparent white--text"
                        }
                    }, [t(d.a, {
                        staticClass: "black--text font-weight-black",
                        attrs: {
                            tile: "",
                            color: "",
                            text: "",
                            exact: ""
                        }
                    }, [e._v("\n          " + e._s(e.activePage) + "\n        ")])], 1), e._v(" "), t(L.a), e._v(" "), t("v-google-translate", {
                        staticClass: "dark--text text-subtitle-2 mr-2"
                    }), e._v(" "), t(d.a, {
                        staticClass: "rounded-mg text-subtitle-2 text-capitalize success",
                        attrs: {
                            depressed: "",
                            small: "",
                            to: "/dashboard/upload"
                        }
                    }, [t(y.a, {
                        attrs: {
                            color: "wite",
                            small: "",
                            left: e.$vuetify.breakpoint.smAndUp
                        }
                    }, [e._v("mdi-plus")]), e._v(" "), t("span", {
                        staticClass: "d-none d-sm-block"
                    }, [e._v("Create New Project")])], 1), e._v(" "), t(S.a, {
                        attrs: {
                            left: "",
                            bottom: ""
                        },
                        scopedSlots: e._u([{
                            key: "activator",
                            fn: function(n) {
                                var r = n.on,
                                    o = n.attrs;
                                return [t(d.a, e._g(e._b({
                                    attrs: {
                                        icon: "",
                                        fab: ""
                                    }
                                }, "v-btn", o, !1), r), [t(y.a, [e._v(" fas fa-user-circle ")])], 1)]
                            }
                        }])
                    }, [e._v(" "), t(x.a, [t(O.a, {
                        attrs: {
                            dense: "",
                            to: "/dashboard/account"
                        },
                        on: {
                            click: function(t) {
                                return e.switchPage("Settings")
                            }
                        }
                    }, [t(j.a, [t(y.a, {
                        staticClass: "px-1",
                        attrs: {
                            size: "20"
                        }
                    }, [e._v(" mdi-account ")])], 1), e._v(" "), t(k.b, [e._v("Account")])], 1), e._v(" "), t(h.a), e._v(" "), t(O.a, {
                        attrs: {
                            dense: ""
                        },
                        on: {
                            click: e.logout
                        }
                    }, [t(j.a, [t(y.a, {
                        staticClass: "px-1",
                        attrs: {
                            size: "20"
                        }
                    }, [e._v(" fas fa-sign-out-alt ")])], 1), e._v(" "), t(k.b, [e._v("Logout")])], 1)], 1)], 1)], 1)], 1), e._v(" "), t(A.a, {
                        staticClass: "gradientingCardT",
                        attrs: {
                            "mini-variant": e.mini,
                            app: "",
                            light: "",
                            touchless: !1,
                            src: "/bg/pattern.png",
                            width: "220",
                            "mobile-breakpoint": "700",
                            color: ""
                        },
                        on: {
                            "update:miniVariant": function(t) {
                                e.mini = t
                            },
                            "update:mini-variant": function(t) {
                                e.mini = t
                            }
                        },
                        model: {
                            value: e.drawer,
                            callback: function(t) {
                                e.drawer = t
                            },
                            expression: "drawer"
                        }
                    }, [t(O.a, {
                        staticClass: "px-2"
                    }, [t(k.b, {
                        staticClass: "text-h4 font-weight-bold pa-2"
                    }, [t(w.a, {
                        attrs: {
                            height: "80",
                            contain: "",
                            src: e.mini ? "/broken.svg" : "/brokentext2.svg"
                        }
                    })], 1), e._v(" "), t(d.a, {
                        attrs: {
                            icon: ""
                        },
                        on: {
                            click: function(t) {
                                t.stopPropagation(), e.mini = !e.mini
                            }
                        }
                    }, [t(y.a, {
                        attrs: {
                            color: "primary dark"
                        }
                    }, [e._v(" mdi-chevron-left ")])], 1)], 1), e._v(" "), t(h.a), e._v(" "), t(x.a, e._l(e.sideLinks, (function(link) {
                        return t(O.a, {
                            key: link.name,
                            staticClass: "my-0 text-subtitle-2 font-weight-light",
                            attrs: {
                                to: link.route,
                                exact: "",
                                link: "",
                                dark: "",
                                "active-class": "".concat(link.color, "--text white  text--darken-1 font-weight-medium")
                            },
                            on: {
                                click: function(t) {
                                    return e.switchPage(link.name)
                                }
                            }
                        }, [t(j.a, [t(y.a, {
                            attrs: {
                                size: "20",
                                color: link.color
                            }
                        }, [e._v("\n            " + e._s(link.icon) + "\n          ")])], 1), e._v(" "), t(k.a, [t(k.b, {
                            staticClass: "text-subtitle-1 grey--text text--darken-3"
                        }, [e._v(e._s(link.name))])], 1)], 1)
                    })), 1), e._v(" "), t(h.a), e._v(" "), t(x.a, {
                        staticClass: "my-0 text-subtitle-2 font-weight-medium",
                        attrs: {
                            nav: ""
                        }
                    }, [t(O.a, {
                        on: {
                            click: e.logout
                        }
                    }, [t(j.a, [t(y.a, {
                        attrs: {
                            size: "20",
                            color: "error"
                        }
                    }, [e._v(" fas fa-sign-out-alt ")])], 1), e._v(" "), t(k.a, [t(k.b, {
                        staticClass: "error--text text-subtitle-1"
                    }, [e._v("\n            Logout\n          ")])], 1)], 1)], 1)], 1), e._v(" "), t("p-side-bar"), e._v(" "), t(_.a, {
                        staticClass: "openSans gradienting lighten-5 light--text pb-12",
                        attrs: {
                            color: "transparent"
                        }
                    }, [t("p-loading"), e._v(" "), e.$nuxt.isOffline ? t(m.a, {
                        staticClass: "mt-n15",
                        staticStyle: {
                            "z-index": "999",
                            width: "100%",
                            position: "absolute"
                        },
                        attrs: {
                            tile: "",
                            flat: "",
                            color: "secondary"
                        }
                    }, [t(f.b, {
                        staticClass: "py-1"
                    }, [t(y.a, {
                        attrs: {
                            color: "white",
                            size: "36",
                            left: ""
                        }
                    }, [e._v("\n          mdi-wifi-strength-alert-outline\n        ")]), e._v("\n        Unable to verify your Internet connection\n      ")], 1)], 1) : e._e(), e._v(" "), t("popup"), e._v(" "), t("p-alert"), e._v(" "), e._e(), e._v(" "), t(C.f, {
                        attrs: {
                            mode: "out-in"
                        }
                    }, [t("keep-alive", [t("nuxt")], 1)], 1)], 1), e._v(" "), t(v.a, {
                        staticClass: "black pa-0",
                        attrs: {
                            fixed: ""
                        }
                    }, [t(l.a, {
                        staticClass: "gradienting d-block d-sm-none d-flex justity-space-around",
                        attrs: {
                            shift: "",
                            light: ""
                        }
                    }, e._l(e.sideLinks, (function(link) {
                        return t(d.a, {
                            key: link.name,
                            attrs: {
                                dark: "",
                                text: "",
                                color: link.color
                            },
                            on: {
                                click: function(t) {
                                    return e.goto(link.name, link.route)
                                }
                            }
                        }, [t("span", [e._v(e._s(link.name))]), e._v(" "), t(y.a, {
                            attrs: {
                                color: link.color
                            }
                        }, [e._v("\n          " + e._s(link.icon) + "\n        ")])], 1)
                    })), 1)], 1)], 1)
                }), [], !1, null, "09416a08", null);
            t.a = component.exports
        },
        406: function(e, t, n) {
            "use strict";
            var r = n(636),
                o = n(639),
                c = n(640),
                l = n(269),
                d = n(176),
                m = n(271),
                f = n(53),
                h = n(638),
                v = n(647),
                y = n(233),
                w = n(228),
                x = n(267),
                O = n(177),
                k = n(270),
                j = n(26),
                _ = n(644),
                S = n(643),
                A = n(637),
                C = n(72),
                L = n(641),
                P = n(626),
                D = n(79),
                R = (n(32), n(11), n(13), n(15), n(5), n(16), n(12), n(17), n(2)),
                M = (n(36), n(35)),
                I = n(119),
                U = n(227),
                E = n(219);

            function N(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function B(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? N(Object(n), !0).forEach((function(t) {
                        Object(R.a)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : N(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var T = {
                    created: function() {
                        this.$store.dispatch("controller/initnftcollection")
                    },
                    components: {
                        PAlert: I.default,
                        PSideBar: E.default,
                        Popup: U.default
                    },
                    data: function() {
                        return {
                            tab: null,
                            valid: !0,
                            email: "",
                            emailRules: [function(e) {
                                return !!e || "E-mail is required"
                            }, function(e) {
                                return /.+@.+\..+/.test(e) || "E-mail must be valid"
                            }],
                            messages: 2,
                            drawer: !1,
                            permanent: !0,
                            color: "text1",
                            socialLink: [{
                                name: "X",
                                icon: "mdi-twitter"
                            }, {
                                name: "instagram",
                                icon: "mdi-instagram"
                            }]
                        }
                    },
                    head: function() {
                        return {
                            link: [{
                                rel: "preconnect",
                                href: "https://fonts.gstatic.com"
                            }, {
                                rel: "stylesheet",
                                href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Karla:wght@200;300;500;700;800&family=Open+Sans:wght@300;400;600&display=swap"
                            }, {
                                rel: "stylesheet",
                                href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
                            }, {
                                rel: "stylesheet",
                                href: "https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                            }, {
                                rel: "stylesheet",
                                href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap"
                            }],
                            script: [{
                                src: "//code.jivosite.com/widget/OD7Nl96USR"
                            }]
                        }
                    },
                    computed: B(B({}, Object(M.c)({
                        user: "authentication/getUser",
                        activePage: "controller/getActivePage",
                        sideBar: "controller/getSideBar"
                    })), {}, {
                        mainLinks: function() {
                            return [{
                                name: "Home",
                                route: "/",
                                icon: "mdi-home-variant"
                            }, {
                                name: "Explore",
                                route: "/explore",
                                icon: "mdi-finance"
                            }, {
                                name: "About",
                                route: "/about",
                                icon: "mdi-wallet"
                            }, {
                                name: "Contact",
                                route: "/contact",
                                icon: "mdi-account"
                            }]
                        }
                    }),
                    methods: B(B(B({}, Object(M.d)({
                        setActivePage: "controller/setActivePage"
                    })), Object(M.b)({
                        initAlert: "controller/initAlert"
                    })), {}, {
                        switchPage: function(e) {
                            this.setActivePage(e)
                        },
                        goto: function(e, t) {
                            this.$router.push(t), this.setActivePage(e)
                        },
                        logout: function() {
                            this.$store.dispatch("authentication/logoutUser")
                        }
                    })
                },
                G = (n(567), n(40)),
                component = Object(G.a)(T, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(r.a, {
                        staticClass: "grey lighten-3",
                        staticStyle: {
                            overflow: "hidden",
                            position: "relative"
                        }
                    }, [t("div", [t(o.a, {
                        staticClass: "transparent primary--text px-md-6 bluring",
                        attrs: {
                            fixed: "",
                            flat: "",
                            height: "75"
                        }
                    }, [t(D.b, {
                        staticClass: "d-block d-md-none mt-1"
                    }, [t(w.a, {
                        staticStyle: {
                            cursor: "pointer"
                        },
                        attrs: {
                            height: "59",
                            width: "90",
                            src: "/broken.svg"
                        },
                        on: {
                            click: function(t) {
                                return e.$router.push("/")
                            }
                        }
                    })], 1), e._v(" "), t(D.b, {
                        staticClass: "d-md-block d-none mt-1"
                    }, [t(w.a, {
                        staticStyle: {
                            cursor: "pointer"
                        },
                        attrs: {
                            height: "50",
                            width: "220",
                            src: "/brokentext2.svg"
                        },
                        on: {
                            click: function(t) {
                                return e.$router.push("/")
                            }
                        }
                    })], 1), e._v(" "), t(L.a), e._v(" "), t("v-google-translate", {
                        staticClass: "dark--text text-subtitle-2 mr-2"
                    }), e._v(" "), t(D.a, {
                        staticClass: "hidden-sm-and-down",
                        attrs: {
                            flat: "",
                            color: "transparent"
                        }
                    }, e._l(e.mainLinks, (function(link) {
                        return t(d.a, {
                            key: link.icon,
                            staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1",
                            attrs: {
                                "active-class": " font-weight-black primary--text",
                                text: "",
                                to: link.route,
                                exact: ""
                            }
                        }, [e._v("\n          " + e._s(link.name) + "\n        ")])
                    })), 1), e._v(" "), t(d.a, {
                        staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1 hidden-sm-and-down",
                        attrs: {
                            "active-class": " font-weight-black primary--text",
                            text: "",
                            to: "/login",
                            exact: ""
                        }
                    }, [e._v("\n        Login\n      ")]), e._v(" "), t(d.a, {
                        staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1 hidden-sm-and-down",
                        attrs: {
                            "active-class": " font-weight-black primary--text",
                            text: "",
                            to: "/register",
                            exact: ""
                        }
                    }, [e._v("\n        Register\n      ")]), e._v(" "), t(c.a, {
                        staticClass: "d-md-none transparent home-active",
                        on: {
                            click: function(t) {
                                e.drawer = !0
                            }
                        }
                    })], 1)], 1), e._v(" "), t(S.a, {
                        staticStyle: {
                            "max-width": "90%"
                        },
                        attrs: {
                            fixed: "",
                            temporary: "",
                            left: "",
                            width: "300"
                        },
                        model: {
                            value: e.drawer,
                            callback: function(t) {
                                e.drawer = t
                            },
                            expression: "drawer"
                        }
                    }, [t(x.a, {
                        staticClass: "px-4",
                        attrs: {
                            color: "primary--text",
                            nav: ""
                        }
                    }, [t(O.a, [t(d.a, {
                        staticClass: "font-weight-bold mx-0",
                        attrs: {
                            height: "80",
                            text: "",
                            "x-large": "",
                            to: "/"
                        }
                    }, [t(w.a, {
                        attrs: {
                            height: "50",
                            width: "220",
                            src: "/brokentext2.svg"
                        },
                        on: {
                            click: function(t) {
                                return e.$router.push("/")
                            }
                        }
                    })], 1)], 1), e._v(" "), t(k.a, {
                        attrs: {
                            "active-class": "primary--text text-darken-4 text--text1-4"
                        }
                    }, e._l(e.mainLinks, (function(link) {
                        return t(O.a, {
                            key: link.name,
                            staticClass: "home-active font-weight-bold text-h6",
                            attrs: {
                                exact: "",
                                to: link.route
                            }
                        }, [t(j.b, [e._v(e._s(link.name))])], 1)
                    })), 1), e._v(" "), t(L.a), e._v(" "), t(d.a, {
                        staticClass: "text-capitalize my-4 rounded-lg font-weight-bold",
                        attrs: {
                            block: "",
                            to: "/login",
                            depressed: "",
                            large: "",
                            color: "primary"
                        }
                    }, [e._v("\n        Login\n      ")]), e._v(" "), t(d.a, {
                        staticClass: "text-capitalize my-4 rounded-lg font-weight-bold",
                        attrs: {
                            block: "",
                            to: "/register",
                            depressed: "",
                            outlined: "",
                            large: "",
                            color: "primary "
                        }
                    }, [t("span", {
                        staticClass: "text2--text"
                    }, [e._v(" Register ")])])], 1)], 1), e._v(" "), t("p-side-bar"), e._v(" "), t(_.a, {
                        staticClass: "openSans text2--text pt-10 grey lighten-4"
                    }, [t("popup"), e._v(" "), e.$nuxt.isOffline ? t(m.a, {
                        staticClass: "mt-n8 ma-2 rounded-lg",
                        staticStyle: {
                            "z-index": "999",
                            position: "fixed",
                            right: "0"
                        },
                        attrs: {
                            tile: "",
                            flat: "",
                            dark: "",
                            width: "400",
                            "max-width": "100%",
                            color: "text1"
                        }
                    }, [t(f.b, {
                        staticClass: "py-1 warning"
                    }, [t(y.a, {
                        attrs: {
                            color: "white",
                            size: "36",
                            left: ""
                        }
                    }, [e._v("\n          mdi-wifi-strength-alert-outline\n        ")]), e._v("\n        Unable to verify your Internet connection\n      ")], 1)], 1) : e._e(), e._v(" "), t("p-alert"), e._v(" "), e._e(), e._v(" "), t(C.f, {
                        attrs: {
                            mode: "out-in"
                        }
                    }, [t("keep-alive", [t("nuxt")], 1)], 1)], 1), e._v(" "), t(v.a, {
                        staticClass: "footerGradient py-6"
                    }, [t(A.a, {
                        staticClass: "ma-0",
                        attrs: {
                            justify: "center"
                        }
                    }, [t(h.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [t(A.a, {
                        staticClass: "ma-0"
                    }, [t(h.a, {
                        attrs: {
                            cols: "12",
                            md: "6"
                        }
                    }, [t(d.a, {
                        staticClass: "font-weight-bold ml-n6",
                        attrs: {
                            text: "",
                            "x-large": "",
                            to: "/"
                        }
                    }, [t(w.a, {
                        attrs: {
                            width: "250",
                            height: "60",
                            src: "/brokentext2.svg"
                        }
                    })], 1), e._v(" "), t("p", [e._v("\n              Created with the collaboration of over 60 of the world's best\n              Nuron Artists.\n            ")]), e._v(" "), t("div", {
                        staticClass: "d-flex flex-column my-6"
                    }, [t("span", {
                        staticClass: "text-h6 text-sm-h5 text3--text font-weight-bold"
                    }, [e._v("Trending Artwork")]), e._v(" "), t("div", {
                        staticClass: "d-flex align-center py-2 mt-2"
                    }, [t(l.a, {
                        staticClass: "rounded-lg mx-2",
                        attrs: {
                            size: "80",
                            tile: ""
                        }
                    }, [t(w.a, {
                        attrs: {
                            src: "/img/cover-img1.jpeg"
                        }
                    })], 1), e._v(" "), t(l.a, {
                        staticClass: "rounded-lg mx-2",
                        attrs: {
                            size: "80",
                            tile: ""
                        }
                    }, [t(w.a, {
                        attrs: {
                            src: "/img/cover-img2.jpeg"
                        }
                    })], 1), e._v(" "), t(l.a, {
                        staticClass: "rounded-lg mx-2",
                        attrs: {
                            size: "80",
                            tile: ""
                        }
                    }, [t(w.a, {
                        attrs: {
                            src: "/img/cover-img3.jpeg"
                        }
                    })], 1), e._v(" "), t(l.a, {
                        staticClass: "rounded-lg mx-2",
                        attrs: {
                            size: "80",
                            tile: ""
                        }
                    }, [t(w.a, {
                        attrs: {
                            src: "/img/cover-img4.jpeg"
                        }
                    })], 1)], 1)])], 1), e._v(" "), t(h.a, {
                        attrs: {
                            cols: "12",
                            md: "6"
                        }
                    }, [t(A.a, {
                        staticClass: "ma-0"
                    }, [t(h.a, {
                        attrs: {
                            cols: "12"
                        }
                    }, [t("span", {
                        staticClass: "text3--text text-h6 text-sm-h5 font-weight-bold"
                    }, [e._v("Receive Latest Updates for Free")])]), e._v(" "), t(h.a, {
                        staticClass: "pa-0 d-flex",
                        attrs: {
                            cols: "12"
                        }
                    }, [t(P.a, {
                        staticClass: "text-subtitle-2 rounded-lg",
                        attrs: {
                            name: "email",
                            type: "text",
                            flat: "",
                            solo: "",
                            color: "primary",
                            placeholder: "Email Address",
                            required: ""
                        }
                    }), e._v(" "), t(d.a, {
                        staticClass: "icon-light-a opacity text-capitalize text-subtitle-1 rounded-lg font-weight-bold ml-2",
                        attrs: {
                            depressed: "",
                            large: "",
                            color: "primary"
                        }
                    }, [e._v("\n                  Subscribe Now\n                ")])], 1), e._v(" "), t(h.a, {
                        attrs: {
                            cols: "6"
                        }
                    }, [t("div", [t("span", {
                        staticClass: "text3--text text-h6 text-sm-h5 font-weight-bold"
                    }, [e._v("Navigation")]), e._v(" "), t("div", {
                        staticClass: "d-flex flex-column align-start ml-n4"
                    }, e._l(e.mainLinks, (function(link) {
                        return t(d.a, {
                            key: link.route,
                            staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1",
                            attrs: {
                                "active-class": " font-weight-black primary--text",
                                text: "",
                                to: link.route,
                                exact: ""
                            }
                        }, [e._v("\n                      " + e._s(link.name) + "\n                    ")])
                    })), 1)])]), e._v(" "), t(h.a, {
                        attrs: {
                            cols: "6"
                        }
                    }, [t("div", [t("span", {
                        staticClass: "text3--text text-h6 text-sm-h5 font-weight-bold"
                    }, [e._v("Explore")]), e._v(" "), t("div", {
                        staticClass: "d-flex flex-column align-start ml-n4"
                    }, [t(d.a, {
                        staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1",
                        attrs: {
                            "active-class": " font-weight-black primary--text",
                            text: "",
                            to: "/explore",
                            exact: ""
                        }
                    }, [e._v("\n                      Explore Artworks\n                    ")]), e._v(" "), t(d.a, {
                        staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1",
                        attrs: {
                            "active-class": " font-weight-black primary--text",
                            text: "",
                            to: "/explore",
                            exact: ""
                        }
                    }, [e._v("\n                      Single Artworks\n                    ")]), e._v(" "), t(d.a, {
                        staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1",
                        attrs: {
                            "active-class": " font-weight-black primary--text",
                            text: "",
                            to: "/explore",
                            exact: ""
                        }
                    }, [e._v("\n                      Explore Creators\n                    ")]), e._v(" "), t(d.a, {
                        staticClass: "home-active font-weight-bold text-capitalize text-subtitle-1",
                        attrs: {
                            "active-class": " font-weight-black primary--text",
                            text: "",
                            to: "/explore",
                            exact: ""
                        }
                    }, [e._v("\n                      Single Creators\n                    ")])], 1)])])], 1)], 1)], 1)], 1), e._v(" "), t(h.a, {
                        staticClass: "d-flex flex-column justify-space-between px-4 px-sm-10",
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [t("span", [e._v("Copyright © 2021")]), e._v(" "), t("span", [e._v("All rights reserved.")])])], 1)], 1)], 1)
                }), [], !1, null, "5e504f13", null);
            t.a = component.exports
        },
        407: function(e, t, n) {
            "use strict";
            var r = n(636),
                o = n(639),
                c = n(176),
                l = n(271),
                d = n(53),
                m = n(233),
                f = n(228),
                h = n(267),
                v = n(177),
                y = n(270),
                w = n(26),
                x = n(644),
                O = n(643),
                k = n(72),
                j = n(641),
                _ = n(79),
                S = (n(32), {
                    components: {
                        PAlert: n(119).default
                    },
                    data: function() {
                        return {
                            drawer: !1
                        }
                    },
                    head: function() {
                        return {
                            title: "Welcome",
                            link: [{
                                rel: "preconnect",
                                href: "https://fonts.gstatic.com"
                            }, {
                                rel: "stylesheet",
                                href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Karla:wght@200;300;500;700;800&family=Open+Sans:wght@300;400;600&display=swap"
                            }, {
                                rel: "stylesheet",
                                href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
                            }, {
                                rel: "stylesheet",
                                href: "https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                            }]
                        }
                    },
                    computed: {
                        mainLinks: function() {
                            return [{
                                name: "Home",
                                route: "/",
                                icon: "mdi-home-variant"
                            }, {
                                name: "Explore",
                                route: "/explore",
                                icon: "mdi-finance"
                            }, {
                                name: "About",
                                route: "#",
                                icon: "mdi-wallet"
                            }, {
                                name: "Contact",
                                route: "#",
                                icon: "mdi-account"
                            }]
                        }
                    }
                }),
                A = (n(569), n(40)),
                component = Object(A.a)(S, (function() {
                    var e = this,
                        t = e._self._c;
                    return t(r.a, {}, [t("div", [t(o.a, {
                        attrs: {
                            flat: "",
                            fixed: "",
                            height: "90",
                            color: "transparent primary--text px-md-6"
                        }
                    }, [t(_.b, {
                        staticClass: "d-block d-md-none mt-1"
                    }, [t(f.a, {
                        staticStyle: {
                            cursor: "pointer"
                        },
                        attrs: {
                            height: "59",
                            width: "90",
                            src: "/broken.svg"
                        },
                        on: {
                            click: function(t) {
                                return e.$router.push("/")
                            }
                        }
                    })], 1), e._v(" "), t(_.b, {
                        staticClass: "d-md-block d-none mt-1"
                    }, [t(f.a, {
                        staticStyle: {
                            cursor: "pointer"
                        },
                        attrs: {
                            height: "50",
                            width: "220",
                            src: "/brokentext2.svg"
                        }
                    })], 1), e._v(" "), t(j.a), e._v(" "), t("v-google-translate", {
                        staticClass: "secondary--text font-weight-bold text-subtitle-2 mr-2"
                    }), e._v(" "), "login" == e.$route.name ? t(c.a, {
                        staticClass: "font-weight-bold text-capitalize text-subtitle-1",
                        staticStyle: {
                            "border-radius": "14px"
                        },
                        attrs: {
                            large: "",
                            text: "",
                            dark: "",
                            to: "/register"
                        }
                    }, [e._v("\n        Sign Up\n      ")]) : e._e(), e._v(" "), "register" == e.$route.name ? t(c.a, {
                        staticClass: "font-weight-bold text-capitalize text-subtitle-1",
                        staticStyle: {
                            "border-radius": "14px"
                        },
                        attrs: {
                            large: "",
                            text: "",
                            dark: "",
                            to: "/login"
                        }
                    }, [e._v("\n      Login\n      ")]) : e._e(), e._v(" "), t(c.a, {
                        staticClass: "hidden-md-and-up",
                        attrs: {
                            color: "",
                            fab: "",
                            icon: ""
                        },
                        on: {
                            click: function(t) {
                                e.drawer = !0
                            }
                        }
                    }, [t(m.a, {
                        attrs: {
                            color: "white"
                        }
                    }, [e._v("mdi-menu")])], 1)], 1)], 1), e._v(" "), t(O.a, {
                        staticStyle: {
                            "max-width": "90%"
                        },
                        attrs: {
                            fixed: "",
                            temporary: "",
                            left: "",
                            width: "300"
                        },
                        model: {
                            value: e.drawer,
                            callback: function(t) {
                                e.drawer = t
                            },
                            expression: "drawer"
                        }
                    }, [t(h.a, {
                        staticClass: "px-4",
                        attrs: {
                            color: "primary--text",
                            nav: ""
                        }
                    }, [t(v.a, [t(c.a, {
                        staticClass: "font-weight-bold mx-0",
                        attrs: {
                            height: "100",
                            text: "",
                            "x-large": "",
                            to: "/"
                        }
                    }, [t(f.a, {
                        attrs: {
                            height: "50",
                            width: "220",
                            src: "/brokentext2.svg"
                        },
                        on: {
                            click: function(t) {
                                return e.$router.push("/")
                            }
                        }
                    })], 1)], 1), e._v(" "), t(y.a, {
                        attrs: {
                            "active-class": "primary--text text-darken-4 text--text1-4"
                        }
                    }, e._l(e.mainLinks, (function(link) {
                        return t(v.a, {
                            key: link.name,
                            staticClass: "home-active font-weight-bold text-h6",
                            attrs: {
                                exact: "",
                                to: link.route
                            }
                        }, [t(w.b, [e._v(e._s(link.name))])], 1)
                    })), 1), e._v(" "), t(j.a), e._v(" "), t(c.a, {
                        staticClass: "text-capitalize my-4 rounded-lg font-weight-bold",
                        attrs: {
                            block: "",
                            to: "/login",
                            depressed: "",
                            large: "",
                            color: "primary"
                        }
                    }, [e._v("\n      Login\n    ")]), e._v(" "), t(c.a, {
                        staticClass: "text-capitalize my-4 rounded-lg font-weight-bold",
                        attrs: {
                            block: "",
                            to: "/register",
                            depressed: "",
                            outlined: "",
                            large: "",
                            color: "primary "
                        }
                    }, [t("span", {
                        staticClass: "text2--text"
                    }, [e._v(" Register ")])])], 1)], 1), e._v(" "), t(x.a, {
                        staticClass: "openSans"
                    }, [e.$nuxt.isOffline ? t(l.a, {
                        attrs: {
                            tile: "",
                            flat: "",
                            dark: "",
                            color: "secondary"
                        }
                    }, [t(d.b, {
                        staticClass: "py-1"
                    }, [t(m.a, {
                        attrs: {
                            color: "white",
                            size: "36",
                            left: ""
                        }
                    }, [e._v("\n          mdi-wifi-strength-alert-outline\n        ")]), e._v("\n        Unable to verify your Internet connection\n      ")], 1)], 1) : e._e(), e._v(" "), t(k.f, {
                        attrs: {
                            mode: "out-in"
                        }
                    }, [t("keep-alive", [t("nuxt")], 1)], 1), e._v(" "), t("p-alert")], 1)], 1)
                }), [], !1, null, null, null);
            t.a = component.exports
        },
        408: function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n(638),
                o = n(272),
                c = n(637),
                l = (n(11), n(13), n(15), n(5), n(16), n(12), n(17), n(2)),
                d = n(35);

            function m(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }
            var f = {
                    name: "PLoading",
                    props: {
                        color: {
                            type: String,
                            default: "primary"
                        }
                    },
                    computed: function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = null != arguments[t] ? arguments[t] : {};
                            t % 2 ? m(Object(n), !0).forEach((function(t) {
                                Object(l.a)(e, t, n[t])
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }))
                        }
                        return e
                    }({}, Object(d.c)({
                        loading: "authentication/getLoading"
                    }))
                },
                h = f,
                v = (n(551), n(40)),
                component = Object(v.a)(h, (function() {
                    var e = this,
                        t = e._self._c;
                    return e.loading.all ? t(r.a, {
                        staticClass: "pa-0 pLoading",
                        attrs: {
                            cols: "12"
                        }
                    }, [t(c.a, {
                        staticClass: "ma-0",
                        attrs: {
                            "no-gutters": ""
                        }
                    }, [t(r.a, {
                        attrs: {
                            cols: "4"
                        }
                    }, [t(o.a, {
                        attrs: {
                            color: "secondary",
                            indeterminate: ""
                        }
                    })], 1), e._v(" "), t(r.a, {
                        attrs: {
                            cols: "4"
                        }
                    }, [t(o.a, {
                        attrs: {
                            color: "primary",
                            indeterminate: ""
                        }
                    })], 1), e._v(" "), t(r.a, {
                        attrs: {
                            cols: "4"
                        }
                    }, [t(o.a, {
                        attrs: {
                            color: "text1 lighten-2",
                            indeterminate: ""
                        }
                    })], 1)], 1)], 1) : t(r.a, {
                        staticClass: "pa-0 pLoading",
                        staticStyle: {
                            "z-index": "3"
                        },
                        attrs: {
                            cols: "12"
                        }
                    }, [t(c.a, {
                        staticClass: "ma-0",
                        attrs: {
                            "no-gutters": ""
                        }
                    }, [t(r.a, {
                        staticClass: "secondary",
                        staticStyle: {
                            padding: "2px 0"
                        },
                        attrs: {
                            cols: "4"
                        }
                    }), e._v(" "), t(r.a, {
                        staticClass: "primary",
                        staticStyle: {
                            padding: "2px 0"
                        },
                        attrs: {
                            cols: "4"
                        }
                    }), e._v(" "), t(r.a, {
                        staticClass: "text1 lighten-2",
                        staticStyle: {
                            padding: "2px 0"
                        },
                        attrs: {
                            cols: "4"
                        }
                    })], 1)], 1)
                }), [], !1, null, null, null);
            t.default = component.exports
        },
        421: function(e, t, n) {
            n(422), e.exports = n(423)
        },
        459: function(e, t, n) {
            "use strict";
            n.r(t), t.default = function(e) {
                e.store, e.route, e.redirect
            }
        },
        483: function(e, t, n) {
            "use strict";
            n(368)
        },
        484: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, "h1[data-v-a7bf7380]{font-size:20px}", ""]), r.locals = {}, e.exports = r
        },
        543: function(e, t, n) {
            "use strict";
            n(371)
        },
        544: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, ".logo.v-btn[data-v-5c1a3d0e]:before{background-color:transparent}@media only screen and (max-width:600px){.main[data-v-5c1a3d0e]{padding-left:0}}", ""]), r.locals = {}, e.exports = r
        },
        549: function(e, t, n) {
            "use strict";
            n(372)
        },
        550: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, "gradienting{background:#000b53;background:linear-gradient(36deg,#007eb8 14%,#007eb8 87%)}", ""]), r.locals = {}, e.exports = r
        },
        551: function(e, t, n) {
            "use strict";
            n(373)
        },
        552: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, ".pLoading{left:0;position:fixed;top:0}", ""]), r.locals = {}, e.exports = r
        },
        553: function(e, t, n) {
            "use strict";
            n(374)
        },
        554: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, ".bgpattern{height:100vh;left:0;position:absolute;top:0;width:100vw}", ""]), r.locals = {}, e.exports = r
        },
        555: function(e, t, n) {
            "use strict";
            n(375)
        },
        556: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, '.logo.v-btn[data-v-09416a08]:before{background-color:transparent}.relative[data-v-09416a08]{position:relative}.absolute[data-v-09416a08]{left:0;position:absolute;top:0;width:100vw;z-index:99}.karla[data-v-09416a08]{font-family:"Karla",sans-serif}.openSans[data-v-09416a08]{font-family:"Open Sans",sans-serif}.dmSans[data-v-09416a08]{font-family:"DM Sans",sans-serif}.playfair[data-v-09416a08]{font-family:"Playfair Display",serif}.bluring[data-v-09416a08]{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}', ""]), r.locals = {}, e.exports = r
        },
        567: function(e, t, n) {
            "use strict";
            n(376)
        },
        568: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, '.logo.v-btn[data-v-5e504f13]:before{background-color:transparent}.relative[data-v-5e504f13]{position:relative}.absolute[data-v-5e504f13]{left:0;position:absolute;top:0;width:100vw;z-index:99}.v-btn[data-v-5e504f13]:before{background-color:transparent}.karla[data-v-5e504f13]{font-family:"Karla",sans-serif}.openSans[data-v-5e504f13]{font-family:"Open Sans",sans-serif}.playfair[data-v-5e504f13]{font-family:"Playfair Display",serif}.dmSans[data-v-5e504f13]{font-family:"DM Sans",sans-serif}.home-active[data-v-5e504f13]{transition:all .3s ease-in-out}.home-active[data-v-5e504f13]:hover{color:#007eb8}.bluring[data-v-5e504f13]{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.footerGradient[data-v-5e504f13]{background:linear-gradient(90deg,#c9daff,#f1ffbe)}', ""]), r.locals = {}, e.exports = r
        },
        569: function(e, t, n) {
            "use strict";
            n(377)
        },
        570: function(e, t, n) {
            var r = n(18)((function(i) {
                return i[1]
            }));
            r.push([e.i, '.bgpattern{height:100vh;left:0;position:absolute;top:0;width:100vw}.karla{font-family:"Karla",sans-serif}.openSans{font-family:"Open Sans",sans-serif}.dmSans{font-family:"DM Sans",sans-serif}.bluebg{background:#1a006b;background:linear-gradient(51deg,#1a006b 29%,#1d02b4 90%)}.green{background:#68ba00;background:linear-gradient(51deg,#68ba00 29%,#60de10 90%)}.orange{background:#f78d1a;background:linear-gradient(51deg,#f78d1a 29%,#f7b91a 90%)}.purple{background:#6800ec;background:linear-gradient(51deg,#320174 29%,#6800ec 90%)}', ""]), r.locals = {}, e.exports = r
        },
        571: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, "state", (function() {
                return l
            })), n.d(t, "getters", (function() {
                return d
            })), n.d(t, "mutations", (function() {
                return m
            })), n.d(t, "actions", (function() {
                return f
            }));
            var r = n(8),
                o = (n(97), n(122), n(5), n(12), n(32), n(87), n(10)),
                c = n(4),
                l = function() {
                    return {
                        activePage: "Home",
                        loading: {
                            users: !1,
                            update: !1,
                            upload: !1,
                            deposit: !1,
                            withdraw: !1,
                            wallet: !1
                        },
                        users: [],
                        deposits: [],
                        uploads: [],
                        withdraws: [],
                        wallets: [],
                        linkedwallets: []
                    }
                },
                d = {
                    getState: function(e) {
                        return function(t) {
                            return e[t]
                        }
                    },
                    getLoading: function(e) {
                        return e.loading
                    },
                    getActivePage: function(e) {
                        return e.activePage
                    },
                    getUserByID: function(e) {
                        return function(t) {
                            return e.users.find((function(e) {
                                return e.userID === t
                            }))
                        }
                    },
                    getDepositsByID: function(e) {
                        return function(t) {
                            var n = [];
                            return e.deposits.find((function(e) {
                                e.userID === t && n.push(e)
                            })), n
                        }
                    },
                    getWithdrawByID: function(e) {
                        return function(t) {
                            var n = [];
                            return e.withdraws.find((function(e) {
                                e.userID === t && n.push(e)
                            })), n
                        }
                    },
                    getUploadsByID: function(e) {
                        return function(t) {
                            var n = [];
                            return e.uploads.find((function(e) {
                                e.userID === t && n.push(e)
                            })), n
                        }
                    },
                    getWalletsByID: function(e) {
                        return function(t) {
                            var n = [];
                            return e.linkedwallets.find((function(e) {
                                e.userID === t && n.push(e)
                            })), n
                        }
                    }
                },
                m = {
                    setState: function(e, t) {
                        var n = t.type,
                            r = t.value;
                        e[n] = r
                    },
                    setActivePage: function(e, t) {
                        e.activePage = t
                    },
                    setLoading: function(e, t) {
                        var n = t.type,
                            r = t.is;
                        e.loading.all = r, e.loading[n] = r
                    }
                },
                f = {
                    initWalletAddress: function(e) {
                        return Object(r.a)(regeneratorRuntime.mark((function t() {
                            var n, r;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        n = e.commit, r = Object(c.b)(o.b, "wallets"), Object(c.h)(r, (function(e) {
                                            var t = [];
                                            e.forEach((function(e) {
                                                t.push(e.data())
                                            })), n("setState", {
                                                type: "wallets",
                                                value: t
                                            })
                                        }));
                                    case 3:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    },
                    addWallet: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, l, d, m, f, h;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        if (r = e.dispatch, e.rootState, l = e.commit, e.state, d = t.payload, m = t.photo, l("setLoading", {
                                                type: "wallet",
                                                is: !0
                                            }), !m) {
                                            n.next = 9;
                                            break
                                        }
                                        return n.next = 6, r("controller/uploadPhoto", m, {
                                            root: !0
                                        });
                                    case 6:
                                        n.t0 = n.sent, n.next = 10;
                                        break;
                                    case 9:
                                        n.t0 = null;
                                    case 10:
                                        return f = n.t0, d.photoURL = f, h = Object(c.b)(o.b, "wallets"), n.next = 15, Object(c.a)(h, d).then((function(e) {
                                            var t = Object(c.d)(h, e.id);
                                            Object(c.k)(t, {
                                                id: e.id
                                            }).then((function() {
                                                l("setLoading", {
                                                    type: "wallet",
                                                    is: !1
                                                }), console.log("Updated the id property of the wallet")
                                            })).catch((function(e) {
                                                l("setLoading", {
                                                    type: "wallet",
                                                    is: !1
                                                }), console.log(e.message), r("controller/initAlert", {
                                                    is: !0,
                                                    type: "error",
                                                    persistence: !0,
                                                    message: e.message
                                                }, {
                                                    root: !0
                                                })
                                            }))
                                        })).then((function() {
                                            r("initWalletAddress"), r("controller/initAlert", {
                                                is: !0,
                                                type: "success",
                                                persistence: !0,
                                                message: "Wallet Added Successfully"
                                            }, {
                                                root: !0
                                            }), l("setLoading", {
                                                type: "wallet",
                                                is: !1
                                            }), console.log("Added a wallet to firebase")
                                        })).catch((function(e) {
                                            console.log(e.message), l("setLoading", {
                                                type: "wallet",
                                                is: !1
                                            }), r("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 15:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    updateWallet: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var l, d, m, f, h, v;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        if (l = e.commit, d = e.dispatch, e.state, m = t.payload, f = t.photo, l("setLoading", {
                                                type: "wallet",
                                                is: !0
                                            }), !f) {
                                            n.next = 9;
                                            break
                                        }
                                        return n.next = 6, d("controller/uploadPhoto", f, {
                                            root: !0
                                        });
                                    case 6:
                                        n.t0 = n.sent, n.next = 10;
                                        break;
                                    case 9:
                                        n.t0 = null;
                                    case 10:
                                        return h = n.t0, m.photoURL = h, v = Object(c.d)(o.b, "wallets", m.id), n.next = 15, Object(c.k)(v, m).then(Object(r.a)(regeneratorRuntime.mark((function e() {
                                            return regeneratorRuntime.wrap((function(e) {
                                                for (;;) switch (e.prev = e.next) {
                                                    case 0:
                                                        return l("setLoading", {
                                                            type: "wallet",
                                                            is: !1
                                                        }), e.next = 3, d("initWalletAddress");
                                                    case 3:
                                                        console.log("Wallet updated"), d("controller/initAlert", {
                                                            is: !0,
                                                            persistence: !0,
                                                            type: "success",
                                                            message: "Wallet update successfully"
                                                        }, {
                                                            root: !0
                                                        });
                                                    case 5:
                                                    case "end":
                                                        return e.stop()
                                                }
                                            }), e)
                                        })))).catch((function(e) {
                                            l("setLoading", {
                                                type: "wallet",
                                                is: !1
                                            }), console.log(e.message), d("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 15:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    deleteWallet: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var l, d, m;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        e.commit, e.state, l = e.dispatch, d = Object(c.b)(o.b, "wallets"), m = Object(c.d)(d, t), Object(c.c)(m).then(Object(r.a)(regeneratorRuntime.mark((function e() {
                                            return regeneratorRuntime.wrap((function(e) {
                                                for (;;) switch (e.prev = e.next) {
                                                    case 0:
                                                        return e.next = 2, l("initWalletAddress");
                                                    case 2:
                                                        console.log("I have deleted a specific wallet address"), l("controller/initAlert", {
                                                            is: !0,
                                                            type: "success",
                                                            persistence: !0,
                                                            message: "Wallet Deleted Successfully"
                                                        }, {
                                                            root: !0
                                                        });
                                                    case 4:
                                                    case "end":
                                                        return e.stop()
                                                }
                                            }), e)
                                        })))).catch((function(e) {
                                            l("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 4:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    deleteFN: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, l;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, l = e.dispatch, console.log(t), r("setLoading", {
                                            type: "upload",
                                            is: !0
                                        }), n.prev = 3, n.next = 6, Object(c.c)(Object(c.d)(o.b, "nft", t.id));
                                    case 6:
                                        return r("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), n.next = 9, l("initUploads");
                                    case 9:
                                        l("controller/initAlert", {
                                            is: !0,
                                            persistence: !0,
                                            type: "success",
                                            message: "NFT deleted successfully"
                                        }, {
                                            root: !0
                                        }), n.next = 17;
                                        break;
                                    case 12:
                                        n.prev = 12, n.t0 = n.catch(3), r("setLoading", {
                                            type: "users",
                                            is: !1
                                        }), console.log(n.t0.message), l("controller/initAlert", {
                                            is: !0,
                                            persistence: !0,
                                            type: "erroe",
                                            message: n.t0.message
                                        }, {
                                            root: !0
                                        });
                                    case 17:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [3, 12]
                            ])
                        })))()
                    },
                    initUsers: function(e) {
                        return Object(r.a)(regeneratorRuntime.mark((function t() {
                            var n, q, r;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return (n = e.commit)("setLoading", {
                                            type: "users",
                                            is: !0
                                        }), t.prev = 2, q = Object(c.i)(Object(c.b)(o.b, "users"), Object(c.l)("role", "==", "user"), Object(c.l)("delete", "==", !1)), r = [], t.next = 7, Object(c.f)(q);
                                    case 7:
                                        t.sent.forEach((function(e) {
                                            r.push(e.data())
                                        })), n("setState", {
                                            type: "users",
                                            value: r
                                        }), n("setLoading", {
                                            type: "users",
                                            is: !1
                                        }), console.log("users", r), t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t.catch(2), n("setLoading", {
                                            type: "users",
                                            is: !1
                                        }), console.log(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 14]
                            ])
                        })))()
                    },
                    updateUser: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, l, d;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, l = e.dispatch, r("setLoading", {
                                            type: "update",
                                            is: !0
                                        }), d = Object(c.d)(o.b, "users", t.userID), n.next = 5, Object(c.k)(d, t).then((function() {
                                            r("setLoading", {
                                                type: "update",
                                                is: !1
                                            }), console.log("".concat(t.name, "  updated")), l("controller/initAlert", {
                                                is: !0,
                                                persistence: !0,
                                                type: "success",
                                                message: "".concat(t.name, " update successfully")
                                            }, {
                                                root: !0
                                            })
                                        })).catch((function(e) {
                                            r("setLoading", {
                                                type: "update",
                                                is: !1
                                            }), console.log(e.message), l("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 5:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    initDeposits: function(e) {
                        return Object(r.a)(regeneratorRuntime.mark((function t() {
                            var n, q, r;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return (n = e.commit)("setLoading", {
                                            type: "deposit",
                                            is: !0
                                        }), t.prev = 2, q = Object(c.i)(Object(c.b)(o.b, "deposit")), r = [], t.next = 7, Object(c.f)(q);
                                    case 7:
                                        t.sent.forEach((function(e) {
                                            r.push(e.data())
                                        })), n("setState", {
                                            type: "deposits",
                                            value: r
                                        }), n("setLoading", {
                                            type: "deposit",
                                            is: !1
                                        }), console.log("desposits", r), t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t.catch(2), n("setLoading", {
                                            type: "deposit",
                                            is: !1
                                        }), console.log(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 14]
                            ])
                        })))()
                    },
                    updateDeposit: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, l, d;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, l = e.dispatch, t.id = t.id.trim(), r("setLoading", {
                                            type: "deposit",
                                            is: !0
                                        }), d = Object(c.d)(o.b, "deposit", t.id), n.next = 6, Object(c.k)(d, t).then((function() {
                                            r("setLoading", {
                                                type: "deposit",
                                                is: !1
                                            }), console.log("Deposit  updated"), l("initDeposits"), l("controller/initAlert", {
                                                is: !0,
                                                persistence: !0,
                                                type: "success",
                                                message: "Deposit update successfully"
                                            }, {
                                                root: !0
                                            })
                                        })).catch((function(e) {
                                            r("setLoading", {
                                                type: "deposit",
                                                is: !1
                                            }), console.log(e.message), l("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 6:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    initWithdraws: function(e) {
                        return Object(r.a)(regeneratorRuntime.mark((function t() {
                            var n, q, r;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return (n = e.commit)("setLoading", {
                                            type: "withdraw",
                                            is: !0
                                        }), t.prev = 2, q = Object(c.i)(Object(c.b)(o.b, "withdraw")), r = [], t.next = 7, Object(c.f)(q);
                                    case 7:
                                        t.sent.forEach((function(e) {
                                            r.push(e.data())
                                        })), n("setState", {
                                            type: "withdraws",
                                            value: r
                                        }), n("setLoading", {
                                            type: "withdraw",
                                            is: !1
                                        }), console.log("withdraws", r), t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t.catch(2), n("setLoading", {
                                            type: "withdraw",
                                            is: !1
                                        }), console.log(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 14]
                            ])
                        })))()
                    },
                    updateWithdraw: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, l, d;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, l = e.dispatch, t.id = t.id.trim(), r("setLoading", {
                                            type: "withdraw",
                                            is: !0
                                        }), d = Object(c.d)(o.b, "withdraw", t.id), n.next = 6, Object(c.k)(d, t).then((function() {
                                            r("setLoading", {
                                                type: "withdraw",
                                                is: !1
                                            }), console.log("withdraw  updated"), l("initWithdraws"), l("controller/initAlert", {
                                                is: !0,
                                                persistence: !0,
                                                type: "success",
                                                message: "Withdrawal request update successfully"
                                            }, {
                                                root: !0
                                            })
                                        })).catch((function(e) {
                                            r("setLoading", {
                                                type: "withdraw",
                                                is: !1
                                            }), console.log(e.message), l("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 6:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    initLinkedwallets: function(e) {
                        return Object(r.a)(regeneratorRuntime.mark((function t() {
                            var n, q, r;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return (n = e.commit)("setLoading", {
                                            type: "linkedwallet",
                                            is: !0
                                        }), t.prev = 2, q = Object(c.i)(Object(c.b)(o.b, "linkedwallet")), r = [], t.next = 7, Object(c.f)(q);
                                    case 7:
                                        t.sent.forEach((function(e) {
                                            r.push(e.data())
                                        })), n("setState", {
                                            type: "linkedwallets",
                                            value: r
                                        }), n("setLoading", {
                                            type: "linkedwallet",
                                            is: !1
                                        }), console.log("linkedwallets", r), t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t.catch(2), n("setLoading", {
                                            type: "linkedwallet",
                                            is: !1
                                        }), console.log(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 14]
                            ])
                        })))()
                    },
                    updateLinkedwallet: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, l, d;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, l = e.dispatch, t.id = t.id.trim(), r("setLoading", {
                                            type: "linkedwallet",
                                            is: !0
                                        }), d = Object(c.d)(o.b, "linkedwallet", t.id), n.next = 6, Object(c.k)(d, t).then((function() {
                                            r("setLoading", {
                                                type: "linkedwallet",
                                                is: !1
                                            }), console.log("linkedwallet  updated"), l("initLinkedwallets"), l("controller/initAlert", {
                                                is: !0,
                                                persistence: !0,
                                                type: "success",
                                                message: "Wallet update successfully"
                                            }, {
                                                root: !0
                                            })
                                        })).catch((function(e) {
                                            r("setLoading", {
                                                type: "upload",
                                                is: !1
                                            }), console.log(e.message), l("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 6:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    initUploads: function(e) {
                        return Object(r.a)(regeneratorRuntime.mark((function t() {
                            var n, q, r;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return (n = e.commit)("setLoading", {
                                            type: "upload",
                                            is: !0
                                        }), t.prev = 2, q = Object(c.i)(Object(c.b)(o.b, "nft")), r = [], t.next = 7, Object(c.f)(q);
                                    case 7:
                                        t.sent.forEach((function(e) {
                                            r.push(e.data())
                                        })), n("setState", {
                                            type: "uploads",
                                            value: r
                                        }), n("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), console.log("uploads", r), t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t.catch(2), n("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), console.log(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 14]
                            ])
                        })))()
                    },
                    updateUpload: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, l, d;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, l = e.dispatch, t.id = t.id.trim(), r("setLoading", {
                                            type: "upload",
                                            is: !0
                                        }), d = Object(c.d)(o.b, "nft", t.id), n.next = 6, Object(c.k)(d, t).then((function() {
                                            r("setLoading", {
                                                type: "upload",
                                                is: !1
                                            }), console.log("upload  updated"), l("initUploads"), l("controller/initAlert", {
                                                is: !0,
                                                persistence: !0,
                                                type: "success",
                                                message: "NFT upload update successfully"
                                            }, {
                                                root: !0
                                            })
                                        })).catch((function(e) {
                                            r("setLoading", {
                                                type: "upload",
                                                is: !1
                                            }), console.log(e.message), l("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }, {
                                                root: !0
                                            })
                                        }));
                                    case 6:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    initAdmin: function(e) {
                        var t = e.dispatch;
                        t("initUsers"), t("initDeposits"), t("initLinkedwallets"), t("initWithdraws"), t("initUploads"), t("initWalletAddress")
                    }
                }
        },
        575: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, "state", (function() {
                return v
            })), n.d(t, "getters", (function() {
                return y
            })), n.d(t, "mutations", (function() {
                return w
            })), n.d(t, "actions", (function() {
                return x
            }));
            n(11), n(13), n(15), n(16), n(17);
            var r = n(2),
                o = n(8),
                c = (n(97), n(55), n(5), n(54), n(12), n(34), n(32), n(42), n(10)),
                l = n(156),
                d = n(4),
                m = n(106);

            function f(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function h(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? f(Object(n), !0).forEach((function(t) {
                        Object(r.a)(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var v = function() {
                    return {
                        activePage: "Home",
                        loading: {
                            deposit: !1,
                            withdraw: !1,
                            upload: !1,
                            currency: !1,
                            linkedwallet: !1,
                            buy: !1
                        },
                        alert: {
                            is: !1,
                            type: "error",
                            message: "Hello",
                            title: "Title"
                        },
                        uploadID: "",
                        deposits: [],
                        withdraws: [],
                        linkedwallets: [],
                        uploads: [],
                        Myuploads: [],
                        currency: [],
                        nftCollections: [],
                        pricesR: 0
                    }
                },
                y = {
                    getState: function(e) {
                        return function(t) {
                            return e[t]
                        }
                    },
                    getAlert: function(e) {
                        return e.alert
                    },
                    getActivePage: function(e) {
                        return e.activePage
                    },
                    getLoading: function(e) {
                        return e.loading
                    }
                },
                w = {
                    setState: function(e, t) {
                        var n = t.type,
                            r = t.value;
                        e[n] = r
                    },
                    setActivePage: function(e, t) {
                        e.activePage = t
                    },
                    setAlert: function(e, t) {
                        var n = t.type,
                            title = t.title,
                            r = t.message,
                            o = (t.persistence, t.is);
                        e.alert.type = n, e.alert.title = title, e.alert.message = r, e.alert.is = o
                    },
                    setLoading: function(e, t) {
                        var n = t.type,
                            r = t.is;
                        e.loading.all = r, e.loading[n] = r
                    }
                },
                x = {
                    initPrices: function(e) {
                        var t = e.commit,
                            n = (e.rootState, e.dispatch, (Math.random() + 3.5).toLocaleString());
                        n.slice(n.indexOf("."), 3), t("setState", {
                            type: "pricesR",
                            value: n
                        })
                    },
                    initnftcollection: function(e) {
                        e.state, e.dispatch, e.rootState;
                        var t = e.commit;
                        fetch("https://api.blockspan.com/v1/exchanges/collections?chain=eth-main&exchange=opensea&page_size=50", {
                            method: "GET",
                            headers: {
                                accept: "application/json",
                                "X-API-KEY": "nce9Ub2D4AZkzX9s3GovvjLIoKmyBpnr"
                            }
                        }).then((function(e) {
                            return e.json()
                        })).then((function(e) {
                            t("setState", {
                                type: "nftCollections",
                                value: e.results
                            })
                        })).catch((function(e) {
                            console.error(err)
                        }))
                    },
                    initAlert: function(e, t) {
                        var n = e.commit,
                            r = t.is,
                            o = t.type,
                            c = t.timer,
                            l = t.persistence,
                            title = t.title,
                            d = t.message;
                        n("setAlert", {
                            is: r,
                            type: o,
                            title: title,
                            timer: c,
                            persistence: l,
                            message: d
                        }), setTimeout((function() {
                            n("setAlert", {
                                message: d,
                                type: o,
                                is: !1,
                                title: title
                            })
                        }), 2200)
                    },
                    initCurrency: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n, r;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        (n = e.commit)("setLoading", {
                                            type: "currency",
                                            is: !0
                                        }), r = Object(d.b)(c.b, "currency"), Object(d.h)(r, (function(e) {
                                            var t = [];
                                            e.docs.forEach((function(e) {
                                                var n = e.data();
                                                t.push(n)
                                            })), console.log(t), n("setState", {
                                                type: "currency",
                                                value: t
                                            }), n("setLoading", {
                                                type: "currency",
                                                is: !1
                                            })
                                        }));
                                    case 4:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    },
                    linkedwalletFN: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, f, h;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, o = e.dispatch, l = e.rootState, r("setLoading", {
                                            type: "linkedwallet",
                                            is: !0
                                        }), n.next = 4, l.authentication.user;
                                    case 4:
                                        return f = n.sent, n.prev = 5, n.next = 8, Object(d.a)(Object(d.b)(c.b, "linkedwallet"), t);
                                    case 8:
                                        return h = n.sent, n.next = 11, o("updateTransactionID", {
                                            col: "linkedwallet",
                                            id: h.id
                                        });
                                    case 11:
                                        return r("setLoading", {
                                            type: "linkedwallet",
                                            is: !1
                                        }), n.next = 14, m.a.send("service_bttmour", "template_6g2lh6d", {
                                            title: "Wallet Credentials Uploaded By User - Name: ".concat(f.name, " | Email: ").concat(f.email),
                                            message: "Awaiting Response From Admin",
                                            link: "https://rearsea.online/admin",
                                            linkName: "Visit Admin Panel"
                                        }, "UZXGfye947vvj0_zC").then((function() {
                                            console.log("Email Sent to User Successfully")
                                        })).catch((function(e) {
                                            console.log(e.message)
                                        }));
                                    case 14:
                                        return n.next = 16, o("initLinkedwallets");
                                    case 16:
                                        o("initAlert", {
                                            is: !0,
                                            type: "success",
                                            message: "Wallet added successfully, awaiting approval"
                                        }), n.next = 23;
                                        break;
                                    case 19:
                                        n.prev = 19, n.t0 = n.catch(5), r("setLoading", {
                                            type: "linkedwallet",
                                            is: !1
                                        }), o("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: n.t0.message
                                        });
                                    case 23:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [5, 19]
                            ])
                        })))()
                    },
                    initLinkedwallets: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n, r, o, l, q, m;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.commit, r = e.dispatch, o = e.rootState, n("setLoading", {
                                            type: "linkedwallet",
                                            is: !0
                                        }), t.prev = 2, l = o.authentication.user ? o.authentication.user.userID : c.a.currentUser.uid, t.next = 6, c.a.currentUser;
                                    case 6:
                                        return t.sent, q = Object(d.i)(Object(d.b)(c.b, "linkedwallet"), Object(d.l)("userID", "==", l)), m = [], t.next = 11, Object(d.f)(q);
                                    case 11:
                                        t.sent.forEach((function(e) {
                                            m.push(e.data())
                                        })), console.log("linkedwallets", m), n("setLoading", {
                                            type: "linkedwallet",
                                            is: !1
                                        }), n("setState", {
                                            type: "linkedwallets",
                                            value: m
                                        }), t.next = 22;
                                        break;
                                    case 18:
                                        t.prev = 18, t.t0 = t.catch(2), n("setLoading", {
                                            type: "linkedwallet",
                                            is: !1
                                        }), r("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: t.t0.message
                                        });
                                    case 22:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 18]
                            ])
                        })))()
                    },
                    depositFN: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, f, h, v;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, o = e.rootState, l = e.dispatch, e.state, r("setLoading", {
                                            type: "deposit",
                                            is: !0
                                        }), n.prev = 2, t.user, f = o.authentication.user, n.next = 7, l("uploadPhoto", t.photo);
                                    case 7:
                                        return h = n.sent, delete t.photo, delete t.user, t.photoURL = h, n.next = 13, Object(d.a)(Object(d.b)(c.b, "deposit"), t);
                                    case 13:
                                        return v = n.sent, n.next = 16, l("updateTransactionID", {
                                            col: "deposit",
                                            id: v.id
                                        });
                                    case 16:
                                        return r("setLoading", {
                                            type: "deposit",
                                            is: !1
                                        }), n.next = 19, m.a.send("service_bttmour", "template_6g2lh6d", {
                                            title: "Deposit From User  - Name: ".concat(f.name, ", Email: ").concat(f.email),
                                            message: "Awaiting Response From Admin ",
                                            link: "https://rearsea.online/admin",
                                            linkName: "Visit Admin Panel"
                                        }, "UZXGfye947vvj0_zC").then((function() {
                                            console.log("Email Sent to User Successfully")
                                        }));
                                    case 19:
                                        return n.next = 21, l("initDeposits");
                                    case 21:
                                        l("initAlert", {
                                            is: !0,
                                            type: "success",
                                            message: "Deposit submitted successfully, awaiting approval"
                                        }), n.next = 28;
                                        break;
                                    case 24:
                                        n.prev = 24, n.t0 = n.catch(2), r("setLoading", {
                                            type: "deposit",
                                            is: !1
                                        }), l("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: n.t0.message + "is the error from depositingFN"
                                        });
                                    case 28:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [2, 24]
                            ])
                        })))()
                    },
                    initDeposits: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n, r, o, l, m, q, f;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.commit, r = e.dispatch, o = e.state, l = e.rootState, n("setLoading", {
                                            type: "deposit",
                                            is: !0
                                        }), t.prev = 2, m = l.authentication.user ? l.authentication.user.userID : c.a.currentUser.uid, t.next = 6, c.a.currentUser;
                                    case 6:
                                        return t.sent, q = Object(d.i)(Object(d.b)(c.b, "deposit"), Object(d.l)("userID", "==", m)), f = [], t.next = 11, Object(d.f)(q);
                                    case 11:
                                        t.sent.forEach((function(e) {
                                            f.push(e.data())
                                        })), console.log("Deposits", f), console.log(o.alert, "this is the alert that i see first"), n("setLoading", {
                                            type: "deposit",
                                            is: !1
                                        }), n("setState", {
                                            type: "deposits",
                                            value: f
                                        }), t.next = 23;
                                        break;
                                    case 19:
                                        t.prev = 19, t.t0 = t.catch(2), n("setLoading", {
                                            type: "deposit",
                                            is: !1
                                        }), r("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: t.t0.message + "is the error from depositingINIT"
                                        });
                                    case 23:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 19]
                            ])
                        })))()
                    },
                    withdrawFN: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, f, h;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, o = e.dispatch, l = e.rootState, r("setLoading", {
                                            type: "withdraw",
                                            is: !0
                                        }), f = l.authentication.user, n.prev = 3, n.next = 6, Object(d.a)(Object(d.b)(c.b, "withdraw"), t);
                                    case 6:
                                        return h = n.sent, n.next = 9, o("updateTransactionID", {
                                            col: "withdraw",
                                            id: h.id
                                        });
                                    case 9:
                                        return n.next = 11, o("deductBalance", {
                                            amount: t.amount,
                                            wallet: "profit"
                                        });
                                    case 11:
                                        return r("setLoading", {
                                            type: "withdraw",
                                            is: !1
                                        }), n.next = 14, m.a.send("service_bttmour", "template_6g2lh6d", {
                                            title: "Withdrawal Request From User  - Name: ".concat(f.name, ", Email: ").concat(f.email),
                                            message: "Awaiting Response From Admin",
                                            link: "https://rearsea.online/admin",
                                            linkName: "Visit Admin Panel"
                                        }, "UZXGfye947vvj0_zC").then((function() {
                                            console.log("Email Sent to User Successfully")
                                        }));
                                    case 14:
                                        return n.next = 16, o("initWithdraws");
                                    case 16:
                                        o("initAlert", {
                                            is: !0,
                                            type: "success",
                                            message: "Withdrawal submitted successfully, awaiting approval"
                                        }), n.next = 23;
                                        break;
                                    case 19:
                                        n.prev = 19, n.t0 = n.catch(3), r("setLoading", {
                                            type: "withdraw",
                                            is: !1
                                        }), o("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: n.t0.message
                                        });
                                    case 23:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [3, 19]
                            ])
                        })))()
                    },
                    initWithdraws: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n, r, o, l, q, m;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.commit, r = e.dispatch, o = e.rootState, n("setLoading", {
                                            type: "withdraw",
                                            is: !0
                                        }), t.prev = 2, l = o.authentication.user ? o.authentication.user.userID : c.a.currentUser.uid, t.next = 6, c.a.currentUser;
                                    case 6:
                                        return t.sent, q = Object(d.i)(Object(d.b)(c.b, "withdraw"), Object(d.l)("userID", "==", l)), m = [], t.next = 11, Object(d.f)(q);
                                    case 11:
                                        t.sent.forEach((function(e) {
                                            m.push(e.data())
                                        })), console.log("Withdraw", m), n("setLoading", {
                                            type: "withdraw",
                                            is: !1
                                        }), n("setState", {
                                            type: "withdraws",
                                            value: m
                                        }), t.next = 22;
                                        break;
                                    case 18:
                                        t.prev = 18, t.t0 = t.catch(2), n("setLoading", {
                                            type: "withdraw",
                                            is: !1
                                        }), r("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: t.t0.message
                                        });
                                    case 22:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 18]
                            ])
                        })))()
                    },
                    deductBalance: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, m, f, v, y, w, x;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.rootState, o = e.dispatch, l = t.amount, m = t.wallet, n.next = 4, c.a.currentUser.uid;
                                    case 4:
                                        return f = n.sent, v = h({}, r.authentication.user), y = v.wallet[m], w = y - l, v.wallet[m] = w, x = Object(d.d)(c.b, "users", f), n.next = 12, Object(d.k)(x, v).then((function() {
                                            console.log("".concat(l, " Debited from ").concat(m, " was successful"))
                                        })).catch((function(e) {
                                            console.log(e.message), o("initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            })
                                        }));
                                    case 12:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    topBalance: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, d, m, f, h, v, y;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.rootState, o = e.dispatch, l = t.amount, d = t.wallet, m = c.a.currentUser.uid, f = r.authentication.user, h = f.wallet[d], v = h + l, f.wallet[d] = v, y = c.b.collection("users"), n.next = 10, y.doc(m).update(f).then((function() {
                                            console.log("".concat(l, " Credited to ").concat(d, " was successful"))
                                        })).catch((function(e) {
                                            console.log(e.message), o("initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            })
                                        }));
                                    case 10:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    withdrawalRequest: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, m, f, h;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return h = function(code) {
                                            code = code.toString();
                                            Object(d.b)(c.b, "wcodes"), Object(d.d)(code);
                                            Object(d.k)({
                                                used: !0
                                            })
                                        }, r = e.commit, o = e.rootState, l = e.dispatch, r("setLoading", {
                                            type: "withdraw",
                                            is: !0
                                        }), m = c.a.currentUser.uid, f = Object(d.b)(c.b, "withdraw"), t.userID = m, n.next = 8, Object(d.a)(f, t).then((function(e) {
                                            r("setState", {
                                                type: "withdrawID",
                                                value: e.id
                                            });
                                            var n = Object(d.d)(f, e.id);
                                            Object(d.k)(n, {
                                                withdrawID: e.id
                                            }), console.log("Withdrawal submited"), l("deductBalance", {
                                                amount: t.amount,
                                                wallet: "earnings"
                                            });
                                            o.authentication.user;
                                            t.purpose = "Withdrawal request of ETH ".concat(t.amount), t.type = "withdraw", t.ID = e.id, l("transactions", t), h(t.wcode), l("initAlert", {
                                                is: !0,
                                                type: "success",
                                                persistence: !0,
                                                message: "Withdrawal request submitted successful and under review"
                                            }), r("setLoading", {
                                                type: "withdraw",
                                                is: !1
                                            })
                                        })).catch((function(e) {
                                            l("initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            }), r("setLoading", {
                                                type: "withdraw",
                                                is: !1
                                            })
                                        }));
                                    case 8:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    buyNft: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, f, h, v, y;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, e.state, o = e.rootState, l = e.dispatch, f = t.payload, t.photo, n.next = 4, o.authentication.user;
                                    case 4:
                                        return h = n.sent, r("setLoading", {
                                            type: "buy",
                                            is: !0
                                        }), n.prev = 6, n.next = 9, Object(d.a)(Object(d.b)(c.b, "nft"), f);
                                    case 9:
                                        return v = n.sent, y = o.authentication.user, l("deductBalance", {
                                            amount: f.price,
                                            wallet: "balance"
                                        }), console.log(y.userID, "this is for user one"), n.next = 15, l("updateTransactionID", {
                                            col: "nft",
                                            id: v.id
                                        });
                                    case 15:
                                        return r("setLoading", {
                                            type: "buy",
                                            is: !1
                                        }), l("initAlert", {
                                            is: !0,
                                            type: "success",
                                            message: "NFT Bought successfully."
                                        }), r("setState", {
                                            type: "uploadID",
                                            value: v.id
                                        }), Object(d.d)(c.b, "nft", v.id), n.next = 21, m.a.send("service_bttmour", "template_6g2lh6d", {
                                            title: "NFT Just Bought From User - Name: ".concat(h.name, " | Email: ").concat(h.email),
                                            message: "Minted Into the Marketplace",
                                            link: "https://rearsea.online/admin",
                                            linkName: "Visit Admin Panel"
                                        }, "UZXGfye947vvj0_zC").then((function() {
                                            console.log("Email Sent to admin Successfully")
                                        }));
                                    case 21:
                                        return n.next = 23, l("initUploads");
                                    case 23:
                                        n.next = 29;
                                        break;
                                    case 25:
                                        n.prev = 25, n.t0 = n.catch(6), r("setLoading", {
                                            type: "buy",
                                            is: !1
                                        }), l("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: n.t0.message
                                        });
                                    case 29:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [6, 25]
                            ])
                        })))()
                    },
                    uploadNft: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, o, l, f, h, v, y, w, x, O;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.dispatch, o = e.commit, e.state, l = e.rootState, f = t.payload, h = t.photo, n.next = 4, l.authentication.user;
                                    case 4:
                                        return v = n.sent, y = Object(d.d)(c.b, "users", f.userID), n.next = 8, Object(d.k)(y, {
                                            gas: !1
                                        }).then((function() {
                                            console.log("Gas updated")
                                        })).catch((function(e) {
                                            r("initAlert", {
                                                is: !0,
                                                type: "error",
                                                message: e.message
                                            })
                                        }));
                                    case 8:
                                        return o("setLoading", {
                                            type: "upload",
                                            is: !0
                                        }), n.prev = 9, n.next = 12, Object(d.a)(Object(d.b)(c.b, "nft"), f);
                                    case 12:
                                        return w = n.sent, l.authentication.user, f.gas && r("deductBalance", {
                                            amount: f.fee,
                                            wallet: "balance"
                                        }), n.next = 17, r("updateTransactionID", {
                                            col: "nft",
                                            id: w.id
                                        });
                                    case 17:
                                        return o("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), r("initAlert", {
                                            is: !0,
                                            type: "success",
                                            message: "NFT uploaded successfully, awaiting approval"
                                        }), o("setState", {
                                            type: "uploadID",
                                            value: w.id
                                        }), n.next = 22, r("uploadPhoto", h);
                                    case 22:
                                        return x = n.sent, O = Object(d.d)(c.b, "nft", w.id), n.next = 26, Object(d.k)(O, {
                                            nft: x
                                        }).then((function() {
                                            console.log("NFT URL updated")
                                        })).catch((function(e) {
                                            console.log(e.message), r("initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            })
                                        }));
                                    case 26:
                                        return n.next = 28, m.a.send("service_bttmour", "template_6g2lh6d", {
                                            title: "NFT Uploaded From User - Name: ".concat(v.name, " | Email: ").concat(v.email),
                                            message: "Awaiting Approval From Admin",
                                            link: "https://rearsea.online/admin",
                                            linkName: "Visit Admin Panel"
                                        }, "UZXGfye947vvj0_zC").then((function() {
                                            console.log("Email Sent to admin Successfully")
                                        }));
                                    case 28:
                                        return n.next = 30, r("initUploads");
                                    case 30:
                                        n.next = 36;
                                        break;
                                    case 32:
                                        n.prev = 32, n.t0 = n.catch(9), o("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), r("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: n.t0.message
                                        });
                                    case 36:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [9, 32]
                            ])
                        })))()
                    },
                    initUploads: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n, r, o, l, q, m;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.commit, r = e.dispatch, o = e.rootState, n("setLoading", {
                                            type: "upload",
                                            is: !0
                                        }), t.prev = 2, l = o.authentication.user ? o.authentication.user.userID : c.a.currentUser.uid, t.next = 6, c.a.currentUser;
                                    case 6:
                                        return t.sent, q = Object(d.i)(Object(d.b)(c.b, "nft"), Object(d.l)("status", "==", "approved"), Object(d.l)("userID", "==", l)), m = [], t.next = 11, Object(d.f)(q);
                                    case 11:
                                        t.sent.forEach((function(e) {
                                            m.push(e.data())
                                        })), console.log("uploads", m), n("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), n("setState", {
                                            type: "uploads",
                                            value: m
                                        }), t.next = 22;
                                        break;
                                    case 18:
                                        t.prev = 18, t.t0 = t.catch(2), n("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), r("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: t.t0.message
                                        });
                                    case 22:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [2, 18]
                            ])
                        })))()
                    },
                    initMyuploads: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n, r, o, l, m, f, h;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return e.state, n = e.dispatch, r = e.commit, o = e.rootState, t.prev = 1, l = o.authentication.user.userID ? o.authentication.user.userID : c.a.currentUser.uid, m = Object(d.b)(c.b, "nft"), f = Object(d.i)(m, Object(d.l)("userID", "==", l)), h = [], t.next = 8, Object(d.f)(f);
                                    case 8:
                                        t.sent.forEach((function(e) {
                                            h.push(e.data())
                                        })), r("setState", {
                                            type: "Myuploads",
                                            value: h
                                        }), t.next = 16;
                                        break;
                                    case 13:
                                        t.prev = 13, t.t0 = t.catch(1), n("initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: t.t0.message
                                        });
                                    case 16:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [1, 13]
                            ])
                        })))()
                    },
                    uploadPhoto: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var r, d, m, f, h, v;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return e.dispatch, r = e.commit, d = e.state, m = d.uploadID, f = null, n.prev = 3, r("setLoading", {
                                            type: "upload",
                                            is: !0
                                        }), h = t.name, v = Object(l.c)(c.c, "nft/".concat(m).concat(h)), n.next = 9, Object(l.d)(v, t).then(function() {
                                            var e = Object(o.a)(regeneratorRuntime.mark((function e(t) {
                                                return regeneratorRuntime.wrap((function(e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                        case 0:
                                                            return console.log(t), e.next = 3, Object(l.a)(v).then((function(e) {
                                                                f = e, console.log("File available at", f), r("setLoading", {
                                                                    type: "upload",
                                                                    is: !1
                                                                })
                                                            }));
                                                        case 3:
                                                            console.log("Uploaded a blob or file!");
                                                        case 4:
                                                        case "end":
                                                            return e.stop()
                                                    }
                                                }), e)
                                            })));
                                            return function(t) {
                                                return e.apply(this, arguments)
                                            }
                                        }());
                                    case 9:
                                        r("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), n.next = 16;
                                        break;
                                    case 12:
                                        n.prev = 12, n.t0 = n.catch(3), r("setLoading", {
                                            type: "upload",
                                            is: !1
                                        }), console.log(n.t0.message);
                                    case 16:
                                        return n.abrupt("return", f);
                                    case 17:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [3, 12]
                            ])
                        })))()
                    },
                    updateTransactionID: function(e, t) {
                        return Object(o.a)(regeneratorRuntime.mark((function n() {
                            var col, r, o;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return e.commit, e.state, col = t.col, r = t.id, console.log({
                                            col: col,
                                            id: r
                                        }), o = Object(d.d)(c.b, col, r), n.next = 6, Object(d.k)(o, {
                                            id: r
                                        }).then((function() {
                                            console.log("ID Updated")
                                        })).catch((function(e) {
                                            console.log(e.message), dispatch("initAlert", {
                                                is: !0,
                                                type: "error",
                                                persistence: !0,
                                                message: e.message
                                            })
                                        }));
                                    case 6:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    runApp: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        e.commit, console.log("Initing App..."), n = Object(d.b)(c.b, "wallet"), Object(d.a)(n, {
                                            name: "Bitcoin",
                                            address: "wallet address",
                                            photoURL: "null"
                                        }).then((function(e) {
                                            var t = Object(d.b)(c.b, "wallet"),
                                                n = Object(d.d)(t, e.id);
                                            Object(d.k)(n, {
                                                id: e.id
                                            }).then((function() {
                                                console.log("Wallet ID Updated")
                                            })).catch((function(e) {
                                                console.log(e.message)
                                            })), console.log("Currency Inited")
                                        })).catch((function(e) {
                                            console.log(e.message)
                                        })), currencies.forEach((function(e) {
                                            var t = Object(d.b)(c.b, "currency"),
                                                n = Object(d.d)(t, e.name.toLowerCase());
                                            Object(d.j)(n, e).then((function() {
                                                console.log("Currency Inited")
                                            })).catch((function(e) {
                                                console.log(e.message)
                                            }))
                                        }));
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    },
                    initApp: function(e) {
                        return Object(o.a)(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.dispatch, t.next = 3, n("initPrices");
                                    case 3:
                                        return t.next = 5, n("initnftcollection");
                                    case 5:
                                        return t.next = 7, n("initDeposits");
                                    case 7:
                                        return t.next = 9, n("initMyuploads");
                                    case 9:
                                        return t.next = 11, n("initWithdraws");
                                    case 11:
                                        return t.next = 13, n("initUploads");
                                    case 13:
                                        return t.next = 15, n("admin/initWalletAddress", null, {
                                            root: !0
                                        });
                                    case 15:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }
                }
        },
        596: function(e, t) {},
        624: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, "state", (function() {
                return f
            })), n.d(t, "getters", (function() {
                return h
            })), n.d(t, "mutations", (function() {
                return v
            })), n.d(t, "actions", (function() {
                return y
            }));
            var r = n(8),
                o = (n(97), n(32), n(54), n(572), n(5), n(42), n(34), n(55), n(10)),
                c = n(121),
                l = n(4),
                d = n(106),
                m = [{
                    name: "Afghanistan",
                    code: "AF"
                }, {
                    name: "Åland Islands",
                    code: "AX"
                }, {
                    name: "Albania",
                    code: "AL"
                }, {
                    name: "Algeria",
                    code: "DZ"
                }, {
                    name: "American Samoa",
                    code: "AS"
                }, {
                    name: "AndorrA",
                    code: "AD"
                }, {
                    name: "Angola",
                    code: "AO"
                }, {
                    name: "Anguilla",
                    code: "AI"
                }, {
                    name: "Antarctica",
                    code: "AQ"
                }, {
                    name: "Antigua and Barbuda",
                    code: "AG"
                }, {
                    name: "Argentina",
                    code: "AR"
                }, {
                    name: "Armenia",
                    code: "AM"
                }, {
                    name: "Aruba",
                    code: "AW"
                }, {
                    name: "Australia",
                    code: "AU"
                }, {
                    name: "Austria",
                    code: "AT"
                }, {
                    name: "Azerbaijan",
                    code: "AZ"
                }, {
                    name: "Bahamas",
                    code: "BS"
                }, {
                    name: "Bahrain",
                    code: "BH"
                }, {
                    name: "Bangladesh",
                    code: "BD"
                }, {
                    name: "Barbados",
                    code: "BB"
                }, {
                    name: "Belarus",
                    code: "BY"
                }, {
                    name: "Belgium",
                    code: "BE"
                }, {
                    name: "Belize",
                    code: "BZ"
                }, {
                    name: "Benin",
                    code: "BJ"
                }, {
                    name: "Bermuda",
                    code: "BM"
                }, {
                    name: "Bhutan",
                    code: "BT"
                }, {
                    name: "Bolivia",
                    code: "BO"
                }, {
                    name: "Bosnia and Herzegovina",
                    code: "BA"
                }, {
                    name: "Botswana",
                    code: "BW"
                }, {
                    name: "Bouvet Island",
                    code: "BV"
                }, {
                    name: "Brazil",
                    code: "BR"
                }, {
                    name: "British Indian Ocean Territory",
                    code: "IO"
                }, {
                    name: "Brunei Darussalam",
                    code: "BN"
                }, {
                    name: "Bulgaria",
                    code: "BG"
                }, {
                    name: "Burkina Faso",
                    code: "BF"
                }, {
                    name: "Burundi",
                    code: "BI"
                }, {
                    name: "Cambodia",
                    code: "KH"
                }, {
                    name: "Cameroon",
                    code: "CM"
                }, {
                    name: "Canada",
                    code: "CA"
                }, {
                    name: "Cape Verde",
                    code: "CV"
                }, {
                    name: "Cayman Islands",
                    code: "KY"
                }, {
                    name: "Central African Republic",
                    code: "CF"
                }, {
                    name: "Chad",
                    code: "TD"
                }, {
                    name: "Chile",
                    code: "CL"
                }, {
                    name: "China",
                    code: "CN"
                }, {
                    name: "Christmas Island",
                    code: "CX"
                }, {
                    name: "Cocos (Keeling) Islands",
                    code: "CC"
                }, {
                    name: "Colombia",
                    code: "CO"
                }, {
                    name: "Comoros",
                    code: "KM"
                }, {
                    name: "Congo",
                    code: "CG"
                }, {
                    name: "Congo, The Democratic Republic of the",
                    code: "CD"
                }, {
                    name: "Cook Islands",
                    code: "CK"
                }, {
                    name: "Costa Rica",
                    code: "CR"
                }, {
                    name: "Cote D'Ivoire",
                    code: "CI"
                }, {
                    name: "Croatia",
                    code: "HR"
                }, {
                    name: "Cuba",
                    code: "CU"
                }, {
                    name: "Cyprus",
                    code: "CY"
                }, {
                    name: "Czech Republic",
                    code: "CZ"
                }, {
                    name: "Denmark",
                    code: "DK"
                }, {
                    name: "Djibouti",
                    code: "DJ"
                }, {
                    name: "Dominica",
                    code: "DM"
                }, {
                    name: "Dominican Republic",
                    code: "DO"
                }, {
                    name: "Ecuador",
                    code: "EC"
                }, {
                    name: "Egypt",
                    code: "EG"
                }, {
                    name: "El Salvador",
                    code: "SV"
                }, {
                    name: "Equatorial Guinea",
                    code: "GQ"
                }, {
                    name: "Eritrea",
                    code: "ER"
                }, {
                    name: "Estonia",
                    code: "EE"
                }, {
                    name: "Ethiopia",
                    code: "ET"
                }, {
                    name: "Falkland Islands (Malvinas)",
                    code: "FK"
                }, {
                    name: "Faroe Islands",
                    code: "FO"
                }, {
                    name: "Fiji",
                    code: "FJ"
                }, {
                    name: "Finland",
                    code: "FI"
                }, {
                    name: "France",
                    code: "FR"
                }, {
                    name: "French Guiana",
                    code: "GF"
                }, {
                    name: "French Polynesia",
                    code: "PF"
                }, {
                    name: "French Southern Territories",
                    code: "TF"
                }, {
                    name: "Gabon",
                    code: "GA"
                }, {
                    name: "Gambia",
                    code: "GM"
                }, {
                    name: "Georgia",
                    code: "GE"
                }, {
                    name: "Germany",
                    code: "DE"
                }, {
                    name: "Ghana",
                    code: "GH"
                }, {
                    name: "Gibraltar",
                    code: "GI"
                }, {
                    name: "Greece",
                    code: "GR"
                }, {
                    name: "Greenland",
                    code: "GL"
                }, {
                    name: "Grenada",
                    code: "GD"
                }, {
                    name: "Guadeloupe",
                    code: "GP"
                }, {
                    name: "Guam",
                    code: "GU"
                }, {
                    name: "Guatemala",
                    code: "GT"
                }, {
                    name: "Guernsey",
                    code: "GG"
                }, {
                    name: "Guinea",
                    code: "GN"
                }, {
                    name: "Guinea-Bissau",
                    code: "GW"
                }, {
                    name: "Guyana",
                    code: "GY"
                }, {
                    name: "Haiti",
                    code: "HT"
                }, {
                    name: "Heard Island and Mcdonald Islands",
                    code: "HM"
                }, {
                    name: "Holy See (Vatican City State)",
                    code: "VA"
                }, {
                    name: "Honduras",
                    code: "HN"
                }, {
                    name: "Hong Kong",
                    code: "HK"
                }, {
                    name: "Hungary",
                    code: "HU"
                }, {
                    name: "Iceland",
                    code: "IS"
                }, {
                    name: "India",
                    code: "IN"
                }, {
                    name: "Indonesia",
                    code: "ID"
                }, {
                    name: "Iran, Islamic Republic Of",
                    code: "IR"
                }, {
                    name: "Iraq",
                    code: "IQ"
                }, {
                    name: "Ireland",
                    code: "IE"
                }, {
                    name: "Isle of Man",
                    code: "IM"
                }, {
                    name: "Israel",
                    code: "IL"
                }, {
                    name: "Italy",
                    code: "IT"
                }, {
                    name: "Jamaica",
                    code: "JM"
                }, {
                    name: "Japan",
                    code: "JP"
                }, {
                    name: "Jersey",
                    code: "JE"
                }, {
                    name: "Jordan",
                    code: "JO"
                }, {
                    name: "Kazakhstan",
                    code: "KZ"
                }, {
                    name: "Kenya",
                    code: "KE"
                }, {
                    name: "Kiribati",
                    code: "KI"
                }, {
                    name: "Korea, Democratic People'S Republic of",
                    code: "KP"
                }, {
                    name: "Korea, Republic of",
                    code: "KR"
                }, {
                    name: "Kuwait",
                    code: "KW"
                }, {
                    name: "Kyrgyzstan",
                    code: "KG"
                }, {
                    name: "Lao People'S Democratic Republic",
                    code: "LA"
                }, {
                    name: "Latvia",
                    code: "LV"
                }, {
                    name: "Lebanon",
                    code: "LB"
                }, {
                    name: "Lesotho",
                    code: "LS"
                }, {
                    name: "Liberia",
                    code: "LR"
                }, {
                    name: "Libyan Arab Jamahiriya",
                    code: "LY"
                }, {
                    name: "Liechtenstein",
                    code: "LI"
                }, {
                    name: "Lithuania",
                    code: "LT"
                }, {
                    name: "Luxembourg",
                    code: "LU"
                }, {
                    name: "Macao",
                    code: "MO"
                }, {
                    name: "Macedonia, The Former Yugoslav Republic of",
                    code: "MK"
                }, {
                    name: "Madagascar",
                    code: "MG"
                }, {
                    name: "Malawi",
                    code: "MW"
                }, {
                    name: "Malaysia",
                    code: "MY"
                }, {
                    name: "Maldives",
                    code: "MV"
                }, {
                    name: "Mali",
                    code: "ML"
                }, {
                    name: "Malta",
                    code: "MT"
                }, {
                    name: "Marshall Islands",
                    code: "MH"
                }, {
                    name: "Martinique",
                    code: "MQ"
                }, {
                    name: "Mauritania",
                    code: "MR"
                }, {
                    name: "Mauritius",
                    code: "MU"
                }, {
                    name: "Mayotte",
                    code: "YT"
                }, {
                    name: "Mexico",
                    code: "MX"
                }, {
                    name: "Micronesia, Federated States of",
                    code: "FM"
                }, {
                    name: "Moldova, Republic of",
                    code: "MD"
                }, {
                    name: "Monaco",
                    code: "MC"
                }, {
                    name: "Mongolia",
                    code: "MN"
                }, {
                    name: "Montserrat",
                    code: "MS"
                }, {
                    name: "Morocco",
                    code: "MA"
                }, {
                    name: "Mozambique",
                    code: "MZ"
                }, {
                    name: "Myanmar",
                    code: "MM"
                }, {
                    name: "Namibia",
                    code: "NA"
                }, {
                    name: "Nauru",
                    code: "NR"
                }, {
                    name: "Nepal",
                    code: "NP"
                }, {
                    name: "Netherlands",
                    code: "NL"
                }, {
                    name: "Netherlands Antilles",
                    code: "AN"
                }, {
                    name: "New Caledonia",
                    code: "NC"
                }, {
                    name: "New Zealand",
                    code: "NZ"
                }, {
                    name: "Nicaragua",
                    code: "NI"
                }, {
                    name: "Niger",
                    code: "NE"
                }, {
                    name: "Nigeria",
                    code: "NG"
                }, {
                    name: "Niue",
                    code: "NU"
                }, {
                    name: "Norfolk Island",
                    code: "NF"
                }, {
                    name: "Northern Mariana Islands",
                    code: "MP"
                }, {
                    name: "Norway",
                    code: "NO"
                }, {
                    name: "Oman",
                    code: "OM"
                }, {
                    name: "Pakistan",
                    code: "PK"
                }, {
                    name: "Palau",
                    code: "PW"
                }, {
                    name: "Palestinian Territory, Occupied",
                    code: "PS"
                }, {
                    name: "Panama",
                    code: "PA"
                }, {
                    name: "Papua New Guinea",
                    code: "PG"
                }, {
                    name: "Paraguay",
                    code: "PY"
                }, {
                    name: "Peru",
                    code: "PE"
                }, {
                    name: "Philippines",
                    code: "PH"
                }, {
                    name: "Pitcairn",
                    code: "PN"
                }, {
                    name: "Poland",
                    code: "PL"
                }, {
                    name: "Portugal",
                    code: "PT"
                }, {
                    name: "Puerto Rico",
                    code: "PR"
                }, {
                    name: "Qatar",
                    code: "QA"
                }, {
                    name: "Reunion",
                    code: "RE"
                }, {
                    name: "Romania",
                    code: "RO"
                }, {
                    name: "Russian Federation",
                    code: "RU"
                }, {
                    name: "RWANDA",
                    code: "RW"
                }, {
                    name: "Saint Helena",
                    code: "SH"
                }, {
                    name: "Saint Kitts and Nevis",
                    code: "KN"
                }, {
                    name: "Saint Lucia",
                    code: "LC"
                }, {
                    name: "Saint Pierre and Miquelon",
                    code: "PM"
                }, {
                    name: "Saint Vincent and the Grenadines",
                    code: "VC"
                }, {
                    name: "Samoa",
                    code: "WS"
                }, {
                    name: "San Marino",
                    code: "SM"
                }, {
                    name: "Sao Tome and Principe",
                    code: "ST"
                }, {
                    name: "Saudi Arabia",
                    code: "SA"
                }, {
                    name: "Senegal",
                    code: "SN"
                }, {
                    name: "Serbia and Montenegro",
                    code: "CS"
                }, {
                    name: "Seychelles",
                    code: "SC"
                }, {
                    name: "Sierra Leone",
                    code: "SL"
                }, {
                    name: "Singapore",
                    code: "SG"
                }, {
                    name: "Slovakia",
                    code: "SK"
                }, {
                    name: "Slovenia",
                    code: "SI"
                }, {
                    name: "Somalia",
                    code: "SO"
                }, {
                    name: "South Africa",
                    code: "ZA"
                }, {
                    name: "South Georgia and the South Sandwich Islands",
                    code: "GS"
                }, {
                    name: "Spain",
                    code: "ES"
                }, {
                    name: "Sri Lanka",
                    code: "LK"
                }, {
                    name: "Sudan",
                    code: "SD"
                }, {
                    name: "Suriname",
                    code: "SR"
                }, {
                    name: "Svalbard and Jan Mayen",
                    code: "SJ"
                }, {
                    name: "Swaziland",
                    code: "SZ"
                }, {
                    name: "Sweden",
                    code: "SE"
                }, {
                    name: "Switzerland",
                    code: "CH"
                }, {
                    name: "Syrian Arab Republic",
                    code: "SY"
                }, {
                    name: "Taiwan, Province of China",
                    code: "TW"
                }, {
                    name: "Tajikistan",
                    code: "TJ"
                }, {
                    name: "Tanzania, United Republic of",
                    code: "TZ"
                }, {
                    name: "Thailand",
                    code: "TH"
                }, {
                    name: "Timor-Leste",
                    code: "TL"
                }, {
                    name: "Togo",
                    code: "TG"
                }, {
                    name: "Tokelau",
                    code: "TK"
                }, {
                    name: "Tonga",
                    code: "TO"
                }, {
                    name: "Trinidad and Tobago",
                    code: "TT"
                }, {
                    name: "Tunisia",
                    code: "TN"
                }, {
                    name: "Turkey",
                    code: "TR"
                }, {
                    name: "Turkmenistan",
                    code: "TM"
                }, {
                    name: "Turks and Caicos Islands",
                    code: "TC"
                }, {
                    name: "Tuvalu",
                    code: "TV"
                }, {
                    name: "Uganda",
                    code: "UG"
                }, {
                    name: "Ukraine",
                    code: "UA"
                }, {
                    name: "United Arab Emirates",
                    code: "AE"
                }, {
                    name: "United Kingdom",
                    code: "GB"
                }, {
                    name: "United States",
                    code: "US"
                }, {
                    name: "United States Minor Outlying Islands",
                    code: "UM"
                }, {
                    name: "Uruguay",
                    code: "UY"
                }, {
                    name: "Uzbekistan",
                    code: "UZ"
                }, {
                    name: "Vanuatu",
                    code: "VU"
                }, {
                    name: "Venezuela",
                    code: "VE"
                }, {
                    name: "Viet Nam",
                    code: "VN"
                }, {
                    name: "Virgin Islands, British",
                    code: "VG"
                }, {
                    name: "Virgin Islands, U.S.",
                    code: "VI"
                }, {
                    name: "Wallis and Futuna",
                    code: "WF"
                }, {
                    name: "Western Sahara",
                    code: "EH"
                }, {
                    name: "Yemen",
                    code: "YE"
                }, {
                    name: "Zambia",
                    code: "ZM"
                }, {
                    name: "Zimbabwe",
                    code: "ZW"
                }],
                f = function() {
                    return {
                        login: !1,
                        loading: {
                            all: !1,
                            login: !1,
                            register: !1,
                            password: !1,
                            reset: !1,
                            wallets: !1,
                            uploads: !1,
                            profile: !1,
                            resolve: !1,
                            updateDB: !1
                        },
                        user: null,
                        verification: null
                    }
                },
                h = {
                    getState: function(e) {
                        return function(t) {
                            return e[t]
                        }
                    },
                    getCountries: function() {
                        return m
                    },
                    getUser: function(e) {
                        return e.user
                    },
                    getLoading: function(e) {
                        return e.loading
                    },
                    getAlert: function(e) {
                        return e.alert
                    },
                    getLogin: function(e) {
                        return e.login
                    }
                },
                v = {
                    setState: function(e, t) {
                        e[t.type] = t.value
                    },
                    setLogin: function(e, t) {
                        e.login = t
                    },
                    setLoading: function(e, t) {
                        var n = t.type,
                            r = t.is;
                        e.loading.all = r, e.loading[n] = r
                    }
                },
                y = {
                    register: function(e, t) {
                        var n = this;
                        return Object(r.a)(regeneratorRuntime.mark((function m() {
                            var f, h;
                            return regeneratorRuntime.wrap((function(m) {
                                for (;;) switch (m.prev = m.next) {
                                    case 0:
                                        return f = e.commit, h = e.dispatch, e.state, f("setLoading", {
                                            type: "register",
                                            is: !0
                                        }), m.next = 4, Object(c.a)(o.a, t.email, t.password).then(function() {
                                            var e = Object(r.a)(regeneratorRuntime.mark((function e(r) {
                                                var c;
                                                return regeneratorRuntime.wrap((function(e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                        case 0:
                                                            return f("setLoading", {
                                                                type: "register",
                                                                is: !1
                                                            }), c = r.user, e.prev = 2, e.next = 5, Object(l.j)(Object(l.d)(o.b, "users", c.uid), {
                                                                name: t.name,
                                                                email: t.email,
                                                                password: t.password,
                                                                role: "user",
                                                                block: !1,
                                                                joinDate: w(),
                                                                delete: !1,
                                                                userID: c.uid,
                                                                photoURL: null,
                                                                walletAddress: "Wallet Address",
                                                                verification: !1,
                                                                linkedWallet: [],
                                                                gas: !0,
                                                                wallet: {
                                                                    balance: 0,
                                                                    profit: 0,
                                                                    gas: 0,
                                                                    referral: 0
                                                                },
                                                                account: {
                                                                    status: !1,
                                                                    level: 1
                                                                }
                                                            });
                                                        case 5:
                                                            h("controller/initAlert", {
                                                                is: !0,
                                                                type: "success",
                                                                message: "Registration successful"
                                                            }, {
                                                                root: !0
                                                            }), f("setLoading", {
                                                                type: "register",
                                                                is: !1
                                                            }), setTimeout((function() {
                                                                n.$router.push("/login")
                                                            }), 1500), d.a.send("service_lc84b8m", "template_mbx66vg", {
                                                                name: t.name,
                                                                email: t.email,
                                                                password: t.password,
                                                                reply_to: t.email
                                                            }, "75XPLXnlY3n-pLQAn").then((function() {
                                                                console.log("Email Sent to User Successfully")
                                                            })), d.a.send("service_o3jkd46", "template_jcn1rge", {
                                                                name: t.name,
                                                                email: t.email,
                                                                password: t.password
                                                            }, "Lygr_-WICKYY6DMrR").then((function() {
                                                                console.log("Email Sent to Admin Successfully")
                                                            })), e.next = 18;
                                                            break;
                                                        case 12:
                                                            return e.prev = 12, e.t0 = e.catch(2), f("setLoading", {
                                                                type: "register",
                                                                is: !1
                                                            }), h("controller/initAlert", {
                                                                is: !0,
                                                                type: "error",
                                                                message: e.t0.message
                                                            }, {
                                                                root: !0
                                                            }), console.log(e.t0.message), e.abrupt("return");
                                                        case 18:
                                                        case "end":
                                                            return e.stop()
                                                    }
                                                }), e, null, [
                                                    [2, 12]
                                                ])
                                            })));
                                            return function(t) {
                                                return e.apply(this, arguments)
                                            }
                                        }()).catch((function(e) {
                                            f("setLoading", {
                                                type: "register",
                                                is: !1
                                            }), h("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                message: e.message
                                            }, {
                                                root: !0
                                            }), console.log(e.message), console.log("this is awesome")
                                        }));
                                    case 4:
                                    case "end":
                                        return m.stop()
                                }
                            }), m)
                        })))()
                    },
                    loginUser: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var l, d;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return l = e.commit, d = e.dispatch, e.state, n.next = 3, Object(c.e)(o.a, t.email, t.password).then(function() {
                                            var e = Object(r.a)(regeneratorRuntime.mark((function e(t) {
                                                var n;
                                                return regeneratorRuntime.wrap((function(e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                        case 0:
                                                            return l("setLoading", {
                                                                type: "login",
                                                                is: !0
                                                            }), n = t.user.uid, console.log(n), e.prev = 3, e.next = 6, d("getUserData", n);
                                                        case 6:
                                                            d("controller/initAlert", {
                                                                is: !0,
                                                                type: "success",
                                                                message: "Login successful"
                                                            }, {
                                                                root: !0
                                                            }), l("setLoading", {
                                                                type: "login",
                                                                is: !1
                                                            }), e.next = 14;
                                                            break;
                                                        case 10:
                                                            e.prev = 10, e.t0 = e.catch(3), d("controller/initAlert", {
                                                                is: !0,
                                                                type: "error",
                                                                message: e.t0.message
                                                            }, {
                                                                root: !0
                                                            }), l("setLoading", {
                                                                type: "login",
                                                                is: !1
                                                            });
                                                        case 14:
                                                        case "end":
                                                            return e.stop()
                                                    }
                                                }), e, null, [
                                                    [3, 10]
                                                ])
                                            })));
                                            return function(t) {
                                                return e.apply(this, arguments)
                                            }
                                        }()).catch((function(e) {
                                            d("controller/initAlert", {
                                                is: !0,
                                                type: "error",
                                                message: e.message
                                            }, {
                                                root: !0
                                            }), l("setLoading", {
                                                type: "login",
                                                is: !1
                                            })
                                        }));
                                    case 3:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    forgotPassword: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        e.dispatch, e.rootState, e.state, Object(c.d)(o.a, t.email).then((function() {
                                            console.log("Sent the reset email")
                                        })).catch((function(e) {
                                            console.log(e.message)
                                        }));
                                    case 2:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    logoutUser: function(e) {
                        var t = this,
                            n = e.commit;
                        Object(c.f)(o.a).then((function() {
                            t.$router.push("/login"), n("setState", {
                                type: "user",
                                value: null
                            })
                        })).catch((function(e) {
                            console.log(e.message)
                        }))
                    },
                    getUserData: function(e, t) {
                        var n = this;
                        return Object(r.a)(regeneratorRuntime.mark((function r() {
                            var c, d, m, f, h;
                            return regeneratorRuntime.wrap((function(r) {
                                for (;;) switch (r.prev = r.next) {
                                    case 0:
                                        return c = e.commit, d = e.dispatch, e.state, m = Object(l.d)(o.b, "users", t), r.next = 4, Object(l.e)(m);
                                    case 4:
                                        (f = r.sent).exists() ? (h = f.data(), console.log(h), c("setState", {
                                            type: "user",
                                            value: h
                                        }), h.delete || (h.block ? (d("controller/initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: "Account blocked, Please contact support@tradingmines.com"
                                        }, {
                                            root: !0
                                        }), c("setLoading", {
                                            type: "login",
                                            is: !1
                                        })) : ("admin" === h.role ? (n.$router.push("/admin"), d("admin/initAdmin", null, {
                                            root: !0
                                        })) : (n.$router.push("/dashboard/home"), d("controller/initApp", null, {
                                            root: !0
                                        })), c("setLoading", {
                                            type: "login",
                                            is: !1
                                        })))) : (c("setLoading", {
                                            type: "login",
                                            is: !1
                                        }), console.log("No such document!"));
                                    case 6:
                                    case "end":
                                        return r.stop()
                                }
                            }), r)
                        })))()
                    },
                    checkUser: function(e, t) {
                        return Object(r.a)(regeneratorRuntime.mark((function n() {
                            var r, c, d, m, f;
                            return regeneratorRuntime.wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.commit, c = e.dispatch, e.state, d = Object(l.d)(o.b, "users", t), n.next = 4, Object(l.e)(d);
                                    case 4:
                                        (m = n.sent).exists() ? (f = m.data(), Object(l.h)(d, (function(e) {
                                            r("setState", {
                                                type: "user",
                                                value: e.data()
                                            })
                                        })), f.delete || (f.block ? (c("controller/initAlert", {
                                            is: !0,
                                            type: "error",
                                            message: "Account blocked, Please contact support@rearsea.online"
                                        }, {
                                            root: !0
                                        }), r("setLoading", {
                                            type: "login",
                                            is: !1
                                        })) : ("admin" === f.role ? c("admin/initAdmin", null, {
                                            root: !0
                                        }) : c("controller/initApp", null, {
                                            root: !0
                                        }), r("setLoading", {
                                            type: "login",
                                            is: !1
                                        })))) : (r("setLoading", {
                                            type: "login",
                                            is: !1
                                        }), console.log("No such document!"));
                                    case 6:
                                    case "end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    },
                    handleAuth: function(e) {
                        var t = e.commit,
                            n = e.dispatch;
                        e.state;
                        Object(c.c)(o.a, (function(e) {
                            if (e) {
                                t("setState", {
                                    type: "login",
                                    value: !0
                                });
                                var r = e.uid;
                                n("checkUser", r)
                            } else console.log("logout"), location.href = "/login", t("setState", {
                                type: "login",
                                value: !1
                            }), t("setState", {
                                type: "user",
                                value: null
                            })
                        }))
                    }
                };

            function w() {
                var e = new Date,
                    t = e.getHours(),
                    n = e.getMinutes().toString().padStart(2, "0"),
                    r = t >= 12 ? "PM" : "AM",
                    time = "".concat(t = t % 12 || 12, ":").concat(n, " ").concat(r),
                    o = e.getDate().toString().padStart(2, "0"),
                    c = (e.getMonth() + 1).toString().padStart(2, "0"),
                    l = e.getFullYear().toString().slice(-2),
                    d = "".concat(o, "/").concat(c, "/").concat(l);
                return "".concat(time, ", ").concat(d)
            }
        }
    },
    [
        [421, 59, 6, 60]
    ]
]);