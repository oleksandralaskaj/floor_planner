<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/css/app.scss')
    @vite('resources/js/app.js')
    @viteReactRefresh
    @vite('resources/js/Floor-planning-app.jsx')
    <title>Floor planning app</title>
</head>
<body>
<div id="floor-planning-app">

</div>
</body>
</html>
