package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	OrderNo    string `gorm:"uniqueIndex;not null" json:"order_no"`
	ClientName string `json:"client_name"`
	Deadline   string `json:"deadline"`
	Status     string `gorm:"default:'Новый'" json:"status"`

	Parts []Part `gorm:"foreignKey:OrderNo;references:OrderNo" json:"parts"`
}
