// models/user_oauth.go
package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserOAuth struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Email string             `bson:"email" json:"email"`
	Name  string             `bson:"name" json:"name"`
	// GoogleID  string             `bson:"google_id" json:"google_id"`
	// Picture   string             `bson:"picture" json:"picture"`
	CreatedAt int64 `bson:"created_at" json:"created_at"`
}
