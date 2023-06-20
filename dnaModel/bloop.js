
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// Creature class

// Create a "bloop" creature
class Bloop {
  constructor(l, dna_) {
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna_; // DNA
    // DNA will determine size and maxspeed
    // The bigger the bloop, the slower it is
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);
    this.rMaior = this.r * 2;//raio da elipse maior
    let record = Infinity;
  }

  run() {
    this.update();
    this.borders();
    this.display();
  }

  // A bloop can find food and eat it
  eat(f) {
    let food = f.getFood();
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      // If we are, juice up our strength!
      
      if (d <= this.rMaior){//checar se ta dentro da area da elipse maior
        this.update(d,this.rMaior,foodLocation);
          if (d <= this.r) {
            this.health += 100;
            food.splice(i, 1);
          }
        }
    }
  }

  reproduceS() {
    for (let i = this.length - 1; i >= 0; i--) {//tentei fazer algo parecido com a funcao eat para que cada bloop
      let bloopO = this[i];
      if (bloopO != this) {//checar se sao bloops diferentes
        let d = p5.Vector.dist(this.position, bloopO.position);//contato com os bloops
        if (d <= this.rMaior) {
          if (this.rMaior < bloopO.rMaior) {//contato entre os raios da elipse maiores
            // realizar o crossover do escolhido para ver qual vai reproduzir
              let childDNA = crossover(this.dna, bloopO.dna);
            // Create new bloop with crossover DNA
              return new Bloop(this.position, childDNA);
          } if (this.rMaior > bloopO.rMaior) {
            // realizar o crossover do escolhido para ver qual vai reproduzir
              let childDNA = crossover(bloopO.dna, this.dna);
            // criar uma bloop nova se tiver
              return new Bloop(bloopO.position, childDNA);
          }
        }
      }
    }
  }
 crossover(dna1, dna2) {
  let newGenes = [];
  for (let i = 0; i < dna1.genes.length; i++) {
    // 50% de chance de pegar o dna de cada um dos pais
    if (random(1) < 0.5) {
      newGenes[i] = dna1.genes[i];
    } 
    else {
      newGenes[i] = dna2.genes[i];
    }
  }
  return new DNA(newGenes);
}
  

  // Method to update position
  update(d,rMaior,foodLocation) {
    if ( d <= rMaior/2 && d < this.record) {//mudei a funcao para caso se a comida entrar no range do rMaior ele va em direcao a ela
        let posX = foodLocation.x - this.position.x;//diferenca da pos da comida e da bosicao da bloop em questao
        let posY = foodLocation.y - this.position.y;
        this.position.x = this.position.x + posX;//levar a posicao do bloop a comida
        this.position.y = this.position.y + posY;
    }
    else{
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity);
    // Death always looming
    this.health -= 0.2;}
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r/2) this.position.x = width+this.r/2;
    if (this.position.y < this.r/2) this.position.y = height+this.r/2;
    if (this.position.x > width+this.r/2) this.position.x = -this.r/2;
    if (this.position.y > height+this.r/2) this.position.y = -this.r/2;
  }

  // Method to display
 display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
      stroke(255, this.health);
      noFill();
      ellipseMode(CENTER);
      // desenhar a segunda elipse com o dobro do tamanho do raio
      ellipse(this.position.x, this.position.y, 2 * this.r, 2 * this.r);
        }

  // Death
  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}