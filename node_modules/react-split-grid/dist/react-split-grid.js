/*! react-split-grid - v1.0.4 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('split-grid')) :
    typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'split-grid'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReactSplitGrid = factory(global.React, global.PropTypes, global.Split));
}(this, (function (React, PropTypes, Split) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
    var Split__default = /*#__PURE__*/_interopDefaultLegacy(Split);

    function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

    var ReactSplitGrid = /*@__PURE__*/(function (superclass) {
        function ReactSplitGrid(props) {
            superclass.call(this, props);

            this.columnGutters = {};
            this.rowGutters = {};

            this.state = {
                gridTemplateColumns: props.gridTemplateColumns
                    ? props.gridTemplateColumns
                    : null,
                gridTemplateRows: props.gridTemplateRows
                    ? props.gridTemplateRows
                    : null,
            };

            this.getGridProps = this.getGridProps.bind(this);
            this.getGutterProps = this.getGutterProps.bind(this);
            this.handleDragStart = this.handleDragStart.bind(this);
            this.writeStyle = this.writeStyle.bind(this);
            this.onDrag = this.onDrag.bind(this);
        }

        if ( superclass ) ReactSplitGrid.__proto__ = superclass;
        ReactSplitGrid.prototype = Object.create( superclass && superclass.prototype );
        ReactSplitGrid.prototype.constructor = ReactSplitGrid;

        ReactSplitGrid.prototype.componentDidMount = function componentDidMount () {
            var ref = this.props;
            ref.children;
            var rest = objectWithoutProperties( ref, ["children"] );
            var options = rest;

            options.writeStyle = this.writeStyle;
            options.onDrag = this.onDrag;

            this.split = Split__default['default'](options);
        };

        ReactSplitGrid.prototype.componentDidUpdate = function componentDidUpdate (prevProps) {
            var this$1 = this;

            var ref = this.props;
            var columnMinSizes = ref.columnMinSizes;
            var rowMinSizes = ref.rowMinSizes;
            ref.columnMaxSizes;
            var rowMaxSizes = ref.rowMaxSizes;
            ref.children;
            var rest = objectWithoutProperties( ref, ["columnMinSizes", "rowMinSizes", "columnMaxSizes", "rowMaxSizes", "children"] );
            var options = rest;

            var prevColumnMinSizes = prevProps.columnMinSizes;
            var prevRowMinSizes = prevProps.rowMinSizes;
            prevProps.columnMaxSizes;
            var prevRowMaxSizes = prevProps.rowMaxSizes;

            var otherProps = [
                'minSize',
                'maxSize',
                'columnMinSize',
                'rowMinSize',
                'columnMaxSize',
                'rowMaxSize',
                'columnMinSizes',
                'rowMinSizes',
                'columnMaxSizes',
                'rowMaxSizes',
                'snapOffset',
                'columnSnapOffset',
                'rowSnapOffset',
                'dragInterval',
                'columnDragInterval',
                'rowDragInterval',
                'cursor',
                'columnCursor',
                'rowCursor' ];

            var needsRecreate = otherProps
                // eslint-disable-next-line react/destructuring-assignment
                .map(function (prop) { return this$1.props[prop] !== prevProps[prop]; })
                .reduce(function (accum, same) { return accum || same; }, false);

            // TODO use deep equals
            if (columnMinSizes !== prevColumnMinSizes) {
                needsRecreate = true;
            }

            if (rowMinSizes !== prevRowMinSizes) {
                needsRecreate = true;
            }

            if (rowMaxSizes !== prevRowMaxSizes) {
                needsRecreate = true;
            }

            // Destroy and re-create split if options changed
            if (needsRecreate) {
                options.columnMinSizes = columnMinSizes;
                options.rowMinSizes = rowMinSizes;

                this.split.destroy(false);

                this.split = Split__default['default'](options);
            }
        };

        ReactSplitGrid.prototype.componentWillUnmount = function componentWillUnmount () {
            this.split.destroy();
            delete this.split;
        };

        ReactSplitGrid.getDerivedStateFromProps = function getDerivedStateFromProps (nextProps, prevState) {
            var state = {};
            var needsSetState = false;

            if (
                nextProps.gridTemplateColumns &&
                nextProps.gridTemplateColumns !== prevState.gridTemplateColumns
            ) {
                state.gridTemplateColumns = nextProps.gridTemplateColumns;
                needsSetState = true;
            }

            if (
                nextProps.gridTemplateRows &&
                nextProps.gridTemplateRows !== prevState.prevGridTemplateRows
            ) {
                state.gridTemplateRows = nextProps.gridTemplateRows;
                needsSetState = true;
            }

            if (needsSetState) {
                return state
            }

            return null
        };

        ReactSplitGrid.prototype.onDrag = function onDrag (direction, track, style) {
            var ref = this.props;
            var onDrag = ref.onDrag;

            if (onDrag) {
                onDrag(direction, track, style);
            }
        };

        ReactSplitGrid.prototype.getGridProps = function getGridProps () {
            var ref = this.state;
            var gridTemplateColumns = ref.gridTemplateColumns;
            var gridTemplateRows = ref.gridTemplateRows;
            var style = {};

            if (gridTemplateColumns) {
                style.gridTemplateColumns = gridTemplateColumns;
            }

            if (gridTemplateRows) {
                style.gridTemplateRows = gridTemplateRows;
            }

            return {
                style: style,
            }
        };

        ReactSplitGrid.prototype.getGutterProps = function getGutterProps (direction, track) {
            return {
                onMouseDown: this.handleDragStart(direction, track),
                onTouchStart: this.handleDragStart(direction, track),
            }
        };

        ReactSplitGrid.prototype.handleDragStart = function handleDragStart (direction, track) {
            var this$1 = this;

            return function (e) {
                this$1.split.handleDragStart(e, direction, track);
            }
        };

        ReactSplitGrid.prototype.writeStyle = function writeStyle (element, gridTemplateProp, style) {
            var state = {};

            if (gridTemplateProp === 'grid-template-columns') {
                state.gridTemplateColumns = style;
            } else if (gridTemplateProp === 'grid-template-rows') {
                state.gridTemplateRows = style;
            }

            this.setState(state);
        };

        ReactSplitGrid.prototype.render = function render () {
            var ref = this.props;
            var component = ref.component;
            var render = ref.render;
            var children = ref.children;
            var props = {
                getGridProps: this.getGridProps,
                getGutterProps: this.getGutterProps,
            };

            /* eslint-disable no-nested-ternary */
            return component
                ? React__default['default'].createElement(component, props)
                : render
                ? render(props)
                : children
                ? typeof children === 'function'
                    ? children(props)
                    : !(React__default['default'].Children.count(children) === 0)
                    ? React__default['default'].Children.only(children)
                    : null
                : null
        };

        return ReactSplitGrid;
    }(React__default['default'].Component));

    ReactSplitGrid.propTypes = {
        component: PropTypes__default['default'].element,
        render: PropTypes__default['default'].func,
        children: PropTypes__default['default'].element,
        gridTemplateColumns: PropTypes__default['default'].string,
        gridTemplateRows: PropTypes__default['default'].string,
        columnMinSizes: PropTypes__default['default'].objectOf(PropTypes__default['default'].number),
        rowMinSizes: PropTypes__default['default'].objectOf(PropTypes__default['default'].number),
        columnMaxSizes: PropTypes__default['default'].objectOf(PropTypes__default['default'].number),
        rowMaxSizes: PropTypes__default['default'].objectOf(PropTypes__default['default'].number),
        onDrag: PropTypes__default['default'].func,
    };

    ReactSplitGrid.defaultProps = {
        component: undefined,
        render: undefined,
        children: undefined,
        gridTemplateColumns: undefined,
        gridTemplateRows: undefined,
        columnMinSizes: undefined,
        rowMinSizes: undefined,
        columnMaxSizes: undefined,
        rowMaxSizes: undefined,
        onDrag: undefined,
    };

    return ReactSplitGrid;

})));
