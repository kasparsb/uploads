<?php
namespace App\Helpers;

function getIp() {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }

    // Jāņem pirmā IP ja ir vairākas sastakotas
    $ip = array_map('trim', explode(',', $ip));

    return count($ip) > 0 ? $ip[0] : '';
}