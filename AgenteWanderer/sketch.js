

let vehicle;
let target;
let d = 32;
let contador = 0;

function setup() {
  createCanvas(1000, 1000);
  vehicle = new Vehicle(100, 100);
  target = createVector(random(width), random(height));
}

function draw() {
  background(0);
  fill(255, 0, 0);
  noStroke();
  fill(255, 0, 0);
  circle(target.x, target.y, d);
  
  vehicle.update();
  vehicle.show();
  if(vehicle.pos.x > 1000 || vehicle.pos.x < 0 || vehicle.pos.y > 1000 || vehicle.pos.y < 0)vehicle = new Vehicle(100, 100);//se o veiculo sair da tela ele retorna para a posição inicial
    
  
  if(vehicle.pos.x >target.x - d * 10 && vehicle.pos.x < target.x + d * 10 && vehicle.pos.y > target.y - d * 10 && vehicle.pos.y < target.y + d * 10){//se o veiculo chegar perto de determinada area(10 vezes o diametro da comida) da comida ele ira atras dela
    
    vehicle.seek(target);
  
    if(vehicle.pos.x > target.x - d/2 && vehicle.pos.x < target.x + d/2  && vehicle.pos.y > target.y - d/2 && vehicle.pos.y < target.y + d/2) {//se a posicao x e y estiver dentro do alcance do raio da bola(d/2) entao vai ter a colisao
    
      contador = contador + 1;
      print(contador, `:comidas foram coletadas`);
      target = createVector(random(width), random(height));
         
    }
  }
  else vehicle.wander();//funcao de passear aleatoriamente
}
