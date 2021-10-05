//HISTORIA: Este es un juego tipo 8-Bit. Me inspire en mi juego anterior del ninja en CODE, pero remasterizado jeje: Eres un ninja fugitivo escapando de tu pueblo, te adentraste accidentalmente en el bosque oscuro y ahora tienes que pelear con seres mágicos y luchar por tu vida. 

//Es importante que cuando presiones R para atacar lo mantengas durante pocos segundos para apreciar bien la animación

//------NOTA: Las rocas rosas no se pueden destruir, las tienes que brincar--------
//No es un BUG.

//Variables
var fond1,fond1Img,fond2,fond2Img,fond3,fond3Img,fond4,fond4Img;
var musicSound;
var floor1,floorImg;
var whoosh;
var textGame1,textTitle,textGameOver,textGame1Img,textTitleAnm,textGameOverImg;
var textGameOverImg,jumpText,jumpTextImg;
var textInstr,textInstrImg,textInstr2,textInstr2Img;
var runner,runnerAnm,enemy1,enemy1Anm,enemys1Group,enemy2,enemy2Img,enemys2Group,enemy3,enemy3Anm;
var attackSprite,attackSpriteAnm,enemys3Group;
var deathSprite,deathSpriteAnm;
var jumperImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var distance = 0;

//Precargar Imagenes y Animaciones
function preload(){
  fond1Img = loadImage("parallax-demon-woods-bg.png");
  fond2Img = loadImage("fondo2Lento.png");
  fond3Img = loadImage("fondo3Medio.png");
  fond4Img = loadImage("fondo3Rapido.png");
  floorImg = loadImage("SUELO.jpg");
  textInstrImg = loadImage("InstrSaltar.png");
  textInstr2Img = loadImage("InstrAtacar.png");
  textGame1Img = loadImage("serveText.png");
  textGameOverImg = loadImage("overText.png");
  jumpTextImg = loadImage("saltaText.png");
  jumperImg = loadImage("jump1.png");
  enemy2Img = loadImage("enmGround.png");
  enemy1Anm = loadAnimation("enm1.png","enm2.png","enm3.png","enm4.png");
  enemy3Anm = loadAnimation("flyEnemy1.png","flyEnemy2.png","flyEnemy3.png","flyEnemy4.png");
  runnerAnm = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png","run7.png","run8.png");
  attackSpriteAnm = loadAnimation("atk1.png","atk2.png","atk3.png","atk4.png","atk5.png","atk6.png");
  deathSpriteAnm = loadAnimation("dth1.png","dth2.png","dth3.png","dth4.png","dth5.png","dth6.png");
  textTitleAnm = loadAnimation("resetText1.png","resetText2.png");
  musicSound = loadSound("TRACK DEFINITIVO.mp3");
}

function setup() {
  //Musica
  musicSound.loop();
  
  //Canvas del tamaño del fondo
  createCanvas(592,263);
  
  //=createSprite(0,0);  
  //Fondo 1 estático ORANGE
  fond1 = createSprite(300,132);
  fond1.addImage("BackGround",fond1Img);
  fond1.scale = 1.5;
  
  //fondo 2 infinito
  fond2 = createSprite(300,132);
  fond2.addImage("movement1",fond2Img);
  fond2.x = fond2.width /2;
  
  //fondo 3 infinito 
  fond3 = createSprite(300,132);
  fond3.addImage("movement2",fond3Img);
  fond3.x = fond3.width/2;
  
  //fondo 4 infinito
  fond4 = createSprite(300,132);
  fond4.addImage("movement3",fond4Img);
  fond4.x = fond4.width/2;
  
  //Jugador o corredor
  runner = createSprite(50,228);
  runner.addAnimation("running",runnerAnm);
  runner.scale = 1.4;
  //runner.debug = true;
  runner.setCollider("circle",0,0,25);
  
  //Animacion para cuando atacas
  attackSprite = createSprite(50,228);
  attackSprite.addAnimation("attack",attackSpriteAnm);
  attackSprite.scale = 1.2;
  //Establece el sprite en una posicion invisible inicial
  attackSprite.x = 1000;
  attackSprite.y = 1000;
  
  //Animacion para cuando mueres
  deathSprite = createSprite(50,228);
  deathSprite.addAnimation("deathStand",deathSpriteAnm);
  deathSprite.scale = 1.3;
  //Establece el sprite en una posicion invisible inicial
  deathSprite.x = -1000;
  deathSprite.y = -1000;
  
  //Pantalla negra pincipio
  whoosh = createSprite(296,136,592,263);
  whoosh.shapeColor = ("black");
  whoosh.lifetime = 155;
  whoosh.visible = true;
  
  //"El Juego Empieza" TEXTO
  textGame1 = createSprite(310,136);
  textGame1.addImage("TEXTO BIENVENIDA",textGame1Img);
  textGame1.lifetime = 250;
  
  //"Saltar = W" TEXTO
  textInstr = createSprite(240,23);
  textInstr.addImage("Instruction1",textInstrImg);
  
  //"Atacar = R" TEXTO
  textInstr2 = createSprite(460,23);
  textInstr2.addImage("Instruction2",textInstr2Img);
  
  //"Game Over" TEXTO
  textGameOver = createSprite(300,136);
  textGameOver.addImage("TEXTO FINAL",textGameOverImg);
  textGameOver.scale = 1.5;
  //textGameOver.debug = true;
  
  //"Click aquí para continuar" TEXTO (Boton reinicio)
  textTitle = createSprite(300,205);
  textTitle.addAnimation("strobe",textTitleAnm);
  
  //"SALTA!" TEXTO AVISO
  jumpText = createSprite(280,76);
  jumpText.addImage("AVISO",jumpTextImg);
  jumpText.visible = false;
  
  //Grupos de Enemigos (1,2)
  enemys1Group = new Group();
  enemys2Group = new Group();
  enemys3Group = new Group();
}

