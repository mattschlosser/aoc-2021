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



/**
 * Given three roll of three sided dice, returns the number of times
 * each value appears 
 * 
 * @param int $i The desired outcome
 * 
 * @return int The number of ways the outcome can be rolled
 */
function times($i) {
    switch ($i) {
        case 3:
            return 1;
        case 4:
            return 3;
        case 5:
            return 6;
        case 6:
            return 7;
        case 7:
            return 6;
        case 8:
            return 3;
        case 9:
            return 1;
        default:
            throw new Exception("Invalid number");
    }
}
// how many ways to get to n from k in increments of pos[1,2,3];

/**
 * Recursively walks the universes, finding the number of ways to get to the end of the game, 
 * with the desired outcome. 
 * 
 * @param int $turn Which player's turn it is
 * @param int $from player 1's position on the board
 * @param int $score player 1's score
 * @param int $from2 player 2's position on the board
 * @param int $score2 player 2's score
 * @param int $winner which universe to search
 * 
 * Given 1, will return all the universes in which player 1 can win.
 * Given 2, will return all the universes in which player 2 can win.
 * 
 */
function waysToGetTo($turn, $from, $score, $from2, $score2, $winner) {
    static $cache = [];
    if ($cache[$from][$from2][$turn][$score][$score2] ?? null !== null) {
        return $cache[$from][$from2][$turn][$score][$score2];
    }
    if ($score >= 21 ) {
        return $winner == 1;
    } elseif ($score2 >= 21) {
        return $winner == 2;
    }
    $pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $totalWays = 0;
    foreach ([3,4,5,6,7,8,9] as $i) {
        if ($turn <= 1) {
            $totalWays += times($i) * waysToGetTo(2, ($from + $i) % 10, $score + $pos[($from + $i) % 10], $from2, $score2, $winner);
        } else {
            $totalWays += times($i) * waysToGetTo(1, $from, $score, ($from2 + $i) % 10, $score2 + $pos[($from2 + $i) % 10], $winner);
        }
    }
    $cache[$from][$from2][$turn][$score][$score2] = $totalWays;
    return $totalWays;
}

/**
 * Finds the player that wins in more universes; in how many universes does that player win?
 * 
 * @param int $player1start the starting position of player 1
 * @param int $player2start the starting position of player 2
 * 
 * @return int how many universes the player that wins in more universes wins
 */
function part2(int $player1start, int $player2start): int {
    return max(waysToGetTo(1, $player1start - 1, 0, $player2start- 1, 0, 1), waysToGetTo(1, $player1start -1, 0, $player2start -1, 0, 2));
}

echo part2(4, 3) . PHP_EOL;