package main

import (
	"log"

	"anonymousmsg/internal/config"
	"anonymousmsg/internal/routes"
	"anonymousmsg/internal/database"
)

func main() {

	cfg := config.LoadConfig()

	db, err := database.Connect(cfg.DatabaseURL)

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully")

	database.Migrate(db)

	_ = db
	
	router := routes.SetupRouter()


	log.Printf(
		"Server starting in %s mode on port %s",
		cfg.Environment, 
		cfg.Port,
	)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}