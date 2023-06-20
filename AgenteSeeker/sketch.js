let vehicle;
let target;
let d = 32;
let contador = 0;


function setup() {
  createCanvas(500, 500);
  //criar o veiculo e o alvo e colocar as posicoes aleatorias
  vehicle = new Vehicle(100, 100);
  target = createVector(random(width), random(height));
}

function draw() {
  background(0);
  noStroke();
  vehicle.update();
  vehicle.show();
  //criar o alvo
  fill(255, 0, 0);
  circle(target.x, target.y, d);
  //correr atras do alvo
  vehicle.seek(target)

  
  if(vehicle.pos.x > target.x - d/2 && vehicle.pos.x < target.x + d/2  && vehicle.pos.y > target.y - d/2 && vehicle.pos.y < target.y + d/2) {//se a posicao x e y estiver dentro do alcance do raio da bola(d/2) entao vai ter a colisao
    
    contador = contador + 1;
    print(contador, `:comidas foram coletadas`);
    target = createVector(random(width), random(height));
         
  }
  
}