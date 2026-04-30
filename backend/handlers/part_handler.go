package handlers

import (
	"net/http"
	"viplight-mrp/database"
	"viplight-mrp/models"
    "github.com/gin-gonic/gin"
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
	database.DB.Create(&newPart)
	c.JSON(http.StatusCreated, newPart)
}

func UpdateStatus(c *gin.Context) {
	id := c.Param("id")
	var input struct { Status string `json:"status" binding:"required"` }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Status is required"})
    }

    result := database.DB.Model(&models.Part{}).Where("id = ?", id).Update("status", input.Status)

    if result.RowsAffected == 0{
        c.JSON(http.StatusNotFound, gin.H{"error" : "Деталь не найдена"})
    }

	c.JSON(http.StatusOK, gin.H{"status": "updated", "new_status": input.Status})
}

func DeletePart(c *gin.Context){
    id := c.Param("id")
    if err := database.DB.Delete(&models.Part{}, "id = ?", id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось удалить элемент"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Удалено"})
}

func CreatePartsBulk(c *gin.Context){
    var parts []models.Part
    if err := c.ShouldBindJSON(&parts); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := database.DB.Create(&parts).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error" : "Не могу создать деталь"})
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

    // GORM сделает один быстрый INSERT для всех деталей
    if err := database.DB.Create(&parts).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка импорта"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Импортировано", "count": len(parts)})
}


