if ('geolocation' in navigator) {
  console.log('Geolocation is Available');
  function success(position) {
  console.log(position);
}

navigator.geolocation.getCurrentPosition(success);
} else {
  console.log('Geolocation is NOT Available');
}