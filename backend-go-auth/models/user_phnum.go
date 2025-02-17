package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// UserPhone represents a user who logs in via phone number authentication.
type UserPhone struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	PhoneNumber string             `bson:"phone_number" json:"phone_number"`
	CreatedAt   int64              `bson:"created_at" json:"created_at"`
}
