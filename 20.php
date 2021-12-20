<?php
$input = file_get_contents("20");
// echo "$input";
[$enhancement, $image] = explode("\n\n", $input);
$image = array_map("str_split", explode("\n", $image));

function flashBoard($image, $enhancement, $default = ".", $stage = -1) {
    $newBoard = [];
    for ($i = $stage; $i <= count($image); $i++) {
        for ($j = $stage; $j <= count($image[0]); $j++) {
            $val = [];
            $val[] = (($image[$i - 1] ?? [])[$j-1] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i-1] ?? [])[$j] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i-1] ?? [])[$j+1] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i] ?? [])[$j-1] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i] ?? [])[$j] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i] ?? [])[$j+1] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i+1] ?? [])[$j-1] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i+1] ?? [])[$j] ?? $default) == "." ? 0 : 1;
            $val[] = (($image[$i+1] ?? [])[$j+1] ?? $default) == "." ? 0 : 1;
            $v = base_convert(join('', $val), 2, 10);
            $newBoard[$i][$j] = $enhancement[$v];
        }   
    }
    return $newBoard;
}

function totalLights($image) {
    $total = 0;
    foreach ($image as $row) {
        foreach ($row as $light) {
            if ($light == "#") {
                $total++;
            }
        }
    }
    return $total;
}

for ($i = -1; $i >= -50; $i--) {
    $image = flashBoard($image, $enhancement, $i % 2 ? "." : "#", $i);
    if ($i == -2) {
        echo totalLights($image) . "\n";
    }
}
echo totalLights($image) . "\n";

