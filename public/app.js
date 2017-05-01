(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reducers = require('js/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _App = require('js/components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default);

store.subscribe(function () {
  return console.log("Store changed", store.getState());
});

var charts = document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  ), document.querySelector('#app'));
});

});

require.register("js/actions/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var selectView = function selectView(viewName) {
    return {
        type: "SELECT_VIEW",
        view: viewName
    };
};

var selectMetric = function selectMetric(metricName) {
    return {
        type: "SELECT_METRIC",
        metric: metricName
    };
};

var filterMetrics = function filterMetrics(term) {
    return {
        type: "FILTER_METRICS",
        term: term
    };
};

exports.selectView = selectView;
exports.selectMetric = selectMetric;
exports.filterMetrics = filterMetrics;

});

require.register("js/components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _NavBar = require('./NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _MetricContainer = require('./MetricContainer');

var _MetricContainer2 = _interopRequireDefault(_MetricContainer);

var _rgb = require('js/lib/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

var _actions = require('js/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colours = [new _rgb2.default(238, 64, 53), new _rgb2.default(243, 119, 54), new _rgb2.default(253, 244, 152), new _rgb2.default(123, 192, 67), new _rgb2.default(3, 146, 207)];

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'small-2 columns sidebar app-dashboard-sidebar' },
            _react2.default.createElement(_NavBar2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'small-10 columns' },
            _react2.default.createElement(_MetricContainer2.default, null)
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

function mapStateToProps(state) {
  return {
    metrics: state.metrics
  };
}

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectView: _actions.selectView
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(App);

});

require.register("js/components/MetricContainer.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MetricContainer = function (_Component) {
  _inherits(MetricContainer, _Component);

  function MetricContainer() {
    _classCallCheck(this, MetricContainer);

    return _possibleConstructorReturn(this, (MetricContainer.__proto__ || Object.getPrototypeOf(MetricContainer)).apply(this, arguments));
  }

  _createClass(MetricContainer, [{
    key: 'render',
    value: function render() {
      console.log("Current metric", this.props.currentMetric);
      return _react2.default.createElement(this.props.currentMetric || "div", {}, null) || "Please select a menu item.";
    }
  }]);

  return MetricContainer;
}(_react.Component);

function mapStateToProps(state) {
  return {
    currentMetric: state.metrics.currentMetric
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MetricContainer);

});

require.register("js/components/NavBar.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_Component) {
  _inherits(NavBar, _Component);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this.handleFilterChange = _this.handleFilterChange.bind(_this);
    _this.clearFilter = _this.clearFilter.bind(_this);
    return _this;
  }

  _createClass(NavBar, [{
    key: "renderMenuItems",
    value: function renderMenuItems() {
      var _this2 = this;

      return this.props.menuItems.map(function (item, i) {
        return _react2.default.createElement(
          "div",
          { className: "nav-group", key: "nav-group-" + i },
          _this2.renderMenuHeading(item.heading),
          _this2.renderEntries(item.metrics)
        );
      });
    }
  }, {
    key: "renderMenuHeading",
    value: function renderMenuHeading(heading) {
      return _react2.default.createElement(
        "li",
        { className: "nav-heading" },
        heading
      );
    }
  }, {
    key: "renderEntries",
    value: function renderEntries(metrics) {
      var _this3 = this;

      return metrics.map(function (metric) {
        return _react2.default.createElement(
          "li",
          { className: "nav-entry", key: metric.name },
          _react2.default.createElement(
            "a",
            { href: "#", onClick: function onClick() {
                return _this3.props.selectMetric(metric.type);
              } },
            metric.name
          )
        );
      });
    }
  }, {
    key: "renderNavBarHeading",
    value: function renderNavBarHeading() {
      return _react2.default.createElement(
        "div",
        { className: "row collapse postfix-round" },
        _react2.default.createElement(
          "header",
          { className: "nav-header", role: "banner" },
          _react2.default.createElement(
            "h5",
            { className: "nav-title" },
            "Agile Performer"
          ),
          _react2.default.createElement(
            "form",
            null,
            _react2.default.createElement(
              "div",
              { className: "input-group" },
              _react2.default.createElement("input", { className: "input-group-field", type: "text", value: this.props.metricFilter, onChange: this.handleFilterChange, placeholder: "Search.." }),
              _react2.default.createElement(
                "div",
                { className: "input-group-button" },
                _react2.default.createElement(
                  "button",
                  { className: "button", onClick: this.clearFilter },
                  "\xD7"
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: "handleFilterChange",
    value: function handleFilterChange(event) {
      this.props.filterMetrics(event.target.value);
    }
  }, {
    key: "clearFilter",
    value: function clearFilter(event) {
      this.props.filterMetrics("");
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "sidenav" },
        this.renderNavBarHeading(),
        _react2.default.createElement(
          "ul",
          { className: "menu vertical" },
          this.renderMenuItems()
        )
      );
    }
  }]);

  return NavBar;
}(_react.Component);

function mapStateToProps(state) {
  return {
    menuItems: state.menuItems.items,
    metricFilter: state.menuItems.filterTerm
  };
}

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectMetric: _actions.selectMetric,
    filterMetrics: _actions.filterMetrics
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(NavBar);

});

require.register("js/components/charts/BarLineChart.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _data_transformer = require('../../lib/data_transformer');

var _data_transformer2 = _interopRequireDefault(_data_transformer);

var _chart_options = require('../../lib/chart_options');

var _chart_options2 = _interopRequireDefault(_chart_options);

var _rgb = require('../../lib/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarLineChart = function (_React$Component) {
  _inherits(BarLineChart, _React$Component);

  function BarLineChart() {
    _classCallCheck(this, BarLineChart);

    return _possibleConstructorReturn(this, (BarLineChart.__proto__ || Object.getPrototypeOf(BarLineChart)).apply(this, arguments));
  }

  _createClass(BarLineChart, [{
    key: 'render',
    value: function render() {
      var opts = (0, _chart_options2.default)(this.props.options),
          data = (0, _data_transformer2.default)("bar", this.props.data, this.props.colours);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        _react2.default.createElement(_reactChartjs.Bar, { data: data, options: opts }),
        this.props.children
      );
    }
  }]);

  return BarLineChart;
}(_react2.default.Component);

exports.default = BarLineChart;

});

require.register("js/components/charts/LineChart.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _data_transformer = require('../../lib/data_transformer');

var _data_transformer2 = _interopRequireDefault(_data_transformer);

var _chart_options = require('../../lib/chart_options');

var _chart_options2 = _interopRequireDefault(_chart_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = function (_React$Component) {
  _inherits(LineChart, _React$Component);

  function LineChart() {
    _classCallCheck(this, LineChart);

    return _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).apply(this, arguments));
  }

  _createClass(LineChart, [{
    key: 'render',
    value: function render() {
      var opts = (0, _chart_options2.default)(this.props.options),
          data = (0, _data_transformer2.default)("line", this.props.data, this.props.colours);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts }),
        this.props.children
      );
    }
  }]);

  return LineChart;
}(_react2.default.Component);

exports.default = LineChart;

});

require.register("js/components/charts/MultiBarChart.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _data_transformer = require('../../lib/data_transformer');

var _data_transformer2 = _interopRequireDefault(_data_transformer);

var _chart_options = require('../../lib/chart_options');

var _chart_options2 = _interopRequireDefault(_chart_options);

var _rgb = require('../../lib/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiBarChart = function (_React$Component) {
  _inherits(MultiBarChart, _React$Component);

  function MultiBarChart() {
    _classCallCheck(this, MultiBarChart);

    return _possibleConstructorReturn(this, (MultiBarChart.__proto__ || Object.getPrototypeOf(MultiBarChart)).apply(this, arguments));
  }

  _createClass(MultiBarChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        _react2.default.createElement(_reactChartjs.Bar, { ref: 'chart', data: (0, _data_transformer2.default)("bar", this.props.data, this.props.colours, false), options: (0, _chart_options2.default)(this.props.options) }),
        this.props.children
      );
    }
  }]);

  return MultiBarChart;
}(_react2.default.Component);

exports.default = MultiBarChart;

});

