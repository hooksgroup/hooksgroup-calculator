/* ====== hooksgroup.co ========= */

// Counter
const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
  const target = document.querySelector(qSelector);
  let startTimestamp = null;
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress   = Math.min((timestamp - startTimestamp) / duration, 1);
      target.innerText = Math.floor(progress * (end - start) + start).toLocaleString("en-US");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
  window.requestAnimationFrame(step);
};

// add commas to value
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculations
function hooksGroupCalc() {

	// Inputs:
	let moreRevenue  = document.querySelector('input[name="moreRevenue"]:checked').value;
	let howManyPages = document.querySelector('input[name="howManyPages"]:checked').value;

	// ------ Calculation: ---------

	// Timeframe:
	let result_monthes = 12;
	if (howManyPages == 5 && moreRevenue !== 'notSure') {
		result_monthes = '3-6 Months';
	}
	else if (howManyPages == 10 && moreRevenue !== 'notSure') {
		result_monthes = '6-12 Months';
	}
	else if (howManyPages == 25 && moreRevenue !== 'notSure') {
		result_monthes = '12 Months';
	}
	else if (howManyPages == 50 && moreRevenue !== 'notSure') {
		result_monthes = '12 Months';
	}
	else if (moreRevenue === 'notSure') {
		result_monthes = 'TBD';
	}

	// Pricing
	let result_dollar = 5200
	if (howManyPages == 5) {
		result_dollar = 2300;
	}
	else if (howManyPages == 10) {
		result_dollar = 2800;
	}
	else if (howManyPages == 25) {
		result_dollar = 5200;
	}
	else if (howManyPages == 50) {
		result_dollar = 5200;
	}

	let monthlyTraffic      = document.getElementById('monthlyTraffic').value;
	let conversionRate      = document.getElementById('conversionRate').value;
		document.getElementById("ranger").value = conversionRate;
	let conversionRevenue = document.getElementById('conversionRevenue').value;

	//console.log(conversionRate);

	// Validation Step 4:
	if (conversionRate > 0 && 
			conversionRate <= 10 &&
			monthlyTraffic > 0) {
		document.getElementById("btn-step-4").disabled 			  = false;
		document.getElementById("btn-step-4-mobile").disabled = false;
	} else {
		document.getElementById("btn-step-4").disabled 				= true;
		document.getElementById("btn-step-4-mobile").disabled = true;
	}
	// Validation Step 5:
	if (conversionRevenue > 0) {
		document.getElementById("btn-step-5").disabled 				= false;
		document.getElementById("btn-step-5-mobile").disabled = false;
	} else {
		document.getElementById("btn-step-5").disabled 			  = true;
		document.getElementById("btn-step-5-mobile").disabled = true;
	}

	document.getElementById('monthly_traffic_result').innerHTML       = numberWithCommas(monthlyTraffic);
	document.getElementById('conversion_rate_result').innerHTML       = conversionRate;
	document.getElementById('conversion_revenue_result').innerHTML    = numberWithCommas(conversionRevenue);
	document.getElementById('conversion_rate_result_fixed').innerHTML = conversionRate;
	

	// Formula
	let conversions    = conversionRate / 100 * monthlyTraffic;
	let monthlyRevenue = conversions * conversionRevenue;
	
	// Result:
	document.getElementById('result_monthes').innerHTML            = result_monthes;
	document.getElementById('est_monthly_revenue').innerHTML       = monthlyRevenue;
	document.getElementById('est_monthly_revenue_fixed').innerHTML = monthlyRevenue;

	// Animation
	counterAnim("#result_dollar",       			0, result_dollar, 1000);
	counterAnim("#est_monthly_revenue", 		  0, monthlyRevenue, 1000);
	counterAnim("#est_monthly_revenue_fixed", 0, monthlyRevenue, 1000);
	
	// Push input results to Webflow form
	document.getElementById('monthlyRevenueResult').setAttribute('value', monthlyRevenue);
	document.getElementById('resultMonthesResult').setAttribute('value',  result_monthes);
	document.getElementById('resultDollarResult').setAttribute('value',   result_dollar);
}

