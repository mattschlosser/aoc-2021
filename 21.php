<?php
$player = [3,2];
$scores = [0,0];
$pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
$roll = 0;

function roll() {
    global $roll;
    $roll++;
    return $roll;
}

function noWinner($scores) {
    foreach ($scores as $score) {
        if ($score >= 1000) { 
            return false;
        }
    }
    return true;
}

$turn = 0;
while (noWinner($scores)) {
    $total = roll() + roll() + roll();
    $player[$turn] = $player[$turn] + $total;
    $scores[$turn] += $pos[$player[$turn] % 10];
    $turn = ($turn + 1) % 2;
}
echo $roll * $scores[$turn] . PHP_EOL;


function possibleWaysToGetTo($number, $from, $score) {
    if ($score >= 21) {
        return 1;
    }
    $pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // $score++;
    $ways = 0;;
    foreach ([1,2,3] as $i) {
        if ($score + $pos[($from + $i) % 10] >= $number) {
            $ways++;
        }
    }
    return $ways;
}

echo possibleWaysToGetTo(21, 1, 0) . PHP_EOL;
echo possibleWaysToGetTo(1, 7, 0). PHP_EOL;



// how many ways to get to n from k in increments of pos[1,2,3];
function waysToGetTo($number, $from, $score, $turn) {
    if ($score >= 21 && $number == 0) {
        return 1;
    }
    if ($number == 0) {
        return 0;
    }
    $pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $ways = 0;
    foreach ([1,2,3] as $i) {
        // if ($score + $pos[($from + $i) % 10] >= $number) { 
            $ways += waysToGetTo($number - 1, ($from + $i) % 10, $score + $pos[($from + $i) % 10], $turn + 1);
            // }
        }
    $p = $pos[$from];
    echo "$ways ways to get from $p to 21 with score $score in $number turns" . PHP_EOL;
    return $ways;
}
echo waysToGetTo(4, 3, 0, 1) . PHP_EOL;
echo waysToGetTo(4, 2, 0, 1) . PHP_EOL;