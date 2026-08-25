package routes

import (
	"net/http"

	"anonymousmsg/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(authHandler *handlers.AuthHandler) *gin.Engine {

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Anonymous Msg API is running",
		})
	})

	auth := router.Group("/api/v1/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
	}

	return router
}
