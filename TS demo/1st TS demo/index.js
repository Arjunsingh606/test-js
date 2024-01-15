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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
var fullName = document.getElementById("full-name");
var mobNumber = document.getElementById("mob-no");
var email = document.getElementById("email");
var sportName = document.getElementById("sport-name");
var experties = document.getElementById("experties");
var sportForm = document.getElementById("sport-form");
var displayPlayerList = document.getElementById("display-sport-list");
var editPlayerLable = document.getElementById("edit-player-Label");
var addPlayerLable = document.getElementById("add-player-label");
var addPlayerBTn = document.getElementById("add-player-btn");
var updateBtn = document.getElementById("update-btn");
var submitBtn = document.getElementById("submit-btn");
var modalBody = document.getElementById("player-popup");
var playersData = [];
addPlayerBTn.addEventListener("click", function () {
    resetFormFields();
    removeValidation();
    document.querySelector(".modal-backdrop.show").style.opacity = "0.4";
    document.querySelector(".modal-content").style.display = "block";
    editPlayerLable.style.display = "none";
    updateBtn.style.display = "none";
    submitBtn.style.display = "block";
    addPlayerLable.style.display = "block";
});
sportForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var playerName, mobileNumber, emailValue, sportNameValue, expertiesValue, playerList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                sportFormValidation();
                playerName = fullName.value;
                mobileNumber = mobNumber.value;
                emailValue = email.value;
                sportNameValue = sportName.value;
                expertiesValue = experties.value;
                if (!(!playerName ||
                    !mobileNumber ||
                    !emailValue ||
                    !sportNameValue ||
                    !expertiesValue)) return [3 /*break*/, 1];
                return [2 /*return*/, false];
            case 1:
                if (!(playerName.length >= 3 && mobileNumber.length >= 10)) return [3 /*break*/, 6];
                playerList = {
                    fullName: playerName,
                    mobNumber: parseInt(mobileNumber),
                    email: emailValue,
                    sportName: sportNameValue,
                    experties: expertiesValue,
                };
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:3000/players", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(playerList),
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 5];
            case 5:
                document.querySelector(".modal-backdrop.show").style.opacity = "0";
                document.querySelector(".modal-content").style.display = "none";
                displaySportList();
                resetFormFields();
                return [3 /*break*/, 7];
            case 6: return [2 /*return*/, false];
            case 7: return [2 /*return*/];
        }
    });
}); });
var displaySportList = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/players")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                playersData = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2, "catch error");
                return [3 /*break*/, 4];
            case 4:
                displayPlayerList.innerHTML = playersData
                    .map(function (item, index) {
                    return "\n        <tr>\n          <td class=\"serial-number\">".concat(index + 1, "</td>\n          <td>").concat(item.fullName, "</td>\n          <td>").concat(item.mobNumber, "</td>\n          <td>").concat(item.email, "</td>\n          <td>").concat(item.sportName, "</td>\n          <td>").concat(item.experties, "</td>\n          <td class =\"text-center\">\n            <button onclick=\"editPlayerDetails('").concat(item.id, "')\" data-bs-toggle=\"modal\" data-bs-target=\"#playerModal\" class=\"btn edit-btn\" id=\"edit\">\n              <i class=\"fa-solid fa-pen\"></i>\n            </button>\n            <button onclick=\"deletePlayer('").concat(item.id, "')\" class=\"btn del-btn\">\n              <i class=\"fa-solid fa-trash\"></i>\n            </button>\n          </td>\n        </tr>");
                })
                    .join("");
                return [2 /*return*/];
        }
    });
}); };
var deletePlayer = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:3000/players/".concat(id), {
                        method: "DELETE",
                    })];
            case 1:
                _a.sent();
                displaySportList();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var playerIndex;
var editPlayerDetails = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var response, playerDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                playerIndex = id;
                document.querySelector(".modal-backdrop.show").style.opacity = "0.4";
                document.querySelector(".modal-content").style.display = "block";
                submitBtn.style.display = "none";
                addPlayerLable.style.display = "none";
                updateBtn.style.display = "block";
                editPlayerLable.style.display = "block";
                return [4 /*yield*/, fetch("http://localhost:3000/players/".concat(playerIndex))];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                playerDetails = _a.sent();
                fullName.value = playerDetails.fullName;
                mobNumber.value = playerDetails.mobNumber;
                email.value = playerDetails.email;
                sportName.value = playerDetails.sportName;
                experties.value = playerDetails.experties;
                updateBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (!fullName.value ||
                        !mobNumber.value ||
                        !email.value ||
                        !sportName.value ||
                        !experties.value) {
                        return false;
                    }
                    else {
                        if (fullName.value.length >= 3 && mobNumber.value.length >= 10) {
                            playerDetails.fullName = fullName.value;
                            playerDetails.mobNumber = mobNumber.value;
                            playerDetails.email = email.value;
                            playerDetails.sportName = sportName.value;
                            playerDetails.experties = experties.value;
                            try {
                                fetch("http://localhost:3000/players/".concat(playerIndex), {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(playerDetails),
                                }).then(function (data) { return console.log(data); });
                            }
                            catch (error) {
                                console.log(error, "server issue");
                            }
                            document.querySelector(".modal-backdrop.show").style.opacity = "0";
                            document.querySelector(".modal-content").style.display = "none";
                            displaySportList();
                            resetFormFields();
                        }
                        else {
                            return false;
                        }
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
var resetFormFields = function () {
    fullName.value = "";
    mobNumber.value = "";
    email.value = "";
    sportName.value = "";
    experties.value = "";
};
var removeValidation = function () {
    setSuccess(fullName);
    setSuccess(mobNumber);
    setSuccess(email);
    setSuccess(sportName);
    setSuccess(experties);
};
displaySportList();
var setError = function (element, message) {
    var errorContainer = element.nextElementSibling;
    errorContainer.innerHTML = message;
    errorContainer.classList.add("error");
};
var setSuccess = function (element) {
    var errorContainer = element.nextElementSibling;
    errorContainer.innerHTML = "";
    errorContainer.classList.remove("error");
};
var sportFormValidation = function (values) {
    if (values === void 0) { values = "default"; }
    if (values === "fullname" || values === "default") {
        if (!fullName.value.trim()) {
            setError(fullName, "Please enter your full name");
        }
        else {
            var checkName = /^[a-zA-Z ]{3,20}$/;
            if (!checkName.test(fullName.value)) {
                setError(fullName, "Invalid name");
                return false;
            }
            else {
                setSuccess(fullName);
            }
        }
    }
    if (values === "mobilenumber" || values === "default") {
        if (!mobNumber.value.trim()) {
            setError(mobNumber, "Please enter your 10 digit mobile number");
        }
        else {
            var checkmobNumber = /^\d{10}$/;
            if (!checkmobNumber.test(mobNumber.value)) {
                setError(mobNumber, "Invalid mobile number");
            }
            else {
                setSuccess(mobNumber);
            }
        }
    }
    if (values === "email" || values === "default") {
        if (!email.value.trim()) {
            setError(email, "Please enter your email");
        }
        else {
            var checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!checkEmail.test(email.value.toLowerCase())) {
                setError(email, "Please enter a valid email address");
            }
            else {
                setSuccess(email);
            }
        }
    }
    if (values === "sport" || values === "default") {
        if (sportName.value === "") {
            setError(sportName, "Please choose a sport");
        }
        else {
            setSuccess(sportName);
        }
    }
    if (values === "experties" || values === "default") {
        if (experties.value === "") {
            setError(experties, "Please choose expertise level");
        }
        else {
            setSuccess(experties);
        }
    }
    return true;
};
