from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-matchas.user',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    matchas = db.relationship('Matcha', back_populates='user')

    def __repr__(self):
        return f'<User id={self.id}, name={self.name}>'
    



class Brand(db.Model, SerializerMixin):
    __tablename__ = 'brands'
    serialize_rules = ('-matchas.brand',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(100), nullable=False)
    
    matchas = db.relationship('Matcha', back_populates='brand')

    def __repr__(self):
        return f'<Brand id={self.id}, name={self.name}>'
    


class Grade(db.Model, SerializerMixin):
    __tablename__ = 'grades'
    serialize_rules = ('-matchas.grade',)
    
    id = db.Column(db.Integer, primary_key=True)
    grade = db.Column(db.String(50), nullable=False)
    
    matchas = db.relationship('Matcha', back_populates='grade')

    def __repr__(self):
        return f'<Grade id={self.id}, grade={self.grade}>'
    



class Matcha(db.Model, SerializerMixin):
    __tablename__ = 'matchas'
    serialize_rules = ('-user.matchas', '-brand.matchas', '-grade.matchas')
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'), nullable=False)
    grade_id = db.Column(db.Integer, db.ForeignKey('grades.id'), nullable=False)
    
    user = db.relationship('User', back_populates='matchas')
    brand = db.relationship('Brand', back_populates='matchas')
    grade = db.relationship('Grade', back_populates='matchas')

    def __repr__(self):
        return f'<Matcha id={self.id}, name={self.name}, price={self.price}, origin={self.origin}, user_id={self.user_id}, brand_id={self.brand_id}, grade_id={self.grade_id}>'
    