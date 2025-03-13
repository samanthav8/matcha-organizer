from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash


from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-matchas.user', '-password_hash',) 
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)

    brands = db.relationship('Brand', secondary='matchas', viewonly=True)
    grades = db.relationship('Grade', secondary='matchas', viewonly=True)

    def set_password(self, password):
        """hash and set the password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """check if the password matches the stored hash"""
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User id={self.id}, name={self.name}>'


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