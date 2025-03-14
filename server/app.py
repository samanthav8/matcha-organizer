#!/usr/bin/env python3

from flask import request, jsonify, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import User, Matcha, Brand, Grade

@app.route('/')
def index():
    return '<h1>Matcha Organizer API</h1>'

class Login(Resource):
    def post(self):
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return make_response(jsonify({"error": "Username and password required"}), 400)
        
        user = User.query.filter_by(username=data['username']).first()
        if user is None:
            return make_response(jsonify({"error": "User not found"}), 404)

        if user.authenticate(data['password']): 
            session['user_id'] = user.id 
            return make_response(jsonify({"id": user.id, "username": user.username}), 200)

        return make_response(jsonify({"error": "Invalid credentials"}), 401)



class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')

        if not user_id:
            return make_response(jsonify({"error": "Unauthorized"}), 401)

        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({"error": "User not found"}), 404)

        # get only users matchas
        user_matchas = Matcha.query.filter_by(user_id=user_id).all()

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

class Logout(Resource):
    def delete(self):
        # Remove user from session
        session.pop('user_id', None)
        return {"message": "Logged out successfully"}, 204

#get and create users
class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response(jsonify([{"id": user.id, "username": user.username} for user in users]), 200)
    
    def post(self):
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return make_response(jsonify({"error": "Username and password are required"}), 400)
        
        #check if username exists
        existing_user = User.query.filter_by(username=data["username"]).first()
        if existing_user:
            return make_response(jsonify({"error": "Username already exists"}), 400)
        
        #create a new user
        new_user = User(username=data["username"])
        #uses setter to hash passsword
        new_user.password_hash = data["password"]
        db.session.add(new_user)
        db.session.commit()

        # return json
        return make_response(jsonify({"id": new_user.id, "username": new_user.username}), 201)



class Matchas(Resource):
    def get(self):
        matchas = Matcha.query.all()
        return jsonify([matcha.to_dict() for matcha in matchas])
    
    def post(self):
        data = request.get_json()
        required_fields = ["name", "price", "origin", "user_id", "brand_id", "grade_id"]
        if not data or any(field not in data for field in required_fields):
            return {"error": f"Missing required fields. Required fields: {required_fields}"}, 400
        
        # create a new matcha
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
        return new_matcha.to_dict(), 201


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
        return jsonify([grade.to_dict() for grade in grades] if grades else [])  # ✅ Ensure it returns an array
    
    def post(self):
        data = request.get_json()
        if not data or 'grade' not in data:
            return {"error": "Grade is required"}, 400
        
        # Create new grade
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