require.register("js/components/charts/PercentageLineChart.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _data_transformer = require('../../lib/data_transformer');

var _data_transformer2 = _interopRequireDefault(_data_transformer);

var _chart_options = require('../../lib/chart_options');

var _chart_options2 = _interopRequireDefault(_chart_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var percentageScaleOpts = function percentageScaleOpts(min, max) {
  return {
    scales: {
      yAxes: [{
        ticks: {
          callback: function callback(val) {
            return (val * 100).toFixed() + "%";
          },
          suggestedMin: min || 0,
          suggestedMax: max || 1,
          beginAtZero: true
        }
      }]
    }
  };
};

var PercentageLineChart = function (_React$Component) {
  _inherits(PercentageLineChart, _React$Component);

  function PercentageLineChart() {
    _classCallCheck(this, PercentageLineChart);

    return _possibleConstructorReturn(this, (PercentageLineChart.__proto__ || Object.getPrototypeOf(PercentageLineChart)).apply(this, arguments));
  }

  _createClass(PercentageLineChart, [{
    key: 'render',
    value: function render() {
      var opts = (0, _chart_options2.default)(Object.assign({}, percentageScaleOpts(this.props.min, this.props.max), this.props.options)),
          data = (0, _data_transformer2.default)("line", this.props.data, this.props.colours);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts }),
        this.props.children
      );
    }
  }]);

  return PercentageLineChart;
}(_react2.default.Component);

exports.default = PercentageLineChart;

});

require.register("js/components/charts/PieChart.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _data_transformer = require('../../lib/data_transformer');

var _data_transformer2 = _interopRequireDefault(_data_transformer);

var _chart_options = require('../../lib/chart_options');

var _chart_options2 = _interopRequireDefault(_chart_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChart = function (_React$Component) {
  _inherits(PieChart, _React$Component);

  function PieChart() {
    _classCallCheck(this, PieChart);

    return _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).apply(this, arguments));
  }

  _createClass(PieChart, [{
    key: 'render',
    value: function render() {
      var opts = (0, _chart_options2.default)(this.props.options),
          data = (0, _data_transformer2.default)("pie", this.props.data, this.props.colours);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        _react2.default.createElement(_reactChartjs.Pie, { ref: 'chart', data: data, options: opts }),
        this.props.children
      );
    }
  }]);

  return PieChart;
}(_react2.default.Component);

exports.default = PieChart;

});

require.register("js/components/charts/RadarChart.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _data_transformer = require('../../lib/data_transformer');

var _data_transformer2 = _interopRequireDefault(_data_transformer);

var _chart_options = require('../../lib/chart_options');

var _chart_options2 = _interopRequireDefault(_chart_options);

var _rgb = require('../../lib/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadarChart = function (_React$Component) {
  _inherits(RadarChart, _React$Component);

  function RadarChart() {
    _classCallCheck(this, RadarChart);

    return _possibleConstructorReturn(this, (RadarChart.__proto__ || Object.getPrototypeOf(RadarChart)).apply(this, arguments));
  }

  _createClass(RadarChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        _react2.default.createElement(_reactChartjs.Radar, { data: (0, _data_transformer2.default)("radar", this.props.data, this.props.colours), options: (0, _chart_options2.default)(this.props.options) }),
        this.props.children
      );
    }
  }]);

  return RadarChart;
}(_react2.default.Component);

exports.default = RadarChart;

});

require.register("js/components/charts/UnsortedLineChart.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _data_transformer = require('../../lib/data_transformer');

var _data_transformer2 = _interopRequireDefault(_data_transformer);

var _chart_options = require('../../lib/chart_options');

var _chart_options2 = _interopRequireDefault(_chart_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnsortedLineChart = function (_React$Component) {
  _inherits(UnsortedLineChart, _React$Component);

  function UnsortedLineChart() {
    _classCallCheck(this, UnsortedLineChart);

    return _possibleConstructorReturn(this, (UnsortedLineChart.__proto__ || Object.getPrototypeOf(UnsortedLineChart)).apply(this, arguments));
  }

  _createClass(UnsortedLineChart, [{
    key: 'render',
    value: function render() {
      var opts = (0, _chart_options2.default)(this.props.options),
          data = (0, _data_transformer2.default)("line", this.props.data, this.props.colours, false);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts }),
        this.props.children
      );
    }
  }]);

  return UnsortedLineChart;
}(_react2.default.Component);

exports.default = UnsortedLineChart;

});

