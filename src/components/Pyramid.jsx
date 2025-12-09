import { useState } from 'react'
import { lifecycleStages } from '../data/lifecycle'
import Modal from './Modal'

export default function Pyramid() {
  const [selectedStage, setSelectedStage] = useState(null)
  const [hoveredStage, setHoveredStage] = useState(null)

  const handleStageClick = (stage) => {
    setSelectedStage(stage)
  }

  const closeModal = () => {
    setSelectedStage(null)
  }

  // Вычисляем размеры для пирамиды
  const totalStages = lifecycleStages.length
  const containerHeight = 800 // Высота контейнера в пикселях
  const stageHeightPx = containerHeight / totalStages

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Жизненный цикл стандартных аналоговых ИМС
          </h1>
          <p className="text-lg text-gray-600">
            Нажмите на этап пирамиды, чтобы узнать подробности и риски
          </p>
        </div>

        <div className="flex justify-center items-start mb-12">
          <div className="relative mx-auto" style={{ width: '600px', maxWidth: '100%', height: `${containerHeight}px` }}>
            {lifecycleStages.map((stage, index) => {
              const position = totalStages - index - 1
              const widthPercent = 50 + (position * 8)
              const leftPercent = 50 - widthPercent / 2
              const topPx = index * stageHeightPx
              const heightPx = stageHeightPx

              const isHovered = hoveredStage === stage.id
              const scale = isHovered ? 1.05 : 1
              const zIndex = isHovered ? 20 : totalStages - index

              // Цвета для разных уровней
              const colors = [
                'bg-primary-50 border-primary-200 hover:bg-primary-100',
                'bg-primary-100 border-primary-300 hover:bg-primary-200',
                'bg-primary-200 border-primary-400 hover:bg-primary-300',
                'bg-primary-300 border-primary-500 hover:bg-primary-400',
                'bg-primary-400 border-primary-600 hover:bg-primary-500',
                'bg-primary-500 border-primary-700 hover:bg-primary-600 text-white',
                'bg-primary-600 border-primary-700 hover:bg-primary-700 text-white',
                'bg-primary-700 border-primary-800 hover:bg-primary-800 text-white',
                'bg-primary-800 border-primary-900 hover:bg-primary-900 text-white',
                'bg-primary-900 border-primary-900 hover:bg-gray-800 text-white',
              ]

              return (
                <div
                  key={stage.id}
                  className={`absolute border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-center px-4 ${
                    colors[index % colors.length]
                  }`}
                  style={{
                    width: `${widthPercent}%`,
                    left: `${leftPercent}%`,
                    top: `${topPx}px`,
                    height: `${heightPx}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                    zIndex: zIndex,
                    boxShadow: isHovered
                      ? '0 10px 25px rgba(0, 0, 0, 0.2)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => handleStageClick(stage)}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                >
                  <div>
                    <div className="font-bold text-sm sm:text-base">
                      {stage.id}. {stage.title}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Легенда для мобильных устройств */}
        <div className="lg:hidden mt-8 space-y-4">
          {lifecycleStages.map((stage) => (
            <div
              key={stage.id}
              className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleStageClick(stage)}
            >
              <h3 className="font-bold text-lg text-gray-800">
                {stage.id}. {stage.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        <Modal
          isOpen={selectedStage !== null}
          onClose={closeModal}
          title={selectedStage ? `${selectedStage.id}. ${selectedStage.title}` : ''}
        >
          {selectedStage && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Описание этапа
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedStage.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Риски этапа
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-primary-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Категория риска
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Описание
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Вероятность
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Влияние
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Меры минимизации
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          План реагирования
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedStage.risks.map((risk, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {risk.category}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {risk.description}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                risk.probability === 'Высокая'
                                  ? 'bg-red-100 text-red-800'
                                  : risk.probability === 'Средняя'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {risk.probability}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                risk.impact === 'Критическое' || risk.impact === 'Высокое'
                                  ? 'bg-red-100 text-red-800'
                                  : risk.impact === 'Среднее'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {risk.impact}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {risk.minimization}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {risk.reaction}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

