"use strict";

//console.log("Start loading script");

var saveBtn;
var costsList;
var cost = {};
var costsArray = [];
var i = 0;

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
		var newLi = document.createElement('li');
		newLi.innerHTML = costsArray[j].name + " - " + costsArray[j].price + " р.";
		costsList.insertBefore(newLi, costsList.firstChild);
	};

	var allPrice = document.createElement('li');

	allPrice.innerHTML = "Общая сумма - " + getPriceSum() + " р.";

	costsList.appendChild(allPrice);

	doVisibleFilter();
};

function getPriceSum() {
	var priceSum = 0;

	for(var j = 0; j < i; j++) {
		priceSum += parseInt(costsArray[j].price); 
	};

	return priceSum;
};

function doVisibleFilter() {
	document.getElementById('dfilter').classList.remove('hidden');
	document.getElementById('dateFilterBtn').classList.remove('hidden');

	document.getElementById('dateFilterBtn').addEventListener('click', filterCostsList);
};

function filterCostsList() {
	console.log("Enter to filterCostsList function");

	var dateFilter = document.getElementById('date');

	console.log(s_date);
};

document.addEventListener('DOMContentLoaded', docReady);

//console.log("End loading script");