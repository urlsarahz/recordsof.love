

function on() {
    document.getElementById("deadImg").style.display="none"; 
    document.getElementById("tmppp").style.display="none"; 
      document.getElementById("settings").style.opacity="1"; 
    document.getElementById("drawCloud").style.backgroundColor="var(--pink)"; 
    document.getElementById("tmpp").style.display="block"; 

    // let imgPaths = loadJSON("./sky.json")
    // for (let i=1; i<2; i++) {
    //     let filename = imgPaths[imgPaths.length-i];
    //     alert(filename);
    //     $("body").append($("<img src=" + filename + "></img>"))
    // }
}  
  
  var canvas = document.getElementById("drawCloud");
    var ctx = canvas.getContext("2d");
    const settings = document.getElementById('settings');
    var size = 20;
    var opacity = 0.3;
    // var blur = 7;
    var color = "rgb(255, 255, 255)";
    
    var container = document.getElementById("tmpContainer");
    canvas.style.width ='100%'
    canvas.style.height ='65%'
    canvas.width = canvas.offsetWidth;
    canvas.height =canvas.offsetHeight;
  
    var offscreenCanvas = document.createElement('canvas');
    var oc = offscreenCanvas.getContext("2d");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
  
    var freezeCanvas = document.createElement('canvas');
    var fc = freezeCanvas.getContext("2d");
    freezeCanvas.width = canvas.width;
    freezeCanvas.height = canvas.height;
  
  function clear(ctx,oc,fc){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    oc.clearRect(0, 0, canvas.width, canvas.height);
    fc.clearRect(0, 0, canvas.width, canvas.height);
  }
  settings.addEventListener('click', e => {
      if (e.target.id === 'clear') {
        clear(ctx, oc, fc);
      }
  });
   
  settings.addEventListener("change", e =>{
      if(e.target.id === 'size') {
        size = e.target.value;
      }
      if(e.target.id === 'opacity') {
        opacity = (e.target.value)/100;
      }  
  });
  
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mousemove', sketch);

  
  var mouse = {x:0,y:0}; 
  let paint = false;
  let startX;
  let startY;
  
  function startPainting(e) {
      paint = true;
      startX = e.clientX - canvas.offsetLeft;
      startY = e.clientY - canvas.offsetTop;
      oc.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  function stopPainting() {
      paint = false;
      oc.stroke();
      oc.beginPath();
  
      fc.clearRect(0, 0, canvas.width, canvas.height);
      fc.drawImage(canvas, 0, 0);
  }
  
  function sketch(e) {
      if (!paint) return;
      
      oc.lineWidth = size;
      oc.lineJoin = 'round';
      oc.lineCap = 'round';
      oc.strokeStyle = color;
      
      oc.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      oc.stroke();
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.8;
      ctx.drawImage(freezeCanvas, 0, 0);
      ctx.globalAlpha = opacity;
      ctx.filter = "blur(2px)";
      ctx.shadowColor = "rgba(252,243,249,0.3)";
      ctx.shadowBlur = 7;
      ctx.drawImage(offscreenCanvas, 0, 0);
    }
  
  // save to disk - nvm returning to this after i learn php
    // function formCloud() {
    //   function dataURLtoBlob(dataURL) {
    //     let array, binary, i, len;
    //     binary = atob(dataURL.split(',')[1]);
    //     array = [];
    //     i = 0;
    //     len = binary.length;
    //     while (i < len) {
    //       array.push(binary.charCodeAt(i));
    //       i++;
    //     }
    //     return new Blob([new Uint8Array(array)], {
    //       type: 'image/png'
    //     });
    //   };
  
    //   const canvas = document.getElementById('drawCloud');
    //   const file = dataURLtoBlob(canvas.toDataURL());
        
    //   const fd = new FormData;
    //   fd.append('image', file);
  
    //   $.ajax({
    //       type: 'POST',
    //       url: '/urlsarahz.github.io/clouds',
    //       data: fd,
    //       processData: false,
    //       contentType: false,
    //       success: function(good){
    //         console.log("good");
    //       }
    //  });
    // }
  
    // SAVE TO LOCAL STORAGE
  function formCloud(){
    const pixelBuffer = new Uint32Array(
      ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    if (!(pixelBuffer.some(color => color !== 0))) return;
  
    localStorage.setItem("newCloud", canvas.toDataURL());
  
    // CLEAR CANVAS
      document.getElementById("settings").style.display="none"; 
    clear(ctx,oc,fc);
    document.getElementById("drawCloud").style.display="none";
    document.getElementById("form").style.display="none";
  
    loadCloud();
    loadPics();
    }
  
    function loadCloud() {
    // LOAD CLOUD
    var dataURL = localStorage.getItem('newCloud');
    ccloud = document.getElementById('userCloud');
    ccloud.src = dataURL;
    ccloud.style.position = 'absolute';
    ccloud.style.top = (document.body.clientHeight - ccloud.height - 200) * Math.random() + "px";
    ccloud.style.left = 50;
    // ccloud.style.display="block";
  
    // MOVE
    var x = 50;
    var id = null;
    clearInterval(id);
    id = setInterval(frame, Math.floor(Math.random()*20)+10);
  
    function frame() {
      if (x == document.body.clientWidth) {
        clearInterval(id);
      } else {
        x++;
        ccloud.style.left = x + 'px';
        ccloud.style.display="block";
      }
    }
  }
  
  function loadPics() {
    var path = "sky/pics.json";
    $.ajax({
      url: path,
      type: 'Get',
      async: false,
      cache: false,
      success: function (data) {
        // var pics = [];
         console.log(data);

        $.each(data, function(val){
             console.log(data[val]);
            let pic = $("<img src= sky/" + data[val] + "></img>");

            let sky = document.getElementById("stuff");
            let _left = Math.random()*sky.offsetWidth;
            let _top = Math.floor(Math.random()*sky.offsetHeight);
            let _size = Math.floor(Math.random()*15)+5;
            pic.css("position", "absolute").css("top", _top + "px").css("left", _left + "px").css("max-height", _size + "em").css("width", "auto").appendTo("#stuff").draggable();
        })


        // $(data).find("a:contains(.JPG)").each(function () {
        //     var filename = this.href.replace(window.location.host, "").replace("http:///","");   
        //     console.log(filename);             
        //     let pic = $("<img src= sky/" + filename + "></img>");

            // let sky = document.getElementById("stuff");
            // let _left = Math.random()*sky.offsetWidth;
            // let _top = Math.floor(Math.random()*sky.offsetHeight);
            // let _size = Math.floor(Math.random()*10)+5;
            // pic.css("position", "absolute").css("top", _top + "px").css("left", _left + "px").css("max-height", _size + "em").css("width", "auto").appendTo("#stuff");
        // });
    },
    });
//     $.get( "sky/", function( data ) {
//         var items = [];
//         $.each( data, function(val ) {
//           items.push(val);
//         });
      
//         $( "#stuff" ).append( items );
//       });
   }

    // $('.typew').fadeOut(20000); 

    $(window).on('load resize',function(){
        if($(window).width() < 950){
            window.location = "https://recordsof.love/home";
        }
    });
  

// wave gif
function appear(event, querySelector) {
  const element = document.querySelector(querySelector);
  element.classList.add("visible");
}

function cursorMove(event, querySelector) {
  const element = document.querySelector(querySelector);
  element.style.top = `${event.clientY}px`;
  element.style.left = `${event.clientX}px`;
}

function disappear(event, querySelector) {
  const element = document.querySelector(querySelector);
  element.classList.remove("visible");
}