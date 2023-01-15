let paddle_width,
  paddle_height,
  ball_dx,
  ball_dy,
  paddle_x,
  paddle_y,
  brickX,
  brickY,
  brickVisible,
  brickWidth,
  brickHeight,
  brickRowCount,
  brickColumnCount,
  brickPadding;

let bricks = [];

let score = 0,
  lives = 3;

function setup() {
  createCanvas(400, 400);
  background("black");
  paddle_width = 100;

  dx = 1;
  dy = 2;
  paddle_dx = 3;
  ball_diameter = 20;
  ballRadius = ball_diameter / 2;
  paddle_height = 15;
  ball_x = width / 2 - ball_diameter / 2;
  ball_y = height / 2 - ball_diameter / 2;
  paddle_x = width / 2 - paddle_width / 2;
  paddle_y = height - 25;

  brickHeight = 25;
  brickWidth = 75;
  brickVisible = true;
  brickRowCount = 3;
  brickColumnCount = 4;
  brickPadding = 25;

  for (var i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickColumnCount; j++) {
      brickX = j * (brickWidth + brickPadding) + 8;
      brickY = i * (brickHeight + brickPadding) + 20;
      bricks[i][j] = { x: brickX, y: brickY, visible: true };
    }
  }
}

function draw() {
  background("black");
  if (ball_x + ball_diameter / 2 > width) {
    dx = -dx;
  }
  if (ball_x - ball_diameter / 2 < 0) {
    dx = -dx;
  }

  if (ball_y + ball_diameter / 2 > height) {
    if (!lives) {
      dy = -dy;
      alert("Game Over: Your total score is: " + score);
      document.location.reload();
    }
    lives--;
    dy = -dy;
  }
  if (ball_y - ball_diameter / 2 < 0) {
    dy = -dy;
  }

  ball_x = ball_x + dx;
  ball_y = ball_y + dy;

  if (keyIsDown(RIGHT_ARROW)) {
    if (paddle_x + paddle_width < width) paddle_x = paddle_x + paddle_dx;
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (paddle_x > 0) {
      paddle_x = paddle_x - paddle_dx;
    }
  }

  let closestX = max(paddle_x, min(ball_x, paddle_x + paddle_width));
  let closestY = max(paddle_y, min(ball_y, paddle_y + paddle_height));

  var distanceX = ball_x - closestX;
  var distanceY = ball_y - closestY;

  if (
    distanceX * distanceX + distanceY * distanceY <
    (ball_diameter / 2) * (ball_diameter / 2)
  ) {
    dy = -dy;
  } else if (
    distanceX * distanceX + distanceY * distanceY <=
    (ball_diameter / 2) * (ball_diameter / 2)
  ) {
    dx = -dx;
    dy = -dy;
  }

  circle(ball_x, ball_y, ball_diameter);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  // rect(brickX, brickY, brickWidth, brickHeight);

  //score

  text("Score: " + score, 8, 13);

  //lives

  text("Lives: " + lives, 320, 13);
  fill(255, 255, 255);

  for (var i = 0; i < brickRowCount; i++) {
    for (var j = 0; j < brickColumnCount; j++) {
      if (bricks[i][j].visible === true) {
        rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
      }
    }
  }

  for (var i = 0; i < brickRowCount; i++) {
    for (var j = 0; j < brickColumnCount; j++) {
      if (bricks[i][j].visible == true) {
        var closestXX = max(
          bricks[i][j].x,
          min(ball_x, bricks[i][j].x + brickWidth)
        );
        var closestYY = max(
          bricks[i][j].y,
          min(ball_y, bricks[i][j].y + brickHeight)
        );

        // Calculate distance between center of circle and closest point on rectangle
        var distanceXX = ball_x - closestXX;
        var distanceYY = ball_y - closestYY;

        var cornerDistance = distanceXX * distanceXX + distanceYY * distanceYY;
        if (cornerDistance < ballRadius * ballRadius) {
          dy = -dy;
          bricks[i][j].visible = false;
          score++;
          dy++;

          if (score == brickRowCount * brickColumnCount) {
            document.location.reload();
            alert("You Won");
          }
        }
      }
    }
  }
}
