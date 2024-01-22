<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Upload</title>
    <link rel="stylesheet" href="{{ $filepicker_css }}" type='text/css' media='all' />
    <style>
    body {
        margin: 0;
        padding: 0;
        min-height: 100dvh;
        position: relative;
    }
    .file-picker {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
    </style>
</head>
<body>



    <div class="file-picker">
        <label>
            <input type="file" name="file" multiple />
            Pievieno failus
        </label>

        <div class="file-picker__dragover">
            Nomet failus šeit
        </div>

        <ul class="file-picker__file-list"></ul>

        <div class="file-picker__buttons">
            <button>Nosūtīt failus</button>
        </div>

        <div class="file-picker__success">
            Paldies, Jūsu faili ir iesūtīti!
        </div>
    </div>


    <script src="{{ $filepicker_js }}"></script>
    <script>
        webit.default(document.querySelector('.file-picker'), {
            uploadUrl: '{{ $uploadUrl }}'
        })
    </script>
</body>
</html>
