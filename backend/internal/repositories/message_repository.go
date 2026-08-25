package repositories

import (
	"anonymousmsg/internal/models"

	"gorm.io/gorm"
)

type MessageRepository struct {
	db *gorm.DB
}

func NewMessageRepository(db *gorm.DB) *MessageRepository {
	return &MessageRepository{db: db}
}

func (r *MessageRepository) Create(message *models.Message) error {
	return r.db.Create(message).Error
}

func (r *MessageRepository) FindByUserID(userID uint) ([]models.Message, error) {
	var messages []models.Message
	err := r.db.Where("user_id = ?", userID).Order("created_at desc").Find(&messages).Error
	return messages, err
}
