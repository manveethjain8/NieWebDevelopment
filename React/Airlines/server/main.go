package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Config
var mongoUri string = "mongodb://localhost:27017"
var mongoDbName string = "airline_app_db"
var mongoCollectionAirlines string = "airlines"

// Database variables
var mongoclient *mongo.Client
var airlineCollection *mongo.Collection

// Model Airline for Collection "airlines"
type Airline struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Airlines    string             `json:"airlines" bson:"airlines"`
	Source      string             `json:"source" bson:"source"`
	Destination string             `json:"destination" bson:"destination"`
	Duration    string             `json:"duration" bson:"duration"`
	Fare        float64            `json:"fare" bson:"fare"`
}

// Connect to MongoDB
func connectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var errConnection error
	mongoclient, errConnection = mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if errConnection != nil {
		log.Fatal("MongoDB Connection Error:", errConnection)
	}

	airlineCollection = mongoclient.Database(mongoDbName).Collection(mongoCollectionAirlines)
	fmt.Println("Connected to MongoDB!")
}

// POST /airlines
func createAirline(c *gin.Context) {
	var jbodyAirline Airline

	// Bind JSON body to jbodyAirline
	if err := c.BindJSON(&jbodyAirline); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Insert airline into MongoDB
	result, err := airlineCollection.InsertOne(ctx, jbodyAirline)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add the airline"})
		return
	}

	// Extract the inserted ID
	airlineId, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse inserted ID"})
		return
	}
	jbodyAirline.ID = airlineId

	// Read the created airline from MongoDB
	var createdAirline Airline
	err = airlineCollection.FindOne(ctx, bson.M{"_id": jbodyAirline.ID}).Decode(&createdAirline)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch the airline"})
		return
	}

	// Return created airline
	c.JSON(http.StatusCreated, gin.H{
		"message": "Airline created successfully",
		"airline": createdAirline,
	})
}

// GET /airlines
func readAllAirlines(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := airlineCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch airlines"})
		return
	}
	defer cursor.Close(ctx)

	var airlines []Airline
	if err := cursor.All(ctx, &airlines); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse airlines"})
		return
	}

	c.JSON(http.StatusOK, airlines)
}

// GET /airlines/:id
func readAirlineById(c *gin.Context) {
	id := c.Param("id")

	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var airline Airline
	err = airlineCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&airline)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airline not found"})
		return
	}

	c.JSON(http.StatusOK, airline)
}

// PUT /airlines/:id
func updateAirline(c *gin.Context) {
	id := c.Param("id")
	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var jbodyAirline Airline
	if err := c.BindJSON(&jbodyAirline); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := airlineCollection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": jbodyAirline})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update airline"})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airline not found"})
		return
	}

	// Return updated airline
	c.JSON(http.StatusOK, gin.H{
		"message": "Airline updated successfully",
		"airline": jbodyAirline,
	})
}

// DELETE /airlines/:id
func deleteAirline(c *gin.Context) {
	id := c.Param("id")
	// Convert string ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, errDelete := airlineCollection.DeleteOne(ctx, bson.M{"_id": objectID})
	if errDelete != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete airline"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airline not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Airline deleted successfully"})
}

// searchAirlineByName allows searching airlines by name using a case-insensitive query.
func searchAirlineByName(c *gin.Context) {
	// Get the query parameter for the airline name
	name := c.Query("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name query parameter is required"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Use regex to match the airline name (case-insensitive)
	filter := bson.M{"airlines": bson.M{"$regex": name, "$options": "i"}}
	cursor, err := airlineCollection.Find(ctx, filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search airlines"})
		return
	}
	defer cursor.Close(ctx)

	// Slice to store found airlines
	var airlines []Airline
	if err := cursor.All(ctx, &airlines); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse search results"})
		return
	}

	// Return the found airlines
	c.JSON(http.StatusOK, airlines)
}

func main() {
	// Connect to MongoDB
	connectDB()

	// Set up Gin router
	r := gin.Default()
	// CORS Configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8080", "http://localhost:3000"}, // React frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Routes
	r.POST("/airlines", createAirline)
	r.GET("/airlines", readAllAirlines)
	r.GET("/airlines/:id", readAirlineById)
	r.PUT("/airlines/:id", updateAirline)
	r.DELETE("/airlines/:id", deleteAirline)
	r.GET("/airlines/search", searchAirlineByName)

	// Start server
	r.Run(":8080")
}
