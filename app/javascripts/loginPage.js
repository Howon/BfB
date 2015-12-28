var mod = function(n, m) {
  var remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
}

$(document).ready(function(){
  var infoPannels = $(".rayos-info-pannel");
  var arrPosition = 0;

  $(".navigate-item").click(function(){
    var direction = $(this).attr("data-id");
    if(direction === "right"){
      arrPosition++;
    } else {
      arrPosition--;
    }
    arrPosition = mod(arrPosition,4);
    var currentElem = $(".rayos-info-pannel.active");
    var nextElem = $(infoPannels[arrPosition]);
    currentElem.fadeOut('200', 'swing', function() {
      currentElem.removeClass("active");
      nextElem.fadeIn('200', 'swing', function() {
        nextElem.addClass('active');
      });
    });
  });
});