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

var selectTeamDashboard = function selectTeamDashboard(teamName, dashboard) {
  return {
    type: "SELECT_TEAM_DASHBOARD",
    teamName: teamName,
    dashboard: dashboard
  };
};

var filterMetrics = function filterMetrics(term) {
  return {
    type: "FILTER_METRICS",
    term: term
  };
};

var selectTeam = function selectTeam(teamName) {
  return {
    type: "SELECT_TEAM",
    teamName: teamName
  };
};

var burnupBreakdownByTeams = function burnupBreakdownByTeams() {
  return {
    type: "BURNUP_BREAKDOWN_BY_TEAMS"
  };
};

var togglePracticesByPractice = function togglePracticesByPractice() {
  return {
    type: "PRACTICES_BY_PRACTICE"
  };
};

var selectSprint = function selectSprint(sprintNumber) {
  return {
    type: "SELECT_SPRINT",
    sprint: sprintNumber
  };
};

exports.selectView = selectView;
exports.selectMetric = selectMetric;
exports.selectTeamDashboard = selectTeamDashboard;
exports.filterMetrics = filterMetrics;
exports.selectTeam = selectTeam;
exports.burnupBreakdownByTeams = burnupBreakdownByTeams;
exports.togglePracticesByPractice = togglePracticesByPractice;
exports.selectSprint = selectSprint;

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
        { className: 'row columns' },
        _react2.default.createElement(_MetricContainer2.default, null)
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

require.register("js/components/Breadcrumb.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Breadcrumb = function (_Component) {
  _inherits(Breadcrumb, _Component);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).apply(this, arguments));
  }

  _createClass(Breadcrumb, [{
    key: 'breadcrumbLinks',
    value: function breadcrumbLinks() {
      var _this2 = this;

      var finalLink = function finalLink(label) {
        return _react2.default.createElement(
          'li',
          { key: "breadcrumb-" + label },
          label
        );
      },
          regularLink = function regularLink(view, label) {
        return _react2.default.createElement(
          'li',
          { key: "breadcrumb-" + label },
          _react2.default.createElement(
            'a',
            { href: '#', onClick: function onClick() {
                return _this2.props.selectMetric(view);
              } },
            label
          )
        );
      };
      return this.props.links.map(function (_ref, idx, allLinks) {
        var view = _ref.view,
            label = _ref.label;

        if (idx == allLinks.length - 1) {
          return finalLink(label);
        } else {
          return regularLink(view, label);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        { 'aria-label': 'You are here:', role: 'navigation', className: 'breadcrumb' },
        _react2.default.createElement(
          'ul',
          { className: 'breadcrumbs' },
          this.breadcrumbLinks()
        )
      );
    }
  }]);

  return Breadcrumb;
}(_react.Component);

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectMetric: _actions.selectMetric
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(null, matchDispatchToProps)(Breadcrumb);

});

require.register("js/components/DashboardTitle.jsx", function(exports, require, module) {
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

var DashboardTitle = function (_Component) {
  _inherits(DashboardTitle, _Component);

  function DashboardTitle() {
    _classCallCheck(this, DashboardTitle);

    return _possibleConstructorReturn(this, (DashboardTitle.__proto__ || Object.getPrototypeOf(DashboardTitle)).apply(this, arguments));
  }

  _createClass(DashboardTitle, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          this.props.children
        ),
        _react2.default.createElement('hr', null)
      );
    }
  }]);

  return DashboardTitle;
}(_react.Component);

exports.default = DashboardTitle;

});

require.register("js/components/LandingPanel.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.matchDispatchToProps = matchDispatchToProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('./dashboards');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LandingPanel = function (_Component) {
  _inherits(LandingPanel, _Component);

  function LandingPanel() {
    _classCallCheck(this, LandingPanel);

    return _possibleConstructorReturn(this, (LandingPanel.__proto__ || Object.getPrototypeOf(LandingPanel)).apply(this, arguments));
  }

  _createClass(LandingPanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dashboard = this.props.dashboard,
          statusClass = this.props.status ? "status-" + this.props.status.toLowerCase() : "",
          panelClass = "landing-panel medium-3 columns";
      return _react2.default.createElement(
        'div',
        { className: panelClass },
        _react2.default.createElement(
          'div',
          { className: statusClass + " inner-panel" },
          _react2.default.createElement(
            'h3',
            null,
            this.props.title
          ),
          this.props.children,
          _react2.default.createElement(
            'div',
            { className: 'view-link' },
            _react2.default.createElement(
              'a',
              { href: '#', onClick: function onClick() {
                  return _this2.props.selectMetric(dashboard);
                } },
              'View'
            )
          )
        )
      );
    }
  }]);

  return LandingPanel;
}(_react.Component);

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectMetric: _actions.selectMetric
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(null, matchDispatchToProps)(LandingPanel);

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

require.register("js/components/SprintSelector.jsx", function(exports, require, module) {
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

var SprintSelector = function (_Component) {
  _inherits(SprintSelector, _Component);

  function SprintSelector(props) {
    _classCallCheck(this, SprintSelector);

    var _this = _possibleConstructorReturn(this, (SprintSelector.__proto__ || Object.getPrototypeOf(SprintSelector)).call(this, props));

    _this.handleSelectSprint = _this.handleSelectSprint.bind(_this);
    return _this;
  }

  _createClass(SprintSelector, [{
    key: "handleSelectSprint",
    value: function handleSelectSprint(event) {
      this.props.selectSprint(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "input-group sprint-selector" },
        _react2.default.createElement(
          "div",
          { className: "row" },
          _react2.default.createElement(
            "div",
            { className: "small-6 columns" },
            _react2.default.createElement(
              "label",
              { "for": "middle-label", className: "text-right middle" },
              "Sprint No."
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "small-6 columns" },
            _react2.default.createElement(
              "select",
              { className: "input-group-field", onChange: this.handleSelectSprint, defaultValue: this.props.currentSprint },
              this.props.sprintOptions.map(function (sprintNum) {
                return _react2.default.createElement(
                  "option",
                  { value: sprintNum, key: "sprint-" + sprintNum },
                  sprintNum
                );
              })
            )
          )
        )
      );
    }
  }]);

  return SprintSelector;
}(_react.Component);

function mapStateToProps(state) {
  var teamNames = state.metrics.teams.shortNames;
  return {
    currentSprint: state.metrics.options.focusedSprint,
    sprintOptions: [1, 2, 3, 4, 5]
  };
};

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectSprint: _actions.selectSprint
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(SprintSelector);

});

require.register("js/components/StatusIndicator.jsx", function(exports, require, module) {
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

var StatusIndicator = function (_Component) {
  _inherits(StatusIndicator, _Component);

  function StatusIndicator() {
    _classCallCheck(this, StatusIndicator);

    return _possibleConstructorReturn(this, (StatusIndicator.__proto__ || Object.getPrototypeOf(StatusIndicator)).apply(this, arguments));
  }

  _createClass(StatusIndicator, [{
    key: 'statusClass',
    value: function statusClass() {
      var indicatorState = void 0,
          indicatorTrend = void 0;
      switch (this.props.colour) {
        case "GREEN":
          indicatorState = "status-good";
          break;
        case "YELLOW":
          indicatorState = "status-neutral";
          break;
        case "RED":
          indicatorState = "status-bad";
          break;
      }
      switch (this.props.trend) {
        case "INCREASING":
          indicatorTrend = "status-increasing";
          break;
        case "STEADY":
          indicatorTrend = "status-steady";
          break;
        case "DECREASING":
          indicatorTrend = "status-decreasing";
          break;
        default:
          indicatorTrend = "";
          break;
      }
      return ["status-indicator", indicatorState, indicatorTrend].join(" ");
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: this.statusClass() });
    }
  }]);

  return StatusIndicator;
}(_react.Component);

exports.default = StatusIndicator;

});

require.register("js/components/TeamSelector.jsx", function(exports, require, module) {
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

var TeamSelector = function (_Component) {
  _inherits(TeamSelector, _Component);

  function TeamSelector(props) {
    _classCallCheck(this, TeamSelector);

    var _this = _possibleConstructorReturn(this, (TeamSelector.__proto__ || Object.getPrototypeOf(TeamSelector)).call(this, props));

    _this.handleSelectTeam = _this.handleSelectTeam.bind(_this);
    _this.clearTeam = _this.clearTeam.bind(_this);
    return _this;
  }

  _createClass(TeamSelector, [{
    key: "handleSelectTeam",
    value: function handleSelectTeam(event) {
      this.props.selectTeam(event.target.value);
    }
  }, {
    key: "clearTeam",
    value: function clearTeam(event) {
      this.props.selectTeam(null);
    }
  }, {
    key: "selectBox",
    value: function selectBox() {
      return _react2.default.createElement(
        "select",
        { className: "input-group-field", onChange: this.handleSelectTeam, value: this.props.currentTeam },
        this.props.teamNames.map(function (teamName) {
          return _react2.default.createElement(
            "option",
            { value: teamName, key: teamName },
            "Team " + teamName
          );
        })
      );
    }
  }, {
    key: "renderWithLabelAbove",
    value: function renderWithLabelAbove() {
      return _react2.default.createElement(
        "div",
        { className: "input-group team-selector-top" },
        _react2.default.createElement(
          "label",
          null,
          "Team",
          this.selectBox()
        )
      );
    }
  }, {
    key: "renderWithLabelLeft",
    value: function renderWithLabelLeft() {
      return _react2.default.createElement(
        "div",
        { className: "input-group team-selector-left" },
        _react2.default.createElement(
          "div",
          { className: "row" },
          _react2.default.createElement(
            "div",
            { className: "small-3 columns" },
            _react2.default.createElement(
              "label",
              { className: "text-right middle" },
              "Team"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "small-9 columns" },
            this.selectBox()
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.labelPosition == "left") {
        return this.renderWithLabelLeft();
      } else {
        return this.renderWithLabelAbove();
      }
    }
  }]);

  return TeamSelector;
}(_react.Component);

function mapStateToProps(state) {
  var teamNames = state.metrics.teams.shortNames;
  return {
    currentTeam: state.metrics.currentTeam,
    teamNames: teamNames
  };
}

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectTeam: _actions.selectTeam
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(TeamSelector);

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
        this.props.children,
        _react2.default.createElement(_reactChartjs.Bar, { data: data, options: opts })
      );
    }
  }]);

  return BarLineChart;
}(_react2.default.Component);

exports.default = BarLineChart;

});

require.register("js/components/charts/FilledLineChart.jsx", function(exports, require, module) {
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

var FilledLineChart = function (_React$Component) {
  _inherits(FilledLineChart, _React$Component);

  function FilledLineChart() {
    _classCallCheck(this, FilledLineChart);

    return _possibleConstructorReturn(this, (FilledLineChart.__proto__ || Object.getPrototypeOf(FilledLineChart)).apply(this, arguments));
  }

  _createClass(FilledLineChart, [{
    key: 'render',
    value: function render() {
      var opts = (0, _chart_options2.default)(this.props.options),
          data = (0, _data_transformer2.default)("filledLine", this.props.data, this.props.colours);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        this.props.children,
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts })
      );
    }
  }]);

  return FilledLineChart;
}(_react2.default.Component);

exports.default = FilledLineChart;

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
        this.props.children,
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts })
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
        this.props.children,
        _react2.default.createElement(_reactChartjs.Bar, { ref: 'chart', data: (0, _data_transformer2.default)("bar", this.props.data, this.props.colours, false), options: (0, _chart_options2.default)(this.props.options), height: this.props.height })
      );
    }
  }]);

  return MultiBarChart;
}(_react2.default.Component);

exports.default = MultiBarChart;

});

require.register("js/components/charts/PercentageFilledLineChart.jsx", function(exports, require, module) {
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

        },
        stacked: true
      }]
    }
  };
};

var PercentageFilledLineChart = function (_React$Component) {
  _inherits(PercentageFilledLineChart, _React$Component);

  function PercentageFilledLineChart() {
    _classCallCheck(this, PercentageFilledLineChart);

    return _possibleConstructorReturn(this, (PercentageFilledLineChart.__proto__ || Object.getPrototypeOf(PercentageFilledLineChart)).apply(this, arguments));
  }

  _createClass(PercentageFilledLineChart, [{
    key: 'render',
    value: function render() {
      var opts = (0, _chart_options2.default)(Object.assign({}, percentageScaleOpts(this.props.min, this.props.max), this.props.options)),
          data = (0, _data_transformer2.default)("filledLine", this.props.data, this.props.colours);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ),
        this.props.children,
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts })
      );
    }
  }]);

  return PercentageFilledLineChart;
}(_react2.default.Component);

exports.default = PercentageFilledLineChart;

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
        this.props.children,
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts })
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
        this.props.children,
        _react2.default.createElement(_reactChartjs.Pie, { ref: 'chart', data: data, options: opts })
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
        this.props.children,
        _react2.default.createElement(_reactChartjs.Radar, { data: (0, _data_transformer2.default)("radar", this.props.data, this.props.colours), options: (0, _chart_options2.default)(this.props.options) })
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
        this.props.children,
        _react2.default.createElement(_reactChartjs.Line, { ref: 'chart', data: data, options: opts })
      );
    }
  }]);

  return UnsortedLineChart;
}(_react2.default.Component);

exports.default = UnsortedLineChart;

});

require.register("js/components/dashboards/Dashboard.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _DashboardTitle = require('../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _Breadcrumb = require('../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _LandingPanel = require('../LandingPanel');

var _LandingPanel2 = _interopRequireDefault(_LandingPanel);

var _StatusIndicator = require('../StatusIndicator');

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

var _ = require('.');

var _overview = require('./development_health/overview');

var _overview2 = _interopRequireDefault(_overview);

var _release_burnup = require('./product_tracking/release_burnup');

var _overview3 = require('./product_quality/overview');

var _overview4 = _interopRequireDefault(_overview3);

var _overview5 = require('./agile_maturity/overview');

var _overview6 = _interopRequireDefault(_overview5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard() {
    _classCallCheck(this, Dashboard);

    return _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).apply(this, arguments));
  }

  _createClass(Dashboard, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        label: "Home"
      }];
      var teams = this.props.teams,
          release = this.props.release;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks }),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Agile Dashboard'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'small-10 small-offset-1 columns' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(_LandingPanel2.default, { title: 'Product Tracking', dashboard: _.ProductTracking, status: (0, _release_burnup.releaseStatus)(this.props.release) }),
              _react2.default.createElement(_LandingPanel2.default, { title: 'Product Quality', dashboard: _.ProductQuality, status: new _overview4.default(release, teams).totalDefectIndicator() }),
              _react2.default.createElement(_LandingPanel2.default, { title: 'Agile Maturity', dashboard: _.AgileMaturity, status: new _overview6.default(release, teams).totalMaturityIndicator() }),
              _react2.default.createElement(_LandingPanel2.default, { title: 'Development Health', dashboard: _.DevelopmentHealth, status: new _overview2.default(teams.allTeams).combinedIndicator() })
            )
          )
        )
      );
    }
  }]);

  return Dashboard;
}(_react.Component);

function mapStateToProps(state) {
  return {
    release: state.metrics.release,
    teams: state.metrics.teams
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Dashboard);

});

require.register("js/components/dashboards/agile_maturity/AgileMaturity.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('../../dashboards');

var _OverviewTable = require('./OverviewTable');

var _OverviewTable2 = _interopRequireDefault(_OverviewTable);

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _PracticesTrend = require('./PracticesTrend');

var _PracticesTrend2 = _interopRequireDefault(_PracticesTrend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AgileMaturity = function (_Component) {
  _inherits(AgileMaturity, _Component);

  function AgileMaturity() {
    _classCallCheck(this, AgileMaturity);

    return _possibleConstructorReturn(this, (AgileMaturity.__proto__ || Object.getPrototypeOf(AgileMaturity)).apply(this, arguments));
  }

  _createClass(AgileMaturity, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: AgileMaturity,
        label: "Agile Maturity"
      }];
      return _react2.default.createElement(
        'div',
        { className: 'product-tracking-dashboard' },
        _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks }),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Agile Maturity'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-8 columns' },
            _react2.default.createElement(_PracticesTrend2.default, { className: 'main-visualisation' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-4 columns' },
            _react2.default.createElement(_OverviewTable2.default, null)
          )
        )
      );
    }
  }]);

  return AgileMaturity;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(AgileMaturity);

});

require.register("js/components/dashboards/agile_maturity/CodeOwnership.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _PieChart = require('../../charts/PieChart');

var _PieChart2 = _interopRequireDefault(_PieChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CodeOwnership = function (_Component) {
  _inherits(CodeOwnership, _Component);

  function CodeOwnership() {
    _classCallCheck(this, CodeOwnership);

    return _possibleConstructorReturn(this, (CodeOwnership.__proto__ || Object.getPrototypeOf(CodeOwnership)).apply(this, arguments));
  }

  _createClass(CodeOwnership, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_PieChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Code Ownership' });
    }
  }]);

  return CodeOwnership;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {};
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).codeOwnershipData(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CodeOwnership);

});

require.register("js/components/dashboards/agile_maturity/OtherPractices.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OtherPractices = function (_Component) {
  _inherits(OtherPractices, _Component);

  function OtherPractices() {
    _classCallCheck(this, OtherPractices);

    return _possibleConstructorReturn(this, (OtherPractices.__proto__ || Object.getPrototypeOf(OtherPractices)).apply(this, arguments));
  }

  _createClass(OtherPractices, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_MultiBarChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Practices' });
    }
  }]);

  return OtherPractices;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: 5,
          beginAtZero: true
        }
      }]
    }
  };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).otherPracticesData(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(OtherPractices);

});

require.register("js/components/dashboards/agile_maturity/OverviewTable.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _StatusIndicator = require('../../StatusIndicator');

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

var _overview = require('./overview');

var _overview2 = _interopRequireDefault(_overview);

var _TeamMaturity = require('./TeamMaturity');

var _TeamMaturity2 = _interopRequireDefault(_TeamMaturity);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OverviewTable = function (_Component) {
  _inherits(OverviewTable, _Component);

  function OverviewTable(props) {
    _classCallCheck(this, OverviewTable);

    var _this = _possibleConstructorReturn(this, (OverviewTable.__proto__ || Object.getPrototypeOf(OverviewTable)).call(this, props));

    _this.handleSelectDashboard = _this.handleSelectDashboard.bind(_this);
    return _this;
  }

  _createClass(OverviewTable, [{
    key: 'handleSelectDashboard',
    value: function handleSelectDashboard(teamName) {
      this.props.selectTeamDashboard(teamName, _TeamMaturity2.default);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var teamNames = this.props.teams.shortNames;
      var overview = new _overview2.default(this.props.release, this.props.teams);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          'Team Overview'
        ),
        _react2.default.createElement(
          'table',
          { className: 'unstriped hover team-overview-table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Team'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Maturity'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            teamNames.map(function (teamName) {
              return _react2.default.createElement(
                'tr',
                { key: "team-" + teamName + "-overview", onClick: function onClick() {
                    return _this2.handleSelectDashboard(teamName);
                  } },
                _react2.default.createElement(
                  'td',
                  { className: 'team-name' },
                  teamName
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'indicator' },
                  _react2.default.createElement(_StatusIndicator2.default, { colour: overview.maturityIndicator(teamName) })
                )
              );
            })
          )
        )
      );
    }
  }]);

  return OverviewTable;
}(_react.Component);

function mapStateToProps(state) {
  return {
    release: state.metrics.release,
    teams: state.metrics.teams
  };
};

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectTeamDashboard: _actions.selectTeamDashboard
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(OverviewTable);

});

require.register("js/components/dashboards/agile_maturity/Practices.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Practices = function (_Component) {
  _inherits(Practices, _Component);

  function Practices(props) {
    _classCallCheck(this, Practices);

    var _this = _possibleConstructorReturn(this, (Practices.__proto__ || Object.getPrototypeOf(Practices)).call(this, props));

    _this.handleToggleBreakdown = _this.handleToggleBreakdown.bind(_this);
    return _this;
  }

  _createClass(Practices, [{
    key: 'handleToggleBreakdown',
    value: function handleToggleBreakdown(event) {
      this.props.togglePracticesByPractice(event.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _MultiBarChart2.default,
          { className: 'practices-chart', height: 450, data: this.props.chartData, options: this.props.options },
          _react2.default.createElement(
            'div',
            { className: 'columns row' },
            _react2.default.createElement(
              'h3',
              { className: 'float-left' },
              'Practices \xA0',
              _react2.default.createElement(
                'button',
                { onClick: this.handleToggleBreakdown, className: 'button small float-right' },
                'Toggle Breakdown'
              )
            )
          )
        )
      );
    }
  }]);

  return Practices;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      displayByPractices = state.metrics.options.practicesByPractice,
      dataFunc = void 0,
      displayTicks = function displayTicks(value) {
    var adoptionLabels = {
      1: "Adoption",
      2: "Adaptation",
      3: "Acceptance",
      4: "Routinisation",
      5: "Infusion"
    };
    return adoptionLabels[value] || "";
  },
      options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          callback: displayTicks,
          min: 0,
          max: 5,
          stepSize: 1,
          beginAtZero: true
        }
      }]
    }
  };
  if (displayByPractices) {
    dataFunc = function dataFunc(team) {
      return team.practicesDataByPractice();
    };
    options.legend = { display: false };
  } else {
    dataFunc = function dataFunc(team) {
      return team.practicesData();
    };
    options.legend = { display: true };
  }
  var chartData = dataFunc(state.metrics.teams.selectTeam(currentTeam));
  return {
    chartData: chartData,
    options: options
  };
};

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    togglePracticesByPractice: _actions.togglePracticesByPractice
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(Practices);

});

require.register("js/components/dashboards/agile_maturity/PracticesTrend.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BarLineChart = require('../../charts/BarLineChart');

var _BarLineChart2 = _interopRequireDefault(_BarLineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PracticesTrend = function (_Component) {
  _inherits(PracticesTrend, _Component);

  function PracticesTrend() {
    _classCallCheck(this, PracticesTrend);

    return _possibleConstructorReturn(this, (PracticesTrend.__proto__ || Object.getPrototypeOf(PracticesTrend)).apply(this, arguments));
  }

  _createClass(PracticesTrend, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_BarLineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Team Maturity' });
    }
  }]);

  return PracticesTrend;
}(_react.Component);

function mapStateToProps(state) {
  var displayTicks = function displayTicks(value) {
    var adoptionLabels = {
      1: "Adoption",
      2: "Adaptation",
      3: "Acceptance",
      4: "Routinisation",
      5: "Infusion"
    };
    return adoptionLabels[value] || "";
  },
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          callback: displayTicks,
          min: 0,
          max: 5,
          stepSize: 1,
          beginAtZero: true
        }
      }]
    }
  },
      chartData = state.metrics.release.practicesTrendData();
  return {
    chartData: chartData,
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PracticesTrend);

});

require.register("js/components/dashboards/agile_maturity/SprintBurndownTrend.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprintBurndownTrend = function (_Component) {
  _inherits(SprintBurndownTrend, _Component);

  function SprintBurndownTrend() {
    _classCallCheck(this, SprintBurndownTrend);

    return _possibleConstructorReturn(this, (SprintBurndownTrend.__proto__ || Object.getPrototypeOf(SprintBurndownTrend)).apply(this, arguments));
  }

  _createClass(SprintBurndownTrend, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_LineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Burndown Trend' });
    }
  }]);

  return SprintBurndownTrend;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      sprints = state.metrics.release.burndownData(currentTeam),
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: state.metrics.release.maximumPoints(),
          beginAtZero: true
        }
      }]
    }
  },
      chartData = sprints;
  return {
    chartData: chartData,
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SprintBurndownTrend);

});

require.register("js/components/dashboards/agile_maturity/SprintInterference.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _PercentageFilledLineChart = require('../../charts/PercentageFilledLineChart');

var _PercentageFilledLineChart2 = _interopRequireDefault(_PercentageFilledLineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprintInterference = function (_Component) {
  _inherits(SprintInterference, _Component);

  function SprintInterference() {
    _classCallCheck(this, SprintInterference);

    return _possibleConstructorReturn(this, (SprintInterference.__proto__ || Object.getPrototypeOf(SprintInterference)).apply(this, arguments));
  }

  _createClass(SprintInterference, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_PercentageFilledLineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Sprint Interference' });
    }
  }]);

  return SprintInterference;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {};
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).sprintInterferenceData(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SprintInterference);

});

require.register("js/components/dashboards/agile_maturity/TeamMaturity.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('../../dashboards');

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _TeamSelector = require('../../TeamSelector');

var _TeamSelector2 = _interopRequireDefault(_TeamSelector);

var _agile_maturity = require('../agile_maturity');

var _agile_maturity2 = _interopRequireDefault(_agile_maturity);

var _SprintBurndownTrend = require('./SprintBurndownTrend');

var _SprintBurndownTrend2 = _interopRequireDefault(_SprintBurndownTrend);

var _CodeOwnership = require('./CodeOwnership');

var _CodeOwnership2 = _interopRequireDefault(_CodeOwnership);

var _VelocityTrend = require('./VelocityTrend');

var _VelocityTrend2 = _interopRequireDefault(_VelocityTrend);

var _SprintInterference = require('./SprintInterference');

var _SprintInterference2 = _interopRequireDefault(_SprintInterference);

var _Practices = require('./Practices');

var _Practices2 = _interopRequireDefault(_Practices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamMaturity = function (_Component) {
  _inherits(TeamMaturity, _Component);

  function TeamMaturity() {
    _classCallCheck(this, TeamMaturity);

    return _possibleConstructorReturn(this, (TeamMaturity.__proto__ || Object.getPrototypeOf(TeamMaturity)).apply(this, arguments));
  }

  _createClass(TeamMaturity, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: _agile_maturity2.default,
        label: "Agile Maturity"
      }, {
        view: TeamMaturity,
        label: "Team Maturity"
      }];
      return _react2.default.createElement(
        'div',
        { className: 'product-tracking-dashboard' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_TeamSelector2.default, { labelPosition: 'left' })
          )
        ),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Team Maturity'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_VelocityTrend2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_SprintBurndownTrend2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_CodeOwnership2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_SprintInterference2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-12 columns' },
            _react2.default.createElement(_Practices2.default, null)
          )
        )
      );
    }
  }]);

  return TeamMaturity;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(TeamMaturity);

});

