"use strict";

//console.log("Start loading script");

var saveBtn;
var costsList;
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

	var cost = { name: document.getElementById('product').value, 
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
	var priceSum = 0;

	costsList = document.getElementById('costsList');

	costsList.innerHTML = '';

	for(var j = 0; j < i; j++) {
		var newLi = document.createElement('li');
		newLi.innerHTML = costsArray[j].date + " " + costsArray[j].name + " - " + costsArray[j].price + " р.";
		costsList.insertBefore(newLi, costsList.firstChild);
		priceSum += Number(costsArray[j].price);
	};

	showPriceSum(priceSum);

	doVisibleFilter();
};

function doVisibleFilter() {
	document.getElementById('dfilter').classList.remove('hidden');
	document.getElementById('dateFilterBtn').classList.remove('hidden');

	document.getElementById('dateFilterBtn').addEventListener('click', saveDateForFilter);
};

function saveDateForFilter() {
//console.log("Enter to filterCostsList function");

	var dateFilter = document.getElementById('dfilter').value;
//console.log(dateFilter);
	document.getElementById('dfilter').value = '';

	rewriteFilteredCostsList(dateFilter);
};

function rewriteFilteredCostsList(dateFilter) {
	costsList.innerHTML = '';
	var priceSum = 0;
	var newLiCount = 0;

	for(var j = 0; j < i; j++) {
		if (costsArray[j].date == dateFilter) {
			newLi = document.createElement('li');
			newLi.innerHTML = costsArray[j].date + " " + costsArray[j].name + " - " + costsArray[j].price + " р.";
			costsList.insertBefore(newLi, costsList.firstChild);
			newLiCount++;
			priceSum += Number(costsArray[j].price);
		};
	};

	if (newLiCount > 0) {
		showPriceSum(priceSum);
		
	}else {
		newLi = document.createElement('li');
		newLi.innerHTML = "Нет записей на выбранную вами дату";
		costsList.appendChild(newLi);
	};	
};

function showPriceSum(sum) {
	var priceSumLi = document.createElement('li');

	priceSumLi.innerHTML = "Общая сумма - " + sum + " р.";

	costsList.appendChild(priceSumLi);
};


document.addEventListener('DOMContentLoaded', docReady);

//console.log("End loading script");