// database/db.go
package database

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	// Optionally load .env here if not already loaded in main
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found")
	}

	clientOptions := options.Client().ApplyURI(os.Getenv("DB_URI"))
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("MongoDB connection error:", err)
	}

	// Verify connection
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal("MongoDB ping error:", err)
	}

	// Choose your database name (it can be from .env as well)
	DB = client.Database("go-db")
	log.Println("Connected to MongoDB")
}
