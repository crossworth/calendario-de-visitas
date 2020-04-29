<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <base href="{{ config('app.url') }}">
    <link rel="canonical" href="{{ config('app.url') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
</head>
<body>
<div id="root"></div>
<script defer src="{{ mix('/js/app.js') }}"></script>
</body>
</html>