require.register("js/components/dashboards/agile_maturity/TotalBurndownTrend.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprintBurndownTrend = function (_Component) {
  _inherits(SprintBurndownTrend, _Component);

  function SprintBurndownTrend() {
    _classCallCheck(this, SprintBurndownTrend);

    return _possibleConstructorReturn(this, (SprintBurndownTrend.__proto__ || Object.getPrototypeOf(SprintBurndownTrend)).apply(this, arguments));
  }

  _createClass(SprintBurndownTrend, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_LineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Burndown Trend' });
    }
  }]);

  return SprintBurndownTrend;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      sprints = state.metrics.release.burndownDataProduct(),
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: state.metrics.release.maximumPoints(),
          beginAtZero: true
        }
      }]
    }
  },
      chartData = sprints;
  return {
    chartData: chartData,
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SprintBurndownTrend);

});

require.register("js/components/dashboards/agile_maturity/VelocityTrend.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VelocityTrend = function (_Component) {
  _inherits(VelocityTrend, _Component);

  function VelocityTrend() {
    _classCallCheck(this, VelocityTrend);

    return _possibleConstructorReturn(this, (VelocityTrend.__proto__ || Object.getPrototypeOf(VelocityTrend)).apply(this, arguments));
  }

  _createClass(VelocityTrend, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_LineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Velocity Trend' });
    }
  }]);

  return VelocityTrend;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: state.metrics.release.maximumPoints(),
          beginAtZero: true
        }
      }]
    }
  };
  return {
    chartData: state.metrics.release.velocityTrendData(currentTeam),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VelocityTrend);

});

require.register("js/components/dashboards/agile_maturity/XpPractices.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XpPractices = function (_Component) {
  _inherits(XpPractices, _Component);

  function XpPractices() {
    _classCallCheck(this, XpPractices);

    return _possibleConstructorReturn(this, (XpPractices.__proto__ || Object.getPrototypeOf(XpPractices)).apply(this, arguments));
  }

  _createClass(XpPractices, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_MultiBarChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Practices' });
    }
  }]);

  return XpPractices;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: 5,
          beginAtZero: true
        }
      }]
    }
  };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).xpPracticesData(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(XpPractices);

});

require.register("js/components/dashboards/agile_maturity/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AgileMaturity = require('./AgileMaturity');

var _AgileMaturity2 = _interopRequireDefault(_AgileMaturity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AgileMaturity2.default;

});

require.register("js/components/dashboards/agile_maturity/overview.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AgileOverview = function () {
  function AgileOverview(release, teams) {
    _classCallCheck(this, AgileOverview);

    this.release = release;
    this.teams = teams;
  }

  _createClass(AgileOverview, [{
    key: "calculateMaturityIndication",
    value: function calculateMaturityIndication(teamName) {
      var team = this.teams.allTeams.filter(function (team) {
        return team.name == teamName;
      });
      var practicesTrend = team[0].practiceAssessments.reduce(this.calculateMaturityReducer, []);
      return practicesTrend[practicesTrend.length - 1];
    }
  }, {
    key: "calculateTotalMaturity",
    value: function calculateTotalMaturity() {
      var _this = this;

      var totalMaturity = this.teams.allTeams.map(function (team) {
        var practicesTrend = team.practiceAssessments.reduce(_this.calculateMaturityReducer, []).reduce(function (total, teamTrend) {
          return total + (teamTrend || 0) / _this.teams.allTeams.length;
        }, 0);
        return practicesTrend;
      });
      console.log("Total maturity", totalMaturity);
      return totalMaturity;
    }
  }, {
    key: "calculateMaturityReducer",
    value: function calculateMaturityReducer(assessments, practices, i) {
      var scrumTotal = Object.values(practices.scrumAssessment).reduce(function (total, valueInAssesment) {
        return total + valueInAssesment;
      }, 0),
          xpTotal = Object.values(practices.xpAssessment).reduce(function (total, valueInAssesment) {
        return total + valueInAssesment;
      }, 0),
          practiceCount = Object.keys(practices.scrumAssessment).length + Object.keys(practices.xpAssessment).length;
      console.log("Calc mat reducer", { scrumTotal: scrumTotal, xpTotal: xpTotal, practiceCount: practiceCount });
      assessments[i] = (scrumTotal + xpTotal) / practiceCount;
      return assessments;
    }
  }, {
    key: "makeIndicator",
    value: function makeIndicator(value) {
      if (value >= 3.5) {
        return "GREEN";
      } else if (value >= 2.5) {
        return "YELLOW";
      } else {
        return "RED";
      }
    }
  }, {
    key: "maturityIndicator",
    value: function maturityIndicator(teamName) {
      return this.makeIndicator(this.calculateMaturityIndication(teamName));
    }
  }, {
    key: "totalMaturityIndicator",
    value: function totalMaturityIndicator() {
      return this.makeIndicator(this.calculateTotalMaturity());
    }
  }]);

  return AgileOverview;
}();

exports.default = AgileOverview;

});

require.register("js/components/dashboards/development_health/DevelopmentHealth.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('../../dashboards');

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _HappinessOverview = require('./HappinessOverview');

var _HappinessOverview2 = _interopRequireDefault(_HappinessOverview);

var _SatisfactionOverview = require('./SatisfactionOverview');

var _SatisfactionOverview2 = _interopRequireDefault(_SatisfactionOverview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DevelopmentHealth = function (_Component) {
  _inherits(DevelopmentHealth, _Component);

  function DevelopmentHealth() {
    _classCallCheck(this, DevelopmentHealth);

    return _possibleConstructorReturn(this, (DevelopmentHealth.__proto__ || Object.getPrototypeOf(DevelopmentHealth)).apply(this, arguments));
  }

  _createClass(DevelopmentHealth, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: DevelopmentHealth,
        label: "Development Health"
      }];
      return _react2.default.createElement(
        'div',
        { className: 'development-health-dashboard' },
        _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks }),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Development Health'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-8 columns' },
            _react2.default.createElement(_HappinessOverview2.default, { className: 'main-visualisation' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-4 columns' },
            _react2.default.createElement(_SatisfactionOverview2.default, { className: 'main-visualisation' })
          )
        )
      );
    }
  }]);

  return DevelopmentHealth;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(DevelopmentHealth);

});

require.register("js/components/dashboards/development_health/HappinessOverview.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _overview = require('./overview');

var _overview2 = _interopRequireDefault(_overview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HappinessOverview = function (_Component) {
  _inherits(HappinessOverview, _Component);

  function HappinessOverview() {
    _classCallCheck(this, HappinessOverview);

    return _possibleConstructorReturn(this, (HappinessOverview.__proto__ || Object.getPrototypeOf(HappinessOverview)).apply(this, arguments));
  }

  _createClass(HappinessOverview, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_LineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Average Happiness' });
    }
  }]);

  return HappinessOverview;
}(_react.Component);

function mapStateToProps(state) {
  var options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: 5,
          beginAtZero: true
        }
      }]
    }
  },
      overview = new _overview2.default(state.metrics.teams.allTeams),
      chartData = [{
    description: "Happiness",
    data: overview.averageHappiness()
  }];
  console.log("Data", chartData);
  return {
    chartData: chartData,
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(HappinessOverview);

});

require.register("js/components/dashboards/development_health/SatisfactionOverview.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

var _StatusIndicator = require('../../StatusIndicator');

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

var _overview = require('./overview');

var _overview2 = _interopRequireDefault(_overview);

var _TeamHealth = require('./TeamHealth');

var _TeamHealth2 = _interopRequireDefault(_TeamHealth);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SatisfactionOverview = function (_Component) {
  _inherits(SatisfactionOverview, _Component);

  function SatisfactionOverview(props) {
    _classCallCheck(this, SatisfactionOverview);

    var _this = _possibleConstructorReturn(this, (SatisfactionOverview.__proto__ || Object.getPrototypeOf(SatisfactionOverview)).call(this, props));

    _this.handleSelectDashboard = _this.handleSelectDashboard.bind(_this);
    return _this;
  }

  _createClass(SatisfactionOverview, [{
    key: 'handleSelectDashboard',
    value: function handleSelectDashboard(teamName) {
      this.props.selectTeamDashboard(teamName, _TeamHealth2.default);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var teams = this.props.teams.allTeams,
          teamNames = this.props.teams.shortNames,
          satisfactionOverview = new _overview2.default(teams);

      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          'Satisfaction Overview'
        ),
        _react2.default.createElement(
          'table',
          { className: 'unstriped hover team-overview-table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { className: 'criterion-heading' },
                'Team'
              ),
              _react2.default.createElement(
                'th',
                { key: 'heading-happiness', className: 'criterion-heading' },
                'Happiness'
              ),
              _react2.default.createElement(
                'th',
                { key: 'heading-satisfaction', className: 'criterion-heading' },
                'Satisfaction'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            teamNames.map(function (teamName) {
              return _react2.default.createElement(
                'tr',
                { key: "team-" + teamName + "-overview", onClick: function onClick() {
                    return _this2.handleSelectDashboard(teamName);
                  } },
                _react2.default.createElement(
                  'td',
                  { className: 'team-name' },
                  teamName
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'indicator', key: "indicator-" + teamName + "-happiness" },
                  _react2.default.createElement(_StatusIndicator2.default, { colour: satisfactionOverview.happinessIndicator(teamName).colour, trend: satisfactionOverview.happinessIndicator(teamName).trend })
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'indicator', key: "indicator-" + teamName + "-satisfaction" },
                  _react2.default.createElement(_StatusIndicator2.default, { colour: satisfactionOverview.satisfactionIndicator(teamName).colour, trend: satisfactionOverview.satisfactionIndicator(teamName).trend })
                )
              );
            })
          )
        )
      );
    }
  }]);

  return SatisfactionOverview;
}(_react.Component);

function mapStateToProps(state) {
  return {
    teams: state.metrics.teams
  };
};

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectTeamDashboard: _actions.selectTeamDashboard
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(SatisfactionOverview);

});

require.register("js/components/dashboards/development_health/TeamHealth.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('../../dashboards');

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _DevelopmentHealth = require('./DevelopmentHealth');

var _DevelopmentHealth2 = _interopRequireDefault(_DevelopmentHealth);

var _TeamSelector = require('../../TeamSelector');

var _TeamSelector2 = _interopRequireDefault(_TeamSelector);

var _Happiness = require('../product_tracking/Happiness');

var _Happiness2 = _interopRequireDefault(_Happiness);

var _Satisfaction = require('../product_tracking/Satisfaction');

var _Satisfaction2 = _interopRequireDefault(_Satisfaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamHealth = function (_Component) {
  _inherits(TeamHealth, _Component);

  function TeamHealth() {
    _classCallCheck(this, TeamHealth);

    return _possibleConstructorReturn(this, (TeamHealth.__proto__ || Object.getPrototypeOf(TeamHealth)).apply(this, arguments));
  }

  _createClass(TeamHealth, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: _DevelopmentHealth2.default,
        label: "Development Health"
      }, {
        view: TeamHealth,
        label: "Team Health"
      }];
      return _react2.default.createElement(
        'div',
        { className: 'development-health-dashboard' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_TeamSelector2.default, { labelPosition: 'left' })
          )
        ),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Team Health'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Happiness2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Satisfaction2.default, null)
          )
        )
      );
    }
  }]);

  return TeamHealth;
}(_react.Component);

function mapStateToProps(state) {
  return {
    teams: state.metrics.teams
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(TeamHealth);

});

require.register("js/components/dashboards/development_health/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DevelopmentHealth = require('./DevelopmentHealth');

var _DevelopmentHealth2 = _interopRequireDefault(_DevelopmentHealth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DevelopmentHealth2.default;

});

require.register("js/components/dashboards/development_health/overview.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dates = require("../../../lib/dates");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Overview = function () {
  function Overview(teams) {
    _classCallCheck(this, Overview);

    this.teams = teams;
  }

  _createClass(Overview, [{
    key: "allIndicators",
    value: function allIndicators() {
      var _this = this;

      return this.teams.reduce(function (all, team) {
        all[team.name] = _this.teamIndicators(team.name);
        return all;
      }, {});
    }
  }, {
    key: "allCriteria",
    value: function allCriteria() {
      return this.teams[0].satisfactionAssessments[0].satisfactionCriteria();
    }
  }, {
    key: "allHappinessAssessments",
    value: function allHappinessAssessments() {
      var nestedAssessments = this.teams.map(function (team) {
        return team.happinessAssessments;
      });
      return [].concat.apply([], nestedAssessments);
    }
  }, {
    key: "averageHappiness",
    value: function averageHappiness() {
      var firstTeamAssessments = this.teams[0].happinessAssessments,
          allAssessments = this.allHappinessAssessments();
      console.log("All assessments", allAssessments);
      var totalObj = allAssessments.reduce(function (output, assessment) {
        var prevVal = output[(0, _dates.shortDate)(assessment.date)] || [0, 0],
            newVal = [prevVal[0] + assessment.happiness, prevVal[1] + 1];
        output[(0, _dates.shortDate)(assessment.date)] = newVal;
        return output;
      }, {});
      return Object.keys(totalObj).reduce(function (output, key) {
        var _totalObj$key = _slicedToArray(totalObj[key], 2),
            total = _totalObj$key[0],
            count = _totalObj$key[1];

        output[key] = total / count;
        return output;
      }, {});
    }
  }, {
    key: "relevantSatisfactionAssessments",
    value: function relevantSatisfactionAssessments(teamName) {
      var team = this.teams.find(function (team) {
        return team.name == teamName;
      });
      return team.satisfactionAssessments.slice(-2);
    }
  }, {
    key: "satisfactionIndicator",
    value: function satisfactionIndicator(teamName) {
      var assessments = this.relevantSatisfactionAssessments(teamName),
          startingPoints = assessments[0].averageSatisfaction(),
          endingPoints = assessments[1].averageSatisfaction(),
          trend = void 0;
      if (endingPoints > startingPoints) {
        trend = "INCREASING";
      } else if (endingPoints < startingPoints) {
        trend = "DECREASING";
      } else {
        trend = "STEADY";
      }
      return this.makeIndicator(trend, endingPoints);
    }
  }, {
    key: "relevantHappinessAssessments",
    value: function relevantHappinessAssessments(teamName) {
      var team = this.teams.find(function (team) {
        return team.name == teamName;
      });
      return team.happinessAssessments.slice(-2);
    }
  }, {
    key: "happinessIndicator",
    value: function happinessIndicator(teamName) {
      var assessments = this.relevantHappinessAssessments(teamName),
          startingPoints = assessments[0].happiness,
          endingPoints = assessments[1].happiness,
          trend = void 0;
      if (endingPoints > startingPoints) {
        trend = "INCREASING";
      } else if (endingPoints < startingPoints) {
        trend = "DECREASING";
      } else {
        trend = "STEADY";
      }
      return this.makeIndicator(trend, endingPoints);
    }
  }, {
    key: "combinedIndicator",
    value: function combinedIndicator() {
      var _this2 = this;

      var happinessIndicators = this.teams.map(function (team) {
        return _this2.happinessIndicator(team.name);
      }),
          satisfactionIndicators = this.teams.map(function (team) {
        return _this2.satisfactionIndicator(team.name);
      });
      // Combine indicators, taking the worst indicator overall.
      var indicatorCount = happinessIndicators.concat(satisfactionIndicators).reduce(function (counts, _ref) {
        var colour = _ref.colour;

        counts[colour] = (counts[colour] || 0) + 1;
        return counts;
      }, {}),
          totalIndicators = happinessIndicators.length + satisfactionIndicators.length;
      if (indicatorCount.RED > totalIndicators / 10) {
        return "RED";
      } else if (indicatorCount.YELLOW > totalIndicators / 10) {
        return "YELLOW";
      } else {
        return "GREEN";
      }
    }
  }, {
    key: "makeIndicator",
    value: function makeIndicator(trend, currentPoints) {
      var colour = function colour() {
        if (currentPoints >= 3.5) {
          return "GREEN";
        } else if (currentPoints >= 2) {
          return "YELLOW";
        } else {
          return "RED";
        }
        return "???";
      };
      return {
        trend: trend,
        colour: colour(trend)
      };
    }
  }]);

  return Overview;
}();

exports.default = Overview;

});

require.register("js/components/dashboards/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductQuality = exports.AgileMaturity = exports.DevelopmentHealth = exports.ProductTracking = exports.Dashboard = undefined;

var _Dashboard = require('./Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _product_tracking = require('./product_tracking');

var _product_tracking2 = _interopRequireDefault(_product_tracking);

var _development_health = require('./development_health');

var _development_health2 = _interopRequireDefault(_development_health);

var _agile_maturity = require('./agile_maturity');

var _agile_maturity2 = _interopRequireDefault(_agile_maturity);

var _product_quality = require('./product_quality');

var _product_quality2 = _interopRequireDefault(_product_quality);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Dashboard = _Dashboard2.default;
exports.ProductTracking = _product_tracking2.default;
exports.DevelopmentHealth = _development_health2.default;
exports.AgileMaturity = _agile_maturity2.default;
exports.ProductQuality = _product_quality2.default;

});

require.register("js/components/dashboards/product_quality/DefectsOverTime.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _FilledLineChart = require('../../charts/FilledLineChart');

var _FilledLineChart2 = _interopRequireDefault(_FilledLineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefectsOverTime = function (_Component) {
  _inherits(DefectsOverTime, _Component);

  function DefectsOverTime() {
    _classCallCheck(this, DefectsOverTime);

    return _possibleConstructorReturn(this, (DefectsOverTime.__proto__ || Object.getPrototypeOf(DefectsOverTime)).apply(this, arguments));
  }

  _createClass(DefectsOverTime, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_FilledLineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Current Defects' });
    }
  }]);

  return DefectsOverTime;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        stepped: true,
        stacked: true
      }]
    }
  };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).defectsOverTimeData(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(DefectsOverTime);

});

require.register("js/components/dashboards/product_quality/ProductQuality.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('../../dashboards');

var _QualityOverviewTable = require('./QualityOverviewTable');

var _QualityOverviewTable2 = _interopRequireDefault(_QualityOverviewTable);

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _TotalDefects = require('./TotalDefects');

var _TotalDefects2 = _interopRequireDefault(_TotalDefects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductQuality = function (_Component) {
  _inherits(ProductQuality, _Component);

  function ProductQuality() {
    _classCallCheck(this, ProductQuality);

    return _possibleConstructorReturn(this, (ProductQuality.__proto__ || Object.getPrototypeOf(ProductQuality)).apply(this, arguments));
  }

  _createClass(ProductQuality, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: ProductQuality,
        label: "Product Quality"
      }];
      return _react2.default.createElement(
        'div',
        { id: 'product-quality-dashboard' },
        _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks }),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Product Quality'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-8 columns' },
            _react2.default.createElement(_TotalDefects2.default, { className: 'main-visualisation' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-4 columns' },
            _react2.default.createElement(_QualityOverviewTable2.default, null)
          )
        )
      );
    }
  }]);

  return ProductQuality;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(ProductQuality);

});

require.register("js/components/dashboards/product_quality/QualityOverviewTable.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _StatusIndicator = require('../../StatusIndicator');

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

var _overview = require('./overview');

var _overview2 = _interopRequireDefault(_overview);

var _TeamProductQuality = require('./TeamProductQuality');

var _TeamProductQuality2 = _interopRequireDefault(_TeamProductQuality);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QualityOverviewTable = function (_Component) {
  _inherits(QualityOverviewTable, _Component);

  function QualityOverviewTable(props) {
    _classCallCheck(this, QualityOverviewTable);

    var _this = _possibleConstructorReturn(this, (QualityOverviewTable.__proto__ || Object.getPrototypeOf(QualityOverviewTable)).call(this, props));

    _this.handleSelectDashboard = _this.handleSelectDashboard.bind(_this);
    return _this;
  }

  _createClass(QualityOverviewTable, [{
    key: 'handleSelectDashboard',
    value: function handleSelectDashboard(teamName) {
      this.props.selectTeamDashboard(teamName, _TeamProductQuality2.default);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var teamNames = this.props.teams.shortNames;
      var overview = new _overview2.default(this.props.release, this.props.teams);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          'Team Overview'
        ),
        _react2.default.createElement(
          'table',
          { className: 'unstriped hover team-overview-table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Team'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Quality'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            teamNames.map(function (teamName) {
              return _react2.default.createElement(
                'tr',
                { key: "team-" + teamName + "-overview", onClick: function onClick() {
                    return _this2.handleSelectDashboard(teamName);
                  } },
                _react2.default.createElement(
                  'td',
                  { className: 'team-name' },
                  teamName
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'indicator' },
                  _react2.default.createElement(_StatusIndicator2.default, { colour: overview.defectIndicator(teamName) })
                )
              );
            })
          )
        )
      );
    }
  }]);

  return QualityOverviewTable;
}(_react.Component);

function mapStateToProps(state) {
  return {
    release: state.metrics.release,
    teams: state.metrics.teams
  };
};

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectTeamDashboard: _actions.selectTeamDashboard
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(QualityOverviewTable);

});

require.register("js/components/dashboards/product_quality/TeamProductQuality.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('../../dashboards');

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _TeamSelector = require('../../TeamSelector');

var _TeamSelector2 = _interopRequireDefault(_TeamSelector);

var _ProductQuality = require('./ProductQuality');

var _ProductQuality2 = _interopRequireDefault(_ProductQuality);

var _DefectsOverTime = require('./DefectsOverTime');

var _DefectsOverTime2 = _interopRequireDefault(_DefectsOverTime);

var _CodeOwnership = require('../agile_maturity/CodeOwnership');

var _CodeOwnership2 = _interopRequireDefault(_CodeOwnership);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamProductQuality = function (_Component) {
  _inherits(TeamProductQuality, _Component);

  function TeamProductQuality() {
    _classCallCheck(this, TeamProductQuality);

    return _possibleConstructorReturn(this, (TeamProductQuality.__proto__ || Object.getPrototypeOf(TeamProductQuality)).apply(this, arguments));
  }

  _createClass(TeamProductQuality, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: _ProductQuality2.default,
        label: "Product Quality"
      }, {
        view: TeamProductQuality,
        label: "Team Product Quality"
      }];
      return _react2.default.createElement(
        'div',
        { className: 'product-tracking-dashboard' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_TeamSelector2.default, { labelPosition: 'left' })
          )
        ),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Team Product Quality'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_CodeOwnership2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_DefectsOverTime2.default, null)
          )
        )
      );
    }
  }]);

  return TeamProductQuality;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(TeamProductQuality);

});

require.register("js/components/dashboards/product_quality/TotalDefects.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _FilledLineChart = require('../../charts/FilledLineChart');

var _FilledLineChart2 = _interopRequireDefault(_FilledLineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefectsOverTime = function (_Component) {
  _inherits(DefectsOverTime, _Component);

  function DefectsOverTime() {
    _classCallCheck(this, DefectsOverTime);

    return _possibleConstructorReturn(this, (DefectsOverTime.__proto__ || Object.getPrototypeOf(DefectsOverTime)).apply(this, arguments));
  }

  _createClass(DefectsOverTime, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_FilledLineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Current Defects' });
    }
  }]);

  return DefectsOverTime;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        stepped: true,
        stacked: true
      }]
    }
  };
  return {
    chartData: state.metrics.release.defectsOverTime(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(DefectsOverTime);

});

require.register("js/components/dashboards/product_quality/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProductQuality = require('./ProductQuality');

var _ProductQuality2 = _interopRequireDefault(_ProductQuality);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ProductQuality2.default;

});

