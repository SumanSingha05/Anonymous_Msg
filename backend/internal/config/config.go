package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port        string
	Environment string
	DatabaseURL string
	JWTSecret   string
}

func LoadConfig() *Config {

	// Load .env file before reading environment variables.
	err := godotenv.Load()

	if err != nil {
		log.Println(".env file not found. Using system environment variables.")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL is not configured")
	}

	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	environment := os.Getenv("APP_ENV")

	if environment == "" {
		environment = "development"
	}

	jwtSecret := os.Getenv("JWT_SECRET")

	if jwtSecret == "" {
		log.Fatal("JWT_SECRET is not configured")
	}

	return &Config{
		Port:        port,
		Environment: environment,
		DatabaseURL: databaseURL,
		JWTSecret:   jwtSecret,
	}
}
