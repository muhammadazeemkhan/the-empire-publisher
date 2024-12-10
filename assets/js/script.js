// accordion

// UNUSED EXPORTS: default

// CONCATENATED MODULE: ./src/components/accordion.js
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var Default = {
  alwaysOpen: false,
  activeClasses: "activated flex flex-row justify-between items-center",
  inactiveClasses: "w-full",
  onOpen: function onOpen() {},
  onClose: function onClose() {},
  onToggle: function onToggle() {},
};

var Accordion = /*#__PURE__*/ (function () {
  function Accordion() {
    var items =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Accordion);

    this._items = items;
    this._options = _objectSpread(_objectSpread({}, Default), options);

    this._init();
  }

  _createClass(Accordion, [
    {
      key: "_init",
      value: function _init() {
        var _this = this;

        if (this._items.length) {
          // show accordion item based on click
          this._items.map(function (item) {
            if (item.active) {
              _this.open(item.id);
            }

            item.triggerEl.addEventListener("click", function () {
              _this.toggle(item.id);
            });
          });
        }
      },
    },
    {
      key: "getItem",
      value: function getItem(id) {
        return this._items.filter(function (item) {
          return item.id === id;
        })[0];
      },
    },
    {
      key: "open",
      value: function open(id) {
        var _this2 = this,
          _item$triggerEl$class,
          _item$triggerEl$class2;

        var item = this.getItem(id); // don't hide other accordions if always open

        if (!this._options.alwaysOpen) {
          this._items.map(function (i) {
            if (i !== item) {
              var _i$triggerEl$classLis, _i$triggerEl$classLis2;

              (_i$triggerEl$classLis = i.triggerEl.classList).remove.apply(
                _i$triggerEl$classLis,
                _toConsumableArray(_this2._options.activeClasses.split(" "))
              );

              (_i$triggerEl$classLis2 = i.triggerEl.classList).add.apply(
                _i$triggerEl$classLis2,
                _toConsumableArray(_this2._options.inactiveClasses.split(" "))
              );

              i.targetEl.classList.add("hidden");
              i.triggerEl.setAttribute("aria-expanded", false);
              i.active = false; // rotate icon if set

              if (i.iconEl) {
                i.iconEl.classList.remove("rotate-180");
              }
            }
          });
        } // show active item

        (_item$triggerEl$class = item.triggerEl.classList).add.apply(
          _item$triggerEl$class,
          _toConsumableArray(this._options.activeClasses.split(" "))
        );

        (_item$triggerEl$class2 = item.triggerEl.classList).remove.apply(
          _item$triggerEl$class2,
          _toConsumableArray(this._options.inactiveClasses.split(" "))
        );

        item.triggerEl.setAttribute("aria-expanded", true);
        item.targetEl.classList.remove("hidden");
        item.active = true; // rotate icon if set

        if (item.iconEl) {
          item.iconEl.classList.add("rotate-180");
        } // callback function

        this._options.onOpen(this, item);
      },
    },
    {
      key: "toggle",
      value: function toggle(id) {
        var item = this.getItem(id);

        if (item.active) {
          this.close(id);
        } else {
          this.open(id);
        } // callback function

        this._options.onToggle(this, item);
      },
    },
    {
      key: "close",
      value: function close(id) {
        var _item$triggerEl$class3, _item$triggerEl$class4;

        var item = this.getItem(id);

        (_item$triggerEl$class3 = item.triggerEl.classList).remove.apply(
          _item$triggerEl$class3,
          _toConsumableArray(this._options.activeClasses.split(" "))
        );

        (_item$triggerEl$class4 = item.triggerEl.classList).add.apply(
          _item$triggerEl$class4,
          _toConsumableArray(this._options.inactiveClasses.split(" "))
        );

        item.targetEl.classList.add("hidden");
        item.triggerEl.setAttribute("aria-expanded", false);
        item.active = false; // rotate icon if set

        if (item.iconEl) {
          item.iconEl.classList.remove("rotate-180");
        } // callback function

        this._options.onClose(this, item);
      },
    },
  ]);

  return Accordion;
})();

