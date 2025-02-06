import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {

    @Prop({ required: true, type: String, unique: true }) // Ensures unique emails
    email: string;

    @Prop({ required: true, type: String, minlength: 8 }) // Ensures minimum 8 characters
    password: string;
} 

export const UserSchema = SchemaFactory.createForClass(User);