require.register("js/components/dashboards/product_quality/overview.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QualityOverview = function () {
  function QualityOverview(release, teams) {
    _classCallCheck(this, QualityOverview);

    this.release = release;
    this.teams = teams;
  }

  _createClass(QualityOverview, [{
    key: "calculateDefectsIndicator",
    value: function calculateDefectsIndicator(teamName) {
      var team = this.teams.allTeams.filter(function (team) {
        return team.name == teamName;
      });
      var totalAmountOfDefects = team[0].defectsOverTimeData().reduce(function (defectSum, criticalityTypeDefects, i) {
        Object.values(criticalityTypeDefects.data).forEach(function (value) {
          defectSum += value * (i + 1);
        });
        return defectSum;
      }, 0);
      return totalAmountOfDefects;
    }
  }, {
    key: "calculateTotalDefectsPoints",
    value: function calculateTotalDefectsPoints() {
      var totalAmountOfDefects = this.teams.allTeams.map(function (team) {
        return team.defectsOverTimeData().reduce(function (defectSum, criticalityTypeDefects, i) {
          Object.values(criticalityTypeDefects.data).forEach(function (value) {
            defectSum += value * (i + 1);
          });
          return defectSum;
        }, 0);
      }).reduce(function (total, teamScores) {
        return total + teamScores;
      }, 0);
      console.log("defects", totalAmountOfDefects);
      return totalAmountOfDefects;
    }
  }, {
    key: "makeTotalIndicator",
    value: function makeTotalIndicator(value) {
      if (value <= 10000) {
        return "GREEN";
      } else if (value <= 30000) {
        return "YELLOW";
      } else {
        return "RED";
      }
    }
  }, {
    key: "makeIndicator",
    value: function makeIndicator(value) {
      if (value <= 4205) {
        return "GREEN";
      } else if (value <= 5100) {
        return "YELLOW";
      } else {
        return "RED";
      }
    }
  }, {
    key: "defectIndicator",
    value: function defectIndicator(teamName) {
      return this.makeIndicator(this.calculateDefectsIndicator(teamName));
    }
  }, {
    key: "totalDefectIndicator",
    value: function totalDefectIndicator() {
      return this.makeTotalIndicator(this.calculateTotalDefectsPoints());
    }
  }]);

  return QualityOverview;
}();

exports.default = QualityOverview;

});

require.register("js/components/dashboards/product_tracking/Happiness.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Happiness = function (_Component) {
  _inherits(Happiness, _Component);

  function Happiness() {
    _classCallCheck(this, Happiness);

    return _possibleConstructorReturn(this, (Happiness.__proto__ || Object.getPrototypeOf(Happiness)).apply(this, arguments));
  }

  _createClass(Happiness, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_LineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Happiness' });
    }
  }]);

  return Happiness;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: 5,
          beginAtZero: true
        }
      }]
    }
  };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).happinessData(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Happiness);

});

require.register("js/components/dashboards/product_tracking/OverviewTable.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _ReleaseBurnup = require('./ReleaseBurnup');

var _ReleaseBurnup2 = _interopRequireDefault(_ReleaseBurnup);

var _StatusIndicator = require('../../StatusIndicator');

var _StatusIndicator2 = _interopRequireDefault(_StatusIndicator);

var _overview = require('./overview');

var _overview2 = _interopRequireDefault(_overview);

var _ProductTeamTracking = require('./ProductTeamTracking');

var _ProductTeamTracking2 = _interopRequireDefault(_ProductTeamTracking);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OverviewTable = function (_Component) {
  _inherits(OverviewTable, _Component);

  function OverviewTable(props) {
    _classCallCheck(this, OverviewTable);

    var _this = _possibleConstructorReturn(this, (OverviewTable.__proto__ || Object.getPrototypeOf(OverviewTable)).call(this, props));

    _this.handleSelectDashboard = _this.handleSelectDashboard.bind(_this);
    return _this;
  }

  _createClass(OverviewTable, [{
    key: 'handleSelectDashboard',
    value: function handleSelectDashboard(teamName) {
      this.props.selectTeamDashboard(teamName, _ProductTeamTracking2.default);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var teamNames = this.props.teams.shortNames;
      var overview = new _overview2.default(this.props.release);
      return _react2.default.createElement(
        'div',
        { className: 'chart-panel' },
        _react2.default.createElement(
          'h3',
          null,
          'Team Overview'
        ),
        _react2.default.createElement(
          'table',
          { className: 'unstriped hover team-overview-table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Team'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Stability'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Delivery'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            teamNames.map(function (teamName) {
              return _react2.default.createElement(
                'tr',
                { key: "team-" + teamName + "-overview", onClick: function onClick() {
                    return _this2.handleSelectDashboard(teamName);
                  } },
                _react2.default.createElement(
                  'td',
                  { className: 'team-name' },
                  teamName
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'indicator' },
                  _react2.default.createElement(_StatusIndicator2.default, { colour: overview.velocityIndicator(teamName) })
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'indicator' },
                  _react2.default.createElement(_StatusIndicator2.default, { colour: overview.deliveryIndicator(teamName) })
                )
              );
            })
          )
        )
      );
    }
  }]);

  return OverviewTable;
}(_react.Component);

function mapStateToProps(state) {
  return {
    release: state.metrics.release,
    teams: state.metrics.teams
  };
};

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    selectTeamDashboard: _actions.selectTeamDashboard
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(OverviewTable);

});

require.register("js/components/dashboards/product_tracking/ProductTeamTracking.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _dashboards = require('../../dashboards');

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

var _TeamSelector = require('../../TeamSelector');

var _TeamSelector2 = _interopRequireDefault(_TeamSelector);

var _product_tracking = require('../product_tracking');

var _product_tracking2 = _interopRequireDefault(_product_tracking);

var _Happiness = require('./Happiness');

var _Happiness2 = _interopRequireDefault(_Happiness);

var _Satisfaction = require('./Satisfaction');

var _Satisfaction2 = _interopRequireDefault(_Satisfaction);

var _Velocity = require('./Velocity');

var _Velocity2 = _interopRequireDefault(_Velocity);

var _SprintBurndown = require('./SprintBurndown');

var _SprintBurndown2 = _interopRequireDefault(_SprintBurndown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductTeamTracking = function (_Component) {
  _inherits(ProductTeamTracking, _Component);

  function ProductTeamTracking() {
    _classCallCheck(this, ProductTeamTracking);

    return _possibleConstructorReturn(this, (ProductTeamTracking.__proto__ || Object.getPrototypeOf(ProductTeamTracking)).apply(this, arguments));
  }

  _createClass(ProductTeamTracking, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: _product_tracking2.default,
        label: "Product Tracking"
      }, {
        view: ProductTeamTracking,
        label: "Team Tracking"
      }];
      return _react2.default.createElement(
        'div',
        { className: 'product-tracking-dashboard' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_TeamSelector2.default, { labelPosition: 'left' })
          )
        ),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Team Tracking'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Velocity2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_SprintBurndown2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Happiness2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-6 columns' },
            _react2.default.createElement(_Satisfaction2.default, null)
          )
        )
      );
    }
  }]);

  return ProductTeamTracking;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(ProductTeamTracking);

});

require.register("js/components/dashboards/product_tracking/ProductTracking.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _ReleaseBurnup = require('./ReleaseBurnup');

var _ReleaseBurnup2 = _interopRequireDefault(_ReleaseBurnup);

var _dashboards = require('../../dashboards');

var _OverviewTable = require('./OverviewTable');

var _OverviewTable2 = _interopRequireDefault(_OverviewTable);

var _Breadcrumb = require('../../Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _DashboardTitle = require('../../DashboardTitle');

var _DashboardTitle2 = _interopRequireDefault(_DashboardTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductTracking = function (_Component) {
  _inherits(ProductTracking, _Component);

  function ProductTracking() {
    _classCallCheck(this, ProductTracking);

    return _possibleConstructorReturn(this, (ProductTracking.__proto__ || Object.getPrototypeOf(ProductTracking)).apply(this, arguments));
  }

  _createClass(ProductTracking, [{
    key: 'render',
    value: function render() {
      var breadcrumbLinks = [{
        view: _dashboards.Dashboard,
        label: "Home"
      }, {
        view: ProductTracking,
        label: "Product Tracking"
      }];
      return _react2.default.createElement(
        'div',
        { className: 'product-tracking-dashboard' },
        _react2.default.createElement(_Breadcrumb2.default, { links: breadcrumbLinks }),
        _react2.default.createElement(
          _DashboardTitle2.default,
          null,
          'Product Tracking'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'medium-8 columns' },
            _react2.default.createElement(_ReleaseBurnup2.default, { className: 'main-visualisation' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-4 columns' },
            _react2.default.createElement(_OverviewTable2.default, null)
          )
        )
      );
    }
  }]);

  return ProductTracking;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(ProductTracking);

});

require.register("js/components/dashboards/product_tracking/ReleaseBurnup.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _release_burnup = require('./release_burnup');

var _MultiBarChart = require('../../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReleaseBurnup = function (_Component) {
  _inherits(ReleaseBurnup, _Component);

  function ReleaseBurnup(props) {
    _classCallCheck(this, ReleaseBurnup);

    var _this = _possibleConstructorReturn(this, (ReleaseBurnup.__proto__ || Object.getPrototypeOf(ReleaseBurnup)).call(this, props));

    _this.handleChangeBreakdown = _this.handleChangeBreakdown.bind(_this);
    return _this;
  }

  _createClass(ReleaseBurnup, [{
    key: 'handleChangeBreakdown',
    value: function handleChangeBreakdown(event) {
      this.props.burnupBreakdownByTeams(event.target.value);
    }
  }, {
    key: 'chartOptions',
    value: function chartOptions() {
      var opts = Object.assign({}, this.props.options, {
        scales: {
          yAxes: [{
            id: "bars",
            stacked: true,
            ticks: {
              min: 0,
              max: 4000
            }
          }, {
            id: "lines",
            stacked: false,
            display: false,
            ticks: {
              min: 0,
              max: 4000
            }
          }]
        }
      });
      return opts;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          _MultiBarChart2.default,
          { data: this.props.chartData, options: this.chartOptions() },
          _react2.default.createElement(
            'div',
            { className: 'columns row' },
            _react2.default.createElement(
              'h3',
              { className: 'float-left' },
              'Release Burnup \xA0',
              _react2.default.createElement(
                'button',
                { onClick: this.handleChangeBreakdown, className: 'button small float-right' },
                'Toggle Breakdown'
              )
            )
          )
        )
      );
    }
  }]);

  return ReleaseBurnup;
}(_react.Component);

;

function mapStateToProps(state) {
  var burnupFunc = void 0;
  if (state.metrics.options.burnupTeamBreakdown) {
    burnupFunc = _release_burnup.releaseBurnupByTeam;
  } else {
    burnupFunc = _release_burnup.releaseBurnup;
  };
  return {
    chartData: burnupFunc(state.metrics.release)
  };
};

function matchDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    burnupBreakdownByTeams: _actions.burnupBreakdownByTeams
  }, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(ReleaseBurnup);

});

require.register("js/components/dashboards/product_tracking/Satisfaction.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _MultiBarChart = require('../../charts/MultiBarChart');

var _MultiBarChart2 = _interopRequireDefault(_MultiBarChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Satisfaction = function (_Component) {
  _inherits(Satisfaction, _Component);

  function Satisfaction() {
    _classCallCheck(this, Satisfaction);

    return _possibleConstructorReturn(this, (Satisfaction.__proto__ || Object.getPrototypeOf(Satisfaction)).apply(this, arguments));
  }

  _createClass(Satisfaction, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_MultiBarChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Satisfaction' });
    }
  }]);

  return Satisfaction;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: 5,
          beginAtZero: true
        }
      }]
    }
  };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).satisfactionData(),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Satisfaction);

});

require.register("js/components/dashboards/product_tracking/SprintBurndown.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _LineChart = require('../../charts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

var _SprintSelector = require('../../SprintSelector');

var _SprintSelector2 = _interopRequireDefault(_SprintSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprintBurndown = function (_Component) {
  _inherits(SprintBurndown, _Component);

  function SprintBurndown() {
    _classCallCheck(this, SprintBurndown);

    return _possibleConstructorReturn(this, (SprintBurndown.__proto__ || Object.getPrototypeOf(SprintBurndown)).apply(this, arguments));
  }

  _createClass(SprintBurndown, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _LineChart2.default,
          { data: this.props.chartData, options: this.props.options },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'small-6 columns' },
              _react2.default.createElement(
                'h3',
                null,
                'Sprint Burndown'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'small-6 columns' },
              _react2.default.createElement(_SprintSelector2.default, null)
            )
          )
        )
      );
    }
  }]);

  return SprintBurndown;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      currentSprint = state.metrics.options.focusedSprint || 1,
      sprints = state.metrics.release.sprintsForTeam(currentTeam),
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: state.metrics.release.maximumPoints(),
          beginAtZero: true
        }
      }]
    }
  },
      chartData = sprints.length == 0 ? [] : sprints[currentSprint - 1].burndownData();
  return {
    chartData: chartData,
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SprintBurndown);

});

require.register("js/components/dashboards/product_tracking/Velocity.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BarLineChart = require('../../charts/BarLineChart');

var _BarLineChart2 = _interopRequireDefault(_BarLineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Velocity = function (_Component) {
  _inherits(Velocity, _Component);

  function Velocity() {
    _classCallCheck(this, Velocity);

    return _possibleConstructorReturn(this, (Velocity.__proto__ || Object.getPrototypeOf(Velocity)).apply(this, arguments));
  }

  _createClass(Velocity, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_BarLineChart2.default, { data: this.props.chartData, options: this.props.options, title: 'Velocity' });
    }
  }]);

  return Velocity;
}(_react.Component);

function mapStateToProps(state) {
  var currentTeam = state.metrics.currentTeam,
      options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          max: state.metrics.release.maximumPoints(),
          beginAtZero: true
        }
      }]
    }
  };
  return {
    chartData: state.metrics.release.velocityData(currentTeam),
    options: options
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Velocity);

});

require.register("js/components/dashboards/product_tracking/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProductTracking = require('./ProductTracking');

var _ProductTracking2 = _interopRequireDefault(_ProductTracking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ProductTracking2.default;

});

require.register("js/components/dashboards/product_tracking/overview.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultSprintCount = 4; // Number of sprints to take for overview purposes

var Overview = function () {
  function Overview(release) {
    var sprintCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSprintCount;

    _classCallCheck(this, Overview);

    this.release = release;
    this.sprintCount = sprintCount;
  }

  _createClass(Overview, [{
    key: "relevantSprints",
    value: function relevantSprints(teamName) {
      return this.release.sprintsForTeam(teamName).slice(-1 * this.sprintCount);
    }
  }, {
    key: "velocityVariances",
    value: function velocityVariances(teamName) {
      var storyPoints = this.relevantSprints(teamName).map(function (sprint) {
        return sprint.completedStoryPoints();
      }),
          variances = storyPoints.reduce(function (allVariances, points, idx) {
        if (idx == 0) {
          return [];
        } else {
          var previousPoints = storyPoints[idx - 1],
              percentageVariance = Math.abs(points - previousPoints) / previousPoints;
          allVariances.push(percentageVariance);
          return allVariances;
        }
      }, []);
      return variances;
    }
  }, {
    key: "averageVelocityVariance",
    value: function averageVelocityVariance(teamName) {
      var totalVariances = this.velocityVariances(teamName).reduce(function (sum, variance) {
        return sum + variance;
      }, 0),
          numVariances = this.velocityVariances(teamName).length;
      return totalVariances / numVariances;
    }
  }, {
    key: "deliveryVariances",
    value: function deliveryVariances(teamName) {
      var variances = this.relevantSprints(teamName).map(function (sprint) {
        return Math.abs(sprint.completedStoryPoints() - sprint.committedStoryPoints()) / sprint.committedStoryPoints();
      });
      return variances;
    }
  }, {
    key: "averageDeliveryVariance",
    value: function averageDeliveryVariance(teamName) {
      var totalVariances = this.deliveryVariances(teamName).reduce(function (sum, variance) {
        return sum + variance;
      }, 0),
          numVariances = this.deliveryVariances(teamName).length;
      return totalVariances / numVariances;
    }
  }, {
    key: "makeIndicator",
    value: function makeIndicator(value) {
      if (value <= 0.05) {
        return "GREEN";
      } else if (value <= 0.1) {
        return "YELLOW";
      } else {
        return "RED";
      }
    }
  }, {
    key: "velocityIndicator",
    value: function velocityIndicator(teamName) {
      return this.makeIndicator(this.averageVelocityVariance(teamName));
    }
  }, {
    key: "deliveryIndicator",
    value: function deliveryIndicator(teamName) {
      return this.makeIndicator(this.averageDeliveryVariance(teamName));
    }
  }]);

  return Overview;
}();

exports.default = Overview;

});

require.register("js/components/dashboards/product_tracking/release_burnup.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.releaseStatus = exports.releaseBurnupByTeam = exports.releaseBurnup = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dates = require('../../../lib/dates');

var _array = require('../../../lib/array');

var _rgb = require('../../../lib/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var excludeNonFridays = function excludeNonFridays(date) {
  return date.getDay() != 5;
};

var teamColours = [new _rgb2.default(0, 84, 139), // Blue
new _rgb2.default(38, 166, 91), // Green
new _rgb2.default(17, 216, 194), // Cyan
new _rgb2.default(247, 202, 24), // Yellow
new _rgb2.default(237, 136, 20), //Orange
new _rgb2.default(207, 30, 15)];

var ReleaseBurnup = function () {
  function ReleaseBurnup(release) {
    _classCallCheck(this, ReleaseBurnup);

    this.release = release;
  }

  _createClass(ReleaseBurnup, [{
    key: 'startDate',
    value: function startDate() {
      return this.release.startDate();
    }

    /**
     * The scheduled end date for this release.
     *
     * @returns {Date}
     */

  }, {
    key: 'endDate',
    value: function endDate() {
      return this.release.endDate();
    }

    /**
     * Return the end date of the final sprint in this release, or the end of any
     * sprints currently in progress.
     *
     * @returns {Date}
     */

  }, {
    key: 'finalSprintEndDate',
    value: function finalSprintEndDate() {
      return this.release.finalSprintEndDate();
    }

    /**
     * List all user stories relating to this release.
     *
     * @returns {Array[UserStory]} - a list of all user stories contained within
     * this release
     */

  }, {
    key: 'allUserStories',
    value: function allUserStories() {
      var sprintsStories = this.release.sprints.map(function (sprint) {
        return sprint.userStories.map(function (story) {
          story.team = sprint.team;
          return story;
        });
      });
      return [].concat.apply([], sprintsStories, this.release.userStories);
    }

    /**
     * The dates to use in the burnup chart.
     *
     * Burnup uses Fridays for tracking dates. This lists all Fridays during the
     * release, up to the last Friday of any sprints currently in progress.
     *
     * @returns {Array[Date]}
     */

  }, {
    key: 'burnupDates',
    value: function burnupDates() {
      var dates = (0, _dates.makePeriod)(this.startDate(), this.finalSprintEndDate(), excludeNonFridays);
      return dates;
    }

    /**
     * The dates to use for tracking release scope.
     *
     * This is different from burnupDates, in that we wish to have all Fridays
     * until the scheduled release included. This function returns an array
     * containing all of these Fridays.
     *
     * @returns {Array[Date]}
     */

  }, {
    key: 'releaseDates',
    value: function releaseDates() {
      var dates = (0, _dates.makePeriod)(this.startDate(), (0, _dates.addDays)(this.endDate(), 1), excludeNonFridays);
      return dates;
    }

    /**
     * The dates to use for release trajectory.
     *
     * The release trajectory runs from the last set of actual figures, until the
     * content of the release is likely to be completed. Because we want to ensure
     * that the final sprint end date is included within these dates, we deduct
     * six days from this date. This ensures that it will be included.
     *
     * @returns {Array[Date]}
     */

  }, {
    key: 'releaseTrajectoryDates',
    value: function releaseTrajectoryDates() {
      var dates = (0, _dates.makePeriod)((0, _dates.addDays)(this.finalSprintEndDate(), -7), this.endDate(), excludeNonFridays);
      return dates;
    }

    /**
     * List all stories completed by the Friday of a given week.
     *
     * This function is cumulative, returning all stories completed during the
     * release before or on the given date.
     *
     * @returns {Array[Object]} - an array of objects containing date and stories
     * keys
     */

  }, {
    key: 'storiesByWeek',
    value: function storiesByWeek() {
      var _this = this;

      return this.burnupDates().map(function (date) {
        var stories = _this.allUserStories().filter(function (story) {
          return story.dateDone <= date;
        });
        return {
          date: date,
          stories: stories
        };
      });
    }

    /**
     * List the total story points within the sprint by week.
     *
     * This function counts the total points included within the release as at
     * the end of each week. It does not count completed stories; for that, see
     * cumulativePointsByWeek.
     *
     * @returns {Array[Object]} - a list of objects, each with a date and total
     * story points values
     */

  }, {
    key: 'totalPointsByWeek',
    value: function totalPointsByWeek() {
      var _this2 = this;

      return this.releaseDates().map(function (date) {
        var stories = _this2.allUserStories().filter(function (story) {
          return story.dateAdded <= date || !story.dateAdded;
        }),
            points = stories.reduce(function (total, story) {
          return total + story.storyPoints;
        }, 0);
        return {
          date: date,
          points: points
        };
      });
    }

    /**
     * List the cumulative total number of story points complete at the end of
     * each week.
     *
     * @returns {Array[Object]} - a list of objects, each with a date and total
     * points count completed
     */

  }, {
    key: 'cumulativePointsByWeek',
    value: function cumulativePointsByWeek() {
      return this.cumulativePointsByDateAndTeam().map(function (_ref) {
        var date = _ref.date,
            points = _ref.points;

        var totalPoints = Object.keys(points).reduce(function (total, teamName) {
          return total += points[teamName];
        }, 0);
        return {
          date: date,
          points: totalPoints
        };
      });
    }

    /**
     * List the cumulative total number of story points complete at the end of
     * each week, broken-down by team.
     *
     * @returns {Array[Object]} - a list of objects, each with a date and points
     * object, the latter containing a per-team breakdown of points complete
     */

  }, {
    key: 'cumulativePointsByDateAndTeam',
    value: function cumulativePointsByDateAndTeam() {
      return this.storiesByWeek().map(function (_ref2) {
        var date = _ref2.date,
            stories = _ref2.stories;

        var teamStories = (0, _array.groupBy)(stories, function (story) {
          return story.team.name;
        }),
            teamPoints = Object.keys(teamStories).reduce(function (allPoints, teamName) {
          var stories = teamStories[teamName],
              totalPoints = stories.reduce(function (total, story) {
            return total + story.storyPoints;
          }, 0);
          allPoints[teamName] = totalPoints;
          return allPoints;
        }, {});
        return {
          date: date,
          points: teamPoints
        };
      });
    }

    /**
     * List the cumulative total points over a time period, indexed by team.
     *
     * @returns {Object} - an object with team names as keys, and objects as
     * values, each value object containing dates associated with total points
     * completed by that team by that date
     */

  }, {
    key: 'cumulativePointsByTeam',
    value: function cumulativePointsByTeam() {
      return this.cumulativePointsByDateAndTeam().reduce(function (chartData, _ref3) {
        var date = _ref3.date,
            points = _ref3.points;

        Object.keys(points).forEach(function (teamName) {
          var teamData = chartData[teamName] || {};
          teamData[(0, _dates.shortDate)(date)] = points[teamName];
          chartData[teamName] = teamData;
        });
        return chartData;
      }, {});
    }

    /**
     * Generates a set of chart data breaking down progress by team by date.
     *
     * Uses cumulativePointsByTeam to obtain data, and reformats it for use within
     * a chart.
     *
     * @returns {Array[Object]} - chart data for plotting team progress over time
     */

  }, {
    key: 'teamBars',
    value: function teamBars() {
      var _this3 = this;

      return Object.keys(this.cumulativePointsByTeam()).map(function (teamName, idx) {
        return {
          description: "Team " + teamName,
          data: _this3.cumulativePointsByTeam()[teamName],
          backgroundColor: teamColours[idx]
        };
      });
    }

    /**
     * Generates a set of chart data for overall progress on release burnup.
     *
     * @returns {Array[Object]} - chart data for a single bar chart plotting
     * progress burning up the release
     */

  }, {
    key: 'totalBars',
    value: function totalBars() {
      var data = this.cumulativePointsByWeek().reduce(function (pointsData, _ref4) {
        var date = _ref4.date,
            points = _ref4.points;

        pointsData[(0, _dates.shortDate)(date)] = points;
        return pointsData;
      }, {});
      return [{
        description: "Completed Points",
        data: data,
        backgroundColor: new _rgb2.default(0, 84, 139),
        yAxisID: "bars"
      }];
    }

    /**
     * Generates a set of chart data for a scope line chart.
     *
     * The scope line plots overall release scope over time, illustrating where
     * additions are made to original scope.
     *
     * @returns {Array[Object]} - chart data for a scope line chart
     */

  }, {
    key: 'releaseScope',
    value: function releaseScope() {
      var data = this.totalPointsByWeek().reduce(function (chartData, _ref5) {
        var date = _ref5.date,
            points = _ref5.points;

        chartData[(0, _dates.shortDate)(date)] = points;
        return chartData;
      }, {});
      return [{
        description: "Release Scope",
        data: data,
        chartType: "line",
        lineTension: 0,
        steppedLine: true,
        borderColor: new _rgb2.default(0, 0, 0),
        borderDash: [10, 4],
        yAxisID: "lines"
      }];
    }

    /**
     * Generates a set of chart data for plotting release trajectory.
     *
     * Release trajectory illustrates the likely completion time for a release,
     * based on burn-up rates over the release. It provides a "cone of
     * uncertainty" for this purpose, illustrating best- and worst-case outcomes.
     */

  }, {
    key: 'releaseTrajectory',
    value: function releaseTrajectory() {
      var cumulativePoints = this.cumulativePointsByWeek(),
          currentCompletion = cumulativePoints[cumulativePoints.length - 1].points,
          weeklyPoints = cumulativePoints.map(function (_ref6, idx, allPoints) {
        var date = _ref6.date,
            points = _ref6.points;

        var previousPoints = idx == 0 ? 0 : allPoints[idx - 1].points;
        return {
          date: date,
          points: points - previousPoints
        };
      }),
          selectedPoints = weeklyPoints.slice(-6).map(function (entry) {
        return entry.points;
      }),
          averageWeeklyPoints = selectedPoints.reduce(function (total, points) {
        return total + points;
      }, 0) / selectedPoints.length,
          minWeeklyPoints = Math.min.apply(null, selectedPoints),
          maxWeeklyPoints = Math.max.apply(null, selectedPoints),
          valuesAtDates = this.releaseTrajectoryDates().map(function (date, idx) {
        return {
          date: date,
          average: currentCompletion + averageWeeklyPoints * idx,
          maximum: currentCompletion + maxWeeklyPoints * idx,
          minimum: currentCompletion + minWeeklyPoints * idx
        };
      }),
          _valuesAtDates$reduce = valuesAtDates.reduce(function (_ref7, _ref8) {
        var _ref9 = _slicedToArray(_ref7, 3),
            avgs = _ref9[0],
            mins = _ref9[1],
            maxs = _ref9[2];

        var date = _ref8.date,
            average = _ref8.average,
            minimum = _ref8.minimum,
            maximum = _ref8.maximum;

        avgs[(0, _dates.shortDate)(date)] = average;
        mins[(0, _dates.shortDate)(date)] = minimum;
        maxs[(0, _dates.shortDate)(date)] = maximum;
        return [avgs, mins, maxs];
      }, [{}, {}, {}]),
          _valuesAtDates$reduce2 = _slicedToArray(_valuesAtDates$reduce, 3),
          avgTrend = _valuesAtDates$reduce2[0],
          minTrend = _valuesAtDates$reduce2[1],
          maxTrend = _valuesAtDates$reduce2[2];

      return [{
        description: "Trajectory (Best Case)",
        data: maxTrend,
        chartType: "line",
        yAxisID: "lines",
        borderColor: new _rgb2.default(164, 224, 2)
      }, {
        description: "Trajectory (Worst Case)",
        data: minTrend,
        chartType: "line",
        yAxisID: "lines",
        borderColor: new _rgb2.default(224, 13, 2)
      }];
    }
  }, {
    key: 'releaseStatus',
    value: function releaseStatus() {
      var scope = this.releaseScope()[0],
          trajectory = this.releaseTrajectory(),
          releaseDate = this.release.plannedDate;
      var endScope = scope.data[(0, _dates.shortDate)(releaseDate)],
          worstCase = trajectory[1].data[(0, _dates.shortDate)(releaseDate)],
          bestCase = trajectory[0].data[(0, _dates.shortDate)(releaseDate)];
      if (worstCase > endScope) {
        return "GREEN";
      } else if (bestCase > endScope) {
        return "YELLOW";
      } else {
        return "RED";
      }
    }

    /**
     * Generate a set of data representing a release burn-up chart.
     *
     * A release burn-up consists of a series of bars, each of which indicates
     * the amount of progress made in story points by each team. It also includes
     * a line showing committed story points for this release. Additionally, it
     * includes a vertical line illustrating the scheduled release date (actual
     * stats).
     *
     * In addition to the actual stats, the burn-up contains projections.
     */

  }, {
    key: 'releaseBurnup',
    value: function releaseBurnup(breakdownByTeam) {
      var bars = void 0;
      if (breakdownByTeam) {
        bars = this.teamBars();
      } else {
        bars = this.totalBars();
      }
      var output = this.releaseScope().concat(this.releaseTrajectory(), bars);
      console.log("Release burnup", output);
      return output;
    }
  }]);

  return ReleaseBurnup;
}();

var releaseBurnup = function releaseBurnup(release) {
  return new ReleaseBurnup(release).releaseBurnup(false);
};

var releaseBurnupByTeam = function releaseBurnupByTeam(release) {
  return new ReleaseBurnup(release).releaseBurnup(true);
};

var releaseStatus = function releaseStatus(release) {
  return new ReleaseBurnup(release).releaseStatus();
};

exports.releaseBurnup = releaseBurnup;
exports.releaseBurnupByTeam = releaseBurnupByTeam;
exports.releaseStatus = releaseStatus;

});

