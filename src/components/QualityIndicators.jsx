import { useState } from 'react'
import { qualityIndicators } from '../data/quality'
import Modal from './Modal'

export default function QualityIndicators() {
  const [selectedIndicator, setSelectedIndicator] = useState(null)

  const handleIndicatorClick = (indicator) => {
    setSelectedIndicator(indicator)
  }

  const closeModal = () => {
    setSelectedIndicator(null)
  }

  // Расположение блоков в виде ровного дерева для 7 элементов
  // Структура: 1 корень -> 2 ветви -> по 3 листа на каждой ветви + 1 центральный
  const positions = [
    { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // 1. Электрические параметры (корень)
    { top: '30%', left: '25%', transform: 'translateX(-50%)' }, // 2. Надёжность (левая ветвь)
    { top: '30%', left: '75%', transform: 'translateX(-50%)' }, // 3. Температурные характеристики (правая ветвь)
    { top: '55%', left: '12.5%', transform: 'translateX(-50%)' }, // 4. Электромагнитная совместимость (левый лист 1)
    { top: '55%', left: '37.5%', transform: 'translateX(-50%)' }, // 5. Экологическая безопасность (левый лист 2)
    { top: '55%', left: '62.5%', transform: 'translateX(-50%)' }, // 6. Эргономика (правый лист 1)
    { top: '55%', left: '87.5%', transform: 'translateX(-50%)' }, // 7. Эстетичность (правый лист 2)
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Показатели качества
          </h1>
          <p className="text-lg text-gray-600">
            Нажмите на показатель, чтобы узнать подробности и нормативные документы
          </p>
        </div>

        {/* Десктопная версия - блок-схема */}
        <div className="hidden lg:block relative min-h-[750px] mb-12">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {/* Соединительные линии от корня к ветвям второго уровня */}
            <line
              x1="50%"
              y1="10%"
              x2="25%"
              y2="30%"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="50%"
              y1="10%"
              x2="75%"
              y2="30%"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            {/* Соединительные линии от левой ветви к левым листьям */}
            <line
              x1="25%"
              y1="30%"
              x2="12.5%"
              y2="55%"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="25%"
              y1="30%"
              x2="37.5%"
              y2="55%"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            {/* Соединительные линии от правой ветви к правым листьям */}
            <line
              x1="75%"
              y1="30%"
              x2="62.5%"
              y2="55%"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="75%"
              y1="30%"
              x2="87.5%"
              y2="55%"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {qualityIndicators.map((indicator, index) => {
            const pos = positions[index] || positions[0]
            const isHovered = selectedIndicator?.id === indicator.id

            return (
              <div
                key={indicator.id}
                className="absolute bg-white border-2 border-primary-500 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-110 hover:z-10 p-3 w-52"
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: pos.transform || 'none',
                  zIndex: isHovered ? 20 : 10,
                }}
                onClick={() => handleIndicatorClick(indicator)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <h3 className="font-bold text-xs leading-tight text-gray-800">
                    {indicator.title}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>

        {/* Мобильная версия - список */}
        <div className="lg:hidden space-y-4">
          {qualityIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleIndicatorClick(indicator)}
            >
              <div className="flex items-start">
                <div className="text-3xl mr-4">📊</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {indicator.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {indicator.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={selectedIndicator !== null}
          onClose={closeModal}
          title={selectedIndicator?.title || ''}
        >
          {selectedIndicator && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Описание показателя
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedIndicator.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Нормативные документы
                </h3>
                <div className="space-y-4">
                  {selectedIndicator.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500"
                    >
                      <h4 className="font-bold text-primary-700 mb-2">
                        {doc.name}
                      </h4>
                      <p className="text-sm font-medium text-gray-800 mb-2">
                        {doc.title}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {doc.annotation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

