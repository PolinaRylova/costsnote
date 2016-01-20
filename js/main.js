"use strict";

//console.log("Start loading script");

var saveBtn;
var costsList;
var cost = {};
var costsArray = [];
var i = 0;
var newLi;
var newLiCount = 0;
var priceNum;
var priceFilterSum = 0;
var priceSum = 0;
var dateFilter;

function docReady() {
//console.log("Document ready");

	saveBtn = document.getElementById('saveBtn');

	saveBtn.addEventListener('click', saveBtnClick);
};

function onlyNum() {

if ( (event.keyCode < 48 || event.keyCode > 57) ) 
		event.returnValue = false;
};

function saveBtnClick() {
//console.log("Enter to saveBtnClick function");

	if( document.getElementById('product').value=='' || 
		document.getElementById('price').value=='' || 
		document.getElementById('date').value=='' ) {
			alert("Заполните все поля!");
			return;
	};

	cost = { name: document.getElementById('product').value, 
			 price: document.getElementById('price').value,
			 date: document.getElementById('date').value
			};

/*
console.log(cost.name);
console.log(cost.price);
console.log(cost.date);
*/

	costsArray[i++] = cost;

	document.getElementById('product').value = '';
	document.getElementById('price').value = '';
	document.getElementById('date').value = '';

	rewriteCostsList();

};

function rewriteCostsList() {
	costsList = document.getElementById('costsList');

	costsList.innerHTML = '';

	for(var j = 0; j < i; j++) {
		newLi = document.createElement('li');
		newLi.innerHTML = costsArray[j].date + " " + costsArray[j].name + " - " + costsArray[j].price + " р.";
		costsList.insertBefore(newLi, costsList.firstChild);
		priceNum = Number(costsArray[j].price);
	};

	showPriceSum(priceNum);

	doVisibleFilter();
};

function doVisibleFilter() {
	document.getElementById('dfilter').classList.remove('hidden');
	document.getElementById('dateFilterBtn').classList.remove('hidden');

	document.getElementById('dateFilterBtn').addEventListener('click', saveDateForFilter);
};

function saveDateForFilter() {
//console.log("Enter to filterCostsList function");

	dateFilter = document.getElementById('dfilter').value;
//console.log(dateFilter);
	document.getElementById('dfilter').value = '';

	rewriteFilteredCostsList();
};

function rewriteFilteredCostsList() {
	costsList.innerHTML = '';
	priceSum = 0;

	for(var j = 0; j < i; j++) {
		if (costsArray[j].date == dateFilter) {
			newLi = document.createElement('li');
			newLi.innerHTML = costsArray[j].date + " " + costsArray[j].name + " - " + costsArray[j].price + " р.";
			costsList.insertBefore(newLi, costsList.firstChild);
			newLiCount++;
			priceFilterSum += Number(costsArray[j].price);
		};
	};

	if (newLiCount > 0) {
		showPriceSum(priceFilterSum);
		
	}else {
		newLi = document.createElement('li');
		newLi.innerHTML = "Нет записей на выбранную вами дату";
		costsList.appendChild(newLi);
	};	
};

function showPriceSum(num) {
	var priceSumLi = document.createElement('li');

	priceSumLi.innerHTML = "Общая сумма - " + getPriceSum(num) + " р.";

	costsList.appendChild(priceSumLi);
};

function getPriceSum(num) {
	priceSum += num;
	return priceSum;
};

document.addEventListener('DOMContentLoaded', docReady);

//console.log("End loading script");