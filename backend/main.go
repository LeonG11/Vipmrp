package main

import (
	"viplight-mrp/database"
	"viplight-mrp/handlers"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()

	r := gin.Default()

	// CORS Middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "https://mrp.kkhome.ru")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Роуты теперь вызывают функции из handlers
	r.GET("/api/parts/:id", handlers.GetPart)
	r.GET("/api/parts", handlers.GetAllParts)
	r.POST("/api/parts", handlers.CreatePart)
	r.POST("/api/parts/bulk", handlers.ImportParts)
	r.PATCH("/api/parts/:id/status", handlers.UpdateStatus)
	r.DELETE("/api/parts/:id", handlers.DeletePart)


	r.Run(":8090")
}