require.register("js/lib/array.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Group an array of values by the return value of a function.
 *
 * This function takes an array and groups all members of it using the return
 * value of the passed function.
 *
 * @param {Array[a]} arr - input array
 * @param {a -> b} groupFunction - function to use to group array values
 * @returns {Object} - an object with the group value as key, and an array of
 * grouped values as value
 */
var groupBy = function groupBy(arr, groupFunction) {
  return arr.reduce(function (grouped, element) {
    var key = groupFunction(element);
    (grouped[key] = grouped[key] || []).push(element);
    return grouped;
  }, {});
};

exports.groupBy = groupBy;

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

var defaultColours = [new _rgb2.default(0, 84, 139), // Blue
new _rgb2.default(38, 166, 91), // Green
new _rgb2.default(17, 216, 194), // Cyan
new _rgb2.default(247, 202, 24), // Yellow
new _rgb2.default(237, 136, 20), //Orange
new _rgb2.default(192, 96, 64), //Redish oranga
new _rgb2.default(237, 209, 112), //Bone
new _rgb2.default(65, 36, 15), // Brown
new _rgb2.default(137, 12, 198), // Purple
new _rgb2.default(207, 30, 15), // Red
new _rgb2.default(0, 84, 139), // Blue
new _rgb2.default(38, 166, 91), // Green
new _rgb2.default(17, 216, 194), // Cyan
new _rgb2.default(247, 202, 24), // Yellow
new _rgb2.default(237, 136, 20), //Orange
new _rgb2.default(192, 96, 64), //Redish oranga
new _rgb2.default(237, 209, 112), //Bone
new _rgb2.default(65, 36, 15), // Brown
new _rgb2.default(137, 12, 198), // Purple
new _rgb2.default(207, 30, 15)];

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
  var sortLabels = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var makeDataset = function makeDataset(data, i) {
    var type = data.type || chartType,
        borderDash = data.borderDash || [],
        colour = data.borderColor || data.backgroundColor || colours[i],
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
      type: data.type,
      yAxisID: data.yAxisID
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
      case "filledLine":
        var filledLineData = {
          fill: true,
          backgroundColor: colour.toRGBA(opacity),
          pointRadius: 0,
          lineTension: 0.1,
          borderWidth: 2
        };
        return Object.assign(basicData, filledLineData);
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

require.register("js/lib/dates.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** Dates module.

    This module contains miscellaneous functionality for the use of data within
    this prototype.

*/

/**
 * Create an array of date values representing a period of time.

 * @param {date} startDate - The start date for the period
 * @param {date} endDate - The end date for the period (inclusive)
 * @param {date -> bool} excludePredicate - An optional function to determine
 * which dates to skip within the range (where this value is true, the date is
 * skipped)
 */
function makePeriod(startDate, endDate, excludePredicate) {
  var dayLength = 24 * 60 * 60 * 1000,
      // Day length in ms
  periodLength = Math.ceil((endDate - startDate) / dayLength);
  if (startDate > endDate) {
    return [];
  } else {
    return [].concat(_toConsumableArray(Array(periodLength + 1).keys())).reduce(function (periodDates, dayNumber) {
      var nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + dayNumber);
      nextDate.setUTCHours(0);
      if (excludePredicate && excludePredicate(nextDate)) {
        return periodDates;
      } else {
        return periodDates.concat([nextDate]);
      }
    }, []);
  };
};

/**
 * Add a number of days to a date.
 *
 * @param {Date} date - the date to which to add days
 * @param {Integer} days - the number of days to add
 * @returns {Date} - the modified date 
 */
function addDays(date, days) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * Calculate the difference between two dates.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Integer} - the number of days between two dates 
 */
function dateDiff(date1, date2) {
  var milliseconds = date2 - date1;
  return Math.round(Math.abs(milliseconds / (1000 * 60 * 60 * 24)));
}

/**
 * Create a form string formatting of a date.
 *
 * @param {Date} date
 * @returns {String} - the date formatted in short form
 */
function shortDate(date) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      day = date.getDate(),
      monthNum = date.getMonth(),
      year = date.getFullYear();
  return day + " " + months[monthNum] + " " + year;
}

/**
 * Create a very short form formatting of a date.
 *
 * @param {Date} date
 * @returns {String} - the date formatted as "dd/mm"
 */
function veryShortDate(date) {
  return date.getDate() + "/" + (date.getMonth() + 1);
}

exports.makePeriod = makePeriod;
exports.addDays = addDays;
exports.dateDiff = dateDiff;
exports.shortDate = shortDate;
exports.veryShortDate = veryShortDate;

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

require.register("js/mocked_data/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teams = exports.release = undefined;

var _release = require('./release');

var _teams = require('./teams');

exports.release = _release.release;
exports.teams = _teams.teams;

});

require.register("js/mocked_data/release.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = exports.sprints = undefined;

var _teams = require('./teams');

var _user_stories = require('./user_stories');

var _user_stories2 = _interopRequireDefault(_user_stories);

var _dates = require('../lib/dates');

var _model = require('../model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * @fileOverview Contains mocked sprints data for use within the dashboard
                                                                                                                                                                                                     * prototype. Five sprints for each of six teams are mocked. The sprints are
                                                                                                                                                                                                     * then combined into a mocked release.
                                                                                                                                                                                                     */

var createSprints = function createSprints(teamName) {
  return [].concat(_toConsumableArray(Array(5).keys())).map(function (sprintNumber) {
    var startDate = (0, _dates.addDays)(_teams.startingDates[teamName], sprintNumber * 21),
        endDate = (0, _dates.addDays)(startDate, 12),
        team = _teams.teams[teamName],
        stories = _user_stories2.default[teamName][sprintNumber];
    return new _model.Sprint(team, sprintNumber + 1, stories, startDate, endDate);
  });
},
    sprints = [].concat.apply([], _teams.teams.teamNames.map(createSprints)),
    release = new _model.Release(_user_stories2.default.unassigned, new Date("2017-05-26"));

release.sprints = sprints;

exports.sprints = sprints;
exports.release = release;

});

require.register("js/mocked_data/teams.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teams = exports.startingDates = undefined;

var _dates = require('../lib/dates');

var _model = require('../model');

var _defects = require('./teams/defects');

var _defects2 = _interopRequireDefault(_defects);

var _practices = require('./teams/practices');

var _practices2 = _interopRequireDefault(_practices);

var _happiness = require('./teams/happiness');

var _happiness2 = _interopRequireDefault(_happiness);

var _satisfaction = require('./teams/satisfaction');

var _satisfaction2 = _interopRequireDefault(_satisfaction);

var _time_breakdowns = require('./teams/time_breakdowns');

var _time_breakdowns2 = _interopRequireDefault(_time_breakdowns);

var _code_ownership = require('./teams/code_ownership');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------------------------------------- //
// Create Teams //

/**
 * @fileOverview Contains mocked team data for use within the dashboard
 * prototype. Six teams are mocked, together with their associated assessments,
 * time breakdowns and defects.
 *
 * The timescale for activities of these teams is taken to be from January 2017
 * and five sprints onwards. Each sprint is 2 weeks long, with a 1 week break
 * in between.
 *
 * Data is here: https://docs.google.com/spreadsheets/d/1uyrMFglZ--AyONmUNv0L8YmV_NMoBCPQMwvjMJam1iA/pubhtml
 */
var teams = {
  alpha: new _model.Team("α"),
  beta: new _model.Team("β"),
  epsilon: new _model.Team("ε"),
  lambda: new _model.Team("λ"),
  theta: new _model.Team("θ"),
  tau: new _model.Team("τ")
};

// Define starting dates for first sprints (not needed here, but needed
// elsewhere).
var startingDates = {
  alpha: new Date("2017-01-09"),
  beta: new Date("2017-01-16"),
  epsilon: new Date("2017-01-16"),
  lambda: new Date("2017-01-23"),
  theta: new Date("2017-01-30"),
  tau: new Date("2017-01-30")
};

// -------------------------------------------------------------------------- //
// Assign Assessments to Teams //

teams.teamNames = Object.keys(teams);

teams.shortNames = teams.teamNames.map(function (teamName) {
  return teams[teamName].name;
});

teams.selectTeam = function (teamName) {
  return teams.teamNames.map(function (k) {
    return teams[k];
  }).find(function (team) {
    return team.name == teamName;
  });
};

teams.allTeams = teams.teamNames.map(function (teamName) {
  return teams[teamName];
});

teams.teamNames.forEach(function (teamName) {
  var calcFriday = function calcFriday(weekNum) {
    return (0, _dates.addDays)(startingDates[teamName], 4 + weekNum * 7);
  },
      calcRetro = function calcRetro(sprintNum) {
    return (0, _dates.addDays)(startingDates[teamName], 16 + sprintNum * 21);
  },
      happiness = _happiness2.default[teamName].map(function (happinessValue, idx) {
    return new _model.Happiness(happinessValue, calcFriday(idx));
  }),
      satisfaction = _satisfaction2.default[teamName].map(function (satisfactionValue, idx) {
    return new _model.Satisfaction(satisfactionValue, calcRetro(idx));
  }),
      timeBreakdown = _time_breakdowns2.default[teamName].map(function (breakdownValue, idx) {
    return new _model.TimeBreakdown(breakdownValue, calcRetro(idx));
  }),
      practices = _practices2.default[teamName],
      teamDefects = _defects2.default[teamName],
      teamcodeOwnership = _code_ownership.codeOwnership[teamName];

  teams[teamName].happinessAssessments = happiness;
  teams[teamName].satisfactionAssessments = satisfaction;
  teams[teamName].timeBreakdowns = timeBreakdown;
  teams[teamName].practiceAssessments = practices;
  teams[teamName].defects = teamDefects;
  teams[teamName].repositories = teamcodeOwnership;
});

exports.startingDates = startingDates;
exports.teams = teams;

});

require.register("js/mocked_data/teams/code_ownership.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.codeOwnership = undefined;

var _model = require('../../model');

var codeOwnership = {
    alpha: [new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }])],
    beta: [new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }])],
    epsilon: [new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }])],
    lambda: [new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }])],
    theta: [new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }])],
    tau: [new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 12 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }, { id: 4, contributions: 87 }, { id: 5, contributions: 102 }, { id: 6, contributions: 87 }]), new _model.Repository([{ id: 0, contributions: 12 }, { id: 1, contributions: 10 }]), new _model.Repository([{ id: 0, contributions: 1002 }, { id: 1, contributions: 10 }, { id: 2, contributions: 12 }, { id: 3, contributions: 102 }])]
};

exports.codeOwnership = codeOwnership;

});

