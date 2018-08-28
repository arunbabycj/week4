module.exports = function(http){
  http.listen(3000,()=>{
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server has benn started at : ' + n + ':' + m);
  });
}
