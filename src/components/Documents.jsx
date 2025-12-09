import { useState } from 'react'
import { qualityIndicators } from '../data/quality'

export default function Documents() {
  // Собираем все уникальные документы из всех показателей
  const allDocuments = []
  const documentMap = new Map()

  qualityIndicators.forEach((indicator) => {
    indicator.documents.forEach((doc) => {
      // Используем name как уникальный ключ, чтобы избежать дубликатов
      if (!documentMap.has(doc.name)) {
        documentMap.set(doc.name, {
          ...doc,
          relatedIndicators: [indicator.title],
        })
        allDocuments.push({
          ...doc,
          relatedIndicators: [indicator.title],
        })
      } else {
        // Если документ уже есть, добавляем связанный показатель
        const existingDoc = documentMap.get(doc.name)
        if (!existingDoc.relatedIndicators.includes(indicator.title)) {
          existingDoc.relatedIndicators.push(indicator.title)
        }
      }
    })
  })

  // Сортируем документы по типу (ГОСТ, ТР, ISO, Законы)
  const sortedDocuments = allDocuments.sort((a, b) => {
    const getType = (name) => {
      if (name.startsWith('ГОСТ')) return 1
      if (name.startsWith('ТР')) return 2
      if (name.startsWith('ISO')) return 3
      if (name.startsWith('Закон')) return 4
      return 5
    }
    const typeA = getType(a.name)
    const typeB = getType(b.name)
    if (typeA !== typeB) return typeA - typeB
    return a.name.localeCompare(b.name)
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  // Фильтрация документов
  const filteredDocuments = sortedDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.annotation.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'gost' && doc.name.startsWith('ГОСТ')) ||
      (selectedType === 'tr' && doc.name.startsWith('ТР')) ||
      (selectedType === 'iso' && doc.name.startsWith('ISO')) ||
      (selectedType === 'law' && doc.name.startsWith('Закон'))

    return matchesSearch && matchesType
  })

  const documentTypes = [
    { value: 'all', label: 'Все документы' },
    { value: 'gost', label: 'ГОСТ' },
    { value: 'tr', label: 'ТР ЕАЭС/ТС' },
    { value: 'iso', label: 'ISO' },
    { value: 'law', label: 'Законы РБ' },
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Нормативные документы
          </h1>
          <p className="text-lg text-gray-600">
            Полный список всех нормативных документов, применяемых к стандартным аналоговым ИМС
          </p>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Поиск */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поиск
              </label>
              <input
                type="text"
                placeholder="Введите название документа или описание..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Фильтр по типу */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип документа
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {documentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Найдено документов: <span className="font-semibold">{filteredDocuments.length}</span>
          </div>
        </div>

        {/* Список документов */}
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">
                Документы не найдены. Попробуйте изменить параметры поиска.
              </p>
            </div>
          ) : (
            filteredDocuments.map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">📄</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary-700 mb-2">
                          {doc.name}
                        </h3>
                        <p className="text-base font-medium text-gray-800 mb-3">
                          {doc.title}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {doc.annotation}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-medium text-gray-500">
                            Связанные показатели:
                          </span>
                          {doc.relatedIndicators.map((indicator, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                            >
                              {indicator}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Статистика */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Статистика
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {allDocuments.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Всего документов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {allDocuments.filter((d) => d.name.startsWith('ГОСТ')).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">ГОСТ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {allDocuments.filter((d) => d.name.startsWith('ТР')).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">ТР ЕАЭС/ТС</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {allDocuments.filter((d) => d.name.startsWith('Закон')).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Законы РБ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

