package models

const (
    StatusImport = "Запланировано"
    StatusWarehouse = "Склад"
    StatusSawing = "Пила"
    StatusEdging = "Кромка"
    StatusEdgingHand = "Кромка ручная"
    StatusCNCDelta = "ЧПУ Дельта"
    StatusCNCTrepan = "ЧПУ Трепан"
    StatusHandDrilling = "Присадка на ручном станке"
    StatusSawHand = "Циркулярная пила"
    StatusAssembly = "Сборка"
    StatusAbrasive = "Шлифовка"
    StatusDrying = "Сушка после малярки"
    StatusPainting = "Малярная камера"
    StatusGlass = "Стекольный цех"
    StatusMetalSelf = "Сварочный цех"
    StatusPaintingOutsource = "Порошковая покраска"
    StatusAdv = "Рекламный участок"
    StatusLight = "Светодиодный участок"
    StatusSemiFinished = "Упаковка полуфабриката"
    StatusFinished = "Упаковка изделия"
    StatusShipment = "Отгружено на монтаж"
    StatusInstallation = "Монтаж оборудования"
    StatusRejected = "Отбраковано/сломано"
)

func IsValidStatus(s string) bool {
    switch s {
    case StatusWarehouse, StatusSawing, StatusEdging, StatusEdgingHand,
        StatusCNCDelta, StatusCNCTrepan, StatusHandDrilling, StatusSawHand,
        StatusAssembly, StatusAbrasive, StatusDrying, StatusPainting,
        StatusGlass, StatusMetalSelf, StatusPaintingOutsource, StatusAdv,
        StatusLight, StatusSemiFinished, StatusFinished, StatusShipment,
        StatusInstallation, StatusRejected:
        return true
    }
    return false
}

type Part struct {
	ID           string  `gorm:"primaryKey" json:"id" binding:"required"` // № или Обозначение
	Destignation string  `json:"destignation" binding:"required"` // № или Обозначение
	OrderNo      string  `json:"order_no" binding:"required"`             // Заказ изделия
	Name         string  `json:"name" binding:"required"`                 // Наименование детали
	Material     string  `json:"material" binding:"required"`             // Наименование материала
	Thickness    float64 `json:"thickness" binding:"required"`            // Толщина
	Quantity     int     `json:"quantity" binding:"required"`             // Количество
	
	// Размеры (используем Готовую деталь как основной стандарт)
	Length       float64 `json:"length" binding:"required"`               // Готовая деталь [L]
	Width        float64 `json:"width" binding:"required"`                // Готовая деталь [W]
	
	// Кромка
	EdgeL1       string  `json:"edge_l1"`              // Обозначение кромки [L1]
	EdgeL2       string  `json:"edge_l2"`              // Обозначение кромки [L2]
	EdgeW1       string  `json:"edge_w1"`              // Обозначение кромки [W1]
	EdgeW2       string  `json:"edge_w2"`              // Обозначение кромки [W2]
	
	// Доп. инфо
	Groove       string  `json:"groove"`               // Паз
	Note         string  `json:"note"`                 // Примечание
	ProductName  string  `json:"product_name" binding:"required"`         // Наимен. изделия
	
	Status       string  `json:"status" gorm:"default:Создан"`
}

