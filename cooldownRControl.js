function cooldownR(){
  var time = World.seconds;

  if(time > 3){
    if(keyDown("R")){
      return true;
    }else {
      return false;
    }
  }
}
