"use strict";

var saveBtn;
var costsList;
var costsArray = [];
var i = 0;

function docReady() {
	saveBtn = document.getElementById('saveBtn');

	costsList = document.getElementById('costsList');

	saveBtn.addEventListener('click', saveBtnClick);
};

function onlyNum() {

	if ( (event.keyCode < 48 || event.keyCode > 57) ) 
		event.returnValue = false;
};

function saveBtnClick() {

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

	costsArray[i++] = cost;

	document.getElementById('product').value = '';
	document.getElementById('price').value = '';
	document.getElementById('date').value = '';

	rewriteCostsList();

	doVisibleFilter();
};

function doVisibleFilter() {
	document.getElementById('dfilter').classList.remove('hidden');
	document.getElementById('dateFilterBtn').classList.remove('hidden');
	document.getElementById('dateFilterBtn').addEventListener('click', saveDateForFilter);
};

function saveDateForFilter() {
	var dateFilter = document.getElementById('dfilter').value;

	if(dateFilter == '') {
		costsList.innerHTML = '';
		alert("Введите дату для фильтра!");
		return;
	};

	document.getElementById('dfilter').value = '';

	rewriteCostsList(dateFilter);
};

function rewriteCostsList(dateFilter) {
	costsList.innerHTML = '';

	var priceSum = 0;

	var newLiCount = 0;

	for(var j = 0; j < i; j++) {
		if ( (dateFilter == undefined) || (dateFilter == costsArray[j].date) ) {
			var newLi = document.createElement('li');
			newLi.innerHTML = costsArray[j].date + " " + costsArray[j].name + " - " + costsArray[j].price + " р.";
			costsList.insertBefore(newLi, costsList.firstChild);
			newLiCount++;
			priceSum += Number(costsArray[j].price);
		};
	};

	if (newLiCount > 0) {
		showPriceSum(priceSum);
		
	}else {
		var newLi = document.createElement('li');
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