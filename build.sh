#!/usr/bin/env bash
# Зупинити виконання, якщо виникне помилка
set -e

echo "--- Встановлення бекенд-залежностей ---"
npm install --legacy-peer-deps

echo "--- Встановлення фронтенд-залежностей ---"
cd ../frontend
npm install --legacy-peer-deps

echo "--- Збірка фронтенду ---"
# Використовуємо npx, щоб точно знайти vite
npx vite build

echo "--- Копіювання результату в публічну папку ---"
cp -r dist ../backend/public

echo "--- Збірка успішна! ---"