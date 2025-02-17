// database/db.go
package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

// ConnectDB initializes the MongoDB connection
func ConnectDB() {
	// Load environment variables
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

	// Select the database
	DB = client.Database("test")
	log.Println("✅ Connected to MongoDB")

	// Ensure unique index on phone_number field
	EnsureUniqueIndex()
}

// EnsureUniqueIndex ensures that the phone_number field is unique
func EnsureUniqueIndex() {
	collection := DB.Collection("user_ph")

	indexModel := mongo.IndexModel{
		Keys:    bson.M{"phone_number": 1}, // Create an index on phone_number
		Options: options.Index().SetUnique(true),
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatal("❌ Failed to create unique index on phone_number:", err)
	} else {
		fmt.Println("✅ Unique index on phone_number ensured successfully")
	}
}
