from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

# ---------------------- Setup ----------------------
app = FastAPI()
origins = ["*"]  # Allow all origins (change this in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "sqlite:///./cocokin.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

# ---------------------- Models ----------------------

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    answers = Column(Text)
    score = Column(Integer)
    result = Column(String)

class Alumni(Base):
    __tablename__ = "alumni"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    university = Column(String)
    avatar = Column(String)

Base.metadata.create_all(bind=engine)

# ---------------------- Schemas ----------------------

class UserCreate(BaseModel):
    name: str
    role: str

class QuizSubmit(BaseModel):
    user_id: int
    answers: List[str]

class AlumniCreate(BaseModel):
    name: str
    university: str
    avatar: str

# ---------------------- Routes ----------------------

@app.get("/")
def root():
    return {"message": "Cocok.in FastAPI backend active"}

@app.post("/users")
def create_user(user: UserCreate):
    new_user = User(name=user.name, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created", "user_id": new_user.id}

@app.post("/quiz/submit")
def submit_quiz(quiz: QuizSubmit):
    score = len([ans for ans in quiz.answers if ans]) * 4  # Dummy logic
    result = get_recommendation(score)

    new_quiz = Quiz(user_id=quiz.user_id, answers=str(quiz.answers), score=score, result=result)
    db.add(new_quiz)
    db.commit()
    return {"message": "Quiz submitted", "result": result}

@app.get("/quiz/result/{user_id}")
def get_result(user_id: int):
    result = db.query(Quiz).filter(Quiz.user_id == user_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return {
        "score": result.score,
        "result": result.result,
        "answers": result.answers
    }

@app.get("/consult/alumni")
def get_alumni():
    alumni = db.query(Alumni).all()
    return [{"name": a.name, "university": a.university, "avatar": a.avatar} for a in alumni]

@app.post("/consult/add")
def add_alumni(data: AlumniCreate):
    alumni = Alumni(name=data.name, university=data.university, avatar=data.avatar)
    db.add(alumni)
    db.commit()
    return {"message": "Alumni added"}

# ---------------------- Logic ----------------------

def get_recommendation(score: int) -> str:
    if score > 60:
        return "S1 Sistem Informasi - Institut Teknologi"
    elif score > 40:
        return "D4 Teknik Komputer - Politeknik Elektronika"
    else:
        return "S1 Teknologi Informasi - Universitas Surabaya"
