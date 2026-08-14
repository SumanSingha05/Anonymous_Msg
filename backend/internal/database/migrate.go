package database

import (
	"log"

	"anonymousmsg/internal/models"

	"gorm.io/gorm"
)

func  Migrate (db *gorm.DB) {
	err := db.AutoMigrate(&models.User{})

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migration completed successfully")
}