window.Accordion = Accordion;
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-accordion]").forEach(function (accordionEl) {
    var alwaysOpen = accordionEl.getAttribute("data-accordion");
    var activeClasses = accordionEl.getAttribute("data-active-classes");
    var inactiveClasses = accordionEl.getAttribute("data-inactive-classes");
    var items = [];
    accordionEl
      .querySelectorAll("[data-accordion-target]")
      .forEach(function (el) {
        var item = {
          id: el.getAttribute("data-accordion-target"),
          triggerEl: el,
          targetEl: document.querySelector(
            el.getAttribute("data-accordion-target")
          ),
          iconEl: el.querySelector("[data-accordion-icon]"),
          active: el.getAttribute("aria-expanded") === "true" ? true : false,
        };
        items.push(item);
      });
    new Accordion(items, {
      alwaysOpen: alwaysOpen === "open" ? true : false,
      activeClasses: activeClasses ? activeClasses : Default.activeClasses,
      inactiveClasses: inactiveClasses
        ? inactiveClasses
        : Default.inactiveClasses,
    });
  });
});
/* harmony default export */ const accordion = Accordion; // CONCATENATED MODULE: ./src/components/collapse.js
function collapse_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function collapse_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? collapse_ownKeys(Object(source), !0).forEach(function (key) {
          collapse_defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : collapse_ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}

function collapse_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function collapse_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function collapse_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function collapse_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) collapse_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) collapse_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var collapse_Default = {
  triggerEl: null,
  onCollapse: function onCollapse() {},
  onExpand: function onExpand() {},
  onToggle: function onToggle() {},
};

var Collapse = /*#__PURE__*/ (function () {
  function Collapse() {
    var targetEl =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    collapse_classCallCheck(this, Collapse);

    this._targetEl = targetEl;
    this._triggerEl = options ? options.triggerEl : collapse_Default.triggerEl;
    this._options = collapse_objectSpread(
      collapse_objectSpread({}, collapse_Default),
      options
    );
    this._visible = false;

    this._init();
  }

  collapse_createClass(Collapse, [
    {
      key: "_init",
      value: function _init() {
        var _this = this;

        if (this._triggerEl) {
          if (this._triggerEl.hasAttribute("aria-expanded")) {
            this._visible =
              this._triggerEl.getAttribute("aria-expanded") === "true"
                ? true
                : false;
          } else {
            // fix until v2 not to break previous single collapses which became dismiss
            this._visible = this._targetEl.classList.contains("hidden")
              ? false
              : true;
          }

          this._triggerEl.addEventListener("click", function () {
            _this._visible ? _this.collapse() : _this.expand();
          });
        }
      },
    },
    {
      key: "collapse",
      value: function collapse() {
        this._targetEl.classList.add("hidden");

        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "false");
        }

        this._visible = false; // callback function

        this._options.onCollapse(this);
      },
    },
    {
      key: "expand",
      value: function expand() {
        this._targetEl.classList.remove("hidden");

        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "true");
        }

        this._visible = true; // callback function

        this._options.onExpand(this);
      },
    },
    {
      key: "toggle",
      value: function toggle() {
        if (this._visible) {
          this.collapse();
        } else {
          this.expand();
        }
      },
    },
  ]);

  return Collapse;
})();

window.Collapse = Collapse;
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("[data-collapse-toggle]")
    .forEach(function (triggerEl) {
      var targetEl = document.getElementById(
        triggerEl.getAttribute("data-collapse-toggle")
      );
      new Collapse(targetEl, {
        triggerEl: triggerEl,
      });
    });
});
/* harmony default export */ const collapse = Collapse;

// accordion

// tabs

// CONCATENATED MODULE: ./src/components/tabs.js
function tabs_toConsumableArray(arr) {
  return (
    tabs_arrayWithoutHoles(arr) ||
    tabs_iterableToArray(arr) ||
    tabs_unsupportedIterableToArray(arr) ||
    tabs_nonIterableSpread()
  );
}