require.register("js/mocked_data/teams/defects.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require("../../model");

// Mock a series of defects. These were randomly generated, going up to the
// middle of May 2017.
var defects = {
  alpha: [new _model.Defect("", 2, new Date("2017-01-09"), new Date("2017-01-18")), new _model.Defect("", 1, new Date("2017-01-11"), new Date("2017-01-27")), new _model.Defect("", 5, new Date("2017-01-12"), new Date("2017-01-29")), new _model.Defect("", 3, new Date("2017-01-12"), new Date("2017-01-29")), new _model.Defect("", 3, new Date("2017-01-12"), new Date("2017-01-23")), new _model.Defect("", 3, new Date("2017-01-14"), new Date("2017-02-10")), new _model.Defect("", 3, new Date("2017-01-15"), new Date("2017-01-15")), new _model.Defect("", 3, new Date("2017-01-17"), new Date("2017-01-18")), new _model.Defect("", 3, new Date("2017-01-19"), new Date("2017-02-01")), new _model.Defect("", 5, new Date("2017-01-21"), new Date("2017-02-15")), new _model.Defect("", 5, new Date("2017-01-23"), new Date("2017-02-10")), new _model.Defect("", 4, new Date("2017-01-23"), new Date("2017-02-17")), new _model.Defect("", 1, new Date("2017-01-25"), new Date("2017-02-08")), new _model.Defect("", 2, new Date("2017-01-27"), new Date("2017-02-04")), new _model.Defect("", 1, new Date("2017-01-28"), new Date("2017-01-31")), new _model.Defect("", 5, new Date("2017-01-30"), new Date("2017-02-11")), new _model.Defect("", 5, new Date("2017-01-30"), new Date("2017-02-21")), new _model.Defect("", 2, new Date("2017-01-30"), new Date("2017-02-15")), new _model.Defect("", 1, new Date("2017-01-30"), new Date("2017-02-12")), new _model.Defect("", 1, new Date("2017-01-31"), new Date("2017-02-02")), new _model.Defect("", 2, new Date("2017-02-01"), new Date("2017-02-12")), new _model.Defect("", 4, new Date("2017-02-03"), new Date("2017-02-03")), new _model.Defect("", 2, new Date("2017-02-04"), new Date("2017-03-02")), new _model.Defect("", 2, new Date("2017-02-05"), new Date("2017-02-24")), new _model.Defect("", 1, new Date("2017-02-06"), new Date("2017-02-13")), new _model.Defect("", 1, new Date("2017-02-06"), new Date("2017-02-09")), new _model.Defect("", 3, new Date("2017-02-06"), new Date("2017-02-21")), new _model.Defect("", 1, new Date("2017-02-06"), new Date("2017-02-28")), new _model.Defect("", 4, new Date("2017-02-08"), new Date("2017-02-09")), new _model.Defect("", 1, new Date("2017-02-09"), new Date("2017-02-26")), new _model.Defect("", 5, new Date("2017-02-09"), new Date("2017-02-18")), new _model.Defect("", 4, new Date("2017-02-09"), new Date("2017-03-05")), new _model.Defect("", 4, new Date("2017-02-11"), new Date("2017-02-12")), new _model.Defect("", 2, new Date("2017-02-11"), new Date("2017-02-12")), new _model.Defect("", 1, new Date("2017-02-12"), new Date("2017-02-27")), new _model.Defect("", 4, new Date("2017-02-12"), new Date("2017-03-04")), new _model.Defect("", 1, new Date("2017-02-13"), new Date("2017-03-14")), new _model.Defect("", 3, new Date("2017-02-15"), new Date("2017-02-17")), new _model.Defect("", 4, new Date("2017-02-15"), new Date("2017-02-24")), new _model.Defect("", 2, new Date("2017-02-17"), new Date("2017-02-23")), new _model.Defect("", 2, new Date("2017-02-18"), new Date("2017-02-21")), new _model.Defect("", 2, new Date("2017-02-18"), new Date("2017-02-28")), new _model.Defect("", 4, new Date("2017-02-19"), new Date("2017-02-21")), new _model.Defect("", 1, new Date("2017-02-19"), new Date("2017-03-12")), new _model.Defect("", 3, new Date("2017-02-20"), new Date("2017-02-23")), new _model.Defect("", 5, new Date("2017-02-21"), new Date("2017-03-17")), new _model.Defect("", 2, new Date("2017-02-22"), new Date("2017-03-08")), new _model.Defect("", 1, new Date("2017-02-22"), new Date("2017-02-25")), new _model.Defect("", 1, new Date("2017-02-22"), new Date("2017-03-10")), new _model.Defect("", 1, new Date("2017-02-22"), new Date("2017-02-26")), new _model.Defect("", 5, new Date("2017-02-24"), new Date("2017-03-09")), new _model.Defect("", 5, new Date("2017-02-25"), new Date("2017-02-25")), new _model.Defect("", 3, new Date("2017-02-25"), new Date("2017-03-19")), new _model.Defect("", 4, new Date("2017-02-26"), new Date("2017-03-12")), new _model.Defect("", 5, new Date("2017-02-27"), new Date("2017-03-23")), new _model.Defect("", 5, new Date("2017-03-01"), new Date("2017-03-14")), new _model.Defect("", 1, new Date("2017-03-01"), new Date("2017-03-18")), new _model.Defect("", 2, new Date("2017-03-03"), new Date("2017-03-11")), new _model.Defect("", 4, new Date("2017-03-03"), new Date("2017-03-21")), new _model.Defect("", 2, new Date("2017-03-05"), new Date("2017-03-26")), new _model.Defect("", 2, new Date("2017-03-07"), new Date("2017-03-10")), new _model.Defect("", 3, new Date("2017-03-09"), new Date("2017-03-27")), new _model.Defect("", 1, new Date("2017-03-09"), new Date("2017-03-27")), new _model.Defect("", 3, new Date("2017-03-10"), new Date("2017-03-26")), new _model.Defect("", 4, new Date("2017-03-10"), new Date("2017-04-05")), new _model.Defect("", 3, new Date("2017-03-11"), new Date("2017-03-27")), new _model.Defect("", 3, new Date("2017-03-11"), new Date("2017-03-20")), new _model.Defect("", 2, new Date("2017-03-11"), new Date("2017-03-22")), new _model.Defect("", 3, new Date("2017-03-13"), new Date("2017-03-31")), new _model.Defect("", 3, new Date("2017-03-15"), new Date("2017-03-20")), new _model.Defect("", 1, new Date("2017-03-16"), new Date("2017-03-30")), new _model.Defect("", 5, new Date("2017-03-16"), new Date("2017-04-09")), new _model.Defect("", 5, new Date("2017-03-17"), new Date("2017-03-30")), new _model.Defect("", 2, new Date("2017-03-19"), new Date("2017-03-25")), new _model.Defect("", 4, new Date("2017-03-19"), new Date("2017-04-06")), new _model.Defect("", 5, new Date("2017-03-21"), new Date("2017-04-14")), new _model.Defect("", 3, new Date("2017-03-22"), new Date("2017-04-13")), new _model.Defect("", 3, new Date("2017-03-24"), new Date("2017-03-24")), new _model.Defect("", 3, new Date("2017-03-25"), new Date("2017-04-03")), new _model.Defect("", 1, new Date("2017-03-26"), new Date("2017-04-11")), new _model.Defect("", 3, new Date("2017-03-27"), new Date("2017-04-18")), new _model.Defect("", 3, new Date("2017-03-29"), new Date("2017-04-23")), new _model.Defect("", 5, new Date("2017-03-31"), new Date("2017-04-05")), new _model.Defect("", 4, new Date("2017-04-02"), new Date("2017-04-07")), new _model.Defect("", 1, new Date("2017-04-03"), new Date("2017-05-01")), new _model.Defect("", 2, new Date("2017-04-05"), new Date("2017-04-10")), new _model.Defect("", 3, new Date("2017-04-06"), new Date("2017-04-18")), new _model.Defect("", 1, new Date("2017-04-07"), new Date("2017-04-21")), new _model.Defect("", 2, new Date("2017-04-07"), new Date("2017-04-09")), new _model.Defect("", 4, new Date("2017-04-07"), new Date("2017-04-24")), new _model.Defect("", 2, new Date("2017-04-08"), new Date("2017-04-28")), new _model.Defect("", 4, new Date("2017-04-08"), new Date("2017-05-07")), new _model.Defect("", 4, new Date("2017-04-10"), new Date("2017-04-19")), new _model.Defect("", 5, new Date("2017-04-11"), new Date("2017-05-03")), new _model.Defect("", 5, new Date("2017-04-13"), new Date("2017-05-02")), new _model.Defect("", 3, new Date("2017-04-15"), new Date("2017-05-10")), new _model.Defect("", 5, new Date("2017-04-17"), new Date("2017-04-23")), new _model.Defect("", 4, new Date("2017-04-17"), new Date("2017-05-02")), new _model.Defect("", 1, new Date("2017-04-17"), new Date("2017-04-26")), new _model.Defect("", 1, new Date("2017-04-17"), new Date("2017-05-05")), new _model.Defect("", 1, new Date("2017-04-18"), new Date("2017-04-18")), new _model.Defect("", 4, new Date("2017-04-19"), new Date("2017-05-11")), new _model.Defect("", 1, new Date("2017-04-21"), new Date("2017-05-04")), new _model.Defect("", 1, new Date("2017-04-21"), new Date("2017-05-10")), new _model.Defect("", 5, new Date("2017-04-21"), new Date("2017-04-29")), new _model.Defect("", 1, new Date("2017-04-21"), new Date("2017-05-10")), new _model.Defect("", 5, new Date("2017-04-23"), null), new _model.Defect("", 2, new Date("2017-04-25"), new Date("2017-04-26")), new _model.Defect("", 4, new Date("2017-04-27"), new Date("2017-05-03")), new _model.Defect("", 4, new Date("2017-04-27"), null), new _model.Defect("", 4, new Date("2017-04-29"), null), new _model.Defect("", 4, new Date("2017-04-30"), new Date("2017-05-11")), new _model.Defect("", 3, new Date("2017-04-30"), null), new _model.Defect("", 5, new Date("2017-04-30"), new Date("2017-05-08")), new _model.Defect("", 5, new Date("2017-05-01"), null), new _model.Defect("", 2, new Date("2017-05-01"), null), new _model.Defect("", 5, new Date("2017-05-03"), null), new _model.Defect("", 4, new Date("2017-05-03"), null), new _model.Defect("", 5, new Date("2017-05-05"), null), new _model.Defect("", 4, new Date("2017-05-07"), null), new _model.Defect("", 4, new Date("2017-05-08"), null), new _model.Defect("", 3, new Date("2017-05-08"), null), new _model.Defect("", 2, new Date("2017-05-09"), new Date("2017-05-09")), new _model.Defect("", 2, new Date("2017-05-09"), null), new _model.Defect("", 4, new Date("2017-05-09"), new Date("2017-05-11")), new _model.Defect("", 5, new Date("2017-05-09"), null), new _model.Defect("", 3, new Date("2017-05-09"), null), new _model.Defect("", 1, new Date("2017-05-10"), null), new _model.Defect("", 2, new Date("2017-05-11"), null), new _model.Defect("", 3, new Date("2017-05-12"), null)],
  beta: [new _model.Defect("", 2, new Date("2017-01-16"), new Date("2017-02-13")), new _model.Defect("", 4, new Date("2017-01-16"), new Date("2017-02-01")), new _model.Defect("", 1, new Date("2017-01-17"), new Date("2017-02-15")), new _model.Defect("", 3, new Date("2017-01-17"), new Date("2017-01-17")), new _model.Defect("", 4, new Date("2017-01-18"), new Date("2017-01-19")), new _model.Defect("", 5, new Date("2017-01-18"), new Date("2017-01-19")), new _model.Defect("", 5, new Date("2017-01-20"), new Date("2017-01-24")), new _model.Defect("", 4, new Date("2017-01-20"), new Date("2017-02-02")), new _model.Defect("", 4, new Date("2017-01-21"), new Date("2017-02-07")), new _model.Defect("", 1, new Date("2017-01-23"), new Date("2017-02-09")), new _model.Defect("", 1, new Date("2017-01-23"), new Date("2017-02-20")), new _model.Defect("", 5, new Date("2017-01-23"), new Date("2017-01-25")), new _model.Defect("", 2, new Date("2017-01-25"), new Date("2017-02-16")), new _model.Defect("", 5, new Date("2017-01-26"), new Date("2017-02-14")), new _model.Defect("", 2, new Date("2017-01-27"), new Date("2017-01-27")), new _model.Defect("", 3, new Date("2017-01-28"), new Date("2017-02-24")), new _model.Defect("", 3, new Date("2017-01-29"), new Date("2017-02-20")), new _model.Defect("", 5, new Date("2017-01-30"), new Date("2017-02-20")), new _model.Defect("", 3, new Date("2017-01-31"), new Date("2017-02-17")), new _model.Defect("", 4, new Date("2017-02-01"), new Date("2017-02-20")), new _model.Defect("", 4, new Date("2017-02-02"), new Date("2017-02-27")), new _model.Defect("", 5, new Date("2017-02-03"), new Date("2017-02-05")), new _model.Defect("", 2, new Date("2017-02-05"), new Date("2017-02-16")), new _model.Defect("", 1, new Date("2017-02-06"), new Date("2017-02-19")), new _model.Defect("", 5, new Date("2017-02-08"), new Date("2017-02-28")), new _model.Defect("", 1, new Date("2017-02-10"), new Date("2017-02-28")), new _model.Defect("", 2, new Date("2017-02-11"), new Date("2017-03-07")), new _model.Defect("", 4, new Date("2017-02-11"), new Date("2017-03-02")), new _model.Defect("", 4, new Date("2017-02-12"), new Date("2017-02-12")), new _model.Defect("", 1, new Date("2017-02-12"), new Date("2017-03-03")), new _model.Defect("", 5, new Date("2017-02-14"), new Date("2017-02-14")), new _model.Defect("", 3, new Date("2017-02-15"), new Date("2017-03-04")), new _model.Defect("", 2, new Date("2017-02-15"), new Date("2017-02-22")), new _model.Defect("", 3, new Date("2017-02-16"), new Date("2017-03-08")), new _model.Defect("", 3, new Date("2017-02-18"), new Date("2017-02-18")), new _model.Defect("", 5, new Date("2017-02-19"), new Date("2017-03-05")), new _model.Defect("", 2, new Date("2017-02-19"), new Date("2017-03-15")), new _model.Defect("", 1, new Date("2017-02-19"), new Date("2017-02-22")), new _model.Defect("", 4, new Date("2017-02-19"), new Date("2017-02-20")), new _model.Defect("", 3, new Date("2017-02-19"), new Date("2017-02-19")), new _model.Defect("", 4, new Date("2017-02-21"), new Date("2017-03-03")), new _model.Defect("", 1, new Date("2017-02-23"), new Date("2017-03-17")), new _model.Defect("", 5, new Date("2017-02-24"), new Date("2017-02-26")), new _model.Defect("", 1, new Date("2017-02-24"), new Date("2017-03-26")), new _model.Defect("", 4, new Date("2017-02-24"), new Date("2017-03-19")), new _model.Defect("", 1, new Date("2017-02-26"), new Date("2017-03-05")), new _model.Defect("", 1, new Date("2017-02-26"), new Date("2017-03-07")), new _model.Defect("", 2, new Date("2017-02-27"), new Date("2017-03-18")), new _model.Defect("", 4, new Date("2017-02-28"), new Date("2017-03-06")), new _model.Defect("", 5, new Date("2017-03-01"), new Date("2017-03-05")), new _model.Defect("", 1, new Date("2017-03-03"), new Date("2017-03-19")), new _model.Defect("", 1, new Date("2017-03-04"), new Date("2017-03-22")), new _model.Defect("", 5, new Date("2017-03-04"), new Date("2017-03-09")), new _model.Defect("", 4, new Date("2017-03-06"), new Date("2017-03-19")), new _model.Defect("", 3, new Date("2017-03-07"), new Date("2017-03-21")), new _model.Defect("", 2, new Date("2017-03-08"), new Date("2017-03-13")), new _model.Defect("", 2, new Date("2017-03-08"), new Date("2017-03-20")), new _model.Defect("", 3, new Date("2017-03-08"), new Date("2017-03-18")), new _model.Defect("", 2, new Date("2017-03-10"), new Date("2017-03-20")), new _model.Defect("", 3, new Date("2017-03-11"), new Date("2017-03-28")), new _model.Defect("", 4, new Date("2017-03-11"), new Date("2017-03-12")), new _model.Defect("", 3, new Date("2017-03-11"), new Date("2017-03-28")), new _model.Defect("", 4, new Date("2017-03-11"), new Date("2017-03-19")), new _model.Defect("", 2, new Date("2017-03-11"), new Date("2017-03-25")), new _model.Defect("", 2, new Date("2017-03-12"), new Date("2017-03-18")), new _model.Defect("", 5, new Date("2017-03-14"), new Date("2017-03-19")), new _model.Defect("", 4, new Date("2017-03-15"), new Date("2017-04-11")), new _model.Defect("", 1, new Date("2017-03-16"), new Date("2017-04-11")), new _model.Defect("", 4, new Date("2017-03-18"), new Date("2017-03-20")), new _model.Defect("", 5, new Date("2017-03-20"), new Date("2017-04-12")), new _model.Defect("", 1, new Date("2017-03-22"), new Date("2017-03-23")), new _model.Defect("", 2, new Date("2017-03-24"), new Date("2017-04-19")), new _model.Defect("", 1, new Date("2017-03-26"), new Date("2017-03-30")), new _model.Defect("", 2, new Date("2017-03-27"), new Date("2017-04-19")), new _model.Defect("", 5, new Date("2017-03-29"), new Date("2017-03-31")), new _model.Defect("", 4, new Date("2017-03-30"), new Date("2017-04-20")), new _model.Defect("", 4, new Date("2017-03-30"), new Date("2017-03-30")), new _model.Defect("", 4, new Date("2017-04-01"), new Date("2017-04-01")), new _model.Defect("", 4, new Date("2017-04-02"), new Date("2017-04-12")), new _model.Defect("", 4, new Date("2017-04-02"), new Date("2017-04-08")), new _model.Defect("", 1, new Date("2017-04-04"), new Date("2017-04-27")), new _model.Defect("", 3, new Date("2017-04-06"), new Date("2017-05-02")), new _model.Defect("", 2, new Date("2017-04-06"), new Date("2017-04-08")), new _model.Defect("", 3, new Date("2017-04-08"), new Date("2017-04-26")), new _model.Defect("", 2, new Date("2017-04-09"), new Date("2017-04-19")), new _model.Defect("", 5, new Date("2017-04-11"), new Date("2017-04-15")), new _model.Defect("", 5, new Date("2017-04-11"), new Date("2017-04-26")), new _model.Defect("", 5, new Date("2017-04-13"), new Date("2017-05-01")), new _model.Defect("", 1, new Date("2017-04-15"), new Date("2017-05-06")), new _model.Defect("", 5, new Date("2017-04-16"), new Date("2017-04-18")), new _model.Defect("", 5, new Date("2017-04-18"), new Date("2017-04-23")), new _model.Defect("", 4, new Date("2017-04-18"), new Date("2017-05-02")), new _model.Defect("", 2, new Date("2017-04-20"), new Date("2017-05-01")), new _model.Defect("", 3, new Date("2017-04-20"), new Date("2017-05-05")), new _model.Defect("", 5, new Date("2017-04-20"), new Date("2017-04-20")), new _model.Defect("", 4, new Date("2017-04-20"), new Date("2017-05-11")), new _model.Defect("", 1, new Date("2017-04-20"), new Date("2017-05-01")), new _model.Defect("", 5, new Date("2017-04-21"), new Date("2017-04-28")), new _model.Defect("", 5, new Date("2017-04-22"), null), new _model.Defect("", 3, new Date("2017-04-24"), new Date("2017-04-29")), new _model.Defect("", 2, new Date("2017-04-24"), new Date("2017-05-03")), new _model.Defect("", 3, new Date("2017-04-25"), new Date("2017-05-01")), new _model.Defect("", 3, new Date("2017-04-27"), new Date("2017-05-04")), new _model.Defect("", 3, new Date("2017-04-28"), null), new _model.Defect("", 1, new Date("2017-04-29"), new Date("2017-04-30")), new _model.Defect("", 5, new Date("2017-04-30"), null), new _model.Defect("", 4, new Date("2017-05-02"), null), new _model.Defect("", 5, new Date("2017-05-03"), null), new _model.Defect("", 2, new Date("2017-05-04"), null), new _model.Defect("", 5, new Date("2017-05-06"), new Date("2017-05-10")), new _model.Defect("", 2, new Date("2017-05-06"), new Date("2017-05-11")), new _model.Defect("", 1, new Date("2017-05-08"), null), new _model.Defect("", 5, new Date("2017-05-09"), null), new _model.Defect("", 5, new Date("2017-05-09"), null), new _model.Defect("", 4, new Date("2017-05-11"), null)],
  epsilon: [new _model.Defect("", 1, new Date("2017-01-16"), new Date("2017-02-07")), new _model.Defect("", 5, new Date("2017-01-18"), new Date("2017-01-20")), new _model.Defect("", 5, new Date("2017-01-20"), new Date("2017-01-20")), new _model.Defect("", 1, new Date("2017-01-21"), new Date("2017-01-22")), new _model.Defect("", 1, new Date("2017-01-21"), new Date("2017-02-19")), new _model.Defect("", 3, new Date("2017-01-21"), new Date("2017-02-18")), new _model.Defect("", 2, new Date("2017-01-23"), new Date("2017-02-03")), new _model.Defect("", 4, new Date("2017-01-23"), new Date("2017-02-20")), new _model.Defect("", 4, new Date("2017-01-23"), new Date("2017-02-06")), new _model.Defect("", 1, new Date("2017-01-23"), new Date("2017-02-13")), new _model.Defect("", 2, new Date("2017-01-23"), new Date("2017-02-04")), new _model.Defect("", 3, new Date("2017-01-23"), new Date("2017-02-16")), new _model.Defect("", 2, new Date("2017-01-24"), new Date("2017-02-14")), new _model.Defect("", 3, new Date("2017-01-24"), new Date("2017-01-30")), new _model.Defect("", 1, new Date("2017-01-24"), new Date("2017-02-15")), new _model.Defect("", 1, new Date("2017-01-26"), new Date("2017-02-10")), new _model.Defect("", 3, new Date("2017-01-27"), new Date("2017-02-23")), new _model.Defect("", 5, new Date("2017-01-27"), new Date("2017-01-29")), new _model.Defect("", 5, new Date("2017-01-28"), new Date("2017-02-12")), new _model.Defect("", 1, new Date("2017-01-29"), new Date("2017-02-21")), new _model.Defect("", 5, new Date("2017-01-31"), new Date("2017-02-24")), new _model.Defect("", 2, new Date("2017-02-02"), new Date("2017-02-17")), new _model.Defect("", 1, new Date("2017-02-04"), new Date("2017-02-04")), new _model.Defect("", 1, new Date("2017-02-06"), new Date("2017-02-16")), new _model.Defect("", 2, new Date("2017-02-08"), new Date("2017-02-17")), new _model.Defect("", 4, new Date("2017-02-10"), new Date("2017-02-11")), new _model.Defect("", 4, new Date("2017-02-10"), new Date("2017-02-21")), new _model.Defect("", 4, new Date("2017-02-11"), new Date("2017-03-02")), new _model.Defect("", 3, new Date("2017-02-11"), new Date("2017-02-26")), new _model.Defect("", 3, new Date("2017-02-11"), new Date("2017-02-13")), new _model.Defect("", 4, new Date("2017-02-13"), new Date("2017-02-18")), new _model.Defect("", 5, new Date("2017-02-13"), new Date("2017-02-28")), new _model.Defect("", 2, new Date("2017-02-15"), new Date("2017-03-13")), new _model.Defect("", 1, new Date("2017-02-15"), new Date("2017-03-05")), new _model.Defect("", 4, new Date("2017-02-16"), new Date("2017-03-09")), new _model.Defect("", 4, new Date("2017-02-16"), new Date("2017-03-11")), new _model.Defect("", 1, new Date("2017-02-16"), new Date("2017-03-04")), new _model.Defect("", 4, new Date("2017-02-18"), new Date("2017-02-26")), new _model.Defect("", 2, new Date("2017-02-18"), new Date("2017-03-06")), new _model.Defect("", 1, new Date("2017-02-18"), new Date("2017-03-11")), new _model.Defect("", 3, new Date("2017-02-19"), new Date("2017-03-13")), new _model.Defect("", 3, new Date("2017-02-20"), new Date("2017-03-04")), new _model.Defect("", 2, new Date("2017-02-22"), new Date("2017-03-12")), new _model.Defect("", 5, new Date("2017-02-24"), new Date("2017-03-16")), new _model.Defect("", 4, new Date("2017-02-25"), new Date("2017-03-17")), new _model.Defect("", 5, new Date("2017-02-27"), new Date("2017-03-20")), new _model.Defect("", 5, new Date("2017-03-01"), new Date("2017-03-07")), new _model.Defect("", 1, new Date("2017-03-01"), new Date("2017-03-19")), new _model.Defect("", 5, new Date("2017-03-01"), new Date("2017-03-14")), new _model.Defect("", 1, new Date("2017-03-01"), new Date("2017-03-03")), new _model.Defect("", 5, new Date("2017-03-03"), new Date("2017-03-04")), new _model.Defect("", 4, new Date("2017-03-05"), new Date("2017-03-29")), new _model.Defect("", 2, new Date("2017-03-05"), new Date("2017-03-05")), new _model.Defect("", 2, new Date("2017-03-05"), new Date("2017-03-19")), new _model.Defect("", 4, new Date("2017-03-05"), new Date("2017-04-02")), new _model.Defect("", 4, new Date("2017-03-05"), new Date("2017-03-12")), new _model.Defect("", 4, new Date("2017-03-06"), new Date("2017-04-03")), new _model.Defect("", 5, new Date("2017-03-06"), new Date("2017-03-18")), new _model.Defect("", 3, new Date("2017-03-08"), new Date("2017-03-30")), new _model.Defect("", 5, new Date("2017-03-10"), new Date("2017-04-01")), new _model.Defect("", 3, new Date("2017-03-10"), new Date("2017-03-12")), new _model.Defect("", 5, new Date("2017-03-10"), new Date("2017-04-02")), new _model.Defect("", 3, new Date("2017-03-11"), new Date("2017-04-01")), new _model.Defect("", 1, new Date("2017-03-11"), new Date("2017-04-08")), new _model.Defect("", 5, new Date("2017-03-12"), new Date("2017-04-06")), new _model.Defect("", 5, new Date("2017-03-14"), new Date("2017-03-22")), new _model.Defect("", 2, new Date("2017-03-15"), new Date("2017-03-28")), new _model.Defect("", 2, new Date("2017-03-17"), new Date("2017-03-29")), new _model.Defect("", 1, new Date("2017-03-17"), new Date("2017-04-15")), new _model.Defect("", 2, new Date("2017-03-19"), new Date("2017-04-13")), new _model.Defect("", 5, new Date("2017-03-20"), new Date("2017-04-02")), new _model.Defect("", 1, new Date("2017-03-22"), new Date("2017-04-01")), new _model.Defect("", 2, new Date("2017-03-22"), new Date("2017-03-23")), new _model.Defect("", 1, new Date("2017-03-24"), new Date("2017-03-24")), new _model.Defect("", 5, new Date("2017-03-25"), new Date("2017-04-12")), new _model.Defect("", 1, new Date("2017-03-26"), new Date("2017-04-24")), new _model.Defect("", 3, new Date("2017-03-26"), new Date("2017-04-11")), new _model.Defect("", 4, new Date("2017-03-26"), new Date("2017-04-22")), new _model.Defect("", 5, new Date("2017-03-26"), new Date("2017-04-15")), new _model.Defect("", 3, new Date("2017-03-28"), new Date("2017-03-31")), new _model.Defect("", 5, new Date("2017-03-30"), new Date("2017-03-30")), new _model.Defect("", 1, new Date("2017-03-31"), new Date("2017-04-12")), new _model.Defect("", 5, new Date("2017-04-02"), new Date("2017-04-09")), new _model.Defect("", 4, new Date("2017-04-03"), new Date("2017-04-05")), new _model.Defect("", 1, new Date("2017-04-04"), new Date("2017-04-30")), new _model.Defect("", 5, new Date("2017-04-05"), new Date("2017-04-05")), new _model.Defect("", 5, new Date("2017-04-06"), new Date("2017-04-25")), new _model.Defect("", 4, new Date("2017-04-06"), new Date("2017-04-24")), new _model.Defect("", 2, new Date("2017-04-08"), new Date("2017-04-28")), new _model.Defect("", 4, new Date("2017-04-10"), new Date("2017-05-02")), new _model.Defect("", 4, new Date("2017-04-11"), new Date("2017-05-03")), new _model.Defect("", 1, new Date("2017-04-13"), new Date("2017-05-10")), new _model.Defect("", 4, new Date("2017-04-13"), new Date("2017-05-03")), new _model.Defect("", 5, new Date("2017-04-15"), null), new _model.Defect("", 4, new Date("2017-04-16"), new Date("2017-04-26")), new _model.Defect("", 1, new Date("2017-04-17"), null), new _model.Defect("", 3, new Date("2017-04-19"), new Date("2017-04-24")), new _model.Defect("", 5, new Date("2017-04-21"), new Date("2017-05-04")), new _model.Defect("", 2, new Date("2017-04-23"), null), new _model.Defect("", 1, new Date("2017-04-25"), new Date("2017-04-28")), new _model.Defect("", 3, new Date("2017-04-25"), new Date("2017-05-10")), new _model.Defect("", 5, new Date("2017-04-26"), null), new _model.Defect("", 1, new Date("2017-04-26"), null), new _model.Defect("", 4, new Date("2017-04-26"), new Date("2017-04-30")), new _model.Defect("", 1, new Date("2017-04-26"), new Date("2017-04-28")), new _model.Defect("", 3, new Date("2017-04-26"), new Date("2017-05-10")), new _model.Defect("", 5, new Date("2017-04-27"), null), new _model.Defect("", 4, new Date("2017-04-28"), null), new _model.Defect("", 1, new Date("2017-04-29"), null), new _model.Defect("", 1, new Date("2017-04-30"), null), new _model.Defect("", 1, new Date("2017-05-02"), null), new _model.Defect("", 3, new Date("2017-05-04"), null), new _model.Defect("", 4, new Date("2017-05-05"), null), new _model.Defect("", 5, new Date("2017-05-05"), new Date("2017-05-08")), new _model.Defect("", 3, new Date("2017-05-05"), null), new _model.Defect("", 1, new Date("2017-05-07"), null), new _model.Defect("", 2, new Date("2017-05-07"), null), new _model.Defect("", 3, new Date("2017-05-07"), null), new _model.Defect("", 2, new Date("2017-05-08"), null), new _model.Defect("", 5, new Date("2017-05-10"), null), new _model.Defect("", 2, new Date("2017-05-10"), null), new _model.Defect("", 1, new Date("2017-05-11"), null)],
  lambda: [new _model.Defect("", 1, new Date("2017-01-23"), new Date("2017-02-17")), new _model.Defect("", 4, new Date("2017-01-23"), new Date("2017-02-08")), new _model.Defect("", 3, new Date("2017-01-24"), new Date("2017-02-12")), new _model.Defect("", 1, new Date("2017-01-25"), new Date("2017-02-05")), new _model.Defect("", 5, new Date("2017-01-26"), new Date("2017-02-18")), new _model.Defect("", 2, new Date("2017-01-26"), new Date("2017-02-05")), new _model.Defect("", 1, new Date("2017-01-27"), new Date("2017-02-14")), new _model.Defect("", 3, new Date("2017-01-27"), new Date("2017-02-12")), new _model.Defect("", 1, new Date("2017-01-29"), new Date("2017-02-20")), new _model.Defect("", 5, new Date("2017-01-30"), new Date("2017-02-28")), new _model.Defect("", 1, new Date("2017-01-31"), new Date("2017-02-26")), new _model.Defect("", 3, new Date("2017-01-31"), new Date("2017-02-04")), new _model.Defect("", 5, new Date("2017-02-02"), new Date("2017-02-28")), new _model.Defect("", 4, new Date("2017-02-04"), new Date("2017-02-20")), new _model.Defect("", 5, new Date("2017-02-06"), new Date("2017-03-02")), new _model.Defect("", 2, new Date("2017-02-08"), new Date("2017-02-18")), new _model.Defect("", 5, new Date("2017-02-10"), new Date("2017-02-20")), new _model.Defect("", 1, new Date("2017-02-12"), new Date("2017-02-28")), new _model.Defect("", 5, new Date("2017-02-13"), new Date("2017-02-26")), new _model.Defect("", 1, new Date("2017-02-13"), new Date("2017-02-24")), new _model.Defect("", 3, new Date("2017-02-15"), new Date("2017-02-15")), new _model.Defect("", 4, new Date("2017-02-16"), new Date("2017-03-11")), new _model.Defect("", 4, new Date("2017-02-17"), new Date("2017-02-18")), new _model.Defect("", 5, new Date("2017-02-18"), new Date("2017-03-13")), new _model.Defect("", 2, new Date("2017-02-18"), new Date("2017-03-10")), new _model.Defect("", 3, new Date("2017-02-18"), new Date("2017-03-17")), new _model.Defect("", 5, new Date("2017-02-20"), new Date("2017-02-27")), new _model.Defect("", 2, new Date("2017-02-20"), new Date("2017-02-24")), new _model.Defect("", 5, new Date("2017-02-21"), new Date("2017-03-20")), new _model.Defect("", 1, new Date("2017-02-21"), new Date("2017-02-21")), new _model.Defect("", 4, new Date("2017-02-23"), new Date("2017-03-11")), new _model.Defect("", 5, new Date("2017-02-25"), new Date("2017-03-04")), new _model.Defect("", 3, new Date("2017-02-26"), new Date("2017-03-17")), new _model.Defect("", 1, new Date("2017-02-27"), new Date("2017-03-05")), new _model.Defect("", 5, new Date("2017-02-27"), new Date("2017-03-18")), new _model.Defect("", 2, new Date("2017-02-28"), new Date("2017-03-28")), new _model.Defect("", 5, new Date("2017-03-02"), new Date("2017-03-19")), new _model.Defect("", 4, new Date("2017-03-04"), new Date("2017-03-22")), new _model.Defect("", 1, new Date("2017-03-04"), new Date("2017-03-20")), new _model.Defect("", 2, new Date("2017-03-06"), new Date("2017-04-01")), new _model.Defect("", 3, new Date("2017-03-08"), new Date("2017-03-20")), new _model.Defect("", 1, new Date("2017-03-08"), new Date("2017-03-09")), new _model.Defect("", 2, new Date("2017-03-10"), new Date("2017-04-03")), new _model.Defect("", 5, new Date("2017-03-11"), new Date("2017-04-08")), new _model.Defect("", 4, new Date("2017-03-12"), new Date("2017-03-27")), new _model.Defect("", 1, new Date("2017-03-13"), new Date("2017-03-18")), new _model.Defect("", 4, new Date("2017-03-14"), new Date("2017-04-08")), new _model.Defect("", 1, new Date("2017-03-14"), new Date("2017-04-08")), new _model.Defect("", 2, new Date("2017-03-16"), new Date("2017-04-04")), new _model.Defect("", 4, new Date("2017-03-18"), new Date("2017-03-28")), new _model.Defect("", 4, new Date("2017-03-19"), new Date("2017-03-31")), new _model.Defect("", 2, new Date("2017-03-20"), new Date("2017-03-25")), new _model.Defect("", 4, new Date("2017-03-20"), new Date("2017-04-12")), new _model.Defect("", 1, new Date("2017-03-22"), new Date("2017-04-14")), new _model.Defect("", 2, new Date("2017-03-23"), new Date("2017-04-21")), new _model.Defect("", 4, new Date("2017-03-25"), new Date("2017-04-01")), new _model.Defect("", 1, new Date("2017-03-26"), new Date("2017-03-30")), new _model.Defect("", 1, new Date("2017-03-26"), new Date("2017-03-30")), new _model.Defect("", 3, new Date("2017-03-27"), new Date("2017-04-01")), new _model.Defect("", 2, new Date("2017-03-29"), new Date("2017-04-19")), new _model.Defect("", 2, new Date("2017-03-30"), new Date("2017-04-13")), new _model.Defect("", 1, new Date("2017-03-31"), new Date("2017-04-17")), new _model.Defect("", 2, new Date("2017-04-02"), new Date("2017-04-17")), new _model.Defect("", 2, new Date("2017-04-04"), new Date("2017-04-30")), new _model.Defect("", 5, new Date("2017-04-06"), new Date("2017-04-28")), new _model.Defect("", 4, new Date("2017-04-06"), new Date("2017-05-04")), new _model.Defect("", 2, new Date("2017-04-07"), new Date("2017-04-19")), new _model.Defect("", 1, new Date("2017-04-08"), new Date("2017-04-26")), new _model.Defect("", 4, new Date("2017-04-09"), new Date("2017-04-09")), new _model.Defect("", 4, new Date("2017-04-10"), new Date("2017-04-23")), new _model.Defect("", 2, new Date("2017-04-11"), new Date("2017-05-08")), new _model.Defect("", 5, new Date("2017-04-11"), new Date("2017-04-23")), new _model.Defect("", 4, new Date("2017-04-11"), new Date("2017-04-15")), new _model.Defect("", 3, new Date("2017-04-11"), new Date("2017-05-02")), new _model.Defect("", 1, new Date("2017-04-12"), new Date("2017-04-22")), new _model.Defect("", 1, new Date("2017-04-14"), new Date("2017-05-12")), new _model.Defect("", 5, new Date("2017-04-16"), new Date("2017-04-28")), new _model.Defect("", 4, new Date("2017-04-17"), new Date("2017-05-10")), new _model.Defect("", 4, new Date("2017-04-19"), new Date("2017-05-01")), new _model.Defect("", 4, new Date("2017-04-19"), new Date("2017-05-03")), new _model.Defect("", 3, new Date("2017-04-20"), new Date("2017-05-06")), new _model.Defect("", 4, new Date("2017-04-21"), new Date("2017-04-26")), new _model.Defect("", 5, new Date("2017-04-22"), new Date("2017-04-30")), new _model.Defect("", 4, new Date("2017-04-22"), new Date("2017-04-25")), new _model.Defect("", 4, new Date("2017-04-22"), new Date("2017-05-09")), new _model.Defect("", 3, new Date("2017-04-23"), null), new _model.Defect("", 5, new Date("2017-04-23"), null), new _model.Defect("", 2, new Date("2017-04-23"), new Date("2017-04-23")), new _model.Defect("", 5, new Date("2017-04-24"), new Date("2017-05-09")), new _model.Defect("", 1, new Date("2017-04-24"), new Date("2017-05-12")), new _model.Defect("", 1, new Date("2017-04-24"), new Date("2017-04-29")), new _model.Defect("", 3, new Date("2017-04-24"), new Date("2017-05-03")), new _model.Defect("", 3, new Date("2017-04-26"), null), new _model.Defect("", 3, new Date("2017-04-27"), null), new _model.Defect("", 4, new Date("2017-04-29"), null), new _model.Defect("", 5, new Date("2017-04-29"), new Date("2017-05-12")), new _model.Defect("", 4, new Date("2017-04-30"), null), new _model.Defect("", 5, new Date("2017-05-01"), null), new _model.Defect("", 1, new Date("2017-05-01"), new Date("2017-05-09")), new _model.Defect("", 1, new Date("2017-05-03"), null), new _model.Defect("", 1, new Date("2017-05-03"), null), new _model.Defect("", 1, new Date("2017-05-04"), null), new _model.Defect("", 3, new Date("2017-05-05"), new Date("2017-05-11")), new _model.Defect("", 4, new Date("2017-05-05"), new Date("2017-05-10")), new _model.Defect("", 5, new Date("2017-05-05"), null), new _model.Defect("", 3, new Date("2017-05-07"), null), new _model.Defect("", 3, new Date("2017-05-09"), null), new _model.Defect("", 5, new Date("2017-05-10"), null), new _model.Defect("", 2, new Date("2017-05-11"), null), new _model.Defect("", 5, new Date("2017-05-12"), null), new _model.Defect("", 1, new Date("2017-05-12"), null)],
  theta: [new _model.Defect("", 2, new Date("2017-01-30"), new Date("2017-02-05")), new _model.Defect("", 3, new Date("2017-01-30"), new Date("2017-02-03")), new _model.Defect("", 2, new Date("2017-01-30"), new Date("2017-02-07")), new _model.Defect("", 5, new Date("2017-01-30"), new Date("2017-02-19")), new _model.Defect("", 2, new Date("2017-02-01"), new Date("2017-02-22")), new _model.Defect("", 1, new Date("2017-02-01"), new Date("2017-02-25")), new _model.Defect("", 3, new Date("2017-02-01"), new Date("2017-02-19")), new _model.Defect("", 4, new Date("2017-02-03"), new Date("2017-02-10")), new _model.Defect("", 2, new Date("2017-02-04"), new Date("2017-02-25")), new _model.Defect("", 1, new Date("2017-02-04"), new Date("2017-02-16")), new _model.Defect("", 4, new Date("2017-02-05"), new Date("2017-02-15")), new _model.Defect("", 3, new Date("2017-02-05"), new Date("2017-03-04")), new _model.Defect("", 4, new Date("2017-02-06"), new Date("2017-03-05")), new _model.Defect("", 3, new Date("2017-02-06"), new Date("2017-02-10")), new _model.Defect("", 5, new Date("2017-02-08"), new Date("2017-02-08")), new _model.Defect("", 2, new Date("2017-02-10"), new Date("2017-03-07")), new _model.Defect("", 3, new Date("2017-02-11"), new Date("2017-03-09")), new _model.Defect("", 2, new Date("2017-02-13"), new Date("2017-03-03")), new _model.Defect("", 3, new Date("2017-02-15"), new Date("2017-02-20")), new _model.Defect("", 2, new Date("2017-02-16"), new Date("2017-02-16")), new _model.Defect("", 4, new Date("2017-02-17"), new Date("2017-02-17")), new _model.Defect("", 1, new Date("2017-02-19"), new Date("2017-03-01")), new _model.Defect("", 2, new Date("2017-02-21"), new Date("2017-03-15")), new _model.Defect("", 4, new Date("2017-02-21"), new Date("2017-03-15")), new _model.Defect("", 1, new Date("2017-02-21"), new Date("2017-03-02")), new _model.Defect("", 4, new Date("2017-02-21"), new Date("2017-03-19")), new _model.Defect("", 5, new Date("2017-02-21"), new Date("2017-03-17")), new _model.Defect("", 5, new Date("2017-02-21"), new Date("2017-02-26")), new _model.Defect("", 5, new Date("2017-02-22"), new Date("2017-03-01")), new _model.Defect("", 4, new Date("2017-02-23"), new Date("2017-03-12")), new _model.Defect("", 2, new Date("2017-02-24"), new Date("2017-03-20")), new _model.Defect("", 3, new Date("2017-02-26"), new Date("2017-03-15")), new _model.Defect("", 3, new Date("2017-02-27"), new Date("2017-03-27")), new _model.Defect("", 3, new Date("2017-02-28"), new Date("2017-03-23")), new _model.Defect("", 5, new Date("2017-03-01"), new Date("2017-03-03")), new _model.Defect("", 1, new Date("2017-03-03"), new Date("2017-03-14")), new _model.Defect("", 3, new Date("2017-03-03"), new Date("2017-03-20")), new _model.Defect("", 4, new Date("2017-03-04"), new Date("2017-03-19")), new _model.Defect("", 1, new Date("2017-03-04"), new Date("2017-03-19")), new _model.Defect("", 5, new Date("2017-03-05"), new Date("2017-03-21")), new _model.Defect("", 5, new Date("2017-03-07"), new Date("2017-03-15")), new _model.Defect("", 2, new Date("2017-03-08"), new Date("2017-04-05")), new _model.Defect("", 5, new Date("2017-03-09"), new Date("2017-03-09")), new _model.Defect("", 2, new Date("2017-03-10"), new Date("2017-04-03")), new _model.Defect("", 1, new Date("2017-03-10"), new Date("2017-04-05")), new _model.Defect("", 3, new Date("2017-03-12"), new Date("2017-04-04")), new _model.Defect("", 5, new Date("2017-03-12"), new Date("2017-03-28")), new _model.Defect("", 4, new Date("2017-03-12"), new Date("2017-03-18")), new _model.Defect("", 1, new Date("2017-03-14"), new Date("2017-04-04")), new _model.Defect("", 5, new Date("2017-03-15"), new Date("2017-04-06")), new _model.Defect("", 3, new Date("2017-03-16"), new Date("2017-04-04")), new _model.Defect("", 4, new Date("2017-03-17"), new Date("2017-04-03")), new _model.Defect("", 4, new Date("2017-03-19"), new Date("2017-03-19")), new _model.Defect("", 3, new Date("2017-03-19"), new Date("2017-03-23")), new _model.Defect("", 2, new Date("2017-03-21"), new Date("2017-04-13")), new _model.Defect("", 1, new Date("2017-03-23"), new Date("2017-03-23")), new _model.Defect("", 5, new Date("2017-03-25"), new Date("2017-04-08")), new _model.Defect("", 5, new Date("2017-03-26"), new Date("2017-04-08")), new _model.Defect("", 5, new Date("2017-03-26"), new Date("2017-04-01")), new _model.Defect("", 1, new Date("2017-03-28"), new Date("2017-03-28")), new _model.Defect("", 4, new Date("2017-03-28"), new Date("2017-04-12")), new _model.Defect("", 1, new Date("2017-03-28"), new Date("2017-04-03")), new _model.Defect("", 5, new Date("2017-03-29"), new Date("2017-04-27")), new _model.Defect("", 1, new Date("2017-03-29"), new Date("2017-04-07")), new _model.Defect("", 3, new Date("2017-03-31"), new Date("2017-04-12")), new _model.Defect("", 2, new Date("2017-03-31"), new Date("2017-04-18")), new _model.Defect("", 3, new Date("2017-04-02"), new Date("2017-04-18")), new _model.Defect("", 2, new Date("2017-04-02"), new Date("2017-04-26")), new _model.Defect("", 5, new Date("2017-04-03"), new Date("2017-04-12")), new _model.Defect("", 4, new Date("2017-04-03"), new Date("2017-04-30")), new _model.Defect("", 4, new Date("2017-04-03"), new Date("2017-04-26")), new _model.Defect("", 3, new Date("2017-04-05"), new Date("2017-04-29")), new _model.Defect("", 5, new Date("2017-04-06"), new Date("2017-04-22")), new _model.Defect("", 5, new Date("2017-04-07"), new Date("2017-04-25")), new _model.Defect("", 1, new Date("2017-04-07"), new Date("2017-04-13")), new _model.Defect("", 3, new Date("2017-04-07"), new Date("2017-05-01")), new _model.Defect("", 2, new Date("2017-04-08"), new Date("2017-04-17")), new _model.Defect("", 1, new Date("2017-04-10"), new Date("2017-05-05")), new _model.Defect("", 2, new Date("2017-04-12"), new Date("2017-04-18")), new _model.Defect("", 2, new Date("2017-04-12"), new Date("2017-04-23")), new _model.Defect("", 3, new Date("2017-04-13"), new Date("2017-04-24")), new _model.Defect("", 4, new Date("2017-04-14"), new Date("2017-04-26")), new _model.Defect("", 3, new Date("2017-04-15"), new Date("2017-04-20")), new _model.Defect("", 5, new Date("2017-04-17"), new Date("2017-05-06")), new _model.Defect("", 3, new Date("2017-04-19"), new Date("2017-05-11")), new _model.Defect("", 2, new Date("2017-04-19"), new Date("2017-05-12")), new _model.Defect("", 5, new Date("2017-04-19"), new Date("2017-05-09")), new _model.Defect("", 2, new Date("2017-04-20"), new Date("2017-05-12")), new _model.Defect("", 1, new Date("2017-04-21"), null), new _model.Defect("", 4, new Date("2017-04-21"), null), new _model.Defect("", 1, new Date("2017-04-23"), new Date("2017-04-23")), new _model.Defect("", 5, new Date("2017-04-25"), new Date("2017-04-30")), new _model.Defect("", 5, new Date("2017-04-27"), new Date("2017-05-01")), new _model.Defect("", 4, new Date("2017-04-29"), new Date("2017-05-02")), new _model.Defect("", 1, new Date("2017-05-01"), null), new _model.Defect("", 4, new Date("2017-05-01"), null), new _model.Defect("", 2, new Date("2017-05-02"), new Date("2017-05-08")), new _model.Defect("", 2, new Date("2017-05-03"), new Date("2017-05-08")), new _model.Defect("", 1, new Date("2017-05-04"), new Date("2017-05-12")), new _model.Defect("", 1, new Date("2017-05-05"), null), new _model.Defect("", 5, new Date("2017-05-06"), null), new _model.Defect("", 3, new Date("2017-05-06"), null), new _model.Defect("", 1, new Date("2017-05-06"), new Date("2017-05-07")), new _model.Defect("", 4, new Date("2017-05-08"), null), new _model.Defect("", 2, new Date("2017-05-10"), null), new _model.Defect("", 5, new Date("2017-05-12"), null)],
  tau: [new _model.Defect("", 4, new Date("2017-01-30"), new Date("2017-03-01")), new _model.Defect("", 4, new Date("2017-02-01"), new Date("2017-02-02")), new _model.Defect("", 5, new Date("2017-02-02"), new Date("2017-02-09")), new _model.Defect("", 5, new Date("2017-02-02"), new Date("2017-03-03")), new _model.Defect("", 1, new Date("2017-02-02"), new Date("2017-03-02")), new _model.Defect("", 1, new Date("2017-02-02"), new Date("2017-02-28")), new _model.Defect("", 1, new Date("2017-02-04"), new Date("2017-02-07")), new _model.Defect("", 4, new Date("2017-02-05"), new Date("2017-02-11")), new _model.Defect("", 2, new Date("2017-02-07"), new Date("2017-03-06")), new _model.Defect("", 1, new Date("2017-02-08"), new Date("2017-02-25")), new _model.Defect("", 2, new Date("2017-02-08"), new Date("2017-02-19")), new _model.Defect("", 4, new Date("2017-02-09"), new Date("2017-03-07")), new _model.Defect("", 5, new Date("2017-02-11"), new Date("2017-03-09")), new _model.Defect("", 2, new Date("2017-02-11"), new Date("2017-02-22")), new _model.Defect("", 2, new Date("2017-02-12"), new Date("2017-02-15")), new _model.Defect("", 2, new Date("2017-02-14"), new Date("2017-02-20")), new _model.Defect("", 4, new Date("2017-02-16"), new Date("2017-02-18")), new _model.Defect("", 5, new Date("2017-02-18"), new Date("2017-03-12")), new _model.Defect("", 3, new Date("2017-02-20"), new Date("2017-03-17")), new _model.Defect("", 3, new Date("2017-02-21"), new Date("2017-02-24")), new _model.Defect("", 4, new Date("2017-02-21"), new Date("2017-02-21")), new _model.Defect("", 2, new Date("2017-02-21"), new Date("2017-03-03")), new _model.Defect("", 2, new Date("2017-02-23"), new Date("2017-02-28")), new _model.Defect("", 4, new Date("2017-02-23"), new Date("2017-03-11")), new _model.Defect("", 3, new Date("2017-02-25"), new Date("2017-03-24")), new _model.Defect("", 5, new Date("2017-02-27"), new Date("2017-03-06")), new _model.Defect("", 4, new Date("2017-02-28"), new Date("2017-03-11")), new _model.Defect("", 4, new Date("2017-03-01"), new Date("2017-03-11")), new _model.Defect("", 1, new Date("2017-03-02"), new Date("2017-03-21")), new _model.Defect("", 3, new Date("2017-03-03"), new Date("2017-03-24")), new _model.Defect("", 2, new Date("2017-03-05"), new Date("2017-03-18")), new _model.Defect("", 5, new Date("2017-03-06"), new Date("2017-03-30")), new _model.Defect("", 1, new Date("2017-03-08"), new Date("2017-03-27")), new _model.Defect("", 5, new Date("2017-03-08"), new Date("2017-04-07")), new _model.Defect("", 2, new Date("2017-03-09"), new Date("2017-03-22")), new _model.Defect("", 5, new Date("2017-03-10"), new Date("2017-04-02")), new _model.Defect("", 1, new Date("2017-03-11"), new Date("2017-03-13")), new _model.Defect("", 2, new Date("2017-03-13"), new Date("2017-03-29")), new _model.Defect("", 4, new Date("2017-03-14"), new Date("2017-03-18")), new _model.Defect("", 3, new Date("2017-03-14"), new Date("2017-03-26")), new _model.Defect("", 5, new Date("2017-03-15"), new Date("2017-04-12")), new _model.Defect("", 2, new Date("2017-03-15"), new Date("2017-03-31")), new _model.Defect("", 3, new Date("2017-03-16"), new Date("2017-04-07")), new _model.Defect("", 1, new Date("2017-03-16"), new Date("2017-04-10")), new _model.Defect("", 2, new Date("2017-03-18"), new Date("2017-04-10")), new _model.Defect("", 3, new Date("2017-03-20"), new Date("2017-04-12")), new _model.Defect("", 1, new Date("2017-03-22"), new Date("2017-03-25")), new _model.Defect("", 1, new Date("2017-03-24"), new Date("2017-04-09")), new _model.Defect("", 2, new Date("2017-03-26"), new Date("2017-04-13")), new _model.Defect("", 3, new Date("2017-03-28"), new Date("2017-04-17")), new _model.Defect("", 1, new Date("2017-03-29"), new Date("2017-04-19")), new _model.Defect("", 3, new Date("2017-03-29"), new Date("2017-04-20")), new _model.Defect("", 3, new Date("2017-03-29"), new Date("2017-04-27")), new _model.Defect("", 3, new Date("2017-03-31"), new Date("2017-04-21")), new _model.Defect("", 4, new Date("2017-03-31"), new Date("2017-04-20")), new _model.Defect("", 1, new Date("2017-04-01"), new Date("2017-04-29")), new _model.Defect("", 1, new Date("2017-04-01"), new Date("2017-04-12")), new _model.Defect("", 5, new Date("2017-04-03"), new Date("2017-04-03")), new _model.Defect("", 4, new Date("2017-04-04"), new Date("2017-04-24")), new _model.Defect("", 2, new Date("2017-04-06"), new Date("2017-04-29")), new _model.Defect("", 2, new Date("2017-04-08"), new Date("2017-04-24")), new _model.Defect("", 5, new Date("2017-04-09"), new Date("2017-04-17")), new _model.Defect("", 1, new Date("2017-04-11"), new Date("2017-05-05")), new _model.Defect("", 3, new Date("2017-04-13"), new Date("2017-04-27")), new _model.Defect("", 2, new Date("2017-04-13"), null), new _model.Defect("", 1, new Date("2017-04-13"), new Date("2017-04-27")), new _model.Defect("", 1, new Date("2017-04-14"), new Date("2017-05-03")), new _model.Defect("", 4, new Date("2017-04-16"), new Date("2017-04-24")), new _model.Defect("", 4, new Date("2017-04-18"), new Date("2017-05-06")), new _model.Defect("", 4, new Date("2017-04-19"), new Date("2017-04-19")), new _model.Defect("", 5, new Date("2017-04-20"), new Date("2017-05-06")), new _model.Defect("", 2, new Date("2017-04-21"), new Date("2017-05-12")), new _model.Defect("", 1, new Date("2017-04-22"), null), new _model.Defect("", 4, new Date("2017-04-23"), new Date("2017-05-01")), new _model.Defect("", 2, new Date("2017-04-25"), new Date("2017-05-06")), new _model.Defect("", 2, new Date("2017-04-27"), new Date("2017-05-06")), new _model.Defect("", 1, new Date("2017-04-29"), null), new _model.Defect("", 1, new Date("2017-04-30"), null), new _model.Defect("", 1, new Date("2017-04-30"), null), new _model.Defect("", 1, new Date("2017-04-30"), new Date("2017-05-01")), new _model.Defect("", 3, new Date("2017-05-01"), new Date("2017-05-07")), new _model.Defect("", 2, new Date("2017-05-03"), null), new _model.Defect("", 5, new Date("2017-05-03"), new Date("2017-05-07")), new _model.Defect("", 1, new Date("2017-05-05"), null), new _model.Defect("", 1, new Date("2017-05-07"), new Date("2017-05-07")), new _model.Defect("", 5, new Date("2017-05-09"), null), new _model.Defect("", 1, new Date("2017-05-10"), null), new _model.Defect("", 4, new Date("2017-05-10"), new Date("2017-05-11")), new _model.Defect("", 2, new Date("2017-05-10"), new Date("2017-05-10")), new _model.Defect("", 5, new Date("2017-05-11"), null), new _model.Defect("", 2, new Date("2017-05-12"), null)]
};

exports.default = defects;

});

