"use strict";
// import fs from 'fs';
// import path from 'path';
// import os from 'os';
// import yaml from 'js-yaml';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var os = require("os");
var yaml = require("js-yaml");
var client_1 = require("@prisma/client");
var supabase_js_1 = require("@supabase/supabase-js");
var includeScanWithPhenotyper = {
    phenotyper: true
};
function loadConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var configPath, config;
        return __generator(this, function (_a) {
            configPath = path.join(os.homedir(), ".bloom", "desktop-config.yaml");
            config = yaml.load(fs.readFileSync(configPath, 'utf8'));
            console.log("Prisma DB:" + config.local_db_path);
            console.log("BLOOM CONNECTION API : " + config.bloom_api_url);
            console.log("BLOOM KEY :" + config.bloom_anon_key);
            console.log("SCANNER USERNAME: " + config.bloom_scanner_username);
            console.log("SCANNER PASSWORD: " + config.bloom_scanner_password);
            return [2 /*return*/, config];
        });
    });
}
function getSupabaseClient(config) {
    return __awaiter(this, void 0, void 0, function () {
        var supabase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    supabase = (0, supabase_js_1.createClient)(config.bloom_api_url, config.bloom_anon_key);
                    return [4 /*yield*/, supabase.auth.signInWithPassword({
                            email: config.bloom_scanner_username,
                            password: config.bloom_scanner_password
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, supabase];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var config, prisma, supabase, scans, _i, scans_1, scan, phenotyper, experiment, scientist, _a, phenotyper_name, phenotyper_email, scientist_name, scientist_email, _b, plantData, plantError, _c, scanData, scanError, phenotyperId, _d, existingPhenotyper, phenoError, _e, newPheno, insertError_1, scientistId, _f, existingScientist, scientistError, _g, newScientist, insertError_2, cameraSettingsId, _h, newSettings, insertError, updateError;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, loadConfig()];
                case 1:
                    config = _j.sent();
                    process.env.BLOOM_DATABASE_URL = "file:".concat(config.local_db_path);
                    ;
                    prisma = new client_1.PrismaClient();
                    return [4 /*yield*/, getSupabaseClient(config)];
                case 2:
                    supabase = _j.sent();
                    return [4 /*yield*/, prisma.scan.findMany({
                            where: { deleted: false }
                        })];
                case 3:
                    scans = _j.sent();
                    _i = 0, scans_1 = scans;
                    _j.label = 4;
                case 4:
                    if (!(_i < scans_1.length)) return [3 /*break*/, 25];
                    scan = scans_1[_i];
                    return [4 /*yield*/, prisma.phenotyper.findUnique({
                            where: { id: scan.phenotyper_id }
                        })];
                case 5:
                    phenotyper = _j.sent();
                    return [4 /*yield*/, prisma.experiment.findUnique({
                            where: { id: scan.experiment_id }
                        })];
                case 6:
                    experiment = _j.sent();
                    if (!(experiment === null || experiment === void 0 ? void 0 : experiment.scientist_id)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.scientist.findUnique({ where: { id: experiment.scientist_id } })];
                case 7:
                    _a = _j.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _a = null;
                    _j.label = 9;
                case 9:
                    scientist = _a;
                    console.log("Processing scan for plant ID: ".concat(scan.plant_id));
                    console.log("Processing scan for phenotyper: ".concat((phenotyper === null || phenotyper === void 0 ? void 0 : phenotyper.email) || 'null'));
                    console.log("Processing scan for phenotyper: ".concat((phenotyper === null || phenotyper === void 0 ? void 0 : phenotyper.name) || 'null'));
                    console.log("Processing scan for scientist: ".concat((scientist === null || scientist === void 0 ? void 0 : scientist.email) || 'null'));
                    console.log("Processing scan for scientist: ".concat((scientist === null || scientist === void 0 ? void 0 : scientist.name) || 'null'));
                    phenotyper_name = (phenotyper === null || phenotyper === void 0 ? void 0 : phenotyper.name) || 'Unknown';
                    phenotyper_email = (phenotyper === null || phenotyper === void 0 ? void 0 : phenotyper.email) || 'Unknown';
                    scientist_name = (scientist === null || scientist === void 0 ? void 0 : scientist.name) || 'Unknown';
                    scientist_email = (scientist === null || scientist === void 0 ? void 0 : scientist.email) || 'Unknown';
                    return [4 /*yield*/, supabase
                            .from('cyl_plants')
                            .select('id')
                            .eq('qr_code', scan.plant_id)
                            .single()];
                case 10:
                    _b = _j.sent(), plantData = _b.data, plantError = _b.error;
                    if (plantError || !plantData) {
                        console.error("No plant found for qr_code=".concat(plantData, ":"), plantError === null || plantError === void 0 ? void 0 : plantError.message);
                        return [3 /*break*/, 24];
                    }
                    else {
                        console.log("Found plant with ID: ".concat(plantData.id, " for qr_code=").concat(scan.plant_id));
                    }
                    return [4 /*yield*/, supabase
                            .from('cyl_scans')
                            .select("\n        *\n      ")
                            .eq('plant_id', plantData.id)
                            .single()];
                case 11:
                    _c = _j.sent(), scanData = _c.data, scanError = _c.error;
                    phenotyperId = void 0;
                    return [4 /*yield*/, supabase
                            .from('phenotypers')
                            .select('id')
                            .eq('email', phenotyper_email)
                            .single()];
                case 12:
                    _d = _j.sent(), existingPhenotyper = _d.data, phenoError = _d.error;
                    console.log("Exists: " + JSON.stringify(existingPhenotyper));
                    if (!existingPhenotyper) return [3 /*break*/, 13];
                    phenotyperId = existingPhenotyper.id;
                    console.log("Exists: " + phenotyperId);
                    return [3 /*break*/, 16];
                case 13:
                    if (!((phenoError === null || phenoError === void 0 ? void 0 : phenoError.code) === 'PGRST116')) return [3 /*break*/, 15];
                    return [4 /*yield*/, supabase
                            .from('phenotypers')
                            .insert({ first_name: phenotyper_name, email: phenotyper_email })
                            .select('id')
                            .single()];
                case 14:
                    _e = _j.sent(), newPheno = _e.data, insertError_1 = _e.error;
                    if (insertError_1)
                        throw new Error("Insert failed: " + insertError_1.message);
                    phenotyperId = newPheno.id;
                    return [3 /*break*/, 16];
                case 15: throw new Error("Query failed: " + (phenoError === null || phenoError === void 0 ? void 0 : phenoError.message));
                case 16:
                    scientistId = void 0;
                    return [4 /*yield*/, supabase
                            .from('cyl_scientists')
                            .select('id')
                            .eq('email', scientist_email || null)
                            .single()];
                case 17:
                    _f = _j.sent(), existingScientist = _f.data, scientistError = _f.error;
                    console.log("SCI" + JSON.stringify(existingScientist));
                    if (!existingScientist) return [3 /*break*/, 18];
                    scientistId = existingScientist.id;
                    return [3 /*break*/, 21];
                case 18:
                    if (!((scientistError === null || scientistError === void 0 ? void 0 : scientistError.code) === 'PGRST116')) return [3 /*break*/, 20];
                    return [4 /*yield*/, supabase
                            .from('cyl_scientists')
                            .insert({ scientist_name: scientist_name || null, email: scientist_email || null })
                            .select('id')
                            .single()];
                case 19:
                    _g = _j.sent(), newScientist = _g.data, insertError_2 = _g.error;
                    if (insertError_2)
                        throw new Error("Insert failed: " + insertError_2.message);
                    scientistId = newScientist.id;
                    return [3 /*break*/, 21];
                case 20: throw new Error("Query failed: " + (phenoError === null || phenoError === void 0 ? void 0 : phenoError.message));
                case 21:
                    cameraSettingsId = void 0;
                    return [4 /*yield*/, supabase
                            .from('cyl_camera_settings')
                            .upsert({
                            scanner_exposure_time: scan.exposure_time,
                            scanner_gain: scan.gain,
                            brightness: scan.brightness,
                            contrast: scan.contrast,
                            gamma: scan.gamma,
                            scanner_seconds_per_rot: scan.seconds_per_rot
                        }, {
                            scanner_brightness: scan.brightness,
                            contrast: scan.contrast,
                            gamma: scan.gamma,
                            seconds_per_rot: scan.seconds_per_rot
                        }, {
                            onConflict: 'scanner_exposure_time,scanner_gain,scanner_brightness,contrast,gamma,seconds_per_rot'
                        })
                            .select('id')
                            .single()];
                case 22:
                    _h = _j.sent(), newSettings = _h.data, insertError = _h.error;
                    console.log("New Settings: " + JSON.stringify(newSettings));
                    if (insertError) {
                        throw new Error("Insert failed: " + insertError.message);
                    }
                    cameraSettingsId = newSettings.id;
                    console.log("Camera settings ID: ".concat(cameraSettingsId));
                    console.log("SCAN" + JSON.stringify(scanData));
                    if (!(scanData && scanData.id)) return [3 /*break*/, 24];
                    return [4 /*yield*/, supabase
                            .from('cyl_scans')
                            .update({
                            phenotyper_id: phenotyperId,
                            scientist_id: scientistId,
                            cyl_camera_settings_id: cameraSettingsId
                        })
                            .eq('id', scanData.id)];
                case 23:
                    updateError = (_j.sent()).error;
                    if (updateError) {
                        console.error("Failed to update scan metadata for scan ID: ".concat(scanData.id), updateError.message);
                    }
                    else {
                        console.log("Updated metadata for scan ID: ".concat(scanData.id));
                    }
                    console.log("Supabase query result:", scanData);
                    console.log("Processing scan for plant ID: ".concat((plantData === null || plantData === void 0 ? void 0 : plantData.id) || 'not found'));
                    _j.label = 24;
                case 24:
                    _i++;
                    return [3 /*break*/, 4];
                case 25: return [4 /*yield*/, prisma.$disconnect()];
                case 26:
                    _j.sent();
                    console.log(" Sync complete.");
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (err) {
    console.error("Error during sync:", err);
});
