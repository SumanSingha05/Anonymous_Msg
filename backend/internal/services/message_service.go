package services

import (
	"errors"

	"anonymousmsg/internal/models"
	"anonymousmsg/internal/repositories"

	"gorm.io/gorm"
)

var (
	ErrUserNotFound = errors.New("user not found")
)

type MessageService struct {
	messageRepository *repositories.MessageRepository
	userRepository    *repositories.UserRepository
}

func NewMessageService(messageRepository *repositories.MessageRepository, userRepository *repositories.UserRepository) *MessageService {
	return &MessageService{
		messageRepository: messageRepository,
		userRepository:    userRepository,
	}
}

func (s *MessageService) CreateMessage(username string, content string) error {
	user, err := s.userRepository.FindByUsername(username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return ErrUserNotFound
		}
		return err
	}

	message := &models.Message{
		UserID:  user.ID,
		Content: content,
	}

	return s.messageRepository.Create(message)
}

func (s *MessageService) GetMessagesByUserID(userID uint) ([]models.Message, error) {
	return s.messageRepository.FindByUserID(userID)
}
