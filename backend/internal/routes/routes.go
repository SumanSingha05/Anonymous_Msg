package routes

import (
	"net/http"

	"anonymousmsg/internal/handlers"
	"anonymousmsg/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter(authHandler *handlers.AuthHandler, messageHandler *handlers.MessageHandler, jwtSecret string) *gin.Engine {

	router := gin.Default()

	// Apply CORS
	router.Use(middleware.CORSMiddleware())

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Anonymous Msg API is running",
		})
	})

	api := router.Group("/api/v1")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
			auth.GET("/me", middleware.AuthMiddleware(jwtSecret), authHandler.GetMe)
		}

		// Public user profile
		api.GET("/users/:username", authHandler.GetPublicProfile)

		// Anonymous messages (Public send)
		api.POST("/messages/:username", messageHandler.SendMessage)

		// Authenticated messages (Get user's inbox)
		api.GET("/messages", middleware.AuthMiddleware(jwtSecret), messageHandler.GetMyMessages)
	}

	return router
}
