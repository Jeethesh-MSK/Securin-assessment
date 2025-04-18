import json
import mysql.connector
import math
import os


print("Current Working Directory:", os.getcwd())


db = mysql.connector.connect(
    host="localhost",
    user="admin",
    password="1234",  
    database="recipes_db"
)
cursor = db.cursor()


file_path = r"C:\Users\jeeth\OneDrive\Desktop\JEETHESH MSK-SNU-RECIPES\backend\US_recipes_null.json"
try:
    with open(file_path) as file:
        data = json.load(file)
except FileNotFoundError:
    print(f"Error: The file '{file_path}' was not found.")
    exit(1)

for key, recipe in data.items():
    rating = recipe.get("rating")
    prep_time = recipe.get("prep_time")
    cook_time = recipe.get("cook_time")
    total_time = recipe.get("total_time")

    
    def parse_num(val):
        return None if val in ['NaN', None] or (isinstance(val, float) and math.isnan(val)) else val

    cursor.execute("""
        INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time,
                             description, nutrients, serves)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        recipe.get("cuisine"),
        recipe.get("title"),
        parse_num(rating),
        parse_num(prep_time),
        parse_num(cook_time),
        parse_num(total_time),
        recipe.get("description"),
        json.dumps(recipe.get("nutrients")),
        recipe.get("serves")
    ))

db.commit()
cursor.close()
db.close()