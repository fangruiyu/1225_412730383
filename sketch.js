var sound1
var face_clr="ffffff-000000-99582a-6c757d-fe7f2d-d4a276".split("-").map(a=>"#"+a)
var ear_clr="#f5cac3"
var blush_clr="#fff0f3"
var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[] //移動速度
var v_x=[]
var face_move_var = false //臉物件移動條件，如果為true物件就會移動，如果為false就不會移動
var face_Rot_var = false
//語音辨識初始設定
var lang = navigator.language //取得瀏覽器的語系
var myRec = new p5.SpeechRec(lang)

function preload(){  //匯入音樂
  sound1 = loadSound("MiConv.com__videoplayback.mp3")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //按鈕設定
  btnMOveElement = createButton("移動")//產生一"移動"按鈕
  btnMOveElement.position(40,10)//按鈕位置
  btnMOveElement.size(80,40)//按鈕大小
  btnMOveElement.style("font-size","20px")//文字大小
  btnMOveElement.style("color","#f2cc8f")//文字顏色
  btnMOveElement.style("background","#3d405b")//按鈕背景顏色
  btnMOveElement.mousePressed(face_move)

  btnStopElement = createButton("暫停")
  btnStopElement.position(140,10)
  btnStopElement.size(80,40)//按鈕大小
  btnStopElement.style("font-size","20px")//文字大小
  btnStopElement.style("color","#f2cc8f")//文字顏色
  btnStopElement.style("background","#3d405b")//按鈕背景顏色
  btnStopElement.mousePressed(face_stop)

  btnMusicElement = createButton("音樂")
  btnMusicElement.position(410,10)
  btnMusicElement.size(80,40)//按鈕大小
  btnMusicElement.style("font-size","20px")//文字大小
  btnMusicElement.style("color","#f2cc8f")//文字顏色
  btnMusicElement.style("background","#3d405b")//按鈕背景顏色
  btnMusicElement.mousePressed(music_go)

  //radio的設定，多選項，只能選一個
  radioElement = createRadio()
  radioElement.option("旋轉")
  radioElement.option("暫停")
  radioElement.position(240,10)
  radioElement.size(150,40)//選鈕大小
  radioElement.style("font-size","20px")//文字大小
  radioElement.style("color","#f2cc8f")//文字顏色
  radioElement.style("background-color","#3d405b")//選鈕背景顏色

  btnVoiceElement = createButton("語音")
  btnVoiceElement.position(510,10)
  btnVoiceElement.size(80,40)//按鈕大小
  btnVoiceElement.style("font-size","20px")//文字大小
  btnVoiceElement.style("color","#f2cc8f")//文字顏色
  btnVoiceElement.style("background","#3d405b")//按鈕背景顏色
  btnVoiceElement.mousePressed(voice_go)

  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1)

}
var fc
var mode
function draw() {
  background("#fefae0");
  mode = radioElement.value()
  for(var i=0;i<pos_x.length;i++)
  {
    push()
      translate(pos_x[i],pos_y[i])
      if(face_Rot_var ||mode =="旋轉"){
        rotate(sin(frameCount/20)) //如果旋轉角度一正一負，物件才會左右搖擺
      }

      drawCat(colors[i],0,sizes[i])
    pop()
    if(face_move_var || mode == "移動"){ //在face_move_var為true時，臉物件會移動，|| ==>or
      pos_y[i] = pos_y[i] + v_y[i] //移動的計算，改變物件位置
      pos_x[i] = pos_x[i] + v_x[i]

    }
    

    
    if(pos_y[i]>height || pos_y[i]<0)
    {
      pos_x.splice(i,1)
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)

    }
    if(pos_y[i]<0 || pos_y[i]<0)
    {
      pos_x.splice(i,1)
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)

    }
    if(sound1.isPlaying())
    {
      fc = map(analyzer.getLevel(),0,1,0,100)
    }
    
  }

}

function drawCat(face_clr="#fefae0"){
  push()
    //臉
    fill(face_clr)
    noStroke()
    ellipse(0,0,250,200)
    //左耳
    fill(face_clr)
    triangle(-90,-125,-95,-60,-40,-80)
    noStroke()
    fill(ear_clr)
    triangle(-85,-105,-87,-75,-67,-90)
    //右耳
    fill(face_clr)
    triangle(90,-125,95,-60,40,-80)
    noStroke()
    fill(ear_clr)
    triangle(85,-105,87,-75,67,-90)
    //眉毛
    fill(0)
    ellipse(-30,-60,15,5)
    ellipse(30,-60,15,5)
    //眼睛
    fill("#ffffff")
    stroke(0)
    ellipse(-30,-45,20,10)
    ellipse(30,-45,20,10)
    //瞳孔
    fill(0)
    ellipse(-30+map(mouseX/2,510,width,4,20),-47+map(mouseY/2,500,width,8,20),5,5)
    ellipse(30+map(mouseX/2,510,width,4,20),-47+map(mouseY/2,500,width,8,20),5,5)
    //ellipse(-30,-47,5,5)
    //ellipse(30,-47,5,5)
    //鼻子
    fill(0)
    triangle(-5,-35,0,-30,5,-35)
    //嘴巴
    line(0,-30,0,-25)
    fill(ear_clr)
    noStroke()
    triangle(0,-25,-10,-20,10,-20)
    arc(0,-20,20,10+fc,0,PI)
    //腮紅
    fill(blush_clr)
    ellipse(-60,-10,60,55)
    ellipse(60,-10,60,55)

  pop()

}

function mousePressed(){
  if(mouseY>50){
    pos_x.push(mouseX)
    pos_y.push(mouseY)
    sizes.push(random(0.5,1.2))
    colors.push(face_clr[int(random(face_clr.length))])
    v_y.push(random(-1,1))
    v_x.push(random(-1,1))
  }
}

function face_move(){
  face_move_var = true
  
  

}

function face_stop(){
  face_move_var = false
  sound1.stop();
}

function voice_go(){
  myRec.onResult = showResult //取得語音辨識後去執行function showResult
  myRec.start() //開始辨識

}

function music_go(){
  if(sound1.isPlaying()){
    sound1.stop()
  }else
    sound1.play()
}


function showResult(){
  if(myRec.resultValue == true)
  {
    print(myRec.resultString)
    if(myRec.resultString.indexOf("走")!== -1){
      face_move_var = true
    }
    if(myRec.resultString.indexOf("停")!== -1){
      face_move_var = false
      face_Rot_var = false
      sound1.stop();
    }
    if(myRec.resultString.indexOf("唱")!== -1){
      sound1.play();
    }
  }
}