function tabs_nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function tabs_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return tabs_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return tabs_arrayLikeToArray(o, minLen);
}

function tabs_iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function tabs_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return tabs_arrayLikeToArray(arr);
}

function tabs_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function tabs_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function tabs_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? tabs_ownKeys(Object(source), !0).forEach(function (key) {
          tabs_defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : tabs_ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}

function tabs_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function tabs_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function tabs_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function tabs_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) tabs_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) tabs_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var tabs_Default = {
  defaultTabId: null,
  activeClasses: "!text-[#fff]",
  inactiveClasses: "text-[#fff]/20",
  onShow: function onShow() {},
};

var Tabs = /*#__PURE__*/ (function () {
  function Tabs() {
    var items =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    tabs_classCallCheck(this, Tabs);

    this._items = items;
    this._activeTab = options ? this.getTab(options.defaultTabId) : null;
    this._options = tabs_objectSpread(
      tabs_objectSpread({}, tabs_Default),
      options
    );

    this._init();
  }

  tabs_createClass(Tabs, [
    {
      key: "_init",
      value: function _init() {
        var _this = this;

        if (this._items.length) {
          // set the first tab as active if not set by explicitly
          if (!this._activeTab) {
            this._setActiveTab(this._items[0]);
          } // force show the first default tab

          this.show(this._activeTab.id, true); // show tab content based on click

          this._items.map(function (tab) {
            tab.triggerEl.addEventListener("click", function () {
              _this.show(tab.id);
            });
          });
        }
      },
    },
    {
      key: "getActiveTab",
      value: function getActiveTab() {
        return this._activeTab;
      },
    },
    {
      key: "_setActiveTab",
      value: function _setActiveTab(tab) {
        this._activeTab = tab;
      },
    },
    {
      key: "getTab",
      value: function getTab(id) {
        return this._items.filter(function (t) {
          return t.id === id;
        })[0];
      },
    },
    {
      key: "show",
      value: function show(id) {
        var _this2 = this,
          _tab$triggerEl$classL,
          _tab$triggerEl$classL2;

        var forceShow =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : false;
        var tab = this.getTab(id); // don't do anything if already active

        if (tab === this._activeTab && !forceShow) {
          return;
        } // hide other tabs

        this._items.map(function (t) {
          if (t !== tab) {
            var _t$triggerEl$classLis, _t$triggerEl$classLis2;

            (_t$triggerEl$classLis = t.triggerEl.classList).remove.apply(
              _t$triggerEl$classLis,
              tabs_toConsumableArray(_this2._options.activeClasses.split(" "))
            );

            (_t$triggerEl$classLis2 = t.triggerEl.classList).add.apply(
              _t$triggerEl$classLis2,
              tabs_toConsumableArray(_this2._options.inactiveClasses.split(" "))
            );

            t.targetEl.classList.add("hidden");
            t.triggerEl.setAttribute("aria-selected", false);
          }
        }); // show active tab

        (_tab$triggerEl$classL = tab.triggerEl.classList).add.apply(
          _tab$triggerEl$classL,
          tabs_toConsumableArray(this._options.activeClasses.split(" "))
        );

        (_tab$triggerEl$classL2 = tab.triggerEl.classList).remove.apply(
          _tab$triggerEl$classL2,
          tabs_toConsumableArray(this._options.inactiveClasses.split(" "))
        );

        tab.triggerEl.setAttribute("aria-selected", true);
        tab.targetEl.classList.remove("hidden");

        this._setActiveTab(tab); // callback function

        this._options.onShow(this, tab);
      },
    },
  ]);

  return Tabs;
})();

window.Tabs = Tabs;
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-tabs-toggle]").forEach(function (triggerEl) {
    var tabElements = [];
    var defaultTabId = null;
    triggerEl.querySelectorAll('[role="tab"]').forEach(function (el) {
      var isActive = el.getAttribute("aria-selected") === "true";
      var tab = {
        id: el.getAttribute("data-tabs-target"),
        triggerEl: el,
        targetEl: document.querySelector(el.getAttribute("data-tabs-target")),
      };
      tabElements.push(tab);

      if (isActive) {
        defaultTabId = tab.id;
      }
    });
    new Tabs(tabElements, {
      defaultTabId: defaultTabId,
    });
  });
});
/* harmony default export */ const tabs = Tabs;
// tabs

