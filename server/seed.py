#!/usr/bin/env python3

from random import uniform
import random
from faker import Faker
from app import app
from models import db, User, Matcha, Brand, Grade

if __name__ == '__main__':
    fake = Faker()
    
    with app.app_context():
        print("Clearing database...")
        db.session.query(Matcha).delete()
        db.session.query(User).delete()
        db.session.query(Brand).delete()
        db.session.query(Grade).delete()
        db.session.commit()

        print("Seeding users...")
        users = [User(name=fake.first_name(), password=fake.password()) for _ in range(5)]
        db.session.add_all(users)
        db.session.commit()  

        print("Seeding brands...")
        brands = [
            Brand(name="Ippodo", website="https://www.ippodo-tea.co.jp/"),
            Brand(name="MatchaBar", website="https://matchabar.co/"),
            Brand(name="Encha", website="https://www.encha.com/"),
            Brand(name="Naoki", website="https://naokimatcha.com/"),
            Brand(name="Domatcha", website="https://domatcha.com/")
        ]
        db.session.add_all(brands)
        db.session.commit() 

        print("Seeding grades...")
        grades = [
            Grade(grade="Ceremonial"),
            Grade(grade="Premium"),
            Grade(grade="Latte"),
            Grade(grade="Cooking"),
            Grade(grade="Blended")
        ]
        db.session.add_all(grades)
        db.session.commit()  

        print("Seeding matchas...")
        matchas = [
            Matcha(
                name=f"{fake.word().capitalize()} Matcha",
                price=round(uniform(10, 50), 2),
                origin=fake.country(),
                user_id=random.choice(users).id,
                brand_id=random.choice(brands).id,
                grade_id=random.choice(grades).id,
            )
            for _ in range(10)
        ]
        db.session.add_all(matchas)
        db.session.commit()
        print("Database seeded successfully!")