function draw() {
  background("black");
  
  //CreaOrillas 
  edges = createEdgeSprites();
  //Runner Colisiona con orillas
  runner.collide(edges);
  
  //Propiedad: Infinito
  if(fond2.x < 0){
    fond2.x = fond2.width /2;
  }
  
  //Propiedad: Infinito
  if(fond3.x < 0){
    fond3.x = fond3.width /2;
  }
    
  //Propiedad: Infinito
  if(fond4.x < 0){
    fond4.x = fond4.width /2;
  }
  
  //Nueva funcion que descubrí para que cuando pasen cierta cantidad de segundos ejecute una accion
  var count = World.seconds;
  
  //Si pasan 3 segundos La pantalla negra inicio y el texto bienvenida se desplazan
  //Consiguiendo el efecto de una transicion y dandole mejor diseño
  if(count > 3){
    textGame1.velocityX = -11;
    whoosh.velocityX = -11
  }
  
  //Si pasan 4.9s salta el aviso de que saltes
  if(count > 4.9){
    jumpText.visible = true;
  }
  
  //El aviso de que saltes se desplaza y establece un lifetime para ahorrar memoria
  if(count > 5){
    jumpText.velocityY = -23;
    jumpText.lifetime = 155;
  }
  
  //Dibuja los sprites en pantalla
  drawSprites();
  
  //Estado del juego PLAY
  if(gameState === PLAY){
    
    //Da diferentes velocidades a los 4 fondos en para crear "Profundidad" 
    fond2.velocityX = -1.8;
    fond3.velocityX = -2.5;
    //El fondo mas cercano (rapido) se va moviendo mas rapido mientras mas avances
    //Genera ilusion de rapidez y mayor dificultad
    fond4.velocityX = -(6 + 3*distance/200)
    
    //Establece los textos de over en invisibles 
    textGameOver.visible = false;
    textTitle.visible = false;
    
    //Elimina los textos en PLAY para ahorrar memoria 
    textGameOver.lifetime = 40;
    textTitle.lifetime = 40;
    
    //Establece la distancia recorrida
    distance = distance + Math.round(getFrameRate()/57);
    
    //Control RUNNER para saltar (Quise añadir una animacion cuando salta pero no funciono)
    if(keyDown("W") && runner.y >= 220){
      runner.addImage("jumping",jumperImg);
      runner.velocityY = - 14;
    }
    
    //Gravedad runner
    runner.velocityY = runner.velocityY + 1;
    
    //Control para atacar a los enemigos 
    //Aqui decidí hacerlo con sprites diferentes por que quería añadir una funcionabilidad REAL al atacar y no solo que la animacion apareza sino que tambien si no ejecutas esta accion pierdas por el sprite de RUNNER
    //Control para Atacar
    if(keyWentDown("R")){
      //La manera en que lo logré fue enviando a este sprite en la posicion del runnner
      //Y el runner enviarlo a una posicion en donde sea invisible
      
      cooldownR();
      
      attackSprite.x = 50;
      attackSprite.y = 228;
      
      //Aqui se ve
      runner.x = 1000;
      runner.y = 1000;
      
      //Para que no se quede por siempre esta animacion añadi la funcion else para que SOLO si presionas esta tecla aparezca y cuando lo dejes de hacer vuelva a la normalidad
    }else if(keyWentUp("R")){
      
      attackSprite.x = 1000;
      attackSprite.y = 1000;
      
      //Posicion inicial
      runner.x = 50;
      runner.y = 228;
    }
    
    //funciones para aparecer los enemigos
    spawnEnemy1();
    spawnEnemy2();
    spawnEnemy3();
    
    //console.log(runner.y);
    
    //Condicionales para atacar al enemigo y añadir score a las kills
    if(enemys1Group.isTouching(attackSprite)){
      enemys1Group.destroyEach();
      score = score + 1;
    }
    
    //Si tocas al anemigo 2 no importa con cual accion aun moriras entonces tendrás que
    //Saltar este enemigo
    if(enemys2Group.isTouching(attackSprite)){
      gameState = END;
    }
    
    if(enemys2Group.isTouching(runner)){
      gameState = END;
    }
    
    if(enemys3Group.isTouching(attackSprite)){
      enemys3Group.destroyEach();
      score = score + 2;
    }
    
    if(enemys3Group.isTouching(runner)){
      gameState = END;
    }
    
    //Si el enemigo toca al runner sin atacar este morira
    //De esta manera creo la lógica del juego y la funcionabilidad de las acciones
    if(enemys1Group.isTouching(runner)){
      gameState = END;
    }
    //Si alguna de estas condiciones es cumplida pasa al estado de juego de END
  }
  else if(gameState === END){
    //Para la velocidad de todos los fondos 
    fond2.velocityX = 0;
    fond3.velocityX = 0;
    fond4.velocityX = 0;
    
    //Establece un lifetime para los textos (muy largos)
    //Esto mas que nada fue para arreglar un bug por que no es necesario
    textGameOver.lifetime = 200400;
    textTitle.lifetime = 200400;
    
    //Establece los textos como visibles 
    textGameOver.visible = true;
    textTitle.visible = true;
    
    //Destruye a los enemigos 
    enemys2Group.destroyEach();
    enemys1Group.destroyEach();
    enemys3Group.destroyEach();
    
    //Establece la velocidad de los enemigos en 0(Para arreglar un bug)
    enemys1Group.velocityX = 0;
    enemys2Group.velociyX = 0;
    enemys3Group.velociyX = 0;
    
    //Envia al runner a una posicion invisible
    runner.x = -1000
    
    //Envia al atacante a una posicion invisible
    attackSprite.x = -1000
    
    //Envia la animacion de muerte a la posicion principal
    deathSprite.x = 50;
    deathSprite.y = 228;
    
    //Boton para restear el juego
    if(mousePressedOver(textTitle)){
      //Invoca funcion de reset();
      reset();
    }
  }
  
  //textos para Kills y la distacia
  textSize(15);
  fill("white");
  text("KILLS: " + score,15,30);
  text("DISTANCE: " + distance,15,50);
}