// drawer

// CONCATENATED MODULE: ./src/components/drawer.js
function drawer_toConsumableArray(arr) {
  return (
    drawer_arrayWithoutHoles(arr) ||
    drawer_iterableToArray(arr) ||
    drawer_unsupportedIterableToArray(arr) ||
    drawer_nonIterableSpread()
  );
}

function drawer_nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function drawer_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return drawer_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return drawer_arrayLikeToArray(o, minLen);
}

function drawer_iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function drawer_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return drawer_arrayLikeToArray(arr);
}

function drawer_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function drawer_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function drawer_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? drawer_ownKeys(Object(source), !0).forEach(function (key) {
          drawer_defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : drawer_ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}

function drawer_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function drawer_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function drawer_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function drawer_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) drawer_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) drawer_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false,
  });
  return Constructor;
}

var drawer_Default = {
  placement: "left",
  bodyScrolling: false,
  backdrop: true,
  edge: false,
  edgeOffset: "bottom-[60px]",
  backdropClasses:
    "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30",
  onShow: function onShow() {},
  onHide: function onHide() {},
  onToggle: function onToggle() {},
};

var Drawer = /*#__PURE__*/ (function () {
  function Drawer() {
    var targetEl =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    drawer_classCallCheck(this, Drawer);

    this._targetEl = targetEl;
    this._options = drawer_objectSpread(
      drawer_objectSpread({}, drawer_Default),
      options
    );
    this._visible = false;

    this._init();
  }

  drawer_createClass(Drawer, [
    {
      key: "_init",
      value: function _init() {
        var _this = this;

        // set initial accessibility attributes
        if (this._targetEl) {
          this._targetEl.setAttribute("aria-hidden", "true");

          this._targetEl.classList.add("transition-transform");
        } // set base placement classes

        this._getPlacementClasses(this._options.placement).base.map(function (
          c
        ) {
          _this._targetEl.classList.add(c);
        }); // hide by default

        this.hide();
      },
    },
    {
      key: "isVisible",
      value: function isVisible() {
        return this._visible;
      },
    },
    {
      key: "hide",
      value: function hide() {
        var _this2 = this;

        // based on the edge option show placement classes
        if (this._options.edge) {
          this._getPlacementClasses(
            this._options.placement + "-edge"
          ).active.map(function (c) {
            _this2._targetEl.classList.remove(c);
          });

          this._getPlacementClasses(
            this._options.placement + "-edge"
          ).inactive.map(function (c) {
            _this2._targetEl.classList.add(c);
          });
        } else {
          this._getPlacementClasses(this._options.placement).active.map(
            function (c) {
              _this2._targetEl.classList.remove(c);
            }
          );

          this._getPlacementClasses(this._options.placement).inactive.map(
            function (c) {
              _this2._targetEl.classList.add(c);
            }
          );
        } // set accessibility attributes

        this._targetEl.setAttribute("aria-hidden", "true");

        this._targetEl.removeAttribute("aria-modal");

        this._targetEl.removeAttribute("role"); // enable body scroll

        if (!this._options.bodyScrolling) {
          document.body.classList.remove("overflow-hidden");
        } // destroy backdrop

        if (this._options.backdrop) {
          this._destroyBackdropEl();
        }

        this._visible = false; // callback function

        this._options.onHide(this);
      },
    },
    {
      key: "show",
      value: function show() {
        var _this3 = this;

        if (this._options.edge) {
          this._getPlacementClasses(
            this._options.placement + "-edge"
          ).active.map(function (c) {
            _this3._targetEl.classList.add(c);
          });

          this._getPlacementClasses(
            this._options.placement + "-edge"
          ).inactive.map(function (c) {
            _this3._targetEl.classList.remove(c);
          });
        } else {
          this._getPlacementClasses(this._options.placement).active.map(
            function (c) {
              _this3._targetEl.classList.add(c);
            }
          );

          this._getPlacementClasses(this._options.placement).inactive.map(
            function (c) {
              _this3._targetEl.classList.remove(c);
            }
          );
        } // set accessibility attributes

        this._targetEl.setAttribute("aria-modal", "true");

        this._targetEl.setAttribute("role", "dialog");

        this._targetEl.removeAttribute("aria-hidden"); // disable body scroll

        if (!this._options.bodyScrolling) {
          document.body.classList.add("overflow-hidden");
        } // show backdrop

        if (this._options.backdrop) {
          this._createBackdrop();
        }

        this._visible = true; // callback function

        this._options.onShow(this);
      },
    },
    {
      key: "toggle",
      value: function toggle() {
        if (this.isVisible()) {
          this.hide();
        } else {
          this.show();
        }
      },
    },
    {
      key: "_createBackdrop",
      value: function _createBackdrop() {
        var _this4 = this;

        if (!this._visible) {
          var _backdropEl$classList;

          var backdropEl = document.createElement("div");
          backdropEl.setAttribute("drawer-backdrop", "");

          (_backdropEl$classList = backdropEl.classList).add.apply(
            _backdropEl$classList,
            drawer_toConsumableArray(this._options.backdropClasses.split(" "))
          );

          document.querySelector("body").append(backdropEl);
          backdropEl.addEventListener("click", function () {
            _this4.hide();
          });
        }
      },
    },
    {
      key: "_destroyBackdropEl",
      value: function _destroyBackdropEl() {
        if (this._visible) {
          document.querySelector("[drawer-backdrop]").remove();
        }
      },
    },
    {
      key: "_getPlacementClasses",
      value: function _getPlacementClasses(placement) {
        switch (placement) {
          case "top":
            return {
              base: ["top-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["-translate-y-full"],
            };

          case "right":
            return {
              base: ["right-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-x-full"],
            };

          case "bottom":
            return {
              base: ["bottom-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full"],
            };

          case "left":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"],
            };

          case "bottom-edge":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full", this._options.edgeOffset],
            };

          default:
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"],
            };
        }
      },
    },
  ]);

  return Drawer;
})();

