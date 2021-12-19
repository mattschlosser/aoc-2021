<?php
$input = file_get_contents("18");
// echo "$input";
$lines = explode("\n", $input);

function is_leaf($line) {
    return !is_array($line);
}

function split($line) {
    if ($line === null) {
        throw new Exception("Null not allowed");
    }
    if (is_int($line)) {
        if ($line >= 10) {
            $left = (int) floor($line / 2);
            $right = (int) ceil($line / 2);
            return [[$left, $right], true];
        } else {
            return [$line, false];
        }
    } else {
        [$left, $didSplit] = split($line[0]);
        if ($didSplit) {
            return [[$left, $line[1]], true];
        }
        // check if split occured
        [$right, $didSplit] = split($line[1]);
        return [[$line[0], $right], $didSplit];
    }
}
$arr = split(10);
[$arr] = split([11, 2]);

/**
 * Adds to the rightmost leaf of a node
 */
function addRight($node, $value) {
    if (is_leaf($node)) {
        return $node + $value;
    } else {
        return [$node[0], addRight($node[1], $value)];
    }
}
/**
 * Adds to the left-most leaf of a node
 */
function addLeft($node, $value) {
    if (is_leaf($node)) {
        return $node + $value;
    } else {
        return [addLeft($node[0], $value), $node[1]];
    }
}

function exp2($line, $depth) {
    if (is_leaf($line)) {
        return [$line, [0,0], false];
    }
    if ($depth < 4) {
        [$left, [$toAddLeft, $toAddRight], $didExplode] = exp2($line[0], $depth+1);
        if ($didExplode) {
            $newRight = addLeft($line[1], $toAddRight);
            return [[$left, $newRight], [$toAddLeft, 0], $didExplode];
        }
        [$right, [$toAddLeft, $toAddRight], $didExplode] = exp2($line[1], $depth+1);
        $newLeft = addRight($line[0], $toAddLeft);
        return [[$newLeft, $right], [0, $toAddRight], $didExplode];
    } else {
        // we have reached detph four
        $left = $line[0];
        $right = $line[1];
        return [0, [$left, $right], true];
    }

}

function expl($line) {
    [$newLine, $_, $didExplode] = exp2($line, 0);
    return [$newLine, $didExplode];
}

function add($node1, $node2) {
    return [$node1, $node2];
}

// echo visit(6);
$reducedLines = [];
function reduceLine($line) {
    $isReduced = false;
    while (!$isReduced) {
        $isReduced = true;
        [$newLine, $didExplode] = expl($line);
        if ($didExplode) {
            $isReduced = false;
            $line = $newLine;
            continue;
        }
        [$newLine, $didExplode] = split($line);
        if ($didExplode) {
            $isReduced = false;
            $line = $newLine;
            continue;
        }
    }
    return $newLine;
}
function reduceLines($lines) {
    $reducedLine = null;
    foreach ($lines as $line) {
        $line = json_decode($line);
        if ($reducedLine === null) {
            $reducedLine = $line;
            continue;
        }
        $addedLine = add($reducedLine, $line);
        $reducedLine = reduceLine($addedLine);
    }
    return $reducedLine;
}

function magnitude($line) {
    $left = $line[0];
    $right = $line[1];
    if (is_leaf($left)) {
        $left = $left * 3;
    } else {
        $left = magnitude($left) * 3;
    }
    if (is_leaf($right)) {
        $right = $right * 2;
    } else {
        $right = magnitude($right) * 2;
    }
    return (int) $left + $right;

}

function reduceLinesToMagnitude($lines) {
    $reducedLine = reduceLines($lines);
    return magnitude($reducedLine);
}

echo reduceLinesToMagnitude($lines) . "\n";

function findMaxLine($lines) {
    $maxMagnitude = 0;
    foreach ($lines as $i => $line1) {
        foreach ($lines as $j => $line2) {
            if ($i == $j) continue;
            // echo "Adding line $i to $j";
            $maxMagnitude = max($maxMagnitude, magnitude(reduceLines(add($line1, $line2))));
            $maxMagnitude = max($maxMagnitude, magnitude(reduceLines(add($line2, $line1))));
        }
    }
    return $maxMagnitude;
}

echo findMaxLine($lines) . "\n";
