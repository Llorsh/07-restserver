"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }
    Server.prototype.middlewares = function () {
        // DIRECTORIO PUBLICO
        this.app.use(express_1.default.static('public'));
    };
    Server.prototype.routes = function () {
        this.app.get('/api', function (req, res, next) {
            res.status(403).json({
                msg: 'get API'
            });
        });
        this.app.post('/api', function (req, res, next) {
            res.status(403).json({
                msg: 'post API'
            });
        });
        this.app.put('/api', function (req, res, next) {
            res.status(403).json({
                msg: 'put API'
            });
        });
        this.app.delete('/api', function (req, res, next) {
            res.status(403).json({
                msg: 'delete API'
            });
        });
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server running on port http://localhost:".concat(_this.port));
        });
    };
    return Server;
}());
exports.default = Server;