function sliderChanger() {
	let monthlyTraffic    = document.getElementById('monthlyTraffic').value;
	let conversionRevenue = document.getElementById('conversionRevenue').value;
	let conversionRate    = document.getElementById('ranger').value;

	let conversions    = conversionRate / 100 * monthlyTraffic;
	let monthlyRevenue = conversions * conversionRevenue;

	// Result:
	document.getElementById('conversion_rate_result_fixed').innerHTML = conversionRate;
	document.getElementById('est_monthly_revenue_fixed').innerHTML 	  = Math.round(monthlyRevenue);

	// Animation
	// counterAnim("#conversion_rate_result", 0, conversionRate, 60);
	counterAnim("#est_monthly_revenue_fixed", 0, monthlyRevenue, 1000);

	// document.getElementById("ranger").value = conversionRate;
	console.log(conversionRate + ' ranger');
	console.log(monthlyRevenue + ' monthly Revenuer');
}


//Hide Steps

function fisrtStepSubmitHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'block';
	document.getElementById("step3").style.display = 'none';
	document.getElementById("step4").style.display = 'none';
	document.getElementById("step5").style.display = 'none';
}

function secondStepSubmitHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'none';
	document.getElementById("step3").style.display = 'block';
	document.getElementById("step4").style.display = 'none';
	document.getElementById("step5").style.display = 'none';
}

function thirdStepSubmitHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'none';
	document.getElementById("step3").style.display = 'none';
	document.getElementById("step4").style.display = 'block';
	document.getElementById("step5").style.display = 'none';
}

function fourthStepSubmitHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'none';
	document.getElementById("step3").style.display = 'none';
	document.getElementById("step4").style.display = 'none';
	document.getElementById("step5").style.display = 'block';
}

function fifthStepSubmitHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'none';
	document.getElementById("step3").style.display = 'none';
	document.getElementById("step4").style.display = 'none';
	document.getElementById("step5").style.display = 'none';
	document.getElementById("result").style.display = 'block';
	document.getElementById("form_block").style.display = 'block';
	
	
	// Push input results to Webflow form
	const websiteType = document.querySelector('.moreRevenue:checked').value;
	document.getElementById('pages-you-need').setAttribute('value', websiteType);
	
	const howManyPages = document.querySelector('.how-many-pages:checked').value;
	document.getElementById('how-many-pages').setAttribute('value', howManyPages);
	
	const conversionObject = document.querySelector('.conversion-object:checked').value;
	document.getElementById('Conversion-Object').setAttribute('value', conversionObject);
	
	const monthlyTraffic    = document.getElementById('monthlyTraffic').value;
	const conversionRate    = document.getElementById('conversionRate').value;
	const conversionRevenue = document.getElementById('conversionRevenue').value;
	
	document.getElementById('monthlyTrafficInput').setAttribute('value',    monthlyTraffic);
	document.getElementById('conversionRateInput').setAttribute('value',    conversionRate);
	document.getElementById('conversionRevenueInput').setAttribute('value', conversionRevenue);
}

function secondStepBackHandler () {
	document.getElementById("step1").style.display = 'block';
	document.getElementById("step2").style.display = 'none';
	document.getElementById("step3").style.display = 'none';
	document.getElementById("step4").style.display = 'none';
	document.getElementById("step5").style.display = 'none';
}

function thirdStepBackHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'block';
	document.getElementById("step3").style.display = 'none';
	document.getElementById("step4").style.display = 'none';
	document.getElementById("step5").style.display = 'none';
}

function fourthStepBackHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'none';
	document.getElementById("step3").style.display = 'block';
	document.getElementById("step4").style.display = 'none';
	document.getElementById("step5").style.display = 'none';
}


function fifthStepBackHandler () {
	document.getElementById("step1").style.display = 'none';
	document.getElementById("step2").style.display = 'none';
	document.getElementById("step3").style.display = 'none';
	document.getElementById("step4").style.display = 'block';
	document.getElementById("step5").style.display = 'none';
}

// HTML 2 PDF
var btn = document.getElementById("save_to_pdf");
var createpdf = document.getElementById("save_pdf_block");
var opt = {
 margin: 1,
 filename: 'hooksgroup-calculator.pdf',
 html2canvas: {
    scale: 2
 },
 jsPDF: {
    unit: 'in',
    format: 'letter',
    orientation: 'portrait'
 }
};
btn.addEventListener("click", function() {
 html2pdf().set(opt).from(createpdf).save();
});
