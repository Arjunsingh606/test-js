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
var loginEmail = document.getElementById("email");
var loginPassword = document.getElementById("password");
var loginForm = document.getElementById("submit-form");
var allUserDetail = [];
var getUserData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, userInfo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/user")];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("HTTP error! status: ".concat(response.status));
                }
                console.log(response.status, "response");
                return [4 /*yield*/, response.json()];
            case 2:
                userInfo = _a.sent();
                allUserDetail = userInfo;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
getUserData();
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loginFormValidation();
    var loginUser = allUserDetail.find(function (user) { return user.email === loginEmail.value; });
    if (loginUser && loginUser.password === loginPassword.value) {
        sessionStorage.setItem("currentUser", loginUser.email);
        sessionStorage.setItem("role", loginUser.roles);
        window.location.href = "index.html";
    }
    else {
        return false;
    }
});
// validation part
var showError = function (element, message) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
};
var removeError = function (element) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerHTML = "";
    inputControl.classList.remove("error");
};
var loginFormValidation = function (values) {
    if (values === void 0) { values = "default"; }
    allUserDetail.forEach(function (item) {
        if (values == "email" || values == "default") {
            if (!loginEmail.value) {
                showError(loginEmail, "Email can't be blank");
            }
            else {
                var checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!checkEmail.test(String(loginEmail.value).toLowerCase())) {
                    showError(loginEmail, "Invalid email");
                }
            }
            if (loginEmail.value === item.email) {
                removeError(loginEmail);
            }
        }
        if (values == "password" || values == "default") {
            if (!loginPassword.value) {
                showError(loginPassword, "Password can't be blank");
            }
            else {
                var checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                if (!checkPassword.test(loginPassword.value.trim())) {
                    showError(loginPassword, "Enter correct password");
                }
            }
            if (loginPassword.value === item.password) {
                removeError(loginPassword);
            }
        }
    });
};
