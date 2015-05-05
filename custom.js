function saveLogin() {
    void 0 != jQuery(".dialogButtons").html() && (clearInterval(timer), $(document).on("click", ".dialogButton.dialogFocus", function() {
        var e = new Crypt;
        localStorage.setItem("rec1", e.AES.encrypt("aydo.com\\" + jQuery("[name='userid']").val(), "W$#)IKFSEOKRWEOR$K@#ORFWKEODKRW4EORP@K#WED")), localStorage.setItem("rec2", e.AES.encrypt(jQuery("[name='password']").val(), "W$#)IKFSEOKRWEOR$K@#ORFWKEODKRW4EORP@K#WED"))
    }))
}

function addDesktopLink() {
    void 0 != jQuery("#global_toolbar").html() && (clearInterval(timer2), jQuery("#global_toolbar").append('<div id="logging_string" onclick="sparklogin()"  style="color: #fff; float: right; margin-top: 13px; margin-right: 10px; font-size: 14px; font-weight: bold; cursor: pointer;"><span class="icon-desktop" style="margin-right: 7px;"></span>Desktop</div>'), $(document).on("click", "#disconnect_link", function() {
        localStorage.removeItem("rec1"), localStorage.removeItem("rec2")
    }), $(document).on("click", "#action_instance_logout", function() {
        localStorage.removeItem("rec1"), localStorage.removeItem("rec2")
    }))
}

function sparklogin() {
    var e = "https://httpgw.aydo.com/login2.html?rec1=" + encodeURIComponent(localStorage.getItem("rec1")) + "&rec2=" + encodeURIComponent(localStorage.getItem("rec2"));
    jQuery("html").append('<iframe id="sparkLogin" src="' + e + '" style="display: none;"></iframe>')
}
var JsonFormatter = {
    stringify: function(e) {
        var t = {
            ct: e.ciphertext.toString(CryptoJS.enc.Base64)
        };
        return JSON.stringify(t)
    },
    parse: function(e) {
        var t = JSON.parse(e),
            o = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(t.ct)
            });
        return t.iv && (o.iv = CryptoJS.enc.Hex.parse(t.iv)), t.s && (o.salt = CryptoJS.enc.Hex.parse(t.s)), o
    }
};
if ("null" != localStorage.getItem("cre1") && void 0 == jQuery(".dialogButtons").html()) var timer = setInterval(saveLogin, 1e3);
if (void 0 == jQuery("#global_toolbar").html()) var timer2 = setInterval(addDesktopLink, 1e3);
timer3 = setInterval(function() {
    if (jQuery('#ajxp_desktop + .no_select_bg').length > 0) {
        jQuery('#ajxp_desktop + .no_select_bg').remove();
    }
}, 500);

function loadChangePassword() {
    changePasswordTimer = setInterval(function() {
        if (document.querySelector('#account_pane .action_bar .toolbarGroup') != undefined) {
            jQuery('body').append('<div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                          <div class="modal-dialog">\
                            <div class="modal-content">\
                              <div class="modal-header">\
                                <span id="modalCloseBtn" class="icon-remove" data-dismiss="modal" style="cursor:pointer;float:right;"></span>\
                                <span class="icon-key ajxp_icon_span" style="float: left; margin-right: 6px; margin-top: 2px;"></span>\
                                <h4 class="modal-title" id="myModalLabel">Change your password</h4>\
                              </div>\
                              <div class="modal-body">\
                              </div>\
                            </div>\
                        </div>')
            var name = "";
            if (jQuery('#logging_string').find('.user_widget_label').find('i').text().substr(jQuery('#logging_string').find('.user_widget_label').find('i').text().length - 1) == " ") {
                var cre = new Crypt();
                name = cre.AES.decrypt(localStorage.getItem('rec1'),  "W$#)IKFSEOKRWEOR$K@#ORFWKEODKRW4EORP@K#WED").split("\\")[1];
            }
            if (jQuery('#changePasswordPage').length == 0) {
                jQuery('.modal-body').append('<iframe id="changePasswordPage" src="https://changepass.aydo.com:5001/api/user/?name=' + name + '" width="425" height="295" style="margin-top: -10px; margin-left: -10px; border: 0; margin-top: 5%;" ></iframe>');
            }
            jQuery("span:contains('Change Password')").parent().remove();
            jQuery('#account_pane').find('.action_bar').find('.toolbarGroup').append('<a id="showPasswordModal" class="" data-toggle="modal" data-target="#changePasswordModal"><span class="icon-key"></span> <span>Change your password</span></a>');
            clearInterval(changePasswordTimer);
        }
    }, 10);
}
$(document).on("click", "#action_instance_switch_to_user_dashboard", function() {
    if (jQuery('#showPasswordModal').length == 0) {
        loadChangePassword();
    }
});
if (window.location.href.indexOf("/dashboard") > -1) {
    loadChangePassword();
}
