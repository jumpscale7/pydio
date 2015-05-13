from flask import Flask, jsonify, render_template, request
import os

try:
    from flask.ext.cors import CORS
except ImportError:
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask.ext.cors import CORS


app = Flask(__name__)

CORS(app, resources=r'/api/*', allow_headers='Content-Type')
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api/user/")
def getChangePasswordPage():
    return render_template('changePass.html')


@app.route("/api/user/changepassword/")
def changepassword():
    oldPassword = request.args.get('oldPassword')
    newPassword = request.args.get('newPassword')
    reNewPassword = request.args.get('reNewPassword')
    user = request.args.get('user')
    changeCommand = os.system(''' su - "%s" -c 'echo -e "%s\n%s\n%s" | smbpasswd ' ''' % ( user ,oldPassword, newPassword , reNewPassword ))
    return jsonify(respond = changeCommand)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001, ssl_context=('/opt/code/apiForPydio/star_aydo_com.crt', '/opt/code/apiForPydio/star_aydo_com.key'))
