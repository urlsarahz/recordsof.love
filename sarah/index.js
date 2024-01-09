function changeTitle(arr){
    let len = arr.length;
    let n = 0;
    document.title = arr[0];

    let rep = setInterval(function(){

        if(n == len - 1){
            document.title = arr[n];
            n = 0;
        } else if(n==0){
        document.title = arr[n];
            n++;
        } else{
            document.title = arr[n];
            n++;
        }
    }, 1500)
}

function randInt(min, max) { 
    return Math.floor(Math.random() * (max - min) + min)
  }