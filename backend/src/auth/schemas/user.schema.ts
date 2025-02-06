import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class User {

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    password: string;
} 

export const UserSchema = SchemaFactory.createForClass(User);