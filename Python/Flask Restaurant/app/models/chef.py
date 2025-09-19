"""Модель повара."""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON
from sqlalchemy.orm import relationship

from app.extensions import db


class Chef(db.Model):
    """Модель повара ресторана."""
    
    __tablename__ = 'chefs'
    
    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False, index=True)
    rank = Column(String(50), nullable=False, index=True)
    specialties = Column(JSON, nullable=False, default=list)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Связь с блюдами (многие ко многим)
    menu_items = relationship('MenuItem', secondary='chef_menu_items', back_populates='chefs')
    
    def __repr__(self):
        return f'<Chef {self.full_name}>'
    
    def to_dict(self):
        """Преобразование в словарь для JSON ответов."""
        return {
            'id': self.id,
            'full_name': self.full_name,
            'rank': self.rank,
            'specialties': self.specialties,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


# Таблица связей многие ко многим
chef_menu_items = db.Table(
    'chef_menu_items',
    db.Column('chef_id', db.Integer, db.ForeignKey('chefs.id'), primary_key=True),
    db.Column('menu_item_id', db.Integer, db.ForeignKey('menu_items.id'), primary_key=True)
)