window.Drawer = Drawer;

var getDrawerInstance = function getDrawerInstance(id, instances) {
  if (
    instances.some(function (drawerInstance) {
      return drawerInstance.id === id;
    })
  ) {
    return instances.find(function (drawerInstance) {
      return drawerInstance.id === id;
    });
  }

  return false;
};

function initDrawer() {
  var drawerInstances = [];
  document
    .querySelectorAll("[data-drawer-target]")
    .forEach(function (triggerEl) {
      // mandatory
      var targetEl = document.getElementById(
        triggerEl.getAttribute("data-drawer-target")
      );
      var drawerId = targetEl.id; // optional

      var placement = triggerEl.getAttribute("data-drawer-placement");
      var bodyScrolling = triggerEl.getAttribute("data-drawer-body-scrolling");
      var backdrop = triggerEl.getAttribute("data-drawer-backdrop");
      var edge = triggerEl.getAttribute("data-drawer-edge");
      var edgeOffset = triggerEl.getAttribute("data-drawer-edge-offset");
      var drawer = null;

      if (getDrawerInstance(drawerId, drawerInstances)) {
        drawer = getDrawerInstance(drawerId, drawerInstances);
        drawer = drawer.object;
      } else {
        drawer = new Drawer(targetEl, {
          placement: placement ? placement : drawer_Default.placement,
          bodyScrolling: bodyScrolling
            ? bodyScrolling === "true"
              ? true
              : false
            : drawer_Default.bodyScrolling,
          backdrop: backdrop
            ? backdrop === "true"
              ? true
              : false
            : drawer_Default.backdrop,
          edge: edge ? (edge === "true" ? true : false) : drawer_Default.edge,
          edgeOffset: edgeOffset ? edgeOffset : drawer_Default.edgeOffset,
        });
        drawerInstances.push({
          id: drawerId,
          object: drawer,
        });
      }
    });
  document
    .querySelectorAll("[data-drawer-toggle]")
    .forEach(function (triggerEl) {
      var targetEl = document.getElementById(
        triggerEl.getAttribute("data-drawer-toggle")
      );
      var drawerId = targetEl.id;
      r;
      var drawer = getDrawerInstance(drawerId, drawerInstances);
      triggerEl.addEventListener("click", function () {
        if (drawer.object.isVisible()) {
          drawer.object.hide();
        } else {
          drawer.object.show();
        }
      });
    });
  document
    .querySelectorAll("[data-drawer-dismiss]")
    .forEach(function (triggerEl) {
      var targetEl = document.getElementById(
        triggerEl.getAttribute("data-drawer-dismiss")
      );
      var drawerId = targetEl.id;
      var drawer = getDrawerInstance(drawerId, drawerInstances);
      triggerEl.addEventListener("click", function () {
        drawer.object.hide();
      });
    });
  document.querySelectorAll("[data-drawer-show]").forEach(function (triggerEl) {
    var targetEl = document.getElementById(
      triggerEl.getAttribute("data-drawer-show")
    );
    var drawerId = targetEl.id;
    var drawer = getDrawerInstance(drawerId, drawerInstances);
    triggerEl.addEventListener("click", function () {
      drawer.object.show();
    });
  });
}