require.register("js/mocked_data/teams/happiness.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var happinessAssessments = {
  alpha: [2.5, 2.7, 2.8, 3.0, 2.9, 3.2, 3.2, 3.8, 3.7, 3.6, 3.8, 3.2, 3.0, 2.5, 2.0, 2.1, 2.9, 3.2],
  beta: [3.0, 3.1, 3.1, 3.1, 3.1, 2.5, 1.5, 1.6, 1.4, 1.4, 1.2, 1.9, 2.5, 3.0, 2.7, 2.7, 2.8],
  epsilon: [2.0, 2.0, 2.5, 2.7, 2.9, 3.0, 3.0, 2.9, 2.9, 3.0, 3.0, 2.9, 3.0, 3.0, 2.9, 2.8, 2.8],
  lambda: [4.5, 4.5, 4.6, 4.5, 4.5, 4.7, 4.7, 4.6, 4.4, 4.5, 4.3, 4.4, 4.5, 4.5, 4.6, 4.5],
  theta: [1.0, 1.1, 1.0, 1.0, 0.8, 0.8, 0.5, 0.6, 0.8, 1.0, 1.0, 1.3, 1.4, 1.7, 2.0],
  tau: [2.5, 3.0, 3.4, 3.9, 4.6, 4.9, 1.5, 1.4, 1.2, 1.0, 3.0, 3.1, 3.2, 3.1, 3.1]
};

exports.default = happinessAssessments;

});

