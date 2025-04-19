CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"dob" date NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
