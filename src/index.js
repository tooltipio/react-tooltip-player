import React, {Component} from 'react';
import PropTypes from 'prop-types';

const isDOMReady = !!((typeof window !== 'undefined' && window.document && window.document.createElement));

const MethodList = ["identify", "goal", "updateUserData", "start", "stop", "refresh", "show", "hide", "on"];


/**
 * Shared vars
 *
 * */
const TooltipAPI = {};
const BeforeLoadAPIRequests = [];

function waitForTooltipAPI(method, args) {
    if (window.Tooltip && window.Tooltip.API) {
        window.Tooltip.API[method].apply(null, args);
    } else {
        setTimeout(function () {
            waitForTooltipAPI(method, args);
        }, 250);
    }
}

/**
 * Temp API methods (until player API loaded)
 *
 * */
MethodList.forEach((methodName) => {
    TooltipAPI[methodName] = function (method) {
        return function () {
            const args = Array.prototype.slice.call(arguments);

            if (!window.Tooltip) {
                BeforeLoadAPIRequests.push({method: method, args: args})
            } else if (window.Tooltip && window.Tooltip.API) {
                window.Tooltip.API[method].apply(null, args);
            } else {
                waitForTooltipAPI(method, args);
            }
        }
    }(methodName)
});


export {TooltipAPI};


/**
 * Tooltip Main Component player.js
 *
 * */

export default class TooltipPlayer extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        userData: PropTypes.object,
        async: PropTypes.bool
    };

    static displayName = 'Tooltip';

    constructor(props) {
        super(props);

        const {
            projectId,
            userData,
            async,
            ...otherProps,
        } = props;

        if (!projectId || !isDOMReady) {
            return;
        }

        if (!window.Tooltip) {
            ((w, t, e) => {
                w.Tooltip = {
                    _apiKey: projectId,
                    cs: BeforeLoadAPIRequests
                };

                let n = t.createElement(e);
                let s = t.getElementsByTagName(e)[0];

                n.src = "https://cdn.tooltip.io/static/player.js";
                n.type = "text/javascript";
                n.async = (typeof async !== 'undefined') ? async : true;
                s.parentNode.insertBefore(n, s);
            })(window, document, "script");
        }

        if (userData) window.TooltipUserData = userData;
    }

    componentWillReceiveProps(nextProps) {
        const {
            projectId,
            userData,
            ...otherProps,
        } = nextProps;

        if (!isDOMReady) return;

        if (!window.Tooltip) {
            if (userData) window.TooltipUserData = userData;
        } else {

        }
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        if (!isDOMReady || !window.Tooltip) {
            return false;
        }


        try {
            if (window.Tooltip.API) {
                window.Tooltip.API.stop();
            }
        } catch (e) {
            console.error(e);
        }

        delete window.Tooltip;
        delete window.TooltipUserData;
    }


    render() {
        return false;
    }
}