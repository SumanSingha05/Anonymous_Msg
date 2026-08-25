package services

import (
	"errors"

	"anonymousmsg/internal/models"
	"anonymousmsg/internal/repositories"
	"anonymousmsg/internal/utils"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var (
	ErrEmailAlreadyRegistered = errors.New("email already registered")
	ErrUsernameAlreadyTaken   = errors.New("username already taken")
	ErrInvalidCredentials     = errors.New("invalid credentials")
)

type UserService struct {
	userRepository *repositories.UserRepository
}

func NewUserService(userRepository *repositories.UserRepository) *UserService {
	return &UserService{
		userRepository: userRepository,
	}
}

func (s *UserService) Register(username, email, password string) (*models.User, error) {

	_, err := s.userRepository.FindByEmail(email)

	if err == nil {
		return nil, ErrEmailAlreadyRegistered
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	_, err = s.userRepository.FindByUsername(username)

	if err == nil {
		return nil, ErrUsernameAlreadyTaken
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return nil, err
	}

	user := &models.User{
		Username: username,
		Email:    email,
		Password: string(hashedPassword),
	}

	if err := s.userRepository.Create(user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) Login(email, password, jwtSecret string) (string, *models.User, error) {

	user, err := s.userRepository.FindByEmail(email)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", nil, ErrInvalidCredentials
		}

		return "", nil, err
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(password),
	)

	if err != nil {
		return "", nil, ErrInvalidCredentials
	}

	token, err := utils.GenerateToken(user.ID, jwtSecret)

	if err != nil {
		return "", nil, err
	}

	return token, user, nil
}

func (s *UserService) GetUserByUsername(username string) (*models.User, error) {
	return s.userRepository.FindByUsername(username)
}

func (s *UserService) GetUserByID(id uint) (*models.User, error) {
	return s.userRepository.FindByID(id)
}

