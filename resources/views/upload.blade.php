<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Upload</title>
    <link rel="stylesheet" href="{{ $app_css }}" type='text/css' media='all' />
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
        }
    </style>
</head>
<body>

    <div class="file-picker">
        <label>
            <input type="file" name="file" multiple />

            Pievieno failus
        </label>

        <div class="dragover">
            Nomet failus šeit
        </div>

        <div class="success">
            Paldies, Jūsu faili ir iesūtīti
        </div>

        <ul class="file-list"></ul>
    </div>


    <script src="{{ $filepicker_js }}"></script>
    <script src="{{ $app_js }}"></script>
</body>
</html>
