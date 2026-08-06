package main

import (
	"log"

	"anonymousmsg/internal/config"
	"anonymousmsg/internal/routes"
)

func main() {

	cfg := config.LoadConfig()

	router := routes.SetupRouter()

	log.Printf("Server starting in %s mode on port %s", cfg.Environment, cfg.Port)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}