import React from 'react';

export const TestApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Todo List - Тест
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Статус
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Приложение загружается успешно!
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Проверка
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Если вы видите это сообщение, то React работает корректно.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            Проверьте консоль браузера (F12) на наличие ошибок.
          </p>
        </div>
      </div>
    </div>
  );
};

