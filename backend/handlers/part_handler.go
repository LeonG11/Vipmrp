package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"viplight-mrp/database"
	"viplight-mrp/models"
)

func GetPart(c *gin.Context) {
	id := c.Param("id")
	var part models.Part
	if err := database.DB.First(&part, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.JSON(http.StatusOK, part)
}

func GetAllParts(c *gin.Context) {
	var parts []models.Part
	database.DB.Find(&parts)
	c.JSON(http.StatusOK, parts)
}

func CreatePart(c *gin.Context) {
	var newPart models.Part
	if err := c.ShouldBindJSON(&newPart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if newPart.OrderNo != "" {
		var order models.Order
		database.DB.Where(models.Order{OrderNo: newPart.OrderNo}).FirstOrCreate(&order)
	}

	if err := database.DB.Create(&newPart).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, newPart)
}

func UpdateStatus(c *gin.Context) {
	id := c.Param("id")
	var input struct {
		Status string `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверные данные"})
	}

	if err := database.DB.Model(&models.Part{}).Where("id = ?", id).Update("status", input.Status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось обновить статус"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "updated", "new_status": input.Status})
}

func DeletePart(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Delete(&models.Part{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Удалено"})
}

func CreatePartsBulk(c *gin.Context) {
	var parts []models.Part
	if err := c.ShouldBindJSON(&parts); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ordersMap := make(map[string]bool)
	for _, p := range parts {
		if p.OrderNo != "" {
			ordersMap[p.OrderNo] = true
		}
	}

	for orderNo := range ordersMap {
		var order models.Order
		database.DB.Where(models.Order{OrderNo: orderNo}).FirstOrCreate(&order)
	}

	if err := database.DB.Create(&parts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, parts)
}

func ImportParts(c *gin.Context) {
	var parts []models.Part

	if err := c.ShouldBindJSON(&parts); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(parts) > 0 {
		orderNo := parts[0].OrderNo

		var order models.Order
		if err := database.DB.Where(models.Order{OrderNo: orderNo}).FirstOrCreate(&order).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка создания заголовка заказа"})
			return
		}
	}

	if err := database.DB.Create(&parts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при сохранении заказа"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Данные успешно импортированы", "count": len(parts), "order_no": parts[0].OrderNo})
}
