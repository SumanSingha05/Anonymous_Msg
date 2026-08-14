package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port string
	Environment string
	DatabaseURL string
}

func LoadConfig() *Config {

	// Load .env file before reading environment variables.
	err := godotenv.Load()

	if err != nil {
		log.Println(".env file not found. Using system environment variables.")
	}

	databaseURL := os.Getenv("DATABASE_URL")

	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	environment := os.Getenv("APP_ENV")

	if environment == "" {
		environment = "development"
	}

	return &Config{
		Port:        port,
		Environment: environment,
		DatabaseURL: databaseURL,
	}
}