require.register("js/components/metrics/DefectsOverTime.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _UnsortedLineChart = require('../charts/UnsortedLineChart');

var _UnsortedLineChart2 = _interopRequireDefault(_UnsortedLineChart);

var _MetricDescription = require('./helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefectsOverTimeMetric = function (_Component) {
  _inherits(DefectsOverTimeMetric, _Component);

  function DefectsOverTimeMetric() {
    _classCallCheck(this, DefectsOverTimeMetric);

    return _possibleConstructorReturn(this, (DefectsOverTimeMetric.__proto__ || Object.getPrototypeOf(DefectsOverTimeMetric)).apply(this, arguments));
  }

  _createClass(DefectsOverTimeMetric, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _UnsortedLineChart2.default,
        { data: this.props.chartData, options: this.props.options, title: 'Defects Over Time' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return DefectsOverTimeMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.defectsOverTime.chart,
    description: state.metrics.defectsOverTime.description
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(DefectsOverTimeMetric);

});

require.register("js/components/metrics/EnhancedReleaseBurndown.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnhancedReleaseBurndownMetric = function (_Component) {
  _inherits(EnhancedReleaseBurndownMetric, _Component);

  function EnhancedReleaseBurndownMetric() {
    _classCallCheck(this, EnhancedReleaseBurndownMetric);

    return _possibleConstructorReturn(this, (EnhancedReleaseBurndownMetric.__proto__ || Object.getPrototypeOf(EnhancedReleaseBurndownMetric)).apply(this, arguments));
  }

  _createClass(EnhancedReleaseBurndownMetric, [{
    key: 'chartOptions',
    value: function chartOptions() {
      var opts = Object.assign({}, this.props.options, {
        scales: {
          yAxes: [{
            stacked: false
          }]
        }
      });
      return opts;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _MultiBarChart2.default,
        { data: this.props.chartData, options: this.chartOptions(), title: 'Enhanced Release Burndown' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return EnhancedReleaseBurndownMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.releaseBurndown.chart,
    description: state.metrics.releaseBurndown.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(EnhancedReleaseBurndownMetric);

});

require.register("js/components/metrics/HappinessIndexMetric.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HappinessIndexMetric = function (_Component) {
  _inherits(HappinessIndexMetric, _Component);

  function HappinessIndexMetric() {
    _classCallCheck(this, HappinessIndexMetric);

    return _possibleConstructorReturn(this, (HappinessIndexMetric.__proto__ || Object.getPrototypeOf(HappinessIndexMetric)).apply(this, arguments));
  }

  _createClass(HappinessIndexMetric, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _LineChart2.default,
        { data: this.props.chartData, title: 'Happiness Index' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return HappinessIndexMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.happinessIndex.chart,
    description: state.metrics.happinessIndex.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(HappinessIndexMetric);

});

require.register("js/components/metrics/ProjectCodeOwnership.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _PieChart = require('../charts/PieChart');

var _PieChart2 = _interopRequireDefault(_PieChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectCodeOwnershipMetric = function (_Component) {
  _inherits(ProjectCodeOwnershipMetric, _Component);

  function ProjectCodeOwnershipMetric() {
    _classCallCheck(this, ProjectCodeOwnershipMetric);

    return _possibleConstructorReturn(this, (ProjectCodeOwnershipMetric.__proto__ || Object.getPrototypeOf(ProjectCodeOwnershipMetric)).apply(this, arguments));
  }

  _createClass(ProjectCodeOwnershipMetric, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _PieChart2.default,
        { data: this.props.chartData, title: 'Project Code Ownership' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return ProjectCodeOwnershipMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.codeOwnership.project.chart,
    description: state.metrics.codeOwnership.project.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ProjectCodeOwnershipMetric);

});

require.register("js/components/metrics/RemedialFocus.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

var _MetricDescription = require('./helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemedialFocusMetric = function (_Component) {
  _inherits(RemedialFocusMetric, _Component);

  function RemedialFocusMetric() {
    _classCallCheck(this, RemedialFocusMetric);

    return _possibleConstructorReturn(this, (RemedialFocusMetric.__proto__ || Object.getPrototypeOf(RemedialFocusMetric)).apply(this, arguments));
  }

  _createClass(RemedialFocusMetric, [{
    key: 'remedialChartOptions',
    value: function remedialChartOptions() {
      var opts = Object.assign({}, this.props.options, {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      });
      return opts;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _MultiBarChart2.default,
        { data: this.props.chartData, options: this.remedialChartOptions(), title: 'Remedial Focus' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return RemedialFocusMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.remedialFocus.chart,
    description: state.metrics.remedialFocus.description
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(RemedialFocusMetric);

});

require.register("js/components/metrics/ScrumPracticesMetric.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _RadarChart = require('../charts/RadarChart');

var _RadarChart2 = _interopRequireDefault(_RadarChart);

var _MetricDescription = require('./helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrumPracticesMetric = function (_Component) {
  _inherits(ScrumPracticesMetric, _Component);

  function ScrumPracticesMetric() {
    _classCallCheck(this, ScrumPracticesMetric);

    return _possibleConstructorReturn(this, (ScrumPracticesMetric.__proto__ || Object.getPrototypeOf(ScrumPracticesMetric)).apply(this, arguments));
  }

  _createClass(ScrumPracticesMetric, [{
    key: 'chartOptions',
    value: function chartOptions() {
      var displayTicks = function displayTicks(value) {
        var adoptionLabels = {
          1: "Adoption",
          2: "Adaptation",
          3: "Acceptance",
          4: "Routinisation"
        };
        return adoptionLabels[value] || "";
      };
      return {
        scale: {
          ticks: {
            callback: displayTicks,
            min: 0,
            max: 5,
            stepSize: 1
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _RadarChart2.default,
        { data: this.props.chartData, options: this.chartOptions(), title: 'Scrum Practices' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return ScrumPracticesMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.scrumPractices.chart,
    description: state.metrics.scrumPractices.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ScrumPracticesMetric);

});

require.register("js/components/metrics/SprintBurndownBar.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprintBurndownBarMetric = function (_Component) {
    _inherits(SprintBurndownBarMetric, _Component);

    function SprintBurndownBarMetric() {
        _classCallCheck(this, SprintBurndownBarMetric);

        return _possibleConstructorReturn(this, (SprintBurndownBarMetric.__proto__ || Object.getPrototypeOf(SprintBurndownBarMetric)).apply(this, arguments));
    }

    _createClass(SprintBurndownBarMetric, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _MultiBarChart2.default,
                { data: this.props.chartData, title: 'Sprint Burndown' },
                _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
            );
        }
    }]);

    return SprintBurndownBarMetric;
}(_react.Component);

function mapStateToProps(state) {
    return {
        chartData: state.metrics.sprintBurndown.chart,
        description: state.metrics.sprintBurndown.description
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SprintBurndownBarMetric);

});

require.register("js/components/metrics/SprintBurndownLine.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprintBurndownLineMetric = function (_Component) {
  _inherits(SprintBurndownLineMetric, _Component);

  function SprintBurndownLineMetric() {
    _classCallCheck(this, SprintBurndownLineMetric);

    return _possibleConstructorReturn(this, (SprintBurndownLineMetric.__proto__ || Object.getPrototypeOf(SprintBurndownLineMetric)).apply(this, arguments));
  }

  _createClass(SprintBurndownLineMetric, [{
    key: 'chartData',
    value: function chartData() {
      return this.props.chartData.map(function (dataPoint) {
        return Object.assign({}, dataPoint, {
          description: dataPoint.description,
          data: dataPoint.data
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _LineChart2.default,
        { data: this.chartData(), title: 'Sprint Burndown' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return SprintBurndownLineMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.sprintBurndown.chart,
    description: state.metrics.sprintBurndown.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SprintBurndownLineMetric);

});

require.register("js/components/metrics/SprintInterference.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _MetricDescription = require('./helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprintInterferenceMetric = function (_Component) {
  _inherits(SprintInterferenceMetric, _Component);

  function SprintInterferenceMetric() {
    _classCallCheck(this, SprintInterferenceMetric);

    return _possibleConstructorReturn(this, (SprintInterferenceMetric.__proto__ || Object.getPrototypeOf(SprintInterferenceMetric)).apply(this, arguments));
  }

  _createClass(SprintInterferenceMetric, [{
    key: 'chartOptions',
    value: function chartOptions() {
      return {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Person-Days Spent on Non-Sprint Backlog Tasks"
            }
          }]
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _LineChart2.default,
        { data: this.props.chartData, options: this.chartOptions(), title: 'Sprint Interference' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return SprintInterferenceMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.sprintInterference.chart,
    description: state.metrics.sprintInterference.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SprintInterferenceMetric);

});

require.register("js/components/metrics/TeamCodeOwnership.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _PieChart = require('../charts/PieChart');

var _PieChart2 = _interopRequireDefault(_PieChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

var _rgb = require('../../lib/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colours = [new _rgb2.default(92, 153, 237), // blue
new _rgb2.default(219, 70, 70), // red
new _rgb2.default(244, 214, 33), // yellow
new _rgb2.default(180, 180, 180)];

var TeamCodeOwnershipMetric = function (_Component) {
  _inherits(TeamCodeOwnershipMetric, _Component);

  function TeamCodeOwnershipMetric() {
    _classCallCheck(this, TeamCodeOwnershipMetric);

    return _possibleConstructorReturn(this, (TeamCodeOwnershipMetric.__proto__ || Object.getPrototypeOf(TeamCodeOwnershipMetric)).apply(this, arguments));
  }

  _createClass(TeamCodeOwnershipMetric, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _PieChart2.default,
        { data: this.props.chartData, colours: colours, title: 'Team Code Ownership' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return TeamCodeOwnershipMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.codeOwnership.team.chart,
    description: state.metrics.codeOwnership.team.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(TeamCodeOwnershipMetric);

});

require.register("js/components/metrics/TeamSatisfactionMetric.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BarLineChart = require('../charts/BarLineChart');

var _BarLineChart2 = _interopRequireDefault(_BarLineChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamSatisfactionMetric = function (_Component) {
  _inherits(TeamSatisfactionMetric, _Component);

  function TeamSatisfactionMetric() {
    _classCallCheck(this, TeamSatisfactionMetric);

    return _possibleConstructorReturn(this, (TeamSatisfactionMetric.__proto__ || Object.getPrototypeOf(TeamSatisfactionMetric)).apply(this, arguments));
  }

  _createClass(TeamSatisfactionMetric, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _BarLineChart2.default,
        { data: this.props.chartData, title: 'Team Satisfaction' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return TeamSatisfactionMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.teamSatisfaction.chart,
    description: state.metrics.teamSatisfaction.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(TeamSatisfactionMetric);

});

require.register("js/components/metrics/VelocityBar.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BarLineChart = require('../charts/BarLineChart');

var _BarLineChart2 = _interopRequireDefault(_BarLineChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VelocityBarMetric = function (_Component) {
  _inherits(VelocityBarMetric, _Component);

  function VelocityBarMetric() {
    _classCallCheck(this, VelocityBarMetric);

    return _possibleConstructorReturn(this, (VelocityBarMetric.__proto__ || Object.getPrototypeOf(VelocityBarMetric)).apply(this, arguments));
  }

  _createClass(VelocityBarMetric, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _BarLineChart2.default,
        { data: this.props.chartData, title: 'Velocity' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return VelocityBarMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.velocityBar.chart,
    description: state.metrics.velocityBar.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VelocityBarMetric);

});

require.register("js/components/metrics/VelocityLine.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _MetricDescription = require('../metrics/helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VelocityLineMetric = function (_Component) {
  _inherits(VelocityLineMetric, _Component);

  function VelocityLineMetric() {
    _classCallCheck(this, VelocityLineMetric);

    return _possibleConstructorReturn(this, (VelocityLineMetric.__proto__ || Object.getPrototypeOf(VelocityLineMetric)).apply(this, arguments));
  }

  _createClass(VelocityLineMetric, [{
    key: 'chartData',
    value: function chartData() {
      return this.props.chartData.map(function (_ref) {
        var description = _ref.description,
            data = _ref.data;
        return {
          description: description,
          data: data,
          chartType: "line",
          borderDash: description == "Commitment" ? [10, 5] : undefined
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _LineChart2.default,
        { data: this.chartData(), title: 'Velocity' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return VelocityLineMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.velocityLine.chart,
    description: state.metrics.velocityLine.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VelocityLineMetric);

});

require.register("js/components/metrics/XpPracticesMetric.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _RadarChart = require('../charts/RadarChart');

var _RadarChart2 = _interopRequireDefault(_RadarChart);

var _MetricDescription = require('./helpers/MetricDescription');

var _MetricDescription2 = _interopRequireDefault(_MetricDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XpPracticesMetric = function (_Component) {
  _inherits(XpPracticesMetric, _Component);

  function XpPracticesMetric() {
    _classCallCheck(this, XpPracticesMetric);

    return _possibleConstructorReturn(this, (XpPracticesMetric.__proto__ || Object.getPrototypeOf(XpPracticesMetric)).apply(this, arguments));
  }

  _createClass(XpPracticesMetric, [{
    key: 'chartOptions',
    value: function chartOptions() {
      var displayTicks = function displayTicks(value) {
        var adoptionLabels = {
          1: "Adoption",
          2: "Adaptation",
          3: "Acceptance",
          4: "Routinisation"
        };
        return adoptionLabels[value] || "";
      };
      return {
        scale: {
          ticks: {
            callback: displayTicks,
            min: 0,
            max: 5,
            stepSize: 1
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _RadarChart2.default,
        { data: this.props.chartData, options: this.chartOptions(), title: 'XP Practices' },
        _react2.default.createElement(_MetricDescription2.default, { description: this.props.description })
      );
    }
  }]);

  return XpPracticesMetric;
}(_react.Component);

function mapStateToProps(state) {
  return {
    chartData: state.metrics.xpPractices.chart,
    description: state.metrics.xpPractices.description
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(XpPracticesMetric);

});

require.register("js/components/metrics/helpers/MetricDescription.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MetricDescription = function (_Component) {
  _inherits(MetricDescription, _Component);

  function MetricDescription() {
    _classCallCheck(this, MetricDescription);

    return _possibleConstructorReturn(this, (MetricDescription.__proto__ || Object.getPrototypeOf(MetricDescription)).apply(this, arguments));
  }

  _createClass(MetricDescription, [{
    key: 'render',
    value: function render() {
      var leadText = this.props.description.leadText,
          bodyText = this.props.description.bodyText;
      return _react2.default.createElement(
        'div',
        { className: 'callout primary metric-info' },
        _react2.default.createElement(
          'p',
          { className: 'lead' },
          leadText
        ),
        _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: bodyText } })
      );
    }
  }]);

  return MetricDescription;
}(_react.Component);

exports.default = MetricDescription;

});

require.register("js/components/metrics/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XpPracticesMetric = exports.VelocityLineMetric = exports.VelocityBarMetric = exports.TeamSatisfactionMetric = exports.TeamCodeOwnershipMetric = exports.SprintInterferenceMetric = exports.SprintBurndownLineMetric = exports.SprintBurndownBarMetric = exports.ScrumPracticesMetric = exports.RemedialFocusMetric = exports.ProjectCodeOwnershipMetric = exports.HappinessIndexMetric = exports.EnhancedReleaseBurndownMetric = exports.DefectsOverTimeMetric = undefined;

var _DefectsOverTime = require('./DefectsOverTime');

var _DefectsOverTime2 = _interopRequireDefault(_DefectsOverTime);

var _EnhancedReleaseBurndown = require('./EnhancedReleaseBurndown');

var _EnhancedReleaseBurndown2 = _interopRequireDefault(_EnhancedReleaseBurndown);

var _HappinessIndexMetric = require('./HappinessIndexMetric');

var _HappinessIndexMetric2 = _interopRequireDefault(_HappinessIndexMetric);

var _ProjectCodeOwnership = require('./ProjectCodeOwnership');

var _ProjectCodeOwnership2 = _interopRequireDefault(_ProjectCodeOwnership);

var _RemedialFocus = require('./RemedialFocus');

var _RemedialFocus2 = _interopRequireDefault(_RemedialFocus);

var _ScrumPracticesMetric = require('./ScrumPracticesMetric');

var _ScrumPracticesMetric2 = _interopRequireDefault(_ScrumPracticesMetric);

var _SprintBurndownBar = require('./SprintBurndownBar');

var _SprintBurndownBar2 = _interopRequireDefault(_SprintBurndownBar);

var _SprintBurndownLine = require('./SprintBurndownLine');

var _SprintBurndownLine2 = _interopRequireDefault(_SprintBurndownLine);

var _SprintInterference = require('./SprintInterference');

var _SprintInterference2 = _interopRequireDefault(_SprintInterference);

var _TeamCodeOwnership = require('./TeamCodeOwnership');

var _TeamCodeOwnership2 = _interopRequireDefault(_TeamCodeOwnership);

var _TeamSatisfactionMetric = require('./TeamSatisfactionMetric');

var _TeamSatisfactionMetric2 = _interopRequireDefault(_TeamSatisfactionMetric);

var _VelocityBar = require('./VelocityBar');

var _VelocityBar2 = _interopRequireDefault(_VelocityBar);

var _VelocityLine = require('./VelocityLine');

var _VelocityLine2 = _interopRequireDefault(_VelocityLine);

var _XpPracticesMetric = require('./XpPracticesMetric');

var _XpPracticesMetric2 = _interopRequireDefault(_XpPracticesMetric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DefectsOverTimeMetric = _DefectsOverTime2.default;
exports.EnhancedReleaseBurndownMetric = _EnhancedReleaseBurndown2.default;
exports.HappinessIndexMetric = _HappinessIndexMetric2.default;
exports.ProjectCodeOwnershipMetric = _ProjectCodeOwnership2.default;
exports.RemedialFocusMetric = _RemedialFocus2.default;
exports.ScrumPracticesMetric = _ScrumPracticesMetric2.default;
exports.SprintBurndownBarMetric = _SprintBurndownBar2.default;
exports.SprintBurndownLineMetric = _SprintBurndownLine2.default;
exports.SprintInterferenceMetric = _SprintInterference2.default;
exports.TeamCodeOwnershipMetric = _TeamCodeOwnership2.default;
exports.TeamSatisfactionMetric = _TeamSatisfactionMetric2.default;
exports.VelocityBarMetric = _VelocityBar2.default;
exports.VelocityLineMetric = _VelocityLine2.default;
exports.XpPracticesMetric = _XpPracticesMetric2.default;

});

require.register("js/lib/chart_options.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var chartOptions = function chartOptions(opts) {
  return Object.assign({}, {
    scale: {
      ticks: {
        suggestedMin: 0,
        beginAtZero: true
      }
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,
          beginAtZero: true
        }
      }]
    }
  }, opts);
};

exports.default = chartOptions;

});

require.register("js/lib/data_transformer.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rgb = require("./rgb");

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultColours = [new _rgb2.default(92, 153, 237), // blue
new _rgb2.default(219, 70, 70), // red
new _rgb2.default(244, 214, 33), // yellow
new _rgb2.default(203, 120, 230), // purple
new _rgb2.default(80, 186, 104)];

var opacity = 1;

/**
 * Generate chart data.
 *
 * This method creates a full set of chart data from the data and (optional)
 * colours passed to the constructor. This is ready for use within a Chart.js
 * chart.
 *
 * @returns {} A full set of chart data ready for use within a Chart.js chart.
 */
var chartData = function chartData(chartType, performanceData) {
  var colours = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultColours;
  var sortLabels = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var makeDataset = function makeDataset(data, i) {
    var type = data.type || chartType,
        borderDash = data.borderDash || [],
        colour = data.borderColor || colours[i],
        basicData = {
      label: data.label,
      backgroundColor: colour.toRGBA(opacity),
      borderColor: colour.toRGBA(1),
      borderWidth: 1,
      borderDash: borderDash,
      pointBackgroundColor: colour.toRGBA(1),
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverStrokeColor: colour.toRGBA(1),
      data: data.values,
      type: data.type
    };

    switch (type) {
      case "line":
        var extraData = {
          fill: false,
          backgroundColor: new _rgb2.default(255, 255, 255).toRGBA(0),
          pointRadius: 0,
          lineTension: 0.1,
          borderWidth: 2
        };
        return Object.assign(basicData, extraData);
      case "radar":
        return Object.assign(basicData, {
          borderWidth: 2,
          backgroundColor: colour.toRGBA(0.3)
        });
      case "pie":
        return Object.assign(basicData, {
          backgroundColor: colours.map(function (colour) {
            return colour.toRGBA(0.5);
          }),
          borderColor: []
        });
      case "bar":
      default:
        return basicData;
    }
  };
  return {
    labels: labels(performanceData, sortLabels),
    datasets: createValues(performanceData, sortLabels).map(makeDataset)
  };
};

/**
 * Generate a list of labels to use within a chart.
 *
 * @returns {} A list of labels for use within a chart.
 */
var labels = function labels(performanceData) {
  var sortLabels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var labels = performanceData.reduce(function (acc, _ref) {
    var data = _ref.data;

    var newLabels = Object.keys(data).filter(function (label) {
      return acc.indexOf(label) == -1;
    });
    return acc.concat(newLabels);
  }, []);
  if (sortLabels) {
    labels.sort();
  }
  return labels;
};

/**
 * Generate a set of bare values for use in chart data.
 *
 * Bare values data are a properly formatted set of data ready to be finalised
 * using the chartData function.
 *
 * Chart data requires a label value and a values value, the former being a
 * string and the latter a list of numbers. This method generates this from
 * the instance's data value.
 *
 * @returns {} A set of team values data.
 */
var createValues = function createValues(performanceData, sortLabels) {
  var createOneValue = function createOneValue(dataset, _, performanceData) {
    return Object.assign({}, {
      label: dataset.description,
      values: labels(performanceData, sortLabels).map(function (dataLabel) {
        return dataset.data[dataLabel];
      }),
      type: dataset.chartType
    }, dataset);
  };
  return performanceData.map(createOneValue);
};

exports.default = chartData;

});

require.register("js/lib/rgb.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RGB = function () {
  function RGB(red, green, blue) {
    _classCallCheck(this, RGB);

    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  _createClass(RGB, [{
    key: "toRGBA",
    value: function toRGBA(opacity) {
      return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + (opacity || 1) + ")";
    }
  }]);

  return RGB;
}();

exports.default = RGB;

});

require.register("js/mocked_data/code_ownership.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var projectCodeOwnership = {
  chart: [{
    description: "Project Code Ownership",
    data: {
      "1 team": 20,
      "2 teams": 18,
      "3+ teams": 9
    }
  }],
  description: {
    leadText: "Project Code Ownership measures the per-module contribution to the codebase by different Scrum teams within the project.",
    bodyText: "The chart illustrates the proportion of the codebase with commits solely from one team, from two teams, or from three or more teams."
  }
};

var teamCodeOwnership = {
  chart: [{
    description: "Team α Code Ownership",
    data: {
      "1 team member": 5,
      "2 team members": 7,
      "3+ team members": 2,
      "no Contribution": 25
    }
  }],
  description: {
    leadText: "Team Code Ownership measures the per-module contribution to the codebase by members of one Scrum team.",
    bodyText: "The chart illustrates the proportion of the codebase with commits from this team, and the number of different team members who have made commits to a particular module."
  }
};

exports.projectCodeOwnership = projectCodeOwnership;
exports.teamCodeOwnership = teamCodeOwnership;

});

require.register("js/mocked_data/commitment.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var commitmentLevelData = {
    "Sprint 1": 0.90,
    "Sprint 2": 0.80,
    "Sprint 3": 1.00,
    "Sprint 4": 1.00
};

var commitmentLevel = [{
    description: "Commitment Level",
    data: commitmentLevelData
}];

exports.commitmentLevel = commitmentLevel;

});

require.register("js/mocked_data/customer_satisfaction.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var customerSatisfactionData = {
    "Week 1": 4.2,
    "Week 2": 5.9,
    "Week 3": 5.2,
    "Week 4": 3.1,
    "Week 5": 4.6,
    "Week 6": 5.7,
    "Week 7": 6.2,
    "Week 8": 5.1
};

var customerSatisfaction = [{
    description: "Customer Satisfaction",
    data: customerSatisfactionData
}];

exports.customerSatisfaction = customerSatisfaction;

});

require.register("js/mocked_data/defects_over_time.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defectsPerDay = [[2, 0], [2, 1], [3, 1], [3, 0], [5, 2], [4, 0], [5, 1], [2, 0], [6, 2], [3, 1], [2, 1], [1, 2], [1, 1], [0, 1], [0, 0], [0, 2], [4, 2], [2, 2], [1, 2], [0, 1], [0, 0], [1, 2], [0, 0], [6, 2], [7, 1], [8, 3], [6, 4], [3, 5], [2, 6], [1, 5], [1, 6], [0, 5], [0, 2], [0, 2]],
    cumulativeDefects = defectsPerDay.reduce(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      discovered = _ref2[0],
      resolved = _ref2[1];

  var cumulativeDiscovered = void 0,
      cumulativeResolved = void 0;
  if (acc.length == 0) {
    cumulativeDiscovered = 0;
    cumulativeResolved = 0;
  } else {
    var _acc = _slicedToArray(acc[acc.length - 1], 2);

    cumulativeDiscovered = _acc[0];
    cumulativeResolved = _acc[1];
  }
  return acc.concat([[cumulativeDiscovered + discovered, cumulativeResolved + resolved]]);
}, []),
    dates = [].concat(_toConsumableArray(Array(cumulativeDefects.length - 1).keys())).reduce(function (dateList) {
  var previousDate = dateList[dateList.length - 1],
      nextWeekDay = function nextWeekDay(date) {
    var delta = 1,
        newDate = new Date(date.getTime());
    if (date.getDay() == 5) {
      delta = 3;
    } else if (date.getDay() == 6) {
      delta = 2;
    }
    newDate.setDate(newDate.getDate() + delta);
    return newDate;
  },
      nextList = dateList.concat([nextWeekDay(previousDate)]);
  return nextList;
}, [new Date(2017, 2, 1)]),
    discoveredDefects = {
  description: "Defects Discovered",
  data: dates.reduce(function (acc, date, idx) {
    acc[date.toDateString()] = cumulativeDefects[idx][0];
    return acc;
  }, {})
},
    resolvedDefects = {
  description: "Defects Resolved",
  data: dates.reduce(function (acc, date, idx) {
    acc[date.toDateString()] = cumulativeDefects[idx][1];
    return acc;
  }, {})
},
    combinedDefects = [discoveredDefects, resolvedDefects];

var defectsOverTime = {
  chart: combinedDefects,
  description: {
    leadText: "Defects over time visualises the number of discovered and resolved defects.",
    bodyText: "The lines in this chart represent the <i>total number of defects found</i> and the <i>total number of resolved defects</i> against time."
  }
};

exports.defectsOverTime = defectsOverTime;

});

require.register("js/mocked_data/happiness_index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var happinessIndex = {
  chart: [{
    description: "Happiness",
    data: {
      "Week 1": 3.2,
      "Week 2": 3.9,
      "Week 3": 4.2,
      "Week 4": 2.1,
      "Week 5": 3.6,
      "Week 6": 3.7
    }
  }],
  description: {
    leadText: "Happiness index displays a team’s or teams’ happiness over time.",
    bodyText: ""
  }
};

exports.happinessIndex = happinessIndex;

});

require.register("js/mocked_data/lead_time.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var leadTimeData = {
    "Jul 01": 13,
    "Jul 11": 15,
    "Jul 21": 16,
    "Aug 01": 13,
    "Aug 11": 11,
    "Aug 21": 10,
    "Sep 01": 9,
    "Sep 11": 11,
    "Sep 21": 8
},
    calcAverageLeadTime = function calcAverageLeadTime(dataPoints) {
    var accVals = Object.values(dataPoints).reduce(function (acc, value) {
        return acc + value;
    });
    var avgVal = accVals / Object.keys(dataPoints).length;
    var avgLeadTime = Object.keys(dataPoints).reduce(function (avgLine, key) {
        avgLine[key] = avgVal;
        return avgLine;
    }, {});
    return avgLeadTime;
};

var averageLeadTime = [{
    description: "Rolling Average",
    data: leadTimeData
}, {
    description: "Average",
    data: calcAverageLeadTime(leadTimeData)
}];

exports.averageLeadTime = averageLeadTime;

});

require.register("js/mocked_data/menu_items.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterMenuItems = exports.menuItems = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _metrics = require('../components/metrics/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
   Opinion on the best ten metrics:-

   Enhanced release burndown (it's pretty new, interesting)
   Velocity (traditional, but needed; maybe rework as line chart with clearer variances?)
   Sprint Burndown (traditional, but needed, though should be line chart)
   Code Ownership - both in same vis (it's pretty new too, and interesting)
   Scrum / XP Practices - both in same vis (it's pretty interesting tho maybe difficult)
   Sprint Interference
   Remedial Focus
   Team Satisfaction (useful, different perspective, important as it's about people)
   Happiness index (not too sure how different from the above?)
   Defects over time (least favourite of the 10, but probably useful)

   ---

   Agreed upon metrics:

   Code Ownership - A - CM
   Practices (both) - M - Retro
   Defects over time - A - Jira
   Remedial Focus - A - Jira (?)
   Enh. Rel. Burndown - M/A - Jira (?)
   Sprint Burndown - A - Jira
   Happiness index - M - Weekly
   Satisfaction - M - Retro
   Velocity A/B - A - Jira
   Sprint Interference - M - Retro

 */
var menuItems = {
  filterTerm: "",
  items: [{
    heading: "Agility",
    metrics: [{
      type: _metrics.ProjectCodeOwnershipMetric,
      name: "Code Ownership (Project)"
    }, {
      type: _metrics.TeamCodeOwnershipMetric,
      name: "Code Ownership (Team)"
    }, {
      type: _metrics.ScrumPracticesMetric,
      name: "Scrum Practices"
    }, {
      type: _metrics.SprintInterferenceMetric,
      name: "Sprint Interference"
    }, {
      type: _metrics.XpPracticesMetric,
      name: "XP Practices"
    }]
  }, {
    heading: "Quality Assurance",
    metrics: [{
      type: _metrics.DefectsOverTimeMetric,
      name: "Defects Over Time"
    }, {
      type: _metrics.RemedialFocusMetric,
      name: "Remedial Focus"
    }]
  }, {
    heading: "Performance",
    metrics: [{
      type: _metrics.EnhancedReleaseBurndownMetric,
      name: "Enhanced Release Burndown"
    }, {
      type: _metrics.SprintBurndownBarMetric,
      name: "Sprint Burndown A"
    }, {
      type: _metrics.SprintBurndownLineMetric,
      name: "Sprint Burndown B"
    }, {
      type: _metrics.VelocityBarMetric,
      name: "Velocity A"
    }, {
      type: _metrics.VelocityLineMetric,
      name: "Velocity B"
    }]
  }, {
    heading: "Team Profile",
    metrics: [{
      type: _metrics.HappinessIndexMetric,
      name: "Happiness Index"
    }, {
      type: _metrics.TeamSatisfactionMetric,
      name: "Satisfaction"
    }]
  }]
};

var filterMenuItems = function filterMenuItems(term) {
  return { filterTerm: term,
    items: menuItems.items.map(function (_ref) {
      var heading = _ref.heading,
          metrics = _ref.metrics;
      return { heading: heading,
        metrics: metrics.filter(function (_ref2) {
          var name = _ref2.name;
          return name.toLowerCase().includes(term.toLowerCase());
        })
      };
    }).filter(function (_ref3) {
      var metrics = _ref3.metrics;
      return metrics.length > 0;
    })
  };
};

exports.menuItems = menuItems;
exports.filterMenuItems = filterMenuItems;

});

require.register("js/mocked_data/practices.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADOPTION = 1,
    ADAPTATION = 2,
    ACCEPTANCE = 3,
    ROUTINISATION = 4;

var scrumPractices = {
  chart: [{
    description: "Team α",
    data: {
      "Burndown chart": ROUTINISATION,
      "Daily scrum": ROUTINISATION,
      "Definition of \"Done\"": ADOPTION,
      "Planning Poker": ACCEPTANCE,
      "Scrum of Scrums": ADAPTATION,
      "Sprint review": ACCEPTANCE,
      "Sprint retrospective": ACCEPTANCE,
      "Product Owner": ADOPTION
    }
  }],
  description: {
    leadText: "The practices metric visualizes the rate of agile practice assimilation in the team. The data is inserted by the team itself",
    bodyText: "<div>The chart operates with 4 stages of agile assimilation for each practice in use:<ul><li><em>Adoption</em>, the decision to adopt a practice has been made;</li><li><em>Adaptation</em>, the practice is being put to use, and team members are trained to use the practice;</li><li><em>Acceptance</em>, the team members are commited to using the innovation;</li><li><em>Routinisation</em>, usage of the practice is now encouraged as a normal activity, and is no longer defined as something out of the ordinary.</li></ul></div>"
  }
};
//  { description: "Team β",
//    data: {
//      "Daily scrum": ACCEPTANCE,
//      "Definition of \"Done\"": ACCEPTANCE
//    }
//  }

var xpPractices = {
  chart: [{
    description: "Team α",
    data: {
      "Pair Programming": ROUTINISATION,
      "Refactoring": ACCEPTANCE,
      "Simple Design": ADOPTION,
      "Small Releases": ACCEPTANCE,
      "Collective Ownership": ADAPTATION,
      "Continuous Integration": ADOPTION,
      "40-hour Week": ACCEPTANCE,
      "Test-driven Development": ADAPTATION,
      "User Stories": ACCEPTANCE
    }
  }],
  description: {
    leadText: "The practices metric visualizes the rate of agile practice assimilation in the team. The data is inserted by the team itself",
    bodyText: "<div>The chart operates with 4 stages of agile assimilation for each practice in use:<ul><li><em>Adoption</em>, the decision to adopt a practice has been made;</li><li><em>Adaptation</em>, the practice is being put to use, and team members are trained to use the practice;</li><li><em>Acceptance</em>, the team members are commited to using the innovation;</li><li><em>Routinisation</em>, usage of the practice is now encouraged as a normal activity, and is no longer defined as something out of the ordinary.</li></ul></div>"
  }
};

exports.scrumPractices = scrumPractices;
exports.xpPractices = xpPractices;

});

require.register("js/mocked_data/release_burndown.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.releaseBurndown = undefined;

var _rgb = require("../lib/rgb");

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var burndownData = {
  "Start": { remaining: 220, added: 0 },
  "Sprint 1": { remaining: 200, added: 0 },
  "Sprint 2": { remaining: 170, added: 10 },
  "Sprint 3": { remaining: 130, added: 20 },
  "Sprint 4": { remaining: 80, added: 35 }
},
    storyPoints = Object.keys(burndownData).reduce(function (acc, k) {
  acc[k] = burndownData[k].remaining;
  return acc;
}, {}),
    addedPoints = Object.keys(burndownData).reduce(function (acc, k) {
  acc[k] = burndownData[k].added * -1;
  return acc;
}, {}),
    releaseTrendDelta = function () {
  var pointNames = Object.keys(burndownData),
      delta = (burndownData[pointNames[0]].remaining - burndownData[pointNames[pointNames.length - 1]].remaining) / (pointNames.length - 1);
  return delta;
}(),
    addedTrendDelta = function () {
  var pointNames = Object.keys(burndownData),
      delta = -1 * (burndownData[pointNames[0]].added - burndownData[pointNames[pointNames.length - 1]].added) / (pointNames.length - 1);
  return delta;
}(),
    makeReleaseTrend = function makeReleaseTrend() {
  // If added trend delta is lower than release trend delta, then the lines
  // don't converge and so we should not do a full projection. If they do
  // converge, then draw to the convergence point.
  var startPoint = burndownData["Start"].remaining,
      reducer = function reducer(acc, idx) {
    var key = idx == 0 ? "Start" : "Sprint " + idx,
        value = startPoint - idx * releaseTrendDelta;
    acc[key] = value;
    return acc;
  },
      numPoints = 0,
      burndownDataLength = Object.keys(burndownData).length;
  if (addedTrendDelta > releaseTrendDelta) {
    numPoints = burndownDataLength + 3;
  } else {
    numPoints = Math.max(Math.ceil(startPoint / (releaseTrendDelta - addedTrendDelta)) + 1, burndownDataLength + 3);
  }
  return [].concat(_toConsumableArray(Array(numPoints).keys())).reduce(reducer, {});
},
    makeAddedTrend = function makeAddedTrend() {
  var startPoint = -1,
      reducer = function reducer(acc, idx) {
    var key = idx == 0 ? "Start" : "Sprint " + idx,
        value = startPoint - idx * addedTrendDelta;
    acc[key] = value;
    return acc;
  },
      numPoints = 0,
      burndownDataLength = Object.keys(burndownData).length;
  if (addedTrendDelta > releaseTrendDelta) {
    numPoints = burndownDataLength + 3;
  } else {
    numPoints = Math.max(Math.ceil(burndownData["Start"].remaining / (releaseTrendDelta - addedTrendDelta)) + 1, burndownDataLength + 3);
  }
  return [].concat(_toConsumableArray(Array(numPoints).keys())).reduce(reducer, {});
};

var releaseBurndown = {
  chart: [{
    description: "Story Points",
    data: storyPoints,
    chartType: "bar"
  }, {
    description: "Added Stories",
    data: addedPoints,
    chartType: "bar"
  }, {
    description: "Estimated Release Trend",
    data: makeReleaseTrend(),
    chartType: "line",
    borderDash: [10, 5],
    borderColor: new _rgb2.default(150, 150, 200)
  }, {
    description: "Adjusted Release Trend",
    data: makeAddedTrend(),
    chartType: "line",
    borderDash: [10, 5],
    borderColor: new _rgb2.default(200, 150, 150)
  }],
  description: {
    leadText: "Enhanced Release Burndown measures the release burndown rate for a given Scrum team, with an adjustment made for additional requirements added to the release after initial planning.",
    bodyText: "The purpose of this chart is to illustrate the impact of additional requirements on the delivery of a planned release. Additional requirements will push back the release date.\n\nRelease is estimated to take place where the Estimated Release Trend line meets the x-axis. With additional requirements added, the likely release date will be pushed back to where the Adjusted Release Trend line meets the Estimated Release Trend line."
  }
};

exports.releaseBurndown = releaseBurndown;

});

require.register("js/mocked_data/sprint_burndown.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var burndownData = {
  "Start": 420,
  "Week 1, Day 1": 410,
  "Week 1, Day 2": 400,
  "Week 1, Day 3": 360,
  "Week 1, Day 4": 320,
  "Week 1, Day 5": 310,
  "Week 2, Day 1": 290,
  "Week 2, Day 2": 285,
  "Week 2, Day 3": 260,
  "Week 2, Day 4": 250,
  "Week 2, Day 5": 230,
  "Week 3, Day 1": 220,
  "Week 3, Day 2": 215,
  "Week 3, Day 3": 210,
  "Week 3, Day 4": 210,
  "Week 3, Day 5": 200,
  "Week 4, Day 1": null,
  "Week 4, Day 2": null,
  "Week 4, Day 3": null,
  "Week 4, Day 4": null,
  "Week 4, Day 5": null
},
    makeBurndownTrend = function makeBurndownTrend(startVal, dataPoints) {
  var delta = startVal / (Object.keys(dataPoints).length - 1);
  var trend = Object.keys(dataPoints).reduce(function (trendLine, label, i) {
    trendLine[label] = startVal - i * delta;
    return trendLine;
  }, {});
  return trend;
};

var sprintBurndown = {
  chart: [{
    description: "Ideal Burndown",
    data: makeBurndownTrend(420, burndownData),
    chartType: "line",
    borderDash: [10, 5]
  }, {
    description: "Remaining Effort",
    data: burndownData
  }],
  description: {
    leadText: "Sprint Burndown illustrates task/story completion over the course of a Sprint.",
    bodyText: "The Remaining Effort trendline/bars shows how many points are remaining at a given point in time during the sprint. This chart illustrates an incomplete Sprint, with Week 4 remaining incomplete."
  }
};

exports.sprintBurndown = sprintBurndown;

});

require.register("js/mocked_data/sprint_cadence.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sprintCadenceData = {
  "Sprint 1": 11,
  "Sprint 2": 13,
  "Sprint 3": 9,
  "Sprint 4": 15
};

var sprintCadence = [{
  description: "Story Points per Day",
  data: sprintCadenceData
}];

exports.sprintCadence = sprintCadence;
/**
 
const sprintCadence =[
  {
    description: "Team α",
    data: {
      "Sprint 1": {
        "Planning": new Date(2017, 0, 1),
        "Start": new Date(2017, 0, 3),
        "End": new Date(2017, 0, 23),
        "Review": new Date(2017, 0, 27),
        "Retrospective": new Date(2017, 0, 28)
      },
      "Sprint 2": {
        "Planning": new Date(2017, 0, 30),
        "Start": new Date(2017, 1, 1),
        "End": new Date(2017, 1, 21),
        "Review": new Date(2017, 1, 26),
        "Retrospective": new Date(2017, 1, 28)
      }
    }
  },
  {
    description: "Team β",
    data: {
      "Sprint 1": {
        "Planning": new Date(2017, 0, 13),
        "Start": new Date(2017, 0, 14),
        "End": new Date(2017, 0, 28),
        "Review": new Date(2017, 1, 3),
        "Retrospective": new Date(2017, 1, 8)
      },
      "Sprint 2": {
        "Planning": new Date(2017, 1, 7),
        "Start": new Date(2017, 1, 9),
        "End": new Date(2017, 1, 14),
        "Review": new Date(2017, 1, 14),
        "Retrospective": new Date(2017, 1, 14)
      }
    }
  }
];

export { sprintCadence };

 */

});

;require.register("js/mocked_data/sprint_interference.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sprintInterference = {
  chart: [{
    description: "Sprint Interference",
    data: {
      "Sprint 1": 3.5,
      "Sprint 2": 5.5,
      "Sprint 3": 5.0,
      "Sprint 4": 3
    }
  }],
  description: {
    leadText: "Sprint Interference is measuring the degree of interference experienced by the team",
    bodyText: "The chart displays the Person-Days spent on Non-Sprint Backlog tasks for every Sprint"
  }
};

exports.sprintInterference = sprintInterference;

});

require.register("js/mocked_data/team_satisfaction.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var teamSatisfaction = {
  chart: [{
    description: "Resources",
    data: {
      "Sprint 1": 1,
      "Sprint 2": 2,
      "Sprint 3": 4,
      "Sprint 4": 2
    }
  }, {
    description: "Communication",
    data: {
      "Sprint 1": 4,
      "Sprint 2": 3,
      "Sprint 3": 4,
      "Sprint 4": 5
    }
  }, {
    description: "Requirements",
    data: {
      "Sprint 1": 3,
      "Sprint 2": 4,
      "Sprint 3": 4,
      "Sprint 4": 4
    }
  }, {
    description: "Management",
    data: {
      "Sprint 1": 2,
      "Sprint 2": 2,
      "Sprint 3": 2,
      "Sprint 4": 3
    }
  }, {
    description: "Technical",
    data: {
      "Sprint 1": 5,
      "Sprint 2": 2,
      "Sprint 3": 3,
      "Sprint 4": 3
    }
  }],
  description: {
    leadText: "Team Satisfaction displays a team’s or teams’ satisfaction on five aspects of the development process for each sprint.",
    bodyText: "The five measured aspects are <i>resources</i>, <i>communication</i>, <i>requirements</i>, <i>management</i> and <i>technical</i>."
  }
};

exports.teamSatisfaction = teamSatisfaction;

});

require.register("js/mocked_data/team_skills.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var teamSkills = [{
    description: "Team α",
    data: {
        "Architecture": 2,
        "Object-oriented Design": 5,
        "Requirements/PO": 3,
        "Testing": 7,
        "Business": 3,
        "Implementation": 4
    }
}];

exports.teamSkills = teamSkills;

});

require.register("js/mocked_data/test.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var linesOfCode = [{ description: "Source code",
  data: {
    "Sprint 1": 11000,
    "Sprint 2": 19000,
    "Sprint 3": 28000,
    "Sprint 4": 31000
  }
}, { description: "Test code",
  data: {
    "Sprint 1": 9000,
    "Sprint 2": 11000,
    "Sprint 3": 13000,
    "Sprint 4": 16000
  }
}];

var codeCoverage = [{ description: "Tested functionality",
  data: {
    "Sprint 1": 0.6,
    "Sprint 2": 0.25,
    "Sprint 3": 0.5,
    "Sprint 4": 0.4
  }
}];

exports.linesOfCode = linesOfCode;
exports.codeCoverage = codeCoverage;

});

require.register("js/mocked_data/test_cases.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var numberOfTestCases = [{
  description: "Number of Test Cases",
  data: {
    "Sprint 1": 30,
    "Sprint 2": 50,
    "Sprint 3": 85,
    "Sprint 4": 113
  }
}];

exports.numberOfTestCases = numberOfTestCases;

});

require.register("js/mocked_data/velocity.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storyPointData = {
  "Task 1": {
    estimated: 2,
    time: 3
  },
  "Task 2": {
    estimated: 1,
    time: 0.5
  },
  "Task 3": {
    estimated: 1,
    time: 1
  },
  "Task 4": {
    estimated: 3,
    time: 2
  },
  "Task 5": {
    estimated: 5,
    time: 7
  },
  "Task 6": {
    estimated: 2,
    time: 2
  },
  "Task 7": {
    estimated: 3,
    time: 3
  },
  "Task 8": {
    estimated: 2,
    time: 5
  },
  "Task 9": {
    estimated: 1,
    time: 2
  }
},
    calcStoryPointEffort = function calcStoryPointEffort(dataPoints) {
  //create array of values for each unique story point
  var storyPointVals = Object.values(storyPointData).reduce(function (acc, val) {
    if (val.estimated in acc) {
      acc[val.estimated] += val.time;
    } else {
      acc[val.estimated] = val.time;
    }
    return acc;
  }, {});

  //create array of storypoint lengths
  var storyPointLenghts = Object.values(storyPointData).reduce(function (acc, val) {
    if (val.estimated in acc) {
      acc[val.estimated]++;
    } else {
      acc[val.estimated] = 1;
    }
    return acc;
  }, {});

  //get average amount of time spent for each unique story point
  var storyPointEffort = Object.keys(storyPointVals).reduce(function (acc, key) {
    acc[key] = storyPointVals[key] / storyPointLenghts[key];
    return acc;
  }, {});

  return storyPointEffort;
};

//Data containing an object with 'story point': 'avg completion time'
var storyPointEffort = [{
  description: "Story Point Effort",
  data: calcStoryPointEffort()
}];

var VelocityData = function () {
  function VelocityData(userStoryPoints, bugFixPoints) {
    _classCallCheck(this, VelocityData);

    this.userStoryPoints = userStoryPoints;
    this.bugFixPoints = bugFixPoints || 0;
  }

  _createClass(VelocityData, [{
    key: "total",
    get: function get() {
      return this.userStoryPoints + this.bugFixPoints;
    }
  }]);

  return VelocityData;
}();

var detailedVelocity = [{
  description: "Commitment",
  data: {
    "Sprint 1": new VelocityData(350),
    "Sprint 2": new VelocityData(250, 30),
    "Sprint 3": new VelocityData(280, 50),
    "Sprint 4": new VelocityData(370, 10)
  }
}, {
  description: "Work Completed",
  data: {
    "Sprint 1": new VelocityData(250),
    "Sprint 2": new VelocityData(250, 30),
    "Sprint 3": new VelocityData(230, 50),
    "Sprint 4": new VelocityData(340, 10)
  }
}];

var velocity = detailedVelocity.map(function (_ref) {
  var description = _ref.description,
      data = _ref.data;

  return Object.keys(data).reduce(function (acc, k) {
    acc.data[k] = data[k].total;
    return acc;
  }, {
    data: {},
    description: description
  });
});

var remedialChartData = function remedialChartData() {
  var commitment = detailedVelocity.find(function (entry) {
    return entry.description == "Commitment";
  });
  return [{ description: "Bug Fixing",
    stack: "remedialFocus",
    data: Object.keys(commitment.data).reduce(function (acc, k) {
      acc[k] = commitment.data[k].bugFixPoints;
      return acc;
    }, {})
  }, { description: "User Stories",
    stack: "remedialFocus",
    data: Object.keys(commitment.data).reduce(function (acc, k) {
      acc[k] = commitment.data[k].userStoryPoints;
      return acc;
    }, {})
  }];
};

var remedialFocus = {
  chart: remedialChartData(),
  description: {
    leadText: "Remedial focus provides insight into the amount of time spent on remedial tasks during a sprint",
    bodyText: "The chart displays how many story points were allocated on user stories and bug fixing during each sprint"
  }
};

var velocityBar = {
  chart: velocity,
  description: {
    leadText: "Sprint velocity indicates the relation between upfront commitment and actual work done, represented in story points.",
    bodyText: "The bars or lines in these graphs show the number of story points associated with the tasks a team, or teams, <i>intended to complete</i> during a given sprint and the number of points that represents the tasks that were <i>actually completed</i>."
  }
};

var velocityLine = {
  chart: velocity,
  description: {
    leadText: "Sprint velocity indicates the relation between upfront commitment and actual work done, represented in story points.",
    bodyText: "The bars or lines in these graphs show the number of story points associated with the tasks a team, or teams, <i>intended to complete</i> during a given sprint and the number of points that represents the tasks that were <i>actually completed</i>."
  }
};

exports.storyPointEffort = storyPointEffort;
exports.detailedVelocity = detailedVelocity;
exports.velocity = velocity;
exports.remedialFocus = remedialFocus;
exports.velocityBar = velocityBar;
exports.velocityLine = velocityLine;

});

