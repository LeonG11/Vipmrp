package models

import "gorm.io/gorm"

type User struct {
	gorm.Model `json:"-"`
	Username   string `gorm:"unique;not null"`
	Password   string `gorm:"not null" json:"-"`
	Role       string `gorm:"default:'Рабочий'" json:"role"`
}
