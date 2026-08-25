package main

import (
	"log"

	"anonymousmsg/internal/config"
	"anonymousmsg/internal/database"
	"anonymousmsg/internal/handlers"
	"anonymousmsg/internal/repositories"
	"anonymousmsg/internal/routes"
	"anonymousmsg/internal/services"
)

func main() {

	cfg := config.LoadConfig()

	db, err := database.Connect(cfg.DatabaseURL)

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully")

	database.Migrate(db)

	userRepository := repositories.NewUserRepository(db)
	messageRepository := repositories.NewMessageRepository(db)

	userService := services.NewUserService(userRepository)
	messageService := services.NewMessageService(messageRepository, userRepository)

	authHandler := handlers.NewAuthHandler(
		userService,
		cfg.JWTSecret,
	)

	messageHandler := handlers.NewMessageHandler(messageService)

	router := routes.SetupRouter(authHandler, messageHandler, cfg.JWTSecret)

	log.Printf(
		"Server starting in %s mode on port %s",
		cfg.Environment,
		cfg.Port,
	)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