if (document.readyState !== "loading") {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  initDrawer();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener("DOMContentLoaded", initDrawer);
}

/* harmony default export */
const drawer = Drawer;



$(".owl-popularslider2").owlCarousel({
  loop: true,
  nav: false,
  dots: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplaySpeed: 1200,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});




// Highlight active button
const prevButton = document.getElementById("prevButton"),
  nextButton = document.getElementById("nextButton");

if (prevButton && nextButton) {
  function setActiveButton(activeButton, inactiveButton) {
    activeButton.classList.add("border-[#fff]");
    activeButton.classList.remove("border-[#fff]/20");
    inactiveButton.classList.add("border-[#fff]/20");
    inactiveButton.classList.remove("border-[#fff]");
  }

  prevButton.addEventListener("click", function () {
    setActiveButton(prevButton, nextButton);
  });

  nextButton.addEventListener("click", function () {
    setActiveButton(nextButton, prevButton);
  });
}



var a = 0;

$(document).ready(function () {
  // Check if the element with class 'counter' exists
  if ($(".counter").length) {
    $(window).scroll(function () {
      var oTop = $(".counter").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter-value").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-count");
          $({
            countNum: $this.text(),
          }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 2000,
              easing: "swing",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
                //alert('finished');
              },
            }
          );
        });
        a = 1;
      }
    });
  }
});

// Function to set responsive width and height attributes for images with lazy loading and auto-filled alt text
function setResponsiveImgAttributes(img) {
  var imageUrl = img.getAttribute("src");
  var dataSrc = img.getAttribute("data-src"); // Assuming data-src attribute contains the actual image URL

  // Create a new Image object to get image dimensions
  var tempImg = new Image();
  tempImg.src = imageUrl || dataSrc; // Use data-src if src is not available

  // When the temporary image has loaded, calculate responsive width and height attributes
  tempImg.onload = function () {
    var imgWidth = tempImg.width; // Set your desired width
    var imgHeight = tempImg.height; // Set your desired height

    // Set responsive attributes
    img.width = imgWidth;
    img.height = imgHeight;

    // Set alt text as the image file name without extension
    var fileName = imageUrl.split("/").pop().split(".")[0]; // Extract the file name without extension
    img.alt = fileName; // Set alt attribute with the file name
  };

  // Handle image load error
  tempImg.onerror = function () {
    console.error("Error loading image: " + (imageUrl || dataSrc));
  };

  // Set loading attribute to lazy
  img.loading = "eager";
}

// Get all img elements on the page
var imgElements = document.getElementsByTagName("img");