require.register("js/mocked_data/teams/practices.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require("../../model");

// -------------------------------------------------------------------------- //
// Practice Assessments //

var ADOPTION = _model.maturity.adoption,
    ADAPTATION = _model.maturity.adaptation,
    ACCEPTANCE = _model.maturity.acceptance,
    ROUTINISATION = _model.maturity.routinisation,
    INFUSION = _model.maturity.infusion;

// Add practice assessments to each team.
var practiceAssessments = {
  alpha: [new _model.Practices({
    "Burndown chart": ROUTINISATION,
    "Daily scrum": ROUTINISATION,
    "Definition of \"Done\"": ADOPTION,
    "Planning poker": ACCEPTANCE,
    "Scrum of Scrums": ADAPTATION,
    "Sprint review": ACCEPTANCE,
    "Sprint retrospective": ACCEPTANCE
  }, {
    "Pair Programming": ROUTINISATION,
    "Refactoring": ACCEPTANCE,
    "Simple Design": ADOPTION,
    "Small Releases": ACCEPTANCE,
    "Collective Ownership": ADAPTATION,
    "40-hour Week": ACCEPTANCE,
    "Test-driven Development": ADAPTATION
  }, {}, new Date("2017-01-10")), new _model.Practices({
    "Burndown chart": ROUTINISATION,
    "Daily scrum": INFUSION,
    "Definition of \"Done\"": ADAPTATION,
    "Planning poker": ACCEPTANCE,
    "Scrum of Scrums": ADAPTATION,
    "Sprint review": ACCEPTANCE,
    "Sprint retrospective": ACCEPTANCE
  }, {
    "Pair Programming": ROUTINISATION,
    "Refactoring": ROUTINISATION,
    "Simple Design": ADAPTATION,
    "Small Releases": ACCEPTANCE,
    "Collective Ownership": ADAPTATION,
    "40-hour Week": ACCEPTANCE,
    "Test-driven Development": ADAPTATION
  }, {}, new Date("2017-03-14")), new _model.Practices({
    "Burndown chart": ROUTINISATION,
    "Daily scrum": INFUSION,
    "Definition of \"Done\"": ACCEPTANCE,
    "Planning poker": ACCEPTANCE,
    "Scrum of Scrums": ADAPTATION,
    "Sprint review": ACCEPTANCE,
    "Sprint retrospective": ROUTINISATION
  }, {
    "Pair Programming": ROUTINISATION,
    "Refactoring": ROUTINISATION,
    "Simple Design": ADAPTATION,
    "Small Releases": ACCEPTANCE,
    "Collective Ownership": ADAPTATION,
    "40-hour Week": ACCEPTANCE,
    "Test-driven Development": ADAPTATION
  }, {}, new Date("2017-05-12"))],
  beta: [new _model.Practices({
    "Burndown chart": ROUTINISATION,
    "Daily scrum": ACCEPTANCE,
    "Definition of \"Done\"": ACCEPTANCE,
    "Sprint review": ACCEPTANCE,
    "Sprint retrospective": ADOPTION
  }, {
    "Refactoring": ADOPTION,
    "Pair Programming": ADOPTION
  }, {
    "Kanban board": ADAPTATION
  }, new Date("2017-01-25")), new _model.Practices({
    "Burndown chart": ROUTINISATION,
    "Daily scrum": ACCEPTANCE,
    "Definition of \"Done\"": ACCEPTANCE,
    "Sprint review": ACCEPTANCE,
    "Sprint retrospective": ADOPTION
  }, {
    "Refactoring": ADOPTION,
    "Pair Programming": ADOPTION
  }, {
    "Kanban board": ROUTINISATION,
    "Up-front design": ACCEPTANCE
  }, new Date("2017-04-06"))],
  epsilon: [new _model.Practices({
    "Burndown chart": ADAPTATION,
    "Daily scrum": ACCEPTANCE,
    "Definition of \"Done\"": ACCEPTANCE,
    "Sprint review": ROUTINISATION,
    "Sprint retrospective": ADOPTION,
    "Scrum of Scrums": ACCEPTANCE
  }, {
    "Refactoring": ADOPTION,
    "Pair Programming": ADOPTION,
    "Collective Ownership": ADAPTATION,
    "40-hour Week": ACCEPTANCE
  }, {}, new Date("2017-02-02")), new _model.Practices({
    "Burndown chart": ROUTINISATION,
    "Daily scrum": ACCEPTANCE,
    "Definition of \"Done\"": ROUTINISATION,
    "Sprint review": INFUSION,
    "Sprint retrospective": ROUTINISATION,
    "Scrum of Scrums": ACCEPTANCE
  }, {
    "Refactoring": ADAPTATION,
    "Pair Programming": ADAPTATION,
    "Collective Ownership": ROUTINISATION,
    "40-hour Week": ACCEPTANCE
  }, {}, new Date("2017-04-10"))],
  lambda: [new _model.Practices({
    "Burndown chart": ROUTINISATION,
    "Daily scrum": ROUTINISATION,
    "Definition of \"Done\"": ACCEPTANCE,
    "Sprint review": INFUSION,
    "Sprint retrospective": INFUSION
  }, {
    "Pair Programming": ROUTINISATION,
    "Refactoring": INFUSION,
    "Simple Design": ROUTINISATION,
    "40-hour Week": ROUTINISATION,
    "Test-driven Development": INFUSION
  }, {
    "Mob Programming": ADAPTATION
  }, new Date("2017-02-01")), new _model.Practices({
    "Burndown chart": INFUSION,
    "Daily scrum": INFUSION,
    "Definition of \"Done\"": ROUTINISATION,
    "Sprint review": INFUSION,
    "Sprint retrospective": INFUSION
  }, {
    "Pair Programming": INFUSION,
    "Refactoring": INFUSION,
    "Simple Design": INFUSION,
    "40-hour Week": ROUTINISATION,
    "Test-driven Development": INFUSION
  }, {
    "Mob Programming": ACCEPTANCE
  }, new Date("2017-05-10"))],
  theta: [new _model.Practices({
    "Burndown chart": ADOPTION,
    "Daily scrum": ADOPTION,
    "Sprint review": ADOPTION,
    "Sprint retrospective": ADOPTION
  }, {
    "40-hour Week": ADOPTION,
    "Test-driven Development": ADOPTION
  }, {}, new Date("2017-02-13")), new _model.Practices({
    "Burndown chart": ADAPTATION,
    "Daily scrum": ADAPTATION,
    "Sprint review": ADOPTION,
    "Sprint retrospective": ADAPTATION
  }, {
    "40-hour Week": ADAPTATION,
    "Test-driven Development": ADOPTION
  }, {}, new Date("2017-04-12"))],
  tau: [] // Don't do any for this team
};

exports.default = practiceAssessments;

});

require.register("js/mocked_data/teams/satisfaction.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var satisfactionAssessments = {
  alpha: [{
    Communication: 2.5,
    Resources: 2.5,
    Management: 2.5,
    Technical: 3.0,
    Requirements: 2.5
  }, {
    Communication: 2.0,
    Resources: 2.5,
    Management: 2.0,
    Technical: 3.0,
    Requirements: 2.2
  }, {
    Communication: 1.8,
    Resources: 2.8,
    Management: 3.1,
    Technical: 3.4,
    Requirements: 2.3
  }, {
    Communication: 1.5,
    Resources: 3.0,
    Management: 3.2,
    Technical: 3.3,
    Requirements: 2.5
  }, {
    Communication: 2.0,
    Resources: 2.9,
    Management: 3.0,
    Technical: 3.4,
    Requirements: 2.9
  }],
  beta: [{
    Communication: 2.5,
    Resources: 2.8,
    Management: 3.2,
    Technical: 2.0,
    Requirements: 2.0
  }, {
    Communication: 2.6,
    Resources: 3.0,
    Management: 3.4,
    Technical: 2.2,
    Requirements: 2.2
  }, {
    Communication: 2.6,
    Resources: 3.1,
    Management: 3.5,
    Technical: 2.4,
    Requirements: 2.2
  }, {
    Communication: 2.8,
    Resources: 3.4,
    Management: 3.3,
    Technical: 2.6,
    Requirements: 2.2
  }, {
    Communication: 2.9,
    Resources: 3.4,
    Management: 3.3,
    Technical: 2.8,
    Requirements: 2.3
  }],
  epsilon: [{
    Communication: 1.9,
    Resources: 1.9,
    Management: 2.0,
    Technical: 1.9,
    Requirements: 2.2
  }, {
    Communication: 2.0,
    Resources: 2.6,
    Management: 2.7,
    Technical: 1.8,
    Requirements: 2.3
  }, {
    Communication: 2.5,
    Resources: 2.7,
    Management: 2.8,
    Technical: 1.9,
    Requirements: 2.3
  }, {
    Communication: 2.8,
    Resources: 3.1,
    Management: 3.1,
    Technical: 1.8,
    Requirements: 2.4
  }, {
    Communication: 3.1,
    Resources: 3.2,
    Management: 3.4,
    Technical: 1.7,
    Requirements: 2.1
  }],
  lambda: [{
    Communication: 1.9,
    Resources: 2.0,
    Management: 0.9,
    Technical: 4.5,
    Requirements: 4.7
  }, {
    Communication: 1.8,
    Resources: 2.2,
    Management: 0.7,
    Technical: 4.7,
    Requirements: 4.6
  }, {
    Communication: 1.8,
    Resources: 2.2,
    Management: 0.9,
    Technical: 4.7,
    Requirements: 4.7
  }, {
    Communication: 2.0,
    Resources: 2.5,
    Management: 1.2,
    Technical: 4.7,
    Requirements: 4.6
  }, {
    Communication: 2.1,
    Resources: 2.6,
    Management: 1.2,
    Technical: 4.8,
    Requirements: 4.5
  }],
  theta: [{
    Communication: 3.4,
    Resources: 3.6,
    Management: 3.5,
    Technical: 0.8,
    Requirements: 0.7
  }, {
    Communication: 3.5,
    Resources: 3.6,
    Management: 3.0,
    Technical: 0.7,
    Requirements: 0.6
  }, {
    Communication: 3.0,
    Resources: 2.5,
    Management: 2.5,
    Technical: 0.5,
    Requirements: 0.4
  }, {
    Communication: 2.0,
    Resources: 1.8,
    Management: 1.5,
    Technical: 0.5,
    Requirements: 0.5
  }, {
    Communication: 2.5,
    Resources: 1.9,
    Management: 2.1,
    Technical: 0.7,
    Requirements: 0.9
  }],
  tau: [{
    Communication: 4.0,
    Resources: 4.0,
    Management: 4.0,
    Technical: 4.0,
    Requirements: 4.0
  }, {
    Communication: 4.0,
    Resources: 4.0,
    Management: 4.0,
    Technical: 4.0,
    Requirements: 4.0
  }, {
    Communication: 4.0,
    Resources: 4.0,
    Management: 4.0,
    Technical: 4.0,
    Requirements: 4.0
  }, {
    Communication: 4.0,
    Resources: 4.0,
    Management: 4.0,
    Technical: 4.0,
    Requirements: 4.0
  }, {
    Communication: 4.0,
    Resources: 4.0,
    Management: 4.0,
    Technical: 4.0,
    Requirements: 4.0
  }]
};

exports.default = satisfactionAssessments;

});

require.register("js/mocked_data/teams/time_breakdowns.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var timeBreakdowns = {
  alpha: [{
    "Technical debt/refactoring": 0,
    "Bug fixing": 0,
    "Unscheduled meetings": 0.15,
    "Non-Sprint tasks": 0.05
  }, {
    "Technical debt/refactoring": 0.05,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0.2,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.05,
    "Bug fixing": 0.1,
    "Unscheduled meetings": 0.1,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.2,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0.05
  }, {
    "Technical debt/refactoring": 0.15,
    "Bug fixing": 0.15,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }],
  beta: [{
    "Technical debt/refactoring": 0,
    "Bug fixing": 0,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0.1,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.1,
    "Unscheduled meetings": 0.05,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.2,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.1,
    "Bug fixing": 0.3,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }],
  epsilon: [{
    "Technical debt/refactoring": 0,
    "Bug fixing": 0,
    "Unscheduled meetings": 0.2,
    "Non-Sprint tasks": 0.05
  }, {
    "Technical debt/refactoring": 0.2,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.1,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0.15,
    "Non-Sprint tasks": 0.05
  }, {
    "Technical debt/refactoring": 0.15,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0.1,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.1,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }],
  lambda: [{
    "Technical debt/refactoring": 0,
    "Bug fixing": 0,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0.1
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.1,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.1,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0.05,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.2,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.05,
    "Bug fixing": 0.1,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }],
  theta: [{
    "Technical debt/refactoring": 0,
    "Bug fixing": 0,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0.15,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.05,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0.1
  }, {
    "Technical debt/refactoring": 0.05,
    "Bug fixing": 0.1,
    "Unscheduled meetings": 0.1,
    "Non-Sprint tasks": 0
  }],
  tau: [{
    "Technical debt/refactoring": 0,
    "Bug fixing": 0,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.2,
    "Unscheduled meetings": 0.1,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0,
    "Bug fixing": 0.25,
    "Unscheduled meetings": 0,
    "Non-Sprint tasks": 0
  }, {
    "Technical debt/refactoring": 0.4,
    "Bug fixing": 0.1,
    "Unscheduled meetings": 0.1,
    "Non-Sprint tasks": 0
  }]
};

exports.default = timeBreakdowns;

});

require.register("js/mocked_data/user_stories.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require("../model");

var getStoryPoints = function getStoryPoints(userStories) {
  var sum = 0;
  for (var i = 0; i < userStories.length; i++) {
    sum += userStories[i].storyPoints;
  }
  return sum;
};

//95 points
var tauSprint5 = [new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-24"), new Date("2017-04-24"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-25"), new Date("2017-04-25"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-24"), new Date("2017-04-24"), true), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-24")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-26")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-28")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-27")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-04")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-02")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-04")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-04")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-03"))];
//102 points
var tauSprint4 = [
//14 points
new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-05"), new Date("2017-04-05"), true), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-05")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-05")),
//second round: 25 points
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-13")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-07")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14"))];
//99 points
var tauSprint3 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-16"), new Date("2017-03-16"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-19"), new Date("2017-03-19"), true), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-16")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-23")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-14"))];
//95 points
var tauSprint2 = [new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-22")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-25")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-22")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-01")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-02")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24"))];
//83 points
var tauSprint1 = [
//first round: 14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-01")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-31")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-05")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-05")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-09")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-08"))];

//100 points
var thetaSprint5 = [new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-24")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-26")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-28")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-27")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-04")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-29")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-02")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-04")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-04")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-05-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-05-03"))];
//102 points
var thetaSprint4 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-05")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-06"), new Date("2017-04-06"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-07"), new Date("2017-04-07"), true), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-05")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-13")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-07")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14"))];
//97 points
var thetaSprint3 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-16")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-16")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-15"), new Date("2017-03-15"), true), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-23")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-14"))];
//90 points
var thetaSprint2 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-22")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-01")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-02")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24"))];
//83 points
var thetaSprint1 = [
//first round: 14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-01")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-31")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-05")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-05")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-09")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-08"))];

//93
var lambdaSprint5 = [new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-19"), new Date("2017-04-19"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-18"), new Date("2017-04-18"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-17"), new Date("2017-04-17"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-17"), new Date("2017-04-17"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-04-18"), new Date("2017-04-18"), true), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-17")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-18")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-18")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-19")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-26")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-27")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-20")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-28")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-26")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-28")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-26")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-26")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-27")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-26")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-27"))];
//95
var lambdaSprint4 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-30"), new Date("2017-03-30"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-28"), new Date("2017-03-28"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-27"), new Date("2017-03-27"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-27"), new Date("2017-03-27"), true), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-27")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-27")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-27")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-28")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-30")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-07")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-07")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-05")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-07"))];
//90
var lambdaSprint3 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-15"), new Date("2017-03-15"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-16"), new Date("2017-03-16"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-03-15"), new Date("2017-03-15"), true), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-16")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-23")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-14"))];
//91
var lambdaSprint2 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-02-23"), new Date("2017-02-23"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-02-17"), new Date("2017-02-17"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-02-21"), new Date("2017-02-21"), true), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-02-16"), new Date("2017-02-16"), true), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-13")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-13")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-21")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-23")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-20")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-17")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-22")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-17")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-22")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-20")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-17")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-16")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-22")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24"))];
//84
var lambdaSprint1 = [
//first round: 14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-28")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-23")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-30")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-28")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-31")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-02")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-01")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-03")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-31")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-24")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-31")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-24")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-24"))];

//101 points
var epsSprint5 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-04-13"), new Date("2017-04-13"), true), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-04-14"), new Date("2017-04-14"), true), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-11")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-18")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-18")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-21")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20"))];
//105 points
var epsSprint4 = [new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-03-25"), new Date("2017-03-25"), true), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-22")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-24")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-28")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-31")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-31")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-28")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-29")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-30")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-30")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-31")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-28")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-30"))];
//101 points
var epsSprint3 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-03-01"), new Date("2017-03-01"), true), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-03-01"), new Date("2017-03-01"), true), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-07")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-08")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-09")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-07")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-04")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-06")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-08")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-08")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10"))];
//93 point
var epsSprint2 = [
//first round: 14 points
new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-02-09"), new Date("2017-02-09"), true), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-12")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-12")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-08")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-17")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-09")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-16")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-15")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-17")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-17")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-11"))];
//84 points
var epsSprint1 = [
//first round: 17 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-18")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-19")),
//second round: 23 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-25")),
//Third round: story points 28
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-21")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-27")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-24")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-23")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-26"))];

//90
var betaSprint5 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-11")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-18")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-18")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-21")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-21")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-20"))];
//95
var betaSprint4 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-25")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-22")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-24")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-28")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-31")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-28")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-29")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-30")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-30")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-29")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-31")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-28")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-31")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-30"))];
//90 points
var betaSprint3 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-07")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-08")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-09")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-07")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-04")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-06")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-08")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-08")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-10"))];
//85
var betaSprint2 = [
//first round: 14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-12")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-12")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-08")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-17")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-09")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-16")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-15")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-17")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-17")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-11"))];
//85 points
var betaSprint1 = [
//first round: 17 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-18")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-16")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-19")),
//second round: 26 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-25")),
//Third round: story points 28
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-27")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-21")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-25")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-26")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-24")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-26"))];

//88 points
var alphaSprint5 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-04")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-05")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-07")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-13")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-07")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-04-10")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-12")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-11")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-04-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-04-14"))];
//92 points
var alphaSprint4 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-16")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-15")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-20")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-23")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-17")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-15")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-14")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-13")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-14"))];
//99 points
var alphaSprint3 = [
//14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-20")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-21")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-22")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-01")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-02")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-03")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-01")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-03")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-03-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-23")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-24"))];
//92 points
var alphaSprint2 = [
//first round: 14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-02")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-01")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-05")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-01")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-05")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-31")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-05")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-03")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-05")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-09")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-02-10")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-02-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-02-08")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-07")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-10")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-02-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-07")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-07")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-09")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-08"))];
//84 points
var alphaSprint1 = [
//first round: 14 points 
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-11")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-11")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-16")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-10")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-10")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-11")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-13")),
//second round: 25 points 
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-16")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-12")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-13")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-16")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06"), new Date("2017-01-13")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-17")),
//Third round: story points 29
new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-16")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-18")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-18")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-13")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-18")),
//Fourth round: 16 point
new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"), new Date("2017-01-19")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06"), new Date("2017-01-20")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06"), new Date("2017-01-17"))];

var unassignedStories = [new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 3, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 13, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 8, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 2, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 1, new Date("2017-01-06")), new _model.UserStory("As a user i would like to go out and have fun", 5, new Date("2017-01-06"))];

var userStories = {
  alpha: [alphaSprint1, alphaSprint2, alphaSprint3, alphaSprint4, alphaSprint5],
  beta: [betaSprint1, betaSprint2, betaSprint3, betaSprint4, betaSprint5],
  epsilon: [epsSprint1, epsSprint2, epsSprint3, epsSprint4, epsSprint5],
  lambda: [lambdaSprint1, lambdaSprint2, lambdaSprint3, lambdaSprint4, lambdaSprint5],
  theta: [thetaSprint1, thetaSprint2, thetaSprint3, thetaSprint4, thetaSprint5],
  tau: [tauSprint1, tauSprint2, tauSprint3, tauSprint4, tauSprint5],
  unassigned: unassignedStories
};

exports.default = userStories;

});

require.register("js/model/defect.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define a defect discovered within a codebase.
 *
 * @param {String} description - a description of the defect
 * @param {Integer} criticality - an indicator of the severity of the defect
 * @param {Date} creationDate - the date the defect was discovered
 * @param {Date} resolutionDate - the date the defect was resolved
 */
var Defect = function () {
  function Defect(description, criticality, creationDate, resolutionDate) {
    _classCallCheck(this, Defect);

    this.description = description;
    this.criticality = criticality;
    this.creationDate = creationDate;
    this.resolutionDate = resolutionDate;
  }

  /**
   * Resolve this defect.
   *
   * @param {Date} resolutionDate - the date on which this defect is resolved
   */


  _createClass(Defect, [{
    key: "resolve",
    value: function resolve() {
      var resolutionDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      this.resolutionDate = resolutionDate;
    }
  }]);

  return Defect;
}();

exports.default = Defect;
;

});

require.register("js/model/happiness.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define a team happiness assessment.
 *
 * This assessment is used to log the current happiness of a given team.
 *
 * @param {Float} happiness - A happiness rating between 1-5
 * @param {Date} Date - The date on which the assessment takes place
 */
var Happiness = function Happiness(happiness) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

  _classCallCheck(this, Happiness);

  this.happiness = happiness;
  this.date = date;
};

exports.default = Happiness;

});

require.register("js/model/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserStory = exports.TimeBreakdown = exports.Team = exports.Sprint = exports.Satisfaction = exports.Repository = exports.Release = exports.maturity = exports.Practices = exports.Happiness = exports.Defect = undefined;

var _defect = require('./defect');

var _defect2 = _interopRequireDefault(_defect);

var _happiness = require('./happiness');

var _happiness2 = _interopRequireDefault(_happiness);

var _practices = require('./practices');

var _release = require('./release');

var _release2 = _interopRequireDefault(_release);

var _repository = require('./repository');

var _repository2 = _interopRequireDefault(_repository);

var _satisfaction = require('./satisfaction');

var _satisfaction2 = _interopRequireDefault(_satisfaction);

var _sprint = require('./sprint');

var _sprint2 = _interopRequireDefault(_sprint);

var _team = require('./team');

var _team2 = _interopRequireDefault(_team);

var _time_breakdown = require('./time_breakdown');

var _time_breakdown2 = _interopRequireDefault(_time_breakdown);

var _user_story = require('./user_story');

var _user_story2 = _interopRequireDefault(_user_story);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Defect = _defect2.default;
exports.Happiness = _happiness2.default;
exports.Practices = _practices.Practices;
exports.maturity = _practices.maturity;
exports.Release = _release2.default;
exports.Repository = _repository2.default;
exports.Satisfaction = _satisfaction2.default;
exports.Sprint = _sprint2.default;
exports.Team = _team2.default;
exports.TimeBreakdown = _time_breakdown2.default;
exports.UserStory = _user_story2.default;

});

require.register("js/model/practices.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Maturity assessment stages.
var maturity = {
  adoption: 1,
  adaptation: 2,
  acceptance: 3,
  routinisation: 4,
  infusion: 5
};

var Practices = function () {
  /**
   * Define a team practices assessment.
   *
   * Each set of practices consists of an object whose keys are practices, and
   * whose values is a maturity assessment. The latter should be set using
   * the maturity constants.
   *
   * @param {Object} scrumAssessment - A series of Scrum practices with maturity
   * assessments
   * @param {Object} xpAssessment - A series of XP practices with maturity
   * assessments
   * @param {Object} otherAssessment - A series of other practices (i.e. not
   * Scrum or XP) with maturity assessments
   * @param {Date} date - The date of the assessment
   */
  function Practices(scrumAssessment) {
    var xpAssessment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var otherAssessment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var date = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date();

    _classCallCheck(this, Practices);

    this.scrumAssessment = scrumAssessment;
    this.xpAssessment = xpAssessment;
    this.otherAssessment = otherAssessment;
    this.date = date;
  }

  _createClass(Practices, [{
    key: "combinedAssessment",
    value: function combinedAssessment() {
      var combined = Object.assign({}, this.scrumAssessment, this.xpAssessment, this.otherAssessment);
      console.log("Assessment", combined);
      return combined;
    }
  }, {
    key: "allPractices",
    value: function allPractices() {
      return Object.keys(this.combinedAssessment());
    }
  }, {
    key: "scrumPractices",
    value: function scrumPractices() {
      return Object.keys(this.scrumAssessment);
    }
  }, {
    key: "xpPractices",
    value: function xpPractices() {
      return Object.keys(this.xpAssessment);
    }
  }, {
    key: "otherPractices",
    value: function otherPractices() {
      return Object.keys(this.otherAssessment);
    }
  }]);

  return Practices;
}();

;

exports.Practices = Practices;
exports.maturity = maturity;

});

