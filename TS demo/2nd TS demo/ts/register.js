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
var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var roles = document.getElementById("roles");
var formSubmit = document.getElementById("submit-form");
var getAllUserDetails = [];
var alreadyExits = false;
formSubmit.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var fName, lName, emailValue, passwordVaue, rolesValue, payload, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                registerFormValidation();
                fName = firstName.value;
                lName = lastName.value;
                emailValue = email.value;
                passwordVaue = password.value;
                rolesValue = roles.value;
                if (!(!fName || !lName || !emailValue || !passwordVaue || !rolesValue)) return [3 /*break*/, 1];
                return [2 /*return*/, false];
            case 1:
                payload = {
                    firstName: fName,
                    lastName: lName,
                    email: emailValue,
                    password: passwordVaue,
                    roles: rolesValue,
                };
                console.log(payload);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 7]);
                return [4 /*yield*/, fetch("http://localhost:3000/user", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    })];
            case 3:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 5];
                return [4 /*yield*/, response.json()];
            case 4:
                data = _a.sent();
                resetField();
                sessionStorage.setItem("currentUser", data.email);
                sessionStorage.setItem("role", data.roles);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
var getAllUser = function () { return __awaiter(_this, void 0, void 0, function () {
    var allUser, userInfo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/user")];
            case 1:
                allUser = _a.sent();
                if (!allUser.ok) {
                    throw new Error("HTTP error! status: ".concat(allUser.status));
                }
                return [4 /*yield*/, allUser.json()];
            case 2:
                userInfo = _a.sent();
                userInfo.forEach(function (item) {
                    getAllUserDetails.push(item);
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
getAllUser();
// validation part
var setError = function (element, message) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
};
var setSuccess = function (element) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerHTML = "";
    inputControl.classList.remove("error");
};
var registerFormValidation = function (values) {
    if (values === void 0) { values = "default"; }
    if (values == "fName" || values == "default") {
        if (!firstName.value) {
            setError(firstName, "Please enter your first name");
        }
        else {
            var checkName = /[a-zA-Z]/;
            if (!checkName.test(String(firstName.value))) {
                setError(firstName, "Invalid first name");
                return false;
            }
            else if (checkName.test(String(firstName.value))) {
                setSuccess(firstName);
            }
        }
    }
    if (values == "lName" || values == "default") {
        if (!lastName.value) {
            setError(lastName, "Please enter your last name ");
        }
        else {
            var checkName = /[a-zA-Z]/;
            if (!checkName.test(String(lastName.value))) {
                setError(lastName, "Invalid last name");
            }
            else if (checkName.test(String(lastName.value))) {
                setSuccess(lastName);
            }
        }
    }
    if (values == "email" || values == "default") {
        if (!email.value) {
            setError(email, "Please enter your email");
        }
        else {
            var checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!checkEmail.test(String(email.value).toLowerCase())) {
                setError(email, "please enter a valid email address");
            }
            if (email.value) {
                getAllUserDetails.find(function (item) {
                    if (email.value === item.email) {
                        setError(email, "An account using this email address already exist");
                        alreadyExits = true;
                    }
                });
            }
            if (!alreadyExits) {
                if (checkEmail.test(String(email.value).toLowerCase())) {
                    setSuccess(email);
                }
            }
        }
    }
    if (values == "password" || values == "default") {
        if (!password.value) {
            setError(password, "Please enter password");
        }
        else {
            var checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (!checkPassword.test(password.value.trim())) {
                setError(password, "Please Choose a strong password, min length 8 character");
            }
            else if (checkPassword.test(password.value.trim())) {
                setSuccess(password);
            }
        }
    }
    if (values == "roles" || values == "default") {
        if (!roles.value) {
            setError(roles, "Please select role");
        }
        else if (roles.value) {
            setSuccess(roles);
        }
    }
};
// reset all field
var resetField = function () {
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    roles.value = "";
    window.location.replace("index.html");
};
