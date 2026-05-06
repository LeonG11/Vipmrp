package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"viplight-mrp/database"
	"viplight-mrp/models"
)

func GetsOrders(c *gin.Context) {
	var orders []models.Order

	if err := database.DB.Preload("Parts").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении заказов"})
		return
	}

	c.JSON(http.StatusOK, orders)
}