// Loop through all img elements and set responsive attributes with lazy loading and auto-filled alt text
for (let i = 0; i < imgElements.length; i++) {
  setResponsiveImgAttributes(imgElements[i]);
}

function openModal(t) {
  (modal = document.getElementById(t)), modal.classList.remove("hidden");
}
function closeModal(t) {
  (modal = document.getElementById(t)), modal.classList.add("hidden");
}


$(document).ready(function () {
  //responsive menu
  $(".menu-bottom").on("click", function () {
    $("html").toggleClass("menu-open");
  });
  $(".menu-bottom").click(function () {
    $(this).toggleClass("click");
  });
  setTimeout(function () {
    jQuery(".topslider").show();
  }, 500);
  $.ajax({
    method: "get",
    url: "https://ipwhois.pro/json/?key=i6TGIdIvxRmcijhn",
    success: function (data) {
      if (data) {
        if ($("input[name=ip2loc_ip]").length > 0) {
          $("input[name=ip2loc_ip]").val(data.ip);
          $("input[name=ip2loc_isp]").val(data.isp);
          $("input[name=ip2loc_org]").val(data.org);
          $("input[name=ip2loc_country]").val(data.country);
          $("input[name=ip2loc_region]").val(data.region);
          $("input[name=ip2loc_city]").val(data.city);
        }
      }
    },
  });
  $(".form_1").validate({});
  $(".form_2").validate({});
  $(".form_3").validate({});
  $(".form_4").validate({});
  $(".form_5").validate({});
  $(".form_6").validate({});
});
// document.querySelectorAll(".accordion-button").forEach((button) => {
//   button.addEventListener("click", function () {
//     const imageSrc = this.getAttribute("data-image");

//     // Toggle visibility of the content
//     const target = this.getAttribute("data-accordion-target");
//     const content = document.querySelector(target);
//     content.classList.toggle("hidden");

//     // Update the image
//     document.getElementById("accordionImage").src = imageSrc;

//     // Close other open accordions and reset their content
//     document.querySelectorAll(".accordion-button").forEach((btn) => {
//       const btnTarget = btn.getAttribute("data-accordion-target");
//       if (btnTarget !== target) {
//         document.querySelector(btnTarget).classList.add("hidden");
//       }
//     });
//   });
// });

document.querySelectorAll('.accordion-button').forEach((button, index) => {
  // Set the first accordion to be open by default
  if (index === 0) {
    const accordionContent = document.querySelector(button.getAttribute('data-accordion-target'));
    button.setAttribute('aria-expanded', 'true');
    accordionContent.classList.remove('hidden'); // Make the first content visible
    button.querySelector('.expand-icon').classList.add('hidden');
    button.querySelector('.collapse-icon').classList.remove('hidden');
  }
  button.addEventListener('click', () => {
      const accordionContent = document.querySelector(button.getAttribute('data-accordion-target'));
      // Close all other accordions
      document.querySelectorAll('.accordion-content').forEach(content => {
          if (content !== accordionContent) {
              content.classList.add('hidden');
              const siblingButton = content.previousElementSibling.querySelector('.accordion-button');
              siblingButton.setAttribute('aria-expanded', 'false');
              siblingButton.querySelector('.expand-icon').classList.remove('hidden');
              siblingButton.querySelector('.collapse-icon').classList.add('hidden');
          }
      });
      // Toggle the current accordion
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      accordionContent.classList.toggle('hidden', isExpanded);
      button.setAttribute('aria-expanded', !isExpanded);
      button.querySelector('.expand-icon').classList.toggle('hidden', !isExpanded);
      button.querySelector('.collapse-icon').classList.toggle('hidden', isExpanded);
  });
});




$(document).ready(function () {
  $(".owl-slider").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    slideTransition: "linear",
    autoplaySpeed: 2000,
    smartSpeed: 2000,
    center: true,
    margin: 10,
    dots: false,
   
    responsive: {
      0: {
        items: 2,
      },
      300: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1024: {
        items: 4,
      },
    },
  });

  
});
