from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt
from flask_login import UserMixin
import re

db = SQLAlchemy()
bcrypt = Bcrypt()

from config import db

# Models go here!

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    #reads the hashed password
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    #sets hashed pw
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    #checks if pw is correct
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    # required for flask login
    def get_id(self):
        #flask login expects a string
        return str(self.id)

    #valiate password
    @validates("password")
    def validate_password(self, key, password):
        if len(password) < 6:
            raise ValueError("Password must be at least 6 characters long")
        if not re.search(r'[A-Z]', password):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r'[a-z]', password):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r'\d', password):
            raise ValueError("Password must contain at least one number")
        return password

    def __repr__(self):
        return f'<User id={self.id}, username={self.username}>'


class Brand(db.Model, SerializerMixin):
    __tablename__ = 'brands'
    serialize_rules = ('-matchas',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(100), nullable=False)
    
    matchas = db.relationship('Matcha', backref='brand', lazy=True)

    def __repr__(self):
        return f'<Brand id={self.id}, name={self.name}>'


class Grade(db.Model, SerializerMixin):
    __tablename__ = 'grades'
    serialize_rules = ('-matchas',)
    
    id = db.Column(db.Integer, primary_key=True)
    grade = db.Column(db.String(50), nullable=False)
    
    matchas = db.relationship('Matcha', backref='grade', lazy=True)

    def __repr__(self):
        return f'<Grade id={self.id}, grade={self.grade}>'
    


class Matcha(db.Model, SerializerMixin):
    __tablename__ = 'matchas'
    serialize_rules = (
        '-user.matchas', 
        '-brand.matchas', 
        '-grade.matchas', 
    )
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'), nullable=False)
    grade_id = db.Column(db.Integer, db.ForeignKey('grades.id'), nullable=False)

    def __repr__(self):
        return f'<Matcha id={self.id}, name={self.name}>'