//Funciones
function spawnEnemy1(){
  if(frameCount % 120 === 0){
    enemy1 = createSprite(600,240);
    enemy1.addAnimation("stand",enemy1Anm);
    enemy1.scale = 1.7;
    enemy1.velocityX = -(9 + 5*distance/220);
    enemy1.lifetime = 500;
    enemys1Group.add(enemy1);
  }
}

function spawnEnemy2(){
  if(frameCount % 170 === 0){
    enemy2 = createSprite(600,255);
    enemy2.addAnimation("stand",enemy2Img);
    enemy2.scale = 1.7;
    enemy2.velocityX = -(5 + 5*distance/220);
    enemy2.lifetime = 500;
    enemys2Group.add(enemy2);
  }
}

function spawnEnemy3(){
  if(frameCount % 255 === 0){
    enemy3 = createSprite(650,205);
    enemy3.addAnimation("flying",enemy3Anm);
    enemy3.scale = 1.8;
    enemy3.velocityX = -(11 + 5*distance/220);
    enemy3.lifetime = 500;
    enemys3Group.add(enemy3);
  }
}

function reset(){
  gameState = PLAY;
  textGameOver.visible = false;
  runner.x = 50;
  runner.y = 228;
  score = 0;
  distance = 0;
  deathSprite.x = -1000;
  deathSprite.y = -1000;
}

