"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationByName = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getLocationByName(locationName) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, axios_1.default)({
            method: 'GET',
            url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationName + '&limit={limit}&appid=' + process.env.OPENWEATHERMAP_API_KEY,
            responseType: 'json'
        })
            .then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.data[0];
        });
    });
}
exports.getLocationByName = getLocationByName;
