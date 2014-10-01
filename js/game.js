var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render  });
var boids;
var boidImg;
var i;
var targoot;

function preload() {
   game.load.image('boid', '../img/mySp1.png');
}

function create() {
    boids = game.add.group();
    targoot = new Phaser.Sprite;
    targoot.x=10;
    targoot.y=10;

    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(10, 10, '',       //fps tracking
    { font: '8px Arial', fill: '#ffffff' });

}

function update()
{
     if(slider2Val==0){
         targoot.x = this.game.width/2;
         targoot.y = this.game.height/2;
    }
    else
    {
         targoot.x = game.input.x;
         targoot.y = game.input.y;
        
    }
    
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');   //update fps tracker
    }
    
    
    if(boids.countLiving()<slider1Val)
    {
        addBoid(game.world.randomX,game.world.randomY);
            boids.setAll('scale.x',0.5);
            boids.setAll('scale.y',0.5);
            boids.setAll('target',targoot);
    
    }
    while(boids.countLiving()>slider1Val){
        var a = boids.getFirstAlive();
        if(a)
         a.kill();
        
    }
}

function render()
{
}


var addBoid = function(x,y)
{
    var boid = boids.getFirstDead();
    
    if(boid == null)
    {
        boid = new Boid(game, game.world.randomX, game.world.randomY, boids);
        boids.add(boid);
    }
    
    boid.revive();
    
    boid.x = x;
    boid.y = y;
    boid.body.collideWorldBounds = true;
    return boid;
}


var Boid = function(game, x, y, group, options) {
  Phaser.Sprite.call(this, game, x, y, 'boid');
  this.anchor.setTo(0.5, 0.5);
  this.group = group;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);


    
  this.maxVelocity = 50.0;
  this.maxForce = 10.0;
  this.seekForce = 0.5;
  
  this.radius = Math.sqrt(this.height * this.height + this.width * this.width) / 2;

  this.desiredSeparation = 20.0;
  this.maxDistance = this.radius * 10.0;
  
  this.target = new Phaser.Sprite;
  this.target.x = targoot.x;
  this.target.y = targoot.y;
  this.target.alive = true;
};

Boid.prototype = Object.create(Phaser.Sprite.prototype);
Boid.prototype.constructor = Boid;

Boid.prototype.update = function() {
  this.body.acceleration.setTo(0,0);
  if(this.target && this.target.exists) {
    var seekAccel = Phaser.Point();
    if(this.target instanceof Phaser.Group) {
      seekAccel = this.seekGroup();
    } else {
      seekAccel = this.seek(this.target.position);
    }
    seekAccel.multiply(this.seekForce, this.seekForce);
    this.applyForce(seekAccel);
  }
  this.applyForce(this.separate());
  this.applyForce(this.align());
  this.cohesion();
  
  this.checkBorders();
  this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
};


Boid.prototype.applyForce = function(force) {
  this.body.acceleration = Phaser.Point.add(this.body.acceleration, force);
};

Boid.prototype.seekGroup = function(targetGroup) {

  var closest = null;
  var distance = Number.MAX_VALUE;
  targetGroup = targetGroup || this.target;
  targetGroup.forEachExists(function(target) {
    var d = this.body.position.distance(target.body.position);
    if(d < distance) {
      distance = d;
      closest = target;
    }
  }, this);
  if(closest) {
    return this.seek(closest.body.position);  
  }
  return new Phaser.Point();
};

Boid.prototype.seek = function(target) {
  var desired = Phaser.Point.subtract(target, this.body.position);

  desired.normalize();
  desired.multiply(this.maxVelocity, this.maxVelocity);

  var steer = Phaser.Point.subtract(desired, this.body.velocity);
  
  if(steer.x>this.maxVelocity)
      steer.x=this.maxVelocity;
  if(steer.y>this.maxVelocity)
      steer.y=this.maxVelocity;
  return steer;
};

Boid.prototype.lookAtClosest = function() {
  var target = null;
  var dist = 0;
  boids.forEach(function(boid) {
    if (boid.body.position !== this.body.position) {
      var distBetween = this.game.physics.arcade.distanceBetween(this, boid);
      if(!target ||  distBetween < dist) {
        dist = distBetween;
        target = boid;
      }
    }
  },this);

  if(!!target) {
    this.rotation = this.game.physics.arcade.angleBetween(this, target);
  }
};

Boid.prototype.separate = function() {
  var distance = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  boids.forEach(function(bod) {
    var d = this.body.position.distance(bod.body.position);
    if((d > 0) && (d < this.desiredSeparation)) {
      var diff = Phaser.Point.subtract(this.body.position, bod.body.position);
      diff.normalize();
      diff.divide(d,d);
      steer.add(diff.x,diff.y);
      count++
    }
  }, this);

  if(count > 0) {
    steer.divide(count, count);
  }

  if(steer.getMagnitude() > 0) {
    steer.normalize();
    steer.multiply(this.maxVelocity, this.maxVelocity);
    steer.subtract(this.body.velocity.x, this.body.velocity.y);
    
      
    if(steer.x>this.maxForce)
        steer.x=this.maxForce;
    if(steer.y>this.maxForce)
        steer.y=this.maxForce;
    
    
  }

  return steer;
};


Boid.prototype.cohesion = function() {
  
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  boids.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(boid.body.position.x, boid.body.position.y);
      count++;
    }
  }, this);

  if (count > 0) {
    sum.divide(count, count);  
    return this.seek(sum);
  }
  return steer;
};


Boid.prototype.align = function() {
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;
  boids.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(boid.body.velocity.x, boid.body.velocity.y);
      count++;
    }
  }, this);

  if (count > 0) {
    sum.divide(count, count);  

    sum.normalize();
    sum.multiply(this.maxVelocity, this.maxVelocity);
    steer = Phaser.Point.subtract(sum, this.body.velocity);
    
          if(steer.x>this.maxForce)
        steer.x=this.maxForce;
    if(steer.y>this.maxForce)
        steer.y=this.maxForce;
    
     
  }

  return steer;
};

Boid.prototype.checkBorders = function() {
  if(this.body.position.x < -this.radius ){
    this.body.position.x = this.game.width + this.radius;
  }
  if(this.body.position.y < -this.radius ){
    this.body.position.y = this.game.height + this.radius;
  }
  if(this.body.position.x > this.game.width + this.radius ){
    this.body.position.x = -this.radius;
  }
  if(this.body.position.y > this.game.height + this.radius ){
    this.body.position.y = -this.radius;
  }
};





















/*  old code for simple chasing and bit of flocking
var Boid = function(game, x, y)
{
     Phaser.Sprite.call(this, game, x, y, 'boid');

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on the boids
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 100; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    //this.AVOID_DISTANCE = 30; // pixels  
}

Boid.prototype = Object.create(Phaser.Sprite.prototype);   //Boid is a type of sprite
Boid.prototype.constructor = Boid;

Boid.prototype.update = function() {
    if(!this.alive)
        return;
    
    
    var targetAngle
    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    if(slider2Val==0){
        targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.game.width/2, this.game.height/2
        );
    }
    else
    {
        //targetAngle = this.game.physics.arcade.angleToPointer(Boid);
            targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        game.input.x, game.input.y
        );
    }
    
    // Gradually (this.TURN_RATE) aim the boids towards the target angle
    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            this.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;    
}
*/
