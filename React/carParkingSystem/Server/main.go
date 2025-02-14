package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Car struct {
	ID     string `json:"id"`
	Number string `json:"number"`
	Model  string `json:"model"`
	Type   string `json:"type"`
}

var cars []Car = []Car{
	{ID: "1", Number: "ABC-123", Model: "Toyota", Type: "SUV"},
	{ID: "2", Number: "DEF-456", Model: "Honda", Type: "Sedan"},
	{ID: "3", Number: "GHI-789", Model: "Ford", Type: "Truck"},
	{ID: "4", Number: "JKL-012", Model: "Nissan", Type: "SUV"},
}

func readAllCars(c *gin.Context) {
	c.JSON(http.StatusOK, cars)
}

func readById(c *gin.Context) {
	id := c.Param("id")
	for _, car := range cars {
		if car.ID == id {
			c.JSON(http.StatusOK, car)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "car not found"})
}

func createCar(c *gin.Context) {
	var jbodyCar Car
	if err := c.BindJSON(&jbodyCar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var createdCar Car = jbodyCar
	cars = append(cars, Car{ID: createdCar.ID, Number: createdCar.Number, Model: createdCar.Model, Type: createdCar.Type})
	c.JSON(http.StatusCreated, gin.H{
		"message": "car created",
		"car":     createdCar,
	})
}
func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/cars", createCar)
	r.GET("/cars", readAllCars)
	r.GET("/cars/:id", readById)
	r.Run(":8080")
}
