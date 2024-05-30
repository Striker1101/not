(window.webpackJsonp = window.webpackJsonp || []).push([
    [55, 12, 14, 15], {
        669: function(t, e, r) {
            "use strict";
            r.r(e);
            var n = r(271),
                o = r(53),
                l = r(228),
                c = r(641),
                d = (r(55), {
                    computed: {},
                    props: {
                        data: {
                            type: Object,
                            default: function() {
                                return {
                                    nft: "",
                                    title: "",
                                    price: ""
                                }
                            }
                        }
                    },
                    methods: {
                        range: function() {
                            var t = (Math.random() + 3.5).toLocaleString();
                            return t.slice(t.indexOf(".", 3)), t
                        }
                    }
                }),
                m = r(40),
                component = Object(m.a)(d, (function() {
                    var t = this,
                        e = t._self._c;
                    return e(n.a, {
                        staticClass: "ma-2 onHoverShadow",
                        staticStyle: {
                            cursor: "pointer"
                        },
                        attrs: {
                            width: "300",
                            outlined: "",
                            rounded: "xl"
                        },
                        on: {
                            click: function(e) {
                                return t.$router.push("/register")
                            }
                        }
                    }, [e(o.c, [e(l.a, {
                        staticClass: "rounded-xl",
                        attrs: {
                            contain: "",
                            src: t.data.image_url
                        }
                    })], 1), t._v(" "), e(o.b, [e("div", {
                        staticClass: "text3--text text-subtitle-1 font-weight-bold text-sm-h6 text-truncate"
                    }, [t._v("\n      " + t._s(t.data.key) + "\n    ")]), t._v(" "), e("div", {
                        staticClass: "my-2 grey lighten-3 rounded-xl d-flex align-center py-3 px-4"
                    }, [e("span", {
                        staticClass: "text1--text font-weight-medium text-subtitle-2 text-sm-subtitle-1"
                    }, [t._v("Current Bid")]), t._v(" "), e(c.a), t._v(" "), e("span", {
                        staticClass: "text3--text text-subtitle-1 font-weight-bold text-sm-h6"
                    }, [t._v(t._s(t.range()) + " ETH")])], 1)])], 1)
                }), [], !1, null, null, null);
            e.default = component.exports
        },
        677: function(t, e, r) {
            "use strict";
            r.r(e);
            var n = r(686),
                o = r(271),
                l = r(53),
                c = r(228),
                d = (r(24), {
                    props: {
                        type: {
                            type: Number,
                            default: 1
                        },
                        data: {
                            type: Object,
                            default: function() {
                                return {
                                    nft: "",
                                    ownerImg: "",
                                    owner: "",
                                    title: "",
                                    price: "",
                                    verified: !1
                                }
                            }
                        }
                    }
                }),
                m = r(40),
                component = Object(m.a)(d, (function() {
                    var t = this,
                        e = t._self._c;
                    return 1 === t.type ? e(o.a, {
                        staticClass: "onHoverShadow ma-2",
                        staticStyle: {
                            cursor: "pointer"
                        },
                        attrs: {
                            width: "200",
                            outlined: "",
                            rounded: "xl"
                        },
                        on: {
                            click: function(e) {
                                return t.$router.push("/register")
                            }
                        }
                    }, [e(l.c, {
                        staticClass: "d-flex justify-center rounded-lg",
                        staticStyle: {
                            width: "200px"
                        }
                    }, [t.data.verified ? e(n.a, {
                        attrs: {
                            icon: "mdi-check",
                            bordered: "",
                            "offset-x": "30",
                            "offset-y": "70"
                        }
                    }, [e(c.a, {
                        staticClass: "rounded-xl",
                        attrs: {
                            cover: "",
                            src: t.data.ownerImg
                        }
                    })], 1) : e("div", [e(c.a, {
                        staticClass: "rounded-xl",
                        attrs: {
                            cover: "",
                            src: t.data.ownerImg
                        }
                    })], 1)], 1), t._v(" "), e(l.b, {
                        staticClass: "text-center"
                    }, [e("div", {
                        staticClass: "text3--text font-weight-black text-subtitle-1"
                    }, [t._v("\n      " + t._s(t.data.title) + "\n    ")]), t._v(" "), e("div", {
                        staticClass: "text1--text text-subtitle-1 mt-2"
                    }, [t._v(t._s(t.data.price) + " ETH")])])], 1) : e(o.a, {
                        staticClass: "ma-2",
                        attrs: {
                            flat: "",
                            width: "300"
                        }
                    }, [e(l.c, {
                        staticClass: "d-flex justify-center rounded-lg",
                        staticStyle: {
                            width: "300px",
                            position: "relative"
                        }
                    }, [e(c.a, {
                        staticClass: "rounded-xl",
                        staticStyle: {
                            "z-index": "4"
                        },
                        attrs: {
                            cover: "",
                            src: t.data.nft
                        }
                    }), t._v(" "), e("div", {
                        staticClass: "grey lighten-2 rounded-xl mt-1",
                        staticStyle: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            height: "100%",
                            width: "80%",
                            "z-index": "2"
                        }
                    }), t._v(" "), e("div", {
                        staticClass: "grey lighten-4 rounded-xl mt-4",
                        staticStyle: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            height: "100%",
                            width: "60%",
                            "z-index": "1"
                        }
                    }), t._v(" "), e(c.a, {
                        staticClass: "rounded-lg",
                        staticStyle: {
                            "z-index": "5",
                            width: "60px",
                            position: "absolute",
                            bottom: "2px",
                            border: "4px solid white"
                        },
                        attrs: {
                            cover: "",
                            src: t.data.ownerImg
                        }
                    })], 1), t._v(" "), e(l.b, {
                        staticClass: "mt-6"
                    }, [e("div", {
                        staticClass: "text3--text font-weight-bold text-h6 text-center text-truncate"
                    }, [t._v("\n      " + t._s(t.data.title) + "\n    ")]), t._v(" "), e("div", {
                        staticClass: "text1--text d-flex items-center text-subtitle-1 justify-center mt-2"
                    }, [e("span", [t._v("Collection by")]), t._v(" "), e("span", {
                        staticClass: "primary--text font-weight-bold ml-2"
                    }, [t._v(t._s(t.data.owner))])])])], 1)
                }), [], !1, null, null, null);
            e.default = component.exports
        },
        700: function(t, e, r) {
            var content = r(780);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [t.i, content, ""]
            ]), content.locals && (t.exports = content.locals);
            (0, r(19).default)("5ced9fda", content, !0, {
                sourceMap: !1
            })
        },
        708: function(t, e, r) {
            "use strict";
            r.r(e);
            var n = r(638),
                o = r(637),
                l = (r(24), {
                    components: {
                        pCreatorCard: r(677).default
                    },
                    props: {
                        type: {
                            type: Number,
                            default: 1
                        }
                    },
                    computed: {
                        creators: function() {
                            var t = [];
                            return 1 === this.type ? t = [{
                                nft: "/img/",
                                ownerImg: "/img/user-Image16.jpeg",
                                owner: "",
                                title: "Meta Boss",
                                price: "0.25",
                                verified: !0
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image10.jpeg",
                                owner: "",
                                title: "The Lucky Being",
                                price: "4.10"
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image13.jpeg",
                                owner: "",
                                title: "Artist of Now",
                                price: "1.50",
                                verified: !0
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image12.jpeg",
                                owner: "",
                                title: "Biggest Bang",
                                price: "3.30",
                                verified: !0
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image6.jpeg",
                                owner: "",
                                title: "Usman Ansari",
                                price: "4.34"
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image15.jpeg",
                                owner: "",
                                title: "King Kong",
                                price: "5.50"
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image7.jpeg",
                                owner: "",
                                title: "Craftold",
                                price: "0.6",
                                verified: !0
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image9.jpeg",
                                owner: "",
                                title: "Meow Bits",
                                price: "6.30"
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image8.jpeg",
                                owner: "",
                                title: "Wow Creates",
                                price: "2.35"
                            }, {
                                nft: "/img/",
                                ownerImg: "/img/user-Image18.jpeg",
                                owner: "",
                                title: "Ding Dong",
                                price: "2.00",
                                verified: !0
                            }] : 2 === this.type && (t = [{
                                nft: "/img/cover-img8.jpeg",
                                ownerImg: "/img/user-Image16.jpeg",
                                owner: "Ahmed Zul",
                                title: "Wow! That Brain is Floating",
                                price: ""
                            }, {
                                nft: "/img/cover-img1.jpeg",
                                ownerImg: "/img/user-Image10.jpeg",
                                owner: "Usman Ansari",
                                title: "The Beyblade in Black",
                                price: ""
                            }, {
                                nft: "/img/cover-img3.jpeg",
                                ownerImg: "/img/user-Image14.jpeg",
                                owner: "Peter K.",
                                title: "Ooops! Floating Plates",
                                price: ""
                            }, {
                                nft: "/img/cover-img15.jpeg",
                                ownerImg: "/img/user-Image9.jpeg",
                                owner: "Andrew Flow",
                                title: "Fantasy of Ethereum",
                                price: ""
                            }, {
                                nft: "/img/cover-img5.jpeg",
                                ownerImg: "/img/user-Image2.jpeg",
                                owner: "King Kong",
                                title: "My Yummy Plastic Omlet",
                                price: ""
                            }, {
                                nft: "/img/cover-img11.jpeg",
                                ownerImg: "/img/user-Image1.jpeg",
                                owner: "Craftold",
                                title: "The White Sand Storm",
                                price: ""
                            }, {
                                nft: "/img/cover-img2.jpeg",
                                ownerImg: "/img/user-Image7.jpeg",
                                owner: "MetaBoss",
                                title: "Cubic and Planic Universe",
                                price: ""
                            }]), t
                        }
                    }
                }),
                c = r(40),
                component = Object(c.a)(l, (function() {
                    var t = this,
                        e = t._self._c;
                    return e(o.a, {
                        staticClass: "ma-0"
                    }, [e(n.a, {
                        staticClass: "d-flex flex-wrap justify-space-around",
                        attrs: {
                            cols: "12"
                        }
                    }, t._l(t.creators, (function(r, i) {
                        return e("p-creator-card", {
                            key: i,
                            attrs: {
                                data: r,
                                type: t.type
                            }
                        })
                    })), 1)], 1)
                }), [], !1, null, null, null);
            e.default = component.exports
        },
        709: function(t, e, r) {
            "use strict";
            r.r(e);
            var n = r(271),
                o = r(53),
                l = r(233),
                c = r(56),
                d = (r(13), r(86), {
                    props: {
                        type: {
                            type: String,
                            default: "down"
                        },
                        data: {
                            type: Object,
                            default: function() {
                                return {
                                    icon: "",
                                    iconColor: "white",
                                    color: "primary",
                                    title: "",
                                    description: ""
                                }
                            }
                        }
                    }
                }),
                m = r(40),
                component = Object(m.a)(d, (function() {
                    var t = this,
                        e = t._self._c;
                    return "up" === t.type ? e(n.a, {
                        staticClass: "grey lighten-3 pa-0 ma-2",
                        attrs: {
                            rounded: "xl",
                            flat: ""
                        }
                    }, [e(o.c, {
                        staticClass: "d-flex items-center white rounded-xl py-4",
                        staticStyle: {
                            "box-shadow": "0 4px 16px 2px rgba(0, 0, 0, 0.1)"
                        }
                    }, [e(c.a, {
                        staticClass: "d-flex items-center justify-center",
                        staticStyle: {
                            "border-radius": "14px"
                        },
                        attrs: {
                            flat: "",
                            width: "60",
                            height: "60",
                            color: t.data.color
                        }
                    }, [e(l.a, {
                        attrs: {
                            size: "30",
                            color: t.data.iconColor ? t.data.iconColor : "white"
                        }
                    }, [t._v("\n        " + t._s(t.data.icon) + "\n      ")])], 1), t._v(" "), e("span", {
                        staticClass: "text-capitalize text-h6 text-sm-h5 ml-2 font-weight-bold text3--text"
                    }, [t._v("\n      " + t._s(t.data.title))])], 1), t._v(" "), e(o.b, {
                        staticClass: "pt-3"
                    }, [e("p", {
                        staticClass: "text-subtitle-1 text1--text"
                    }, [t._v("\n      " + t._s(t.data.description) + "\n    ")])])], 1) : e(n.a, {
                        staticClass: "grey lighten-3 pa-0 ma-2",
                        attrs: {
                            rounded: "xl",
                            flat: ""
                        }
                    }, [e(o.b, {}, [e("p", {
                        staticClass: "text-subtitle-1 text1--text"
                    }, [t._v("\n      " + t._s(t.data.description) + "\n    ")])]), t._v(" "), e(o.c, {
                        staticClass: "d-flex items-center py-4 white rounded-xl",
                        staticStyle: {
                            "box-shadow": "0 4px 16px 2px rgba(0, 0, 0, 0.1)"
                        }
                    }, [e(c.a, {
                        staticClass: "d-flex items-center justify-center",
                        staticStyle: {
                            "border-radius": "14px"
                        },
                        attrs: {
                            flat: "",
                            width: "60",
                            height: "60",
                            color: t.data.color
                        }
                    }, [e(l.a, {
                        attrs: {
                            size: "30",
                            color: t.data.iconColor ? t.data.iconColor : "white"
                        }
                    }, [t._v("\n        " + t._s(t.data.icon) + "\n      ")])], 1), t._v(" "), e("div", {
                        staticClass: "text-capitalize text-h6 text-sm-h5 ml-2 font-weight-bold text3--text"
                    }, [t._v("\n      " + t._s(t.data.title) + "\n    ")])], 1)], 1)
                }), [], !1, null, null, null);
            e.default = component.exports
        },
        710: function(t, e, r) {
            "use strict";
            r.r(e);
            var n = r(638),
                o = r(637),
                l = {
                    components: {
                        pLiveAuctionCard: r(669).default
                    },
                    props: {
                        data: Array
                    }
                },
                c = r(40),
                component = Object(c.a)(l, (function() {
                    var t = this,
                        e = t._self._c;
                    return e(o.a, {
                        staticClass: "ma-0"
                    }, [e(n.a, {
                        directives: [{
                            name: "dragscroll",
                            rawName: "v-dragscroll.x",
                            modifiers: {
                                x: !0
                            }
                        }],
                        staticClass: "scrollStyle d-flex align-center justify-start",
                        staticStyle: {
                            width: "100vw"
                        },
                        attrs: {
                            cols: "12"
                        }
                    }, t._l(t.data, (function(t, i) {
                        return e("div", {
                            key: i
                        }, [e("p-live-auction-card", {
                            attrs: {
                                data: t
                            }
                        })], 1)
                    })), 0)], 1)
                }), [], !1, null, null, null);
            e.default = component.exports
        },
        779: function(t, e, r) {
            "use strict";
            r(700)
        },
        780: function(t, e, r) {
            var n = r(18)((function(i) {
                return i[1]
            }));
            n.push([t.i, ".rotate[data-v-7555dcc0]{transform:rotate(190deg)}.up[data-v-7555dcc0]{z-index:2}.bgc[data-v-7555dcc0]{background:linear-gradient(rgba(2,42,175,.541),rgba(1,5,56,.37)),url(/bg/17.jpg);background-position:50%;background-repeat:no-repeat;background-size:cover;color:hsla(0,0%,100%,.11)}.gridStyle[data-v-7555dcc0]{position:absolute;right:-4rem;top:-8rem;transform:rotate(-20deg)}.textGradient[data-v-7555dcc0]{background:linear-gradient(90deg,#007eb8,#74e14c);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.animate__animated.animate__rubberBand[data-v-7555dcc0]{-o-animation-delay:3s;-moz-animation-delay:3s;-webkit-animation-delay:3s;-o-animation-iteration-count:3;-moz-animation-iteration-count:3;-webkit-animation-iteration-count:3}", ""]), n.locals = {}, t.exports = n
        },
        838: function(t, e, r) {
            "use strict";
            r.r(e);
            var n = r(176),
                o = r(271),
                l = r(638),
                c = r(648),
                d = r(629),
                m = r(228),
                f = r(637),
                x = (r(11), r(13), r(15), r(5), r(16), r(12), r(17), r(2)),
                v = (r(55), r(54), r(777), r(35)),
                h = r(708),
                y = r(709),
                w = r(669);

            function C(t, e) {
                var r = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(t);
                    e && (n = n.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function _(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var r = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? C(Object(r), !0).forEach((function(e) {
                        Object(x.a)(t, e, r[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : C(Object(r)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
                    }))
                }
                return t
            }
            var j = {
                    components: {
                        PLiveAuctions: r(710).default,
                        PCreators: h.default,
                        PHowItWorksCard: y.default,
                        PLiveAuctionCard: w.default
                    },
                    scrollToTop: !0,
                    filters: {
                        currency: function(t) {
                            if (t) return t.toLocaleString()
                        }
                    },
                    data: function() {
                        return {
                            liveColor: "primary",
                            currentColorIndex: 0,
                            active: "All",
                            active2: "For Creators"
                        }
                    },
                    computed: _(_({}, Object(v.c)({
                        state: "controller/getState"
                    })), {}, {
                        liveAuctions: function() {
                            return (this.state("nftCollections") || []).slice(0, 7)
                        },
                        randoNft: function() {
                            return (this.state("nftCollections") || [])[10].image_url
                        },
                        randi: function() {
                            return (this.state("nftCollections") || []).slice(10, 19)
                        },
                        buttons: function() {
                            return ["All", "Photography", "Videos", "Illustration", "Digital Art", "Domains"]
                        },
                        howItWorks: function() {
                            return [{
                                type: "up",
                                title: "Set Up Your Wallet",
                                description: "Set up your wallet and then you can create, sell & collect NFTs atRear Sea.",
                                color: "primary",
                                icon: "mdi-wallet"
                            }, {
                                type: "down",
                                title: "Add Your NFTs",
                                description: "After setting up your wallet, you can add your NFTs onRear Sea.",
                                color: "lime accent-3",
                                iconColor: "black",
                                icon: "mdi-grid-large"
                            }, {
                                type: "up",
                                title: "Sell Your NFTs",
                                description: "After adding your NFTs, you can list your NFTs for sale.",
                                color: "primary",
                                icon: "mdi-cart-outline"
                            }]
                        },
                        arts: function() {
                            return [{
                                nft: "/img/cover-img6.jpeg",
                                title: "Softy Spehere Gradients",
                                price: "4.3"
                            }, {
                                nft: "/img/cover-img3.jpeg",
                                title: "My yummy Plastic Omlet",
                                price: "5.70"
                            }, {
                                nft: "/img/cover-img5.jpeg",
                                title: "My Yummy Plastic Omlet",
                                price: "8.70"
                            }, {
                                nft: "/img/cover-img14.jpeg",
                                title: "Broken Alien Tech Cube Scalet",
                                price: "3.55"
                            }, {
                                nft: "/img/cover-img15.jpeg",
                                title: "Fantasy of Ethereum",
                                price: "2.20"
                            }, {
                                nft: "/img/cover-img10.jpeg",
                                title: "Let's Go To The Galaxies in the Eons",
                                price: "0.0245"
                            }, {
                                nft: "/img/cover-img11.jpeg",
                                title: "The White Sand Storm",
                                price: "3.0"
                            }, {
                                nft: "/img/cover-img12.jpeg",
                                title: "Cubic and Planic Universe",
                                price: "3.30"
                            }]
                        }
                    }),
                    created: function() {
                        var t = this;
                        setInterval((function() {
                            t.switchColor()
                        }), 300)
                    },
                    methods: {
                        switchColor: function() {
                            var t = ["primary", "success", "warning", "blue", "lime"];
                            this.currentColorIndex === t.length - 1 ? this.currentColorIndex = 0 : this.currentColorIndex++, this.liveColor = t[this.currentColorIndex]
                        }
                    },
                    head: function() {
                        return {
                            title: "Rear Sea NFT MarketPlace",
                            meta: [{
                                hid: "description",
                                name: "description"
                            }, {
                                hid: "og:description",
                                property: "og:description"
                            }, {
                                hid: "og:image",
                                property: "og:image",
                                content: "/ArtChainer.png"
                            }, {
                                hid: "og:type",
                                property: "og:type",
                                content: "website"
                            }, {
                                hid: "twitter:image:src",
                                property: "twitter:image:src",
                                content: "/ArtChainer.png"
                            }, {
                                hid: "og:title",
                                property: "og:title",
                                content: "/ArtChainer.png"
                            }, {
                                hid: "twitter:card",
                                property: "twitter:card",
                                content: "summary_large_image"
                            }],
                            script: [],
                            link: [{
                                rel: "stylesheet",
                                href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
                            }]
                        }
                    }
                },
                S = (r(779), r(40)),
                component = Object(S.a)(j, (function() {
                    var t = this,
                        e = t._self._c;
                    return e(c.a, {
                        staticClass: "px-0",
                        attrs: {
                            fluid: ""
                        }
                    }, [e(f.a, {
                        staticClass: "d-flex align-enter ma-0 px-md-10 py-16 my-6",
                        attrs: {
                            justify: "center",
                            align: "center"
                        }
                    }, [e(l.a, {
                        staticClass: "text-left",
                        attrs: {
                            cols: "12",
                            md: "6"
                        }
                    }, [e("div", {
                        staticClass: "playfair textGradient text-h4 text-sm-h3 text-lg-h2 text-capitalize text3--text font-weight-bold",
                        staticStyle: {
                            "line-height": "1.4"
                        }
                    }, [t._v("\n        Discover Digital Art, Collect and Sell Your Specific NFTs.\n      ")]), t._v(" "), e("div", {
                        staticClass: "opacity textGradient text-subtitle-1 text-sm-h6 text1--text mt-3 font-weight-light",
                        staticStyle: {
                            "line-height": "1.5"
                        }
                    }, [t._v("\n        Partner with one of the world’s largest retailers to showcase your\n        brand and products. Partner showcase and products.\n      ")]), t._v(" "), e("div", {
                        staticClass: "mt-10",
                        attrs: {
                            "data-aos": "fade-up",
                            "data-aos-delay": "500",
                            "data-aos-once": "true",
                            "data-aos-easing": "ease-in-out"
                        }
                    }, [e(n.a, {
                        staticClass: "icon-light-a opacity text-capitalize text-subtitle-1 rounded-lg font-weight-bold",
                        attrs: {
                            depressed: "",
                            to: "/login",
                            "x-large": "",
                            color: "primary"
                        }
                    }, [t._v("\n          Login\n        ")]), t._v(" "), e(n.a, {
                        staticClass: "icon-light-a opacity text-capitalize text-subtitle-1 rounded-lg font-weight-bold ml-2",
                        attrs: {
                            depressed: "",
                            outlined: "",
                            to: "/register",
                            "x-large": "",
                            color: "primary "
                        }
                    }, [e("span", {
                        staticClass: "grey--text text--darken-2"
                    }, [t._v("Register ")])])], 1), t._v(" "), e("div", {
                        staticClass: "d-flex mt-10 mb-4",
                        attrs: {
                            "data-aos": "fade-up",
                            "data-aos-delay": "600",
                            "data-aos-once": "true",
                            "data-aos-easing": "ease-in-out"
                        }
                    }, [e("div", {
                        staticClass: "text2--text d-flex flex-column pa-2"
                    }, [e("span", {
                        staticClass: "primary--text font-weight-bold text-h3"
                    }, [t._v("2M+")]), t._v(" "), e("span", {
                        staticClass: "mt-2 text-subtitle-2 text-sm-subtitle-1"
                    }, [t._v("Exclusive Product")])]), t._v(" "), e("div", {
                        staticClass: "text2--text d-flex flex-column mx-6 pa-2 px-6",
                        staticStyle: {
                            "border-left": "1px solid #c2c4c7",
                            "border-right": "1px solid #c2c4c7"
                        }
                    }, [e("span", {
                        staticClass: "primary--text font-weight-bold text-h3"
                    }, [t._v("2k+")]), t._v(" "), e("span", {
                        staticClass: "mt-2 text-subtitle-2 text-sm-subtitle-1"
                    }, [t._v("Digital Artist")])]), t._v(" "), e("div", {
                        staticClass: "text2--text d-flex flex-column pa-2"
                    }, [e("span", {
                        staticClass: "primary--text font-weight-bold text-h3"
                    }, [t._v("22k+")]), t._v(" "), e("span", {
                        staticClass: "mt-2 text-subtitle-2 text-sm-subtitle-1"
                    }, [t._v("Auction")])])])]), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "6"
                        }
                    }, [e(o.a, {
                        staticClass: "mx-auto animate__animated animate__rubberBand",
                        attrs: {
                            flat: "",
                            width: "400",
                            height: "450",
                            rounded: "lg"
                        }
                    }, [e(m.a, {
                        attrs: {
                            height: "100%",
                            cover: "",
                            src: t.randoNft
                        }
                    })], 1)], 1)], 1), t._v(" "), e(f.a, {
                        staticClass: "ma-0 py-10 white",
                        attrs: {
                            justify: "center"
                        }
                    }, [e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("div", {
                        staticClass: "d-flex align-center"
                    }, [e("span", {
                        staticClass: "pa-3 rounded-circle",
                        class: t.liveColor
                    }), t._v(" "), e("span", {
                        staticClass: "text-h5 text-sm-h4 text3--text font-weight-bold ml-4"
                    }, [t._v("Live Auctions")])])]), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e(d.a)], 1), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("p-live-auctions", {
                        attrs: {
                            data: t.liveAuctions
                        }
                    })], 1)], 1), t._v(" "), e(f.a, {
                        staticClass: "ma-0 py-10 white",
                        attrs: {
                            justify: "center"
                        }
                    }, [e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("div", {
                        staticClass: "d-flex align-center"
                    }, [e("span", {
                        staticClass: "text-h5 text-sm-h4 text3--text font-weight-bold ml-4"
                    }, [t._v("Creators of the Week")])])]), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e(d.a)], 1), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("p-creators")], 1)], 1), t._v(" "), e(f.a, {
                        staticClass: "ma-0 py-10 white",
                        attrs: {
                            justify: "center"
                        }
                    }, [e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("div", {
                        staticClass: "d-flex align-center"
                    }, [e("span", {
                        staticClass: "text-h5 text-sm-h4 text3--text font-weight-bold ml-4"
                    }, [t._v("Creators of the Week")])])]), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e(d.a)], 1), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("p-creators", {
                        attrs: {
                            type: 2
                        }
                    })], 1)], 1), t._v(" "), e(f.a, {
                        staticClass: "ma-0 py-10 white",
                        attrs: {
                            justify: "center"
                        }
                    }, [e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("div", {
                        staticClass: "d-flex align-center"
                    }, [e("span", {
                        staticClass: "text-h5 text-sm-h4 text3--text font-weight-bold ml-4"
                    }, [t._v("Explore Artworks")])])]), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e(d.a)], 1), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e(f.a, {
                        staticClass: "ma-0"
                    }, t._l(t.randi, (function(t) {
                        return e(l.a, {
                            key: t.title,
                            attrs: {
                                cols: "12",
                                sm: "6",
                                md: "3"
                            }
                        }, [e("p-live-auction-card", {
                            attrs: {
                                data: t
                            }
                        })], 1)
                    })), 1)], 1)], 1), t._v(" "), e(f.a, {
                        staticClass: "ma-0 py-10 white",
                        attrs: {
                            justify: "center"
                        }
                    }, [e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e("div", {
                        staticClass: "d-flex align-center"
                    }, [e("span", {
                        staticClass: "text-h5 text-sm-h4 text3--text font-weight-bold ml-4"
                    }, [t._v("HowRear Sea Works")]), t._v(" "), e("div", {
                        staticClass: "ml-2 d-flex items-center"
                    }, [e(n.a, {
                        staticClass: "ma-2",
                        class: "For Creators" === t.active2 ? "primary text-capitalize" : "grey lighten-3 grey--text text--darken-1",
                        staticStyle: {
                            "border-radius": "10px"
                        },
                        attrs: {
                            depressed: "",
                            large: ""
                        },
                        on: {
                            click: function(e) {
                                t.active2 = "For Creators"
                            }
                        }
                    }, [e("span", {
                        staticClass: "font-weight-bold text-capitalize"
                    }, [t._v("For Creators")])]), t._v(" "), e(n.a, {
                        staticClass: "ma-2",
                        class: "For Collectors" === t.active2 ? "primary text-capitalize" : "grey lighten-3 grey--text text--darken-1",
                        staticStyle: {
                            "border-radius": "10px"
                        },
                        attrs: {
                            depressed: "",
                            large: ""
                        },
                        on: {
                            click: function(e) {
                                t.active2 = "For Collectors"
                            }
                        }
                    }, [e("span", {
                        staticClass: "font-weight-bold text-capitalize"
                    }, [t._v("For Collectors")])])], 1)])]), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e(d.a)], 1), t._v(" "), e(l.a, {
                        staticClass: "d-flex items-center justify-space-around",
                        attrs: {
                            cols: "12",
                            md: "11"
                        }
                    }, [e(f.a, {
                        staticClass: "ma-0"
                    }, t._l(t.howItWorks, (function(t, i) {
                        return e(l.a, {
                            key: i,
                            attrs: {
                                cols: "12",
                                sm: "6",
                                md: "4"
                            }
                        }, [e("p-how-it-works-card", {
                            attrs: {
                                type: t.type,
                                data: t
                            }
                        })], 1)
                    })), 1)], 1), t._v(" "), e(l.a, {
                        attrs: {
                            cols: "11"
                        }
                    }, [e(f.a, {
                        staticClass: "ma-0 grey lighten-4 rounded-xl pa-16",
                        staticStyle: {
                            overflow: "hidden",
                            position: "relative"
                        }
                    }, [e(l.a, {
                        staticClass: "text-left",
                        attrs: {
                            cols: "12",
                            md: "6"
                        }
                    }, [e("div", {
                        staticClass: "playfair text-h4 text-sm-h3 text-capitalize textGradient font-weight-bold"
                    }, [t._v("\n            Create, Sell & Collect NFTs at Rear Sea\n          ")]), t._v(" "), e("div", {
                        staticClass: "opacity text-subtitle-1 text-sm-h6 text1--text mt-3 font-weight-light"
                    }, [t._v("\n            Aliquam viverra enim commodo sed consequat tempor sit nisl cursus\n            lectus.\n          ")]), t._v(" "), e("div", {
                        staticClass: "mt-10",
                        attrs: {
                            "data-aos": "fade-up",
                            "data-aos-delay": "500",
                            "data-aos-once": "true",
                            "data-aos-easing": "ease-in-out"
                        }
                    }, [e(n.a, {
                        staticClass: "icon-light-a opacity text-capitalize text-subtitle-1 rounded-lg font-weight-bold",
                        attrs: {
                            depressed: "",
                            to: "/register",
                            "x-large": "",
                            color: "primary"
                        }
                    }, [t._v("\n              Sign Up\n            ")]), t._v(" "), e(n.a, {
                        staticClass: "icon-light-a opacity text-capitalize text-subtitle-1 rounded-lg font-weight-bold ml-2",
                        attrs: {
                            depressed: "",
                            outlined: "",
                            to: "/login",
                            "x-large": "",
                            color: "primary "
                        }
                    }, [e("span", {
                        staticClass: "text3--text"
                    }, [t._v("Sign In ")])])], 1)]), t._v(" "), e(o.a, {
                        staticClass: "transparent gridStyle hidden-sm-and-down",
                        attrs: {
                            flat: "",
                            tile: "",
                            width: "600"
                        }
                    }, [e(m.a, {
                        attrs: {
                            src: "/img/bg.png"
                        }
                    })], 1)], 1)], 1)], 1)], 1)
                }), [], !1, null, "7555dcc0", null);
            e.default = component.exports
        }
    }
]);