package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// Create a new Gin router with Logger and Recovery middleware
	router := gin.Default()

	// Health check / Home route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Anonymous Msg API is running",
		})
	})

	return router
}