require.register("js/model/release.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dates = require("../lib/dates");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define one release within a development.

 * @param {Array[UserStory]} userStories - The stories comprising a release
 * @param {Date} plannedDate - The planned release date
 */
var Release = function () {
  function Release(userStories, plannedDate) {
    _classCallCheck(this, Release);

    this.userStories = userStories;
    this.plannedDate = plannedDate;
    this.sprints = [];
  }

  /**
   * Return a list of all teams involved in this release.
   *
   * @returns {Array[Team]} - a list of all teams participating in this release
   */


  _createClass(Release, [{
    key: "teams",
    value: function teams() {
      return this.sprints.reduce(function (allTeams, sprint) {
        var team = sprint.team;
        if (allTeams.indexOf(team) == -1) {
          allTeams.push(team);
        }
        return allTeams;
      }, []);
    }
  }, {
    key: "defectsOverTime",
    value: function defectsOverTime() {
      var combineDefectData = function combineDefectData(dataset1, dataset2) {
        var newDataset = Object.assign({}, dataset1);
        return Object.keys(dataset2).reduce(function (combinedDataset, dateKey) {
          combinedDataset[dateKey] = (combinedDataset[dateKey] || 0) + dataset2[dateKey];
          return combinedDataset;
        }, newDataset);
      };
      return this.teams().reduce(function (defectsData, team) {
        var teamDefectsData = team.defectsOverTimeData();
        if (defectsData.length == 0) {
          return teamDefectsData;
        } else {
          return defectsData.map(function (_ref, idx) {
            var description = _ref.description,
                data = _ref.data;

            return {
              description: description,
              data: combineDefectData(data, teamDefectsData[idx].data)
            };
          });
        }
      }, []);
    }

    /**
     * Return the start date of this release.
     *
     * The start date is the date the first sprint commences.
     *
     * @returns {Date} - the start date for this release
     */

  }, {
    key: "startDate",
    value: function startDate() {
      // Shortcut - assume it is the first sprint added
      return this.sprints[0].startDate();
    }

    /**
     * Return the end date of this release.
     *
     * The end date is later of the release date, and the end date of the final
     * sprint for this release.
     *
     * @returns {Date} - the end date for this release 
     */

  }, {
    key: "endDate",
    value: function endDate() {
      // Shortcut - assume the last sprint is the one with the latest end date
      return new Date(Math.max(this.plannedDate, this.finalSprintEndDate()));
    }

    /**
     * Return the end date of the latest sprint in this release, or today if this
     * date is in the future.
     * 
     * @returns {Date} - the end date for the latest sprint this release 
     */

  }, {
    key: "finalSprintEndDate",
    value: function finalSprintEndDate() {
      return new Date(Math.min(this.sprints[this.sprints.length - 1].endDate(), Date.now()));
    }
  }, {
    key: "planSprint",
    value: function planSprint(team, startDate, endDate, stories) {
      var sprintNum = 1,
          sprint = new Sprint(team, sprintNum, stories, startDate, endDate);
      this.sprints.push(sprint);
    }

    /**
     * Select all sprints for a given team.
     *
     * @param {String} teamName - the name of the team whose sprints to select
     * @returns {Array[Object]} - sprints for the given team
     */

  }, {
    key: "sprintsForTeam",
    value: function sprintsForTeam(teamName) {
      return this.sprints.filter(function (sprint) {
        return sprint.team.name == teamName;
      });
    }

    /**
     * Generate a set of velocity data for use in a velocity chart.
     *
     * @param {String} teamName - the name of the team whose velocity to collect
     * @returns {Array[Object]} - velocity data for use within a Velocity chart
     */

  }, {
    key: "velocityData",
    value: function velocityData(teamName) {
      var teamSprints = this.sprintsForTeam(teamName),
          sprintLabel = function sprintLabel(sprint) {
        return ["Sprint ", sprint.number, " (", (0, _dates.veryShortDate)(sprint.startDate()), " - ", (0, _dates.veryShortDate)(sprint.endDate()), ")"].join("");
      },
          commitment = teamSprints.reduce(function (commitmentData, sprint) {
        commitmentData[sprintLabel(sprint)] = sprint.committedStoryPoints();
        return commitmentData;
      }, {}),
          completed = teamSprints.reduce(function (completionData, sprint) {
        completionData[sprintLabel(sprint)] = sprint.completedStoryPoints();
        return completionData;
      }, {}),
          data = [{
        description: "Commitment",
        data: commitment
      }, {
        description: "Work Completed",
        data: completed
      }];
      return data;
    }

    /**
     * Generate a set of velocity trend data for use in a velocity chart.
     *
     * @param {String} teamName - the name of the team whose velocity to collect
     * @returns {Array[Object]} - velocity data for use within a Velocity chart
     */

  }, {
    key: "velocityTrendData",
    value: function velocityTrendData(teamName) {
      var teamSprints = this.sprintsForTeam(teamName),
          commitment = teamSprints.reduce(function (commitmentData, sprint) {
        commitmentData["Sprint " + sprint.number] = sprint.committedStoryPoints();
        return commitmentData;
      }, {}),
          completed = teamSprints.reduce(function (completionData, sprint) {
        completionData["Sprint " + sprint.number] = sprint.completedStoryPoints();
        return completionData;
      }, {}),
          completionRate = this.calcCompletionRate(teamSprints),
          averageVelocity = this.calcAverageVelocity(teamSprints),
          data = [{
        description: "Work Completed",
        data: completed
      }, {
        description: "Commitment",
        data: commitment
      }, {
        description: "Completion Rate",
        data: completionRate
      }, {
        description: "Average Velocity",
        data: averageVelocity
      }];
      return data;
    }
  }, {
    key: "calcAverageVelocity",
    value: function calcAverageVelocity(sprints) {
      var total = sprints.reduce(function (points, sprint) {
        return points + sprint.completedStoryPoints();
      }, 0),
          data = sprints.reduce(function (averagePoints, sprint) {
        averagePoints["Sprint " + sprint.number] = total / sprints.length;
        return averagePoints;
      }, {});
      return data;
    }

    /**
     * Calcs the completion rate for a list of sprints 
     * 
     * @param {Array[Sprint]} sprints - sprints for which you want to calc the completion rate
     * @returns {Object}
     */

  }, {
    key: "calcCompletionRate",
    value: function calcCompletionRate(sprints) {
      var data = sprints.reduce(function (completionRateData, sprint) {
        var completionRate = sprint.completedStoryPoints() / sprint.committedStoryPoints();
        var completionPercentage = completionRate * 100;
        completionRateData["Sprint " + sprint.number] = completionPercentage;
        return completionRateData;
      }, {});
      return data;
    }

    /**
     * Calculate the maximum value to use as upper bounds for velocity and
     * burndown charts. The max value is rounded to the nearest 20.
     *
     * @returns {Integer} - the maximum points committed or completed in any
     * sprint within this release
     */

  }, {
    key: "maximumPoints",
    value: function maximumPoints() {
      var rawMax = this.sprints.reduce(function (currentMax, thisSprint) {
        return Math.max(thisSprint.committedStoryPoints(), thisSprint.completedStoryPoints(), currentMax);
      }, 0);
      return Math.ceil(rawMax / 20) * 20;
    }

    /**
     * Generate burndown trend data for all sprints for a given team.
     *
     * @param {String} teamName - the name of the team whose burndown trend to collect
     * @returns {Array[Object]} - burndown trend data for use within a linechart
     */

  }, {
    key: "burndownData",
    value: function burndownData(teamName) {
      var sprints = this.sprintsForTeam(teamName),
          data = sprints.map(function (sprint) {
        var burndown = sprint.burndown().reduce(function (dataPoint, points, idx) {
          dataPoint[idx] = points;
          return dataPoint;
        }, {});
        return {
          description: "Sprint " + sprint.number,
          data: burndown
        };
      });
      return data;
    }
  }, {
    key: "burndownDataProduct",
    value: function burndownDataProduct() {
      var _this = this;

      var teamSprintsData = this.teams().map(function (team) {
        var teamSprints = _this.sprintsForTeam(team.name);
        var sprintTrendData = teamSprints.map(function (sprint) {
          var totalData = sprint.burndown();
          return totalData;
        }).reduce(function (teamSprintTotal, teamSprint, idx) {
          teamSprint.forEach(function (sprintDay, i) {
            teamSprintTotal[i] = (teamSprintTotal[i] || 0) + sprintDay;
          });
          return teamSprintTotal;
        }, []).reduce(function (sprintTrend, pointsTotal, idx) {
          sprintTrend[idx] = pointsTotal / teamSprints.length;
          return sprintTrend;
        }, {});
        return {
          description: "Team " + team.name,
          data: sprintTrendData
        };
      });
      return teamSprintsData;
    }
  }, {
    key: "practicesTrendData",
    value: function practicesTrendData() {
      var _this2 = this;

      var teamTrendData = this.teams().map(function (team) {
        return _this2.teamPracticeTrend(team);
      });
      console.log("trend", teamTrendData);

      return teamTrendData;
    }
  }, {
    key: "teamPracticeTrend",
    value: function teamPracticeTrend(team) {
      var practicesTrend = team.practiceAssessments.reduce(function (assessments, practices) {
        var scrumTotal = Object.values(practices.scrumAssessment).reduce(function (total, valueInAssesment) {
          return total + valueInAssesment;
        }, 0);
        assessments[(0, _dates.shortDate)(practices.date)] = scrumTotal / Object.values(practices.scrumAssessment).length;
        var xpTotal = Object.values(practices.xpAssessment).reduce(function (total, valueInAssesment) {
          return total + valueInAssesment;
        }, 0);
        assessments[(0, _dates.shortDate)(practices.date)] = xpTotal / Object.values(practices.xpAssessment).length;
        return assessments;
      }, {});
      return {
        description: "Team " + team.name,
        data: practicesTrend
      };
    }
  }, {
    key: "scrumPracticesAssessment",
    value: function scrumPracticesAssessment() {
      return this.teams().map(function (team) {
        var data = team.practiceAssessments.reduce(function (assessments, practices) {
          Object.values(practices.scrumAssessment).forEach(function (valueInAssesment) {
            assessments[(0, _dates.shortDate)(practices.date)] = (assessments[(0, _dates.shortDate)(practices.date)] || 0) + valueInAssesment;
          });
          return assessments;
        }, {});
        return data;
      }).reduce(function (assements, teamAssessment) {
        Object.keys(teamAssessment).forEach(function (date) {
          assements[date] = (assements[date] || 0) + teamAssessment[date];
        });
        return assements;
      }, {});
    }
  }, {
    key: "xpPracticesAssessment",
    value: function xpPracticesAssessment() {
      return this.teams().map(function (team) {
        var data = team.practiceAssessments.reduce(function (assessments, practices) {
          Object.values(practices.xpAssessment).forEach(function (valueInAssesment) {
            assessments[(0, _dates.shortDate)(practices.date)] = (assessments[(0, _dates.shortDate)(practices.date)] || 0) + valueInAssesment;
          });
          return assessments;
        }, {});
        return data;
      }).reduce(function (assements, teamAssessment) {
        Object.keys(teamAssessment).forEach(function (date) {
          assements[date] = (assements[date] || 0) + teamAssessment[date];
        });
        return assements;
      }, {});
    }
  }]);

  return Release;
}();

exports.default = Release;

});

require.register("js/model/repository.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function Repository(contributors) {
    _classCallCheck(this, Repository);

    this.contributors = contributors;
};

exports.default = Repository;

});

require.register("js/model/satisfaction.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define a satisfaction assessment.
 *
 * @param {Object} satisfaction - A series of satisfaction criteria, each with
 * a rating from 1-5
 * @param {Date} date - The date of this report
 */
var Satisfaction = function () {
  function Satisfaction(satisfaction) {
    var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

    _classCallCheck(this, Satisfaction);

    this.satisfaction = satisfaction;
    this.date = date;
  }

  _createClass(Satisfaction, [{
    key: "satisfactionCriteria",
    value: function satisfactionCriteria() {
      return Object.keys(this.satisfaction);
    }
  }, {
    key: "averageSatisfaction",
    value: function averageSatisfaction() {
      var _this = this;

      var keys = Object.keys(this.satisfaction);
      return keys.reduce(function (total, key) {
        return total + _this.satisfaction[key];
      }, 0) / keys.length;
    }
  }]);

  return Satisfaction;
}();

exports.default = Satisfaction;
;

});

require.register("js/model/sprint.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dates = require('../lib/dates');

var _array = require('../lib/array');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var makeBurndownTrend = function makeBurndownTrend(startVal, dataPoints) {
  var delta = startVal / (Object.keys(dataPoints).length - 1);
  var trend = Object.keys(dataPoints).reduce(function (trendLine, label, i) {
    trendLine[label] = startVal - i * delta;
    return trendLine;
  }, {});
  return trend;
};

/**
 * Calculate the total number of story points in a list of stories.
 *
 * @param {Array[UserStory]} userStories - the list of stories to carry out the
 * calculation on
 * @return {Integer} - the total number of points contained within the stories
 */
var sumStoryPoints = function sumStoryPoints(userStories) {
  return (userStories || []).reduce(function (runningTotal, currentStory) {
    return runningTotal + currentStory.storyPoints;
  }, 0);
};

/**
 * Define a sprint within an agile development.
 *
 * @param {Team} team - the team undertaking this sprint
 * @param {Integer} number - the number of this sprint within the development
 * @param {Array[UserStory]} userStories - the user stories within this sprint
 * @param {Date} startDate - the date on which the sprint commences
 * @param {Date} endDate - the date on which the sprint ends
 */

var Sprint = function () {
  function Sprint(team, number, userStories, startDate, endDate) {
    _classCallCheck(this, Sprint);

    this.team = team;
    this.number = number;
    this.userStories = userStories;
    this.period = (0, _dates.makePeriod)(startDate, endDate);
  }

  _createClass(Sprint, [{
    key: 'startDate',
    value: function startDate() {
      return this.period[0];
    }
  }, {
    key: 'endDate',
    value: function endDate() {
      return this.period[this.period.length - 1];
    }

    /**
     * Calculate the total story points committed to in this Sprint.
     *
     * @returns {Integer} - total committed story points
     */

  }, {
    key: 'committedStoryPoints',
    value: function committedStoryPoints() {
      return sumStoryPoints(this.userStories);
    }

    /**
     * Calculate the total story points completed in this Sprint.
     *
     * If this Sprint is still in progress, this function returns the total
     * completed to date.
     *
     * @returns {Integer} - total completed story points
     */

  }, {
    key: 'completedStoryPoints',
    value: function completedStoryPoints() {
      var completedStories = this.userStories.filter(function (story) {
        return story.dateDone;
      });
      return sumStoryPoints(completedStories);
    }

    /**
     * Calculate the total story points from completed additional stories.
     *
     * Additional stories are those which are out of the original scope for a
     * release, but have been added anyway.
     *
     * @returns {Integer} - total completed additional story points
     */

  }, {
    key: 'additionalStoryPoints',
    value: function additionalStoryPoints() {
      var additionalStories = this.userStories.filter(function (story) {
        return story.isAdditional && story.dateDone;
      });
      return sumStoryPoints(additionalStories);
    }

    /**
     * Group and list story completions by date.
     *
     * This function groups all user stories by the date on which they were
     * completed. An array is returned, where the index is the number of days from
     * sprint commencement on which the story was complete. For example, a story
     * completed on the third day of the sprint will be found within an array of
     * stories at index 3 of the array.
     *
     * @returns {Array[Array[UserStory]]} - a nested array of user stories,
     * grouped by completion date
     */

  }, {
    key: 'storyCompletions',
    value: function storyCompletions() {
      var _this = this;

      var grouped = (0, _array.groupBy)(this.userStories, function (story) {
        return (0, _dates.dateDiff)(story.dateDone, _this.period[0]);
      }),
          days = [].concat(_toConsumableArray(Array((0, _dates.dateDiff)(this.period[0], this.period[this.period.length - 1])).keys()));
      return days.map(function (dayNumber) {
        return grouped[dayNumber];
      });
    }

    /**
     * Calculate the number of story points completed each day.
     *
     * Similarly to storyCompletions(), this indexes by day of the sprint the
     * number of story points completed in a given day.
     *
     * @returns {Array[Integer]} - a list of story points completed each day
     */

  }, {
    key: 'completedPointsByDay',
    value: function completedPointsByDay() {
      return this.storyCompletions().map(function (stories) {
        return sumStoryPoints(stories);
      });
    }

    /**
     * Calculate the burndown over the course of this sprint.
     *
     * @returns {Array[Integer]} - a list of the number of remaining story points
     * at the end of each day of a sprint
     */

  }, {
    key: 'burndown',
    value: function burndown() {
      return this.completedPointsByDay().reduce(function (dailyCumulative, currPoints) {
        var previousTotal = dailyCumulative[dailyCumulative.length - 1],
            newTotal = previousTotal - currPoints;
        dailyCumulative.push(newTotal);
        return dailyCumulative;
      }, [this.committedStoryPoints()]);
    }

    /**
     * Generate burndown data for use in charts.
     *
     * @returns {Array[Object]} - burndown data for use in a sprint burndown 
     */

  }, {
    key: 'burndownData',
    value: function burndownData() {
      var remaining = this.burndown().reduce(function (data, points, idx) {
        data[idx] = points;
        return data;
      }, {});
      return [{
        description: "Ideal Burndown",
        data: makeBurndownTrend(this.committedStoryPoints(), remaining),
        chartType: "line",
        borderDash: [10, 5]
      }, {
        description: "Remaining Effort",
        data: remaining
      }];
    }
  }]);

  return Sprint;
}();

exports.default = Sprint;
;

});

require.register("js/model/team.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dates = require('../lib/dates');

var _rgb = require('../lib/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

var _array = require('../lib/array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define a Scrum team.

 * @param {String} name - the name of the team
 */
var Team = function () {
  function Team(name) {
    _classCallCheck(this, Team);

    this.name = name;
    // Initialise a series of arrays for collecting data on the team.
    this.practiceAssessments = [];
    this.defects = [];
    this.happinessAssessments = [];
    this.satisfactionAssessments = [];
    this.timeBreakdowns = [];
    this.repositories = [];
  }

  _createClass(Team, [{
    key: 'getTeamByName',
    value: function getTeamByName(teamName) {
      if (teamName === this.name) {
        return this;
      }
    }

    /**
     * Add a practices assessment to this team.
     *
     * @param {Practices} practices - One practices assessment for this team
     */

  }, {
    key: 'addPracticeAssessment',
    value: function addPracticeAssessment(practices) {
      this.practiceAssessments.push(practices);
    }

    /**
     * Add a defect for this team.
     *
     * @param {Defect} defect - A defect assigned to this team
     */

  }, {
    key: 'addDefect',
    value: function addDefect(defect) {
      this.defects.push(defect);
    }

    /**
     * Add a happiness assessment for this team.
      * @param {Happiness} happiness - A happiness assessment for this team
     */

  }, {
    key: 'addHappinessAssessment',
    value: function addHappinessAssessment(happiness) {
      this.happinessAssessments.push(happiness);
    }

    /**
     * Add a satisfaction assessment for this team.
     *
     * @param {Satisfaction} satisfaction - A satisfaction assessment for this team
     */

  }, {
    key: 'addSatisfactionAssessment',
    value: function addSatisfactionAssessment(satisfaction) {
      this.satisfactionAssessments.push(satisfaction);
    }

    /**
     * Add a time breakdown for this team.
     *
     * @param {TimeBreakdown} breakdown - A time breakdown for this team
     */

  }, {
    key: 'addTimeBreakdown',
    value: function addTimeBreakdown(breakdown) {
      this.timeBreakdowns.push(breakdown);
    }

    /**
     * Generate a set of happiness data for this team, for use in charts.
     *
     * @returns {Array[Object]} - A set of chart data for a happiness index chart
     */

  }, {
    key: 'happinessData',
    value: function happinessData() {
      var data = this.happinessAssessments.reduce(function (allAssessments, happinessAssessment) {
        allAssessments[(0, _dates.shortDate)(happinessAssessment.date)] = happinessAssessment.happiness;
        return allAssessments;
      }, {});
      return [{
        description: "Happiness",
        data: data
      }];
    }
  }, {
    key: 'satisfactionData',
    value: function satisfactionData() {
      var _this = this;

      var criteria = this.satisfactionAssessments[0].satisfactionCriteria(),
          dataForCriterion = function dataForCriterion(criterion) {
        var dataset = _this.satisfactionAssessments.reduce(function (all, assessment) {
          all[(0, _dates.shortDate)(assessment.date)] = assessment.satisfaction[criterion];
          return all;
        }, {});
        return {
          description: criterion,
          data: dataset
        };
      },
          data = criteria.map(dataForCriterion);
      return data;
    }
  }, {
    key: 'practicesData',
    value: function practicesData() {
      var _this2 = this;

      if (this.practiceAssessments.length == 0) {
        return [];
      };
      var criteria = this.practiceAssessments[0].allPractices(),
          dataForCriterion = function dataForCriterion(criterion) {
        var dataset = _this2.practiceAssessments.reduce(function (all, practices) {
          var assessment = practices.combinedAssessment();
          all[(0, _dates.shortDate)(practices.date)] = assessment[criterion];
          return all;
        }, {});
        return {
          description: criterion,
          data: dataset
        };
      },
          data = criteria.map(dataForCriterion);
      return data;
    }
  }, {
    key: 'practicesDataByPractice',
    value: function practicesDataByPractice() {
      if (this.practiceAssessments.length == 0) {
        return [];
      };
      var criteria = this.practiceAssessments[0].allPractices(),
          dataForAssessment = function dataForAssessment(assessment) {
        return {
          description: (0, _dates.shortDate)(assessment.date),
          data: assessment.combinedAssessment(),
          backgroundColor: new _rgb2.default(200, 25, 50)
        };
      },
          data = this.practiceAssessments.map(dataForAssessment);
      return data;
    }
  }, {
    key: 'sprintInterferenceData',
    value: function sprintInterferenceData() {
      var _this3 = this;

      var criteria = this.timeBreakdowns[0].tasks(),
          dataForCriterion = function dataForCriterion(criterion) {
        var dataset = _this3.timeBreakdowns.reduce(function (all, breakdowns) {
          all[(0, _dates.shortDate)(breakdowns.date)] = breakdowns.breakdown[criterion];
          return all;
        }, {});
        return {
          description: criterion,
          data: dataset
        };
      },
          data = criteria.map(dataForCriterion);
      return data;
    }
    /**
     * Will sort a JSON object by its keys in ascending order
     * @param {Object} object 
     */

  }, {
    key: 'sortObjectAscending',
    value: function sortObjectAscending(object) {
      var sortedObject = Object.keys(object).sort().reduce(function (data, key) {
        data[key] = object[key];
        return data;
      }, {});
      return sortedObject;
    }
  }, {
    key: 'codeOwnershipData',
    value: function codeOwnershipData() {
      var codeOwnershipData = this.repositories.reduce(function (data, repository) {
        var key = repository.contributors.length + " teammembers";
        if (key in data) {
          data[key]++;
        } else {
          data[key] = 1;
        }
        return data;
      }, {}),
          sortedData = this.sortObjectAscending(codeOwnershipData);
      return [{
        description: "Team " + this.name + " code ownership",
        data: sortedData
      }];
    }
  }, {
    key: 'defectsOverTimeData',
    value: function defectsOverTimeData() {
      var defectsByCreation = (0, _array.groupBy)(this.defects, function (defect) {
        return defect.creationDate;
      }),
          defectsByResolution = (0, _array.groupBy)(this.defects, function (defect) {
        return defect.resolutionDate;
      }),
          firstDefectDate = new Date(Math.min.apply(null, this.defects.map(function (defect) {
        return defect.creationDate;
      }))),
          defectsPeriod = (0, _dates.makePeriod)(firstDefectDate, new Date()),
          defectsByCriticality = defectsPeriod.reduce(function (defectsData, date) {
        var group = function group(defects) {
          return (0, _array.groupBy)(defects, function (defect) {
            return defect.criticality;
          });
        },
            newDefects = group(defectsByCreation[date] || []),
            fixedDefects = group(defectsByResolution[date] || []),
            previousDate = (0, _dates.addDays)(date, -1);
        [1, 2, 3, 4, 5].forEach(function (criticality) {
          var thisCriticality = defectsData[criticality] || {},
              numberNewDefects = (newDefects[criticality] || []).length,
              numberResolvedDefects = (fixedDefects[criticality] || []).length,
              previousDefects = thisCriticality[(0, _dates.shortDate)(previousDate)] || 0;
          thisCriticality[(0, _dates.shortDate)(date)] = previousDefects + numberNewDefects - numberResolvedDefects;
          defectsData[criticality] = thisCriticality;
        });
        return defectsData;
      }, {});
      return Object.keys(defectsByCriticality).map(function (key) {
        return {
          description: "Criticality " + key,
          data: defectsByCriticality[key]
        };
      });
    }
  }]);

  return Team;
}();

exports.default = Team;
;

});

require.register("js/model/time_breakdown.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define a team time breakdown.
 *
 * A team time breakdown illustrates the approximate time spent by the team
 * on different activities during a sprint.
 *
 * @param {Object} breakdown - A series of activity types (e.g. user stories,
 * bug fixing, refactoring, unscheduled meetings, removed from team), each with
 * the total number of person-days across the whole team for each
 * @param {Date} date - The date of this report
 */
var TimeBreakdown = function () {
  function TimeBreakdown(breakdown) {
    var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

    _classCallCheck(this, TimeBreakdown);

    this.breakdown = breakdown;
    this.date = date;
  }

  /**
   * List the tasks contained within this breakdown.
   *
   * @returns {Array[String]} - a list of the tasks contained within this
   * breakdown 
   */


  _createClass(TimeBreakdown, [{
    key: "tasks",
    value: function tasks() {
      return Object.keys(this.breakdown);
    }
  }]);

  return TimeBreakdown;
}();

exports.default = TimeBreakdown;

});

require.register("js/model/user_story.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserStory =
/**
 * Construct a UserStory value.
  * @param {string} description - A description of the story
 * @param {integer} storyPoints - The number of story points for this story
 * @param {date} dateAdded - The date this story was added to a release
 * @param {date} dateDone - The date this story was complete
 * @param {boolean} isAdditional - Flag whether this story is added to a
 * release post-planning, i.e. is additional to scope
 */
function UserStory(description, storyPoints, dateAdded, dateDone, isAdditional) {
  _classCallCheck(this, UserStory);

  this.description = description;
  this.storyPoints = storyPoints;
  this.dateAdded = dateAdded;
  this.dateDone = dateDone;
  this.isAdditional = isAdditional;
};

exports.default = UserStory;
;

});

require.register("js/reducers/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _metrics_reducer = require('./metrics_reducer');

var _metrics_reducer2 = _interopRequireDefault(_metrics_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  metrics: _metrics_reducer2.default
});

exports.default = allReducers;

});

require.register("js/reducers/metrics_reducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mocked_data = require('../mocked_data');

var _dashboards = require('../components/dashboards');

var initialState = {
  currentMetric: _dashboards.Dashboard,
  currentTeam: null,
  // New data
  release: _mocked_data.release,
  teams: _mocked_data.teams,
  options: {}
};

var metricsReducer = function metricsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var opts = state.options,
      newOpts = opts;
  switch (action.type) {
    case "SELECT_METRIC":
      return Object.assign({}, state, {
        currentMetric: action.metric
      });
    case "SELECT_TEAM":
      return Object.assign({}, state, {
        currentTeam: action.teamName
      });
    case "SELECT_TEAM_DASHBOARD":
      return Object.assign({}, state, {
        currentTeam: action.teamName,
        currentMetric: action.dashboard
      });
    case "SELECT_SPRINT":
      newOpts = Object.assign({}, opts, {
        focusedSprint: action.sprint
      });
      return Object.assign({}, state, {
        options: newOpts
      });
    case "BURNUP_BREAKDOWN_BY_TEAMS":
      newOpts = Object.assign({}, opts, {
        burnupTeamBreakdown: !opts.burnupTeamBreakdown
      });
      return Object.assign({}, state, {
        options: newOpts
      });
    case "PRACTICES_BY_PRACTICE":
      console.log("PRACTICES BY PRACTICE", opts);
      newOpts = Object.assign({}, opts, {
        practicesByPractice: !opts.practicesByPractice
      });
      return Object.assign({}, state, {
        options: newOpts
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