'use strict';

// доступ к корзине
const cartIconWrapSpan = document.querySelector('.cartIconWrap span');
// доступ к диву суммы заказа
const basketSum = document.querySelector('.basketSum');
// доступ к спану суммы товаров в корзине
const basketSumNumber = document.querySelector('.basketSumNumber');
// доступ к меню корзины
const basket = document.querySelector('.basket');

// обработываем событие клика по корзине
let cartIconWrap = document.querySelector('.cartIconWrap');
cartIconWrap.addEventListener('click', function() {
  basket.classList.toggle('hidden');
});

// Создаём пустой объект корзины, где ключ id товара, значение будем брать 
// из функии addProductBasket.
const basketArr = {};

// обрабатываем нажатие добавить в корзину
let featuredItems = document.querySelector('.featuredItems');
featuredItems.addEventListener('click', function(event) {
  // если нажали не на кнопку и селектора нет у родителя, выходим
  if (!event.target.closest('.addToCart')) {
    return;
  }
  // берём инфу о товаре у родителя
  const featuredItem = event.target.closest('.featuredItem');
  const idFeaturedItem = +featuredItem.dataset.id;
  const nameFeaturedItem = featuredItem.dataset.name;
  const costFeaturedItem = +featuredItem.dataset.price;
  // добавляем товар в корзину
  addProductBasket(idFeaturedItem, nameFeaturedItem, costFeaturedItem);
});

/**
 * Добавление товара в корзину
 * @param {number} id - id товара
 * @param {string} product - наменоване товара
 * @param {number} cost - стоимость товара
 */
function addProductBasket(id, product, cost) {
  // проверяем есть ли товар в корзине, нет - добавляем
  if (!(id in basketArr)) {
    basketArr[id] = {
      id: id, 
      name: product, 
      price: cost, 
      count: 0
    };
  }
  // плюсуем товар.
  basketArr[id].count++;
  // обновление счётчика товаров
  cartIconWrapSpan.textContent = getSumProduct().toString();
  // пересчет суммы товаров
  basketSumNumber.textContent = getSumBasket().toFixed(2);
  // формирование списка
  productList(id);
}

/**
 * Считает количество товаров
 * @return {number} - сколько товаров в корзине
 */
function getSumProduct() {
  return Object.values(basketArr).reduce((acc, product) => acc + product.count, 0);
}

/**
 * Подсчитываем сумму всех товаров
 * @return {number} - сумма всех товаров
 */
function getSumBasket() {
  return Object
    .values(basketArr)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

/**
 * Формирует список товаров
 * @param {number} idProduct - id товара
 */
function productList(idProduct) {
  // строка товара
  const productListEl = basket
    .querySelector(`.productList[data-id="${idProduct}"]`);
  //проверяем, если товара нет, добавляем строку
  if (!productListEl) {
    strOfProduct(idProduct);
    return;
  }

  // берём инфу о товаре
  const product = basketArr[idProduct];
  // обновляем количество товара
  productListEl.querySelector('.productCount').textContent = product.count;
  // обновляем сумму товара
  productListEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

/**
 * Создание строки товара.
 * @param {number} idProduct - id товара
 */
function strOfProduct(idProduct) {
  const productStr = `
    <div class="productList" data-id="${idProduct}">
      <div>${basketArr[idProduct].name}</div>
      <div>
        <span class="productCount">${basketArr[idProduct].count}</span> шт.
      </div>
      <div>$${basketArr[idProduct].price}</div>
      <div>
        $<span class="productTotalRow">${(basketArr[idProduct].price * basketArr[idProduct].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketSum.insertAdjacentHTML("beforebegin", productStr);
}
