package handlers

import (
	"errors"
	"net/http"

	"anonymousmsg/internal/models"
	"anonymousmsg/internal/services"

	"github.com/gin-gonic/gin"
)

type MessageHandler struct {
	messageService *services.MessageService
}

func NewMessageHandler(messageService *services.MessageService) *MessageHandler {
	return &MessageHandler{
		messageService: messageService,
	}
}

func (h *MessageHandler) SendMessage(c *gin.Context) {
	username := c.Param("username")

	var request struct {
		Content string `json:"content"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
		})
		return
	}

	if request.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Message content cannot be empty",
		})
		return
	}

	err := h.messageService.CreateMessage(username, request.Content)
	if err != nil {
		if errors.Is(err, services.ErrUserNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "User not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to send message",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Message sent successfully",
	})
}

func (h *MessageHandler) GetMyMessages(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Unauthorized",
		})
		return
	}

	messages, err := h.messageService.GetMessagesByUserID(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch messages",
		})
		return
	}

	// if messages is nil, make it an empty array instead of null in JSON response
	if messages == nil {
		messages = []models.Message{}
	}

	c.JSON(http.StatusOK, gin.H{
		"success":  true,
		"messages": messages,
	})
}
