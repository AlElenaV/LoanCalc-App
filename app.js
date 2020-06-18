//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display='none';

  //show loader
  document.getElementById('loading').style.display='block';
  setTimeout(calculateResults,200);

  e.preventDefault();
});

//calculate results
function calculateResults(e){
  //UI vars
  const amount=document.getElementById('amount');
  const interest=document.getElementById('interest');
  const years=document.getElementById('years');
  const monthlyPayment=document.getElementById('monthly-payment');
  const totalPayment=document.getElementById('total-payment');
  const totalInterest=document.getElementById('total-interest');

  const principal = parseFloat(amount.value); //return amount into decimal
  const calculateInterest = parseFloat(interest.value)/100/12;
  const calculatePayments = parseFloat(years.value)*12;

  //compute monthly payments
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal*x*calculateInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value=monthly.toFixed(2);
  totalPayment.value=(monthly*calculatePayments).toFixed(2);
  totalInterest.value = ((monthly*calculatePayments)-principal).toFixed(2);

  //show results
  document.getElementById('results').style.display='block';
   //hide loader
   document.getElementById('loading').style.display='none';
}
  else{showError('Please check your numbers');}
  e.preventDefault();
}

//show error
function showError(error){
  //hide loader and results
  document.getElementById('results').style.display='none';
  document.getElementById('loading').style.display='none';


  const errorDiv = document.createElement('div');
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');

  errorDiv.className='alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}