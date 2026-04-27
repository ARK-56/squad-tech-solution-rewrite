<?php

$redirectUrl = 'contact.html';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: {$redirectUrl}");
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: {$redirectUrl}?status=invalid");
    exit;
}

$to = 'inquiry@squadtechsol.com';
$subject = 'New Website Inquiry from Squadtech Solution';

$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

$body = implode("\n", [
    'A new inquiry was submitted from the Squadtech Solution website.',
    '',
    "Name: {$safeName}",
    "Email: {$safeEmail}",
    '',
    'Message:',
    $message
]);

$headers = [
    'From: Squadtech Solution <no-reply@squadtechsol.com>',
    "Reply-To: {$safeName} <{$safeEmail}>",
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

header('Location: ' . $redirectUrl . ($sent ? '?status=success' : '?status=error'));
exit;
