#!/usr/bin/env python3

from flask import request, jsonify, session, make_response
from flask_restful import Resource
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import app, db, api
from models import User, Matcha, Brand, Grade

# initialize flask login
login_manager = LoginManager()
login_manager.init_app(app)


# define user_loader function for flask login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return '<h1>Matcha Organizer API</h1>'

class Login(Resource):
    def post(self):
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return make_response(jsonify({"error": "Username and password required"}), 400)

        #convert username to lowercase
        username_lower = data['username'].lower() 

        # case insensitive username lookup
        user = User.query.filter(db.func.lower(User.username) == username_lower).first()
        if user is None:
            return make_response(jsonify({"error": "User not found"}), 404)

        if user.authenticate(data['password']):
            #login user with flask login
            login_user(user) 

            # return full user response like check session
            user_matchas = Matcha.query.filter_by(user_id=user.id).all()
            user_brands = {}
            user_grades = {}

            for matcha in user_matchas:
                matcha_data = {
                    "origin": matcha.origin,
                    "user_id": matcha.user_id,
                    "id": matcha.id,
                    "name": matcha.name,
                    "price": matcha.price,
                    "brand_id": matcha.brand_id,
                    "grade_id": matcha.grade_id,
                }

                if matcha.brand_id not in user_brands:
                    user_brands[matcha.brand_id] = {
                        "id": matcha.brand.id,
                        "name": matcha.brand.name,
                        "website": matcha.brand.website,
                        "matchas": []
                    }
                user_brands[matcha.brand_id]["matchas"].append(matcha_data)

                if matcha.grade_id not in user_grades:
                    user_grades[matcha.grade_id] = {
                        "id": matcha.grade.id,
                        "grade": matcha.grade.grade,
                        "matchas": []
                    }
                user_grades[matcha.grade_id]["matchas"].append(matcha_data)

            return make_response(jsonify({
                "id": user.id,
                "username": user.username,
                "brands": list(user_brands.values()),
                "grades": list(user_grades.values())
            }), 200)

        return make_response(jsonify({"error": "Invalid credentials"}), 401)




class CheckSession(Resource):
    def get(self):
        if not current_user.is_authenticated:
            return make_response(jsonify({"error": "Unauthorized"}), 401)
        #use flask logins current user
        user = current_user 

        #get only that users matchas
        user_matchas = Matcha.query.filter_by(user_id=user.id).all()

        user_brands = {}
        user_grades = {}

        for matcha in user_matchas:
            matcha_data = {
                "origin": matcha.origin,
                "user_id": matcha.user_id,
                "id": matcha.id,
                "name": matcha.name,
                "price": matcha.price,
                "brand_id": matcha.brand_id,
                "grade_id": matcha.grade_id,
            }

            if matcha.brand_id not in user_brands:
                user_brands[matcha.brand_id] = {
                    "id": matcha.brand.id,
                    "name": matcha.brand.name,
                    "website": matcha.brand.website,
                    "matchas": []
                }
            user_brands[matcha.brand_id]["matchas"].append(matcha_data)

            if matcha.grade_id not in user_grades:
                user_grades[matcha.grade_id] = {
                    "id": matcha.grade.id,
                    "grade": matcha.grade.grade,
                    "matchas": []
                }
            user_grades[matcha.grade_id]["matchas"].append(matcha_data)

        return make_response(jsonify({
            "id": user.id,
            "username": user.username,
            "brands": list(user_brands.values()),
            "grades": list(user_grades.values())
        }), 200)


# flask logout route
class Logout(Resource):
    @login_required
    def delete(self):
        #use flosk login to logout user
        logout_user() 
        return {"message": "Logged out successfully"}, 204

# user registration
class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response(jsonify([{"id": user.id, "username": user.username} for user in users]), 200)

    def post(self):
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return make_response(jsonify({"error": "Username and password are required"}), 400)

        #username to lowercase
        username_lower = data["username"].lower()

        #case insensitive uniqueness check
        existing_user = User.query.filter(db.func.lower(User.username) == username_lower).first()
        if existing_user:
            return make_response(jsonify({"error": "Username already exists"}), 400)

        #store username in lowercase
        new_user = User(username=username_lower)
        new_user.password_hash = data["password"]
        db.session.add(new_user)
        db.session.commit()

        # return response user was created
        return make_response(jsonify({
            "id": new_user.id,
            "username": new_user.username
        }), 201)




class Matchas(Resource):
    def post(self):
        data = request.get_json()
        required_fields = ["name", "price", "origin", "user_id", "brand_id", "grade_id"]
        if not data or any(field not in data for field in required_fields):
            return {"error": f"Missing required fields. Required fields: {required_fields}"}, 400
        
        #create new matcha
        new_matcha = Matcha(
            name=data["name"],
            price=data["price"],
            origin=data["origin"],
            user_id=data["user_id"],
            brand_id=data["brand_id"],
            grade_id=data["grade_id"],
        )
        db.session.add(new_matcha)
        db.session.commit()

        # return matcha
        return {
            "id": new_matcha.id,
            "name": new_matcha.name,
            "price": new_matcha.price,
            "origin": new_matcha.origin,
            "user_id": new_matcha.user_id,
            "brand_id": new_matcha.brand_id,
            "brand_name": new_matcha.brand.name,
            "brand_website": new_matcha.brand.website,
            "grade_id": new_matcha.grade_id,
            "grade_name": new_matcha.grade.grade,
        }, 201



class MatchaByID(Resource):
    def get(self, id):
        #get specific matcha
        matcha = Matcha.query.get(id)
        if matcha:
            return matcha.to_dict(), 200
        return {"error": "Matcha not found"}, 404
    
    def patch(self, id):
        #get specific matcha
        matcha = Matcha.query.get(id)
        if not matcha:
            return {"error": "Matcha not found"}, 404
        
        data = request.get_json()
        # update matcha data
        for key, value in data.items():
            setattr(matcha, key, value)
        db.session.commit()
        return matcha.to_dict(), 200
    
    def delete(self, id):
        #get specific matcha
        matcha = Matcha.query.get(id)
        if not matcha:
            return {"error": "Matcha not found"}, 404
        
        # delete matcha
        db.session.delete(matcha)
        db.session.commit()
        return {}, 204


class Brands(Resource):
    def get(self):
        # get all brands
        brands = Brand.query.all()
        return jsonify([brand.to_dict() for brand in brands])
    
    def post(self):
        data = request.get_json()
        if not data or 'name' not in data or 'website' not in data:
            return {"error": "Name and website are required"}, 400
        
        # create a new brand
        new_brand = Brand(name=data["name"], website=data["website"])
        db.session.add(new_brand)
        db.session.commit()
        return new_brand.to_dict(), 201


class Grades(Resource):
    def get(self):
        grades = Grade.query.all()
        return jsonify([grade.to_dict() for grade in grades] if grades else [])
    
    def post(self):
        data = request.get_json()
        if not data or 'grade' not in data:
            return {"error": "Grade is required"}, 400
        
        #create new grade
        new_grade = Grade(grade=data["grade"])
        db.session.add(new_grade)
        db.session.commit()
        return new_grade.to_dict(), 201



# Register API resources
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(Matchas, '/matchas')
api.add_resource(MatchaByID, '/matchas/<int:id>')
api.add_resource(Brands, '/brands')
api.add_resource(Grades, '/grades')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
