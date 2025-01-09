"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email or not password:
                raise Exception('missing data')
        check_user= User.query.filter_by(email=email).first()

        if not check_user:
             new_user = User(email=email, password=password, is_active=True)
             db.session.add(new_user)
             db.session.commit()
             access_token = create_access_token(identity=str(new_user.id))
             return ({"msg": "ok", "token": access_token}), 201
        return jsonify({"msg": "Usuario registrado, intente iniciar sesión"}), 400
    except Exception as error:
        return jsonify({'error': str(error)})
    
@api.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email or not password:
                raise Exception('missing data')
        check_user= User.query.filter_by(email=email).first()

        if check_user.password == password:
             access_token = create_access_token(identity=str(check_user.id))
             return ({"msg": "ok", "token": access_token}), 201
        return jsonify({"msg": "Contraseña incorrecta, pruebe de nuevo"}), 400
    except Exception as error:
        return jsonify({'error': str(error)})


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    id = get_jwt_identity()
    user= User.query.get(id)
    if not user: 
         return jsonify({"msg": "something go wrong"})
    return jsonify({"data" : user.serialize()}), 200


