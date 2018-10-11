var defaultCoin = "";//eos eth 
var selectAccount = "";
if (navigator.userAgent.indexOf("bepalhotwallet") > 0) {
    if (typeof (bepal) != "undefined") {
        document.addEventListener("onSdkReady",
            function () {
                if (defaultCoin.length > 0) {
                    bepal.callAPP("wallet.getCurrentAccount", defaultCoin, function (error, result) {
                        if (error) {
                            toast("code=" + error.code + ",message=" + error.message);
                        } else {
                            if ("eos" === defaultCoin) {
                                selectAccount = result.account;
                            } else {
                                selectAccount = result;
                            }
                            sdkload();
                        }
                    });

                } else {
                    sdkload();
                }
            });
    } else {
        $(function () {
            sdkload();
        });
    }
} else {
    $(function () {
        sdkload();
    });
}

function toast(msg) {
    bepal.callAPP("app.toast", msg);
}

function confirm(title, text, fun) {
    var params = {
        title: title,
        message: text,
        cancelButtonText: "取消",
        confirmButtonText: "确认"
    };
    bepal.callAPP("app.confirm", params, function (error, result) {
        fun(error ? false : true);
    });
}

function scanQrCode(fun) {
    bepal.callAPP("app.scanQRCode", function (error, result) {
        if (error) {
            if (error["code"] === 1001) {
                toast("用户退出扫描");
            } else {
                toast("错误原因:" + JSON.stringify(error));
            }
        } else {
            fun(result);
        }
    });
}

function getValue(val, decimal) {
    var data = val.split(".");
    if (data.length === 1) {
        if (data[0] === "0") {
            return "0";
        }
        return data[0] + getDecimal(decimal);
    } else {
        if (data[0] === "0") {
            data[0] = "";
        }
        return data[0] + data[1] + getDecimal(decimal - data[1].length);
    }
}

function getDecimalValue(val, decimal) {
    var data = val.split(".");
    if (data.length === 1) {
        return data[0] + "." + getDecimal(decimal);
    } else {
        return data[0] + "." + data[1] + getDecimal(decimal - data[1].length);
    }
}

function getDecimal(count) {
    var str = "";
    for (var i = 0; i < count; i++) {
        str += "0";
    }
    return str;
}