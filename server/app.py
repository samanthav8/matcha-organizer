#!/usr/bin/env python3

from flask import request, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User, Matcha, Brand, Grade

@app.route('/')
def index():
    return '<h1>Matcha Organizer API</h1>'

#handling user authentication
class Login(Resource):
    def post(self):
        data = request.get_json()
        if not data or 'name' not in data or 'password' not in data:
            return {"error": "Name and password required"}, 400
        
        #check if user exists
        user = User.query.filter_by(name=data['name']).first()

        if user is None:
            return {"error": "User not found"}, 404

        #use hashed pw verification
        if user.check_password(data['password']): 
            #store user in in session
            session['user_id'] = user.id 
            return user.to_dict(rules=('-password_hash',)), 200

        return {"error": "Invalid credentials"}, 401 


#checking if user is logged in
class CheckSession(Resource):
    def get(self):
        #get user id from session
        user_id = session.get('user_id') 

        if not user_id:
            return {"error": "Unauthorized"}, 401 

        user = User.query.get(user_id)
        if user:
            return user.to_dict(rules=('-password_hash',)), 200
        
        return {"error": "User not found"}, 404

class Logout(Resource):
    def delete(self):
        #remove user from session
        session.pop('user_id', None) 
        return {"message": "Logged out successfully"}, 204
    
#gets and creates users
class Users(Resource):
    def get(self):
        users = User.query.all()
        user_list = []
        
        for user in users:
            # filter brands and grades to only include matchas that belong to this user
            user_matchas = Matcha.query.filter_by(user_id=user.id).all()
            brands = list({matcha.brand for matcha in user_matchas})
            grades = list({matcha.grade for matcha in user_matchas})
            
            user_data = user.to_dict(rules=('-password',)) 
            user_data["brands"] = [brand.to_dict() for brand in brands]
            user_data["grades"] = [grade.to_dict() for grade in grades]
            
            user_list.append(user_data)
        
        return jsonify(user_list)

    
    def post(self):
        data = request.get_json()
        if not data or 'name' not in data or 'password' not in data:
            return {"error": "Name and password are required"}, 400
        
        #create new user
        new_user = User(name=data["name"], password=data["password"])
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201

class Matchas(Resource):
    #rlly no need to get all matchas at any point
    # def get(self):
    #     matchas = Matcha.query.all()
    #     return jsonify([matcha.to_dict() for matcha in matchas])
    
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
        #update matcha data
        for key, value in data.items():
            setattr(matcha, key, value)
        db.session.commit()
        return matcha.to_dict(), 200
    
    def delete(self, id):
        #get specific matcha
        matcha = Matcha.query.get(id)
        if not matcha:
            return {"error": "Matcha not found"}, 404
        #delete matcha
        db.session.delete(matcha)
        db.session.commit()
        return {}, 204

class Brands(Resource):
    def get(self):
        #get all brands
        brands = Brand.query.all()
        return jsonify([brand.to_dict() for brand in brands])
    
    def post(self):
        data = request.get_json()
        if not data or 'name' not in data or 'website' not in data:
            return {"error": "Name and website are required"}, 400
        #create new brand
        new_brand = Brand(name=data["name"], website=data["website"])
        db.session.add(new_brand)
        db.session.commit()
        return new_brand.to_dict(), 201

class Grades(Resource):
    def get(self):
        grades = Grade.query.all()
        return jsonify([grade.to_dict() for grade in grades])
    
    def post(self):
        data = request.get_json()
        if not data or 'grade' not in data:
            return {"error": "Grade is required"}, 400
        #create new grade
        new_grade = Grade(grade=data["grade"])
        db.session.add(new_grade)
        db.session.commit()
        return new_grade.to_dict(), 201

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