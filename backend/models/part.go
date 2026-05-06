package models

const (
        StatusImport            = "Запланировано"
        StatusWarehouse         = "Склад"
        StatusSawing            = "Пила"
        StatusEdging            = "Кромка"
        StatusEdgingHand        = "Кромка ручная"
        StatusCNCDelta          = "ЧПУ Дельта"
        StatusCNCTrepan         = "ЧПУ Трепан"
        StatusHandDrilling      = "Присадка на ручном станке"
        StatusSawHand           = "Циркулярная пила"
        StatusAssembly          = "Сборка"
        StatusAbrasive          = "Шлифовка"
        StatusDrying            = "Сушка после малярки"
        StatusPainting          = "Малярная камера"
        StatusGlass             = "Стекольный цех"
        StatusMetalSelf         = "Сварочный цех"
        StatusPaintingOutsource = "Порошковая покраска"
        StatusAdv               = "Рекламный участок"
        StatusLight             = "Светодиодный участок"
        StatusSemiFinished      = "Упаковка полуфабриката"
        StatusFinished          = "Упаковка изделия"
        StatusShipment          = "Отгружено на монтаж"
        StatusInstallation      = "Монтаж оборудования"
        StatusRejected          = "Отбраковано/сломано"
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
        ID          uint    `gorm:"primaryKey;autoIncrement" json:"id"` 
        Designation string  `json:"designation" binding:"required"`     
        OrderNo     string  `json:"order_no" binding:"required"`        
        Name        string  `json:"name" binding:"required"`            
        Material    string  `json:"material" binding:"required"`        
        Thickness   float64 `json:"thickness" binding:"required"`       
        Quantity    int     `json:"quantity" binding:"required"`        

        Length      float64 `json:"length" binding:"required"`       
        Width       float64 `json:"width" binding:"required"`        
        LengthFirst float64 `json:"length_first" binding:"required"` 
        WidthFirst  float64 `json:"width_first" binding:"required"`  

        EdgeL1 string `json:"edge_l1"` 
        EdgeL2 string `json:"edge_l2"` 
        EdgeW1 string `json:"edge_w1"` 
        EdgeW2 string `json:"edge_w2"` 

        Groove      string `json:"groove"`                          
        Note        string `json:"note"`                            
        ProductName string `json:"product_name" binding:"required"` 

        Status string `json:"status" gorm:"default:Создан"`
}