require.register("js/reducers/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _metrics_reducer = require('./metrics_reducer');

var _metrics_reducer2 = _interopRequireDefault(_metrics_reducer);

var _menu_reducer = require('./menu_reducer');

var _menu_reducer2 = _interopRequireDefault(_menu_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  metrics: _metrics_reducer2.default,
  menuItems: _menu_reducer2.default
});

exports.default = allReducers;

});

require.register("js/reducers/menu_reducer.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menu_items = require("js/mocked_data/menu_items");

var initialState = _menu_items.menuItems;

var menuReducer = function menuReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case "FILTER_METRICS":
      return (0, _menu_items.filterMenuItems)(action.term);
    default:
      return state;
  }
};

exports.default = menuReducer;

});

require.register("js/reducers/metrics_reducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _practices = require('js/mocked_data/practices');

var _test = require('js/mocked_data/test');

var _velocity = require('js/mocked_data/velocity');

var _team_satisfaction = require('js/mocked_data/team_satisfaction');

var _sprint_burndown = require('js/mocked_data/sprint_burndown');

var _release_burndown = require('js/mocked_data/release_burndown');

var _happiness_index = require('js/mocked_data/happiness_index');

var _lead_time = require('js/mocked_data/lead_time');

var _commitment = require('js/mocked_data/commitment');

var _customer_satisfaction = require('js/mocked_data/customer_satisfaction');

var _sprint_cadence = require('js/mocked_data/sprint_cadence');

var _code_ownership = require('js/mocked_data/code_ownership');

var _test_cases = require('js/mocked_data/test_cases');

var _sprint_interference = require('js/mocked_data/sprint_interference');

var _defects_over_time = require('js/mocked_data/defects_over_time');

var initialState = {
  currentMetric: null,
  // Probably temporary
  scrumPractices: _practices.scrumPractices,
  xpPractices: _practices.xpPractices,
  linesOfCode: _test.linesOfCode,
  codeCoverage: _test.codeCoverage,
  velocity: _velocity.velocity,
  detailedVelocity: _velocity.detailedVelocity,
  remedialFocus: _velocity.remedialFocus,
  velocityBar: _velocity.velocityBar,
  velocityLine: _velocity.velocityLine,
  teamSatisfaction: _team_satisfaction.teamSatisfaction,
  sprintBurndown: _sprint_burndown.sprintBurndown,
  releaseBurndown: _release_burndown.releaseBurndown,
  happinessIndex: _happiness_index.happinessIndex,
  averageLeadTime: _lead_time.averageLeadTime,
  storyPointEffort: _velocity.storyPointEffort,
  commitmentLevel: _commitment.commitmentLevel,
  customerSatisfaction: _customer_satisfaction.customerSatisfaction,
  sprintCadence: _sprint_cadence.sprintCadence,
  numberOfTestCases: _test_cases.numberOfTestCases,
  codeOwnership: {
    project: _code_ownership.projectCodeOwnership,
    team: _code_ownership.teamCodeOwnership
  },
  sprintInterference: _sprint_interference.sprintInterference,
  defectsOverTime: _defects_over_time.defectsOverTime
};

var metricsReducer = function metricsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case "SELECT_METRIC":
      return Object.assign({}, state, {
        currentMetric: action.metric
      });
    default:
      return state;
  }
};

exports.default = metricsReducer;

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map