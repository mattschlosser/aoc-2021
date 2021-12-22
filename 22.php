<?php
$input = file_get_contents('22');
$steps = explode(PHP_EOL, $input);
foreach ($steps as &$step) {
    $step = explode(' ', $step);
    $matches = [];
    preg_match_all("/(-?\d+)..(-?\d+)/", $step[1], $matches);
    foreach ($matches[1] as &$match) {
        $match = (int) $match; // hacks
    }
    foreach ($matches[2] as &$match) {
        $match++; // hacks
    }
    $step = [$step[0] == 'on' ? 1 : 0, [...$matches[1], ...$matches[2]]];
}

// given two cuubes where each cube is two points represnting it's 
// min and max dimensions, find the number of overlapping cubes


function dimensionOverlap($start1, $end1, $start2, $end2) {
    if ($start1 > $end2 || $start2 > $end1) {
        return 0;
    }
    return abs(max($start1, $start2) - min($end1, $end2));
}

function overlappingPoints($cube1, $cube2) {
    [$x1,$y1,$z1,$x2,$y2,$z2] = $cube1;
    [$x3,$y3,$z3,$x4,$y4,$z4] = $cube2;
    return dimensionOverlap($x1, $x2, $x3, $x4) *
           dimensionOverlap($y1, $y2, $y3, $y4) *
           dimensionOverlap($z1, $z2, $z3, $z4);
}

function intersection($cube1, $cube2) {
    [$x1,$y1,$z1,$x2,$y2,$z2] = $cube1;
    [$x3,$y3,$z3,$x4,$y4,$z4] = $cube2;
    return [
        max($x1, $x3),
        max($y1, $y3),
        max($z1, $z3),
        min($x2, $x4),
        min($y2, $y4),
        min($z2, $z4),
    ];
}

function outersection($cube1, $cube2) {
    [$x1,$y1,$z1,$x2,$y2,$z2] = $cube1;
    [$x3,$y3,$z3,$x4,$y4,$z4] = $cube2;
    return [
        min($x1, $x3),
        min($y1, $y3),
        min($z1, $z3),
        max($x2, $x4),
        max($y2, $y4),
        max($z2, $z4),
    ];
}

function setLights($cube1, $cube2) {
    $intersection = intersection($cube1, $cube2);
    if (totalPoints($intersection) == 0) {
        return [$cube1];
    } else {
        $outersection = outersection($cube1, $cube2);
        // get the 27 ways to split the cubes
        $cubes = getCubes($outersection, $intersection);
        $newCubes = [];
        foreach ($cubes as $cube) {
            if (totalPoints(intersection($cube, $cube2)) > 0) {
                // this cube should be $cube2state
                // $newCubes[] = [$cube2state, $cube];
            } elseif (totalPoints(intersection($cube, $cube1)) > 0) {
                // this cube should be $cube1state
                $newCubes[] = $cube;
            } else {
                // this cube has no state
            }
        }
    }
    return $newCubes;
}

/**
 * Given two cubes [x1,y1,z1, x2,y2,z2] and [x3,y3,z3, x4,y4,z4]
 * return the 27 cubes that are the result of splitting the two cubes. 
 * The second cube is always inside the first.
 */
function getCubes($outersection, $intersection) {
    [$x1,$y1,$z1,$x4,$y4,$z4] = $outersection;
    [$x2,$y2,$z2,$x3,$y3,$z3] = $intersection;
    $cubes[] = [$x1, $y1, $z1, $x2, $y2, $z2];
    $cubes[] = [$x1, $y1, $z2, $x2, $y2, $z3];
    $cubes[] = [$x1, $y1, $z3, $x2, $y2, $z4];
    $cubes[] = [$x1, $y2, $z1, $x2, $y3, $z2];
    $cubes[] = [$x1, $y2, $z2, $x2, $y3, $z3];
    $cubes[] = [$x1, $y2, $z3, $x2, $y3, $z4];
    $cubes[] = [$x1, $y3, $z1, $x2, $y4, $z2];
    $cubes[] = [$x1, $y3, $z2, $x2, $y4, $z3];
    $cubes[] = [$x1, $y3, $z3, $x2, $y4, $z4];
    $cubes[] = [$x2, $y1, $z1, $x3, $y2, $z2];
    $cubes[] = [$x2, $y1, $z2, $x3, $y2, $z3];
    $cubes[] = [$x2, $y1, $z3, $x3, $y2, $z4];
    $cubes[] = [$x2, $y2, $z1, $x3, $y3, $z2];
    $cubes[] = [$x2, $y2, $z2, $x3, $y3, $z3];
    $cubes[] = [$x2, $y2, $z3, $x3, $y3, $z4];
    $cubes[] = [$x2, $y3, $z1, $x3, $y4, $z2];
    $cubes[] = [$x2, $y3, $z2, $x3, $y4, $z3];
    $cubes[] = [$x2, $y3, $z3, $x3, $y4, $z4];
    $cubes[] = [$x3, $y1, $z1, $x4, $y2, $z2];
    $cubes[] = [$x3, $y1, $z2, $x4, $y2, $z3];
    $cubes[] = [$x3, $y1, $z3, $x4, $y2, $z4];
    $cubes[] = [$x3, $y2, $z1, $x4, $y3, $z2];
    $cubes[] = [$x3, $y2, $z2, $x4, $y3, $z3];
    $cubes[] = [$x3, $y2, $z3, $x4, $y3, $z4];
    $cubes[] = [$x3, $y3, $z1, $x4, $y4, $z2];
    $cubes[] = [$x3, $y3, $z2, $x4, $y4, $z3];
    $cubes[] = [$x3, $y3, $z3, $x4, $y4, $z4];
    return $cubes;
}

function totalpoints($cube1) {
    // hacks
    return overlappingPoints($cube1, $cube1);
}

function switchLights($steps) {
    $history = [];
    foreach ($steps as [$on, $newCube]) {
        $newHistory = [];
        foreach ($history as $oldCube) {
            $newCubes = setLights($oldCube, $newCube);
            $newHistory = array_merge($newHistory, $newCubes);
        }
        if ($on) {
            $newHistory[] = $newCube;
        }
        $history = $newHistory; 
    }
    return $history;
}

function countSomeLights($history) {
    // $history = switchLights($steps);
    $count = 0;
    foreach ($history as $cube) {
        $count += totalPoints(intersection($cube, [-50, -50, -50, 51, 51, 51]));
    }
    return $count;
}
function countAllLights($history) {
    // $history = switchLights($steps);
    $count = 0;
    foreach ($history as $cube) {
        $count += totalPoints($cube);
    }
    return $count;
}

// echo json_encode($steps);
// echo totalPoints([-54112,-85059,-27449,-39297,-49292,7878]);
echo countSomeLights(switchLights($steps)) . PHP_EOL;
echo countAllLights(switchLights($steps)) . PHP_EOL;