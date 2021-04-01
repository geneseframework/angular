(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('genese-mapper'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@genese/angular', ['exports', '@angular/core', '@angular/common/http', 'genese-mapper', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.genese = global.genese || {}, global.genese.angular = {}), global.ng.core, global.ng.common.http, global.geneseMapper, global.rxjs, global.rxjs.operators));
}(this, (function (exports, i0, http, geneseMapper, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    // @dynamic
    var Tools = /** @class */ (function () {
        function Tools() {
        }
        /**
         * clone object with deep copy
         */
        Tools.clone = function (model) {
            var _this = this;
            if (model) {
                if (Array.isArray(model)) {
                    var newArray_1 = [];
                    model.forEach(function (item) { return newArray_1.push(_this.clone(item)); });
                    return newArray_1;
                }
                else if (typeof model === 'object') {
                    var newObject_1 = {};
                    Object.keys(model).forEach(function (key) { return newObject_1[key] = _this.clone(model[key]); });
                    return newObject_1;
                }
                else {
                    return model;
                }
            }
            else {
                return model;
            }
        };
        /**
         * Check if an object is a primitive or not
         */
        Tools.isPrimitive = function (target) {
            return typeof target === 'string'
                || typeof target === 'number'
                || typeof target === 'boolean';
        };
        /**
         * Returns a value by default if value to check doesn't exists
         */
        Tools.default = function (valueToCheck, valueByDefault) {
            return valueToCheck ? valueToCheck : valueByDefault;
        };
        /**
         * Check if two objects have the same values for every key
         */
        Tools.isSameObject = function (obj1, obj2) {
            var e_1, _a, e_2, _b;
            if (obj1 === obj2) {
                return true;
            }
            if (typeof obj1 === 'number' && obj1.toString() === obj2.toString()) {
                return true;
            }
            if ((obj1 === undefined || obj2 === undefined)
                || (Array.isArray(obj1) && !Array.isArray(obj2))
                || (!Array.isArray(obj1) && Array.isArray(obj2))
                || (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length !== obj2.length)) {
                return false;
            }
            if (Array.isArray(obj1) && Array.isArray(obj2)) {
                var index = 0;
                try {
                    for (var obj1_1 = __values(obj1), obj1_1_1 = obj1_1.next(); !obj1_1_1.done; obj1_1_1 = obj1_1.next()) {
                        var element = obj1_1_1.value;
                        if (!this.isSameObject(element, obj2[index])) {
                            return false;
                        }
                        index++;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (obj1_1_1 && !obj1_1_1.done && (_a = obj1_1.return)) _a.call(obj1_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return true;
            }
            else {
                try {
                    for (var _c = __values(Object.keys(obj1)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        if ((!obj2[key] && !!obj1[key]) || (!!obj2[key] && !obj1[key])) {
                            return false;
                        }
                        if (Array.isArray(obj1[key])) {
                            if (!this.isSameObject(obj1[key], obj2[key])) {
                                return false;
                            }
                        }
                        else {
                            if (typeof obj1[key] === 'object') {
                                if (!this.isSameObject(obj1[key], obj2[key])) {
                                    return false;
                                }
                            }
                            else {
                                if (obj1[key] && obj2[key] && obj1[key].toString() !== obj2[key].toString()) {
                                    return false;
                                }
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return true;
        };
        // --------------------------------------------------
        //                  REQUEST METHODS
        // --------------------------------------------------
        Tools.isPath = function (str) {
            return /^\/[-a-zA-Z0-9@:%.{}_+~#=]?/.test(str);
        };
        /**
         * Get the root path of the api
         */
        Tools.apiRoot = function (rootApi, path, id) {
            var url = path ? rootApi + path : rootApi;
            return id ? url + "/" + id : url;
        };
        /**
         * Check if the id is correct
         */
        Tools.checkId = function (id) {
            if (!id || !(+id > 0)) {
                throw Error('Incorrect Genese id.');
            }
        };
        /**
         * Check if the path is correct
         */
        Tools.checkPath = function (path) {
            if (!path || typeof path !== 'string') {
                throw Error('Incorrect Genese path.');
            }
        };
        return Tools;
    }());
    Tools.decorators = [
        { type: i0.Injectable }
    ];
    Tools.ctorParameters = function () { return []; };

    var GeneseEnvironmentService = /** @class */ (function () {
        function GeneseEnvironmentService() {
        }
        // --------------------------------------------------
        //                     METHODS
        // --------------------------------------------------
        /**
         * Configure Genese environment
         */
        GeneseEnvironmentService.prototype.setEnvironment = function (config) {
            if (config) {
                this.api = Tools.default(config.api, 'http://localhost:3000');
                this.extract = Tools.default(config.extract, 'gnExtract');
                if (config.pagination) {
                    this.pageIndex = Tools.default(config.pagination.pageIndex, 'gnPageIndex');
                    this.pageSize = Tools.default(config.pagination.pageSize, 'gnPageSize');
                    this.results = Tools.default(config.pagination.results, 'gnPageResults');
                    this.totalResults = Tools.default(config.pagination.totalResults, 'gnPageTotalResults');
                }
            }
        };
        return GeneseEnvironmentService;
    }());
    GeneseEnvironmentService.decorators = [
        { type: i0.Injectable }
    ];
    GeneseEnvironmentService.ctorParameters = function () { return []; };

    (function (ResponseStatus) {
        ResponseStatus["FAILED"] = "FAILED";
        ResponseStatus["SUCCESS"] = "SUCCESS";
    })(exports.ResponseStatus || (exports.ResponseStatus = {}));

    (function (RequestMethod) {
        RequestMethod["DELETE"] = "delete";
        RequestMethod["GET"] = "get";
        RequestMethod["PATCH"] = "patch";
        RequestMethod["POST"] = "post";
        RequestMethod["PUT"] = "put";
    })(exports.RequestMethod || (exports.RequestMethod = {}));

    var Genese = /** @class */ (function () {
        function Genese(http, geneseEnvironment, tConstructor) {
            this.http = http;
            this.geneseEnvironment = geneseEnvironment;
            this.tConstructor = tConstructor;
            this.geneseMapperService = new geneseMapper.GeneseMapper(tConstructor);
        }
        // --------------------------------------------------
        //                   CRUD METHODS
        // --------------------------------------------------
        /**
         * Creates an object and return an Observable of the created object with T type
         * @deprecated since 1.2.0. Please use post() method instead
         */
        Genese.prototype.create = function (newObject, options) {
            var _this = this;
            this.checkTType(newObject);
            return this.http.post(this.apiRoot(this.getStandardPath()), newObject, this.getRequestOptions(options))
                .pipe(operators.map(function (result) {
                if (options && options.mapData === false) {
                    return result;
                }
                else {
                    return _this.geneseMapperService.map(result);
                }
            }));
        };
        /**
         * Creates an object and return an Observable of the created object with T type
         * @deprecated since 1.2.0. Please use post() method instead
         */
        Genese.prototype.createCustom = function (path, body, options) {
            var _this = this;
            this.checkPath(path);
            body = Tools.default(body, {});
            return this.http.post(this.apiRoot(path), body, this.getRequestOptions(options))
                .pipe(operators.map(function (result) {
                if (options && options.mapData === false) {
                    return result;
                }
                else {
                    return _this.geneseMapperService.map(result);
                }
            }));
        };
        /**
         * Deletes an element and returns success or failed status.
         * This method needs to respect Genese standard model
         */
        Genese.prototype.delete = function (id) {
            this.checkId(id);
            return this.http.delete(this.apiRoot(this.getStandardPath()) + "/" + id, { observe: 'response' })
                .pipe(operators.map(function (response) {
                return response && response.ok === true ? exports.ResponseStatus.SUCCESS : exports.ResponseStatus.FAILED;
            }));
        };
        /**
         * Delete an element and returns success or failed status.
         * This method can be used with custom params.
         */
        Genese.prototype.deleteCustom = function (path, options) {
            this.checkPath(path);
            var url = this.apiRoot(path);
            options = Tools.default(options, {});
            Object.assign(options, { observe: 'response' });
            return this.http.delete(url, options)
                .pipe(operators.map(function (response) {
                return response && response.ok === true ? exports.ResponseStatus.SUCCESS : exports.ResponseStatus.FAILED;
            }));
        };
        /**
         * Returns mapped object using fetch method
         */
        Genese.prototype.fetch = function (path, method, requestInit) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!method || !path) {
                                console.error('Incorrect parameters : impossible to send request');
                                return [2 /*return*/, Promise.reject('Incorrect parameters : impossible to send request')];
                            }
                            url = this.apiRoot(path);
                            return [4 /*yield*/, fetch(url, requestInit)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.clone().json()];
                        case 2:
                            data = _a.sent();
                            if (method === exports.RequestMethod.DELETE) {
                                return [2 /*return*/, this.geneseMapperService.map(data ? data.body : undefined)];
                            }
                            else {
                                return [2 /*return*/, this.geneseMapperService.map(data)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get all elements of array of data returned by GET request and map them with T type
         */
        Genese.prototype.getAll = function (params) {
            var e_1, _a;
            var _this = this;
            var httpParams = new http.HttpParams();
            if (params && params.filters) {
                try {
                    for (var _b = __values(Object.keys(params.filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        if (params.filters[key]) {
                            httpParams = httpParams.set(key, params.filters[key].toString());
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            var options = { params: httpParams };
            var url = this.apiRoot(this.getStandardPath());
            return this.http.get(url, options).pipe(operators.map(function (response) {
                return response ? _this.geneseMapperService.arrayMap(response) : [];
            }));
        };
        /**
         * Get all elements of array of data returned by GET request and map them with T type
         * If you want specific HttpParams you should to declare them in the second parameter because
         * they have priority over RequestOptions
         */
        Genese.prototype.getAllCustom = function (path, params, requestOptions) {
            var e_2, _a, e_3, _b;
            var _this = this;
            if (!path) {
                console.error('No path : impossible to get elements');
                return rxjs.of(undefined);
            }
            var httpParams = new http.HttpParams();
            if (requestOptions && requestOptions.params) {
                try {
                    for (var _c = __values(Object.keys(requestOptions.params)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        if (requestOptions.params[key]) {
                            httpParams = httpParams.set(key, requestOptions.params[key].toString());
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                delete requestOptions.params;
            }
            if (params && params.filters) {
                try {
                    for (var _e = __values(Object.keys(params.filters)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var key = _f.value;
                        if (params.filters[key]) {
                            httpParams = httpParams.set(key, params.filters[key].toString());
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            var allOptions = Object.assign({}, { params: httpParams }, requestOptions);
            var url = this.apiRoot(path);
            return this.http.get(url, allOptions).pipe(operators.map(function (response) {
                return response ? _this.geneseMapperService.arrayMap(response) : [];
            }));
        };
        /**
         * Get all elements with pagination
         * If the http response have paginated format, it returns paginated response with this format :
         * {
         *      totalResults?: number;
         *      results: T[];
         * }
         */
        Genese.prototype.getAllWithPagination = function (path, params) {
            var e_4, _a;
            var _this = this;
            if (!path) {
                console.error('No path : impossible to get paginated elements');
                return rxjs.of(undefined);
            }
            if (!params || !params.pageSize) {
                console.error('Incorrect parameters : impossible to get paginated elements. The parameter pageSize must be defined.');
                return rxjs.of(undefined);
            }
            var httpParams = new http.HttpParams();
            if (params) {
                if (params.pageIndex !== undefined) {
                    httpParams = httpParams.set(this.geneseEnvironment.pageIndex, params.pageIndex.toString());
                }
                if (params.pageSize !== undefined) {
                    httpParams = httpParams.set(this.geneseEnvironment.pageSize, params.pageSize.toString());
                }
                if (params.filters) {
                    try {
                        for (var _b = __values(Object.keys(params.filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var key = _c.value;
                            if (params.filters[key]) {
                                httpParams = httpParams.set(key, params.filters[key].toString());
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            var options = { params: httpParams };
            var url = this.apiRoot(path);
            return this.http.get(url, options).pipe(operators.map(function (response) {
                if (response && _this.isPaginatedResponse(response)) {
                    return {
                        results: _this.geneseMapperService.arrayMap(response[_this.geneseEnvironment.results]),
                        totalResults: response[_this.geneseEnvironment.totalResults]
                    };
                }
                else {
                    console.error('Response is not paginated. ' +
                        'Please verify that the response includes an array corresponding to your Genese pagination environment.');
                    return undefined;
                }
            }));
        };
        /**
         * This method must be called when the http response is not an object, but an array (for example : ['a', 'b'])
         * The DTO model must implement the ArrayResponse interface
         *
         * Example :
         * MyModel {
         *     gnArrayResponse: [{
         *         id: '',
         *         name: ''
         *     }]
         * }
         * The getArray method will return the response array with the correct format
         */
        Genese.prototype.getArray = function () {
            var _this = this;
            this.checkIfTTypeIsArrayResponseType();
            var url = this.apiRoot(this.getStandardPath());
            return this.http.get(url)
                .pipe(operators.map(function (data) {
                var tObject = {
                    gnArrayResponse: data
                };
                return _this.geneseMapperService.map(tObject) ? _this.geneseMapperService.map(tObject)['gnArrayResponse'] : undefined;
            }));
        };
        /**
         * Get one element of the T class (or the U class if the uConstructor param is defined)
         */
        Genese.prototype.getOne = function (id) {
            var _this = this;
            this.checkId(id);
            var url = this.apiRoot(this.getStandardPath(), id);
            return this.http.get(url)
                .pipe(operators.map(function (data) {
                return _this.geneseMapperService.map(data);
            }));
        };
        /**
         * Get one element of the T class (or the U class if the uConstructor param is defined)
         */
        Genese.prototype.getOneCustom = function (path, params) {
            var e_5, _a;
            var _this = this;
            this.checkPath(path);
            var httpParams = new http.HttpParams();
            if (params) {
                if (params.filters) {
                    try {
                        for (var _b = __values(Object.keys(params.filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var key = _c.value;
                            if (params.filters[key]) {
                                httpParams = httpParams.set(key, params.filters[key].toString());
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            var options = { params: httpParams };
            var url = this.apiRoot(path);
            return this.http.get(url, options)
                .pipe(operators.map(function (data) {
                return _this.geneseMapperService.map(data);
            }));
        };
        /**
         * Get one element of the T class (or the U class if the uConstructor param is defined)
         */
        Genese.prototype.request = function (path, method, options) {
            var _this = this;
            this.checkPath(path);
            if (!method) {
                throw Error('Incorrect Genese method : impossible to send request');
            }
            options = Tools.default(options, {});
            if (!options.headers
                && (method === exports.RequestMethod.POST || method === exports.RequestMethod.PUT || method === exports.RequestMethod.PATCH)) {
                options.headers = { 'Content-Type': 'application/json' };
            }
            if (!options.observe && method === exports.RequestMethod.DELETE) {
                options.observe = 'response';
            }
            var url = this.apiRoot(path, options.id);
            return this.http.request(method, url, options)
                .pipe(operators.map(function (result) {
                if (method === exports.RequestMethod.DELETE) {
                    if (options && options.mapData === false) {
                        return result;
                    }
                    else {
                        return _this.geneseMapperService.map(result ? result.body : undefined);
                    }
                }
                else {
                    if (options && options.mapData === false) {
                        return result;
                    }
                    else {
                        return _this.geneseMapperService.map(result);
                    }
                }
            }));
        };
        /**
         * Update an element with T type
         * @deprecated since 1.2.0. Please use put() method instead
         */
        Genese.prototype.update = function (id, updatedObject, options) {
            var _this = this;
            this.checkId(id);
            this.checkTType(updatedObject);
            options = Object.assign(this.getRequestOptions(options), { observe: 'body' });
            return this.http.put(this.apiRoot(this.getStandardPath()), updatedObject, options)
                .pipe(operators.map(function (result) {
                if (options && options.mapData === false) {
                    return result;
                }
                else {
                    return _this.geneseMapperService.map(result);
                }
            }));
        };
        /**
         * Update an element with T type
         * @deprecated since 1.2.0. Please use put() method instead
         */
        Genese.prototype.updateCustom = function (path, body, options) {
            var _this = this;
            this.checkPath(path);
            body = Tools.default(body, {});
            options = Object.assign(this.getRequestOptions(options), { observe: 'body' });
            return this.http.put(this.apiRoot(path), body, options)
                .pipe(operators.map(function (result) {
                if (options && options.mapData === false) {
                    return result;
                }
                else {
                    return _this.geneseMapperService.map(result);
                }
            }));
        };
        // --------------------------------------------------
        //                   OTHER METHODS
        // --------------------------------------------------
        /**
         * Get the root path of the api
         */
        Genese.prototype.apiRoot = function (path, id) {
            var url = path ? this.geneseEnvironment.api + path : this.geneseEnvironment.api;
            return id ? url + "/" + id : url;
        };
        /**
         * Check if the id is correct
         */
        Genese.prototype.checkId = function (id) {
            if (!id || !(+id > 0)) {
                throw Error('Incorrect Genese id.');
            }
        };
        /**
         * Check if the type T implements the ArrayResponse interface.
         */
        Genese.prototype.checkIfTTypeIsArrayResponseType = function () {
            var tObject = new this.tConstructor();
            if (!tObject['gnArrayResponse']) {
                throw Error('The model must contain the gnArrayResponse property.');
            }
        };
        /**
         * Check if the path is correct
         */
        Genese.prototype.checkPath = function (path) {
            if (!path || typeof path !== 'string') {
                throw Error('Incorrect Genese path.');
            }
        };
        /**
         * Check if the path is correct
         */
        // TODO : check nested keys
        Genese.prototype.checkTType = function (newObject) {
            if (!newObject) {
                throw Error('Genese : there is no T object.');
            }
            if (newObject === {}) {
                throw Error('Genese : empty object.');
            }
            if (Array.isArray(newObject)) {
                throw Error('Genese : an array is not a T object.');
            }
            var tObject = new this.tConstructor();
            Object.keys(newObject).forEach(function (key) {
                if (!tObject.hasOwnProperty(key)) {
                    throw Error('Genese : the object is not a T object');
                }
            });
        };
        /**
         * Get request options of the http request
         */
        Genese.prototype.getRequestOptions = function (options) {
            options = Tools.default(options, {});
            options.headers = Tools.default(options.headers, { 'Content-Type': 'application/json' });
            return Object.assign(options, { observe: 'body' });
        };
        /**
         * Check if the response is paginated
         */
        Genese.prototype.isPaginatedResponse = function (data) {
            return data && Array.isArray(data[this.geneseEnvironment.results]);
        };
        /**
         * Get standard path when Genese model contains genese.path
         */
        Genese.prototype.getStandardPath = function () {
            var model = new this.geneseMapperService.tConstructor();
            if (!model['genese'] || !model['genese'].path) {
                throw Error('No Genese path environment for the model  : impossible to get element.');
            }
            else {
                return model['genese'].path;
            }
        };
        /**
         * Translate data for a given language
         */
        Genese.prototype.translate = function (data, language) {
            if (!language) {
                console.error('No data or no language : impossible to get element');
                return undefined;
            }
            else {
                return this.geneseMapperService.translate(data, language);
            }
        };
        return Genese;
    }());

    var GeneseAngular = /** @class */ (function () {
        function GeneseAngular(http, geneseEnvironmentService, tConstructor, uConstructor) {
            this.http = http;
            this.tConstructor = tConstructor;
            this.uConstructor = uConstructor;
            this.geneseMapperServiceT = tConstructor ? new geneseMapper.GeneseMapper(tConstructor) : undefined;
            this.geneseMapperServiceU = uConstructor ? new geneseMapper.GeneseMapper(uConstructor) : undefined;
            this.geneseEnvironmentService = geneseEnvironmentService;
        }
        /**
         * Deletes an element and returns success or failed status.
         * This method needs to respect Genese standard model
         */
        GeneseAngular.prototype.delete = function (path, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            Tools.checkPath(path);
            var url = Tools.apiRoot(this.geneseEnvironmentService.api, path);
            Object.assign(options, { observe: 'response' });
            return this.http.delete(url, options)
                .pipe(operators.map(function (response) {
                if (_this.tConstructor) {
                    return _this.geneseMapperServiceT.map(response);
                }
                else {
                    return response && response.ok === true ? exports.ResponseStatus.SUCCESS : exports.ResponseStatus.FAILED;
                }
            }));
        };
        /**
         * Calls a GET request in order to get all elements of an array and to map them with T[] type
         * @param path              the route of the endpoint
         * @param requestOptions    the options of the request
         */
        GeneseAngular.prototype.getAll = function (path, requestOptions) {
            var e_1, _a;
            var _this = this;
            if (!path) {
                console.error('No path : impossible to get elements');
                return rxjs.of(undefined);
            }
            var httpParams = new http.HttpParams();
            if (requestOptions && requestOptions.queryParams) {
                try {
                    for (var _b = __values(Object.keys(requestOptions.queryParams)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        if (requestOptions.queryParams[key]) {
                            httpParams = httpParams.set(key, requestOptions.queryParams[key].toString());
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                delete requestOptions.queryParams;
            }
            var allOptions = Object.assign({}, { params: httpParams }, requestOptions);
            var url = Tools.apiRoot(this.geneseEnvironmentService.api, path);
            return this.http.get(url, allOptions).pipe(operators.map(function (response) {
                return response ? _this.geneseMapperServiceT.arrayMap(response) : [];
            }));
        };
        /**
         * Calls GET request and returns an object with T type
         * Warning : do not use this method in order to return an array. Use getAll() method instead.
         * @param path              the route of the endpoint
         * @param requestOptions    the options of the request
         */
        GeneseAngular.prototype.get = function (path, requestOptions) {
            var e_2, _a;
            var _this = this;
            Tools.checkPath(path);
            var httpParams = new http.HttpParams();
            if (requestOptions) {
                if (requestOptions.queryParams) {
                    try {
                        for (var _b = __values(Object.keys(requestOptions.queryParams)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var key = _c.value;
                            if (requestOptions.queryParams[key]) {
                                httpParams = httpParams.set(key, requestOptions.queryParams[key].toString());
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            var options = { params: httpParams };
            var url = Tools.apiRoot(this.geneseEnvironmentService.api, path);
            return this.http.get(url, options)
                .pipe(operators.map(function (data) {
                return _this.geneseMapperServiceT.map(data);
            }));
        };
        /**
         * Calls PATCH request and returns eventually a response
         * @param path          the route of the endpoint
         * @param body          the body of the request
         * @param options       the options of the request
         */
        GeneseAngular.prototype.patch = function (path, body, options) {
            return this.crud('patch', path, body, options);
        };
        /**
         * Calls POST request and returns eventually a response
         * @param path          the route of the endpoint
         * @param body          the body of the request
         * @param options       the options of the request
         */
        GeneseAngular.prototype.post = function (path, body, options) {
            return this.crud('post', path, body, options);
        };
        /**
         * Calls PUT request and returns eventually a response
         * @param path          the route of the endpoint
         * @param body          the body of the request
         * @param options       the options of the request
         */
        GeneseAngular.prototype.put = function (path, body, options) {
            return this.crud('put', path, body, options);
        };
        /**
         * Experimental method
         */
        GeneseAngular.prototype.crud = function (requestMethod, path, body, options) {
            var _this = this;
            return this.http[requestMethod](Tools.apiRoot(this.geneseEnvironmentService.api, path), body, this.getRequestOptions(options))
                .pipe(operators.map(function (result) {
                if (_this.tConstructor) {
                    return _this.geneseMapperServiceT.map(result);
                }
                else {
                    return result;
                }
            }));
        };
        // --------------------------------------------------
        //                   OTHER METHODS
        // --------------------------------------------------
        /**
         * Get request options of the http request
         */
        GeneseAngular.prototype.getRequestOptions = function (options) {
            options = Tools.default(options, {});
            options.headers = Tools.default(options.headers, { 'Content-Type': 'application/json' });
            return Object.assign(options, { observe: 'body' });
        };
        /**
         * Get standard path when Genese model contains genese.path
         */
        GeneseAngular.prototype.getStandardPath = function () {
            var model = new this.geneseMapperServiceT.tConstructor();
            if (!model['genese'] || !model['genese'].path) {
                throw Error('No Genese path environment for the model  : impossible to get element.');
            }
            else {
                return model['genese'].path;
            }
        };
        return GeneseAngular;
    }());

    var GeneseService = /** @class */ (function () {
        function GeneseService(http, geneseEnvironment) {
            this.http = http;
            this.geneseEnvironment = geneseEnvironment;
        }
        /**
         * Return a new typed Genese instance
         */
        GeneseService.prototype.getGeneseInstance = function (tConstructor) {
            if (tConstructor) {
                return new Genese(this.http, this.geneseEnvironment, tConstructor);
            }
            return undefined;
        };
        GeneseService.prototype.instance = function (tConstructor, uConstructor) {
            if (!tConstructor && !uConstructor) {
                return new GeneseAngular(this.http, this.geneseEnvironment);
            }
            else if (!uConstructor) {
                return new GeneseAngular(this.http, this.geneseEnvironment, tConstructor);
            }
            else {
                return new GeneseAngular(this.http, this.geneseEnvironment, tConstructor, uConstructor);
            }
        };
        return GeneseService;
    }());
    GeneseService.decorators = [
        { type: i0.Injectable }
    ];
    GeneseService.ctorParameters = function () { return [
        { type: http.HttpClient },
        { type: GeneseEnvironmentService }
    ]; };

    var GeneseAngularService = /** @class */ (function () {
        function GeneseAngularService() {
        }
        return GeneseAngularService;
    }());
    GeneseAngularService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GeneseAngularService_Factory() { return new GeneseAngularService(); }, token: GeneseAngularService, providedIn: "root" });
    GeneseAngularService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GeneseAngularService.ctorParameters = function () { return []; };

    var GeneseComponent = /** @class */ (function () {
        function GeneseComponent() {
        }
        GeneseComponent.prototype.ngOnInit = function () {
        };
        return GeneseComponent;
    }());
    GeneseComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-genese-angular',
                    template: "\n        <p>\n            genese-angular works!\n        </p>\n    "
                },] }
    ];
    GeneseComponent.ctorParameters = function () { return []; };

    function useFactory(http, geneseEnvironment) {
        return new GeneseService(http, geneseEnvironment);
    }
    var GeneseModule = /** @class */ (function () {
        function GeneseModule() {
        }
        GeneseModule.forRoot = function () {
            return {
                ngModule: GeneseModule,
                providers: [
                    GeneseEnvironmentService,
                    Tools,
                    {
                        provide: GeneseService,
                        deps: [http.HttpClient, GeneseEnvironmentService],
                        useFactory: useFactory
                    }
                ]
            };
        };
        return GeneseModule;
    }());
    GeneseModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [GeneseComponent],
                    imports: [],
                    providers: [
                        GeneseEnvironmentService,
                        Tools,
                    ],
                    exports: [GeneseComponent]
                },] }
    ];

    var ExtractService = /** @class */ (function () {
        // --------------------------------------------------
        //                     CONSTRUCTOR
        // --------------------------------------------------
        function ExtractService() {
        }
        // --------------------------------------------------
        //                     METHODS
        // --------------------------------------------------
        /**
         * Extract all the fields of some data corresponding to a given extraction model
         * @param data
         * @param extractionModel
         */
        ExtractService.extractFieldsFromData = function (data, extractionModel) {
            var e_1, _a, _b;
            if (!extractionModel) {
                return data;
            }
            var result = {};
            try {
                for (var _c = __values(Object.keys(extractionModel)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var key = _d.value;
                    Object.assign(result, (_b = {}, _b[key] = this.extractFieldsForOneProperty(data, key, extractionModel[key]), _b));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        };
        /**
         * For a given key of an extraction model and with the path corresponding of this key,
         * returns the fields from data which have the same key for the same path
         * @param data
         * @param key
         * @param pathExtraction
         */
        ExtractService.extractFieldsForOneProperty = function (data, key, pathExtraction) {
            var e_2, _a;
            var extracts = [];
            if (Array.isArray(data)) {
                try {
                    for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                        var element = data_1_1.value;
                        extracts.push(this.extractFieldsForOneProperty(element, key, pathExtraction));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                return ExtractService.extractValue(data, key, pathExtraction);
            }
            return extracts;
        };
        /**
         * With a given key and a given path, extracts the value of a data object for this key and this path
         * @param data
         * @param key
         * @param path
         */
        ExtractService.extractValue = function (data, key, path) {
            var e_3, _a;
            if (!data || !path || typeof path !== 'string') {
                return data;
            }
            var branches = path.split('.');
            var value;
            try {
                for (var branches_1 = __values(branches), branches_1_1 = branches_1.next(); !branches_1_1.done; branches_1_1 = branches_1.next()) {
                    var branch = branches_1_1.value;
                    if (!value) {
                        value = data[branch];
                    }
                    else {
                        value = value[branch];
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (branches_1_1 && !branches_1_1.done && (_a = branches_1.return)) _a.call(branches_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return value;
        };
        return ExtractService;
    }());
    ExtractService.decorators = [
        { type: i0.Injectable }
    ];
    ExtractService.ctorParameters = function () { return []; };

    var GeneseConfig = /** @class */ (function () {
        function GeneseConfig() {
            this.pagination = {
                pageIndex: 'gnPageIndex',
                pageSize: 'gnPageSize',
                results: 'gnResults',
                totalResults: 'gnTotalResults'
            };
        }
        return GeneseConfig;
    }());

    var GeneseModelEnvironment = /** @class */ (function () {
        function GeneseModelEnvironment() {
            this.path = '';
        }
        return GeneseModelEnvironment;
    }());

    var PRIMITIVES = ['String', 'Number', 'Boolean'];

    var RequestOptions = /** @class */ (function () {
        function RequestOptions() {
            this.mapData = true;
        }
        return RequestOptions;
    }());

    /*
     * Public API Surface of angular
     */
    var GnModule = /** @class */ (function () {
        function GnModule() {
        }
        GnModule.forRoot = function () {
            return {
                ngModule: GnModule,
                providers: [
                    GeneseEnvironmentService,
                    Tools,
                    {
                        provide: GeneseService,
                        deps: [http.HttpClient, GeneseEnvironmentService],
                        useFactory: function (http, geneseEnvironment) {
                            var service = new GeneseService(http, geneseEnvironment);
                            return service;
                        }
                    }
                ]
            };
        };
        GnModule.forChild = function () {
            return {
                ngModule: GnModule,
                providers: [
                    GeneseEnvironmentService,
                    Tools,
                    {
                        provide: GeneseService,
                        deps: [http.HttpClient, GeneseEnvironmentService],
                        useFactory: function (http, geneseEnvironment) {
                            var service = new GeneseService(http, geneseEnvironment);
                            return service;
                        }
                    }
                ]
            };
        };
        return GnModule;
    }());
    GnModule.decorators = [
        { type: i0.NgModule }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ExtractService = ExtractService;
    exports.Genese = Genese;
    exports.GeneseAngular = GeneseAngular;
    exports.GeneseAngularService = GeneseAngularService;
    exports.GeneseComponent = GeneseComponent;
    exports.GeneseConfig = GeneseConfig;
    exports.GeneseEnvironmentService = GeneseEnvironmentService;
    exports.GeneseModelEnvironment = GeneseModelEnvironment;
    exports.GeneseModule = GeneseModule;
    exports.GeneseService = GeneseService;
    exports.GnModule = GnModule;
    exports.PRIMITIVES = PRIMITIVES;
    exports.RequestOptions = RequestOptions;
    exports.Tools = Tools;
    exports.useFactory = useFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=genese-angular.umd.js.map
